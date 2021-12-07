let storageType = 'sync';
var isPressedAlt, isPressedShift, isPressedControl, isPressedFullScreen, isPressedTheater, isPressedPIP, isPressedClip;

window.addEventListener('keyup', (e) => {
  isPressedAlt = false;
  isPressedShift = false;
  isPressedControl = false;
  isPressedFullScreen = false;
  isPressedTheater = false;
  isPressedPIP = false;
  isPressedClip = false;
});

window.addEventListener('keydown', (e) => {
  if (e.key == "Alt") isPressedAlt = true;
  if (e.key == "Shift") isPressedShift = true;
  if (e.key == "Control") isPressedControl = true;
  if (e.key == "f" || e.key == "а") {
    if (settings.wasd.pressedFullScreen && !isPressedFullScreen && !isPressedControl) {
      if (!(document.activeElement.nodeName == 'TEXTAREA' || document.activeElement.nodeName == 'INPUT')) {
        if (document.querySelector('button.player-button.fullscreen-button')) document.querySelector('button.player-button.fullscreen-button').click();
        isPressedFullScreen = true;
      }
    }
  }
  if (e.key == "t" || e.key == "е") {
    if (settings.wasd.pressedTheater    && !isPressedTheater    && !isPressedControl) {
      if (!(document.activeElement.nodeName == 'TEXTAREA' || document.activeElement.nodeName == 'INPUT')) {
        if (document.querySelector('button.player-button.theater-button')) document.querySelector('button.player-button.theater-button').click();
        isPressedTheater = true;
      }
    }
  }
  if (e.key == "i" || e.key == "ш") {
    if (settings.wasd.pressedPIP        && !isPressedPIP        && !isPressedControl) {
      if (!(document.activeElement.nodeName == 'TEXTAREA' || document.activeElement.nodeName == 'INPUT')) {
        if (document.querySelector('button.player-button.pip')) document.querySelector('button.player-button.pip').click();
        isPressedPIP = true;
      }
    }
  }
  if (e.key == "x" || e.key == "ч") {
    if (settings.wasd.pressedClip       && !isPressedClip       && !isPressedControl) {
      if (!(document.activeElement.nodeName == 'TEXTAREA' || document.activeElement.nodeName == 'INPUT')) {
        if (settings.wasd.iframeCreateClip) {
          if (document.querySelector('button.player-button.clip-ovg')) document.querySelector('button.player-button.clip-ovg').click()
        } else {
          if (document.querySelector('button.player-button.clip-button')) document.querySelector('button.player-button.clip-button').click();
        }
        isPressedClip = true;
      }
    }
  }
});

window.addEventListener('mousemove', (e) => {
  x = e.clientX;
  y = e.clientY - 45;
});



let messageTimeout;

let settings = Helper.getDefaultSettings();

// initialization
let initialize = async () => {
  // do non settings page stuff
  try {
    settings = await Helper.getSettings();
    if (typeof settings === 'undefined') {
      settings = Helper.getDefaultSettings();
    }
  } catch (e) {
    ovg.log('catch', e);
  }
  // init wasd
  BetterStreamChat.init();
};

initialize();

