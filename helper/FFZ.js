const HelperFFZ = {
  isBusy: false,
  emotes: {},

  updateSettings(top = false) {
    if (chrome.runtime?.id)
      chrome.storage.local.get((items) => {
        HelperFFZ.fetchGlobalEmotes(items, top).finally(() => {
          let ffzEmoteList = BetterStreamChat.settingsDiv.querySelector(" #ffzEmoteList");
          ffzEmoteList.innerText = "";

          ffzEmotes = {};
          ffzUsers = {};
          ffzEmotes["global"] = items.ffzEmotes["global"];
          ffzUsers["global"] = items.ffzUsers["global"];
          for (let userID in ffzEmotes) {
            if (ffzEmotes.hasOwnProperty(userID)) {
              let splitdev = document.createElement("div");
              splitdev.classList.add("stickers__div-ovg");
              splitdev.innerHTML = `<div class="stickers__info-ovg" style="top:-10px"><div class="stickers__info__line-ovg"></div><div class="stickers__info__text-ovg"> ${
                typeof ffzUsers[userID].username == "undefined" ? userID : ffzUsers[userID].username
              } </div><div class="stickers__info__line-ovg"></div></div><div class="stickers__line-ovg"></div>`;
              ffzEmoteList.append(splitdev);
              let stickers__line = splitdev.querySelector(".stickers__line-ovg");
              for (let emoteCode in ffzEmotes[userID]) {
                if (ffzEmotes[userID].hasOwnProperty(emoteCode)) {
                  let div = document.createElement("div");
                  let a = document.createElement("a");
                  let img = document.createElement("img");
                  let div_span = document.createElement("div");
                  let span = document.createElement("span");
                  div.classList.add("div_emoteCard");
                  span.innerText = HTML.decode(emoteCode);
                  img.src = `https://cdn.frankerfacez.com/emoticon/${HelperFFZ.emotes[emoteCode]?.id || HelperFFZ.emotes[emoteCode]}/2`;
                  a.href = `https://www.frankerfacez.com/emoticon/${HelperFFZ.emotes[emoteCode]?.id || HelperFFZ.emotes[emoteCode]}`;
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
        HelperFFZ.update();
      } else if (namespace === "sync") {
        settings = await Helper.getSettings();
        BetterStreamChat.update();
      }
    });
  },
  fetchGlobalEmotes(items, top = false) {
    return new Promise((resolve) => {
      let ffzEmotes = items.ffzEmotes || {};
      let ffzUsers = items.ffzUsers || {};
      if (typeof ffzUsers.global === "undefined" || Date.now() - ffzUsers.global.lastUpdate > 86400000 || top) {
        new Promise((resolve, reject) => {
          $.ajax(`https://api.frankerfacez.com/v1/set/global`).always((out, textStatus, xhr) => {
            if (xhr.status === 200) {
              return resolve(out);
            } else {
              return reject();
            }
          });
        })
          .then((data) => {
            ffzEmotes.global = {};
            for (let emote of data.sets[data.default_sets[0]].emoticons) {
              ffzEmotes.global[emote.name] = {
                id: emote.id,
                zeroWidth: false,
              };
            }
          })
          .finally(() => {
            ffzUsers.global = {
              lastUpdate: Date.now(),
            };
            items.ffzUsers = ffzUsers;
            items.ffzEmotes = ffzEmotes;
            if (chrome.runtime?.id) chrome.storage.local.set({ ffzUsers, ffzEmotes }, () => resolve());
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
          HelperFFZ.fetchGlobalEmotes(items).finally(() => {
            ffzEmotes = {};
            ffzUsers = {};
            ffzEmotes["global"] = items.ffzEmotes["global"];
            ffzUsers["global"] = items.ffzUsers["global"];
            let emotes = {};

            for (let userID in ffzEmotes) {
              if (ffzEmotes.hasOwnProperty(userID)) {
                for (let emoteCode in ffzEmotes[userID]) {
                  if (ffzEmotes[userID].hasOwnProperty(emoteCode)) {
                    emotes[emoteCode] = ffzEmotes[userID][emoteCode];
                  }
                }
              }
            }

            HelperFFZ.emotes = emotes;
            HelperFFZ.updateSettings();
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

      if (HelperFFZ.emotes[word]) {
        let user = "";
        if (settings.wasd.hoverTooltipEmote) {
          for (let userID in ffzEmotes) {
            if (typeof ffzEmotes[userID][word] == "number" || typeof ffzEmotes[userID][word]?.id == "number") {
              user = userID;
              break;
            }
          }
        }
        let title = ` Смайл:&nbsp;${word} <br> ${typeof ffzUsers[user]?.username == "string" ? `Канал:&nbsp;${ffzUsers[user]?.username} <br> Эмоции на канале FFZ` : "Общедоступный FFZ"} `;
        word = `<div data-code="${word}" class="bttv-emote tooltip-wrapper" tooltip="${title}" data-title="${title}"> <img class="stickerovg ffz small" style="vertical-align: middle; width: auto!important;" src="https://cdn.frankerfacez.com/emote/${
          this.emotes[word]?.id || this.emotes[word]
        }/${size}" alt="${word}" /> <span class="chat-message-text stickertext stickerovg_text">Стикер</span> </div>`;
      }

      newText.push(word);
    }
    return newText.join(" ");
  },
  getUserEmotes(userID) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `https://api.frankerfacez.com/v1/room/id/${userID}`,
        success: (out) => resolve(out),
        error: (out) => reject(out?.message),
      });
    });
  },
  async updateUserChannelEmotes(userID, username) {
    try {
      const ffzData = await HelperFFZ.getUserEmotes(userID);
      HelperFFZ.updateEmotes(userID, ffzData);
      return await HelperFFZ.addUser(userID, username);
    } catch (err) {
      return await Promise.reject("У пользователя нет FFZ.");
    }
  },
  updateEmotes(userID, ffzData) {
    ffzEmotes[userID] = {};
    let emoteList = [];
    if (Array.isArray(ffzData.sets[ffzData.room.set].emoticons)) {
      emoteList = emoteList.concat(ffzData.sets[ffzData.room.set].emoticons);
    }
    /*if (Array.isArray(ffzData.sharedEmotes)) {
        emoteList = emoteList.concat(ffzData.sharedEmotes);
    }*/
    for (let emote of emoteList) {
      ffzEmotes[userID][emote.name] = {
        id: emote.id,
        zeroWidth: false,
      };
    }
  },
  addUser(userID, username) {
    if (typeof userID === "string") userID = parseInt(userID);
    return new Promise((resolve) => {
      let addUser = typeof ffzUsers[userID] === "undefined";
      ffzUsers[userID] = {
        username,
        lastUpdate: Date.now(),
      };
      if (chrome.runtime?.id)
        chrome.storage.local.set({ ffzUsers, ffzEmotes }, () => {
          if (addUser) HelperFFZ.addUserToList(userID);
          resolve();
        });
    });
  },
  tryAddUser() {
    let username = ffzAddUser.value.trim();
    if (!username.length) return;
    if (HelperFFZ.isBusy) return;

    ffzAddUser.setAttribute("disabled", "disabled");
    ffzAddUserBtn.setAttribute("disabled", "disabled");
    HelperFFZ.isBusy = true;
    let beforeEmotes = Object.keys(HelperFFZ.emotes).length;
    let userID;
    HelperTwitch.getUserID(username)
      .then((data) => {
        if (data.length) {
          userID = data[0].id;
          username = data[0].display_name;
          if (typeof ffzUsers[userID] !== "undefined") return Promise.reject("Пользователь уже в списке");
          return HelperFFZ.updateUserChannelEmotes(userID, data[0].display_name);
        } else {
          return Promise.reject(`Пользователь Twitch не найден: ${username}`);
        }
      })
      .then(() => {
        return HelperFFZ.update();
      })
      .then(() => {
        let newEmotes = Object.keys(HelperFFZ.emotes).length - beforeEmotes;
        alertify.success(`Пользователь ${username} и ${newEmotes} уникальные эмоции добавлены.`, 3);
      })
      .catch((err) => {
        alertify.error(err, 5);
      })
      .finally(() => {
        ffzAddUser.value = "";
        ffzAddUser.removeAttribute("disabled");
        ffzAddUserBtn.removeAttribute("disabled");
        HelperFFZ.isBusy = false;
      });
  },
  addUserToList(userID, list) {
    list = list || BetterStreamChat.settingsDiv.querySelector(".ffzUserList");
    if (userID === "global") return;
    let user = ffzUsers[userID];
    let item = document.createElement("tr");
    item.classList.add(`table-menu__block`);
    item.style = "justify-content: space-between;";
    item.innerHTML = `<td><div><p title="${user.username}"> ${user.username} </p></div></td> <td><div><p> ${new Date(user.lastUpdate).toLocaleString()} </p></div></td> <td class="td-btn-remove"><div>
        <ovg-button class="flat-btn ovg removeUser"> <button class="medium ovg removeUser warning" data="${userID}"><i class="wasd-icons-delete" style="pointer-events: none;"></i></button> <ovg-tooltip><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Удалить </div></div></ovg-tooltip> </ovg-button>
        <ovg-button class="flat-btn ovg updateUser" style="left: 10px;"> <button class="basic medium ovg updateUser" data="${userID}"><i class="wasd-icons-record-icon" style="pointer-events: none;"></i></button> <ovg-tooltip><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Обновить </div></div></ovg-tooltip> </ovg-button>
        </div></td>`;
    list.append(item);
    item.querySelector(".removeUser").addEventListener("click", () => {
      HelperFFZ.removeUser(userID);
    });
    item.querySelector(".updateUser").addEventListener("click", () => {
      HelperFFZ.updateUserChannelEmotes(userID, user.username);
    });
  },
  removeUser(userID) {
    delete ffzUsers[userID];
    delete ffzEmotes[userID];
    if (chrome.runtime?.id) chrome.storage.local.set({ ffzUsers, ffzEmotes });
  },
  updateEmotesFfz() {},
  restoreSettings(items) {
    return new Promise((resolve, reject) => {
      if (chrome.runtime?.id) chrome.storage.local.set({ ffzUsers: items.ffzUsers, ffzEmotes: {} });

      let l = 0;
      let i = 0;

      for (let userID in items.ffzUsers) {
        l++;
      }

      for (let userID in items.ffzUsers) {
        HelperFFZ.updateUserChannelEmotes(userID, items.ffzUsers[userID].username).finally(() => {
          i++;
          HelperSettings.showMessage(`FFZ ${i}/${l}`, "success");
          if (i == l) {
            resolve();
          }
        });
      }
    });
  },
  addToChatMenu() {
    document.querySelector("div.emoji__head__options").insertAdjacentHTML("beforeend", `<div class="option ffz-emoji"><i class="ovg-icon-ffz" style="pointer-events: none;"></i></div>`);

    let ffzEmotes;
    let ffzUsers;
    if (chrome.runtime?.id)
      chrome.storage.local.get((items) => {
        HelperFFZ.fetchGlobalEmotes(items).finally(() => {
          ffzEmotes = {};
          ffzUsers = {};
          ffzEmotes["global"] = items.ffzEmotes["global"];
          ffzUsers["global"] = items.ffzUsers["global"];
        });
      });

    document.querySelector("div.option.ffz-emoji").addEventListener("click", () => {
      $("div.emoji__head__options > .active")?.removeClass("active");

      let timerId = setTimeout(function tick() {
        $(".emoji__body > wasd-chat-emoji-smiles")?.css("display", "none");
        $(".emoji__body > wasd-chat-emoji-stickers")?.css("display", "none");

        let emoteBodyffz = document.querySelector(".emoji__body");
        if (emoteBodyffz) {
          document.querySelector("wasd-chat-emoji-smiles-bttv")?.remove();
          document.querySelector("wasd-chat-emoji-smiles-tv7")?.remove();
          document.querySelector("wasd-chat-emoji-smiles-bwasd")?.remove();

          emoteBodyffz.insertAdjacentHTML(
            "beforeend",
            `<wasd-chat-emoji-smiles-ffz><div class="emoji-ovg"></div><div style="border-top: 1px solid rgba(var(--wasd-color-switch--rgb),.16);"><input type="search" placeholder="Поиск эмоций" class="option ffzemojiSearch-shat" style="background: url(${
              git_url + "img/search.png"
            }) no-repeat 10px;background-color: var(--wasd-color-prime);border-bottom-width: 0px!important;/* margin-left: 10px; *//* width: calc(100% - 20px); */width: 100%;"></div></wasd-chat-emoji-smiles-ffz>`
          );
          let EmoteListffz = emoteBodyffz.querySelector("div.emoji-ovg");
          //ovg.log(HelperFFZ.emotes);

          if (EmoteListffz) {
            let emotes = {};
            for (let userID in ffzEmotes) {
              if (ffzEmotes.hasOwnProperty(userID)) {
                let splitdev = document.createElement("div");
                splitdev.classList.add("stickers__div-ovg");

                let usernameovg;
                if (typeof ffzUsers[userID] != "undefined") {
                  if (typeof ffzUsers[userID].username != "undefined") {
                    usernameovg = ffzUsers[userID].username;
                  } else {
                    usernameovg = userID;
                  }
                } else {
                  usernameovg = userID;
                }

                splitdev.innerHTML = `<div class="stickers__info-ovg"><div class="stickers__info__line-ovg"></div><div class="stickers__info__text-ovg"> ${usernameovg} </div><div class="stickers__info__line-ovg"></div></div><div class="stickers__line-ovg"></div>`;
                EmoteListffz.append(splitdev);

                let stickers__line = splitdev.querySelector(".stickers__line-ovg");
                for (let emoteCode in ffzEmotes[userID]) {
                  if (ffzEmotes[userID].hasOwnProperty(emoteCode)) {
                    if (typeof emotes[emoteCode] === "undefined") {
                      emotes[emoteCode] = ffzEmotes[userID][emoteCode];

                      let img = document.createElement("img");
                      img.src = `https://cdn.frankerfacez.com/emoticon/${HelperFFZ.emotes[emoteCode]?.id || HelperFFZ.emotes[emoteCode]}/1`;
                      img.classList.add("emoji__item-ovg");
                      img.title = HTML.decode(emoteCode);
                      img.alt = HTML.decode(emoteCode);

                      stickers__line.append(img);
                      img.addEventListener("click", () => {
                        let textareaffz = document.querySelector(".footer > div > textarea");
                        textareaffz.value += HTML.decode(emoteCode) + " ";
                        textareaffz.focus();
                        textareaffz.dispatchEvent(new Event("input"));
                      });
                    }
                  }
                }
              }
            }

            // bind search emoji chat
            let inputffz, filterffz, ulffz, optionsffz, titleffz, iffz;
            inputffz = document.querySelector("input.ffzemojiSearch-shat");
            inputffz.addEventListener("input", () => {
              filterffz = inputffz.value.toUpperCase();
              ulffz = document.querySelector("wasd-chat-emoji-smiles-ffz .emoji-ovg");

              optionsffz = ulffz.querySelectorAll("img.emoji__item-ovg");
              for (iffz = 0; iffz < optionsffz.length; iffz++) {
                titleffz = optionsffz[iffz].title;
                if (titleffz) {
                  if (titleffz.toUpperCase().indexOf(filterffz) != -1) {
                    optionsffz[iffz].style.display = "";
                  } else {
                    optionsffz[iffz].style.display = "none";
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

    for (let optin of document.querySelectorAll("div.emoji__head__options > .option")) {
      optin.addEventListener("click", (element) => {
        $("div.option.ffz-emoji")?.removeClass("active");
        element.path[0].classList.add("active");

        document.querySelector("wasd-chat-emoji-smiles-ffz")?.remove();

        $(".emoji__body > wasd-chat-emoji-smiles")?.css("display", "");
        $(".emoji__body > wasd-chat-emoji-stickers")?.css("display", "");
      });
    }
  },
};
