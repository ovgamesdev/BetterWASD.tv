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
        if (settings.wasd.pressedFullScreen[1] && !isPressedFullScreen) {
            if (!(document.activeElement.nodeName == 'TEXTAREA' || document.activeElement.nodeName == 'INPUT')) {
                if (document.querySelector('button.player-button.fullscreen-button')) document.querySelector('button.player-button.fullscreen-button').click();
                isPressedFullScreen = true;
            }
        }
    }
    if (e.key == "t" || e.key == "е") {
        if (settings.wasd.pressedTheater[1] && !isPressedTheater) {
            if (!(document.activeElement.nodeName == 'TEXTAREA' || document.activeElement.nodeName == 'INPUT')) {
                if (document.querySelector('button.player-button.theater-button')) document.querySelector('button.player-button.theater-button').click();
                isPressedTheater = true;
            }
        }
    }
    if (e.key == "i" || e.key == "ш") {
        if (settings.wasd.pressedPIP[1] && !isPressedPIP) {
            if (!(document.activeElement.nodeName == 'TEXTAREA' || document.activeElement.nodeName == 'INPUT')) {
                if (document.querySelector('button.player-button.pip')) document.querySelector('button.player-button.pip').click();
                isPressedPIP = true;
            }
        }
    }
    if (e.key == "x" || e.key == "ч") {
        if (settings.wasd.pressedClip[1] && !isPressedClip) {
            if (!(document.activeElement.nodeName == 'TEXTAREA' || document.activeElement.nodeName == 'INPUT')) {
                if (settings.wasd.iframeCreateClip[1]) {
                    if (document.querySelector('button.player-button.clip-ovg')) document.querySelector('button.player-button.clip-ovg').click()
                } else {
                    if (document.querySelector('button.player-button.clip-button')) document.querySelector('button.player-button.clip-button').click();
                }
                isPressedClip = true;
            }
        }
    }
});