//-
addPipToPlayer = () => {
  if (settings.wasd.pictureInPicture) {
    if (!document.querySelector("button.pip")) {
      const divbuttons = document.querySelector("div.buttons-container > div.buttons-right");
      const buttonpip = `<div class="buttons-wraper pip"><button class="player-button pip" type="button"><div class="tooltip tooltip-up tooltip-align-center">Картинка в картинке</div><svg class="tw-icon__svg" width="100%" height="100%" transform="scale(1.3)" viewBox="0 0 128 128"><path fill="#FFF" d="M22 30c-1.9 1.9-2 3.3-2 34s.1 32.1 2 34c1.9 1.9 3.3 2 42 2s40.1-.1 42-2c1.9-1.9 2-3.3 2-34 0-31.6 0-31.9-2.2-34-2.1-1.9-3.3-2-42-2-38.5 0-39.9.1-41.8 2zm78 34v28H28V36h72v28z"></path><path fill="#FFF" d="M60 72v12h32V60H60v12z"></path></svg></button></div>`;
      if (divbuttons && divbuttons.childNodes.length >= 9) {
        divbuttons.childNodes.item(5).insertAdjacentHTML("afterend", buttonpip);
        const button = document.querySelector("button.pip");
        const videopanel = document.querySelector('video');
        if (videopanel) {
          if (!document.pictureInPictureEnabled) {
            document.querySelector('.player-button.pip > div.tooltip').textContent = "Режим PiP не поддерживается"
            button.disabled = true;
          }
          button.addEventListener('click', () => {
            if (document.pictureInPictureElement) {
              document.exitPictureInPicture()
            } else {
              videopanel.requestPictureInPicture()
            }
          });
        }
      }
    }
  } else {
    const buttondiv = document.querySelector("div.pip");
    buttondiv?.remove();
  }
}

createClipByOvg = () => {
  if (settings.wasd.iframeCreateClip) {
    if (document.querySelector(".clip-button") && !document.querySelector("button.clip-ovg")) {
      document.querySelector('.player-button.clip-button').parentElement.style.display = "none"
      const divbuttons = document.querySelector("div.buttons-container > div.buttons-right");
      const buttonpip = `<div class="buttons-wraper clip-ovg"> <button class="player-button clip-ovg" type="button"> <div class="tooltip tooltip-up tooltip-align-center">Клип</div> <svg width="16" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M6 3.437v4.889c.004.31.407.535.674.375l4-2.445c.257-.158.257-.598 0-.757l-4-2.444A.46.46 0 006 3.437zM14 0a2 2 0 012 2v8a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2h12zm0 1H2a1 1 0 00-.993.883L1 2v8a1 1 0 00.883.993L2 11h12a1 1 0 00.993-.883L15 10V2a1 1 0 00-.883-.993L14 1z" fill="#FFF" fill-rule="nonzero"></path></svg></button> </div>`;
      if (divbuttons && divbuttons.children[2]) {
        divbuttons.children[2].insertAdjacentHTML("afterend", buttonpip);
        const button = document.querySelector("button.clip-ovg");

        $.ajax({
          url: HelperWASD.getStreamBroadcastsUrl(),
          success: (out) => {
            if (out.error) {
              new Error(out.error.code)
            } else if (out.result.media_container) {
              button.addEventListener('click', () => {
                if (document.querySelector('iframe#createClip')) {
                  document.querySelector('iframe#createClip').remove()
                } else {
                  document.querySelector('wasd-player-component > div[data-player]').insertAdjacentHTML("beforeend", `<iframe id="createClip" src="https://wasd.tv/clip/${out.result.media_container.media_container_id}" width="500" height="640" align="left" style="bottom: 15px; right: 5px; position: absolute; z-index: 998;">Ваш браузер не поддерживает плавающие фреймы!</iframe>`);
                  var iframe = document.querySelector('iframe#createClip')
                  iframe.onload = () => {
                    var style = document.createElement('style')
                    style.textContent = 'body {background-color: rgba(0,0,0,0)!important;} #topDiv, wasd-mobile-app, wasd-dynamic-popup, wasd-footer {display: none!important;} #scroll-content {background-color: rgba(0,0,0,0)!important; overflow: hidden;margin: 0!important;height: 100%!important;} .create-clip{padding: 0!important;} div.close-cip {display: flex;width: 100%;max-width: 640px;}div.close-cip .create-clip__title {font-size: 24px;color: var(--wasd-color-switch);width: 100%;max-width: 640px;}div.close-cip .close-clip-btn {background-color: red;width: 28px;height: 28px;text-align: center;}div.close-cip .close-clip-btn span.close-text {font-size: 20px;}} div.tw-absolute.tw-mg-r-05.tw-mg-t-05.tw-right-0.tw-top-0 {margin-right: .5rem!important;margin-top: .5rem!important;right: 0!important;top: 0!important;position: absolute!important;}div.tw-inline-flex.viewer-card-drag-cancel {display: inline-flex!important;cursor: auto;}button.tw-button-icon.tw-button-icon--overlay.tw-core-button {border: 1px solid transparent;background-color: transparent;color: #fff;border-radius: .4rem;height: 3rem;justify-content: center;user-select: none;display: inline-flex;align-items: center;position: relative;-webkit-box-align: center;-webkit-box-pack: center;vertical-align: middle;overflow: hidden;text-decoration: none;white-space: nowrap;text-align: inherit;background: 0 0;  }button.tw-button-icon.tw-button-icon--overlay.tw-core-button:hover {cursor: pointer;background-color: rgb(178 177 177 / 18%);}button.tw-button-icon.tw-button-icon--overlay.tw-core-button:active {background-color: rgba(255, 255, 255, .5);}'
                    iframe.contentDocument.head.appendChild(style)

                    createbtncloseclip = () => {
                      let text_clip = iframe.contentDocument.querySelector('.create-clip__title')
                      if (text_clip) {
                        text_clip.outerHTML = '<div class="close-cip"><span class="create-clip__title">Создание клипа</span><div data-a-target="viewer-card-close-button" class="tw-absolute tw-mg-r-05 tw-mg-t-05 tw-right-0 tw-top-0"><div class="tw-inline-flex viewer-card-drag-cancel"><button class="tw-button-icon tw-button-icon--overlay tw-core-button" aria-label="Скрыть" data-test-selector="close-viewer-card"><i _ngcontent-ykf-c54="" style="font-size:13px;align-items:center;display:flex;justify-content:center" class="icon wasd-icons-close"></i></button></div></div></div>'
                        iframe.contentDocument.querySelector('button.tw-button-icon.tw-button-icon--overlay.tw-core-button').addEventListener("click", () => {
                          document.querySelector('iframe#createClip').remove()
                        })
                      } else {
                        setTimeout(() => {
                          createbtncloseclip()
                        }, 10)
                      }
                    }
                    createbtncloseclip()

                  }
                }
              });
            }
          }
        });
      }
    }
  } else {
    if (document.querySelector('.player-button.clip-button')) {
      document.querySelector('.player-button.clip-button').parentElement.style.display = ""
    }

    if (document.querySelector("button.clip-ovg")) {
      document.querySelector('.buttons-right .buttons-wraper.clip-ovg').remove();
    }

    document.querySelector('iframe#createClip')?.remove()
  }
}

