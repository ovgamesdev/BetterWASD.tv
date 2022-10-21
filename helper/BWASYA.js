const HelperBWASYA = {
  items: { bwasdEmotes: {}, bwasdUsers: {}, bwasdPrivateEmotes: {} },
  isBusy: false,
  emotes: {},
  badges: {},
  subBadges: {},
  paints: {},
  host: "https://betterwasya-api.vercel.app",
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
            img.src = HelperBWASYA.emotes[emoteCode]?.url?.x2;
            a.href = `https://betterwasya.vercel.app/emotes/${HelperBWASYA.emotes[emoteCode]?.id || HelperBWASYA.emotes[emoteCode]}`;
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
          div.classList.add("text");
          div.innerText = "У пользователя нет смайликов..";
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
      }
    }

    for (let element of document.querySelectorAll("wasd-chat-message .message-text > span .chat-message-mention")) {
      element.addEventListener("click", ({ target }) => {
        let username = target.dataset.username?.split("@").join("");
        if (username) {
          if (settings.wasd.onClickMention.toString() === "1" && textarea) {
            textarea.appendChild(document.createTextNode(target.dataset.username?.trim() + " "));
            placeCaretAtEnd(textarea);
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
      if (HelperBWASYA.emotes[word]) {
        // let user = "";
        // if (settings.wasd.hoverTooltipEmote) {
        //   for (let userID in HelperBWASYA.items.bwasdEmotes) {
        //     if (typeof HelperBWASYA.items.bwasdEmotes[userID][word]?.id == "string") {
        //       user = userID;
        //       break;
        //     }
        //   }
        // }
        // let title = ` Смайл:&nbsp;${word} <br> ${typeof HelperBWASYA.items.bwasdUsers[user]?.username == "string" ? `Канал:&nbsp;${HelperBWASYA.items.bwasdUsers[user]?.username} <br> Эмоции на канале BWASYA` : "Общедоступный BWASYA"} `;

        word = `<img class="chat-emoji" style="width: auto;" alt="${word}" src="${HelperBWASYA.emotes[word]?.url[`x1`]}" srcset="${HelperBWASYA.emotes[word]?.url[`x2`]}" />`;
      }

      // if (HelperBWASYA.items.bwasdPrivateEmotes && HelperBWASYA.items.bwasdPrivateEmotes[user_login] && HelperBWASYA.items.bwasdPrivateEmotes[user_login][word]) {
      //   // link = `${HelperBWASYA.host}/cached/emote/${HelperBWASYA.items.bwasdPrivateEmotes[user_login][word]?.id}/${size}x`;
      //   link = HelperBWASYA.items.bwasdPrivateEmotes[user_login][word]?.url[`x${size}`];

      //   // let title = ` Смайл:&nbsp;${word} <br> Канал:&nbsp;${user_login} <br> Персональная эмоция BWASYA`;
      //   word = `<img class="chat-emoji" style="width: auto;" alt="${word}" src="${link}" />`;
      // }

      newText.push(word);
    }
    return newText.join(" ");
  },
  getUserEmotes(userID) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${HelperBWASYA.host}/api/v1/users?user_id=${userID}`,
        success: (out) => resolve(out),
        error: (out) => reject(out?.message),
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
      return await Promise.reject("У пользователя нет смайликов..");
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
      HelperBWASYA.items.bwasdEmotes[userID][emote.code] = { id: emote._id, zeroWidth: !!emote.visibility_simple?.filter((t) => t == "ZERO_WIDTH").length, url: emote.url };
    }
    for (let emote of globalList) {
      HelperBWASYA.items.bwasdEmotes.global[emote.code] = { id: emote._id, zeroWidth: !!emote.visibility_simple?.filter((t) => t == "ZERO_WIDTH").length, url: emote.url };
    }
    for (let user in bwasdData.personalEmotes) {
      HelperBWASYA.items.bwasdPrivateEmotes[user] = {};
      for (let emote of bwasdData.personalEmotes[user]) {
        HelperBWASYA.items.bwasdPrivateEmotes[user][emote.code] = { id: emote._id, zeroWidth: !!emote.visibility_simple?.filter((t) => t == "ZERO_WIDTH").length, url: emote.url };
      }
    }
  },
  addUser(userID, username) {
    if (typeof userID === "string") userID = parseInt(userID);
    return new Promise((resolve) => {
      HelperBWASYA.items.bwasdUsers[userID] = { username, lastUpdate: Date.now() };
      resolve();
    });
  },
  tryAddUser(user_id, user_login) {
    if (HelperBWASYA.isBusy) return;
    HelperBWASYA.removeUsers();

    HelperBWASYA.isBusy = true;
    let beforeEmotes = Object.keys(HelperBWASYA.emotes).length;

    HelperBWASYA.updateUserChannelEmotes(user_id, user_login)
      .then(() => HelperBWASYA.update())
      .then(() => ovg.log(`Пользователь ${user_login} и ${Object.keys(HelperBWASYA.emotes).length - beforeEmotes} эмоции добавлены.`))
      .catch((err) => ovg.log(err, "error"))
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
          if (i == l) resolve();
        });
      }
    });
  },
  addToChatMenu() {
    document.querySelector("div.emoji__head__options")?.insertAdjacentHTML("beforeend", `<div class="option bwasd-emoji"> BetterWASYA </div>`);
    let bwasdEmotes = HelperBWASYA.items.bwasdEmotes;
    let bwasdUsers = HelperBWASYA.items.bwasdUsers;

    document.querySelector("div.option.bwasd-emoji")?.addEventListener("click", () => {
      $("div.emoji__head__options > .active")?.removeClass("active");

      let timerId = setTimeout(function tick() {
        $("div.option.bwasd-emoji")?.addClass("active");

        $(".emoji__body > wasd-chat-smiles-smiles")?.css("display", "none");
        $(".emoji__body > wasd-chat-smiles-stickers")?.css("display", "none");

        let emoteBodybwasd = document.querySelector(".emoji__body");
        if (emoteBodybwasd) {
          emoteBodybwasd.insertAdjacentHTML(
            "beforeend",
            `<wasd-chat-emoji-smiles-bwasd><div class="smiles-block-better"></div>${
              settings.wasd.searchInBwasdEmotes
                ? `<div style="border-top: 1px solid rgba(var(--wasd-color-switch--rgb),.16);"><input type="search" placeholder="Поиск эмоций" class="option bwasdemojiSearch-shat" style="background: url(${git_url}img/search.png) no-repeat 10px;background-color: var(--wasd-color-prime);border-bottom-width: 0px!important;width: 100%;"></div>`
                : ""
            }</wasd-chat-emoji-smiles-bwasd>`
          );
          let EmoteListbwasd = emoteBodybwasd.querySelector("div.smiles-block-better");

          if (EmoteListbwasd) {
            let emotes = {};
            for (let userID in bwasdEmotes) {
              if (bwasdEmotes.hasOwnProperty(userID)) {
                const splitdev = document.createElement("div");
                splitdev.classList.add("smile-set");
                splitdev.innerHTML = `<div class="smile-set__title"><i class="wasd-icons-dev"></i> ${
                  typeof bwasdUsers[userID].username == "undefined" ? userID : bwasdUsers[userID].username
                } </div><div class="smile-set__smiles"></div>`;
                EmoteListbwasd.append(splitdev);
                let index = 0;

                const stickers__line = splitdev.querySelector(".smile-set__smiles");
                for (let emoteCode in bwasdEmotes[userID]) {
                  if (bwasdEmotes[userID].hasOwnProperty(emoteCode)) {
                    if (typeof emotes[emoteCode] === "undefined") {
                      emotes[emoteCode] = bwasdEmotes[userID][emoteCode];
                      index++;

                      let div = document.createElement("div");
                      div.className = "smile";
                      div.style.position = "relative";
                      div.innerHTML = `<img src="${HelperBWASYA.emotes[emoteCode]?.url?.x1}" srcset="${HelperBWASYA.emotes[emoteCode]?.url?.x2}" alt=${HTML.decode(emoteCode)} />
                      <ovg-tooltip><div class="ovg tooltip ${
                        index % 7 === 0 ? "tooltip_position-topRight" : index % 7 === 1 ? "tooltip_position-topLeft" : "tooltip_position-top"
                      } tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left ovg"> ${HTML.decode(emoteCode)} </div></div></ovg-tooltip>`;

                      stickers__line.append(div);
                      div
                        .querySelector("img")
                        .addEventListener("click", () =>
                          appendUsernameToTextarea(
                            `<img class="message-smile" style="width: auto;" alt="${HTML.decode(emoteCode)}" src="${HelperBWASYA.emotes[emoteCode]?.url?.x1}" srcset="${
                              HelperBWASYA.emotes[emoteCode]?.url?.x2
                            }" />`,
                            false
                          )
                        );

                      div.querySelector("img").addEventListener("mouseenter", () => div.querySelector(".tooltip").classList.add("tooltip_visible"));
                      div.querySelector("img").addEventListener("mouseleave", () => div.querySelector(".tooltip").classList.remove("tooltip_visible"));
                    }
                  }
                }

                if (Object.keys(bwasdEmotes[userID]).length === 0) {
                  let div = document.createElement("div");
                  div.classList.add("text");
                  div.innerText = "У пользователя нет смайликов..";
                  stickers__line.append(div);
                }
              }
            }

            // bind search emoji chat
            let inputbwasd, filterbwasd, ulbwasd, optionsbwasd, titlebwasd, ibwasd;
            inputbwasd = document.querySelector("input.bwasdemojiSearch-shat");
            inputbwasd?.addEventListener("input", () => {
              filterbwasd = inputbwasd.value.toUpperCase();
              ulbwasd = document.querySelector("wasd-chat-emoji-smiles-bwasd .smiles-block-better");

              optionsbwasd = ulbwasd.querySelectorAll(".smile");
              for (ibwasd = 0; ibwasd < optionsbwasd.length; ibwasd++) {
                titlebwasd = optionsbwasd[ibwasd].querySelector("img").alt;
                if (!titlebwasd) return;
                if (titlebwasd.toUpperCase().indexOf(filterbwasd) != -1) {
                  optionsbwasd[ibwasd].style.display = "";
                } else {
                  optionsbwasd[ibwasd].style.display = "none";
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

        $(".emoji__body > wasd-chat-smiles-smiles")?.css("display", "");
        $(".emoji__body > wasd-chat-smiles-stickers")?.css("display", "");
      });
    }
  },
};