let timeoutmousemove = setInterval(function(){ 
    if (document.querySelector('div#scroll-content.wrapper')) {
        clearInterval(timeoutmousemove);
        document.querySelector('div#scroll-content.wrapper').onmousemove = function(event) {onmousemoveposition(event)};
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
        console.log('catch', e);
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
} else { document.addEventListener('DOMContentLoaded', initialize); }

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
                const { addedNodes } = mutation;
                const matches = [...addedNodes]
                    .filter(node => node.nodeType === 1)
                    .filter(element => element.matches('wasd-channel') );
                /*if (matches.length) {
                    wasdInit(matches);
                }*/
            }
        }

        const observer = new MutationObserver(callback);

        if (mutationtarget) {
            observer.observe(mutationtarget, config);
            isObserverStarted = true;
            console.log("start observer (FULL)");

            // fix init chat Великий рандом
            document.querySelector('li#selector-header-random-stream')?.addEventListener('click', () => {
                document.querySelector('wasd-chat')?.remove()
            })
        } else {
            console.log("observer not started (FULL)");
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
    //console.log('bind click');
    divmenu = document.querySelector("wasd-chat-menu > div.menu");
    if (divmenu) addToMenu();
}
function addToMenu() {
    //console.log("addToMenu");
    chatmenu = document.querySelector("wasd-chat-menu > div.menu").querySelectorAll("div.menu__block");
    if (chatmenu) {
        text = " BetterWASD настройки ";
        switcher = `<div id="buttonOvG" class="menu__block menu__block-header"><div class="menu__block__icon"><i class="icon wasd-icons-settings-profile"></i></div><div class="menu__block__text">${text}</div></div>`;
        chatmenu.item(0).insertAdjacentHTML("afterend", switcher);

        
        document.querySelector('#buttonOvG')?.addEventListener('click', () => {
            BetterStreamChat.settingsDiv.style.display = 'block'
            document.querySelector('.header__block__btn > i').click()
            document.body.style.overflowY = "hidden";
            BetterStreamChat.settingsDiv.style.animationName = 'showbetterpanel';
            BetterStreamChat.settingsDiv.querySelectorAll('main').forEach(function(main) {
                main.scrollTo(0, 0)
            })
        })
        
    }
}
//-
function addPipToPlayer() {
    if (settings.wasd.pictureInPicture[1]) {
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
        if (buttondiv) {
            buttondiv.remove();
        }
    }
}
function createClipByOvg() {
    if (settings.wasd.iframeCreateClip[1]) {
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
                            success: function(out){
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
                                                style.textContent ='body {background-color: rgba(0,0,0,0)!important;} #topDiv, wasd-mobile-app, wasd-dynamic-popup, wasd-footer {display: none!important;} #scroll-content {background-color: rgba(0,0,0,0)!important; overflow: hidden;margin: 0!important;height: 100%!important;} .create-clip{padding: 0!important;} div.close-cip {display: flex;width: 100%;max-width: 640px;}div.close-cip .create-clip__title {font-size: 24px;color: var(--wasd-color-switch);width: 100%;max-width: 640px;}div.close-cip .close-clip-btn {background-color: red;width: 28px;height: 28px;text-align: center;}div.close-cip .close-clip-btn span.close-text {font-size: 20px;}} div.tw-absolute.tw-mg-r-05.tw-mg-t-05.tw-right-0.tw-top-0 {margin-right: .5rem!important;margin-top: .5rem!important;right: 0!important;top: 0!important;position: absolute!important;}div.tw-inline-flex.viewer-card-drag-cancel {display: inline-flex!important;cursor: auto;}button.tw-button-icon.tw-button-icon--overlay.tw-core-button {border: 1px solid transparent;background-color: transparent;color: #fff;border-radius: .4rem;height: 3rem;justify-content: center;user-select: none;display: inline-flex;align-items: center;position: relative;-webkit-box-align: center;-webkit-box-pack: center;vertical-align: middle;overflow: hidden;text-decoration: none;white-space: nowrap;text-align: inherit;background: 0 0;  }button.tw-button-icon.tw-button-icon--overlay.tw-core-button:hover {cursor: pointer;background-color: rgb(178 177 177 / 18%);}button.tw-button-icon.tw-button-icon--overlay.tw-core-button:active {background-color: rgba(255, 255, 255, .5);}'
                                                iframe.contentDocument.head.appendChild(style)

                                                function createbtncloseclip() {
                                                    let text_clip = iframe.contentDocument.querySelector('.create-clip__title')
                                                    if (text_clip) {
                                                        text_clip.outerHTML = '<div class="close-cip"><span class="create-clip__title">Создание клипа</span><div data-a-target="viewer-card-close-button" class="tw-absolute tw-mg-r-05 tw-mg-t-05 tw-right-0 tw-top-0"><div class="tw-inline-flex viewer-card-drag-cancel"><button class="tw-button-icon tw-button-icon--overlay tw-core-button" aria-label="Скрыть" data-test-selector="close-viewer-card"><i _ngcontent-ykf-c54="" style="font-size:13px;align-items:center;display:flex;justify-content:center" class="icon wasd-icons-close"></i></button></div></div></div>'
                                                        iframe.contentDocument.querySelector('button.tw-button-icon.tw-button-icon--overlay.tw-core-button').addEventListener("click", ()=>{
                                                            document.querySelector('iframe#createClip').remove()
                                                        })
                                                    } else {
                                                        setTimeout(()=>{
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
    if (settings.wasd.resetToPlayer[1]) {
        if (!document.querySelector("button.resetplayer")) {
            const divbuttons = document.querySelector("div.buttons-container > div.buttons-right");
            const buttonpip = `<div class="buttons-wraper resetplayer"><button class="player-button resetplayer" type="button"><div class="tooltip tooltip-up tooltip-align-right">Сбросить проигрыватель (щелкните мышью по кнопке дважды)</div><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAD+ElEQVRoge2aW4hVVRiAv5lxUkhxJsuxe2g3KKFIQ+hqb/oSE0lBRCVWvgSBD0EQvXQhkqJeTMqyogslFfXSU+UwUIQaPXR5qCwM1GIaTdMmHb8e1tl12u59zr6sczwPfbCYM3uf/Z/1rb32Wmv/e/eRg5q3q1OsAiaAj4p8ua+vL3t73gEnQOhj4ALgUmBfuy/nCfXHrVNlRoBrgDOBJ+sE6hWhm4CBxuc1wIqqgXpF6ObU/88Dw1UC9YLQqcC1qW2Vu96M2tUp9hsLCNdJwmHgR+AQMJpTj9XAFuDDMj/WiVFuLnAjsBy4ClhEfk/4lSCT1712AYuB/ekdeaNcLmrZcpn6pnrYuGzK+r3SlBA5Q31LPRZZpJkV3RK6TZ3soEjCLnVuJ4X61fVdEGnmxU4JDagvdVkmYWUnhJ47QTKqP6tDthAqO2zfBzzbpi12E+aY3cARwpA8DJzDf+eiqmwG7ooxbF9i9pD8l/qeeqd6XsZxzeUsdZX6ek6sotxQuhlSFRlUt6eC7lUfUE9rI5FXxiuI7FUfVofqCq1rCnpIfVA9uaII6inq0RIi36j3qLOSGHWE5jRaRvUT9aIaIkm5taDIuKGLDqRj1BF6SD1ouEbqiiRlcwuJo4Yl1BWtYlQVmqFuVRdHlOlX92SITKmvWLAHVBWapw5HlEFdkhLZpz6uLigTJ49290MT5ZuiLSsbf38BNgDPAJOxgnfjBi/NCLAWeBn4M3bwXkpjlaLX01jR+F+o1+mk0AghSdJVOiG0kDAU/wCUXxV3igoT5lL1bXW6adJcFnlSHm6sNDoqdLX6gcczacaiska5UH2t3UqhqtCgerv6ZYZIwpaIMqPqfnVNbKHZ6v3qTy1EEu6NIDJH3diIt1M9KZbQfPURdaKASMLCmjKjhnxcwurm/VWFzlc3GO5Sy/BdDZHrPf72fMzGYFBHaJ56oKRIwte2uUFLlSFDF92REeuAuih9TB7tFqfrgPXlm+MfvgLGgM+BncDBxvZh4GzCM9XlwFL+fYKX5m7ghfTGqmmsAfWzimcpBk+bc1ZL03TwxcZ/RFKETaaumyJCRZY+3wKPlm+SWjxB6GrHokVMtcig+kUXzspv6i15Z6XIGSoqhHq5Ie3bCabVN9TTi8jEEsIwucbkD/VVK6TJ8iibU5gJbCO8vpLFJOGJw/yc/UeA74FxYCvwPvB7bu1aEPNdnyXAp2RnjNYCG4FZwLnA7CQcsKdRolzosZ+CP5bRfaYtmSysU3JFWwm1IKvrjQHXlWu26sROY00BdxCuiYR3KsaKSp2cwg7gqcZngXfrV6c+dTOnM4HthHd2roxUp0Lkdbm6ue0pwvtty2rGicbflH1nIVLy48gAAAAASUVORK5CYII=" style="width:18px;color:#fff"></button></div>`;
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
        if (!settings.wasd.autoPlayStreamersOnMain[1] && !isInterval) {
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
        if (settings.wasd.pressedFullScreen[1]) {
            exitfullscreenButton.textContent = "В нормальный режим (f)"
        } else {
            exitfullscreenButton.textContent = "В нормальный режим"
        }
    } else {
        gofullscreenButton = document.querySelector('.live>.custom-media-control>.player-controls>.buttons-container>.buttons-right>div>.fullscreen-button > div.tooltip');
        if (gofullscreenButton) {
            if (settings.wasd.pressedFullScreen[1]) {
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
            if (settings.wasd.pressedTheater[1]) {
                theaterButton.textContent = "Выйти из театрального режима (t)"
            } else {
                theaterButton.textContent = "Выйти из театрального режима"
            }
        }
    } else {
        theaterButton = document.querySelector('.player-button.theater-button > div.tooltip');
        if (theaterButton) {
            if (settings.wasd.pressedTheater[1]) {
                theaterButton.textContent = "Театральный режим (t)"
            } else {
                theaterButton.textContent = "Театральный режим"
            }
        }
    }

    pipButton = document.querySelector('.player-button.pip > div.tooltip');
    if (document.pictureInPictureEnabled) {
        if (pipButton) {
            if (settings.wasd.pressedPIP[1]) {
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
    if (settings.wasd.iframeCreateClip[1]) {
        clipButton = document.querySelector('.player-button.clip-ovg > div.tooltip')
    } else {
        clipButton = document.querySelector('.player-button.clip-button > div.tooltip');
    }

    if (clipButton) {
        if (settings.wasd.pressedClip[1]) {
            clipButton.textContent = "Клип (x)"
        } else {
            clipButton.textContent = "Клип"
        }
    }
}
//-
function createbuttonovgside() {
    if (!document.querySelector('li#selector-bm-ovg-settings')) {
        var burgerlist = document.querySelectorAll('wasd-header > wasd-burger-menu > .burger-menu > ul.burger-list')[1]
        if (burgerlist) {
            const buttonovg = `<li id="selector-bm-ovg-settings"><a class="burger-menu__link"><div class="bm__link-name"> BetterWASD настройки </div></a></li>`;
            burgerlist.insertAdjacentHTML("beforeEnd", buttonovg);
                document.querySelector('li#selector-bm-ovg-settings').addEventListener('click', () => {
                BetterStreamChat.settingsDiv.style.display = 'block'
                if (document.querySelector('wasd-chat-menu')) {
                    document.querySelector('.header__block__btn > i').click()
                }
                document.body.style.overflowY = "hidden";
                BetterStreamChat.settingsDiv.style.animationName = 'showbetterpanel';
                BetterStreamChat.settingsDiv.querySelectorAll('main').forEach(function(main){main.scrollTo(0, 0)})
            });
        }
    }
}
//-
function updateStiskers() {
    if (settings.wasd.bttvInChatMenu[1]) {
        if (!document.querySelector('.bttv-emoji') && document.querySelector('div.emoji__head__options')) {
            document.querySelector('div.emoji__head__options').insertAdjacentHTML("beforeend", `<div class="option bttv-emoji"> BTTV </div>`)
            document.querySelector('div.option.bttv-emoji').addEventListener('click', () => {

                document.querySelector('div.emoji__head__options > .active')?.classList?.remove('active');

                document.querySelector('wasd-chat-emoji-smiles-ffz')?.remove();
                document.querySelector('wasd-chat-emoji-smiles-tv7')?.remove();

                if (!document.querySelector('div.emoji__head__options > .bttv-emoji.active')) {
                    setTimeout(()=>{
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
                            //console.log(HelperBTTV.emotes);

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
                                                            textareabttv.value += emoteCode+' ';
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
                    },50)
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
    if (settings.wasd.ffzInChatMenu[1]) {
        if (!document.querySelector('.ffz-emoji')) {
            if (document.querySelector('div.emoji__head__options')) {

                document.querySelector('div.emoji__head__options').insertAdjacentHTML("beforeend", `<div class="option ffz-emoji"> FFZ </div>`)
                document.querySelector('div.option.ffz-emoji').addEventListener('click', () => {

                    document.querySelector('div.emoji__head__options > .active')?.classList?.remove('active');

                    document.querySelector('wasd-chat-emoji-smiles-bttv')?.remove();
                    document.querySelector('wasd-chat-emoji-smiles-vt7')?.remove();
                    
                    if (!document.querySelector('div.emoji__head__options > .ffz-emoji.active')) {
                        setTimeout(()=>{
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
                                //console.log(HelperFFZ.emotes);

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
                                                                textareaffz.value += emoteCode+' ';
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
                        },50)
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
    if (settings.wasd.tv7InChatMenu[1]) {
        if (!document.querySelector('.tv7-emoji') && document.querySelector('div.emoji__head__options')) {
            document.querySelector('div.emoji__head__options').insertAdjacentHTML("beforeend", `<div class="option tv7-emoji"> TV7 </div>`)
            document.querySelector('div.option.tv7-emoji').addEventListener('click', () => {

                document.querySelector('div.emoji__head__options > .active')?.classList?.remove('active');

                document.querySelector('wasd-chat-emoji-smiles-ffz')?.remove();
                document.querySelector('wasd-chat-emoji-smiles-bttv')?.remove();

                if (!document.querySelector('div.emoji__head__options > .tv7-emoji.active')) {
                    setTimeout(()=>{
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
                            //console.log(HelperTV7.emotes);

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
                                                            textareatv7.value += emoteCode+' ';
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
                    },50)
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
    addResetToPlayer();
    createClipByOvg();
    videoPlyerPauseIsWasdHome();
    updateVideoPlayerButtons();
    createbuttonovgside();
    /*setAutoOnlyAudio()*/
}, 1000);

setInterval(() => {
    updateStiskers();
}, 50);


/**/
let isShowUpdateSettings = false
function updateSettingsToNew() {
    if (!settings.general.isUpdatedToNewSettings && !isShowUpdateSettings) {
        isShowUpdateSettings = true
        alert('Расширение BetterWASD обновлено!\nОбновить настройки')
        let newSettings = {"bot":{"cmdPrefixBotMod":[["/",true],[settings.bot.cmdPrefixBotMod,true]],"cmdBan":[true,settings.bot.cmdBan],"cmdMod":[true,settings.bot.cmdMod],"cmdRaid":[true,settings.bot.cmdRaid],"cmdTitle":[true,settings.bot.cmdTitle],"cmdGame":[true,settings.bot.cmdGame],"cmdFollowers":[true,settings.bot.cmdFollowers],"cmdSubscribers":[true,settings.bot.cmdSubscribers],"cmdPrefixBotUser":[["!",true],[settings.bot.cmdPrefixBotUser,true]],"cmdUptime":[true,settings.bot.cmdUptime],"cmdPrefix":[["/",true],[settings.bot.cmdPrefix,true]],"cmdUser":[true,settings.bot.cmdUser],"eventFollow":[["{user_login} Спасибо за подписку!",false],["{user_login} Спасибо за подписку!",false]],"eventSub":[["{user_login} Спасибо за платную подписку на {subdate}!",false],["{user_login} Спасибо за платную подписку на {subdate}!",false]],"cmdPrefixBot":[["!",true],["!",true]],"cmd_User":[true,true],},"general":{"isUpdatedToNewSettings":true,"autoUpdateChat":[false,settings.general.autoUpdateChat]},"wasd":{"messageFollower":[false,settings.wasd.messageFollower],"messageSub":[false,settings.wasd.messageSub],"messageSystem":[false,settings.wasd.messageSystem],"messageHover":[true,settings.wasd.messageHover],"wasdIconsSmile":[false,settings.wasd.wasdIconsSmile],"wasdIconsCircleRu":[false,settings.wasd.wasdIconsCircleRu],"webkitScrollbarWidth":[false,settings.wasd.webkitScrollbarWidth],"giftsWrapperSide":[false,settings.wasd.giftsWrapperSide],"giftsWrapperTopRight":[false,settings.wasd.giftsWrapperTopRight],"sticker":["2",settings.wasd.sticker],"stickerovg":["2",settings.wasd.stickerovg],"paddingChatMessage":["4",settings.wasd.paddingChatMessage],"colonAfterNickname":[false,settings.wasd.colonAfterNickname],"linkColor":["#000000",settings.wasd.linkColor],"colorAtTheMention":[true,settings.wasd.colorAtTheMention],"chatOnTheLeft":[false,settings.wasd.chatOnTheLeft],"chatWidth":[320,settings.wasd.chatWidth],"hideDonationChannelButton":[false,settings.wasd.hideDonationChannelButton],"hideAmazingChannelButtoan":[false,settings.wasd.hideAmazingChannelButtoan],"hideGiftButtons":[false,settings.wasd.hideGiftButtons],"highlightMessagesBold":[true,settings.wasd.highlightMessagesBold],"streamerMessage":[false,settings.wasd.streamerMessage],"fontSize":[14,settings.wasd.fontSize],"topPanel":[false,settings.wasd.topPanel],"topPanelChallenge":[false,settings.wasd.topPanelChallenge],"pictureInPicture":[true,settings.wasd.pictureInPicture],"resetToPlayer":[false,settings.wasd.resetToPlayer],"moderatorMenu":["2",settings.wasd.moderatorMenu],"moderatorMenuAutomatic":[false,settings.wasd.moderatorMenuAutomatic],"autoPlayStreamersOnMain":[true,settings.wasd.autoPlayStreamersOnMain],"pressedFullScreen":[true,settings.wasd.pressedFullScreen],"pressedTheater":[true,settings.wasd.pressedTheater],"pressedPIP":[true,settings.wasd.pressedPIP],"pressedClip":[true,settings.wasd.pressedClip],"alternatingColorChatMessages":[false,settings.wasd.alternatingColorChatMessages],"alternatingColorChatMessagesColor":["#000000",settings.wasd.alternatingColorChatMessagesColor],"onClickMention":["2",settings.wasd.onClickMention],"onClickUserName":["1",settings.wasd.onClickUserName],"fixedLinks":[true,settings.wasd.fixedLinks],"uptimeStream":[true,settings.wasd.uptimeStream],"bttvEmotes":[true,settings.wasd.bttvEmotes],"bttvInChatMenu":[true,settings.wasd.bttvInChatMenu],"bttvEmoteSize":["2",settings.wasd.bttvEmoteSize],"linkRecognizerall":[true,settings.wasd.linkRecognizerall],"linkRecognizerWASD":[true,settings.wasd.linkRecognizerWASD],"decorationLink":[true,settings.wasd.decorationLink],"videoOverlay":[false,settings.wasd.videoOverlay],"userNameEdited":settings.wasd.userNameEdited,"onClickUser":["2",settings.wasd.onClickUser],"blockUserList":settings.wasd.blockUserList,"removeMentionBL":[true,settings.wasd.removeMentionBL],"hidePanelMobile":[true,settings.wasd.hidePanelMobile],"formatMessageSentTime":["H:mm",settings.wasd.formatMessageSentTime],"mentionSelf":[true,settings.wasd.mentionSelf],"colorMentionSelf":["#000000",settings.wasd.colorMentionSelf],"highlightMessagesOpenCard":[false,settings.wasd.highlightMessagesOpenCard],"highlightMessagesOpenCardColor":["#000000",settings.wasd.highlightMessagesOpenCardColor],"alwaysOpenVolumeControl":[false,settings.wasd.alwaysOpenVolumeControl],"colorMessageHover":["#000000",settings.wasd.colorMessageHover],"bttvSize":["56px",settings.wasd.bttvSize],"mutePlayerOnMiddleMouse":[false,settings.wasd.mutePlayerOnMiddleMouse],"hideBannerOnHome":[false,settings.wasd.hideBannerOnHome],"hideSelectorStreamSettings":[false,settings.wasd.hideSelectorStreamSettings],"clickMentionAll":[true,settings.wasd.clickMentionAll],"underlineUsernameAndMention":[true,settings.wasd.underlineUsernameAndMention],"iframeCreateClip":[false,settings.wasd.iframeCreateClip],"linkRecognitionRights":["3",settings.wasd.linkRecognitionRights],"artificialChatDelay":["0",settings.wasd.artificialChatDelay],}}
        chrome.storage[storageType].set(newSettings, () => {
            location.reload();
        });
    }
}