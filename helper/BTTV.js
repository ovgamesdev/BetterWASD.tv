const HelperBTTV = {
  isBusy: false,
  emotes: {},

  updateSettings() {
    let bttvEmoteList = BetterStreamChat.settingsDiv.querySelector('#bttvEmoteList');
    bttvEmoteList.innerText = '';

    chrome.storage.local.get((items) => {
      HelperBTTV.fetchGlobalEmotes(items).finally(() => {
        bttvEmotes = items.bttvEmotes;
        bttvUsers = items.bttvUsers;
        for (let userID in items.bttvEmotes) {
          if (items.bttvEmotes.hasOwnProperty(userID)) {
            let splitdev = document.createElement('div');
            splitdev.classList.add('stickers__div-ovg')
            splitdev.innerHTML = `<div class="stickers__info-ovg" style="top:-10px"><div class="stickers__info__line-ovg"></div><div class="stickers__info__text-ovg"> ${typeof bttvUsers[userID].username == 'undefined' ? userID : bttvUsers[userID].username} </div><div class="stickers__info__line-ovg"></div></div><div class="stickers__line-ovg"></div>`
            bttvEmoteList.append(splitdev);
            let stickers__line = splitdev.querySelector('.stickers__line-ovg')
            for (let emoteCode in items.bttvEmotes[userID]) {
              if (items.bttvEmotes[userID].hasOwnProperty(emoteCode)) {
                let div = document.createElement('div');
                let a = document.createElement('a');
                let img = document.createElement('img');
                let div_span = document.createElement('div');
                let span = document.createElement('span');
                div.classList.add('div_emoteCard');
                span.innerText = HTML.decode(emoteCode);
                img.src = `https://cdn.betterttv.net/emote/${HelperBTTV.emotes[emoteCode]}/2x`;
                a.href = `https://betterttv.com/emotes/${HelperBTTV.emotes[emoteCode]}`;
                a.target = '_blank';
                a.classList.add('emoteCard');
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
      })
    });

    let list = BetterStreamChat.settingsDiv.querySelector('.bttvUserList');
    list.innerText = '';
    for (let userID in bttvUsers) {
      if (bttvUsers.hasOwnProperty(userID)) {
        HelperBTTV.addUserToList(userID, list);
      }
    }
  },
  loaded() {
    chrome.storage.onChanged.addListener(async (changes, namespace) => {
      if (namespace === 'local') {
        HelperBTTV.update();
      } else if (namespace === 'sync') {
        settings = await Helper.getSettings();
        BetterStreamChat.update();
      }
    });
  },
  fetchGlobalEmotes(items) {
    return new Promise((resolve) => {
      let bttvEmotes = items.bttvEmotes || {};
      let bttvUsers = items.bttvUsers || {};
      if (typeof bttvUsers.global === 'undefined' || Date.now() - bttvUsers.global.lastUpdate > 604800000) {

        new Promise((resolve, reject) => {
          $.ajax(`https://api.betterttv.net/3/cached/emotes/global`).always((out, textStatus, xhr) => {
            if (xhr.status === 200) {
              return resolve(out);
            } else {
              return reject();
            }
          })
        }).then((data) => {
          bttvEmotes.global = {};
          for (let emote of data) {
            bttvEmotes.global[emote.code] = emote.id;
          }
        }).finally(() => {
          bttvUsers.global = {
            lastUpdate: Date.now()
          };
          items.bttvUsers = bttvUsers;
          items.bttvEmotes = bttvEmotes;
          chrome.storage.local.set({
            bttvUsers,
            bttvEmotes
          }, () => resolve());
        });
      } else {
        resolve();
      }
    });
  },
  update() {
    return new Promise((resolve) => {
      chrome.storage.local.get((items) => {
        HelperBTTV.fetchGlobalEmotes(items).finally(() => {
          bttvEmotes = items.bttvEmotes;
          bttvUsers = items.bttvUsers;
          let emotes = {};

          for (let userID in items.bttvEmotes) {
            if (items.bttvEmotes.hasOwnProperty(userID)) {
              for (let emoteCode in items.bttvEmotes[userID]) {
                if (items.bttvEmotes[userID].hasOwnProperty(emoteCode)) {
                  emotes[emoteCode] = items.bttvEmotes[userID][emoteCode];
                }
              }
            }
          }

          HelperBTTV.emotes = emotes;
          HelperBTTV.updateSettings();
          resolve();
        });
      });
    });
  },
  replaceText(text) {
    let split = text.split(' ');
    let newText = [];
    for (let word of split) {
      size = Number(settings.wasd.bttvEmoteSize) + 1;
      let link = `https://cdn.betterttv.net/emote/${HelperBTTV.emotes[word]}/${size}x`

      if (HelperBTTV.emotes[word]) {
        let user
        for (let userID in bttvEmotes) {
          if (typeof bttvEmotes[userID][word] == 'string') {
            user = userID
            break;
          }
        }
        let title = ` Смайл:&nbsp;${word} <br> ${typeof bttvUsers[user].username == 'string' ? `Канал: ${bttvUsers[user].username} <br> Эмоции на канале BTTV` : 'Общедоступный BTTV'} `
        word = `<div class="bttv-emote tooltip-wrapper" tooltip="${title}" title="${title}"> <img class="stickerovg bttv small" style="vertical-align: middle; width: auto!important;" src="${link}" alt="${word}" /> <span class="chat-message-text stickertext stickerovg_text">Стикер</span> </div>`;
      }

      newText.push(word);
    }
    return newText.join(' ');
  },
  getUserEmotes(userID) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `https://api.betterttv.net/3/cached/users/twitch/${userID}`,
        success: (out) => {
          resolve(out)
        },
        error: (out) => {
          reject(out?.message)
        }
      });
    });
  },
  updateUserChannelEmotes(userID, username) {
    return HelperBTTV.getUserEmotes(userID).then((bttvData) => {
      return HelperBTTV.updateEmotes(userID, bttvData);
    }).then(() => {
      return HelperBTTV.addUser(userID, username);
    }).catch(() => {
      return Promise.reject('У пользователя нет BetterTTV.');
    });
  },
  updateEmotes(userID, bttvData) {
    bttvEmotes[userID] = {};
    let emoteList = [];
    if (Array.isArray(bttvData.channelEmotes)) {
      emoteList = emoteList.concat(bttvData.channelEmotes);
    }
    if (Array.isArray(bttvData.sharedEmotes)) {
      emoteList = emoteList.concat(bttvData.sharedEmotes);
    }
    for (let emote of emoteList) {
      bttvEmotes[userID][emote.code] = emote.id;
    }
  },
  addUser(userID, username) {
    if (typeof userID === 'string') userID = parseInt(userID);
    return new Promise((resolve) => {
      let addUser = typeof bttvUsers[userID] === 'undefined';
      bttvUsers[userID] = {
        username,
        lastUpdate: Date.now()
      };
      chrome.storage.local.set({
        bttvUsers,
        bttvEmotes
      }, () => {
        if (addUser) HelperBTTV.addUserToList(userID);
        resolve();
      });
    });
  },
  tryAddUser() {
    let username = bttvAddUser.value.trim();
    if (!username.length) return;
    if (HelperBTTV.isBusy) return;

    bttvAddUser.setAttribute('disabled', 'disabled');
    bttvAddUserBtn.setAttribute('disabled', 'disabled');
    HelperBTTV.isBusy = true;
    let beforeEmotes = Object.keys(HelperBTTV.emotes).length;
    let userID;
    HelperTwitch.getUserID(username).then((data) => {
      if (data.length) {
        userID = data[0]._id;
        username = data[0].display_name;
        if (typeof bttvUsers[userID] !== 'undefined') return Promise.reject('Пользователь уже в списке');
        return HelperBTTV.updateUserChannelEmotes(userID, data[0].display_name);
      } else {
        return Promise.reject(`Пользователь Twitch не найден: ${username}`);;
      }
    }).then(() => {
      return HelperBTTV.update();
    }).then(() => {
      let newEmotes = Object.keys(HelperBTTV.emotes).length - beforeEmotes;
      HelperSettings.showMessage(`Пользователь ${username} и ${newEmotes} уникальные эмоции добавлены.`, 'success');
    }).catch((err) => {
      HelperSettings.showMessage(err, 'error');
    }).finally(() => {
      bttvAddUser.value = '';
      bttvAddUser.removeAttribute('disabled');
      bttvAddUserBtn.removeAttribute('disabled');
      HelperBTTV.isBusy = false;
    });
  },
  addUserToList(userID, list) {
    list = list || BetterStreamChat.settingsDiv.querySelector('.bttvUserList');
    if (userID === 'global') return;
    let user = bttvUsers[userID];
    let item = document.createElement('tr')
    item.classList.add(`table-menu__block`)
    item.style = 'justify-content: space-between;'
    item.innerHTML = `<td><div><p title="${user.username}"> ${user.username} </p></div></td> <td><div><p> ${(new Date(user.lastUpdate)).toLocaleString()} </p></div></td> <td class="td-btn-remove"><div>
        <ovg-button class="flat-btn ovg removeUser"> <button class="medium ovg removeUser warning" data="${userID}"><i class="wasd-icons-delete" style="pointer-events: none;"></i></button> <ovg-tooltip><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Удалить </div></div></ovg-tooltip> </ovg-button>
        <ovg-button class="flat-btn ovg updateUser" style="left: 10px;"> <button class="basic medium ovg updateUser" data="${userID}"><i class="wasd-icons-record-icon" style="pointer-events: none;"></i></button> <ovg-tooltip><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Обновить </div></div></ovg-tooltip> </ovg-button>
        </div></td>`;
    list.append(item)
    item.querySelector('.removeUser').addEventListener('click', () => {
      HelperBTTV.removeUser(userID)
    })
    item.querySelector('.updateUser').addEventListener('click', () => {
      HelperBTTV.updateUserChannelEmotes(userID, user.username)
    })
  },
  removeUser(userID) {
    delete bttvUsers[userID]
    delete bttvEmotes[userID]
    chrome.storage.local.set({
      bttvUsers,
      bttvEmotes
    });
  },
  updateEmotesBttv() {
    chrome.storage.local.get((items) => {
      for (let userID in items.bttvEmotes) {
        HelperBTTV.updateUserChannelEmotes(userID, items.bttvUsers[userID].username)
      }
    });
  },
  restoreSettings(items) {
    return new Promise((resolve, reject) => {

      chrome.storage.local.set({
        bttvUsers: items.bttvUsers,
        bttvEmotes: {}
      });

      let l = 0
      let i = 0

      for (let userID in items.bttvUsers) {
        l++
      }

      for (let userID in items.bttvUsers) {
        HelperBTTV.updateUserChannelEmotes(userID, items.bttvUsers[userID].username).finally(() => {
          i++
          HelperSettings.showMessage(`BTTV ${i}/${l}`, 'success')
          if (i == l) {
            resolve()
          }
        })
      }
    });
  },
  addToChatMenu() {
    document.querySelector('div.emoji__head__options')?.insertAdjacentHTML("beforeend", `<div class="option bttv-emoji"><i ovg="" class="ovg-icon-bttv" style="pointer-events: none;"></i></div>`)
    
    let bttvEmotes
    let bttvUsers
    chrome.storage.local.get((items) => {
      HelperBTTV.fetchGlobalEmotes(items).finally(() => {
        bttvEmotes = items.bttvEmotes;
        bttvUsers = items.bttvUsers;
      })
    });

    document.querySelector('div.option.bttv-emoji')?.addEventListener('click', () => {

      $('div.emoji__head__options > .active')?.removeClass( "active" );

      let timerId = setTimeout(function tick() {

        $('div.option.bttv-emoji')?.addClass( "active" );

        $('.emoji__body > wasd-chat-emoji-smiles')?.css("display", "none")
        $('.emoji__body > wasd-chat-emoji-stickers')?.css("display", "none")

        let emoteBodybttv = document.querySelector('.emoji__body');
        if (emoteBodybttv) {
          document.querySelector('wasd-chat-emoji-smiles-ffz')?.remove();
          document.querySelector('wasd-chat-emoji-smiles-tv7')?.remove();
          document.querySelector('wasd-chat-emoji-smiles-bwasd')?.remove();

          emoteBodybttv.insertAdjacentHTML("beforeend", `<wasd-chat-emoji-smiles-bttv><div class="emoji-ovg"></div><div style="border-top: 1px solid rgba(var(--wasd-color-switch--rgb),.16);"><input type="search" placeholder="Поиск эмоций" class="option bttvemojiSearch-shat" style="background: url(${chrome.runtime.getURL("img/search.png")}) no-repeat 10px;background-color: var(--wasd-color-prime);border-bottom-width: 0px!important;/* margin-left: 10px; *//* width: calc(100% - 20px); */width: 100%;"></div></wasd-chat-emoji-smiles-bttv>`)
          let EmoteListbttv = emoteBodybttv.querySelector('div.emoji-ovg');
          //ovg.log(HelperBTTV.emotes);

          if (EmoteListbttv) {

            let emotes = {};
            for (let userID in bttvEmotes) {
              if (bttvEmotes.hasOwnProperty(userID)) {

                let splitdev = document.createElement('div');
                splitdev.classList.add('stickers__div-ovg')

                splitdev.innerHTML = `<div class="stickers__info-ovg"><div class="stickers__info__line-ovg"></div><div class="stickers__info__text-ovg"> ${typeof bttvUsers[userID].username == 'undefined' ? userID : bttvUsers[userID].username} </div><div class="stickers__info__line-ovg"></div></div><div class="stickers__line-ovg"></div>`
                EmoteListbttv.append(splitdev);

                let stickers__line = splitdev.querySelector('.stickers__line-ovg')
                for (let emoteCode in bttvEmotes[userID]) {

                  if (bttvEmotes[userID].hasOwnProperty(emoteCode)) {

                    if (typeof emotes[emoteCode] === 'undefined') {

                      emotes[emoteCode] = bttvEmotes[userID][emoteCode];

                      let img = document.createElement('img');
                      img.src = `https://cdn.betterttv.net/emote/${HelperBTTV.emotes[emoteCode]}/1x`;
                      img.classList.add('emoji__item-ovg');
                      img.title = HTML.decode(emoteCode);
                      img.alt = HTML.decode(emoteCode);

                      stickers__line.append(img);
                      img.addEventListener('click', () => {

                        let textareabttv = document.querySelector('.footer > div > textarea')
                        textareabttv.value += HTML.decode(emoteCode) + ' ';
                        textareabttv.focus()
                        textareabttv.dispatchEvent(new Event('input'));
                      });

                    }
                  }
                }

              }
            }

            // bind search emoji chat
            let inputbttv, filterbttv, ulbttv, optionsbttv, titlebttv, ibttv;
            inputbttv = document.querySelector('input.bttvemojiSearch-shat');
            inputbttv.addEventListener('input', () => {
              filterbttv = inputbttv.value.toUpperCase();
              ulbttv = document.querySelector("wasd-chat-emoji-smiles-bttv .emoji-ovg");

              optionsbttv = ulbttv.querySelectorAll("img.emoji__item-ovg");
              for (ibttv = 0; ibttv < optionsbttv.length; ibttv++) {
                titlebttv = optionsbttv[ibttv].title
                if (titlebttv) {
                  if (titlebttv.toUpperCase().indexOf(filterbttv) != -1) {
                    optionsbttv[ibttv].style.display = "";
                  } else {
                    optionsbttv[ibttv].style.display = "none";
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

    for (let optinbttv of document.querySelectorAll('div.emoji__head__options > .option')) {
      optinbttv.addEventListener('click', (element) => {

        $('div.option.bttv-emoji')?.removeClass( "active" );
        element.path[0].classList.add('active')

        document.querySelector('wasd-chat-emoji-smiles-bttv')?.remove();

        $('.emoji__body > wasd-chat-emoji-smiles')?.css("display", "")
        $('.emoji__body > wasd-chat-emoji-stickers')?.css("display", "")
      });
    }
  }
}