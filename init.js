let storageType = 'sync';
var isPressedAlt, isPressedShift, isPressedControl, isPressedFullScreen, isPressedTheater, isPressedPIP, isPressedClip;

var intervalUpdateStreamTimer;

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

let timeoutmousemove = setInterval(function() {
  if (document.querySelector('div#scroll-content.wrapper')) {
    clearInterval(timeoutmousemove);
    document.querySelector('div#scroll-content.wrapper').onmousemove = function(event) {
      onmousemoveposition(event)
    };

    function onmousemoveposition(e) {
      x = e.clientX;
      y = e.clientY - 45;
    }
  }
}, 100);

let messageTimeout;

let settings = Helper.getDefaultSettings();
let isObserverBinding, isObserverStarted;

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
  if (location.hostname.toLowerCase().includes('wasd.tv')) {
    BetterStreamChat.init();
  }
};

// init to on DOM loaded
if (location.hostname.toLowerCase().includes('.')) {
  setTimeout(() => {
    initialize();
  }, 50);
} else {
  document.addEventListener('DOMContentLoaded', initialize);
}

// init to on change href
window.addEventListener('locationchange', function() {
  setTimeout(() => {
    initialize();
  }, 50);
})

function observerFull() {
  setTimeout(() => {

    mutationtarget = document.querySelector('div#scroll-content.wrapper > div.router-wrapper');
    const config = {
      attributes: true,
      childList: true,
      characterData: true,
      //subtree: true
    }

    const callback = function(mutationsList, observer) {
      for (let mutation of mutationsList) {
        const {
          addedNodes
        } = mutation;
        const matches = [...addedNodes]
          .filter(node => node.nodeType === 1)
          .filter(element => element.matches('wasd-channel'));
        /*if (matches.length) {
            wasdInit(matches);
        }*/
      }
    }

    const observer = new MutationObserver(callback);

    if (mutationtarget) {
      observer.observe(mutationtarget, config);
      isObserverStarted = true;
      ovg.log("start observer (FULL)");

      // fix init chat Великий рандом
      document.querySelector('li#selector-header-random-stream')?.addEventListener('click', () => {
        document.querySelector('wasd-chat')?.remove()
      })
    } else {
      ovg.log("observer not started (FULL)");
    } // observer.disconnect();

  }, 500);
}
observerFull();

function createbuttonovg() {
  setTimeout(() => {
    chatsettingsbutton = document.querySelectorAll("div.header__block__btn > i");
    chatsettingsbutton.item(0)?.addEventListener("click", clickSettingsButton);

    backbutton = document.querySelectorAll("div.menu.menu__inside > div.menu__block.menu__inside-header");

    if (backbutton.item(0)?.querySelector('div.menu__block__text').textContent == " Настройки чата ") {
      backbutton.item(0)?.addEventListener("click", clickSettingsButton);
    }

    createbuttonovg();
  }, 200);
}
createbuttonovg();

function clickSettingsButton() {
  if (document.querySelector("wasd-chat-menu > div.menu")) addToMenu();
}

