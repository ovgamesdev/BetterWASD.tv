const HelperTV7 = {
  isBusy: false,
  emotes: {},

  updateSettings(top = false) {
    if (chrome.runtime?.id)
      chrome.storage.local.get((items) => {
        HelperTV7.fetchGlobalEmotes(items, top).finally(() => {
          let tv7EmoteList = BetterStreamChat.settingsDiv.querySelector(" #tv7EmoteList");
          tv7EmoteList.innerText = "";

          tv7Emotes = {};
          tv7Users = {};
          tv7Emotes["global"] = items.tv7Emotes["global"];
          tv7Users["global"] = items.tv7Users["global"];
          for (let userID in tv7Emotes) {
            if (tv7Emotes.hasOwnProperty(userID)) {
              let splitdev = document.createElement("div");
              splitdev.classList.add("stickers__div-ovg");
              splitdev.innerHTML = `<div class="stickers__info-ovg" style="top:-10px"><div class="stickers__info__line-ovg"></div><div class="stickers__info__text-ovg"> ${
                typeof tv7Users[userID].username == "undefined" ? userID : tv7Users[userID].username
              } </div><div class="stickers__info__line-ovg"></div></div><div class="stickers__line-ovg"></div>`;
              tv7EmoteList.append(splitdev);
              let stickers__line = splitdev.querySelector(".stickers__line-ovg");
              for (let emoteCode in tv7Emotes[userID]) {
                if (tv7Emotes[userID].hasOwnProperty(emoteCode)) {
                  let div = document.createElement("div");
                  let a = document.createElement("a");
                  let img = document.createElement("img");
                  let div_span = document.createElement("div");
                  let span = document.createElement("span");
                  div.classList.add("div_emoteCard");
                  span.innerText = HTML.decode(emoteCode);
                  img.src = `https://cdn.7tv.app/emote/${HelperTV7.emotes[emoteCode]?.id || HelperTV7.emotes[emoteCode]}/2x`;
                  a.href = `https://7tv.app/emotes/${HelperTV7.emotes[emoteCode]?.id || HelperTV7.emotes[emoteCode]}`;
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
            }
          }
        });
      });
  },
  loaded() {
    chrome.storage.onChanged.addListener(async (changes, namespace) => {
      if (namespace === "local") {
        HelperTV7.update();
      } else if (namespace === "sync") {
        settings = await Helper.getSettings();
        BetterStreamChat.update();
      }
    });
  },
  fetchGlobalEmotes(items, top = false) {
    return new Promise((resolve) => {
      let tv7Emotes = items.tv7Emotes || {};
      let tv7Users = items.tv7Users || {};
      if (typeof tv7Users.global === "undefined" || Date.now() - tv7Users.global.lastUpdate > 86400000 || top) {
        new Promise((resolve, reject) => {
          $.ajax(`https://api.7tv.app/v2/emotes/global`).always((out, textStatus, xhr) => {
            if (xhr.status === 200) {
              return resolve(out);
            } else {
              return reject();
            }
          });
        })
          .then((data) => {
            tv7Emotes.global = {};
            for (let emote of data) {
              tv7Emotes.global[emote.name] = {
                id: emote.id,
                zeroWidth: !!emote.visibility_simple.filter((t) => t == "ZERO_WIDTH").length,
              };
            }
          })
          .finally(() => {
            tv7Users.global = {
              lastUpdate: Date.now(),
            };
            items.tv7Users = tv7Users;
            items.tv7Emotes = tv7Emotes;
            if (chrome.runtime?.id) chrome.storage.local.set({ tv7Users, tv7Emotes }, () => resolve());
          });
      } else {
        resolve();
      }
    });
  },
  update() {
    return new Promise((resolve) => {
      if (chrome.runtime?.id)
        chrome.storage.local.get((items) => {
          HelperTV7.fetchGlobalEmotes(items).finally(() => {
            tv7Emotes = {};
            tv7Users = {};
            tv7Emotes["global"] = items.tv7Emotes["global"];
            tv7Users["global"] = items.tv7Users["global"];
            let emotes = {};

            for (let userID in tv7Emotes) {
              if (tv7Emotes.hasOwnProperty(userID)) {
                for (let emoteCode in tv7Emotes[userID]) {
                  if (tv7Emotes[userID].hasOwnProperty(emoteCode)) {
                    emotes[emoteCode] = tv7Emotes[userID][emoteCode];
                  }
                }
              }
            }

            HelperTV7.emotes = emotes;
            HelperTV7.updateSettings();
            resolve();
          });
        });
    });
  },
  replaceText(text) {
    let split = text.split(" ");
    let newText = [];
    for (let word of split) {
      size = Number(settings.wasd.bttvEmoteSize) + 1;
      if (typeof size === "undefined") {
        size = 2;
      }
      if (size == 3) size = 4;

      if (HelperTV7.emotes[word]) {
        let user = "";
        if (settings.wasd.hoverTooltipEmote) {
          for (let userID in tv7Emotes) {
            if (typeof tv7Emotes[userID][word] == "string" || typeof tv7Emotes[userID][word]?.id == "string") {
              user = userID;
              break;
            }
          }
        }
        let title = ` Смайл:&nbsp;${word} <br> ${typeof tv7Users[user]?.username == "string" ? `Канал:&nbsp;${tv7Users[user]?.username} <br> Эмоции на канале 7TV` : "Общедоступный 7TV"} `;
        word = `<div data-code="${word}" class="bttv-emote tooltip-wrapper" tooltip="${title}" data-title="${title}"> <img class="stickerovg tv7 small" style="vertical-align: middle; width: auto!important;" src="https://cdn.7tv.app/emote/${
          this.emotes[word]?.id || this.emotes[word]
        }/${size}x" alt="${word}" /> <span class="chat-message-text stickertext stickerovg_text">Стикер</span> </div>`;
      }

      newText.push(word);
    }
    return newText.join(" ");
  },
  getUserEmotes(username) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `https://api.7tv.app/v2/users/${username}/emotes`,
        success: (out) => resolve(out),
        error: (out) => reject(out?.message),
      });
    });
  },
  async updateUserChannelEmotes(userID, username) {
    try {
      const tv7Data = await HelperTV7.getUserEmotes(username);
      HelperTV7.updateEmotes(userID, tv7Data);
      return await HelperTV7.addUser(userID, username);
    } catch (err) {
      return await Promise.reject("У пользователя нет TV7.");
    }
  },
  updateEmotes(userID, tv7Data) {
    tv7Emotes[userID] = {};
    let emoteList = [];
    if (Array.isArray(tv7Data)) {
      emoteList = emoteList.concat(tv7Data);
    }
    /*if (Array.isArray(tv7Data.sharedEmotes)) {
        emoteList = emoteList.concat(tv7Data.sharedEmotes);
    }*/
    for (let emote of emoteList) {
      tv7Emotes[userID][emote.name] = {
        id: emote.id,
        zeroWidth: !!emote.visibility_simple.filter((t) => t == "ZERO_WIDTH").length,
      };
    }
  },
  addUser(userID, username) {
    if (typeof userID === "string") userID = parseInt(userID);
    return new Promise((resolve) => {
      let addUser = typeof tv7Users[userID] === "undefined";
      tv7Users[userID] = {
        username,
        lastUpdate: Date.now(),
      };
      if (chrome.runtime?.id)
        chrome.storage.local.set({ tv7Users, tv7Emotes }, () => {
          if (addUser) HelperTV7.addUserToList(userID);
          resolve();
        });
    });
  },
  tryAddUser() {
    let username = tv7AddUser.value.trim();
    if (!username.length) return;
    if (HelperTV7.isBusy) return;

    tv7AddUser.setAttribute("disabled", "disabled");
    tv7AddUserBtn.setAttribute("disabled", "disabled");
    HelperTV7.isBusy = true;
    let beforeEmotes = Object.keys(HelperTV7.emotes).length;
    let userID;
    HelperTwitch.getUserID(username)
      .then((data) => {
        if (data.length) {
          userID = data[0].id;
          username = data[0].display_name;
          if (typeof tv7Users[userID] !== "undefined") return Promise.reject("Пользователь уже в списке");
          return HelperTV7.updateUserChannelEmotes(userID, data[0].display_name);
        } else {
          return Promise.reject(`Пользователь Twitch не найден: ${username}`);
        }
      })
      .then(() => {
        return HelperTV7.update();
      })
      .then(() => {
        let newEmotes = Object.keys(HelperTV7.emotes).length - beforeEmotes;
        alertify.success(`Пользователь ${username} и ${newEmotes} уникальные эмоции добавлены.`, 3);
      })
      .catch((err) => {
        alertify.error(err, 5);
      })
      .finally(() => {
        tv7AddUser.value = "";
        tv7AddUser.removeAttribute("disabled");
        tv7AddUserBtn.removeAttribute("disabled");
        HelperTV7.isBusy = false;
      });
  },
  addUserToList(userID, list) {
    list = list || BetterStreamChat.settingsDiv.querySelector(".tv7UserList");
    if (userID === "global") return;
    let user = tv7Users[userID];
    let item = document.createElement("tr");
    item.classList.add(`table-menu__block`);
    item.style = "justify-content: space-between;";
    item.innerHTML = `<td><div><p title="${user.username}"> ${user.username} </p></div></td> <td><div><p> ${new Date(user.lastUpdate).toLocaleString()} </p></div></td> <td class="td-btn-remove"><div>
        <ovg-button class="flat-btn ovg removeUser"> <button class="medium ovg removeUser warning" data="${userID}"><i class="wasd-icons-delete" style="pointer-events: none;"></i></button> <ovg-tooltip><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Удалить </div></div></ovg-tooltip> </ovg-button>
        <ovg-button class="flat-btn ovg updateUser" style="left: 10px;"> <button class="basic medium ovg updateUser" data="${userID}"><i class="wasd-icons-record-icon" style="pointer-events: none;"></i></button> <ovg-tooltip><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Обновить </div></div></ovg-tooltip> </ovg-button>
        </div></td>`;
    list.append(item);
    item.querySelector(".removeUser").addEventListener("click", () => {
      HelperTV7.removeUser(userID);
    });
    item.querySelector(".updateUser").addEventListener("click", () => {
      HelperTV7.updateUserChannelEmotes(userID, user.username);
    });
  },
  removeUser(userID) {
    delete tv7Users[userID];
    delete tv7Emotes[userID];
    if (chrome.runtime?.id) chrome.storage.local.set({ tv7Users, tv7Emotes });
  },
  updateEmotesTv7() {},
  restoreSettings(items) {
    return new Promise((resolve, reject) => {
      if (chrome.runtime?.id) chrome.storage.local.set({ tv7Users: items.tv7Users, tv7Emotes: {} });

      let l = 0;
      let i = 0;

      for (let userID in items.tv7Users) {
        l++;
      }

      for (let userID in items.tv7Users) {
        HelperTV7.updateUserChannelEmotes(userID, items.tv7Users[userID].username).finally(() => {
          i++;
          HelperSettings.showMessage(`7TV ${i}/${l}`, "success");
          if (i == l) {
            resolve();
          }
        });
      }
    });
  },
  addToChatMenu() {
    document.querySelector("div.emoji__head__options").insertAdjacentHTML("beforeend", `<div class="option tv7-emoji"><i class="ovg-icon-tv7" style="pointer-events: none;"></i></div>`);

    let tv7Emotes;
    let tv7Users;
    if (chrome.runtime?.id)
      chrome.storage.local.get((items) => {
        HelperTV7.fetchGlobalEmotes(items).finally(() => {
          tv7Emotes = {};
          tv7Users = {};
          tv7Emotes["global"] = items.tv7Emotes["global"];
          tv7Users["global"] = items.tv7Users["global"];
        });
      });

    document.querySelector("div.option.tv7-emoji").addEventListener("click", () => {
      $("div.emoji__head__options > .active")?.removeClass("active");

      let timerId = setTimeout(function tick() {
        $("div.option.tv7-emoji")?.addClass("active");

        $(".emoji__body > wasd-chat-emoji-smiles")?.css("display", "none");
        $(".emoji__body > wasd-chat-emoji-stickers")?.css("display", "none");

        let emoteBodytv7 = document.querySelector(".emoji__body");
        if (emoteBodytv7) {
          document.querySelector("wasd-chat-emoji-smiles-ffz")?.remove();
          document.querySelector("wasd-chat-emoji-smiles-bttv")?.remove();
          document.querySelector("wasd-chat-emoji-smiles-bwasd")?.remove();

          emoteBodytv7.insertAdjacentHTML(
            "beforeend",
            `<wasd-chat-emoji-smiles-tv7><div class="emoji-ovg"></div><div style="border-top: 1px solid rgba(var(--wasd-color-switch--rgb),.16);"><input type="search" placeholder="Поиск эмоций" class="option tv7emojiSearch-shat" style="background: url(${
              git_url + "img/search.png"
            }) no-repeat 10px;background-color: var(--wasd-color-prime);border-bottom-width: 0px!important;/* margin-left: 10px; *//* width: calc(100% - 20px); */width: 100%;"></div></wasd-chat-emoji-smiles-tv7>`
          );
          let EmoteListtv7 = emoteBodytv7.querySelector("div.emoji-ovg");
          //ovg.log(HelperTV7.emotes);
          if (EmoteListtv7) {
            let emotes = {};
            for (let userID in tv7Emotes) {
              if (tv7Emotes.hasOwnProperty(userID)) {
                let splitdev = document.createElement("div");
                splitdev.classList.add("stickers__div-ovg");

                splitdev.innerHTML = `<div class="stickers__info-ovg"><div class="stickers__info__line-ovg"></div><div class="stickers__info__text-ovg"> ${
                  typeof tv7Users[userID].username == "undefined" ? userID : tv7Users[userID].username
                } </div><div class="stickers__info__line-ovg"></div></div><div class="stickers__line-ovg"></div>`;
                EmoteListtv7.append(splitdev);

                let stickers__line = splitdev.querySelector(".stickers__line-ovg");
                for (let emoteCode in tv7Emotes[userID]) {
                  if (tv7Emotes[userID].hasOwnProperty(emoteCode)) {
                    if (typeof emotes[emoteCode] === "undefined") {
                      emotes[emoteCode] = tv7Emotes[userID][emoteCode];

                      let img = document.createElement("img");
                      img.src = `https://cdn.7tv.app/emote/${HelperTV7.emotes[emoteCode]?.id || HelperTV7.emotes[emoteCode]}/1x`;
                      img.classList.add("emoji__item-ovg");
                      img.title = HTML.decode(emoteCode);
                      img.alt = HTML.decode(emoteCode);

                      stickers__line.append(img);
                      img.addEventListener("click", () => {
                        let textareatv7 = document.querySelector(".footer > div > textarea");
                        textareatv7.value += HTML.decode(emoteCode) + " ";
                        textareatv7.focus();
                        textareatv7.dispatchEvent(new Event("input"));
                      });
                    }
                  }
                }
              }
            }

            // bind search emoji chat
            let inputtv7, filtertv7, ultv7, optionstv7, titletv7, itv7;
            inputtv7 = document.querySelector("input.tv7emojiSearch-shat");
            inputtv7.addEventListener("input", () => {
              filtertv7 = inputtv7.value.toUpperCase();
              ultv7 = document.querySelector("wasd-chat-emoji-smiles-tv7 .emoji-ovg");

              optionstv7 = ultv7.querySelectorAll("img.emoji__item-ovg");
              for (itv7 = 0; itv7 < optionstv7.length; itv7++) {
                titletv7 = optionstv7[itv7].title;
                if (titletv7) {
                  if (titletv7.toUpperCase().indexOf(filtertv7) != -1) {
                    optionstv7[itv7].style.display = "";
                  } else {
                    optionstv7[itv7].style.display = "none";
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

    for (let optintv7 of document.querySelectorAll("div.emoji__head__options > .option")) {
      optintv7.addEventListener("click", (element) => {
        $("div.option.tv7-emoji")?.removeClass("active");
        element.path[0].classList.add("active");

        document.querySelector("wasd-chat-emoji-smiles-tv7")?.remove(); //bttv

        $(".emoji__body > wasd-chat-emoji-smiles")?.css("display", "");
        $(".emoji__body > wasd-chat-emoji-stickers")?.css("display", "");
      });
    }
  },
};
