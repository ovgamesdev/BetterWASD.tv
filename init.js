let storageType = "sync";
let isPressAlt, isPressShift, isPressControl, isPressFullScreen, isPressTheater, isPressPIP, isPressClip;

// ${ localStorage.bwasdDebugMode == "true" ? "main" : "release" }
let git_url = `https://raw.githubusercontent.com/ovgamesdev/res/main/`;
moment.locale("ru");

window.addEventListener("keyup", (e) => {
  isPressAlt = false;
  isPressShift = false;
  isPressControl = false;
  isPressFullScreen = false;
  isPressTheater = false;
  isPressPIP = false;
  isPressClip = false;
});

const isInInput = () => document.activeElement.nodeName === "TEXTAREA" || document.activeElement.nodeName === "INPUT" || document.activeElement.contentEditable === "true";

window.addEventListener("keydown", (e) => {
  if (e.key == "Alt") isPressAlt = true;
  if (e.key == "Shift") isPressShift = true;
  if (e.key == "Control") isPressControl = true;
  if (e.key == "f" || e.key == "а") {
    if (settings.wasd.pressedFullScreen && !isPressFullScreen && !isPressControl) {
      if (!isInInput()) {
        document.querySelector("button.player-button.fullscreen-button")?.click();
        isPressFullScreen = true;
      }
    }
  }
  if (e.key == "t" || e.key == "е") {
    if (settings.wasd.pressedTheater && !isPressTheater && !isPressControl) {
      if (!isInInput()) {
        if (settings.wasd.theaterModeNoFS) {
          document.querySelector("button.player-button.theaterModeNoFS")?.click();
        } else {
          document.querySelector("button.player-button.theater-button")?.click();
        }
        isPressTheater = true;
      }
    }
  }
  if (e.key == "i" || e.key == "ш") {
    if (settings.wasd.pressedPIP && !isPressPIP && !isPressControl) {
      if (!isInInput()) {
        document.querySelector("button.player-button.pip")?.click();
        isPressPIP = true;
      }
    }
  }
  if (e.key == "x" || e.key == "ч") {
    if (settings.wasd.pressedClip && !isPressClip && !isPressControl) {
      if (!isInInput()) {
        if (settings.wasd.iframeCreateClip) {
          document.querySelector("button.player-button.clip-ovg")?.click();
        } else {
          document.querySelector("button.player-button.clip-button")?.click();
        }
        isPressClip = true;
      }
    }
  }
});

window.addEventListener("mousemove", (e) => {
  x = e.clientX;
  y = e.clientY - 45;
});

function copyTextToClipboard(text) {
  let $temp = $("<textarea>");
  $("body").append($temp);
  $temp.val(text);
  $temp.val($temp.val().replace(/\r?\n/g, "").trim()).select();
  document.execCommand("copy");
  $temp.remove();
}

let settings = Helper.getDefaultSettings();

// initialization
let initialize = async () => {
  if (chrome.runtime?.id) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = chrome.runtime.getURL("ctx.js");
    document.head.appendChild(script);
  }

  try {
    settings = await Helper.getSettings();
    if (typeof settings === "undefined") {
      settings = Helper.getDefaultSettings();
    }
  } catch (e) {
    ovg.log("catch", e);
  }

  BetterStreamChat.init();
  socket.start();
  BetterWS.start();
};

if (!new URL(document.URL).pathname.includes("/api/")) initialize();

// tr_optimization
updateVideoPlayerButtons = () => {
  exitfullscreenButton = document.querySelector(".fullscreen>.live>.custom-media-control>.player-controls>.buttons-container>.buttons-right>div>.fullscreen-button > div.tooltip");
  if (exitfullscreenButton) {
    if (settings.wasd.pressedFullScreen) {
      exitfullscreenButton.textContent = "В нормальный режим (f)";
    } else {
      exitfullscreenButton.textContent = "В нормальный режим";
    }
  } else {
    gofullscreenButton = document.querySelector(".live>.custom-media-control>.player-controls>.buttons-container>.buttons-right>div>.fullscreen-button > div.tooltip");
    if (gofullscreenButton) {
      if (settings.wasd.pressedFullScreen) {
        gofullscreenButton.textContent = "На весь экран (f)";
      } else {
        gofullscreenButton.textContent = "На весь экран";
      }
    }
  }

  isTheaterMode = document.querySelector("div.player-wrapper.theatre-mode");
  if (isTheaterMode || HelperWASD.isTheaterModeNoFS) {
    theaterButton = document.querySelector(".player-button.theater-button > div.tooltip");
    theaterNoFSButton = document.querySelector(".player-button.theaterModeNoFS > div.tooltip");
    if (theaterButton) {
      if (settings.wasd.pressedTheater) {
        theaterButton.textContent = "Выйти из театрального режима (t)";
      } else {
        theaterButton.textContent = "Выйти из театрального режима";
      }
    }
    if (theaterNoFSButton) {
      if (settings.wasd.pressedTheater) {
        theaterNoFSButton.textContent = "Выйти из режима кинотеатра (t)";
      } else {
        theaterNoFSButton.textContent = "Выйти из режима кинотеатра";
      }
    }
  } else {
    theaterButton = document.querySelector(".player-button.theater-button > div.tooltip");
    theaterNoFSButton = document.querySelector(".player-button.theaterModeNoFS > div.tooltip");
    if (theaterButton) {
      if (settings.wasd.pressedTheater) {
        theaterButton.textContent = "Театральный режим (t)";
      } else {
        theaterButton.textContent = "Театральный режим";
      }
    }
    if (theaterNoFSButton) {
      if (settings.wasd.pressedTheater) {
        theaterNoFSButton.textContent = "Режим кинотеатра (t)";
      } else {
        theaterNoFSButton.textContent = "Режим кинотеатра";
      }
    }
  }

  pipButton = document.querySelector(".player-button.pip > div.tooltip");
  if (document.pictureInPictureEnabled) {
    if (pipButton) {
      if (settings.wasd.pressedPIP) {
        pipButton.textContent = "Картинка в картинке (i)";
      } else {
        pipButton.textContent = "Картинка в картинке";
      }
    }
  } else {
    if (pipButton) {
      pipButton.textContent = "Режим PiP не поддерживается";
    }
  }

  let clipButton;
  if (settings.wasd.iframeCreateClip) {
    clipButton = document.querySelector(".player-button.clip-ovg > div.tooltip");
  } else {
    clipButton = document.querySelector(".player-button.clip-button > div.tooltip");
  }

  if (clipButton) {
    if (settings.wasd.pressedClip) {
      clipButton.textContent = "Клип (x)";
    } else {
      clipButton.textContent = "Клип";
    }
  }
};