//-
updateVideoPlayerButtons = () => {
  exitfullscreenButton = document.querySelector('.fullscreen>.live>.custom-media-control>.player-controls>.buttons-container>.buttons-right>div>.fullscreen-button > div.tooltip');
  if (exitfullscreenButton) {
    if (settings.wasd.pressedFullScreen) {
      exitfullscreenButton.textContent = "В нормальный режим (f)"
    } else {
      exitfullscreenButton.textContent = "В нормальный режим"
    }
  } else {
    gofullscreenButton = document.querySelector('.live>.custom-media-control>.player-controls>.buttons-container>.buttons-right>div>.fullscreen-button > div.tooltip');
    if (gofullscreenButton) {
      if (settings.wasd.pressedFullScreen) {
        gofullscreenButton.textContent = "На весь экран (f)"
      } else {
        gofullscreenButton.textContent = "На весь экран"
      }
    }
  }

  isTheaterMode = document.querySelector('div.player-wrapper.theatre-mode');
  if (isTheaterMode) {
    theaterButton = document.querySelector('.player-button.theater-button > div.tooltip');
    if (theaterButton) {
      if (settings.wasd.pressedTheater) {
        theaterButton.textContent = "Выйти из театрального режима (t)"
      } else {
        theaterButton.textContent = "Выйти из театрального режима"
      }
    }
  } else {
    theaterButton = document.querySelector('.player-button.theater-button > div.tooltip');
    if (theaterButton) {
      if (settings.wasd.pressedTheater) {
        theaterButton.textContent = "Театральный режим (t)"
      } else {
        theaterButton.textContent = "Театральный режим"
      }
    }
  }

  pipButton = document.querySelector('.player-button.pip > div.tooltip');
  if (document.pictureInPictureEnabled) {
    if (pipButton) {
      if (settings.wasd.pressedPIP) {
        pipButton.textContent = "Картинка в картинке (i)"
      } else {
        pipButton.textContent = "Картинка в картинке"
      }
    }
  } else {
    if (pipButton) {
      pipButton.textContent = "Режим PiP не поддерживается"
    }
  }


  var clipButton;
  if (settings.wasd.iframeCreateClip) {
    clipButton = document.querySelector('.player-button.clip-ovg > div.tooltip')
  } else {
    clipButton = document.querySelector('.player-button.clip-button > div.tooltip');
  }

  if (clipButton) {
    if (settings.wasd.pressedClip) {
      clipButton.textContent = "Клип (x)"
    } else {
      clipButton.textContent = "Клип"
    }
  }
}

