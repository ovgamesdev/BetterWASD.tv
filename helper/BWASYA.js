const HelperBWASYA = {
  items: { bwasdEmotes: {}, bwasdUsers: {}, bwasdPrivateEmotes: {} },
  isBusy: false,
  emotes: {},
  badges: {},
  subBadges: {},
  paints: {},
  host: "https://betterwasd.herokuapp.com",
  // host: "http://localhost:5000",
  updateSettings() {
    let bwasdEmoteList = BetterStreamChat.settingsDiv.querySelector("#bwasdEmoteList");
    bwasdEmoteList.innerText = "";

    let items = HelperBWASYA.items;

    for (let userID in items.bwasdEmotes) {
      if (items.bwasdEmotes.hasOwnProperty(userID)) {
        let splitdev = document.createElement("div");
        splitdev.classList.add("stickers__div-ovg");
        splitdev.innerHTML = `<div class="stickers__info-ovg" style="top:-10px"><div class="stickers__info__line-ovg"></div><div class="stickers__info__text-ovg"> ${
          typeof items.bwasdUsers[userID].username == "undefined" ? userID : items.bwasdUsers[userID].username
        } </div><div class="stickers__info__line-ovg"></div></div><div class="stickers__line-ovg"></div>`;
        bwasdEmoteList.append(splitdev);
        let stickers__line = splitdev.querySelector(".stickers__line-ovg");
        for (let emoteCode in items.bwasdEmotes[userID]) {
          if (items.bwasdEmotes[userID].hasOwnProperty(emoteCode)) {
            let div = document.createElement("div");
            let a = document.createElement("a");
            let img = document.createElement("img");
            let div_span = document.createElement("div");
            let span = document.createElement("span");
            div.classList.add("div_emoteCard");
            span.innerText = HTML.decode(emoteCode);
            img.src = `${HelperBWASYA.host}/cached/emote/${HelperBWASYA.emotes[emoteCode]?.id || HelperBWASYA.emotes[emoteCode]}/2x`;
            a.href = `https://ovgamesdev.github.io/#/emotes/${HelperBWASYA.emotes[emoteCode]?.id || HelperBWASYA.emotes[emoteCode]}`;
            a.target = "_blank";
            a.classList.add("emoteCard");
            a.append(img);
            div_span.append(span);
            div.append(a);
            a.append(div_span);
            a.title = HTML.decode(emoteCode);
            stickers__line.append(div);
          }
        }

        if (Object.keys(items.bwasdEmotes[userID]).length == 0) {
          let div = document.createElement("div");
          div.classList.add("emoji__item-ovg");
          div.innerText = "У пользователя нет BetterWASYA эмоций";

          stickers__line.append(div);
        }
      }
    }
  },
  loaded() {
    if (settings.wasd.bwasdEmotes) {
      for (const node of document.querySelectorAll(".block__messages__item")) {
        const msg = node.querySelector("wasd-chat-message .message-text > span");
        if (msg && msg.innerHTML) msg.innerHTML = HelperBWASYA.replaceText(msg.innerHTML, node.dataset.username);

        var tooltips = node.querySelectorAll(".tooltip-wrapper");
        for (let tooltip of tooltips) {
          $(tooltip).tooltip({
            classes: { "ui-tooltip": "ui-ovg-tooltip" },
            content: tooltip.dataset.title,
            show: false,
            hide: false,
            position: {
              my: "center bottom",
              at: "center top-5",
              within: $("wasd-chat"),
            },
          });
        }

        let stickersovg = "";
        for (let stickerovg of node.querySelectorAll(".bttv-emote")) {
          stickersovg += stickerovg.dataset.code + " ";
        }
        node.setAttribute("stickersovg", stickersovg);
      }

      HelperWASD.updateHoverTooltipEmote(settings.wasd.hoverTooltipEmote);
    }

    for (let element of document.querySelectorAll("wasd-chat-message .message-text > span .chat-message-mention")) {
      element.addEventListener("click", ({ target }) => {
        let username = target.dataset.username?.split("@").join("");
        if (username) {
          if (settings.wasd.onClickMention.toString() === "1" && textarea) {
            textarea.value += target.dataset.username?.trim() + " ";
            textarea.dispatchEvent(new Event("input"));
            textarea.focus();
          } else if (settings.wasd.onClickMention.toString() === "2") {
            if (!HelperWASD.addUsernameToTextarea(username)) {
              HelperWASD.createUserViewerCard(username, false, element.closest(".block__messages__item"));
            }
          }
        }
      });
    }

    for (let element of document.querySelectorAll("wasd-chat-message .message__status--paid")) {
      for (let badge in HelperBWASYA.subBadges) {
        if (element.style.backgroundImage.match(badge)) element.style.backgroundImage = HelperBWASYA.subBadges[badge];
      }
    }
  },
  update() {
    return new Promise((resolve) => {
      let items = HelperBWASYA.items;

      let emotes = {};

      for (let userID in items.bwasdEmotes) {
        if (items.bwasdEmotes.hasOwnProperty(userID)) {
          for (let emoteCode in items.bwasdEmotes[userID]) {
            if (items.bwasdEmotes[userID].hasOwnProperty(emoteCode)) {
              emotes[emoteCode] = items.bwasdEmotes[userID][emoteCode];
            }
          }
        }
      }

      HelperBWASYA.emotes = emotes;
      HelperBWASYA.updateSettings();
      resolve();
    });
  },
  replaceText(text, user_login) {
    let split = text.split(" ");
    let newText = [];
    for (let word of split) {
      size = Number(settings.wasd.bttvEmoteSize) + 1;
      let link = `${HelperBWASYA.host}/cached/emote/${HelperBWASYA.emotes[word]?.id || HelperBWASYA.emotes[word]}/${size}x`;

      if (HelperBWASYA.emotes[word]) {
        let user = "";

        if (settings.wasd.hoverTooltipEmote) {
          for (let userID in HelperBWASYA.items.bwasdEmotes) {
            if (typeof HelperBWASYA.items.bwasdEmotes[userID][word]?.id == "string") {
              user = userID;
              break;
            }
          }
        }

        let title = ` Смайл:&nbsp;${word} <br> ${
          typeof HelperBWASYA.items.bwasdUsers[user]?.username == "string"
            ? `Канал:&nbsp;${HelperBWASYA.items.bwasdUsers[user]?.username} <br> Эмоции на канале BWASYA`
            : "Общедоступный BWASYA"
        } `;
        word = `<div data-code="${word}" class="bttv-emote tooltip-wrapper" tooltip="${title}" data-title="${title}"> <img class="stickerovg bwasd small" style="vertical-align: middle; width: auto!important;" src="${link}" alt="${word}" /> <span class="chat-message-text stickertext stickerovg_text">Стикер</span> </div>`;
      }

      if (
        HelperBWASYA.items.bwasdPrivateEmotes &&
        HelperBWASYA.items.bwasdPrivateEmotes[user_login] &&
        HelperBWASYA.items.bwasdPrivateEmotes[user_login][word]
      ) {
        link = `${HelperBWASYA.host}/cached/emote/${HelperBWASYA.items.bwasdPrivateEmotes[user_login][word]?.id}/${size}x`;
        let title = ` Смайл:&nbsp;${word} <br> Канал:&nbsp;${user_login} <br> Персональная эмоция BWASYA`;
        word = `<div data-code="${word}" class="bttv-emote tooltip-wrapper" tooltip="${title}" data-title="${title}"> <img class="stickerovg bwasd small" style="vertical-align: middle; width: auto!important;" src="${link}" alt="${word}" /> <span class="chat-message-text stickertext stickerovg_text">Стикер</span> </div>`;
      }

      newText.push(word);
    }
    return newText.join(" ");
  },
  getUserEmotes(userID) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${HelperBWASYA.host}/api/v1/users?user_id=${userID}`,
        success: (out) => {
          resolve(out);
        },
        error: (out) => {
          reject(out?.message);
        },
      });
    });
  },
  async updateUserChannelEmotes(userID, username) {
    try {
      const bwasdData = await HelperBWASYA.getUserEmotes(userID);
      HelperBWASYA.subBadges = bwasdData.subBadges ? bwasdData.subBadges : {};
      HelperBWASYA.updateEmotes(userID, bwasdData);
      return await HelperBWASYA.addUser(userID, username);
    } catch (err) {
      return await Promise.reject("У пользователя нет BetterWASYA эмоций");
    }
  },
  updateEmotes(userID, bwasdData) {
    HelperBWASYA.items.bwasdEmotes[userID] = {};
    HelperBWASYA.items.bwasdEmotes.global = {};
    HelperBWASYA.items.bwasdPrivateEmotes = {};
    HelperBWASYA.items.bwasdUsers.global = { lastUpdate: Date.now() };
    let emoteList = [];
    let globalList = [];
    if (Array.isArray(bwasdData.channelEmotes)) {
      emoteList = emoteList.concat(bwasdData.channelEmotes);
    }
    if (Array.isArray(bwasdData.sharedEmotes)) {
      emoteList = emoteList.concat(bwasdData.sharedEmotes);
    }
    if (Array.isArray(bwasdData.global)) {
      globalList = globalList.concat(bwasdData.global);
    }
    for (let emote of emoteList) {
      HelperBWASYA.items.bwasdEmotes[userID][emote.code] = {
        id: emote._id,
        zeroWidth: !!emote.visibility_simple?.filter((t) => t == "ZERO_WIDTH").length,
      };
    }
    for (let emote of globalList) {
      HelperBWASYA.items.bwasdEmotes.global[emote.code] = {
        id: emote._id,
        zeroWidth: !!emote.visibility_simple?.filter((t) => t == "ZERO_WIDTH").length,
      };
    }
    for (let user in bwasdData.personalEmotes) {
      HelperBWASYA.items.bwasdPrivateEmotes[user] = {};
      for (let emote of bwasdData.personalEmotes[user]) {
        HelperBWASYA.items.bwasdPrivateEmotes[user][emote.code] = {
          id: emote._id,
          zeroWidth: !!emote.visibility_simple?.filter((t) => t == "ZERO_WIDTH").length,
        };
      }
    }
  },
  addUser(userID, username) {
    if (typeof userID === "string") userID = parseInt(userID);
    return new Promise((resolve) => {
      let addUser = typeof HelperBWASYA.items.bwasdUsers[userID] === "undefined";
      HelperBWASYA.items.bwasdUsers[userID] = {
        username,
        lastUpdate: Date.now(),
      };
      resolve();
    });
  },
  tryAddUser(user_id, user_login) {
    if (HelperBWASYA.isBusy) return;
    HelperBWASYA.removeUsers();

    HelperBWASYA.isBusy = true;
    let beforeEmotes = Object.keys(HelperBWASYA.emotes).length;

    HelperBWASYA.updateUserChannelEmotes(user_id, user_login)
      .then(() => {
        return HelperBWASYA.update();
      })
      .then(() => {
        let newEmotes = Object.keys(HelperBWASYA.emotes).length - beforeEmotes;
        ovg.log(`Пользователь ${user_login} и ${newEmotes} эмоции добавлены.`);
      })
      .catch((err) => {
        ovg.log(err, "error");
      })
      .finally(() => {
        HelperBWASYA.isBusy = false;
        HelperBWASYA.loaded();
      });
  },
  removeUsers() {
    HelperBWASYA.subBadges = {};
    HelperBWASYA.emotes = {};
    HelperBWASYA.items = { bwasdEmotes: {}, bwasdUsers: {} };
  },
  restoreSettings(items) {
    return new Promise((resolve, reject) => {
      let l = 0;
      let i = 0;

      for (const _ in items.bwasdUsers) {
        l++;
      }

      for (const userID in items.bwasdUsers) {
        HelperBWASYA.updateUserChannelEmotes(userID, items.bwasdUsers[userID].username).finally(() => {
          i++;
          ovg.log(`BWASYA ${i}/${l}`, "success");
          if (i == l) {
            resolve();
          }
        });
      }
    });
  },
  addToChatMenu() {
    document
      .querySelector("div.emoji__head__options")
      ?.insertAdjacentHTML(
        "beforeend",
        `<div class="option bwasd-emoji"> <i class="ovg-icon-bwasd" style="pointer-events: none;"></i> </div>`
      );
    let bwasdEmotes = HelperBWASYA.items.bwasdEmotes;
    let bwasdUsers = HelperBWASYA.items.bwasdUsers;

    document.querySelector("div.option.bwasd-emoji")?.addEventListener("click", () => {
      $("div.emoji__head__options > .active")?.removeClass("active");

      let timerId = setTimeout(function tick() {
        $("div.option.bwasd-emoji")?.addClass("active");

        $(".emoji__body > wasd-chat-emoji-smiles")?.css("display", "none");
        $(".emoji__body > wasd-chat-emoji-stickers")?.css("display", "none");

        let emoteBodybwasd = document.querySelector(".emoji__body");
        if (emoteBodybwasd) {
          document.querySelector("wasd-chat-emoji-smiles-ffz")?.remove();
          document.querySelector("wasd-chat-emoji-smiles-tv7")?.remove();
          document.querySelector("wasd-chat-emoji-smiles-bttv")?.remove();

          emoteBodybwasd.insertAdjacentHTML(
            "beforeend",
            `<wasd-chat-emoji-smiles-bwasd><div class="emoji-ovg"></div><div style="border-top: 1px solid rgba(var(--wasd-color-switch--rgb),.16);"><input type="search" placeholder="Поиск эмоций" class="option bwasdemojiSearch-shat" style="background: url(${
              git_url + "img/search.png"
            }) no-repeat 10px;background-color: var(--wasd-color-prime);border-bottom-width: 0px!important;/* margin-left: 10px; *//* width: calc(100% - 20px); */width: 100%;"></div></wasd-chat-emoji-smiles-bwasd>`
          );
          let EmoteListbwasd = emoteBodybwasd.querySelector("div.emoji-ovg");
          //ovg.log(HelperBWASYA.emotes);

          if (
            EmoteListbwasd &&
            HelperBWASYA.items.bwasdPrivateEmotes[HelperWASD.self_channel_name] &&
            Object.keys(HelperBWASYA.items.bwasdPrivateEmotes[HelperWASD.self_channel_name]).length !== 0
          ) {
            const splitdev = document.createElement("div");
            splitdev.classList.add("stickers__div-ovg");

            splitdev.innerHTML = `<div class="stickers__info-ovg"><div class="stickers__info__line-ovg"></div><div class="stickers__info__text-ovg"> ${HelperWASD.self_channel_name} </div><div class="stickers__info__line-ovg"></div></div><div class="stickers__line-ovg"></div>`;
            EmoteListbwasd.append(splitdev);

            const stickers__line = splitdev.querySelector(".stickers__line-ovg");
            for (let emoteCode in HelperBWASYA.items.bwasdPrivateEmotes[HelperWASD.self_channel_name]) {
              if (HelperBWASYA.items.bwasdPrivateEmotes[HelperWASD.self_channel_name].hasOwnProperty(emoteCode)) {
                let img = document.createElement("img");
                img.src = `${HelperBWASYA.host}/cached/emote/${
                  HelperBWASYA.items.bwasdPrivateEmotes[HelperWASD.self_channel_name][emoteCode]?.id
                }/1x`;
                img.classList.add("emoji__item-ovg");
                img.title = HTML.decode(emoteCode);
                img.alt = HTML.decode(emoteCode);

                stickers__line.append(img);
                img.addEventListener("click", () => {
                  let textareabwasd = document.querySelector(".footer > div > textarea");
                  textareabwasd.value += HTML.decode(emoteCode) + " ";
                  textareabwasd.focus();
                  textareabwasd.dispatchEvent(new Event("input"));
                });
              }
            }
          }

          if (EmoteListbwasd) {
            let emotes = {};
            for (let userID in bwasdEmotes) {
              if (bwasdEmotes.hasOwnProperty(userID)) {
                const splitdev = document.createElement("div");
                splitdev.classList.add("stickers__div-ovg");

                splitdev.innerHTML = `<div class="stickers__info-ovg"><div class="stickers__info__line-ovg"></div><div class="stickers__info__text-ovg"> ${
                  typeof bwasdUsers[userID].username == "undefined" ? userID : bwasdUsers[userID].username
                } </div><div class="stickers__info__line-ovg"></div></div><div class="stickers__line-ovg"></div>`;
                EmoteListbwasd.append(splitdev);

                const stickers__line = splitdev.querySelector(".stickers__line-ovg");
                for (let emoteCode in bwasdEmotes[userID]) {
                  if (bwasdEmotes[userID].hasOwnProperty(emoteCode)) {
                    if (typeof emotes[emoteCode] === "undefined") {
                      emotes[emoteCode] = bwasdEmotes[userID][emoteCode];

                      let img = document.createElement("img");
                      img.src = `${HelperBWASYA.host}/cached/emote/${
                        HelperBWASYA.emotes[emoteCode]?.id || HelperBWASYA.emotes[emoteCode]
                      }/1x`;
                      img.classList.add("emoji__item-ovg");
                      img.title = HTML.decode(emoteCode);
                      img.alt = HTML.decode(emoteCode);

                      stickers__line.append(img);
                      img.addEventListener("click", () => {
                        let textareabwasd = document.querySelector(".footer > div > textarea");
                        textareabwasd.value += HTML.decode(emoteCode) + " ";
                        textareabwasd.focus();
                        textareabwasd.dispatchEvent(new Event("input"));
                      });
                    }
                  }
                }

                if (Object.keys(bwasdEmotes[userID]).length === 0) {
                  let div = document.createElement("div");
                  div.classList.add("emoji__item-ovg");
                  div.innerText = "У пользователя нет BetterWASYA эмоций";

                  stickers__line.append(div);
                }
              }
            }

            // bind search emoji chat
            let inputbwasd, filterbwasd, ulbwasd, optionsbwasd, titlebwasd, ibwasd;
            inputbwasd = document.querySelector("input.bwasdemojiSearch-shat");
            inputbwasd.addEventListener("input", () => {
              filterbwasd = inputbwasd.value.toUpperCase();
              ulbwasd = document.querySelector("wasd-chat-emoji-smiles-bwasd .emoji-ovg");

              optionsbwasd = ulbwasd.querySelectorAll("img.emoji__item-ovg");
              for (ibwasd = 0; ibwasd < optionsbwasd.length; ibwasd++) {
                titlebwasd = optionsbwasd[ibwasd].title;
                if (titlebwasd) {
                  if (titlebwasd.toUpperCase().indexOf(filterbwasd) != -1) {
                    optionsbwasd[ibwasd].style.display = "";
                  } else {
                    optionsbwasd[ibwasd].style.display = "none";
                  }
                }
              }
            });
          } else {
            timerId = setTimeout(tick, 2000);
          }
        }
      }, 1);
    });

    for (let optinbwasd of document.querySelectorAll("div.emoji__head__options > .option")) {
      optinbwasd.addEventListener("click", (element) => {
        $("div.option.bwasd-emoji")?.removeClass("active");
        element.path[0].classList.add("active");

        document.querySelector("wasd-chat-emoji-smiles-bwasd")?.remove();

        $(".emoji__body > wasd-chat-emoji-smiles")?.css("display", "");
        $(".emoji__body > wasd-chat-emoji-stickers")?.css("display", "");
      });
    }
  },
};
