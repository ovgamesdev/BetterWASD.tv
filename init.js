let storageType = "sync";
let isPressedAlt, isPressedShift, isPressedControl, isPressedFullScreen, isPressedTheater, isPressedPIP, isPressedClip;

// ${ localStorage.bwasdDebugMode == "true" ? "main" : "release" }
let git_url = `https://raw.githubusercontent.com/ovgamesdev/res/main/`;
moment.locale("ru");

window.addEventListener("keyup", (e) => {
  isPressedAlt = false;
  isPressedShift = false;
  isPressedControl = false;
  isPressedFullScreen = false;
  isPressedTheater = false;
  isPressedPIP = false;
  isPressedClip = false;
});

window.addEventListener("keydown", (e) => {
  if (e.key == "Alt") isPressedAlt = true;
  if (e.key == "Shift") isPressedShift = true;
  if (e.key == "Control") isPressedControl = true;
  if (e.key == "f" || e.key == "а") {
    if (settings.wasd.pressedFullScreen && !isPressedFullScreen && !isPressedControl) {
      if (!(document.activeElement.nodeName == "TEXTAREA" || document.activeElement.nodeName == "INPUT")) {
        document.querySelector("button.player-button.fullscreen-button")?.click();
        isPressedFullScreen = true;
      }
    }
  }
  if (e.key == "t" || e.key == "е") {
    if (settings.wasd.pressedTheater && !isPressedTheater && !isPressedControl) {
      if (!(document.activeElement.nodeName == "TEXTAREA" || document.activeElement.nodeName == "INPUT")) {
        if (settings.wasd.theaterModeNoFS) {
          document.querySelector("button.player-button.theaterModeNoFS")?.click();
        } else {
          document.querySelector("button.player-button.theater-button")?.click();
        }
        isPressedTheater = true;
      }
    }
  }
  if (e.key == "i" || e.key == "ш") {
    if (settings.wasd.pressedPIP && !isPressedPIP && !isPressedControl) {
      if (!(document.activeElement.nodeName == "TEXTAREA" || document.activeElement.nodeName == "INPUT")) {
        document.querySelector("button.player-button.pip")?.click();
        isPressedPIP = true;
      }
    }
  }
  if (e.key == "x" || e.key == "ч") {
    if (settings.wasd.pressedClip && !isPressedClip && !isPressedControl) {
      if (!(document.activeElement.nodeName == "TEXTAREA" || document.activeElement.nodeName == "INPUT")) {
        if (settings.wasd.iframeCreateClip) {
          document.querySelector("button.player-button.clip-ovg")?.click();
        } else {
          document.querySelector("button.player-button.clip-button")?.click();
        }
        isPressedClip = true;
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
  // console.log( $temp.val() )
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
  exitfullscreenButton = document.querySelector(
    ".fullscreen>.live>.custom-media-control>.player-controls>.buttons-container>.buttons-right>div>.fullscreen-button > div.tooltip"
  );
  if (exitfullscreenButton) {
    if (settings.wasd.pressedFullScreen) {
      exitfullscreenButton.textContent = "В нормальный режим (f)";
    } else {
      exitfullscreenButton.textContent = "В нормальный режим";
    }
  } else {
    gofullscreenButton = document.querySelector(
      ".live>.custom-media-control>.player-controls>.buttons-container>.buttons-right>div>.fullscreen-button > div.tooltip"
    );
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

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // console.log(msg)
  if (msg.from == "background" && msg.username) {
    window.focus();
    let textarea = document.querySelector(".footer > div > textarea");
    if (textarea) {
      textarea.value += "@" + msg.username + " ";
      textarea.dispatchEvent(new Event("input"));
      textarea.focus();
    }
  }
  if (msg.from == "background" && msg.update_save) {
    let newSettings = JSON.parse(JSON.stringify(settings));

    let option = BetterStreamChat.settingsDiv.querySelector(`[data-name="${msg?.update_save?.split[0]}_${msg?.update_save?.split[1]}"]`);
    let split = msg.update_save.split;
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

window.addEventListener("unload", () =>
  navigator.sendBeacon(`${HelperBWASD.host}/api/v1/stat/tv/open_chat/${HelperWASD.current?.user_profile?.user_id}/delete`)
);

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