setInterval(() => {
  addPipToPlayer();
  createClipByOvg();
  updateVideoPlayerButtons();
}, 1000);

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.from == "background" && msg.username) {
    window.focus()
    let textarea = document.querySelector('.footer > div >textarea');
    if (textarea) {
      textarea.value += "@" + msg.username + ' ';
      textarea.dispatchEvent(new Event('input'));
      textarea.focus()
    }
  }
  if (msg.from == "background" && msg.update_save) {
    let newSettings = JSON.parse(JSON.stringify(settings));

    let option = BetterStreamChat.settingsDiv.querySelector(`[data-name="${msg?.update_save?.split[0]}_${msg?.update_save?.split[1]}"]`)
    let split = msg.update_save.split
    let value = msg.update_save.value

    if (option.type === 'checkbox') {
      option.checked = value
      HelperSettings.save([option])
    } else if (option.dataset.type === 'number' || option.type === 'number') {
      option.value = value
      HelperSettings.save([option])
    } else {
      option.value = value
      HelperSettings.save([option])
    }
  }
  if (msg.from == "background" && msg.update_chat == true) {
    let header_block_menu = document.querySelector('.header > div.header__block__menu')
    if (header_block_menu) {
      if (header_block_menu.childNodes.length >= 1) {
        if (header_block_menu.childNodes[1].nodeName != "#comment") {
          header_block_menu.childNodes[1].click();
        }
        if (header_block_menu.childNodes[0].nodeName != "#comment") {
          header_block_menu.childNodes[0].click();
        }
      }
    }
  }
  if (msg.from == "background" && msg.location == 'reload') {
    location.reload()
  }
});



/* to new settings */

let toNewSettings = async () => {
  try {
    settings = await Helper.getSettings();
    if (typeof settings === 'undefined') {
      settings = Helper.getDefaultSettings();
    } else if (settings.general.autoUpdateChat[1] != undefined) {
      chrome.storage[storageType].set(getUpdateSettings(), () => {
        location.reload()
      })
    }
  } catch (e) {
    ovg.log('catch toNewSettings', e);
  }
};

toNewSettings()

