const wasd = {
  style: null,
  isObserverEndBind: false,
  isObserverEndBindBody: false,
  observer: null,
  init() {
    ovg.log("init");
    HelperWASD.loadBwasdData()
    mutationtarget = document.querySelector('wasd-root')
    const config = {
      // attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    }

    const callback = (mutationsList, observer) => {
      for (let mutation of mutationsList) {

        const {
          addedNodes,
          removedNodes
        } = mutation;

        // if (removedNodes.length != 0) console.log('321 removedNodes', removedNodes)
        // if (addedNodes.length != 0) console.log('321 addedNodes', addedNodes)

        const add_chat = [...addedNodes]
          .filter(node => node.nodeType === 1)
          .filter(element => element.matches('wasd-chat-messages'));

        const remove_chat = [...removedNodes]
          .filter(node => node.nodeType === 1)
          .filter(element => element.matches('wasd-chat-messages') || element.matches('wasd-chat-wrapper') || element.matches('wasd-channel') );

        const add_player_buttons_stream = [...addedNodes]
          .filter(node => node.nodeType === 1)
          .filter(element => element.matches('div.media-control.live'));

        const add_settings_button_burger = [...addedNodes]
          .filter(node => node.nodeType === 1)
          .filter(element => element.matches('div#topDiv.fixed-wrapper'));

        const add_wasd_chat_message = [...addedNodes]
          .filter(node => node.nodeType === 1)
          .filter(element => element.matches('wasd-chat-message').parentNode || element.matches('div.block__messages__item'));

        const add_emoji_menu = [...addedNodes]
          .filter(node => node.nodeType === 1)
          .filter(element => element.matches('wasd-chat-emoji'));

        const add_chat_menu = [...addedNodes]
          .filter(node => node.nodeType === 1)
          .filter(element => element.matches('div.menu__block.menu__block-header'));

        const add_carousel_container_chromeless = [...addedNodes]
          .filter(node => node.nodeType === 1)
          .filter(element => element.matches('div.container.chromeless'));

        const add_carousel_pending = [...addedNodes]
          .filter(node => node.nodeType === 1)
          .filter(element => element.matches('div.pending'));

        const add_uptime = [...addedNodes]
          .filter(node => node.nodeType === 1)
          .filter(element => element.matches('div.player-info') || element.matches('div.stream-viewers'));

        const add_wasd_chat_header = [...addedNodes]
          .filter(node => node.nodeType === 1)
          .filter(element => element.matches('div.header'));

        const add_header = [...addedNodes]
          .filter(node => node.nodeType === 1)
          .filter(element => element.matches('div#topDiv.fixed-wrapper'));

        // const add_giftsInfo = [...addedNodes]
        //   .filter(node => node.nodeType === 1)
        //   .filter(element => element.matches('div#giftsInfo.gifts-info'));

        const remove_uptime = [...addedNodes]
          .filter(node => node.nodeType === 1)
          .filter(element => element.matches('div.player-info__stat-value'));

        const add_streaming_player = [...addedNodes]
          .filter(node => node.nodeType === 1)
          .filter(element => element.matches('div.container'));


        const isLive = new URL(document.URL).pathname.split('/')[2] != 'videos' && new URL(document.URL).pathname.split('/')[2] != 'clips' && document.querySelector('wasd-user-plays .user-plays__text')?.textContent != 'стримил'

        if (add_chat.length) {
          HelperWASD.loadBwasdData()
          socket.initChat()
          // wasd.updatestyle();
          HelperWASD.isModerator = false
          HelperWASD.getIsModerator().then((resolve) => {
            HelperWASD.isModerator = resolve
            wasd.updatestyle();
          })

          HelperWASD.createPinMessages();

          document.querySelector('.update > i').classList.remove('resetPlayerLoading');
        }
        if (remove_chat.length) {
          socket.socketd?.close(1000, 'removedNodes')

          document.querySelector(`.WebSocket_history`)?.remove()
          document.querySelector('.hidden.info__text__status__name')?.remove()
        }

        if (add_player_buttons_stream.length) {
          let textlive = add_player_buttons_stream[0].querySelector('.buttons-container .stream-status-text.live')
          let buttons  = add_player_buttons_stream[0].querySelector('.buttons-container .buttons-right')

          HelperWASD.addPipToPlayer(settings.wasd.pictureInPicture)
          HelperWASD.createClipByOvg(settings.wasd.iframeCreateClip)

          HelperWASD.updateUptimeStreamMobile(settings.wasd.uptimeStreamMobile)
        }

        if (add_settings_button_burger.length) {
          let burger = add_settings_button_burger[0].querySelector('header')
        }

        if (add_wasd_chat_message.length) {
          let is = false
          if (add_wasd_chat_message[0] == document.querySelector('.block__messages')?.lastElementChild) {
            is = true
              if (!!socket.channelId) {
                is = true
              }
          }
          wasd.handleMessage(add_wasd_chat_message[0], is);
        }

        if (add_emoji_menu.length) {
          if (settings.wasd.bwasdInChatMenu) HelperBWASD.addToChatMenu()
          if (settings.wasd.tv7InChatMenu) HelperTV7.addToChatMenu()
          if (settings.wasd.bttvInChatMenu) HelperBTTV.addToChatMenu()
          if (settings.wasd.ffzInChatMenu) HelperFFZ.addToChatMenu()
        }

        if (add_chat_menu.length) {
          HelperWASD.addToMenu(add_chat_menu[0].parentNode)
        }

        if (add_carousel_container_chromeless.length && !settings.wasd.autoPlayStreamersOnMain) {
          let video = add_carousel_container_chromeless[0].querySelector('video')

          video?.addEventListener('play', () => {
            if (!settings.wasd.autoPlayStreamersOnMain) video.pause()
          })
        }
        if (add_carousel_pending.length && !settings.wasd.autoPlayStreamersOnMain) {
          add_carousel_pending[0].style.display = 'none';
        }

        if (add_uptime.length) {
          HelperWASD.updateUptimeStream(settings.wasd.uptimeStream)
        }

        if (remove_uptime.length) {
          HelperWASD.updateUptimeStream(false)
        }

        if (add_wasd_chat_header.length && isLive) {
          add_wasd_chat_header[0].lastChild.insertAdjacentHTML('beforebegin', `<div class="lds-ring websocket_loader tooltip-hover" style="height: 100%;position: absolute;right: 40px;" ovg=""><svg x="0px" y="0px" viewBox="0 0 150 150" class="icon-pending-ovg"><circle cx="75" cy="75" r="60" class="icon-pending-inner-ovg"></circle></svg><ovg-tooltip style="position: absolute;left: 0px;"><div class="tooltip tooltip_position-left tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Ожидаем подключение WebSocket </div></div></ovg-tooltip></div>`)
          HelperWASD.updateMoveHideChat(settings.wasd.moveHideChat)

          let button = document.querySelector('.chat-container__btn-open--desktop')
          button?.addEventListener('click', () => {
            if (document.querySelector('.chat-container__btn-open--desktop > i')?.className == 'wasd-icons-right' && settings.wasd.moveHideChat) {
              button.style.display = 'none'
            } else {
              button.style.display = ''
            }
          })
        }

        if (add_header.length && isLive) {
          addToHeader()
        }

        if (add_streaming_player.length && document.querySelector('wasd-stream-preview') && !settings.wasd.autoPlayPreviewOnStreaming) {
          let video = add_streaming_player[0].querySelector('video')
          let i = 0
          video?.addEventListener('play', () => {
            if (i == 0 && !settings.wasd.autoPlayPreviewOnStreaming) {
              video.pause();
              i++;
              document.querySelector('.stream-preview__placeholder')?.remove()
            }
          })
        }

      }
    }

    const observer = new MutationObserver(callback);

    if (mutationtarget) {
      observer.observe(mutationtarget, config);
    }


    let wasdPlayer = document.querySelector('wasd-player')
    if (wasdPlayer) {
      wasdPlayer.addEventListener("touchend", () => setTimeout(() => {
        document.querySelector('.media-control').classList.remove('media-control-hide')
        document.querySelector('.custom-media-control').classList.remove('custom-media-hidden')
        document.querySelector('.player-streaminfo').classList.remove('custom-media-hidden')
      }, 10), false);

      wasdPlayer.onmousedown = (e) => {
        if (settings.wasd.mutePlayerOnMiddleMouse && e.button == 1) {
          document.querySelector('.player-button.volume-button').click()
          return false;
        }
      }
    }

    if (this.style === null) {
      this.style = document.createElement('style');
      this.style.type = 'text/css';
      document.body.append(this.style);
      wasd.updatestyle();

      let fontStyle = document.createElement('style');
      fontStyle.type = 'text/css';
      fontStyle.innerHTML = '';
      fontStyle.appendChild(document.createTextNode(`@font-face {
        font-family: 'ovg-icons';
        src:  url(${chrome.runtime.getURL("css/fonts/ovg-icons.ttf")}?6w1vn5) format('truetype'),
          url(${chrome.runtime.getURL("css/fonts/ovg-icons.woff")}?6w1vn5) format('woff'),
          url(${chrome.runtime.getURL("css/fonts/ovg-icons.svg")}?6w1vn5#ovg-icons) format('svg');
        font-weight: normal;
        font-style: normal;
        font-display: block;
      }`));

      document.body.append(fontStyle);
    }

    fixMobilePlayer = () => {
      setTimeout(() => {
        if (document.querySelector('.theatre-mode-mobile')) {
          document.querySelector('.theatre-mode-mobile').classList.remove('theatre-mode-mobile')
          document.querySelector('.chat-container__btn-open--mobile').addEventListener('click', () => {
            document.querySelector('.player-wrapper').classList.add('theatre-mode-mobile')
          })
          document.querySelector('.chat-container__btn-close--mobile').addEventListener('click', () => {
            document.querySelector('.player-wrapper').classList.remove('theatre-mode-mobile')
          })
        } else {
          fixMobilePlayer()
        }
      }, 1)
    }

    fixMobilePlayer() // tr_optimization

    addToHeader = () => {
      // add button BetterWASD настройки
      if (!BetterStreamChat.isSettingsNewWindow && !document.querySelector('li#selector-bm-ovg-settings')) {
        const buttonovg = `<li id="selector-bm-ovg-settings"><a class="profile-menu__link"><i class="wasd-icons-settings-profile"></i><span> BetterWASD настройки </span></a></li>`
        document.querySelector('wasd-profile-menu #profile-menu .profile-menu__list #selector-pm-theme')?.insertAdjacentHTML("beforebegin", buttonovg);
        document.querySelector('li#selector-bm-ovg-settings')?.addEventListener('click', () => {
          BetterStreamChat.settingsDiv.style.display = 'block'
          document.querySelector('body').click()
          document.body.style.overflowY = "hidden";
          BetterStreamChat.settingsDiv.style.animationName = 'showbetterpanel';
          BetterStreamChat.openSettings()
        });
        // document.querySelector('wasd-header .profile-menu-toggle').addEventListener('click', () => {})
        // document.querySelector('wasd-header .profile-menu-toggle').addEventListener('click', () => {})
      }

      let toggle = document.querySelector('.header-new__left-side .header-new__nav-sidebar-toggle')
      document.querySelector('.header-new__right-side')?.append(toggle.cloneNode(true))
      let newtoggle = document.querySelector('.header-new__right-side .header-new__nav-sidebar-toggle')
      toggle = document.querySelector('.header-new__left-side .header-new__nav-sidebar-toggle')
      if (newtoggle) {
        newtoggle.style.transform = 'rotate(180deg)'
        newtoggle.addEventListener('click', () => {
          if (!document.querySelector('#nav-sidebar').classList.contains('nav-sidebar--expanded')) {
            setTimeout(() => {
              document.querySelector('.header-new__left-side .header-new__nav-sidebar-toggle').click()
            }, 25)
          }
        })

        $('#nav-sidebar').attrchange({
          trackValues: true,
          callback: function (event) {
            if (event.newValue == "nav-sidebar") {
              newtoggle.classList.remove('nav-sidebar-toggle--active')
            } else {
              newtoggle.classList.add('nav-sidebar-toggle--active')
            }
          }
        });
      }

      if ($('wasd-header .logo img')?.attr('src')?.match('dark')) {
        BetterStreamChat.settingsDiv.querySelector('.header__left-side .logo img').src = chrome.runtime.getURL("img/Wasd_Better_color_logo_dark.svg")
      } else {
        BetterStreamChat.settingsDiv.querySelector('.header__left-side .logo img').src = chrome.runtime.getURL("img/Wasd_Better_color_logo.svg")
      }
      $('wasd-header .logo img').attrchange({
        trackValues: true,
        callback: function (event) {
          if (event.newValue.match('dark')) {
            BetterStreamChat.settingsDiv.querySelector('.header__left-side .logo img').src = chrome.runtime.getURL("img/Wasd_Better_color_logo_dark.svg")
          } else {
            BetterStreamChat.settingsDiv.querySelector('.header__left-side .logo img').src = chrome.runtime.getURL("img/Wasd_Better_color_logo.svg")
          }
        }
      });

    }

    addToHeader()

  },
  updatestyle() {
    let cssCode = ``;

    if (settings.wasd.messageFollower) {
      cssCode += `wasd-chat-follower-message { display: none!important; }`;
    }

    if (settings.wasd.messageSub) {
      cssCode += `wasd-chat-subscribe-message { display: none!important; }`;
    }

    if (settings.wasd.messageSystem) {
      cssCode += `wasd-chat-system-message { display: none!important; }`;
    }

    if (settings.wasd.messagePromoCodes) {
      cssCode += `wasd-chat-promo-codes-message { display: none!important; }`;
    }

    if (settings.wasd.wasdIconsSmile) {
      cssCode += `.wasd-icons-smile { display: none!important; }`;
    }

    if (settings.wasd.wasdIconsCircleRu) {
      cssCode += `.wasd-icons-circle-ru { display: none!important; }`;
    }

    if (settings.wasd.webkitScrollbarWidth) {
      cssCode += 'div#channel-wrapper::-webkit-scrollbar { width: 0px; }';
      cssCode += 'wasd-chat-body { box-shadow: 0 0 2px 0 rgba(var(--wasd-color-switch--rgb),.32); }';
      cssCode += 'div#channel-wrapper { scrollbar-width: none; }'
    }

    if (settings.wasd.giftsWrapperSide) {
      cssCode += '.gifts-wrapper-side { display: none!important; }';
      cssCode += '.gifts-wrapper-bottom { display: none!important; }';
    }

    if (settings.wasd.giftsWrapperTopRight) {
      cssCode += '.gifts-wrapper-top-right { display: none!important; }';
    }

    cssCode += '.info__text__status > div[ovg], .info__text__status-ovg > div[ovg] { line-height: inherit; }'
    if (settings.wasd.sticker.toString() === '0') {
      cssCode += '.info__text__status, .info__text__status-ovg, #colon-after-author-name, #colon-after-author-name-ovg { vertical-align: top; }'
      if (settings.wasd.forceResizeStickers.toString() === '1') {
        cssCode += '.message__info img.sticker { display: block; height: 128px!important; width: 128px!important; margin-top: 8px; }'
      } else if (settings.wasd.forceResizeStickers.toString() === '2') {
        cssCode += '.message__info img.sticker { display: block; height: 56px!important; width: 56px!important; margin-top: 8px; }'
      }
    } else if (settings.wasd.sticker.toString() === '1') {
      cssCode += 'img.sticker { width: 28px!important; height: 28px!important; margin-top: 0px!important; display: inline!important; vertical-align: middle!important; margin: -.5rem 0!important; }';
    } else if (settings.wasd.sticker.toString() === '2') {
      if (settings.wasd.forceResizeStickers.toString() === '0') {
        cssCode += 'img.sticker {max-width: -webkit-fill-available; transition: transform .2s; width: 28px!important; height: 28px!important; margin-top: 0px!important; display: inline!important; vertical-align: middle!important; margin: -.5rem 0!important; }';
        cssCode += 'img.sticker:hover { transform: scale(4.4) translateY(-8px); background-color: var(--wasd-color-prime); border-radius: 4px; box-shadow: 0 0 4px 0 rgba(var(--wasd-color-switch--rgb),.16); }';
        cssCode += 'img.sticker.small:hover { transform: scale(2.2) translateY(-4px); background-color: var(--wasd-color-prime); border-radius: 4px; box-shadow: 0 0 4px 0 rgba(var(--wasd-color-switch--rgb),.16); }';
      } else if (settings.wasd.forceResizeStickers.toString() === '1') {
        cssCode += 'img.sticker {max-width: -webkit-fill-available; transition: transform .2s; width: 28px!important; height: 28px!important; margin-top: 0px!important; display: inline!important; vertical-align: middle!important; margin: -.5rem 0!important; }';
        cssCode += 'img.sticker:hover { transform: scale(4.4) translateY(-8px); background-color: var(--wasd-color-prime); border-radius: 4px; box-shadow: 0 0 4px 0 rgba(var(--wasd-color-switch--rgb),.16); }';
      } else if (settings.wasd.forceResizeStickers.toString() === '2') {
        cssCode += 'img.sticker {max-width: -webkit-fill-available; transition: transform .2s; width: 28px!important; height: 28px!important; margin-top: 0px!important; display: inline!important; vertical-align: middle!important; margin: -.5rem 0!important; }';
        cssCode += 'img.sticker:hover { transform: scale(2.2) translateY(-8px); background-color: var(--wasd-color-prime); border-radius: 4px; box-shadow: 0 0 4px 0 rgba(var(--wasd-color-switch--rgb),.16); }';
      }

      cssCode += 'div.block__messages__item:hover { z-index: 1; }';
      cssCode += 'div.block__messages__item-ovg:hover { z-index: 1; }';
      cssCode += '.block__new-messages { z-index: 1; }';
    } else if (settings.wasd.sticker.toString() === '3') {
      cssCode += '.block__messages__item[sticker] { display: none!important; }';
      cssCode += '.block__messages__item-ovg[sticker] { display: none!important; }';
    } else if (settings.wasd.sticker.toString() === '4') {
      cssCode += 'img.sticker { display: none!important; }';
      cssCode += '.sticker_text { display: inline!important; }';
    }

    if (settings.wasd.stickerovg.toString() === '0') {
      cssCode += `.message__info .stickerovg, .message__info-ovg .stickerovg {max-width: -webkit-fill-available; display: block; height: ${settings.wasd.bttvSize}; margin-top: 8px; }`
    } else if (settings.wasd.stickerovg.toString() === '1') {
      cssCode += '.stickerovg {max-width: -webkit-fill-available; width: 28px!important; height: 28px!important; margin-top: 0px!important; display: inline!important; vertical-align: middle!important; margin: -.5rem 0!important; }';
    }
    if (settings.wasd.stickerovg.toString() === '2') {
      cssCode += 'div.block__messages__item:hover { z-index: 1; }';
      cssCode += 'div.block__messages__item-ovg:hover { z-index: 1; }';
      cssCode += '.stickerovg {max-width: -webkit-fill-available; transition: transform .2s; width: 28px!important; height: 28px!important; margin-top: 0px!important; display: inline!important; vertical-align: middle!important; margin: -.5rem 0!important; }';
      cssCode += `.stickerovg:hover { transform: scale(${settings.wasd.bttvSize == '128px'? '4.4' : '2.2'}) translateY(-8px); background-color: var(--wasd-color-prime); border-radius: 4px; box-shadow: 0 0 4px 0 rgba(var(--wasd-color-switch--rgb),.16); }`;
      cssCode += '.block__new-messages { z-index: 1; }';

      cssCode += `.tooltip-wrapper .tooltip { bottom: ${settings.wasd.bttvSize == '128px'? '103px' : '57px'}; }`
    } else if (settings.wasd.stickerovg.toString() === '3') {
      cssCode += '[stickersovg*=" "] { display: none!important; }';
    } else if (settings.wasd.stickerovg.toString() === '4') {
      cssCode += 'img.stickerovg { display: none!important; }';
      cssCode += '.stickerovg_text { display: inline!important; }';
    }


    if (settings.wasd.paddingChatMessage.toString() === '0') {
      cssCode += 'wasd-chat-message > div.message { padding: 5px 20px!important; }';
      //cssCode += 'wasd-chat-message.is-time > div.message { padding: 2px 8px 2px 4px!important; }';
    } else if (settings.wasd.paddingChatMessage.toString() === '1') {
      cssCode += 'wasd-chat-message > div.message { padding: 4px 24px!important; }';
      //cssCode += 'wasd-chat-message.is-time > div.message { padding: 2px 8px 2px 4px!important; }';
    } else if (settings.wasd.paddingChatMessage.toString() === '2') {
      cssCode += 'wasd-chat-message > div.message { padding: 4px 9px!important; }';
      //cssCode += 'wasd-chat-message.is-time > div.message { padding: 2px 8px 2px 4px!important; }';
    } else if (settings.wasd.paddingChatMessage.toString() === '3') {
      cssCode += 'wasd-chat-message > div.message { padding: 3px 15px!important; }';
      //cssCode += 'wasd-chat-message.is-time > div.message { padding: 2px 8px 2px 4px!important; }';
    } else if (settings.wasd.paddingChatMessage.toString() === '4') {
      cssCode += 'wasd-chat-message > div.message { padding: 2px 12px!important; }';
      cssCode += 'wasd-chat-message > div.message.is-time { padding: 2px 8px 2px 4px!important; }';
    }

    cssCode += `div.message-text > span > a, div.message-text-ovg > span > a { color: ${settings.wasd.linkColor != '#000000' ? settings.wasd.linkColor : 'inherit'}; }`;
    cssCode += `div.message-text.message-text_deleted > span > a { color: inherit!important; }`;

    if (settings.wasd.chatOnTheLeft) {
      cssCode += `@media screen and (min-width:480px) { wasd-chat-wrapper > div.chat-container { width: ${settings.wasd.chatWidth}px!important } }`;
      cssCode += `wasd-channel > div.channel-wrapper > div#channel-wrapper { order: 1!important; }`;
      cssCode += `div.player-wrapper.theatre-mode { left: ${settings.wasd.chatWidth}px!important; width: calc(100vw - ${settings.wasd.chatWidth}px)!important; }`;
      cssCode += `#scroll-content { padding-right: 52px!important; padding-left: 0px!important; }`;
      cssCode += `wasd-header #nav-sidebar { left: auto!important; right: 0!important;}`
      cssCode += `wasd-header #nav-sidebar { border-left: 1px solid rgba(var(--color-switch),.24)!important; border-right: none!important;}`
      cssCode += `.header-new__left-side .header-new__nav-sidebar-toggle { display: none!important; }`
      cssCode += `.profile-menu-toggle { margin-right: 8px!important; }`

      // fix скрыть чат
      if (settings.wasd.moveHideChat) cssCode += `.chat-container__btn-open--desktop-ovg .wasd-icons-right:before {transform: rotate(180deg)!important;}`
      cssCode += `.chat-container.close--desktop {overflow: hidden!important;}`
      cssCode += `.chat-container__btn-open--desktop { left: 100%!important;transform: rotate(180deg)!important; }`
      cssCode += `.chat-container__btn-open--desktop .text { transform: rotate(180deg)!important; }`

    } else {
      cssCode += `@media screen and (min-width:480px) {wasd-chat-wrapper > div.chat-container { width: ${settings.wasd.chatWidth}px!important }}`;
      cssCode += `div.player-wrapper.theatre-mode { width: calc(100vw - ${settings.wasd.chatWidth}px)!important; }`;
      cssCode += `.header-new__right-side .header-new__nav-sidebar-toggle { display: none!important; }`
    }
    cssCode += 'wasd-chat-wrapper > div.chat-container.close--desktop { width: 0px!important; }';

    if (settings.wasd.hideDonationChannelButton & settings.wasd.hideAmazingChannelButtoan & settings.wasd.hideGiftButtons) {
      cssCode += 'div#giftsInfo.gifts-info { display: none!important; }';
    } else {
      if (settings.wasd.hideDonationChannelButton) {
        cssCode += 'wasd-channel-donate-btn { display: none!important; }';
      }
      if (settings.wasd.hideAmazingChannelButtoan) {
        cssCode += 'wasd-channel-amazing-btn { display: none!important; }';
      }
      if (settings.wasd.hideGiftButtons) {
        cssCode += 'div.gifts-info__gift_buttons { display: none!important; }';
      }
    }

    if (settings.wasd.highlightMessagesBold) {
      cssCode += '.chat-message-mention { font-weight: 700!important; }';
    }

    if (settings.wasd.streamerMessage) {
      cssCode += 'wasd-chat-ya-streamer-message { display: none!important; }';
    }

    if (settings.wasd.fontSize) {
      cssCode += `.info__text__status__name, info__text__status__name-ovg { font-size: ${settings.wasd.fontSize}px!important;}`; // display: contents!important;
      cssCode += `.info__text__status__name.is-admin, info__text__status__name-ovg.is-admin { display: inline!important; }`;
      cssCode += `.info__text__status__name.is-moderator, info__text__status__name-ovg.is-moderator { display: inline!important; }`;
      cssCode += `.info__text__status__name.is-owner, info__text__status__name-ovg.is-owner { display: inline!important; }`;
      cssCode += `.message-text, .message-text-ovg { font-size: ${settings.wasd.fontSize}px!important; }`;
      cssCode += `.chat-message-mention { font-size: ${settings.wasd.fontSize}px!important; }`;
      cssCode += `.message__time, .message__time-ovg { font-size: ${settings.wasd.fontSize - 4}px!important;}`;
      cssCode += `#colon-after-author-name, #colon-after-author-name-ovg { font-size: ${settings.wasd.fontSize}px!important; }`;
    }

    if (settings.wasd.topPanel) {
      cssCode += 'wasd-chat-ya-streamer-notifications { display: none!important; }';
    }

    if (settings.wasd.topPanelChallenge) {
      cssCode += 'wasd-chat-challenge-notifications { display: none!important; }';
    }

    if (!settings.wasd.autoPlayStreamersOnMain) {
      cssCode += '.carousel__slide.active > div > div > wasd-player > div.player > div.pending { display: none!important; }';
    }

    if (settings.wasd.alternatingColorChatMessages) {
      cssCode += `div.block__messages__item:nth-child(2n+1), div.block__messages__item-ovg:nth-child(2n+1) { background-color: ${settings.wasd.alternatingColorChatMessagesColor != '#000000' ? settings.wasd.alternatingColorChatMessagesColor+'' : 'var(--wasd-color-prime)' }; }`;
    }

    if (settings.wasd.decorationLink) {
      cssCode += `wasd-chat-message a:hover { text-decoration: underline; }`;
    }

    if (settings.wasd.videoOverlay) {
      cssCode += `wasd-player-overlay-video { display: none!important; }`;
    }

    if (settings.wasd.hidePanelMobile) {
      cssCode += `wasd-notification-app { display: none!important; }`;
      cssCode += `wasd-mobile-app { display: none!important; }`;
      cssCode += `.wrapper-notification { margin-top: 48px!important; height: calc(100% - 48px)!important; transition: 0s!important; }`;
      cssCode += `#banner_mobile_app { display: none!important; }`;
    }

    if (settings.wasd.alwaysOpenVolumeControl) {
      cssCode += `div.volume-container .volume-slider-container {width: 86px!important;}`
    }

    if (settings.wasd.hideBannerOnHome) {
      cssCode += `wasd-banner .banner { display: none!important; }`;
    }

    if (settings.wasd.hideSelectorStreamSettings && document.querySelector('.header-new__stream-settings-btn')) { //new
      cssCode += `.header-new__stream-settings-btn, hr#selector-header-new-buttons-right-hr-first { display: none!important; }`;
    }
    if (settings.wasd.hideSelectorStreamSettings) { //old
      cssCode += `#selector-header-stream-settings { display: none!important; }`;
    }

    if (settings.wasd.underlineUsernameAndMention) {
      cssCode += `.chat-message-mention:hover, .info__text__status__name:hover { text-decoration: underline!important; }`;
    }

    cssCode += `.message__time, .message__time-ovg {min-width: auto!important; overflow: unset!important; width: auto!important;}`

    let bgmc = ''
    if (settings.wasd.mentionSelf) {
      bgmc = `background-color: ${settings.wasd.colorMentionSelf != '#000000' ? settings.wasd.colorMentionSelf+'!important' : 'rgba(var(--wasd-color-switch--rgb),.08)!important' }`
    } else {
      bgmc = `background-color: rgba(0, 0, 0, 0)!important`
    }
    cssCode += `.message.has-mention, .message-ovg.has-mention {${bgmc}}`

    cssCode += `.message.openCardColor {background-color: ${settings.wasd.highlightMessagesOpenCardColor != '#000000' ? settings.wasd.highlightMessagesOpenCardColor+'!important' : 'rgba(var(--wasd-color-switch--rgb),.08)!important' }}`

    cssCode += `.ovg-moderator-tools {display: ${HelperWASD.isModerator ? '' : 'none!important;'}}`

    if (settings.wasd.messageHover) {
      cssCode += `.message:hover { background-color: ${settings.wasd.colorMessageHover != '#000000' ? settings.wasd.colorMessageHover+'!important' : 'rgba(var(--wasd-color-switch--rgb),.08)!important' }; }`;
      cssCode += `.message-ovg:hover { background-color: ${settings.wasd.colorMessageHover != '#000000' ? settings.wasd.colorMessageHover+'!important' : 'rgba(var(--wasd-color-switch--rgb),.08)!important' }; }`;
      cssCode += `.ovg-bg-color-prime:hover { background-color: ${settings.wasd.colorMessageHover != '#000000' ? settings.wasd.colorMessageHover+'!important' : 'rgba(var(--wasd-color-switch--rgb),.08)!important' }; }`;
    }
    cssCode += `.paidsubs-popup__stickers-item {cursor: url(${chrome.runtime.getURL("img/cursorS.png")}) 4 4, auto}`

    if (settings.wasd.decreaseIndentationStickerMenu) {
      cssCode += 'wasd-chat-emoji-stickers .stickers__body {padding: 6px 0 0 8px!important;}wasd-chat-emoji-stickers .stickers__body__item {min-width: auto!important;padding: 2px!important;margin: 0 8px 8px 0!important;height: 43px!important;width: 43px!important;}wasd-chat-emoji-stickers .stickers__body__item--not-available {width: 18px!important;height: 18px!important;right: 10px!important;bottom: 10px!important;}wasd-chat-emoji-stickers .stickers__body__item--not-available img {height: 11px!important;}'
    }

    if (settings.wasd.highlightStickersStickerMenu) {
      if (settings.wasd.decreaseIndentationSmilesMenu) {
        cssCode += 'wasd-chat-emoji-smiles .smiles {height: 210px!important;padding: 5px 0 0 5px!important;justify-content: center!important;}'
        cssCode += 'wasd-chat-emoji-smiles .smiles .smiles__item:hover {background-color: rgba(var(--wasd-color-switch--rgb), .2)!important;}wasd-chat-emoji-smiles .smiles .smiles__item {padding: 16.7px!important;margin: 0px;border-radius: 2px;}'
      } else {
        cssCode += 'wasd-chat-emoji-smiles .smiles .smiles__item {margin-bottom: 8px!important;margin-right: 11px!important;}wasd-chat-emoji-smiles .smiles .smiles__item:hover {background-color: rgba(var(--wasd-color-switch--rgb), .2)!important;}wasd-chat-emoji-smiles .smiles .smiles__item {padding: 18px!important;margin: 0px;border-radius: 2px;}'
      }

      if (settings.wasd.decreaseIndentationBTTVandFFZMenu) {
        cssCode += 'wasd-chat-emoji-smiles-bttv .emoji-ovg,wasd-chat-emoji-smiles-ffz .emoji-ovg {padding: 10px 0 10px 5px!important;}wasd-chat-emoji-smiles-bttv .emoji-ovg .emoji__item-ovg,wasd-chat-emoji-smiles-ffz .emoji-ovg .emoji__item-ovg {margin-bottom: 8px!important;margin-right: 9px!important;}'
        cssCode += 'img.emoji__item-ovg:hover {background-color: rgba(var(--wasd-color-switch--rgb), .2)!important;}img.emoji__item-ovg {padding: 5px!important;margin: 0px;border-radius: 2px;width: 33px;height: 33px;}'
      } else {
        cssCode += 'img.emoji__item-ovg:hover {background-color: rgba(var(--wasd-color-switch--rgb), .2)!important;}img.emoji__item-ovg {margin-bottom: 0px!important;margin-right: 0px!important;}img.emoji__item-ovg {padding: 9px!important;margin: 0px;border-radius: 2px;width: 44px;height: 44px;}'
      }

    } else {
      if (settings.wasd.decreaseIndentationSmilesMenu) {
        cssCode += 'wasd-chat-emoji-smiles .smiles {justify-content: center!important;padding: 10px 0 10px 5px!important;height: 210px!important;}wasd-chat-emoji-smiles .smiles .smiles__item {margin-bottom: 8px!important;margin-right: 9px!important;}'
      }
      if (settings.wasd.decreaseIndentationBTTVandFFZMenu) {
        cssCode += 'wasd-chat-emoji-smiles .smiles {height: 210px!important;padding: 5px 0 0 5px!important;justify-content: center!important;}'
      }
    }

    if (settings.wasd.hideGreatRandom) {
      cssCode += '.header-new__random-stream-wrap {display: none!important}' //new
      cssCode += '.li#selector-header-random-stream {display: none!important}' //old
    }

    for (let role in settings.highlightRole) {
      if (!(settings.highlightRole[role] == '#000000' || settings.highlightRole[role] == '#00000000')) cssCode += `.block__messages__item[role*="${role}"], .block__messages__item-ovg[role*="${role}"] {background-color:  ${settings.highlightRole[role]}!important}`
    }

    for (let user in settings.list.blockUserList) {
      cssCode += `.block__messages__item[usernamelc="${user.toLowerCase()}"], .block__messages__item-ovg[usernamelc="${user.toLowerCase()}"] {display: none!important;}`
      if (settings.wasd.removeMentionBL) {
        cssCode += `.block__messages__item[mention*="${user.toLowerCase()}"], .block__messages__item-ovg[mention*="${user.toLowerCase()}"] {display: none!important;}`
      }
    }

    for (let term in settings.list.highlightTermList) {
      let setting = settings.list.highlightTermList[term]
      cssCode += `.block__messages__item[message*="${setting.term}"], .block__messages__item-ovg[message*="${setting.term}"] {background-color: ${setting.color}!important;}`
    }

    for (let term in settings.list.blockTermList) {
      cssCode += `.block__messages__item[message*="${term}"], .block__messages__item-ovg[message*="${term}"] {display: none!important;}`
    }

    for (let user in settings.list.highlightUserList) {
      let setting = settings.list.highlightUserList[user]
      cssCode += `.block__messages__item[username="${setting.username}"], .block__messages__item-ovg[username="${setting.username}"] {background-color: ${setting.color}!important;}`
    }

    if (settings.wasd.chatMobilePlayer) {
      if (settings.wasd.hidePanelMobile) {
        cssCode += ` @media screen and (max-width:480px) {.visible--mobile { height: calc(100% - 97px)!important; }}`

        cssCode += `@media screen and (max-width:480px){.visible--mobile{width:100%!important}.theatre-mode-mobile{position:fixed!important;top:48px;z-index:999}}`
        cssCode += ` @media screen and (max-width:480px) {.visible--mobile { height: calc((100% - 97px) - 56vw)!important; }}`
      } else {
        cssCode += `@media screen and (max-width:480px){.visible--mobile{width:100%!important}.theatre-mode-mobile{position:fixed!important;top:97px;z-index:999}}`
        cssCode += ` @media screen and (max-width:480px) {.visible--mobile { height: calc((100% - 145px) - 56vw)!important; }}`
      }
    } else {
      if (settings.wasd.hidePanelMobile) {
        cssCode += ` @media screen and (max-width:480px) {.visible--mobile { height: calc(100% - 97px)!important; }}`
      }
    }

    if (settings.wasd.uptimeStreamMobile) {
      cssCode += `.stream-status-container .stream-status-text { top: 1px; position: relative; }`
    }

    cssCode += `.ovg-moderator-tools, .ovg-copy-tools {background-color: ${settings.wasd.colorModOptions != '#000000' ? settings.wasd.colorModOptions+'!important' : 'rgba(var(--wasd-color-switch--rgb),.08)!important' }}`

    if (settings.wasd.hideRaid) {
      cssCode += `.player-info .raid { display: none !important; }`
    }

    if (settings.general.uiTransparency && !new URL(document.URL).searchParams.get('helper-settings')) {
      cssCode += `#bscSettingsPanel {background: rgba(var(--wasd-color-prime--rgb), 0.25);backdrop-filter: blur(7px);}`
      cssCode += `#bscSettingsPanel .stickers__info-ovg {background: none;backdrop-filter: blur(7px);}`
    }

    if (settings.wasd.swapGiftAndInformationPlace) {
      cssCode += `.content-wrapper__info, .placeholder-player {display: flex;flex-direction: column;}`
      cssCode += `.content-wrapper__info > .gifts-info, .placeholder-player__buttons {order: 0;}`
      cssCode += `.content-wrapper__info > .player-wrapper, .placeholder-player__screen {order: 1;}`
      cssCode += `.content-wrapper__info > .stream-info, .placeholder-player__stream-info {order: 2;}`
      cssCode += `.content-wrapper__info > .container {order: 3;}`

      // fix tooltip
      cssCode += `.gifts-info__buttons .tooltip.tooltip_position-top {left: 50%;margin-top: 8px;top: 100%;transform: translateX(-50%) translateZ(0);bottom: unset;margin-bottom: unset;}`
      cssCode += `.gifts-info__buttons .tooltip.tooltip_position-top .tooltip-content:before {border-bottom: unset;top: unset;border: 4px solid transparent;border-bottom: 4px solid rgb(var(--color-switch));border-top: none;bottom: 100%;content: "";height: 0;left: 50%;margin-left: -4px;position: absolute;transition: all .3s ease;}`

      cssCode += `.gifts-info__buttons .tooltip.tooltip_position-topRight {right: 0;margin-top: 8px;top: 100%;bottom: unset;margin-bottom: unset;}`
      cssCode += `.gifts-info__buttons .tooltip.tooltip_position-topRight .tooltip-content:before {top: unset; border: 4px solid transparent; border-bottom: 4px solid rgb(var(--color-switch)); border-top: none; bottom: 100%; content: ""; margin-left: -2px; position: absolute; transition: all .3s ease; right: 20px;}`
      
      cssCode += `.gifts-info__buttons .tooltip.tooltip_position-topLeft {margin-top: 8px;top: 100%;bottom: unset;margin-bottom: unset;}`
      cssCode += `.gifts-info__buttons .tooltip.tooltip_position-topLeft .tooltip-content:before {top: unset; border: 4px solid transparent; border-bottom: 4px solid rgb(var(--color-switch)); border-top: none; bottom: 100%; content: ""; margin-left: -2px; position: absolute; transition: all .3s ease; right: 20px;}`
    }

    if (!settings.wasd.colonAfterNickname) {
      cssCode += `.message-text {margin-left: 4px;}`
      cssCode += `.message__info__text .info__text__status__name {margin-right: 4px !important;}`
    }

    if (!settings.wasd.copyMessage) {
      cssCode += `.ovg-copy-tools {display: none !important;}`
    }

    if (wasd.style) {
      if (typeof wasd.style.styleSheet !== 'undefined') {
        wasd.style.styleSheet.cssText = cssCode;
      } else {
        wasd.style.innerHTML = '';
        wasd.style.appendChild(document.createTextNode(cssCode));
      }

      ovg.log('style inited')

    } else {
      ovg.log('style undefined')
      setTimeout(() => {
        wasd.updatestyle()
      }, 50)
    }
  },
  handleMessage(node, isobserver = false) {
    isMessageEdited = node.classList.contains('ovg');
    textarea = document.querySelector('.footer > div >textarea');

    if (!isMessageEdited) {
      node.classList.add('ovg');

      if (isobserver) {
        if (settings.wasd.artificialChatDelay.toString() == '0') {
          node.style.display = 'block';
        } else {
          node.style.display = 'none'
          setTimeout(() => {
            node.style.display = 'block';
            HelperWASD.scrollChatMessage(node, -1, 150)
          }, settings.wasd.artificialChatDelay)
        }
      } else {
        node.style.display = 'block';
      }

      adminRef       = node.querySelector('.is-admin')
      modRef         = node.querySelector('.is-moderator')
      ownerRef       = node.querySelector('.is-owner')
      subRef         = node.querySelector('.info__text__status-paid')
      promoCodeWin   = node.querySelector('.message__promocodes')

      let usernametext = node.querySelector('.info__text__status__name')?.textContent.trim()
      let message = node.querySelector('.message-text > span')?.textContent.trim()
      let color = node.querySelector('.info__text__status__name')?.style?.color
      if (subRef) color = subRef?.style?.backgroundColor
      let sticker = node.querySelector('.sticker')?.src

      let roles = ''
      if (node.querySelector('wasd-chat-message')) roles       += 'user'
      if (node.querySelector('.wasd-icons-owner')) roles       += ' owner'
      if (node.querySelector('.wasd-icons-dev')) roles         += ' admin'
      if (node.querySelector('.wasd-icons-moderator')) roles   += ' moderator'
      if (node.querySelector('.wasd-icons-star')) roles        += ' sub'
      node.setAttribute('role', roles)

      if (node.querySelector('img[alt="sticker"]')) node.setAttribute('sticker', node.querySelector('img[alt="sticker"]').src)

      if (HelperWASD.openUserCardName == usernametext && node.querySelector('wasd-chat-message > .message')) {
        if (settings.wasd.highlightMessagesOpenCard) node.querySelector('wasd-chat-message > .message').classList.add('openCardColor')
        if (isobserver) HelperWASD.addMessageToCpenCard(roles, usernametext.trim(), color, message, sticker)
      }

      if (usernametext) node.setAttribute('username', usernametext)
      if (usernametext) node.setAttribute('usernamelc', usernametext.toLowerCase())

      if (message) node.setAttribute('message', message)

      if (sticker) node.querySelector('img.sticker').insertAdjacentHTML("afterend", `<span class="chat-message-text stickertext sticker_text">Стикер</span>`)

      if (isobserver) node.setAttribute('time', moment())
      if (node.querySelector('.message__time')) {
        if (isobserver) {
          node.querySelector('.message__time').textContent = moment().format(settings.wasd.formatMessageSentTime)
        } else {
          // node.querySelector('.message__time').textContent = timeData(node.querySelector('.message__time').textContent)
        }
      }

      let nicknamediv = node.querySelector('.info__text__status__name');
      if (settings.wasd.colonAfterNickname) {
        let message = node.querySelector('.message-text');

        message?.insertAdjacentHTML("beforebegin", `<span aria-hidden="true" id="colon-after-author-name" style=" margin-right: 4px; color: rgbа(var(--wasd-color-switch--rgb),.88);" >: </span>`);
        $(nicknamediv)?.css("margin", "0px")
      }

      nicknamediv = node.querySelector('.info__text__status__name');
      if (nicknamediv) {
        nicknamediv.setAttribute('username', nicknamediv.textContent.trim());
        nicknamediv.setAttribute('usernamelc', nicknamediv.textContent.trim().toLowerCase());

        if (settings.wasd.userNameEdited[nicknamediv.textContent.trim()]) {
          nicknamediv.innerHTML = nicknamediv.innerHTML.replace(/ ([a-zA-Z0-9_-]+) /ig, ($0) => {
            let paint = HelperWASD.paints[$0.trim()]
            return `<span ${paint ? 'data-betterwasd-paint="' + paint + '"' : ''}> ${settings.wasd.userNameEdited[$0.trim()]} </span>`
          })
        } else {
          nicknamediv.innerHTML = nicknamediv.innerHTML.replace(/ ([a-zA-Z0-9_-]+) /ig, ($0) => {
            let paint = HelperWASD.paints[$0.trim()]
            return `<span ${paint ? 'data-betterwasd-paint="' + paint + '"' : ''}> ${$0.trim()} </span>`
          })
        }
      }

      let messageHTML = node.querySelector('.message-text > span');
      if (messageHTML && messageHTML.innerHTML != '') {
        // Исправить символы ломающие чат 
        if (settings.wasd.fixCharactersBreakingChat) messageHTML.innerHTML = stripCombiningMarks(messageHTML.innerHTML)

        for (let link of messageHTML.querySelectorAll('a')) {
          link.outerHTML = link.outerHTML.replace(/@/g, '+at+')
        }

        // fix link
        if (settings.wasd.fixedLinks) HelperWASD.elementToURL(messageHTML)

        // emotes
        if (settings.wasd.tv7Emotes) messageHTML.innerHTML = HelperTV7.replaceText(messageHTML.innerHTML)
        if (settings.wasd.bttvEmotes) messageHTML.innerHTML = HelperBTTV.replaceText(messageHTML.innerHTML)
        if (settings.wasd.ffzEmotes) messageHTML.innerHTML = HelperFFZ.replaceText(messageHTML.innerHTML)
        if (settings.wasd.bwasdEmotes) messageHTML.innerHTML = HelperBWASD.replaceText(messageHTML.innerHTML)

        let bl = ' ';

        messageHTML.innerHTML = messageHTML.innerHTML.replace(/@[a-zA-Z0-9_-]+/ig, ($1) => {
          let username = settings.wasd.userNameEdited[$1.trim().split('@').join('')];
          if (!username) {
            username = $1.trim().split('@').join('')
          }
          return `<span><span style='color: ${HelperWASD.usercolor($1.trim())};' class='chat-message-mention${settings.wasd.onClickMention.toString() !== '0' ? ' click' : ''}' username="${$1}" usernamelc="${$1.toLowerCase()}"> @${username.trim()} </span></span>`;
        });

        messageHTML.innerHTML = messageHTML.innerHTML.replace(/\+at\+/ig, '@')

        node.querySelectorAll('.chat-message-mention').forEach(element => {
          if (element.style.color == '') HelperWASD.usercolorapi(element);

          bl += element.getAttribute('usernamelc').split('@').join('') + ' '

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
        });

        node.setAttribute('mention', bl)

        let stickersovg = ''
        for (let stickerovg of node.querySelectorAll('.stickerovg')) {
          stickersovg += stickerovg.getAttribute('title') + ' '
        }
        node.setAttribute('stickersovg', stickersovg)
      }

      if (nicknamediv) {
        if (settings.wasd.onClickUserName.toString() === '0') {
          nicknamediv.style.cursor = 'auto';
          nicknamediv.style.textDecoration = 'auto';
          elClone = nicknamediv.cloneNode(true);
          nicknamediv.parentNode.replaceChild(elClone, nicknamediv);
          nicknamediv.addEventListener('click', ({ target }) => {
            if (target.getAttribute('username')) {
              HelperWASD.addUsernameToTextarea(target.getAttribute('username').split('@').join(''));
            }
          });
        } else if (settings.wasd.onClickUserName.toString() === '2') {
          elClone = nicknamediv.cloneNode(true);
          nicknamediv.parentNode.replaceChild(elClone, nicknamediv);
          nicknamediv = node.querySelector('.info__text__status__name');
          nicknamediv.addEventListener('click', ({ target }) => {
            if (target.getAttribute('username')) {
              if (!HelperWASD.addUsernameToTextarea(target.getAttribute('username').split('@').join(''))) {
                HelperWASD.createUserViewerCard(target.getAttribute('username').split('@').join(''));
              }
            }
          });
        }
      }

      if (settings.wasd.moderatorMenu.toString() === '2' || settings.wasd.moderatorMenu.toString() === '1') {
        let loading;
        let messageInfoStatus = node.querySelector('div.info__text__status')
        if (messageInfoStatus && !ownerRef && node.querySelector('div.message__info__icon')) {
          messageInfoStatus.insertAdjacentHTML("afterbegin", `<div class="info__text__status-paid-ovg ovg-moderator-tools button banned"><i class="icon-ovg wasd-icons-ban"></i></div>`);
          messageInfoStatus.insertAdjacentHTML("afterbegin", `<div class="info__text__status-paid-ovg ovg-moderator-tools button timeout"><i class="icon-ovg wasd-icons-sound-off"></i></div>`);
          messageInfoStatus.insertAdjacentHTML("afterbegin", `<div class="info__text__status-paid-ovg ovg-moderator-tools button remove"><i class="icon-ovg wasd-icons-delete"></i></div>`);

          messageInfo = node.querySelector('div.message__info');
          if (messageInfo) {
            messageInfo.insertAdjacentHTML("beforeend", `<div class="lds-ring" style="display: none;"><svg x="0px" y="0px" viewBox="0 0 150 150" class="icon-pending-ovg"><circle cx="75" cy="75" r="60" class="icon-pending-inner-ovg"></circle></svg></div>`);
            loading = node.querySelector('.lds-ring');
          }

          messageInfoStatus.querySelector('.info__text__status-paid-ovg.button.banned').addEventListener('click', ({ target }) => {
            if (node.querySelector('.message__info__icon > i')) {
              node.querySelector('.message__info__icon > i').click();

              const banned_message = () => {
                if (contextMenu) contextMenuBlocks = contextMenu.querySelectorAll('div.context-menu__block');
                let edited = false;
                for (i = 0; i < 10; i++) {
                  if (contextMenuBlocks[i]) {
                    if (contextMenuBlocks[i].querySelector('div.context-menu__block__text').textContent == " Забанить ") {
                      contextMenuBlocks[i].click();
                      //ovg.log('banned channal author');
                      document.querySelector('.message__info').click();
                      edited = true;
                      loading.style.display = 'inline-block'

                      if (settings.wasd.moderatorMenuAutomatic) {
                        document.querySelector('.block__popup__body > .block__popup__body__inner > .block__popup__body__inner__buttons > .inner__buttons__item > .ghost-btn > button.warning').click();
                        document.querySelector('wasd-chat-popups > div.block').style.display = 'none';

                        loading.style.display = 'none'
                      } else {
                        document.querySelector('.block__popup__body > .block__popup__body__inner > .block__popup__body__inner__buttons > .inner__buttons__item > .ghost-btn > button.basic').addEventListener('click', ({ target }) => {
                          loading.style.display = 'none'
                        })
                      }
                      break;
                    }
                  }
                  if (i == 9) {
                    document.querySelector('.message__info').click();
                    HelperWASD.showChatMessage('Вы не можете этого сделать', 'warning');
                  }
                }
              }

              fetch_banned_message = () => {
                if (node.querySelector('.message__info > .message__info__icon > wasd-chat-context-menu > .context-menu')) {
                  contextMenu = node.querySelector('.message__info > .message__info__icon > wasd-chat-context-menu > .context-menu');
                  banned_message()
                } else {
                  setTimeout(() => {
                    fetch_banned_message()
                  }, 2)
                }
              }
              fetch_banned_message()
            } else {
              HelperWASD.showChatMessage('Вы не можете этого сделать', 'warning');
            }
          });

          messageInfoStatus.querySelector('.info__text__status-paid-ovg.button.timeout').addEventListener('click', ({ target }) => {
            if (node.querySelector('.message__info__icon > i')) {
              node.querySelector('.message__info__icon > i').click();

              const timeout_message = () => {
                if (contextMenu) contextMenuBlocks = contextMenu.querySelectorAll('div.context-menu__block');
                let edited = false;
                for (i = 0; i < 10; i++) {
                  if (contextMenuBlocks[i]) {
                    if (contextMenuBlocks[i].querySelector('div.context-menu__block__text').textContent == " Временно заблокировать ") {
                      contextMenuBlocks[i].click();
                      //ovg.log('timeout channal author');
                      document.querySelector('.message__info').click();
                      edited = true;
                      loading.style.display = 'inline-block'
                      if (!document.querySelector('.block__popup__body > .block__popup__body__inner .inner__text__checkbox [type="checkbox"].input').checked && settings.wasd.keepMessagesTimeout) {
                        document.querySelector('.block__popup__body > .block__popup__body__inner .inner__text__checkbox [type="checkbox"].input').click()
                      }
                      switch (settings.wasd.moderatorMenuTimeout) {
                        case 1:
                        case '1':
                          document.querySelector('[formcontrolname="selectMuteDuration"] [for="0"]').click()
                          break
                        case 10:
                        case '10':
                          document.querySelector('[formcontrolname="selectMuteDuration"] [for="1"]').click()
                          break
                        case 60:
                        case '60':
                          document.querySelector('[formcontrolname="selectMuteDuration"] [for="2"]').click()
                          break
                        default:
                          document.querySelector('[formcontrolname="selectMuteDuration"] [for="0"]').click()
                          break
                      }

                      if (settings.wasd.moderatorMenuAutomatic) {
                        document.querySelector('.block__popup__body > .block__popup__body__inner > .block__popup__body__inner__buttons > .inner__buttons__item > .ghost-btn > button.warning').click();
                        document.querySelector('wasd-chat-popups > div.block').style.display = 'none';

                        loading.style.display = 'none'
                      } else {
                        document.querySelector('.block__popup__body > .block__popup__body__inner > .block__popup__body__inner__buttons > .inner__buttons__item > .ghost-btn > button.basic').addEventListener('click', ({ target }) => {
                          loading.style.display = 'none'
                        })
                      }
                      break;
                    }
                  }
                  if (i == 9) {
                    document.querySelector('.message__info').click();
                    HelperWASD.showChatMessage('Вы не можете этого сделать', 'warning');
                  }
                }
              }

              fetch_timeout_message = () => {
                if (node.querySelector('.message__info > .message__info__icon > wasd-chat-context-menu > .context-menu')) {
                  contextMenu = node.querySelector('.message__info > .message__info__icon > wasd-chat-context-menu > .context-menu');
                  timeout_message()
                } else {
                  setTimeout(() => {
                    fetch_timeout_message()
                  }, 2)
                }
              }
              fetch_timeout_message()
            } else {
              HelperWASD.showChatMessage('Вы не можете этого сделать', 'warning');
            }
          });

          messageInfoStatus.querySelector('.info__text__status-paid-ovg.button.remove').addEventListener('click', ({ target }) => {
            if (node.querySelector('.message__info__icon > i')) {
              node.querySelector('.message__info__icon > i').click();

              const remove_message = () => {
                if (contextMenu) contextMenuBlocks = contextMenu.querySelectorAll('div.context-menu__block');
                let edited = false;
                for (i = 0; i < 10; i++) {
                  if (contextMenuBlocks[i]) {
                    if (contextMenuBlocks[i].querySelector('div.context-menu__block__text').textContent == " Удалить сообщениe ") {
                      contextMenuBlocks[i].click();
                      //ovg.log('remove channal author');
                      document.querySelector('.message__info').click();
                      edited = true;
                      loading.style.display = 'inline-block'
                      if (document.querySelector('.block__popup__body > .block__popup__body__inner > .block__popup__body__inner__text > div > .inner__text__checkbox > label > input.input').checked) {
                        document.querySelector('.block__popup__body > .block__popup__body__inner > .block__popup__body__inner__text > div > .inner__text__checkbox > label > input.input').click();
                      }

                      if (settings.wasd.moderatorMenuAutomatic) {
                        document.querySelector('.block__popup__body > .block__popup__body__inner > .block__popup__body__inner__buttons > .inner__buttons__item > .ghost-btn > button.warning').click();
                        document.querySelector('wasd-chat-popups > div.block').style.display = 'none';
                        loading.style.display = 'none'
                      } else {
                        document.querySelector('.block__popup__body > .block__popup__body__inner > .block__popup__body__inner__buttons > .inner__buttons__item > .ghost-btn > button.basic').addEventListener('click', ({ target }) => {
                          loading.style.display = 'none'
                        })
                      }
                      break;
                    }
                  }
                  if (i == 9) {
                    document.querySelector('.message__info').click();
                    HelperWASD.showChatMessage('Вы не можете этого сделать', 'warning');
                  }
                }
              }

              fetch_remove_message = () => {
                if (node.querySelector('.message__info > .message__info__icon > wasd-chat-context-menu > .context-menu')) {
                  contextMenu = node.querySelector('.message__info > .message__info__icon > wasd-chat-context-menu > .context-menu');
                  remove_message()
                } else {
                  setTimeout(() => {
                    fetch_remove_message()
                  }, 2)
                }
              }
              fetch_remove_message()
            } else {
              HelperWASD.showChatMessage('Вы не можете этого сделать', 'warning');
            }
          });
        }
      }

      if (settings.wasd.copyMessage) {
        let messageInfoStatus = node.querySelector('div.info__text__status')
        if (messageInfoStatus) {
          messageInfoStatus.insertAdjacentHTML("afterbegin", `<div class="info__text__status-paid-ovg ovg-copy-tools button copy"><i class="icon-ovg wasd-icons-copy"></i></div>`);

          messageInfoStatus.querySelector('.info__text__status-paid-ovg.button.copy').addEventListener('click', ({ target }) => {
            // console.log(node, node.getAttribute('message'))

            let message = node.getAttribute('message')
            if (message) {
              copyTextToClipboard(message)
              HelperWASD.showChatMessage('Сообщение скопировано', 'success');
            } else {
              HelperWASD.showChatMessage('Не удалось скопировать сообщение', 'warning');
            }
          });
        }
      }

      const linkRecognizerGo = () => {
        if (a && linkify.test(a.href, 'url')) {

          if (new URL(a.href).host == "wasd.tv" && new URL(a.href).searchParams.get('record') != null) {
            if (settings.wasd.linkRecognizerWASD) {
              if (node) {
                node.insertAdjacentHTML("beforeend", `<div style=" font-size: 11px; margin: 5px;" class="ovg-bg-color-prime tw-border-radius-medium tw-elevation-1 ffz--chat-card tw-relative" style=""><div class="tw-border-radius-medium tw-c-background-base tw-flex tw-full-width"><a data-tooltip-type="link" style="text-decoration: none" data-url="${a.href}" target="_blank" rel="noreferrer noopener" href="${a.href}" class="ffz-interactable--hover-enabled tw-block tw-border-radius-medium tw-full-width ffz-interactable--default tw-interactive"><div class="tw-flex tw-flex-nowrap tw-pd-05"><div class="ffz--header-image" style="height:4.8rem;"></div><div class="ffz--card-text tw-full-width tw-overflow-hidden tw-flex tw-flex-column tw-justify-content-center"><div title="Загрузка..." class="tw-c-text-alt-2 tw-ellipsis tw-mg-x-05">Загрузка...</div></div></div></a></div></div>`);
                HelperWASD.scrollChatMessage(node, 50)
              }
              let href = a.href;

              $.ajax({
                url: `https://wasd.tv/api/v2/media-containers/${new URL(a.href).searchParams.get('record')}`,
                success: (out) => {
                  let game = 'неизвестно'
                  if (out.result.game != null) game = out.result.game.game_name;
                  let username = out.result.media_container_channel.channel_name
                  let usernameed = settings.wasd.userNameEdited[username.trim()];
                  node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${out.result.media_container_streams[0].stream_media[0].media_meta.media_preview_images.small}" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${out.result.media_container_name}" class="tw-ellipsis tw-semibold tw-mg-x-05">${out.result.media_container_name}</div><div title="${usernameed ? usernameed+' ('+username+')' : username} играет в ${game}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05"><a target="_blank" href="https://wasd.tv/user/${out.result.user_id}">${usernameed ? usernameed : username}</a> играет в ${game}</div><div title="${out.result.created_at} - ${out.result.media_container_streams[0].stream_total_viewers} просмотров" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${new Date(out.result.created_at).toLocaleDateString()} - ${out.result.media_container_streams[0].stream_total_viewers} просмотров</div></div></div></div>`;
                },
                error: (out) => {
                  node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;

                }
              });

            }

          } else if (new URL(a.href).host == "wasd.tv" && new URL(a.href).searchParams.get('clip') != null) {
            if (settings.wasd.linkRecognizerWASD) {
              if (node) {
                node.insertAdjacentHTML("beforeend", `<div style=" font-size: 11px; margin: 5px;" class="ovg-bg-color-prime tw-border-radius-medium tw-elevation-1 ffz--chat-card tw-relative" style=""><div class="tw-border-radius-medium tw-c-background-base tw-flex tw-full-width"><a data-tooltip-type="link" style="text-decoration: none" data-url="${a.href}" target="_blank" rel="noreferrer noopener" href="${a.href}" class="ffz-interactable--hover-enabled tw-block tw-border-radius-medium tw-full-width ffz-interactable--default tw-interactive"><div class="tw-flex tw-flex-nowrap tw-pd-05"><div class="ffz--header-image" style="height:4.8rem;"></div><div class="ffz--card-text tw-full-width tw-overflow-hidden tw-flex tw-flex-column tw-justify-content-center"><div title="Загрузка..." class="tw-c-text-alt-2 tw-ellipsis tw-mg-x-05">Загрузка...</div></div></div></a></div></div>`);
                HelperWASD.scrollChatMessage(node, 50)
              }
              let href = a.href;

              $.ajax({
                url: `https://wasd.tv/api/v2/clips/${new URL(a.href).searchParams.get('clip')}`,
                success: (out) => {
                  if (!out?.error?.code) {
                    let username = out.result.clip_channel.channel_name
                    let usernameed = settings.wasd.userNameEdited[username.trim()];
                    let clip_owner_login = out.result.clip_owner_login
                    let clip_owner_logined = settings.wasd.userNameEdited[clip_owner_login.trim()];
                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${out.result.clip_data.preview.small}" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${out.result.clip_title}" class="tw-ellipsis tw-semibold tw-mg-x-05">${out.result.clip_title}</div><div title="${usernameed ? usernameed+' ('+username+')' : username} играет в ${out.result.clip_game_name}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05"><a target="_blank" href="https://wasd.tv/user/${out.result.clip_channel.user_id}">${usernameed ? usernameed : username}</a> играет в ${out.result.clip_game_name}</div><div title="Автор клипа: ${clip_owner_logined ? clip_owner_logined+' ('+clip_owner_login+')' : clip_owner_login} - ${out.result.clip_views_count} просмотров" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">Автор клипа: <a target="_blank" href="https://wasd.tv/user/${out.result.clip_owner_profile_id}">${clip_owner_logined ? clip_owner_logined : clip_owner_login}</a> - ${out.result.clip_views_count} просмотров</div></div></div></div>`;
                  } else {
                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="${out.error.code}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.error.code}</div></div></div></div>`;
                  }
                },
                error: (out) => {
                  node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;
                }
              });

            }

          } else if (new URL(a.href).host == "wasd.tv" && new URL(a.href).pathname.split('/')[1] == "games") {
            if (settings.wasd.linkRecognizerWASD) {
              if (node) {
                node.insertAdjacentHTML("beforeend", `<div style=" font-size: 11px; margin: 5px;" class="ovg-bg-color-prime tw-border-radius-medium tw-elevation-1 ffz--chat-card tw-relative" style=""><div class="tw-border-radius-medium tw-c-background-base tw-flex tw-full-width"><a data-tooltip-type="link" style="text-decoration: none" data-url="${a.href}" target="_blank" rel="noreferrer noopener" href="${a.href}" class="ffz-interactable--hover-enabled tw-block tw-border-radius-medium tw-full-width ffz-interactable--default tw-interactive"><div class="tw-flex tw-flex-nowrap tw-pd-05"><div class="ffz--header-image" style="height:4.8rem;"></div><div class="ffz--card-text tw-full-width tw-overflow-hidden tw-flex tw-flex-column tw-justify-content-center"><div title="Загрузка..." class="tw-c-text-alt-2 tw-ellipsis tw-mg-x-05">Загрузка...</div></div></div></a></div></div>`);
                HelperWASD.scrollChatMessage(node, 50)
              }
              let href = a.href;

              $.ajax({
                url: `https://wasd.tv/api/games/${new URL(a.href).pathname.split('/')[2]}`,
                success: (out) => {
                  if (!out?.error?.code) {
                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${out.result.game_icon.small}" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${out.result.game_asset_name}" class="tw-ellipsis tw-semibold tw-mg-x-05">${out.result.game_asset_name}</div><div title="${out.result.game_description}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.result.game_description != null ? out.result.game_description : 'Нет описания'}</div></div></div></div>`;
                  } else {
                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="${out.error.code}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.error.code}</div></div></div></div>`;
                  }
                },
                error: (out) => {
                  node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;
                }
              });

            }

          } else if (new URL(a.href).host == "wasd.tv") {
            if (settings.wasd.linkRecognizerWASD) {
              if (node) {
                node.insertAdjacentHTML("beforeend", `<div style=" font-size: 11px; margin: 5px;" class="ovg-bg-color-prime tw-border-radius-medium tw-elevation-1 ffz--chat-card tw-relative" style=""><div class="tw-border-radius-medium tw-c-background-base tw-flex tw-full-width"><a data-tooltip-type="link" style="text-decoration: none" data-url="${a.href}" target="_blank" rel="noreferrer noopener" href="${a.href}" class="ffz-interactable--hover-enabled tw-block tw-border-radius-medium tw-full-width ffz-interactable--default tw-interactive"><div class="tw-flex tw-flex-nowrap tw-pd-05"><div class="ffz--header-image" style="height:4.8rem;"></div><div class="ffz--card-text tw-full-width tw-overflow-hidden tw-flex tw-flex-column tw-justify-content-center"><div title="Загрузка..." class="tw-c-text-alt-2 tw-ellipsis tw-mg-x-05">Загрузка...</div></div></div></a></div></div>`);
                HelperWASD.scrollChatMessage(node, 50)
              }
              let href = a.href;

              $.ajax({
                url: `https://wasd.tv/api/v2/broadcasts/public?channel_name=${new URL(a.href).pathname.split('/')[1]}`,
                success: (out) => {
                  if (typeof out.error !== 'undefined') {
                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;
                  } else {
                    let username = out.result.channel.channel_name
                    let usernameed = settings.wasd.userNameEdited[username.trim()];
                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${out.result.channel.channel_image.small}" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${usernameed ? usernameed+' ('+username+')' : username}" class="tw-ellipsis tw-semibold tw-mg-x-05">${usernameed ? usernameed : username}</div><div title="${out.result.channel.channel_description}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.result.channel.channel_description}</div></div></div></div>`;
                  }
                },
                error: (out) => {
                  node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;
                }
              });
            }

          } else if (new URL(a.href).host == "www.twitch.tv") {
            if (settings.wasd.linkRecognizerWASD) {
              if (node) {
                node.insertAdjacentHTML("beforeend", `<div style=" font-size: 11px; margin: 5px;" class="ovg-bg-color-prime tw-border-radius-medium tw-elevation-1 ffz--chat-card tw-relative" style=""><div class="tw-border-radius-medium tw-c-background-base tw-flex tw-full-width"><a data-tooltip-type="link" style="text-decoration: none" data-url="${a.href}" target="_blank" rel="noreferrer noopener" href="${a.href}" class="ffz-interactable--hover-enabled tw-block tw-border-radius-medium tw-full-width ffz-interactable--default tw-interactive"><div class="tw-flex tw-flex-nowrap tw-pd-05"><div class="ffz--header-image" style="height:4.8rem;"></div><div class="ffz--card-text tw-full-width tw-overflow-hidden tw-flex tw-flex-column tw-justify-content-center"><div title="Загрузка..." class="tw-c-text-alt-2 tw-ellipsis tw-mg-x-05">Загрузка...</div></div></div></a></div></div>`);
                HelperWASD.scrollChatMessage(node, 50)
              }
              let href = a.href;

              $.ajax({
                url: `https://api-test.frankerfacez.com/v2/link?url=${a.href}`,
                success: (out) => {
                  if (!out.short?.subtitle) {
                    let img = '';
                    let title = out.short.title
                    if (typeof title == 'object') title = out.short.title[0]
                    if (typeof out.short.image != "undefined") img = out.short.image.url;
                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${img}" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${title}" class="tw-ellipsis tw-semibold tw-mg-x-05">${title}</div></div></div></div>`;
                  } else {
                    let img = '';
                    if (typeof out.short.image != "undefined") img = out.short.image.url;
                    let d = ''
                    let title = out.short.title
                    if (typeof title == 'object') title = out.short.title[0]
                    if (out.short?.subtitle?.content?.user?.content?.content != undefined) d = `<div title="${out.short?.subtitle?.content?.user?.content?.content}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.short?.subtitle?.content?.user?.content?.content}</div>`
                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${img}" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${title}" class="tw-ellipsis tw-semibold tw-mg-x-05">${title}</div>${d}</div></div></div>`;
                  }

                  if (out.error) {
                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;
                  }
                },
                error: (out) => {
                  node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;
                }
              });
            }

          } else if (new URL(a.href).host == "twitter.com") {
            if (settings.wasd.linkRecognizerWASD) {
              if (node) {
                node.insertAdjacentHTML("beforeend", `<div style=" font-size: 11px; margin: 5px;" class="ovg-bg-color-prime tw-border-radius-medium tw-elevation-1 ffz--chat-card tw-relative" style=""><div class="tw-border-radius-medium tw-c-background-base tw-flex tw-full-width"><a data-tooltip-type="link" style="text-decoration: none" data-url="${a.href}" target="_blank" rel="noreferrer noopener" href="${a.href}" class="ffz-interactable--hover-enabled tw-block tw-border-radius-medium tw-full-width ffz-interactable--default tw-interactive"><div class="tw-flex tw-flex-nowrap tw-pd-05"><div class="ffz--header-image" style="height:4.8rem;"></div><div class="ffz--card-text tw-full-width tw-overflow-hidden tw-flex tw-flex-column tw-justify-content-center"><div title="Загрузка..." class="tw-c-text-alt-2 tw-ellipsis tw-mg-x-05">Загрузка...</div></div></div></a></div></div>`);
                HelperWASD.scrollChatMessage(node, 50)
              }
              let href = a.href;

              $.ajax({
                url: `https://api-test.frankerfacez.com/v2/link?url=${a.href}`,
                success: (out) => {
                  let img = '';
                  if (typeof out.short.image != "undefined") img = out.short.image.url;
                  let d = ''
                  let title = out.short.title
                  if (typeof title == 'object') title = out.short.title.content[0].content
                  if (typeof out.short?.subtitle[0] == 'string') d = `<div title="${out.short?.subtitle[0]}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.short?.subtitle[0]}</div>`
                  if (typeof out.short?.subtitle?.content?.tweet[0] == 'string') d = `<div title="${out.short.subtitle?.content?.tweet[0]}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.short?.subtitle?.content?.tweet[0]}</div>`

                  node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${img}" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${title}" class="tw-ellipsis tw-semibold tw-mg-x-05">${title}</div>${d}</div></div></div>`;

                  if (out.error) {
                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;
                  }
                },
                error: (out) => {
                  node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;
                }
              });
            }

          } else {
            if (settings.wasd.linkRecognizerall) {

              if (node) {
                node.insertAdjacentHTML("beforeend", `<div style=" font-size: 11px; margin: 5px;" class="ovg-bg-color-prime tw-border-radius-medium tw-elevation-1 ffz--chat-card tw-relative" style=""><div class="tw-border-radius-medium tw-c-background-base tw-flex tw-full-width"><a data-tooltip-type="link" style="text-decoration: none" data-url="${a.href}" target="_blank" rel="noreferrer noopener" href="${a.href}" class="ffz-interactable--hover-enabled tw-block tw-border-radius-medium tw-full-width ffz-interactable--default tw-interactive"><div class="lrhiver"></div><div class="tw-flex tw-flex-nowrap tw-pd-05"><div class="ffz--header-image" style="height:4.8rem;"></div><div class="ffz--card-text tw-full-width tw-overflow-hidden tw-flex tw-flex-column tw-justify-content-center"><div title="Загрузка..." class="tw-c-text-alt-2 tw-ellipsis tw-mg-x-05">Загрузка...</div></div></div></a></div></div>`);
                HelperWASD.scrollChatMessage(node, 50)
              }
              let href = a.href;

              let img = ''

              $.ajax({
                url: `https://api-test.frankerfacez.com/v2/link?url=${a.href}`,
                success: (out) => {
                  if (out?.error?.phrase) {
                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="${out?.error?.phrase}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out?.error?.phrase}</div></div></div></div>`;
                  } else if (new URL(href).host == "youtu.be" || new URL(href).host == "m.youtube.com" || new URL(href).host == "youtube.be" || (new URL(href).host == "www.youtube.com" && new URL(href).pathname == "/watch")) {
                    let imgdiv = ''
                    if (typeof out?.short?.image?.url != 'undefined') {
                      img = `<div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${out.short.image.url}" class=""></div>`
                    } else {
                      img = ''
                    }
                    let dater = new Date(Number(out?.full?.[0]?.content?.items?.[0]?.["bottom-right"]?.value) * 1000)
                    let textdate = `${(dater.getUTCHours() < 10) ? '0' + dater.getUTCHours() : ((dater.getUTCDate()*24) + dater.getUTCHours())}:${(dater.getUTCMinutes() < 10) ? '0' + dater.getUTCMinutes() : dater.getUTCMinutes()}:${(dater.getUTCSeconds() < 10) ? '0' + dater.getUTCSeconds() : dater.getUTCSeconds()}`
                    node.querySelector('.lrhiver').innerHTML = `<div class="lrhiverimg">
                      <div class="ffz__tooltip--inner ffz-rich-tip tw-align-left">
                        <div>
                          <div class="ffz--shift-hide">
                            ${out?.short?.image?.url ? `
                              <div class="ffz--rich-gallery" data-items="1">
                                <div class="ffz--gallery-column" data-items="1">
                                  <div class="ffz--overlay">
                                    <div class="ffz--overlay__content">
                                      <div class="ffz-aspect ffz-aspect--align-center">
                                        <div class="ffz-aspect__spacer" style="padding-top: 56.25%;"></div><img class=" " src="${out.short.image.url}" title="">
                                      </div>
                                    </div>
                                    <div class="ffz--overlay__bit" data-side="bottom-right">${textdate}</div>
                                  </div>
                                </div>
                              </div>
                            ` : ``}
                            
                            <div class="tw-flex ffz--rich-header">
                              <div class="ffz--header-image-h tw-mg-x-05"></div>
                              <div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1">
                                ${out?.short?.title ? `<div class="tw-ellipsis tw-semibold " title="${out.short.title}">${out.short.title}</div>` : ``}
                                ${out?.short?.subtitle?.content?.channel ? `<div class="tw-ellipsis tw-c-text-alt-2" title="${out.short.subtitle.content.channel} • ${out.short.subtitle.content.views.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} • 👍 ${out.short.subtitle.content.likes.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}">${out.short.subtitle.content.channel} • ${out.short.subtitle.content.views.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} • 👍 ${out.short.subtitle.content.likes.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}</div>` : ``}
                              </div>
                            </div>
                            ${out?.full?.[2]?.content ? `<div class="tw-white-space-pre-wrap ffz--line-clamp tw-mg-y-05" title="${out.full?.[2].content}" style="--ffz-lines:5;">${out.full?.[2].content}</div>` : ``}
                            ${out?.short?.extra?.[2]?.attrs?.datetime ? `
                              <div class="tw-flex tw-full-width tw-overflow-hidden ffz--rich-header ffz--compact-header tw-align-items-center">
                                <div class="tw-ellipsis tw-c-text-alt-2" title="${out.short.extra?.[1]}${new Date(out.short.extra?.[2].attrs.datetime).toLocaleDateString()}"><span class="ffz-i-youtube-play"></span>${out.short.extra?.[1]}<time datetime="${out.short.extra?.[2].attrs.datetime}" class="">${new Date(out.short.extra?.[2].attrs.datetime).toLocaleDateString()}</time></div>
                              </div>
                            ` : ``}
                          </div>
                        </div>
                      </div></div>`
                    imgdiv = ``
                    if (img != '') node.querySelector('.ffz--header-image').innerHTML = `<div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05 ffz--header-aspect" style="width:8.8rem">${img}</div>`

                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${out?.short?.title}" class="tw-ellipsis tw-semibold tw-mg-x-05">${out?.short?.title}</div><div title="${out?.short?.subtitle?.content?.channel} • ${out?.short?.subtitle?.content?.views.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} • 👍 ${out?.short?.subtitle?.content?.likes.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out?.short?.subtitle?.content?.channel} • ${out?.short?.subtitle?.content?.views.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} • 👍 ${out?.short?.subtitle?.content?.likes.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}</div><div title="${out?.short?.extra?.[1]} ${new Date(out?.short?.extra?.[2]?.attrs?.datetime).toLocaleDateString()}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05"><span class="ffz-i-youtube-play"></span>${out?.short?.extra?.[1]}<time datetime="${out?.short?.extra?.[2]?.attrs?.datetime}" class="">${new Date(out?.short?.extra?.[2]?.attrs?.datetime).toLocaleDateString()}</time></div></div></div></div>`;
                  } else if (out?.short?.title) {
                    if (typeof out.error == 'undefined') {
                      if (!out?.short?.subtitle) {
                        if (typeof out?.short?.image?.url != 'undefined') {
                          img = `<div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${out.short.image.url}" class=""></div>`
                        } else {
                          img = ''
                        }
                        let dater = new Date(Number(out?.full?.[0]?.content?.items?.[0]?.["bottom-right"]?.value) * 1000)
                        let textdate = `${(dater.getUTCHours() < 10) ? '0' + dater.getUTCHours() : ((dater.getUTCDate()*24) + dater.getUTCHours())}:${(dater.getUTCMinutes() < 10) ? '0' + dater.getUTCMinutes() : dater.getUTCMinutes()}:${(dater.getUTCSeconds() < 10) ? '0' + dater.getUTCSeconds() : dater.getUTCSeconds()}`

                        let title = out?.short?.title
                        if (typeof title == 'object' && typeof title?.phrase == 'string') title = title?.phrase

                        node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05">${img}<div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${title}" class="tw-ellipsis tw-semibold tw-mg-x-05">${title}</div></div></div></div>`;
                      } else {
                        if (typeof out?.short?.image?.url != 'undefined') {
                          img = `<div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${out.short.image.url}" class=""></div>`
                        } else {
                          img = ''
                        }
                        let dater = new Date(Number(out?.full?.[0]?.content?.items?.[0]?.["bottom-right"]?.value) * 1000)
                        let textdate = `${(dater.getUTCHours() < 10) ? '0' + dater.getUTCHours() : ((dater.getUTCDate()*24) + dater.getUTCHours())}:${(dater.getUTCMinutes() < 10) ? '0' + dater.getUTCMinutes() : dater.getUTCMinutes()}:${(dater.getUTCSeconds() < 10) ? '0' + dater.getUTCSeconds() : dater.getUTCSeconds()}`

                        let subtitle = out.short.subtitle
                        if (typeof subtitle == 'object') subtitle = subtitle[0]
                        if (typeof subtitle == 'object') subtitle = ''

                        if (!(subtitle == '' || typeof subtitle == 'undefined')) {
                          subtitle = `<div title="${subtitle}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${subtitle}</div>`
                        } else {
                          subtitle = ''
                        }

                        let title = out?.short?.title

                        if (typeof title == 'object' && typeof title?.phrase == 'string') title = title?.phrase
                        if (typeof out.short.subtitle?.content?.name?.content == 'string') subtitle = `<div title="${out.short.subtitle?.content?.name?.content}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.short.subtitle?.content?.name?.content}</div>`

                        node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header">${img}<div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${title}" class="tw-ellipsis tw-semibold tw-mg-x-05">${title}</div>${subtitle}</div></div></div>`;
                      }
                    } else {
                      node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="${out.error.phrase}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.error.phrase}</div></div></div></div>`;
                    }
                  } else {
                    if (typeof out?.short?.image?.url != 'undefined') {
                      img = `<div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${out.short.image.url}" class=""></div>`
                    } else {
                      img = ''
                    }
                    let dater = new Date(Number(out?.full?.[0]?.content?.items?.[0]?.["bottom-right"]?.value) * 1000)
                    let textdate = `${(dater.getUTCHours() < 10) ? '0' + dater.getUTCHours() : ((dater.getUTCDate()*24) + dater.getUTCHours())}:${(dater.getUTCMinutes() < 10) ? '0' + dater.getUTCMinutes() : dater.getUTCMinutes()}:${(dater.getUTCSeconds() < 10) ? '0' + dater.getUTCSeconds() : dater.getUTCSeconds()}`

                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header">${img}<div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${out?.base}" class="tw-ellipsis tw-semibold tw-mg-x-05">${out?.base}</div></div></div></div>`;
                  }
                },
                error: (out) => {
                  node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;
                }
              });

            }
          }
        }
      }

      a = node.querySelector('div.message-text a');

      switch (settings.wasd.linkRecognitionRights.toString()) {
        case '0':
          if (adminRef || ownerRef) linkRecognizerGo()
          break;
        case '1':
          if (adminRef || ownerRef || modRef) linkRecognizerGo()
          break;
        case '2':
          if (adminRef || ownerRef || modRef || subRef) linkRecognizerGo()
          break;
        case '3':
          linkRecognizerGo()
          break;
      }

      node.querySelector('div.message__info__icon > i')?.addEventListener('click', () => {
        let trycreate = 0
        create_context_block = () => {
          context_menu = node.querySelector('.context-menu')
          if (context_menu) {
            if (!context_menu.querySelector('.contextBlacklistAddUser')) {
              let item = document.createElement('div')
              item.classList.add(`context-menu__block`)
              item.setAttribute('ovg', '')
              item.innerHTML = `<div class="context-menu__block__icon contextBlacklistAddUser"><i class="icon wasd-icons-cross"></i></div><div class="context-menu__block__text"> Добавить в ЧС </div>`;
              context_menu.append(item)
              item.addEventListener('click', ({ target }) => {
                let username = node.querySelector('.info__text__status__name').getAttribute('username');
                if (!settings.list.blockUserList[username]) {
                  HelperWASD.showChatMessage(`Пользователь ${username} добавлен в ЧС`, 'success')
                  settings.list.blockUserList[username] = new Date();
                  HelperWASD.addUserToBlackList(username)
                  HelperSettings.save([document.querySelector('.optionField')]);
                } else {
                  HelperWASD.showChatMessage('Пользователь уже в ЧС, обновите чат!', 'warning')
                }
                node.click()
              })
            }
            if (!context_menu.querySelector('.contextPinMessages') && !settings.wasd.pinMessage) { // -!2
              let item = document.createElement('div')
              item.classList.add(`context-menu__block`)
              item.innerHTML = `<div class="context-menu__block__icon contextPinMessages"><i class="icon wasd-icons-cross"></i></div><div class="context-menu__block__text"> Закрепить сообщение </div>`;
              context_menu.append(item)
              item.addEventListener('click', ({ target }) => {
                HelperWASD.addPinMessage(node)
                node.click()
              })
            }
          } else {
            trycreate++
            if (trycreate < 999) {
              setTimeout(() => {
                create_context_block()
              }, 5)
            }
          }
        }

        create_context_block()
      })

      let mentoinHtml; // follow / sub
      if (settings.wasd.clickMentionAll && node.querySelector('wasd-chat-follower-message')) {
        mentoinHtml = node.querySelector('.message-follower__name')
      }
      if (settings.wasd.clickMentionAll && node.querySelector('wasd-chat-subscribe-message')) {
        mentoinHtml = node.querySelector('.block__item__title')
      }

      if (mentoinHtml) {
        let username;
        mentoinHtml.innerHTML = mentoinHtml.innerHTML.replace(/ ([a-zA-Z0-9_-]+) /ig, ($0) => {
          username = $0.trim()

          let out;
          if (settings.wasd.onClickMention.toString() === '0') {

            out = `<span><span style='color: ${HelperWASD.usercolor("@"+username)};' class='chat-message-mention' username="@${username}" usernamelc="${username.toLowerCase()}"> ${username} </span></span>`
            node.querySelectorAll('.chat-message-mention').forEach(element => {
              HelperWASD.usercolorapi(element);
              element.addEventListener('click', ({ target }) => {
                if (target.getAttribute('username')) {
                  HelperWASD.addUsernameToTextarea(target.getAttribute('username').split('@').join(''));
                }
              });
            });
          } else if (settings.wasd.onClickMention.toString() === '1') {
            out = `<span><span style='color: ${HelperWASD.usercolor("@"+username)};' class='chat-message-mention click' username="@${username}" usernamelc="${username.toLowerCase()}"> ${username} </span></span>`
            node.querySelectorAll('.chat-message-mention.click').forEach(element => {
              HelperWASD.usercolorapi(element);
              element.addEventListener('click', ({ target }) => {
                if (textarea) {
                  textarea.value += target.getAttribute('username').trim() + ' ';
                  textarea.dispatchEvent(new Event('input'));
                  textarea.focus()
                }
              })
            });
          } else if (settings.wasd.onClickMention.toString() === '2') {
            out = `<span><span style='color: ${HelperWASD.usercolor("@"+username)};' class='chat-message-mention click' username="@${username}" usernamelc="${username.toLowerCase()}"> ${username} </span></span>`
            node.querySelectorAll('.chat-message-mention.click').forEach(element => {
              HelperWASD.usercolorapi(element);
              element.addEventListener('click', ({ target }) => {
                if (target.getAttribute('username')) {
                  if (!HelperWASD.addUsernameToTextarea(target.getAttribute('username').split('@').join(''))) {
                    HelperWASD.createUserViewerCard(target.getAttribute('username').split('@').join(''));
                  }
                }
              })
            });
          }
          return out
        })
        
        let element = node.querySelector('.chat-message-mention')

        if (settings.wasd.onClickMention.toString() === '0') {
          element.addEventListener('click', ({ target }) => {
            if (target.getAttribute('username')) {
              HelperWASD.addUsernameToTextarea(target.getAttribute('username').split('@').join(''));
            }
          });

        } else if (settings.wasd.onClickMention.toString() === '1') {
          element.addEventListener('click', ({ target }) => {
            if (textarea) {
              textarea.value += target.getAttribute('username').trim() + ' ';
              textarea.dispatchEvent(new Event('input'));
              textarea.focus()
            }
          })

        } else if (settings.wasd.onClickMention.toString() === '2') {
          element.addEventListener('click', ({ target }) => {
            if (target.getAttribute('username')) {
              if (!HelperWASD.addUsernameToTextarea(target.getAttribute('username').split('@').join(''))) {
                HelperWASD.createUserViewerCard(target.getAttribute('username').split('@').join(''));
              }
            }
          })
        }

      }

      if (document.visibilityState != "visible" && isobserver && settings.wasd.notifyOnMention && node.querySelector('.has-mention')) {
        Helper.notify(`Вас упоминул ${node.getAttribute('username')}`, node.getAttribute('message'), node.getAttribute('username'))
      }

      let allbadge = HelperWASD.badges[node.getAttribute('username')]
      if (allbadge && allbadge.badges.length > 0) {
        for (let badg of allbadge.badges) {
          node.querySelector('.info__text__status').insertAdjacentHTML("afterbegin", badg.html.replace( "{user_color}" , `${HelperWASD.userColors[allbadge.user_id % (HelperWASD.userColors.length - 1)]}` ));
        }
      }

      for (let paint in HelperWASD.paints) {
        for (let user of document.querySelectorAll(`.chat-message-mention[username="@${paint}"]`)) {
          user.dataset.betterwasdPaint = HelperWASD.paints[paint]
        }
      }

      let paint = HelperWASD.paints[node.getAttribute('username')]
      if (paint) node.querySelector('.info__text__status__name > span').dataset.betterwasdPaint = paint

      let tooltips = node.querySelectorAll(".tooltip-wrapper");
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

      adminRef       = node.querySelector('.is-admin')
      modRef         = node.querySelector('.is-moderator')
      ownerRef       = node.querySelector('.is-owner')
      subRef         = node.querySelector('.info__text__status-paid')
      promoCodeWin   = node.querySelector('.message__promocodes')

      if (modRef && !settings.wasd.showModeratorBadge) {
        modRef.classList.remove('is-moderator')
        modRef.querySelector('.icon.wasd-icons-moderator').remove()
        let c = HelperWASD.userColors[Number(document.querySelector(`.WebSocket_history [user_login="${node.querySelector('.info__text__status__name').getAttribute('username')}"]`)?.getAttribute('user_id')) % (HelperWASD.userColors.length - 1)]
        if (c) { node.querySelector('.info__text__status__name').style.color = c
        } else { node.querySelector('.info__text__status__name').style.color = HelperWASD.usercolorapi(modRef) }
      }

      if (ownerRef && !settings.wasd.showOwnerBadge) {
        ownerRef.classList.remove('is-owner')
        ownerRef.querySelector('.icon.wasd-icons-owner').remove()
        let c = HelperWASD.userColors[Number(document.querySelector(`.WebSocket_history [user_login="${node.querySelector('.info__text__status__name').getAttribute('username')}"]`)?.getAttribute('user_id')) % (HelperWASD.userColors.length - 1)]
        if (c) { node.querySelector('.info__text__status__name').style.color = c
        } else { node.querySelector('.info__text__status__name').style.color = HelperWASD.usercolorapi(ownerRef) }
      }

      if (adminRef && !settings.wasd.showAdminBadge) {
        adminRef.classList.remove('is-admin')
        adminRef.querySelector('.icon.wasd-icons-dev').remove()
        let c = HelperWASD.userColors[Number(document.querySelector(`.WebSocket_history [user_login="${node.querySelector('.info__text__status__name').getAttribute('username')}"]`)?.getAttribute('user_id')) % (HelperWASD.userColors.length - 1)]
        if (c) { node.querySelector('.info__text__status__name').style.color = c
        } else { node.querySelector('.info__text__status__name').style.color = HelperWASD.usercolorapi(adminRef) }
      }

      if (subRef && !settings.wasd.showSubBadge) {
        subRef.remove()
      }

      if (promoCodeWin && !settings.wasd.showPromoCodeWin) {
        promoCodeWin.remove()
      }

      $(node.querySelector('.message-text')).attrchange({
        trackValues: true,
        callback: function (event) {
          if (event.newValue == 'message-text message-text_deleted') {
            node.setAttribute('state', 'removed')
          } else if (event.newValue == 'message-text') {
            node.setAttribute('state', '')
          }
        }
      })

    }
  },
};