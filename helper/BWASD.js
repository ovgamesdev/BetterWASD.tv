const HelperBWASD = {
	items: { bwasdEmotes: {}, bwasdUsers: {} },
  isBusy: false,
  emotes: {},
  host: 'https://betterwasd.herokuapp.com',
  // host: 'http://localhost:5000',
  updateSettings() {
    let bwasdEmoteList = BetterStreamChat.settingsDiv.querySelector('#bwasdEmoteList');
    bwasdEmoteList.innerText = '';

  	let items = HelperBWASD.items

    for (let userID in items.bwasdEmotes) {
      if (items.bwasdEmotes.hasOwnProperty(userID)) {
        let splitdev = document.createElement('div');
        splitdev.classList.add('stickers__div-ovg')
        splitdev.innerHTML = `<div class="stickers__info-ovg" style="top:-10px"><div class="stickers__info__line-ovg"></div><div class="stickers__info__text-ovg"> ${typeof items.bwasdUsers[userID].username == 'undefined' ? userID : items.bwasdUsers[userID].username} </div><div class="stickers__info__line-ovg"></div></div><div class="stickers__line-ovg"></div>`
        bwasdEmoteList.append(splitdev);
        let stickers__line = splitdev.querySelector('.stickers__line-ovg')
        for (let emoteCode in items.bwasdEmotes[userID]) {
          if (items.bwasdEmotes[userID].hasOwnProperty(emoteCode)) {
            let div = document.createElement('div');
            let a = document.createElement('a');
            let img = document.createElement('img');
            let div_span = document.createElement('div');
            let span = document.createElement('span');
            div.classList.add('div_emoteCard');
            span.innerText = HTML.decode(emoteCode);
            img.src = `${HelperBWASD.host}/cached/emote/${HelperBWASD.emotes[emoteCode]}/2x`;
            a.href = `https://ovgamesdev.github.io/#/emotes/${HelperBWASD.emotes[emoteCode]}`;
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

        if (Object.keys(items.bwasdEmotes[userID]).length == 0) {
          let div = document.createElement('div');
          div.classList.add('emoji__item-ovg');
          div.innerText = 'У пользователя нет BetterWASD'

          stickers__line.append(div);
        }
      }
    }
  },
  loaded() {
    if (!settings.wasd.bwasdEmotes) return
    for (let msg of document.querySelectorAll('wasd-chat-message .message-text > span')) {
      msg.innerHTML = HelperBWASD.replaceText(msg.innerHTML);
      
      var tooltips = msg.querySelectorAll(".tooltip-wrapper");
      for (let tooltip of tooltips) {
        $( tooltip ).tooltip({
          classes: { "ui-tooltip": "ui-ovg-tooltip" },
          content: tooltip.title,
          show: false,
          hide: false,
          position: {
            my: "center bottom",
            at: "center top-5",
            within: $('wasd-chat')
          }
        });
      }
      HelperWASD.updateHoverTooltipEmote(settings.wasd.hoverTooltipEmote)
    }

    for (let element of document.querySelectorAll('wasd-chat-message .message-text > span .chat-message-mention')) {
      element.addEventListener('click', ({ target }) => {
        let username = target.getAttribute('username')?.split('@').join('')
        if (username) {
          if (settings.wasd.onClickMention.toString() === '1') {
            if (textarea) {
              textarea.value += target.getAttribute('username').trim() + ' ';
              textarea.dispatchEvent(new Event('input'));
              textarea.focus()
            }
          } else if (settings.wasd.onClickMention.toString() === '2') {
            if (!HelperWASD.addUsernameToTextarea(username)) {
              HelperWASD.createUserViewerCard(username);
            }
          }
        }
      })
    }

  },
  update() {
    return new Promise((resolve) => {
    	let items = HelperBWASD.items

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

      HelperBWASD.emotes = emotes;
      HelperBWASD.updateSettings();
      resolve();

    });
  },
  replaceText(text) {
    let split = text.split(' ');
    let newText = [];
    for (let word of split) {
      size = Number(settings.wasd.bttvEmoteSize) + 1;


      let link = `${HelperBWASD.host}/cached/emote/${HelperBWASD.emotes[word]}/${size}x`

      if (HelperBWASD.emotes[word]) {
        let user
        for (let userID in HelperBWASD.items.bwasdEmotes) {
          if (typeof HelperBWASD.items.bwasdEmotes[userID][word] == 'string') {
            user = userID
            break;
          }
        }
        let title = ` Смайл:&nbsp;${word} <br> ${typeof HelperBWASD.items.bwasdUsers[user].username == 'string' ? `Канал: ${HelperBWASD.items.bwasdUsers[user].username} <br> Эмоции на канале BWASD` : 'Общедоступный BWASD'} `
        word = `<div class="bttv-emote tooltip-wrapper" tooltip="${title}" title="${title}"> <img class="stickerovg bwasd small" style="vertical-align: middle; width: auto!important;" src="${link}" alt="${word}" /> <span class="chat-message-text stickertext stickerovg_text">Стикер</span> </div>`;
      }

      newText.push(word);
    }
    return newText.join(' ');
  },
  getUserEmotes(userID) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${HelperBWASD.host}/api/v1/emote/userwithglobal/${userID}`,
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
    return HelperBWASD.getUserEmotes(userID).then((bwasdData) => {
      return HelperBWASD.updateEmotes(userID, bwasdData);
    }).then(() => {
      return HelperBWASD.addUser(userID, username);
    }).catch((err) => {
      return Promise.reject('У пользователя нет BetterWASD.');
    });
  },
  updateEmotes(userID, bwasdData) {
    HelperBWASD.items.bwasdEmotes[userID] = {};
    HelperBWASD.items.bwasdEmotes.global = {};
    HelperBWASD.items.bwasdUsers.global = { lastUpdate: Date.now() };
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
      HelperBWASD.items.bwasdEmotes[userID][emote.code] = emote._id;
    }
    for (let emote of globalList) {
      HelperBWASD.items.bwasdEmotes.global[emote.code] = emote._id;
    }
  },
  addUser(userID, username) {
    if (typeof userID === 'string') userID = parseInt(userID);
    return new Promise((resolve) => {
      let addUser = typeof HelperBWASD.items.bwasdUsers[userID] === 'undefined';
      HelperBWASD.items.bwasdUsers[userID] = {
        username,
        lastUpdate: Date.now()
      };
      resolve();
    });
  },
  tryAddUser(user_id, user_login) {
    if (HelperBWASD.isBusy) return
    HelperBWASD.removeUsers()

    HelperBWASD.isBusy = true;
    let beforeEmotes = Object.keys(HelperBWASD.emotes).length;

    HelperBWASD.updateUserChannelEmotes(user_id, user_login).then(() => {
      return HelperBWASD.update();
    }).then(() => {
      let newEmotes = Object.keys(HelperBWASD.emotes).length - beforeEmotes;
      ovg.log(`Пользователь ${user_login} и ${newEmotes} эмоции добавлены.`);
    }).catch((err) => {
      ovg.log(err, 'error');
    }).finally(() => {
      HelperBWASD.isBusy = false;
      HelperBWASD.loaded();
    });
  },
  removeUsers() {
    HelperBWASD.emotes = {}
    HelperBWASD.items = { bwasdEmotes: {}, bwasdUsers: {} }
  },
  restoreSettings(items) {
    return new Promise((resolve, reject) => {

      let l = 0
      let i = 0

      for (let userID in items.bwasdUsers) {
        l++
      }

      for (let userID in items.bwasdUsers) {
        HelperBWASD.updateUserChannelEmotes(userID, items.bwasdUsers[userID].username).finally(() => {
          i++
          ovg.log(`BWASD ${i}/${l}`, 'success')
          if (i == l) {
            resolve()
          }
        })
      }
    });
  },
  addToChatMenu() {
    document.querySelector('div.emoji__head__options')?.insertAdjacentHTML("beforeend", `<div class="option bwasd-emoji"> <i ovg="" class="ovg-icon-bwasd" style="pointer-events: none;"></i> </div>`)
    let bwasdEmotes = HelperBWASD.items.bwasdEmotes;
    let bwasdUsers = HelperBWASD.items.bwasdUsers;

    document.querySelector('div.option.bwasd-emoji')?.addEventListener('click', () => {

      $('div.emoji__head__options > .active')?.removeClass( "active" );

      let timerId = setTimeout(function tick() {

        $('div.option.bwasd-emoji')?.addClass( "active" );

        $('.emoji__body > wasd-chat-emoji-smiles')?.css("display", "none")
        $('.emoji__body > wasd-chat-emoji-stickers')?.css("display", "none")

        let emoteBodybwasd = document.querySelector('.emoji__body');
        if (emoteBodybwasd) {
          document.querySelector('wasd-chat-emoji-smiles-ffz')?.remove();
          document.querySelector('wasd-chat-emoji-smiles-tv7')?.remove();
          document.querySelector('wasd-chat-emoji-smiles-bttv')?.remove();

          emoteBodybwasd.insertAdjacentHTML("beforeend", `<wasd-chat-emoji-smiles-bwasd><div class="emoji-ovg"></div><div style="border-top: 1px solid rgba(var(--wasd-color-switch--rgb),.16);"><input type="search" placeholder="Поиск эмоций" class="option bwasdemojiSearch-shat" style="background: url(${chrome.runtime?.id ? chrome.runtime.getURL("img/search.png") : ''}) no-repeat 10px;background-color: var(--wasd-color-prime);border-bottom-width: 0px!important;/* margin-left: 10px; *//* width: calc(100% - 20px); */width: 100%;"></div></wasd-chat-emoji-smiles-bwasd>`)
          let EmoteListbwasd = emoteBodybwasd.querySelector('div.emoji-ovg');
          //ovg.log(HelperBWASD.emotes);

          if (EmoteListbwasd) {

            let emotes = {};
            for (let userID in bwasdEmotes) {
              if (bwasdEmotes.hasOwnProperty(userID)) {

                let splitdev = document.createElement('div');
                splitdev.classList.add('stickers__div-ovg')

                splitdev.innerHTML = `<div class="stickers__info-ovg"><div class="stickers__info__line-ovg"></div><div class="stickers__info__text-ovg"> ${typeof bwasdUsers[userID].username == 'undefined' ? userID : bwasdUsers[userID].username} </div><div class="stickers__info__line-ovg"></div></div><div class="stickers__line-ovg"></div>`
                EmoteListbwasd.append(splitdev);

                let stickers__line = splitdev.querySelector('.stickers__line-ovg')
                for (let emoteCode in bwasdEmotes[userID]) {

                  if (bwasdEmotes[userID].hasOwnProperty(emoteCode)) {

                    if (typeof emotes[emoteCode] === 'undefined') {

                      emotes[emoteCode] = bwasdEmotes[userID][emoteCode];

                      let img = document.createElement('img');
                      img.src = `${HelperBWASD.host}/cached/emote/${HelperBWASD.emotes[emoteCode]}/1x`;
                      img.classList.add('emoji__item-ovg');
                      img.title = HTML.decode(emoteCode);
                      img.alt = HTML.decode(emoteCode);

                      stickers__line.append(img);
                      img.addEventListener('click', () => {

                        let textareabwasd = document.querySelector('.footer > div > textarea')
                        textareabwasd.value += HTML.decode(emoteCode) + ' ';
                        textareabwasd.focus()
                        textareabwasd.dispatchEvent(new Event('input'));
                      });

                    }
                  }
                }

                if (Object.keys(bwasdEmotes[userID]).length == 0) {
                  let div = document.createElement('div');
                  div.classList.add('emoji__item-ovg');
                  div.innerText = 'У пользователя нет BetterWASD'

                  stickers__line.append(div);
                }

              }
            }

            // bind search emoji chat
            let inputbwasd, filterbwasd, ulbwasd, optionsbwasd, titlebwasd, ibwasd;
            inputbwasd = document.querySelector('input.bwasdemojiSearch-shat');
            inputbwasd.addEventListener('input', () => {
              filterbwasd = inputbwasd.value.toUpperCase();
              ulbwasd = document.querySelector("wasd-chat-emoji-smiles-bwasd .emoji-ovg");

              optionsbwasd = ulbwasd.querySelectorAll("img.emoji__item-ovg");
              for (ibwasd = 0; ibwasd < optionsbwasd.length; ibwasd++) {
                titlebwasd = optionsbwasd[ibwasd].title
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

    for (let optinbwasd of document.querySelectorAll('div.emoji__head__options > .option')) {
      optinbwasd.addEventListener('click', (element) => {

        $('div.option.bwasd-emoji')?.removeClass( "active" );
        element.path[0].classList.add('active')

        document.querySelector('wasd-chat-emoji-smiles-bwasd')?.remove();

        $('.emoji__body > wasd-chat-emoji-smiles')?.css("display", "")
        $('.emoji__body > wasd-chat-emoji-stickers')?.css("display", "")
      });
    }
  }
}