const getUpdateSettings = () => {
  return {
    general: {
      autoUpdateChat: settings.general.autoUpdateChat[1],
    },
    wasd: {
      messageFollower: settings.wasd.messageFollower[1],
      messageSub: settings.wasd.messageSub[1],
      messageSystem: settings.wasd.messageSystem[1],
      messageHover: settings.wasd.messageHover[1],
      wasdIconsSmile: settings.wasd.wasdIconsSmile[1],
      wasdIconsCircleRu: settings.wasd.wasdIconsCircleRu[1],
      webkitScrollbarWidth: settings.wasd.webkitScrollbarWidth[1],
      giftsWrapperSide: settings.wasd.giftsWrapperSide[1],
      giftsWrapperTopRight: settings.wasd.giftsWrapperTopRight[1],
      sticker: settings.wasd.sticker[1],
      stickerovg: settings.wasd.stickerovg[1],
      paddingChatMessage: settings.wasd.paddingChatMessage[1],
      colonAfterNickname: settings.wasd.colonAfterNickname[1],
      linkColor: settings.wasd.linkColor[1],
      colorAtTheMention: settings.wasd.colorAtTheMention[1],
      chatOnTheLeft: settings.wasd.chatOnTheLeft[1],
      chatWidth: settings.wasd.chatWidth[1],
      hideDonationChannelButton: settings.wasd.hideDonationChannelButton[1],
      hideAmazingChannelButtoan: settings.wasd.hideAmazingChannelButtoan[1],
      hideGiftButtons: settings.wasd.hideGiftButtons[1],
      highlightMessagesBold: settings.wasd.highlightMessagesBold[1],
      streamerMessage: settings.wasd.streamerMessage[1],
      fontSize: settings.wasd.fontSize[1],
      topPanel: settings.wasd.topPanel[1],
      topPanelChallenge: settings.wasd.topPanelChallenge[1],
      pictureInPicture: settings.wasd.pictureInPicture[1],
      resetToPlayer: settings.wasd.resetToPlayer[1],
      moderatorMenu: settings.wasd.moderatorMenu[1],
      moderatorMenuAutomatic: settings.wasd.moderatorMenuAutomatic[1],
      autoPlayStreamersOnMain: settings.wasd.autoPlayStreamersOnMain[1],
      pressedFullScreen: settings.wasd.pressedFullScreen[1],
      pressedTheater: settings.wasd.pressedTheater[1],
      pressedPIP: settings.wasd.pressedPIP[1],
      pressedClip: settings.wasd.pressedClip[1],
      alternatingColorChatMessages: settings.wasd.alternatingColorChatMessages[1],
      alternatingColorChatMessagesColor: settings.wasd.alternatingColorChatMessagesColor[1],
      onClickMention: settings.wasd.onClickMention[1],
      onClickUserName: settings.wasd.onClickUserName[1],
      fixedLinks: settings.wasd.fixedLinks[1],
      uptimeStream: settings.wasd.uptimeStream[1],
      bttvEmotes: settings.wasd.bttvEmotes[1],
      bttvInChatMenu: settings.wasd.bttvInChatMenu[1],
      bttvEmoteSize: settings.wasd.bttvEmoteSize[1],
      linkRecognizerall: settings.wasd.linkRecognizerall[1],
      linkRecognizerWASD: settings.wasd.linkRecognizerWASD[1],
      decorationLink: settings.wasd.decorationLink[1],
      videoOverlay: settings.wasd.videoOverlay[1],
      userNameEdited: settings.wasd.userNameEdited,
      onClickUser: settings.wasd.onClickUser[1],
      removeMentionBL: settings.wasd.removeMentionBL[1],
      hidePanelMobile: settings.wasd.hidePanelMobile[1],
      formatMessageSentTime: settings.wasd.formatMessageSentTime[1],
      mentionSelf: settings.wasd.mentionSelf[1],
      colorMentionSelf: settings.wasd.colorMentionSelf[1],
      highlightMessagesOpenCard: settings.wasd.highlightMessagesOpenCard[1],
      highlightMessagesOpenCardColor: settings.wasd.highlightMessagesOpenCardColor[1],
      alwaysOpenVolumeControl: settings.wasd.alwaysOpenVolumeControl[1],
      colorMessageHover: settings.wasd.colorMessageHover[1],
      bttvSize: settings.wasd.bttvSize[1],
      mutePlayerOnMiddleMouse: settings.wasd.mutePlayerOnMiddleMouse[1],
      hideBannerOnHome: settings.wasd.hideBannerOnHome[1],
      hideSelectorStreamSettings: settings.wasd.hideSelectorStreamSettings[1],
      clickMentionAll: settings.wasd.clickMentionAll[1],
      underlineUsernameAndMention: settings.wasd.underlineUsernameAndMention[1],
      iframeCreateClip: settings.wasd.iframeCreateClip[1],
      linkRecognitionRights: settings.wasd.linkRecognitionRights[1],
      artificialChatDelay: settings.wasd.artificialChatDelay[1],
      forceResizeStickers: settings.wasd.forceResizeStickers[1],
      ffzEmotes: settings.wasd.ffzEmotes[1],
      ffzInChatMenu: settings.wasd.ffzInChatMenu[1],
      decreaseIndentationStickerMenu: settings.wasd.decreaseIndentationStickerMenu[1],
      decreaseIndentationSmilesMenu: settings.wasd.decreaseIndentationSmilesMenu[1],
      decreaseIndentationBTTVandFFZMenu: settings.wasd.decreaseIndentationBTTVandFFZMenu[1],
      highlightStickersStickerMenu: settings.wasd.highlightStickersStickerMenu[1],
      hideGreatRandom: settings.wasd.hideGreatRandom[1],
      moderatorMenuTimeout: settings.wasd.moderatorMenuTimeout[1],
      keepMessagesTimeout: settings.wasd.keepMessagesTimeout[1],
      chatMobilePlayer: settings.wasd.chatMobilePlayer[1],
      colorModOptions: settings.wasd.colorModOptions[1],
      tv7Emotes: settings.wasd.tv7Emotes[1],
      tv7InChatMenu: settings.wasd.tv7InChatMenu[1],
      uptimeStreamMobile: settings.wasd.uptimeStreamMobile[1],
      highlightingWhenMentionList: settings.wasd.highlightingWhenMentionList,
      hideWhenMentionList: settings.wasd.hideWhenMentionList,
      hideRaid: settings.wasd.hideRaid[1],
      fixCharactersBreakingChat: settings.wasd.fixCharactersBreakingChat[1],
      notifyOnMention: false,
      staticGifEmotes: "1",
      pinMessage: true,
      hoverTooltipEmote: true,
      limitHistoryUsers: "0",
      showOwnerBadge: true,
      showModeratorBadge: true,
      showSubBadge: true,
      showAdminBadge: true,
      showPromoCodeWin: true,
      truncateLink: 0
    },
    list: {
      blockUserList: settings.wasd.blockUserList[1],
      blockTermList: {},
      highlightUserList: {},
      highlightTermList: {},
      blockRoleList: {}
    },
    highlightRole: {
      user: "#00000000",
      admin: "#00000000",
      sub: "#00000000",
      owner: "#00000000",
      moderator: "#00000000"
    },
    obschat: {
      theme: 1,
      mf: false,
      ms: false,
      bes: 0,
      st: 1,
      frs: 1,
      ss: 'large',
      can: false,
      catm: true,
      hmb: false,
      sm: false,
      lc: "rgba(var(--wasd-color-switch--rgb),.88)",
      fl: true,
      fmst: "HH:mm",
      cma: true,
      acd: 0,
      fcbc: false,
      stime: false,
      simg: false,
      sdm: 0,
      sl: 0,
      anim: 0,
      nma: 15000,
      mtc: "rgba(var(--wasd-color-switch--rgb), .88)",
      sbo: true,
      sbm: true,
      sbs: true,
      sba: true,
      mentionSelf: true,
      cms: "rgba(var(--wasd-color-switch--rgb),.08)",

      bttv: '',
      ffz: '',
      tv7: '',

      list: {
        blockUserList: {},
        blockTermList: {},
        highlightUserList: {},
        highlightTermList: {},
        blockRoleList: {}
      },
      rMBL: true, 
    }
  };
}