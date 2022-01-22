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

document.addEventListener('copy', (event) => {
  if (settings.wasd.normalizeCopiedMessage) {
    const selection = document.getSelection();
    for (let p of event.path) {
      if (p.className == 'block__messages__item ovg' || p.className == 'block__messages__item-ovg') {
        event.clipboardData.setData('text/plain', selection.toString().replace(/\r?\n/g, "").trim());
        event.preventDefault();
      }
    }
  }
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

if (!new URL(document.URL).pathname.includes("/api/")) initialize();

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
  updateVideoPlayerButtons();
}, 1000);

chrome.runtime.onMessage.addListener((msg) => {
  // console.log(msg)
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
    } else if (option.dataset.type === 'number' || option.type === 'number') {
      option.value = value
    } else {
      option.value = value
    }
    HelperSettings.save([option])
  }
  if (msg.from == "background" && msg.update_chat == true) {
    BetterStreamChat.settingsDiv.querySelector('.update')?.dispatchEvent(new Event('dblclick'))
  }
  if (msg.from == "background" && msg.location == 'reload') {
    location.reload()
  }
});

window.addEventListener('unload', () => navigator.sendBeacon(`https://betterwasd.herokuapp.com/api/v1/stat/tv/open_chat/${HelperWASD.current?.user_profile?.user_id}/delete`));