setInterval(() => updateVideoPlayerButtons(), 1000);

const appendUsernameToTextarea = (text, isAddDog) => {
  const footer = document.querySelector("wasd-chat-footer");
  const textarea = footer.querySelector("div.footer__input");
  if (footer) {
    footer.querySelector(".footer__placeholder")?.remove();
    textarea.insertAdjacentHTML("beforeend", `${isAddDog ? "&nbsp;@" : "&nbsp;"}${text}&nbsp;`);
    placeCaretAtEnd(textarea);
  }
};

chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
  if (msg.from == "background" && msg.username) {
    window.focus();
    appendUsernameToTextarea(msg.username, true);
  }
  if (msg.from == "background" && msg.update_save) {
    let option = BetterStreamChat.settingsDiv.querySelector(`[data-name="${msg?.update_save?.split[0]}_${msg?.update_save?.split[1]}"]`);
    let value = msg.update_save.value;

    if (option.type === "checkbox") {
      option.checked = value;
    } else {
      option.value = value;
    }
    HelperSettings.save([option]);
  }
  if (msg.from == "background" && msg.update_chat == true) {
    BetterStreamChat.settingsDiv.querySelector(".update")?.dispatchEvent(new Event("dblclick"));
  }
  if (msg.from == "background" && msg.location == "reload") {
    location.reload();
  }

  sendResponse({ message: "ok" });
  return true;
});

const resizeTheaterModeNoFS = (moreUpdate = true, isClick) => {
  if (HelperWASD.isTheaterModeNoFS) {
    let streamInfo = document.querySelector("#streamInfo");
    let giftsInfo = document.querySelector("#giftsInfo");
    let playerWrapper = document.querySelector(".player-wrapper");

    let height = settings.wasd.theaterModeStreamInfo.toString() == "2" ? streamInfo?.offsetHeight : 0;

    if (theaterModeShowGifts.toString() == "false" && document.querySelector(".content-wrapper.theaterModeNoFS")) {
      height += giftsInfo?.offsetHeight;
    } else {
      height += settings.wasd.theaterModeShowGifts ? giftsInfo?.offsetHeight : 0;
    }

    const update = () => {
      if (HelperWASD.isTheaterModeNoFS && playerWrapper) {
        playerWrapper.style.height = `calc(100vh - ${height}px)`;
        if (settings.wasd.theaterModeStreamInfo.toString() !== "2" && streamInfo) {
          streamInfo.style.width = `calc(${playerWrapper.offsetWidth}px - 60px)`;
        } else if (settings.wasd.theaterModeStreamInfo.toString() !== "3" && streamInfo) {
          streamInfo.style.width = ``;
        }
      }
    };

    update();
    if (moreUpdate) {
      setTimeout(() => update(), 250);
      setTimeout(() => update(), 1000);
      // setTimeout(() => update(), 2000)
    }
  }
};
window.addEventListener("resize", resizeTheaterModeNoFS, false);

document.onfullscreenchange = (v) => {
  let button = document.querySelector("button.theaterModeNoFS");
  if (document.fullscreen && HelperWASD.isTheaterModeNoFS && !settings.wasd.theaterModeFullScreen) {
    HelperWASD.isTheaterModeNoFS = false;
    document.querySelector("style.theaterModeNoFS")?.remove();
    let svg = button.querySelector("svg");
    let tooltip = button.querySelector(".tooltip");
    if (svg)
      svg.outerHTML = `<svg width="16" height="16" viewBox="0 0 16 10" xmlns="http://www.w3.org/2000/svg"><path fill="#FFF" d="M15 0a1 1 0 011 1v8a1 1 0 01-1 1h-1a1 1 0 01-1-1V1a1 1 0 011-1h1zm-4 0a1 1 0 011 1v8a1 1 0 01-1 1H1a1 1 0 01-1-1V1a1 1 0 011-1h10z"></path></svg>`;
    if (tooltip) tooltip.textContent = `Режим кинотеатра`;
    document.querySelector(".chat-container").classList.remove("theaterModeNoFS");
    document.querySelector(".content-wrapper").classList.remove("theaterModeNoFS");
  }
};
