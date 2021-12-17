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

// tr_optimization
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
// tr_optimization
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

// tr_optimization
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
    BetterStreamChat.settingsDiv.querySelector('.update')?.dispatchEvent(new Event('dblclick'))
  }
  if (msg.from == "background" && msg.location == 'reload') {
    location.reload()
  }
});
