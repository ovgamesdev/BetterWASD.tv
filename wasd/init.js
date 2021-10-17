const wasd = {
  style: null,
  isObserverEndBind: false,
  isObserverEndBindBody: false,
  badges: {},
  init() {
    ovg.log("init");
    var observer;
    const chatQuerySelector = 'wasd-chat';
    HelperWASD.loadBadges()
    const init = (documentElement, target) => {
      if (target !== null) {
        this.document = documentElement;

        function checkchatdiv() {
          if (document.querySelector('div.block__messages')) {
            function startObserver() {
              mutationtarget = document.querySelector('div.block__messages');
              const config = {
                attributes: true,
                childList: true,
                characterData: true
              };
              const callback = function(mutationsList, observer) {
                for (let mutation of mutationsList) {
                  for (let node of mutation.addedNodes) {
                    wasd.handleMessage(node, true);
                  }
                }
              };
              observer = new MutationObserver(callback);
              if (mutationtarget) {
                observer.observe(mutationtarget, config);
                ovg.log("start observer (CHAT)");
                document.querySelector('#bscSettingsPanel .update > i').classList.remove('resetPlayerLoading');
                HelperWASD.getIsModerator().then((resolve) => {
                  HelperWASD.isModerator = resolve
                  wasd.update();
                })

                wasd.update();
                isObserverStarted = true;
                HelperWASD.updateStreamTimer();
                HelperWASD.createPinMessages();
                // HelperSocket.start(getChannelName()).then(i => {
                //     if (i == 'leave') {
                //         isObserverStarted = false;
                //         isObserverBinding = false;
                //         observer.disconnect();
                //         HelperSocket.stop()
                //         clearInterval(intervalUpdateStreamTimer);
                //         ovg.log("disconnect observer (CHAT) leave");
                //         HelperWASD.isModerator = false
                //         if (document.querySelector('.chat-container__wrap')) document.querySelector('.chat-container__wrap').remove()
                //         if (document.querySelector('wasd-stream-chat')) document.querySelector('wasd-stream-chat').remove()
                //         setTimeout(startObserver, 200)
                //     }
                // });

                if (!this.isObserverEndBind && document.querySelector('.burger-menu #selector-bm-channel a')) {
                  document.querySelector('.burger-menu #selector-bm-channel a').addEventListener('click', ({
                    target
                  }) => {
                    isObserverBinding = false;
                    isObserverStarted = false;
                    observer.disconnect();
                    //HelperSocket.stop()
                    clearInterval(intervalUpdateStreamTimer);
                    ovg.log("disconnect observer (CHAT) [4 Канал]");
                    HelperWASD.isModerator = false
                    if (document.querySelector('.chat-container__wrap')) document.querySelector('.chat-container__wrap').remove()
                    if (document.querySelector('wasd-stream-chat')) document.querySelector('wasd-stream-chat').remove()
                    setTimeout(startObserver, 200)
                  });
                  this.isObserverEndBind = true;
                }

                if (!this.isObserverEndBind && document.querySelector('#selector-header-stream-settings')) {
                  document.querySelector('#selector-header-stream-settings').addEventListener('click', ({
                    target
                  }) => {
                    isObserverBinding = false;
                    isObserverStarted = false;
                    observer.disconnect();
                    //HelperSocket.stop()
                    clearInterval(intervalUpdateStreamTimer);
                    ovg.log("disconnect observer (CHAT) [3 Начать стрим]");
                    HelperWASD.isModerator = false
                    if (document.querySelector('.chat-container__wrap')) document.querySelector('.chat-container__wrap').remove()
                    if (document.querySelector('wasd-stream-chat')) document.querySelector('wasd-stream-chat').remove()
                    setTimeout(startObserver, 200)
                  });
                  this.isObserverEndBind = true;
                }

              } else {
                // ovg.log("observer not started (CHAT)");
                setTimeout(startObserver, 10)
                //HelperSocket.stop()
              }

              for (let element of this.document.querySelectorAll('div.block__messages__item')) {
                wasd.handleMessage(element);
              }

              if (!isObserverBinding) {
                function checkheaderdiv() {
                  let header_block_menu = document.querySelector('.header > div.header__block__menu')
                  if (header_block_menu) {
                    header_block_menu.childNodes[1].addEventListener('click', ({
                      target
                    }) => {
                      isObserverStarted = false;
                      // isObserverBinding = false;
                      observer.disconnect();
                      //HelperSocket.stop()
                      clearInterval(intervalUpdateStreamTimer);
                      ovg.log("disconnect observer (CHAT) [2 чат/участники]");
                      HelperWASD.isModerator = false
                      setTimeout(startObserver, 200)
                    });

                    document.body.addEventListener('click', ({
                      target
                    }) => {
                      if (isObserverStarted) {
                        if (!document.querySelector('.header > div.header__block__menu')) {
                          isObserverBinding = false;
                          isObserverStarted = false;
                          observer.disconnect();
                          //HelperSocket.stop()
                          clearInterval(intervalUpdateStreamTimer);
                          ovg.log("disconnect observer (CHAT) [1]");
                          HelperWASD.isModerator = false
                          setTimeout(startObserver, 200)
                        }
                      }
                    });
                  } else {
                    setTimeout(() => {
                      checkheaderdiv();
                    }, 200)
                  }
                }
                checkheaderdiv();
                isObserverBinding = true;
              }
            }
            startObserver();
          } else {
            setTimeout(() => {
              checkchatdiv()
            }, 10);
          }
        }

        checkchatdiv()

        let wasdPlayer = document.querySelector('wasd-player')
        if (wasdPlayer) {
          wasdPlayer.addEventListener("touchend", handleStart, false);

          function handleStart(evt) {
            setTimeout(() => {
              document.querySelector('.media-control').classList.remove('media-control-hide')
              document.querySelector('.custom-media-control').classList.remove('custom-media-hidden')
              document.querySelector('.player-streaminfo').classList.remove('custom-media-hidden')
            }, 10)
          }
          wasdPlayer.onmousedown = function(e) {
            if (settings.wasd.mutePlayerOnMiddleMouse && e.button == 1) {
              document.querySelector('.player-button.volume-button').click()
              return false;
            }
          }
        }

      }
    };

    let target = document.querySelector(chatQuerySelector);

    if (target === null) {
      let interval = setInterval(() => {
        let chatFrame = document.querySelector('wasd-chat-body');
        if (chatFrame) {
          let documentElement = chatFrame.querySelector('.chat-container__wrap');
          target = chatFrame;

          if (target !== null) {
            clearInterval(interval);
            init(document.querySelector('wasd-chat-body'), target);
          }
        }
      }, 250);
    } else {
      init(document, target);
    }

    if (this.style === null) {
      this.style = document.createElement('style');
      this.style.type = 'text/css';
      document.body.append(this.style);
      wasd.update();
    }

    function fixMobilePlayer() {
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

    fixMobilePlayer()
  },
  update() {
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

    if (settings.wasd.sticker.toString() === '0') {
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
      cssCode += `@media screen and (min-width:480px) {wasd-chat-wrapper > div.chat-container { width: ${settings.wasd.chatWidth}px!important }}`;
      cssCode += `wasd-channel > div.channel-wrapper > div#channel-wrapper { order: 1!important; }`;
      cssCode += `div.player-wrapper.theatre-mode { left: ${settings.wasd.chatWidth}px!important; width: calc(100vw - ${settings.wasd.chatWidth}px)!important; }`;
    } else {
      cssCode += `@media screen and (min-width:480px) {wasd-chat-wrapper > div.chat-container { width: ${settings.wasd.chatWidth}px!important }}`;
      cssCode += `div.player-wrapper.theatre-mode { width: calc(100vw - ${settings.wasd.chatWidth}px)!important; }`;
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
      cssCode += `.info__text__status__name, info__text__status__name-ovg { font-size: ${settings.wasd.fontSize}px!important; display: contents!important;}`;
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
      cssCode += `div.block__messages__item:nth-child(2n+1) { background-color: ${settings.wasd.alternatingColorChatMessagesColor[1] != '#000000' ? settings.wasd.alternatingColorChatMessagesColor[1]+'!important' : 'var(--wasd-color-prime)!important' }; }`;
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
    if (settings.wasd.hideSelectorStreamSettings) {
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
    cssCode += `.message.has-mention {${bgmc}}`

    cssCode += `.message.openCardColor {background-color: ${settings.wasd.highlightMessagesOpenCardColor != '#000000' ? settings.wasd.highlightMessagesOpenCardColor+'!important' : 'rgba(var(--wasd-color-switch--rgb),.08)!important' }}`

    cssCode += `.info__text__status-paid-ovg {display: ${HelperWASD.isModerator ? '' : 'none!important;'}}`

    if (settings.wasd.messageHover) {
      cssCode += `.message:hover { background-color: ${settings.wasd.colorMessageHover != '#000000' ? settings.wasd.colorMessageHover+'!important' : 'rgba(var(--wasd-color-switch--rgb),.08)!important' }; }`;
      cssCode += `.message-ovg:hover { background-color: ${settings.wasd.colorMessageHover != '#000000' ? settings.wasd.colorMessageHover+'!important' : 'rgba(var(--wasd-color-switch--rgb),.08)!important' }; }`;
      cssCode += `.ovg-bg-color-prime:hover { background-color: ${settings.wasd.colorMessageHover != '#000000' ? settings.wasd.colorMessageHover+'!important' : 'rgba(var(--wasd-color-switch--rgb),.08)!important' }; }`;
    }
    cssCode += `.paidsubs-popup__stickers-item {cursor: url(${chrome.extension.getURL("img/cursorS.png")}) 4 4, auto}`

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
      cssCode += 'li#selector-header-random-stream {display: none!important}'
    }

    for (let role in settings.highlightRole) {
      if (!(settings.highlightRole[role] == '#000000' || settings.highlightRole[role] == '#00000000')) cssCode += `.block__messages__item[role*="${role}"], .block__messages__item-ovg[role*="${role}"] {background-color:  ${settings.highlightRole[role]}!important}`
    }

    for (let user in settings.list.blockUserList) {
      cssCode += `.block__messages__item[username="${user}"], .block__messages__item-ovg[username="${user}"] {display: none!important;}`
      if (settings.wasd.removeMentionBL) {
        cssCode += `.block__messages__item[mention*="${user}"], .block__messages__item-ovg[mention*="${user}"] {display: none!important;}`
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

    cssCode += `.info__text__status-paid-ovg {background-color: ${settings.wasd.colorModOptions != '#000000' ? settings.wasd.colorModOptions+'!important' : 'rgba(var(--wasd-color-switch--rgb),.08)!important' }}`

    if (settings.wasd.hideRaid) {
      cssCode += `.player-info .raid { display: none !important; }`
    }

    var iframe = document.querySelector('iframe.obschat')
    iframe?.contentWindow?.postMessage(settings.obschat, '*');

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
        wasd.update()
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

      adminRef = node.querySelector('.is-admin')
      modRef = node.querySelector('.is-moderator')
      ownerRef = node.querySelector('.is-owner')
      subRef = node.querySelector('.info__text__status-paid')

      var usernametext = node.querySelector('.info__text__status__name')?.textContent.trim()
      var message = node.querySelector('.message-text > span')?.textContent.trim()
      var color = node.querySelector('.info__text__status__name')?.style?.color
      if (subRef) color = subRef?.style?.backgroundColor
      var sticker = node.querySelector('.sticker')?.src

      let roles = 'user'
      if (node.querySelector('.wasd-icons-owner')) roles += ' owner'
      if (node.querySelector('.wasd-icons-dev')) roles += ' admin'
      if (node.querySelector('.wasd-icons-moderator')) roles += ' moderator'
      if (node.querySelector('.wasd-icons-star')) roles += ' sub'
      node.setAttribute('role', roles)

      if (node.querySelector('img[alt="sticker"]')) node.setAttribute('sticker', node.querySelector('img[alt="sticker"]').src)

      if (HelperWASD.openUserCardName == usernametext && node.querySelector('wasd-chat-message > .message')) {
        if (settings.wasd.highlightMessagesOpenCard) node.querySelector('wasd-chat-message > .message').classList.add('openCardColor')
        if (isobserver) HelperWASD.addMessageToCpenCard(roles, usernametext, color, message, sticker)
      }

      if (usernametext) node.setAttribute('username', usernametext)

      if (message) node.setAttribute('message', message)

      if (sticker) node.querySelector('img.sticker').insertAdjacentHTML("afterend", `<span class="chat-message-text stickertext sticker_text">Стикер</span>`)

      if (isobserver && node.querySelector('.message__time')) {
        node.querySelector('.message__time').textContent = moment().format(settings.wasd.formatMessageSentTime)
      }

      if (node.querySelector('div.message-text')) {
        node.querySelector('div.message-text').innerHTML = node.querySelector('div.message-text').innerHTML.replace('</', ' </').replace('>', '> ');
      }

      if (node.querySelector('div.message-text') && settings.wasd.fixCharactersBreakingChat) {
        node.querySelector('div.message-text').innerHTML = stripCombiningMarks(node.querySelector('div.message-text').innerHTML)
      }

      // fix link
      if (settings.wasd.fixedLinks) {
        if (node.querySelector('div.message-text')) {
          let message = node.querySelector('div.message-text');
          message.innerHTML = HelperWASD.textToURL(message.innerHTML);
        }
      }

      let nicknamediv = node.querySelector('.info__text__status__name');
      if (settings.wasd.colonAfterNickname) {
        let message = node.querySelector('.message-text');
        if (message) {
          message.insertAdjacentHTML("beforebegin", `<span aria-hidden="true" id="colon-after-author-name" style=" margin-right: 4px; color: var(--yt-live-chat-primary-text-color, rgba(var(--wasd-color-switch--rgb),.88))" >: </span>`);

          if (nicknamediv) {
            nicknamediv.style.margin = "0px";
          }
        }
      }

      nicknamediv = node.querySelector('.info__text__status__name');
      if (nicknamediv) {
        nicknamediv.setAttribute('username', nicknamediv.textContent.trim().toLowerCase());

        if (settings.wasd.userNameEdited[nicknamediv.textContent.trim()]) {
          nicknamediv.textContent = ` ${settings.wasd.userNameEdited[nicknamediv.textContent.trim()]} `
        }
      }

      let messageText = node.querySelector('.message-text > span');
      if (messageText) {
        if (settings.wasd.bttvEmotes) messageText.innerHTML = HelperBTTV.replaceText(messageText.innerHTML)
        if (settings.wasd.ffzEmotes) messageText.innerHTML = HelperFFZ.replaceText(messageText.innerHTML);
        if (settings.wasd.tv7Emotes) messageText.innerHTML = HelperTV7.replaceText(messageText.innerHTML);

        let bl = ' ';

        if (settings.wasd.onClickMention.toString() === '0') {
          messageText.innerHTML = messageText.innerHTML.replace(/@[a-zA-Z0-9_-]+/ig, function($1) {
            let username = settings.wasd.userNameEdited[$1.trim().split('@').join('')];
            if (!username) {
              username = $1.trim().split('@').join('')
            }
            return `<span style='color: ${HelperWASD.usercolor($1.trim())};' class='chat-message-mention' username="${$1.toLowerCase()}">@${username.trim()}</span>`;
          });
          node.querySelectorAll('.chat-message-mention').forEach(element => {
            HelperWASD.usercolorapi(element);
            bl += element.getAttribute('username').split('@').join('') + ' '
            element.addEventListener('click', ({
              target
            }) => {
              if (target.getAttribute('username')) {
                HelperWASD.addUsernameToTextarea(target.getAttribute('username').split('@').join(''));
              }
            });
          });
        } else if (settings.wasd.onClickMention.toString() === '1') {
          messageText.innerHTML = messageText.innerHTML.replace(/@[a-zA-Z0-9_-]+/ig, function($1) {
            let username = settings.wasd.userNameEdited[$1.trim().split('@').join('')];
            if (!username) {
              username = $1.trim().split('@').join('')
            }
            return `<span style='color: ${HelperWASD.usercolor($1.trim())};' class='chat-message-mention click' username="${$1.toLowerCase()}">@${username.trim()}</span>`;
          });
          node.querySelectorAll('.chat-message-mention.click').forEach(element => {
            HelperWASD.usercolorapi(element);
            bl += element.getAttribute('username').split('@').join('') + ' '
            element.addEventListener('click', ({
              target
            }) => {
              if (textarea) {
                textarea.value += target.getAttribute('username').trim() + ' ';
                textarea.dispatchEvent(new Event('input'));
                textarea.focus()
              }
            })
          });
        } else if (settings.wasd.onClickMention.toString() === '2') {
          messageText.innerHTML = messageText.innerHTML.replace(/@[a-zA-Z0-9_-]+/ig, function($1) {
            let username = settings.wasd.userNameEdited[$1.trim().split('@').join('')];
            if (!username) {
              username = $1.trim().split('@').join('')
            }
            return `<span style='color: ${HelperWASD.usercolor($1.trim())};' class='chat-message-mention click' username="${$1.toLowerCase()}">@${username.trim()}</span>`;
          });
          node.querySelectorAll('.chat-message-mention.click').forEach(element => {
            HelperWASD.usercolorapi(element);
            bl += element.getAttribute('username').split('@').join('') + ' '
            element.addEventListener('click', ({
              target
            }) => {
              if (target.getAttribute('username')) {
                if (!HelperWASD.addUsernameToTextarea(target.getAttribute('username').split('@').join(''))) {
                  HelperWASD.createUserViewerCard(target.getAttribute('username').split('@').join(''));
                }
              }
            })
          });
        }

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
          nicknamediv.addEventListener('click', ({
            target
          }) => {
            if (target.getAttribute('username')) {
              HelperWASD.addUsernameToTextarea(target.getAttribute('username').split('@').join(''));
            }
          });
        } else if (settings.wasd.onClickUserName.toString() === '2') {
          elClone = nicknamediv.cloneNode(true);
          nicknamediv.parentNode.replaceChild(elClone, nicknamediv);
          nicknamediv = node.querySelector('.info__text__status__name');
          nicknamediv.addEventListener('click', ({
            target
          }) => {
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
          messageInfoStatus.insertAdjacentHTML("afterbegin", `<div class="info__text__status-paid-ovg button banned"><i class="icon-ovg wasd-icons-ban"></i></div>`);
          messageInfoStatus.insertAdjacentHTML("afterbegin", `<div class="info__text__status-paid-ovg button timeout"><i class="icon-ovg wasd-icons-sound-off"></i></div>`);
          messageInfoStatus.insertAdjacentHTML("afterbegin", `<div class="info__text__status-paid-ovg button remove"><i class="icon-ovg wasd-icons-delete"></i></div>`);

          messageInfo = node.querySelector('div.message__info');
          if (messageInfo) {
            messageInfo.insertAdjacentHTML("beforeend", `<div class="lds-ring" style="display: none;"><svg x="0px" y="0px" viewBox="0 0 150 150" class="icon-pending-ovg"><circle cx="75" cy="75" r="60" class="icon-pending-inner-ovg"></circle></svg></div>`);
            loading = node.querySelector('.lds-ring');
          }

          messageInfoStatus.querySelector('.info__text__status-paid-ovg.button.banned').addEventListener('click', ({
            target
          }) => {
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
                        document.querySelector('.block__popup__body > .block__popup__body__inner > .block__popup__body__inner__buttons > .inner__buttons__item > .ghost-btn > button.basic').addEventListener('click', ({
                          target
                        }) => {
                          loading.style.display = 'none'
                        })
                      }
                      break;
                    }
                  }
                  if (i == 9) {
                    document.querySelector('.message__info').click();
                    HelperWASD.showChatMessage('Вы не можете этого сделать');
                  }
                }
              }

              function fetch_banned_message() {
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
              HelperWASD.showChatMessage('Вы не можете этого сделать');
            }
          });

          messageInfoStatus.querySelector('.info__text__status-paid-ovg.button.timeout').addEventListener('click', ({
            target
          }) => {
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
                        document.querySelector('.block__popup__body > .block__popup__body__inner > .block__popup__body__inner__buttons > .inner__buttons__item > .ghost-btn > button.basic').addEventListener('click', ({
                          target
                        }) => {
                          loading.style.display = 'none'
                        })
                      }
                      break;
                    }
                  }
                  if (i == 9) {
                    document.querySelector('.message__info').click();
                    HelperWASD.showChatMessage('Вы не можете этого сделать');
                  }
                }
              }

              function fetch_timeout_message() {
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
              HelperWASD.showChatMessage('Вы не можете этого сделать');
            }
          });

          messageInfoStatus.querySelector('.info__text__status-paid-ovg.button.remove').addEventListener('click', ({
            target
          }) => {
            if (node.querySelector('.message__info__icon > i')) {
              node.querySelector('.message__info__icon > i').click();

              const remove_message = () => {
                if (contextMenu) contextMenuBlocks = contextMenu.querySelectorAll('div.context-menu__block');
                let edited = false;
                for (i = 0; i < 10; i++) {
                  if (contextMenuBlocks[i]) {
                    if (contextMenuBlocks[i].querySelector('div.context-menu__block__text').textContent == " Удалить сообщения ") {
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
                        document.querySelector('.block__popup__body > .block__popup__body__inner > .block__popup__body__inner__buttons > .inner__buttons__item > .ghost-btn > button.basic').addEventListener('click', ({
                          target
                        }) => {
                          loading.style.display = 'none'
                        })
                      }
                      break;
                    }
                  }
                  if (i == 9) {
                    document.querySelector('.message__info').click();
                    HelperWASD.showChatMessage('Вы не можете этого сделать');
                  }
                }
              }

              function fetch_remove_message() {
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
              HelperWASD.showChatMessage('Вы не можете этого сделать');
            }
          });
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

      function linkRecognizerGo() {
        if (a) {

          if (new URL(a.href).host == "wasd.tv" && new URL(a.href).searchParams.get('record') != null) {
            if (settings.wasd.linkRecognizerWASD) {
              if (node) {
                node.insertAdjacentHTML("beforeend", `<div style=" font-size: 11px; margin: 5px;" class="ovg-bg-color-prime tw-border-radius-medium tw-elevation-1 ffz--chat-card tw-relative" style=""><div class="tw-border-radius-medium tw-c-background-base tw-flex tw-full-width"><a data-tooltip-type="link" style="text-decoration: none" data-url="${a.href}" target="_blank" rel="noreferrer noopener" href="${a.href}" class="ffz-interactable--hover-enabled tw-block tw-border-radius-medium tw-full-width ffz-interactable--default tw-interactive"><div class="tw-flex tw-flex-nowrap tw-pd-05"><div class="ffz--header-image" style="height:4.8rem;"></div><div class="ffz--card-text tw-full-width tw-overflow-hidden tw-flex tw-flex-column tw-justify-content-center"><div title="Загрузка..." class="tw-c-text-alt-2 tw-ellipsis tw-mg-x-05">Загрузка...</div></div></div></a></div></div>`);
                HelperWASD.scrollChatMessage(node, 50)
              }
              let href = a.href;

              $.ajax({
                url: `https://wasd.tv/api/v2/media-containers/${new URL(a.href).searchParams.get('record')}`,
                success: function(out) {
                  var game = 'неизвестно'
                  if (out.result.game != null) game = out.result.game.game_name;
                  node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${out.result.media_container_streams[0].stream_media[0].media_meta.media_preview_images.small}" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${out.result.media_container_name}" class="tw-ellipsis tw-semibold tw-mg-x-05">${out.result.media_container_name}</div><div title="${out.result.media_container_channel.channel_name} играет в ${game}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05"><a target="_blank" href="https://wasd.tv/user/${out.result.user_id}">${out.result.media_container_channel.channel_name}</a> играет в ${game}</div><div title="${out.result.created_at} - ${out.result.media_container_streams[0].stream_total_viewers} просмотров" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${new Date(out.result.created_at).toLocaleDateString()} - ${out.result.media_container_streams[0].stream_total_viewers} просмотров</div></div></div></div>`;
                },
                error: function(out) {
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
                success: function(out) {
                  if (!out?.error?.code) {
                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${out.result.clip_data.preview.small}" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${out.result.clip_title}" class="tw-ellipsis tw-semibold tw-mg-x-05">${out.result.clip_title}</div><div title="${out.result.clip_channel.channel_name} играет в ${out.result.clip_game_name}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05"><a target="_blank" href="https://wasd.tv/user/${out.result.clip_channel.user_id}">${out.result.clip_channel.channel_name}</a> играет в ${out.result.clip_game_name}</div><div title="Автор клипа: ${out.result.clip_owner_login} - ${out.result.clip_views_count} просмотров" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">Автор клипа: <a target="_blank" href="https://wasd.tv/user/${out.result.clip_owner_profile_id}">${out.result.clip_owner_login}</a> - ${out.result.clip_views_count} просмотров</div></div></div></div>`;
                  } else {
                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="${out.error.code}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.error.code}</div></div></div></div>`;
                  }
                },
                error: function(out) {
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
                success: function(out) {
                  if (!out?.error?.code) {
                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${out.result.game_icon.small}" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${out.result.game_asset_name}" class="tw-ellipsis tw-semibold tw-mg-x-05">${out.result.game_asset_name}</div><div title="${out.result.game_description}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.result.game_description != null ? out.result.game_description : 'Нет описания'}</div></div></div></div>`;
                  } else {
                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="${out.error.code}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.error.code}</div></div></div></div>`;
                  }
                },
                error: function(out) {
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
                success: function(out) {
                  if (typeof out.error !== 'undefined') {
                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;
                  } else {
                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${out.result.channel.channel_image.small}" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${out.result.channel.channel_name}" class="tw-ellipsis tw-semibold tw-mg-x-05">${out.result.channel.channel_name}</div><div title="${out.result.channel.channel_description}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.result.channel.channel_description}</div></div></div></div>`;
                  }
                },
                error: function(out) {
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
                success: function(out) {
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
                error: function(out) {
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
                success: function(out) {
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
                error: function(out) {
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
                success: function(out) {
                  if (out?.error?.phrase) {
                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="${out?.error?.phrase}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out?.error?.phrase}</div></div></div></div>`;
                  } else if (new URL(href).host == "youtu.be" || new URL(href).host == "m.youtube.com" || new URL(href).host == "youtube.be" || (new URL(href).host == "www.youtube.com" && new URL(href).pathname == "/watch")) {
                    let imgdiv = ''
                    if (typeof out?.short?.image?.url != 'undefined') {
                      img = `<div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${out.short.image.url}" class=""></div>`
                    } else {
                      img = ''
                    }
                    var dater = new Date(Number(out?.full?.[0]?.content?.items?.[0]?.["bottom-right"]?.value) * 1000)
                    var textdate = `${(dater.getUTCHours() < 10) ? '0' + dater.getUTCHours() : ((dater.getUTCDate()*24) + dater.getUTCHours())}:${(dater.getUTCMinutes() < 10) ? '0' + dater.getUTCMinutes() : dater.getUTCMinutes()}:${(dater.getUTCSeconds() < 10) ? '0' + dater.getUTCSeconds() : dater.getUTCSeconds()}`
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
                                ${out?.short?.subtitle?.content?.channel ? `<div class="tw-ellipsis tw-c-text-alt-2" title="${out.short.subtitle.content.channel} • ${out.short.subtitle.content.views.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} • 👍 ${out.short.subtitle.content.likes.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}  • 👎 ${out.short.subtitle.content.dislikes.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}">${out.short.subtitle.content.channel} • ${out.short.subtitle.content.views.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} • 👍 ${out.short.subtitle.content.likes.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}  • 👎 ${out.short.subtitle.content.dislikes.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}</div>` : ``}
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
                    node.querySelector('.ffz--header-image').innerHTML = `<div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05 ffz--header-aspect" style="width:8.8rem">${img}</div>`

                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${out?.short?.title}" class="tw-ellipsis tw-semibold tw-mg-x-05">${out?.short?.title}</div><div title="${out?.short?.subtitle?.content?.channel} • ${out?.short?.subtitle?.content?.views.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} • 👍 ${out?.short?.subtitle?.content?.likes.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}  • 👎 ${out?.short?.subtitle?.content?.dislikes.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out?.short?.subtitle?.content?.channel} • ${out?.short?.subtitle?.content?.views.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} • 👍 ${out?.short?.subtitle?.content?.likes.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}  • 👎 ${out?.short?.subtitle?.content?.dislikes.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}</div><div title="${out?.short?.extra?.[1]} ${new Date(out?.short?.extra?.[2]?.attrs?.datetime).toLocaleDateString()}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05"><span class="ffz-i-youtube-play"></span>${out?.short?.extra?.[1]}<time datetime="${out?.short?.extra?.[2]?.attrs?.datetime}" class="">${new Date(out?.short?.extra?.[2]?.attrs?.datetime).toLocaleDateString()}</time></div></div></div></div>`;
                  } else if (out?.short?.title) {
                    if (typeof out.error == 'undefined') {
                      if (!out?.short?.subtitle) {
                        if (typeof out?.short?.image?.url != 'undefined') {
                          img = `<div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${out.short.image.url}" class=""></div>`
                        } else {
                          img = ''
                        }
                        var dater = new Date(Number(out?.full?.[0]?.content?.items?.[0]?.["bottom-right"]?.value) * 1000)
                        var textdate = `${(dater.getUTCHours() < 10) ? '0' + dater.getUTCHours() : ((dater.getUTCDate()*24) + dater.getUTCHours())}:${(dater.getUTCMinutes() < 10) ? '0' + dater.getUTCMinutes() : dater.getUTCMinutes()}:${(dater.getUTCSeconds() < 10) ? '0' + dater.getUTCSeconds() : dater.getUTCSeconds()}`

                        let title = out?.short?.title
                        if (typeof title == 'object' && typeof title?.phrase == 'string') title = title?.phrase

                        node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05">${img}<div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${title}" class="tw-ellipsis tw-semibold tw-mg-x-05">${title}</div></div></div></div>`;
                      } else {
                        if (typeof out?.short?.image?.url != 'undefined') {
                          img = `<div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${out.short.image.url}" class=""></div>`
                        } else {
                          img = ''
                        }
                        var dater = new Date(Number(out?.full?.[0]?.content?.items?.[0]?.["bottom-right"]?.value) * 1000)
                        var textdate = `${(dater.getUTCHours() < 10) ? '0' + dater.getUTCHours() : ((dater.getUTCDate()*24) + dater.getUTCHours())}:${(dater.getUTCMinutes() < 10) ? '0' + dater.getUTCMinutes() : dater.getUTCMinutes()}:${(dater.getUTCSeconds() < 10) ? '0' + dater.getUTCSeconds() : dater.getUTCSeconds()}`

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
                    var dater = new Date(Number(out?.full?.[0]?.content?.items?.[0]?.["bottom-right"]?.value) * 1000)
                    var textdate = `${(dater.getUTCHours() < 10) ? '0' + dater.getUTCHours() : ((dater.getUTCDate()*24) + dater.getUTCHours())}:${(dater.getUTCMinutes() < 10) ? '0' + dater.getUTCMinutes() : dater.getUTCMinutes()}:${(dater.getUTCSeconds() < 10) ? '0' + dater.getUTCSeconds() : dater.getUTCSeconds()}`

                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header">${img}<div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${out?.base}" class="tw-ellipsis tw-semibold tw-mg-x-05">${out?.base}</div></div></div></div>`;
                  }
                },
                error: function(out) {
                  node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;
                }
              });

            }
          }
        }
      }

      node.querySelector('div.message__info__icon > i')?.addEventListener('click', () => {
        let trycreate = 0
        create_context_block()

        function create_context_block() {
          context_menu = node.querySelector('.context-menu')
          if (context_menu) {
            if (!context_menu.querySelector('.contextBlacklistAddUser')) {
              let item = document.createElement('div')
              item.classList.add(`context-menu__block`)
              item.innerHTML = `<div class="context-menu__block__icon contextBlacklistAddUser"><i class="icon wasd-icons-cross"></i></div><div class="context-menu__block__text"> Добавить в ЧС </div>`;
              context_menu.append(item)
              item.addEventListener('click', ({
                target
              }) => {
                let username = node.querySelector('.info__text__status__name').getAttribute('username');
                if (!settings.list.blockUserList[username]) {
                  HelperWASD.showChatMessage(`Пользователь ${username} добавлен в ЧС`, 'success')
                  settings.list.blockUserList[username] = new Date();
                  HelperWASD.addUserToBlackList(username)
                  HelperSettings.save([document.querySelector('.optionField')]);
                } else {
                  HelperWASD.showChatMessage('Пользователь уже в ЧС, обновите чат!')
                }
                node.click()
              })
            }
            if (!context_menu.querySelector('.contextPinMessages') && !settings.wasd.pinMessage) { // -!2
              let item = document.createElement('div')
              item.classList.add(`context-menu__block`)
              item.innerHTML = `<div class="context-menu__block__icon contextPinMessages"><i class="icon wasd-icons-cross"></i></div><div class="context-menu__block__text"> Закрепить сообщение </div>`;
              context_menu.append(item)
              item.addEventListener('click', ({
                target
              }) => {
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
      })

      var mentoinText;
      if (settings.wasd.clickMentionAll && node.querySelector('wasd-chat-follower-message')) {
        mentoinText = node.querySelector('.message-follower__name')
      }
      if (settings.wasd.clickMentionAll && node.querySelector('wasd-chat-subscribe-message')) {
        mentoinText = node.querySelector('.block__item__title')
      }
      if (mentoinText) {
        let mentoinusername = settings.wasd.userNameEdited[mentoinText.textContent.trim().split('@').join('')];
        if (!mentoinusername) {
          mentoinusername = mentoinText.textContent.trim().split('@').join('')
        }

        if (settings.wasd.onClickMention.toString() === '0') {

          mentoinText.innerHTML = `<span style='color: ${HelperWASD.usercolor(mentoinText.textContent.trim())};' class='chat-message-mention' username="@${mentoinText.textContent.trim()}">${mentoinusername}</span>`
          node.querySelectorAll('.chat-message-mention').forEach(element => {
            HelperWASD.usercolorapi(element);
            element.addEventListener('click', ({
              target
            }) => {
              if (target.getAttribute('username')) {
                HelperWASD.addUsernameToTextarea(target.getAttribute('username').split('@').join(''));
              }
            });
          });
        } else if (settings.wasd.onClickMention.toString() === '1') {
          mentoinText.innerHTML = `<span style='color: ${HelperWASD.usercolor(mentoinText.textContent.trim())};' class='chat-message-mention click' username="@${mentoinText.textContent.trim()}">${mentoinusername}</span>`
          node.querySelectorAll('.chat-message-mention.click').forEach(element => {
            HelperWASD.usercolorapi(element);
            element.addEventListener('click', ({
              target
            }) => {
              if (textarea) {
                textarea.value += target.getAttribute('username').trim() + ' ';
                textarea.dispatchEvent(new Event('input'));
                textarea.focus()
              }
            })
          });
        } else if (settings.wasd.onClickMention.toString() === '2') {
          mentoinText.innerHTML = `<span style='color: ${HelperWASD.usercolor(mentoinText.textContent.trim())};' class='chat-message-mention click' username="@${mentoinText.textContent.trim()}">${mentoinusername}</span>`
          node.querySelectorAll('.chat-message-mention.click').forEach(element => {
            HelperWASD.usercolorapi(element);
            element.addEventListener('click', ({
              target
            }) => {
              if (target.getAttribute('username')) {
                if (!HelperWASD.addUsernameToTextarea(target.getAttribute('username').split('@').join(''))) {
                  HelperWASD.createUserViewerCard(target.getAttribute('username').split('@').join(''));
                }
              }
            })
          });
        }
      }

      if (document.visibilityState != "visible" && isobserver && settings.wasd.notifyOnMention && node.querySelector('.has-mention')) {
        Helper.notify(`Вас упоминул ${node.getAttribute('username')}`, node.getAttribute('message'), node.getAttribute('username'))
      }

      let badge = HelperWASD.badges[node.getAttribute('username')]
      if (badge && badge.user_role == 'DEV') {
        node.querySelector('.info__text__status').insertAdjacentHTML("afterbegin", `<div ovg="" class="info__text__status-dev" style="background-color: ${HelperWASD.userColors[badge.user_id % (HelperWASD.userColors.length - 1)]};"><i badge="" class="icon wasd-icons-dev"></i></div>`) 
      }

    }
  },
};