function addToMenu() {
  //ovg.log("addToMenu");
  if (!BetterStreamChat.isSettingsNewWindow) chatmenu = document.querySelector("wasd-chat-menu > div.menu").querySelectorAll("div.menu__block");

  if (chatmenu) {
    text = " BetterWASD настройки ";
    switcher = `<div id="buttonOvG" class="menu__block menu__block-header"><div class="menu__block__icon"><i class="icon wasd-icons-settings-profile"></i></div><div class="menu__block__text">${text}</div></div>`;
    chatmenu.item(0).insertAdjacentHTML("afterend", switcher);

    document.querySelector('#buttonOvG')?.addEventListener('click', () => {
      BetterStreamChat.settingsDiv.style.display = 'block'
      document.querySelector('.header__block__btn > i').click()
      document.body.style.overflowY = "hidden";
      BetterStreamChat.settingsDiv.style.animationName = 'showbetterpanel';
      BetterStreamChat.openSettings()
    })
  } else {
    document.querySelector("wasd-chat-menu > div.menu #buttonOvG")?.remove()
  }
}
//-
function addPipToPlayer() {
  if (settings.wasd.pictureInPicture) {
    if (!document.querySelector("button.pip")) {
      const divbuttons = document.querySelector("div.buttons-container > div.buttons-right");
      const buttonpip = `<div class="buttons-wraper pip"><button class="player-button pip" type="button"><div class="tooltip tooltip-up tooltip-align-center">Картинка в картинке</div><svg class="tw-icon__svg" width="100%" height="100%" transform="scale(1.3)" viewBox="0 0 128 128"><path fill="#FFF" d="M22 30c-1.9 1.9-2 3.3-2 34s.1 32.1 2 34c1.9 1.9 3.3 2 42 2s40.1-.1 42-2c1.9-1.9 2-3.3 2-34 0-31.6 0-31.9-2.2-34-2.1-1.9-3.3-2-42-2-38.5 0-39.9.1-41.8 2zm78 34v28H28V36h72v28z"></path><path fill="#FFF" d="M60 72v12h32V60H60v12z"></path></svg></button></div>`;
      if (divbuttons) {
        if (divbuttons.childNodes) {
          if (divbuttons.childNodes.length >= 9) {
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
      }
    }
  } else {
    const buttondiv = document.querySelector("div.pip");
    buttondiv?.remove();
  }
}

function createClipByOvg() {
  if (settings.wasd.iframeCreateClip) {
    if (document.querySelector(".clip-button") && !document.querySelector("button.clip-ovg")) {
      document.querySelector('.player-button.clip-button').parentElement.style.display = "none"
      const divbuttons = document.querySelector("div.buttons-container > div.buttons-right");
      const buttonpip = `<div class="buttons-wraper clip-ovg"> <button class="player-button clip-ovg" type="button"> <div class="tooltip tooltip-up tooltip-align-center">Клип</div> <svg width="16" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M6 3.437v4.889c.004.31.407.535.674.375l4-2.445c.257-.158.257-.598 0-.757l-4-2.444A.46.46 0 006 3.437zM14 0a2 2 0 012 2v8a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2h12zm0 1H2a1 1 0 00-.993.883L1 2v8a1 1 0 00.883.993L2 11h12a1 1 0 00.993-.883L15 10V2a1 1 0 00-.883-.993L14 1z" fill="#FFF" fill-rule="nonzero"></path></svg></button> </div>`;
      if (divbuttons) {
        if (divbuttons) {
          if (divbuttons.children[2]) {
            divbuttons.children[2].insertAdjacentHTML("afterend", buttonpip);
            const button = document.querySelector("button.clip-ovg");

            $.ajax({
              url: `${new URL(document.URL).pathname.split('/')[1] == 'private-stream'? 'https://wasd.tv/api/v2/broadcasts/closed/' + new URL(document.URL).pathname.split('/')[2] : 'https://wasd.tv/api/v2/broadcasts/public?channel_name=' + getChannelName()} `,
              success: function(out) {
                if (out.error) {
                  new Error(out.error.code)
                } else if (out.result.media_container) {
                  button.addEventListener('click', () => {
                    if (document.querySelector('iframe#createClip')) {
                      document.querySelector('iframe#createClip').remove()
                    } else {
                      document.querySelector('wasd-player-component > div[data-player]').insertAdjacentHTML("beforeend", `<iframe id="createClip" src="https://wasd.tv/clip/${out.result.media_container.media_container_id}" width="500" height="640" align="left" style="bottom: 15px; right: 5px; position: absolute; z-index: 998;">Ваш браузер не поддерживает плавающие фреймы!</iframe>`);
                      var iframe = document.querySelector('iframe#createClip')
                      iframe.onload = function() {
                        var style = document.createElement('style')
                        style.textContent = 'body {background-color: rgba(0,0,0,0)!important;} #topDiv, wasd-mobile-app, wasd-dynamic-popup, wasd-footer {display: none!important;} #scroll-content {background-color: rgba(0,0,0,0)!important; overflow: hidden;margin: 0!important;height: 100%!important;} .create-clip{padding: 0!important;} div.close-cip {display: flex;width: 100%;max-width: 640px;}div.close-cip .create-clip__title {font-size: 24px;color: var(--wasd-color-switch);width: 100%;max-width: 640px;}div.close-cip .close-clip-btn {background-color: red;width: 28px;height: 28px;text-align: center;}div.close-cip .close-clip-btn span.close-text {font-size: 20px;}} div.tw-absolute.tw-mg-r-05.tw-mg-t-05.tw-right-0.tw-top-0 {margin-right: .5rem!important;margin-top: .5rem!important;right: 0!important;top: 0!important;position: absolute!important;}div.tw-inline-flex.viewer-card-drag-cancel {display: inline-flex!important;cursor: auto;}button.tw-button-icon.tw-button-icon--overlay.tw-core-button {border: 1px solid transparent;background-color: transparent;color: #fff;border-radius: .4rem;height: 3rem;justify-content: center;user-select: none;display: inline-flex;align-items: center;position: relative;-webkit-box-align: center;-webkit-box-pack: center;vertical-align: middle;overflow: hidden;text-decoration: none;white-space: nowrap;text-align: inherit;background: 0 0;  }button.tw-button-icon.tw-button-icon--overlay.tw-core-button:hover {cursor: pointer;background-color: rgb(178 177 177 / 18%);}button.tw-button-icon.tw-button-icon--overlay.tw-core-button:active {background-color: rgba(255, 255, 255, .5);}'
                        iframe.contentDocument.head.appendChild(style)

                        function createbtncloseclip() {
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
function addResetToPlayer() {
  if (settings.wasd.resetToPlayer) {
    if (!document.querySelector("button.resetplayer")) {
      const divbuttons = document.querySelector("div.buttons-container > div.buttons-right");
      const buttonpip = `<div class="buttons-wraper resetplayer"><button class="player-button resetplayer" type="button"><div class="tooltip tooltip-up tooltip-align-right">Сбросить проигрыватель (нажмите дважды)</div><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAD+ElEQVRoge2aW4hVVRiAv5lxUkhxJsuxe2g3KKFIQ+hqb/oSE0lBRCVWvgSBD0EQvXQhkqJeTMqyogslFfXSU+UwUIQaPXR5qCwM1GIaTdMmHb8e1tl12u59zr6sczwPfbCYM3uf/Z/1rb32Wmv/e/eRg5q3q1OsAiaAj4p8ua+vL3t73gEnQOhj4ALgUmBfuy/nCfXHrVNlRoBrgDOBJ+sE6hWhm4CBxuc1wIqqgXpF6ObU/88Dw1UC9YLQqcC1qW2Vu96M2tUp9hsLCNdJwmHgR+AQMJpTj9XAFuDDMj/WiVFuLnAjsBy4ClhEfk/4lSCT1712AYuB/ekdeaNcLmrZcpn6pnrYuGzK+r3SlBA5Q31LPRZZpJkV3RK6TZ3soEjCLnVuJ4X61fVdEGnmxU4JDagvdVkmYWUnhJ47QTKqP6tDthAqO2zfBzzbpi12E+aY3cARwpA8DJzDf+eiqmwG7ooxbF9i9pD8l/qeeqd6XsZxzeUsdZX6ek6sotxQuhlSFRlUt6eC7lUfUE9rI5FXxiuI7FUfVofqCq1rCnpIfVA9uaII6inq0RIi36j3qLOSGHWE5jRaRvUT9aIaIkm5taDIuKGLDqRj1BF6SD1ouEbqiiRlcwuJo4Yl1BWtYlQVmqFuVRdHlOlX92SITKmvWLAHVBWapw5HlEFdkhLZpz6uLigTJ49290MT5ZuiLSsbf38BNgDPAJOxgnfjBi/NCLAWeBn4M3bwXkpjlaLX01jR+F+o1+mk0AghSdJVOiG0kDAU/wCUXxV3igoT5lL1bXW6adJcFnlSHm6sNDoqdLX6gcczacaiska5UH2t3UqhqtCgerv6ZYZIwpaIMqPqfnVNbKHZ6v3qTy1EEu6NIDJH3diIt1M9KZbQfPURdaKASMLCmjKjhnxcwurm/VWFzlc3GO5Sy/BdDZHrPf72fMzGYFBHaJ56oKRIwte2uUFLlSFDF92REeuAuih9TB7tFqfrgPXlm+MfvgLGgM+BncDBxvZh4GzCM9XlwFL+fYKX5m7ghfTGqmmsAfWzimcpBk+bc1ZL03TwxcZ/RFKETaaumyJCRZY+3wKPlm+SWjxB6GrHokVMtcig+kUXzspv6i15Z6XIGSoqhHq5Ie3bCabVN9TTi8jEEsIwucbkD/VVK6TJ8iibU5gJbCO8vpLFJOGJw/yc/UeA74FxYCvwPvB7bu1aEPNdnyXAp2RnjNYCG4FZwLnA7CQcsKdRolzosZ+CP5bRfaYtmSysU3JFWwm1IKvrjQHXlWu26sROY00BdxCuiYR3KsaKSp2cwg7gqcZngXfrV6c+dTOnM4HthHd2roxUp0Lkdbm6ue0pwvtty2rGicbflH1nIVLy48gAAAAASUVORK5CYII=" style="width:18px;color:#fff"></button></div>`;
      if (divbuttons) {
        if (divbuttons.childNodes) {
          if (divbuttons.childNodes.length >= 9) {
            divbuttons.childNodes.item(3).insertAdjacentHTML("afterend", buttonpip);
            const button = document.querySelector("button.resetplayer");
            const videopanel = document.querySelector('video');

            button.addEventListener('dblclick', () => {
              divbuttons.querySelector('div.resetplayer > button > img').classList.add('resetPlayerLoading');
              var video = document.querySelector('video');

              /* video.load(); */

              var pausebutton = document.querySelector('button.pause-play-button');
              pausebutton.click();

              video.currentTime = 0;
              video.play();

              setTimeout(() => {
                divbuttons.querySelector('div.resetplayer > button > img').classList.remove('resetPlayerLoading');
              }, 1100);
            });

          }
        }
      }
    }
  } else {
    const buttondiv = document.querySelector("div.resetplayer");
    if (buttondiv) buttondiv.remove();
  }
}
//-
let videoPlyerPauseTimer = null;
isInterval = false;

function videoPlyerPauseIsWasdHome() {
  if (document.URL == 'https://wasd.tv/' || document.URL == 'http://wasd.tv/') {
    if (!settings.wasd.autoPlayStreamersOnMain && !isInterval) {
      videoPlyerPauseTimer = setInterval(videoPlyerPause, 100);
      isInterval = true;
    }

  } else {
    if (isInterval) {
      clearInterval(videoPlyerPauseTimer);
      isInterval = false;
    }
  }

  function videoPlyerPause() {
    videoActive = document.querySelector('.carousel__slide.active > div > div > wasd-player > div.player > .video-player > wasd-player-component > div > div > video');
    if (videoActive) {
      divPending = document.querySelector('.carousel__slide.active > div > div > wasd-player > div.player > div.pending');
      if (divPending) divPending.style.display = 'none';
      if (!videoActive.paused) videoActive.pause();
    }
  }
}
//-
function updateVideoPlayerButtons() {
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
//-
function createbuttonovgside() {
  if (!BetterStreamChat.isSettingsNewWindow) {
    if (!document.querySelector('li#selector-bm-ovg-settings')) {
      var burgerlist = document.querySelectorAll('wasd-header > wasd-burger-menu > .burger-menu > ul.burger-list')[1]
      if (burgerlist) {
        const buttonovg = `<li id="selector-bm-ovg-settings"><a class="burger-menu__link"><div class="bm__link-name"> BetterWASD настройки </div></a></li>`;
        burgerlist.insertAdjacentHTML("beforeEnd", buttonovg);
        document.querySelector('li#selector-bm-ovg-settings').addEventListener('click', () => {
          BetterStreamChat.settingsDiv.style.display = 'block'
          document.querySelector('body').click()
          document.body.style.overflowY = "hidden";
          BetterStreamChat.settingsDiv.style.animationName = 'showbetterpanel';
          BetterStreamChat.openSettings()
        });
      }
    }
  } else {
    document.querySelector('li#selector-bm-ovg-settings')?.remove()
  }
}
//-
function updateStiskers() {
  if (settings.wasd.bttvInChatMenu) {
    if (!document.querySelector('.bttv-emoji') && document.querySelector('div.emoji__head__options')) {
      document.querySelector('div.emoji__head__options').insertAdjacentHTML("beforeend", `<div class="option bttv-emoji"> BTTV </div>`)
      document.querySelector('div.option.bttv-emoji').addEventListener('click', () => {

        document.querySelector('div.emoji__head__options > .active')?.classList?.remove('active');

        document.querySelector('wasd-chat-emoji-smiles-ffz')?.remove();
        document.querySelector('wasd-chat-emoji-smiles-tv7')?.remove();

        if (!document.querySelector('div.emoji__head__options > .bttv-emoji.active')) {
          setTimeout(() => {
            let option_emotesbttv = document.querySelector('div.option.bttv-emoji')
            if (option_emotesbttv) {
              if (option_emotesbttv.classList) {
                option_emotesbttv.classList.add('active');
              }
            }

            let emojiSmilesbttv = document.querySelector('.emoji__body > wasd-chat-emoji-smiles');
            if (emojiSmilesbttv) {
              emojiSmilesbttv.style.display = 'none';
            }

            let emojiStickersbttv = document.querySelector('.emoji__body > wasd-chat-emoji-stickers');
            if (emojiStickersbttv) {
              emojiStickersbttv.style.display = 'none';
            }

            let emoteBodybttv = document.querySelector('.emoji__body');
            if (emoteBodybttv) {
              emoteBodybttv.insertAdjacentHTML("beforeend", `<wasd-chat-emoji-smiles-bttv><div class="emoji-ovg"></div><div style="border-top: 1px solid rgba(var(--wasd-color-switch--rgb),.16);"><input type="search" placeholder="Поиск эмоций" class="option bttvemojiSearch-shat" style="background: url(chrome-extension://iiihfpccbafenoaiclhhejfbldcnbmmd/img/search.png) no-repeat 10px;background-color: var(--wasd-color-prime);border-bottom-width: 0px!important;/* margin-left: 10px; *//* width: calc(100% - 20px); */width: 100%;"></div></wasd-chat-emoji-smiles-bttv>`)
              let EmoteListbttv = emoteBodybttv.querySelector('div.emoji-ovg');
              //ovg.log(HelperBTTV.emotes);

              chrome.storage.local.get((items) => {
                HelperBTTV.fetchGlobalEmotes(items).finally(() => {
                  bttvEmotes = items.bttvEmotes;
                  bttvUsers = items.bttvUsers;
                  let emotes = {};
                  for (let userID in items.bttvEmotes) {
                    if (items.bttvEmotes.hasOwnProperty(userID)) {

                      let splitdev = document.createElement('div');
                      splitdev.classList.add('stickers__div')

                      splitdev.innerHTML = `<div class="stickers__info"><div class="stickers__info__line"></div><div class="stickers__info__text"> ${typeof bttvUsers[userID].username == 'undefined' ? userID : bttvUsers[userID].username} </div><div class="stickers__info__line"></div></div><div class="stickers__line"></div>`
                      EmoteListbttv.append(splitdev);

                      let stickers__line = splitdev.querySelector('.stickers__line')
                      for (let emoteCode in items.bttvEmotes[userID]) {

                        if (items.bttvEmotes[userID].hasOwnProperty(emoteCode)) {

                          if (typeof emotes[emoteCode] === 'undefined') {

                            emotes[emoteCode] = items.bttvEmotes[userID][emoteCode];

                            let img = document.createElement('img');
                            img.src = `https://cdn.betterttv.net/emote/${HelperBTTV.emotes[emoteCode]}/1x`;
                            img.classList.add('emoji__item-ovg');
                            img.title = emoteCode;
                            img.alt = emoteCode;

                            stickers__line.append(img);
                            img.addEventListener('click', () => {

                              let textareabttv = document.querySelector('.footer > div > textarea')
                              textareabttv.value += emoteCode + ' ';
                              textareabttv.focus()
                              textareabttv.dispatchEvent(new Event('input'));
                            });

                          }
                        }
                      }

                    }
                  }
                })
              });

              // bind search emoji chat
              var inputbttv, filterbttv, ulbttv, optionsbttv, titlebttv, ibttv;
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
            }
          }, 50)
        }
      });

      for (let optinbttv of document.querySelectorAll('div.emoji__head__options > .option')) {
        optinbttv.addEventListener('click', (element) => {
          let option_emotesbttv = document.querySelector('div.option.bttv-emoji')
          option_emotesbttv?.classList?.remove('active');
          element.path[0].classList.add('active')

          document.querySelector('wasd-chat-emoji-smiles-bttv')?.remove();

          let emojiSmilesbttv = document.querySelector('.emoji__body > wasd-chat-emoji-smiles');
          if (emojiSmilesbttv) {
            emojiSmilesbttv.style.display = '';
          }

          let emojiStickersbttv = document.querySelector('.emoji__body > wasd-chat-emoji-stickers');
          if (emojiStickersbttv) {
            emojiStickersbttv.style.display = '';
          }
        });
      }
    }
  } else {
    document.querySelector('wasd-chat-emoji-smiles-bttv')?.remove();
    let option_emotesbttv = document.querySelector('div.option.bttv-emoji')
    if (option_emotesbttv) {
      option_emotesbttv.remove();
      let emojiSmilesbttv = document.querySelector('.emoji__body > wasd-chat-emoji-smiles');
      if (emojiSmilesbttv) {
        emojiSmilesbttv.style.display = '';
        document.querySelectorAll('.emoji__head__options > div.option')[1].classList.add('active');
      }
      let emojiStickersbttv = document.querySelector('.emoji__body > wasd-chat-emoji-stickers');
      if (emojiStickersbttv) {
        emojiStickersbttv.style.display = '';
        document.querySelectorAll('.emoji__head__options > div.option')[0].classList.add('active');
      }
    }
  }
  if (settings.wasd.ffzInChatMenu) {
    if (!document.querySelector('.ffz-emoji')) {
      if (document.querySelector('div.emoji__head__options')) {

        document.querySelector('div.emoji__head__options').insertAdjacentHTML("beforeend", `<div class="option ffz-emoji"> FFZ </div>`)
        document.querySelector('div.option.ffz-emoji').addEventListener('click', () => {

          document.querySelector('div.emoji__head__options > .active')?.classList?.remove('active');

          document.querySelector('wasd-chat-emoji-smiles-bttv')?.remove();
          document.querySelector('wasd-chat-emoji-smiles-vt7')?.remove();

          if (!document.querySelector('div.emoji__head__options > .ffz-emoji.active')) {
            setTimeout(() => {
              document.querySelector('div.option.ffz-emoji')?.classList?.add('active');
              if (document.querySelector('.emoji__body > wasd-chat-emoji-smiles')) {
                document.querySelector('.emoji__body > wasd-chat-emoji-smiles').style.display = 'none';
              }
              if (document.querySelector('.emoji__body > wasd-chat-emoji-stickers')) {
                document.querySelector('.emoji__body > wasd-chat-emoji-stickers').style.display = 'none';
              }

              let emoteBodyffz = document.querySelector('.emoji__body');
              if (emoteBodyffz) {
                emoteBodyffz.insertAdjacentHTML("beforeend", `<wasd-chat-emoji-smiles-ffz><div class="emoji-ovg"></div><div style="border-top: 1px solid rgba(var(--wasd-color-switch--rgb),.16);"><input type="search" placeholder="Поиск эмоций" class="option ffzemojiSearch-shat" style="background: url(chrome-extension://iiihfpccbafenoaiclhhejfbldcnbmmd/img/search.png) no-repeat 10px;background-color: var(--wasd-color-prime);border-bottom-width: 0px!important;/* margin-left: 10px; *//* width: calc(100% - 20px); */width: 100%;"></div></wasd-chat-emoji-smiles-ffz>`)
                let EmoteListffz = emoteBodyffz.querySelector('div.emoji-ovg');
                //ovg.log(HelperFFZ.emotes);

                chrome.storage.local.get((items) => {
                  HelperFFZ.fetchGlobalEmotes(items).finally(() => {
                    ffzEmotes = items.ffzEmotes;
                    ffzUsers = items.ffzUsers;
                    let emotes = {};
                    for (let userID in items.ffzEmotes) {
                      if (items.ffzEmotes.hasOwnProperty(userID)) {

                        let splitdev = document.createElement('div');
                        splitdev.classList.add('stickers__div')

                        let usernameovg;
                        if (typeof ffzUsers[userID] != 'undefined') {
                          if (typeof ffzUsers[userID].username != 'undefined') {
                            usernameovg = ffzUsers[userID].username
                          } else {
                            usernameovg = userID
                          }
                        } else {
                          usernameovg = userID
                        }

                        splitdev.innerHTML = `<div class="stickers__info"><div class="stickers__info__line"></div><div class="stickers__info__text"> ${usernameovg} </div><div class="stickers__info__line"></div></div><div class="stickers__line"></div>`
                        EmoteListffz.append(splitdev);

                        let stickers__line = splitdev.querySelector('.stickers__line')
                        for (let emoteCode in items.ffzEmotes[userID]) {

                          if (items.ffzEmotes[userID].hasOwnProperty(emoteCode)) {

                            if (typeof emotes[emoteCode] === 'undefined') {

                              emotes[emoteCode] = items.ffzEmotes[userID][emoteCode];

                              let img = document.createElement('img');
                              img.src = `https://cdn.frankerfacez.com/emoticon/${HelperFFZ.emotes[emoteCode]}/1`;
                              img.classList.add('emoji__item-ovg');
                              img.title = emoteCode;
                              img.alt = emoteCode;

                              stickers__line.append(img);
                              img.addEventListener('click', () => {

                                let textareaffz = document.querySelector('.footer > div > textarea')
                                //saveValuetextareaffz = textareaffz.value;
                                textareaffz.value += emoteCode + ' ';
                                textareaffz.focus()
                                textareaffz.dispatchEvent(new Event('input'));

                                //document.querySelector('.footer__block.footer__block__btn').click();
                                //textareaffz.value = saveValuetextareaffz;
                              });

                            }
                          }
                        }

                      }
                    }
                  })
                });

                // bind search emoji chat
                var inputffz, filterffz, ulffz, optionsffz, titleffz, iffz;
                inputffz = document.querySelector('input.ffzemojiSearch-shat');
                inputffz.addEventListener('input', () => {
                  filterffz = inputffz.value.toUpperCase();
                  ulffz = document.querySelector("wasd-chat-emoji-smiles-ffz .emoji-ovg");

                  optionsffz = ulffz.querySelectorAll("img.emoji__item-ovg");
                  for (iffz = 0; iffz < optionsffz.length; iffz++) {
                    titleffz = optionsffz[iffz].title
                    if (titleffz) {
                      if (titleffz.toUpperCase().indexOf(filterffz) != -1) {
                        optionsffz[iffz].style.display = "";
                      } else {
                        optionsffz[iffz].style.display = "none";
                      }
                    }
                  }
                });
              }
            }, 50)
          }
        });

        for (let optin of document.querySelectorAll('div.emoji__head__options > .option')) {
          optin.addEventListener('click', (element) => {
            let option_emotesffz = document.querySelector('div.option.ffz-emoji')
            if (option_emotesffz) {
              if (option_emotesffz.classList) {
                option_emotesffz.classList.remove('active');
              }
            }
            element.path[0].classList.add('active')

            if (document.querySelector('wasd-chat-emoji-smiles-ffz')) {
              document.querySelector('wasd-chat-emoji-smiles-ffz').remove();
            }

            let emojiSmilesffz = document.querySelector('.emoji__body > wasd-chat-emoji-smiles');
            if (emojiSmilesffz) {
              emojiSmilesffz.style.display = '';
            }

            let emojiStickersffz = document.querySelector('.emoji__body > wasd-chat-emoji-stickers');
            if (emojiStickersffz) {
              emojiStickersffz.style.display = '';
            }
          });
        }

      }
    }
  } else {
    document.querySelector('wasd-chat-emoji-smiles-ffz')?.remove();

    let option_emotesffz = document.querySelector('div.option.ffz-emoji')
    if (option_emotesffz) {
      option_emotesffz.remove();
      let emojiSmilesffz = document.querySelector('.emoji__body > wasd-chat-emoji-smiles');
      if (emojiSmilesffz) {
        emojiSmilesffz.style.display = '';
        document.querySelectorAll('.emoji__head__options > div.option')[1].classList.add('active');
      }
      let emojiStickersffz = document.querySelector('.emoji__body > wasd-chat-emoji-stickers');
      if (emojiStickersffz) {
        emojiStickersffz.style.display = '';
        document.querySelectorAll('.emoji__head__options > div.option')[0].classList.add('active');
      }
    }
  }
  if (settings.wasd.tv7InChatMenu) {
    if (!document.querySelector('.tv7-emoji') && document.querySelector('div.emoji__head__options')) {
      document.querySelector('div.emoji__head__options').insertAdjacentHTML("beforeend", `<div class="option tv7-emoji"> TV7 </div>`)
      document.querySelector('div.option.tv7-emoji').addEventListener('click', () => {

        document.querySelector('div.emoji__head__options > .active')?.classList?.remove('active');

        document.querySelector('wasd-chat-emoji-smiles-ffz')?.remove();
        document.querySelector('wasd-chat-emoji-smiles-bttv')?.remove();

        if (!document.querySelector('div.emoji__head__options > .tv7-emoji.active')) {
          setTimeout(() => {
            let option_emotestv7 = document.querySelector('div.option.tv7-emoji')
            if (option_emotestv7) {
              if (option_emotestv7.classList) {
                option_emotestv7.classList.add('active');
              }
            }

            let emojiSmilestv7 = document.querySelector('.emoji__body > wasd-chat-emoji-smiles');
            if (emojiSmilestv7) {
              emojiSmilestv7.style.display = 'none';
            }

            let emojiStickerstv7 = document.querySelector('.emoji__body > wasd-chat-emoji-stickers');
            if (emojiStickerstv7) {
              emojiStickerstv7.style.display = 'none';
            }

            let emoteBodytv7 = document.querySelector('.emoji__body');
            if (emoteBodytv7) {
              emoteBodytv7.insertAdjacentHTML("beforeend", `<wasd-chat-emoji-smiles-tv7><div class="emoji-ovg"></div><div style="border-top: 1px solid rgba(var(--wasd-color-switch--rgb),.16);"><input type="search" placeholder="Поиск эмоций" class="option tv7emojiSearch-shat" style="background: url(chrome-extension://iiihfpccbafenoaiclhhejfbldcnbmmd/img/search.png) no-repeat 10px;background-color: var(--wasd-color-prime);border-bottom-width: 0px!important;/* margin-left: 10px; *//* width: calc(100% - 20px); */width: 100%;"></div></wasd-chat-emoji-smiles-tv7>`)
              let EmoteListtv7 = emoteBodytv7.querySelector('div.emoji-ovg');
              //ovg.log(HelperTV7.emotes);

              chrome.storage.local.get((items) => {
                HelperTV7.fetchGlobalEmotes(items).finally(() => {
                  tv7Emotes = items.tv7Emotes;
                  tv7Users = items.tv7Users;
                  let emotes = {};
                  for (let userID in items.tv7Emotes) {
                    if (items.tv7Emotes.hasOwnProperty(userID)) {

                      let splitdev = document.createElement('div');
                      splitdev.classList.add('stickers__div')

                      splitdev.innerHTML = `<div class="stickers__info"><div class="stickers__info__line"></div><div class="stickers__info__text"> ${typeof tv7Users[userID].username == 'undefined' ? userID : tv7Users[userID].username} </div><div class="stickers__info__line"></div></div><div class="stickers__line"></div>`
                      EmoteListtv7.append(splitdev);

                      let stickers__line = splitdev.querySelector('.stickers__line')
                      for (let emoteCode in items.tv7Emotes[userID]) {

                        if (items.tv7Emotes[userID].hasOwnProperty(emoteCode)) {

                          if (typeof emotes[emoteCode] === 'undefined') {

                            emotes[emoteCode] = items.tv7Emotes[userID][emoteCode];

                            let img = document.createElement('img');
                            img.src = `https://cdn.7tv.app/emote/${HelperTV7.emotes[emoteCode]}/1x`;
                            img.classList.add('emoji__item-ovg');
                            img.title = emoteCode;
                            img.alt = emoteCode;

                            stickers__line.append(img);
                            img.addEventListener('click', () => {

                              let textareatv7 = document.querySelector('.footer > div > textarea')
                              textareatv7.value += emoteCode + ' ';
                              textareatv7.focus()
                              textareatv7.dispatchEvent(new Event('input'));
                            });

                          }
                        }
                      }

                    }
                  }
                })
              });

              // bind search emoji chat
              var inputtv7, filtertv7, ultv7, optionstv7, titletv7, itv7;
              inputtv7 = document.querySelector('input.tv7emojiSearch-shat');
              inputtv7.addEventListener('input', () => {
                filtertv7 = inputtv7.value.toUpperCase();
                ultv7 = document.querySelector("wasd-chat-emoji-smiles-tv7 .emoji-ovg");

                optionstv7 = ultv7.querySelectorAll("img.emoji__item-ovg");
                for (itv7 = 0; itv7 < optionstv7.length; itv7++) {
                  titletv7 = optionstv7[itv7].title
                  if (titletv7) {
                    if (titletv7.toUpperCase().indexOf(filtertv7) != -1) {
                      optionstv7[itv7].style.display = "";
                    } else {
                      optionstv7[itv7].style.display = "none";
                    }
                  }
                }
              });
            }
          }, 50)
        }
      });

      for (let optintv7 of document.querySelectorAll('div.emoji__head__options > .option')) {
        optintv7.addEventListener('click', (element) => {
          let option_emotestv7 = document.querySelector('div.option.tv7-emoji')
          option_emotestv7?.classList?.remove('active');
          element.path[0].classList.add('active')

          document.querySelector('wasd-chat-emoji-smiles-tv7')?.remove(); //btttv

          let emojiSmilestv7 = document.querySelector('.emoji__body > wasd-chat-emoji-smiles');
          if (emojiSmilestv7) {
            emojiSmilestv7.style.display = '';
          }

          let emojiStickerstv7 = document.querySelector('.emoji__body > wasd-chat-emoji-stickers');
          if (emojiStickerstv7) {
            emojiStickerstv7.style.display = '';
          }
        });
      }
    }
  } else {
    document.querySelector('wasd-chat-emoji-smiles-tv7')?.remove();
    let option_emotestv7 = document.querySelector('div.option.tv7-emoji')
    if (option_emotestv7) {
      option_emotestv7.remove();
      let emojiSmilestv7 = document.querySelector('.emoji__body > wasd-chat-emoji-smiles');
      if (emojiSmilestv7) {
        emojiSmilestv7.style.display = '';
        document.querySelectorAll('.emoji__head__options > div.option')[1].classList.add('active');
      }
      let emojiStickerstv7 = document.querySelector('.emoji__body > wasd-chat-emoji-stickers');
      if (emojiStickerstv7) {
        emojiStickerstv7.style.display = '';
        document.querySelectorAll('.emoji__head__options > div.option')[0].classList.add('active');
      }
    }
  }
}

function getChannelName() {
  if (document.querySelector('#selector-sp-stream-links .wasd-input input[placeholder="Чат"]')) return new URL(document.querySelector('#selector-sp-stream-links .wasd-input input[placeholder="Чат"]').value.trim().toLowerCase()).searchParams.get('channel_name')
  if (document.querySelector('wasd-user-plays > .user-plays > a[href^="/channel"]')) return document.querySelector('wasd-user-plays > .user-plays > a[href^="/channel"]').textContent.trim().toLowerCase()
  if (new URL(document.URL).pathname.split('/')[1] == 'stream-settings') {
    if (document.querySelector('wasd-stream-links input[placeholder="Трансляция"]')) return new URL(document.querySelector('wasd-stream-links input[placeholder="Трансляция"]').value).pathname.split('/')[1].toLowerCase()
  } else {
    new Error(`URL ${document.URL}`)
    return '0';
  }
}

setInterval(() => {
  addPipToPlayer();
  // addResetToPlayer();
  createClipByOvg();
  videoPlyerPauseIsWasdHome();
  updateVideoPlayerButtons();
  createbuttonovgside();
  // setAutoOnlyAudio()
}, 1000);

setInterval(() => {
  updateStiskers();
}, 50);


chrome.runtime.onMessage.addListener(function(msg) {
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
      hoverTooltipEmote: true
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

      bttv: '',
      ffz: '',
      tv7: '',
    }
  };
}