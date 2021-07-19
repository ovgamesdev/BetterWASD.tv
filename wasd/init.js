const wasd = {
    style: null,
    isObserverEndBind: false,
    isObserverEndBindBody: false,
    init() {
        console.log("init");
        var observer;
        const chatQuerySelector = 'wasd-chat';
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
                                console.log("start observer (CHAT)");
                                document.querySelector('#bscSettingsPanel .update > i').classList.remove('resetPlayerLoading');
                                HelperWASD.getIsModerator().then((resolve) => {
                                    HelperWASD.isModerator = resolve
                                    wasd.update();
                                })

                                wasd.update();
                                isObserverStarted = true;
                                HelperWASD.updateStreamTimer();
                                HelperSocket.start(getChannelName()).then(i => {
                                    if (i == 'leave') {
                                        isObserverStarted = false;
                                        isObserverBinding = false;
                                        observer.disconnect();
                                        HelperSocket.stop()
                                        clearInterval(intervalUpdateStreamTimer);
                                        console.log("disconnect observer (CHAT) leave");
                                        HelperWASD.isModerator = false
                                        if (document.querySelector('.chat-container__wrap')) document.querySelector('.chat-container__wrap').remove()
                                        if (document.querySelector('wasd-stream-chat')) document.querySelector('wasd-stream-chat').remove()
                                        setTimeout(startObserver, 200)
                                    }
                                });

                                if (!this.isObserverEndBind && document.querySelector('.burger-menu #selector-bm-channel a')) {
                                    document.querySelector('.burger-menu #selector-bm-channel a').addEventListener('click', ({ target }) => {
                                        isObserverBinding = false;
                                        isObserverStarted = false;
                                        observer.disconnect();
                                        HelperSocket.stop()
                                        clearInterval(intervalUpdateStreamTimer);
                                        console.log("disconnect observer (CHAT) 4");
                                        HelperWASD.isModerator = false
                                        if (document.querySelector('.chat-container__wrap')) document.querySelector('.chat-container__wrap').remove()
                                        if (document.querySelector('wasd-stream-chat')) document.querySelector('wasd-stream-chat').remove()
                                        setTimeout(startObserver, 200)
                                    });
                                    this.isObserverEndBind = true;
                                }

                                if (!this.isObserverEndBind && document.querySelector('#selector-header-stream-settings')) {
                                    document.querySelector('#selector-header-stream-settings').addEventListener('click', ({ target }) => {
                                        isObserverBinding = false;
                                        isObserverStarted = false;
                                        observer.disconnect();
                                        HelperSocket.stop()
                                        clearInterval(intervalUpdateStreamTimer);
                                        console.log("disconnect observer (CHAT) 3");
                                        HelperWASD.isModerator = false
                                        if (document.querySelector('.chat-container__wrap')) document.querySelector('.chat-container__wrap').remove()
                                        if (document.querySelector('wasd-stream-chat')) document.querySelector('wasd-stream-chat').remove()
                                        setTimeout(startObserver, 200)
                                    });
                                    this.isObserverEndBind = true;
                                }

                            } else {
                                console.log("observer not started (CHAT)");
                                setTimeout(startObserver, 10)
                                HelperSocket.stop()
                            }

                            for (let element of this.document.querySelectorAll('div.block__messages__item')) {
                                wasd.handleMessage(element);
                            }

                            if (!isObserverBinding) {
                                function checkheaderdiv() {
                                    let header_block_menu = document.querySelector('.header > div.header__block__menu')
                                    if (header_block_menu) {
                                        header_block_menu.childNodes[1].addEventListener('click', ({ target }) => {
                                            isObserverStarted = false;
                                            isObserverBinding = false;
                                            observer.disconnect();
                                            HelperSocket.stop()
                                            clearInterval(intervalUpdateStreamTimer);
                                            console.log("disconnect observer (CHAT) 2");
                                            HelperWASD.isModerator = false
                                            setTimeout(startObserver, 200)
                                        });

                                        document.body.addEventListener('click', ({ target }) => {
                                            if (isObserverStarted) {
                                                if (!document.querySelector('.header > div.header__block__menu')) {
                                                    isObserverBinding = false;
                                                    isObserverStarted = false;
                                                    observer.disconnect();
                                                    HelperSocket.stop()
                                                    clearInterval(intervalUpdateStreamTimer);
                                                    console.log("disconnect observer (CHAT) 1");
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
                        setTimeout(()=>{
                            document.querySelector('.media-control').classList.remove('media-control-hide')
                            document.querySelector('.custom-media-control').classList.remove('custom-media-hidden')
                            document.querySelector('.player-streaminfo').classList.remove('custom-media-hidden')
                        }, 10)
                    }
                    wasdPlayer.onmousedown = function(e) {
                        if (settings.wasd.mutePlayerOnMiddleMouse[1] && e.button === 1) {
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
        }

        else {
            init(document, target);
        }

        if (this.style === null) {
            this.style = document.createElement('style');
            this.style.type = 'text/css';
            document.body.append(this.style);
            wasd.update();
        }

        function openMobileChat() {
            setTimeout(()=> {
                if(document.querySelector('.chat-container__btn-open--mobile')) {
                    document.querySelector('.chat-container__btn-open--mobile').click()
                } else {
                    openMobileChat()
                }
            }, 1)
        }

        openMobileChat()
    },
    update() {
        let cssCode = ``;

        if (settings.wasd.messageFollower[1]) {
            cssCode += `wasd-chat-follower-message { display: none!important; }`;
        }

        if (settings.wasd.messageSub[1]) {
            cssCode += `wasd-chat-subscribe-message { display: none!important; }`;
        }

        if (settings.wasd.messageSystem[1]) {
            cssCode += `wasd-chat-system-message { display: none!important; }`;
        }

        if (settings.wasd.wasdIconsSmile[1]) {
            cssCode += `.wasd-icons-smile { display: none!important; }`;
        } 

        if (settings.wasd.wasdIconsCircleRu[1]) {
            cssCode += `.wasd-icons-circle-ru { display: none!important; }`;
        }

        if (settings.wasd.webkitScrollbarWidth[1]) {
            cssCode += 'div::-webkit-scrollbar { width: 0px; }';
            cssCode += 'wasd-chat-body { box-shadow: 0 0 2px 0 rgba(var(--wasd-color-switch--rgb),.32); }';
        }

        if (settings.wasd.giftsWrapperSide[1]) {
            cssCode += '.gifts-wrapper-side { display: none!important; }';
        }

        if (settings.wasd.giftsWrapperTopRight[1]) {
            cssCode += '.gifts-wrapper-top-right { display: none!important; }';
        }

        if (settings.wasd.sticker[1].toString() === '0') {
            if (settings.wasd.forceResizeStickers[1].toString() === '1') {
                cssCode += '.message__info img.sticker { display: block; height: 128px!important; width: 128px!important; margin-top: 8px; }'
            }
            else if (settings.wasd.forceResizeStickers[1].toString() === '2') {
                cssCode += '.message__info img.sticker { display: block; height: 56px!important; width: 56px!important; margin-top: 8px; }'
            }
        }
        else if (settings.wasd.sticker[1].toString() === '1') {
            cssCode += 'img.sticker { width: 28px!important; height: 28px!important; margin-top: 0px!important; display: inline!important; vertical-align: middle!important; margin: -.5rem 0!important; }';
        }
        else if (settings.wasd.sticker[1].toString() === '2') {
            if (settings.wasd.forceResizeStickers[1].toString() === '0') {
                cssCode += 'img.sticker {max-width: -webkit-fill-available; transition: transform .2s; width: 28px!important; height: 28px!important; margin-top: 0px!important; display: inline!important; vertical-align: middle!important; margin: -.5rem 0!important; }';
                cssCode += 'img.sticker:hover { transform: scale(4.4) translateY(-8px); background-color: var(--wasd-color-prime); border-radius: 4px; box-shadow: 0 0 4px 0 rgba(var(--wasd-color-switch--rgb),.16); }';
                cssCode += 'img.sticker.small:hover { transform: scale(2.2) translateY(-4px); background-color: var(--wasd-color-prime); border-radius: 4px; box-shadow: 0 0 4px 0 rgba(var(--wasd-color-switch--rgb),.16); }';
            }
            else if (settings.wasd.forceResizeStickers[1].toString() === '1') {
                cssCode += 'img.sticker {max-width: -webkit-fill-available; transition: transform .2s; width: 28px!important; height: 28px!important; margin-top: 0px!important; display: inline!important; vertical-align: middle!important; margin: -.5rem 0!important; }';
                cssCode += 'img.sticker:hover { transform: scale(4.4) translateY(-8px); background-color: var(--wasd-color-prime); border-radius: 4px; box-shadow: 0 0 4px 0 rgba(var(--wasd-color-switch--rgb),.16); }';
            }
            else if (settings.wasd.forceResizeStickers[1].toString() === '2') {
                cssCode += 'img.sticker {max-width: -webkit-fill-available; transition: transform .2s; width: 28px!important; height: 28px!important; margin-top: 0px!important; display: inline!important; vertical-align: middle!important; margin: -.5rem 0!important; }';
                cssCode += 'img.sticker:hover { transform: scale(2.2) translateY(-8px); background-color: var(--wasd-color-prime); border-radius: 4px; box-shadow: 0 0 4px 0 rgba(var(--wasd-color-switch--rgb),.16); }';
            }

            cssCode += 'div.block__messages__item:hover { z-index: 1; }';
            cssCode += 'div.block__messages__item-ovg:hover { z-index: 1; }';
            cssCode += '.block__new-messages { z-index: 1; }';
        }
        else if (settings.wasd.sticker[1].toString() === '3') {
            cssCode += 'img.sticker { display: none!important; }';
        }
        else if (settings.wasd.sticker[1].toString() === '4') {
            cssCode += 'img.sticker { display: none!important; }';
        }

        if (settings.wasd.stickerovg[1].toString() === '0') {
            cssCode += `.message__info img.stickerovg {max-width: -webkit-fill-available; display: block; height: ${settings.wasd.bttvSize[1]}; margin-top: 8px; }`
        }
        if (settings.wasd.stickerovg[1].toString() === '2') {
            cssCode += 'div.block__messages__item:hover { z-index: 1; }';
            cssCode += 'div.block__messages__item-ovg:hover { z-index: 1; }';
            cssCode += 'img.stickerovg {max-width: -webkit-fill-available; transition: transform .2s; width: 28px!important; height: 28px!important; margin-top: 0px!important; display: inline!important; vertical-align: middle!important; margin: -.5rem 0!important; }';
            cssCode += `img.stickerovg:hover { transform: scale(${settings.wasd.bttvSize[1] == '128px'? '4.4' : '2.2'}) translateY(-8px); background-color: var(--wasd-color-prime); border-radius: 4px; box-shadow: 0 0 4px 0 rgba(var(--wasd-color-switch--rgb),.16); }`;
            cssCode += '.block__new-messages { z-index: 1; }';
        }
        else if (settings.wasd.stickerovg[1].toString() === '1') {
            cssCode += 'img.stickerovg {max-width: -webkit-fill-available; width: 28px!important; height: 28px!important; margin-top: 0px!important; display: inline!important; vertical-align: middle!important; margin: -.5rem 0!important; }';
        }
        else if (settings.wasd.stickerovg[1].toString() === '4') {
            cssCode += 'img.stickerovg { display: none!important; }';
        }


        if (settings.wasd.paddingChatMessage[1].toString() === '0') {
            cssCode += 'wasd-chat-message > div.message { padding: 5px 20px!important; }';
            //cssCode += 'wasd-chat-message.is-time > div.message { padding: 2px 8px 2px 4px!important; }';
        }
        else if (settings.wasd.paddingChatMessage[1].toString() === '1') {
            cssCode += 'wasd-chat-message > div.message { padding: 4px 24px!important; }';
            //cssCode += 'wasd-chat-message.is-time > div.message { padding: 2px 8px 2px 4px!important; }';
        }
        else if (settings.wasd.paddingChatMessage[1].toString() === '2') {
            cssCode += 'wasd-chat-message > div.message { padding: 4px 9px!important; }';
            //cssCode += 'wasd-chat-message.is-time > div.message { padding: 2px 8px 2px 4px!important; }';
        }
        else if (settings.wasd.paddingChatMessage[1].toString() === '3') {
            cssCode += 'wasd-chat-message > div.message { padding: 3px 15px!important; }';
            //cssCode += 'wasd-chat-message.is-time > div.message { padding: 2px 8px 2px 4px!important; }';
        }
        else if (settings.wasd.paddingChatMessage[1].toString() === '4') {
            cssCode += 'wasd-chat-message > div.message { padding: 2px 12px!important; }';
            cssCode += 'wasd-chat-message > div.message.is-time { padding: 2px 8px 2px 4px!important; }';
        }

        cssCode += `div.message-text > span > a, div.message-text-ovg > span > a { color: ${settings.wasd.linkColor[1] != '#000000' ? settings.wasd.linkColor[1] : 'inherit'}; }`;
        cssCode += `div.message-text.message-text_deleted > span > a { color: inherit!important; }`;

        if (settings.wasd.chatOnTheLeft[1]) {
            cssCode += `@media screen and (min-width:480px) {wasd-chat-wrapper > div.chat-container { width: ${settings.wasd.chatWidth[1]}px!important }}`;
            cssCode += `wasd-channel > div.channel-wrapper > div#channel-wrapper { order: 1!important; }`;
            cssCode += `div.player-wrapper.theatre-mode { left: ${settings.wasd.chatWidth[1]}px!important; width: calc(100vw - ${settings.wasd.chatWidth[1]}px)!important; }`;
        } else {
            cssCode += `@media screen and (min-width:480px) {wasd-chat-wrapper > div.chat-container { width: ${settings.wasd.chatWidth[1]}px!important }}`;
            cssCode += `div.player-wrapper.theatre-mode { width: calc(100vw - ${settings.wasd.chatWidth[1]}px)!important; }`;
        }
        cssCode += 'wasd-chat-wrapper > div.chat-container.close--desktop { width: 0px!important; }';

        if (settings.wasd.hideDonationChannelButton[1] & settings.wasd.hideAmazingChannelButtoan[1] & settings.wasd.hideGiftButtons[1]) {
            cssCode += 'div#giftsInfo.gifts-info { display: none!important; }';
        } else {
           if (settings.wasd.hideDonationChannelButton[1]) {
                cssCode += 'wasd-channel-donate-btn { display: none!important; }';
            }
            if (settings.wasd.hideAmazingChannelButtoan[1]) {
                cssCode += 'wasd-channel-amazing-btn { display: none!important; }';
            }
            if (settings.wasd.hideGiftButtons[1]) {
                cssCode += 'div.gifts-info__gift_buttons { display: none!important; }';
            } 
        }

        if (settings.wasd.highlightMessagesBold[1]) {
            cssCode += '.chat-message-mention { font-weight: 700!important; }';
        }

        if (settings.wasd.streamerMessage[1]) {
            cssCode += 'wasd-chat-ya-streamer-message { display: none!important; }';
        }

        if (settings.wasd.fontSize[1]) {
            cssCode += `.info__text__status__name, info__text__status__name-ovg { font-size: ${settings.wasd.fontSize[1]}px!important; display: contents!important;}`;
            cssCode += `.info__text__status__name.is-moderator, info__text__status__name-ovg.is-moderator { display: inline!important; }`;
            cssCode += `.info__text__status__name.is-owner, info__text__status__name-ovg.is-owner { display: inline!important; }`;
            cssCode += `.message-text, .message-text-ovg { font-size: ${settings.wasd.fontSize[1]}px!important; }`;
            cssCode += `.chat-message-mention { font-size: ${settings.wasd.fontSize[1]}px!important; }`;
            cssCode += `.message__time, .message__time-ovg { font-size: ${settings.wasd.fontSize[1] - 4}px!important;}`;
            cssCode += `#colon-after-author-name, #colon-after-author-name-ovg { font-size: ${settings.wasd.fontSize[1]}px!important; }`;
        }

        if (settings.wasd.topPanel[1]) {
            cssCode += 'wasd-chat-ya-streamer-notifications { display: none!important; }';
        }

        if (settings.wasd.topPanelChallenge[1]) {
            cssCode += 'wasd-chat-challenge-notifications { display: none!important; }';
        }

        if (!settings.wasd.autoPlayStreamersOnMain[1]) {
            cssCode += '.carousel__slide.active > div > div > wasd-player > div.player > div.pending { display: none!important; }';
        }

        if (settings.wasd.alternatingColorChatMessages[1]) {
            cssCode += `div.block__messages__item:nth-child(2n+1) { background-color: ${settings.wasd.alternatingColorChatMessagesColor[1] != '#000000' ? settings.wasd.alternatingColorChatMessagesColor[1]+'!important' : 'var(--wasd-color-prime)!important' }; }`;
        }

        if (settings.wasd.decorationLink[1]) {
            cssCode += `wasd-chat-message a:hover { text-decoration: underline; }`;
        }

        if (settings.wasd.videoOverlay[1]) {
            cssCode += `wasd-player-overlay-video { display: none!important; }`;
        }

        if (settings.wasd.hidePanelMobile[1]) {
            cssCode += `wasd-notification-app { display: none!important; }`;
            cssCode += `wasd-mobile-app { display: none!important; }`;
            cssCode += `.wrapper-notification { margin-top: 48px!important; height: calc(100% - 48px)!important; transition: 0s!important; }`;
            cssCode += `#banner_mobile_app { display: none!important; }`;
        }

        cssCode += ` @media screen and (max-width:480px) {.visible--mobile { height: calc((100% - 97px) - 56vw)!important; }}`

        if (settings.wasd.alwaysOpenVolumeControl[1]) {
            cssCode += `div.volume-container .volume-slider-container {width: 86px!important;}`
        }

        if (settings.wasd.hideBannerOnHome[1]) {
            cssCode += `wasd-banner .banner { display: none!important; }`;
        }
        if (settings.wasd.hideSelectorStreamSettings[1]) {
            cssCode += `#selector-header-stream-settings { display: none!important; }`;
        }
        if (settings.wasd.underlineUsernameAndMention[1]) {
            cssCode += `.chat-message-mention:hover, .info__text__status__name:hover { text-decoration: underline!important; }`;
        }

        cssCode += `.message__time, .message__time-ovg {min-width: auto!important; overflow: unset!important; width: auto!important;}`

        cssCode += `.message.has-mention {background-color: ${settings.wasd.colorMentionSelf[1] != '#000000' ? settings.wasd.colorMentionSelf[1]+'!important' : 'rgba(var(--wasd-color-switch--rgb),.08)!important' }}`

        cssCode += `.message.openCardColor {background-color: ${settings.wasd.highlightMessagesOpenCardColor[1] != '#000000' ? settings.wasd.highlightMessagesOpenCardColor[1]+'!important' : 'rgba(var(--wasd-color-switch--rgb),.08)!important' }}`
        
        cssCode+= `.info__text__status-paid-ovg {display: ${HelperWASD.isModerator ? '' : 'none!important;'}}`

        if (settings.wasd.messageHover[1]) {
            cssCode += `.message:hover { background-color: ${settings.wasd.colorMessageHover[1] != '#000000' ? settings.wasd.colorMessageHover[1]+'!important' : 'rgba(var(--wasd-color-switch--rgb),.08)!important' }; }`;
            cssCode += `.message-ovg:hover { background-color: ${settings.wasd.colorMessageHover[1] != '#000000' ? settings.wasd.colorMessageHover[1]+'!important' : 'rgba(var(--wasd-color-switch--rgb),.08)!important' }; }`;
            cssCode += `.ovg-bg-color-prime:hover { background-color: ${settings.wasd.colorMessageHover[1] != '#000000' ? settings.wasd.colorMessageHover[1]+'!important' : 'rgba(var(--wasd-color-switch--rgb),.08)!important' }; }`;
        }
        cssCode+= `.paidsubs-popup__stickers-item {cursor: url(${chrome.extension.getURL("img/cursorS.png")}) 4 4, auto}`

        if (settings.wasd.decreaseIndentationStickerMenu[1]) {
            cssCode += 'wasd-chat-emoji-stickers .stickers__body {padding: 6px 0 0 8px!important;}wasd-chat-emoji-stickers .stickers__body__item {min-width: auto!important;padding: 2px!important;margin: 0 8px 8px 0!important;height: 43px!important;width: 43px!important;}wasd-chat-emoji-stickers .stickers__body__item--not-available {width: 18px!important;height: 18px!important;right: 10px!important;bottom: 10px!important;}wasd-chat-emoji-stickers .stickers__body__item--not-available img {height: 11px!important;}'
        }

        if (settings.wasd.highlightStickersStickerMenu[1]) {
            if (settings.wasd.decreaseIndentationSmilesMenu[1]) {
                cssCode += 'wasd-chat-emoji-smiles .smiles {height: 210px!important;padding: 5px 0 0 5px!important;justify-content: center!important;}'
                cssCode += 'wasd-chat-emoji-smiles .smiles .smiles__item:hover {background-color: rgba(var(--wasd-color-switch--rgb), .2)!important;}wasd-chat-emoji-smiles .smiles .smiles__item {padding: 16.7px!important;margin: 0px;border-radius: 2px;}'
            } else {
                cssCode += 'wasd-chat-emoji-smiles .smiles .smiles__item {margin-bottom: 8px!important;margin-right: 11px!important;}wasd-chat-emoji-smiles .smiles .smiles__item:hover {background-color: rgba(var(--wasd-color-switch--rgb), .2)!important;}wasd-chat-emoji-smiles .smiles .smiles__item {padding: 18px!important;margin: 0px;border-radius: 2px;}'
            }

            if (settings.wasd.decreaseIndentationBTTVandFFZMenu[1]) {
                cssCode += 'wasd-chat-emoji-smiles-bttv .emoji-ovg,wasd-chat-emoji-smiles-ffz .emoji-ovg {padding: 10px 0 10px 5px!important;}wasd-chat-emoji-smiles-bttv .emoji-ovg .emoji__item-ovg,wasd-chat-emoji-smiles-ffz .emoji-ovg .emoji__item-ovg {margin-bottom: 8px!important;margin-right: 9px!important;}'
                cssCode += 'img.emoji__item-ovg:hover {background-color: rgba(var(--wasd-color-switch--rgb), .2)!important;}img.emoji__item-ovg {padding: 5px!important;margin: 0px;border-radius: 2px;width: 33px;height: 33px;}'
            } else {
                cssCode += 'img.emoji__item-ovg:hover {background-color: rgba(var(--wasd-color-switch--rgb), .2)!important;}img.emoji__item-ovg {margin-bottom: 0px!important;margin-right: 0px!important;}img.emoji__item-ovg {padding: 9px!important;margin: 0px;border-radius: 2px;width: 44px;height: 44px;}'
            }

        } else {
            if (settings.wasd.decreaseIndentationSmilesMenu[1]) {
                cssCode += 'wasd-chat-emoji-smiles .smiles {justify-content: center!important;padding: 10px 0 10px 5px!important;height: 210px!important;}wasd-chat-emoji-smiles .smiles .smiles__item {margin-bottom: 8px!important;margin-right: 9px!important;}'
            }
            if (settings.wasd.decreaseIndentationBTTVandFFZMenu[1]) {
                cssCode += 'wasd-chat-emoji-smiles .smiles {height: 210px!important;padding: 5px 0 0 5px!important;justify-content: center!important;}'
            }
        }

        if (settings.wasd.hideGreatRandom[1]) {
            cssCode += 'li#selector-header-random-stream {display: none!important}'
        }

        for (let d in settings.wasd.blockUserList) {
            cssCode += `.block__messages__item[username="${d}"] {display: none!important;}`
            if (settings.wasd.removeMentionBL[1]) {
                cssCode += `.block__messages__item[mention*="${d}"] {display: none!important;}`
            }
        }

        if (wasd.style) {
            if (typeof wasd.style.styleSheet !== 'undefined') {
                wasd.style.styleSheet.cssText = cssCode;
            } else {
                wasd.style.innerHTML = '';
                wasd.style.appendChild(document.createTextNode(cssCode));
            }
            console.log('style inited')
        } else {
            console.log('style undefined')
            setTimeout(()=>{
                wasd.update()
            }, 50)
        }
    },
    handleMessage(node, isobserver=false) {
	    isMessageEdited = node.classList.contains('ovg');
	    textarea = document.querySelector('.footer > div >textarea');

	    if (!isMessageEdited) {
	        node.classList.add('ovg');

	        if (isobserver) {
                if (settings.wasd.artificialChatDelay[1].toString() == '0') {
                    node.style.display = 'block';
                } else {
                    node.style.display = 'none'
                    setTimeout(()=>{node.style.display = 'block'; HelperWASD.scrollChatMessage(node, -1, 150)}, settings.wasd.artificialChatDelay[1])
                }
	        } else {
	            node.style.display = 'block';
	        }

	        var usernametext;
	        if (node.querySelector('div.info__text__status__name')) usernametext = node.querySelector('div.info__text__status__name').textContent.trim()

	        if (settings.wasd.highlightMessagesOpenCard[1] && HelperWASD.openUserCardName == usernametext) {
	            if (node.querySelector('wasd-chat-message > .message')) {
	                node.querySelector('wasd-chat-message > .message').classList.add('openCardColor')
	            }
	        } // fixWasdMention
	        
	        if (usernametext) {
	            node.setAttribute('username', usernametext)
	        }

	        var message;
	        if (node.querySelector('.message-text > span')) message = node.querySelector('.message-text > span').textContent
	        if (message) node.setAttribute('message', message)

	        if (!settings.wasd.mentionSelf[1]) {
	            metion = document.querySelector('.has-mention')
	            if (metion) metion.classList.remove('has-mention')
	        }

	        if (isobserver && node.querySelector('.message__time')) {
	            node.querySelector('.message__time').textContent = dayjs().format(settings.wasd.formatMessageSentTime[1])
	        }

	        if (node.querySelector('div.message-text')) {
	            node.querySelector('div.message-text').innerHTML = node.querySelector('div.message-text').innerHTML.replace('</',' </').replace('>','> ');
	        }

	        // fix link
	        if (settings.wasd.fixedLinks[1]) {
	            if (node.querySelector('div.message-text')) {
	                let message = node.querySelector('div.message-text');
	                message.innerHTML = HelperWASD.textToURL(message.innerHTML);
	            }
	        }

	        let nicknamediv = node.querySelector('div.info__text__status__name');
	        if (settings.wasd.colonAfterNickname[1]) {
	            let message = node.querySelector('.message-text');
	            if (message) {
	                message.insertAdjacentHTML("beforebegin", `<span aria-hidden="true" id="colon-after-author-name" style=" margin-right: 4px; color: var(--yt-live-chat-primary-text-color, rgba(var(--wasd-color-switch--rgb),.88))" >: </span>`);
	                
	                if (nicknamediv) {
	                    nicknamediv.style.margin = "0px";
	                }
	            }
	        }

	        nicknamediv = node.querySelector('div.info__text__status__name');
	        if (nicknamediv) {

	            nicknamediv.setAttribute('username', nicknamediv.textContent.trim());

	            if (settings.wasd.userNameEdited[nicknamediv.textContent.trim()]) {
	                nicknamediv.textContent = ` ${settings.wasd.userNameEdited[nicknamediv.textContent.trim()]} `
	            }
	        }

	        let messageText = node.querySelector('.message-text > span');
	        if (messageText) {

	            if (settings.wasd.bttvEmotes[1]) {
	                messageText.innerHTML = HelperBTTV.replaceText(messageText.innerHTML);
	            }
	            if (settings.wasd.ffzEmotes[1]) {
	                messageText.innerHTML = HelperFFZ.replaceText(messageText.innerHTML);
	            }

                let bl = ' ';

	            if (settings.wasd.onClickMention[1].toString() === '0') {
	                messageText.innerHTML = messageText.innerHTML.replace(/@[a-zA-Z0-9_-]+/ig, function($1) {
	                    let username = settings.wasd.userNameEdited[$1.trim().split('@').join('')];
	                    if (!username) {username = $1.trim().split('@').join('')}
	                    return `<span style='color: ${usercolor($1.trim())};' class='chat-message-mention' username="${$1}">@${username.trim()}</span>`;
	                });
	                node.querySelectorAll('.chat-message-mention').forEach(element => {
	                    usercolorapi(element);
                        bl += element.getAttribute('username').split('@').join('') + ' '
	                    element.addEventListener('click', ({ target }) => {
	                        if (target.getAttribute('username')) {
	                            HelperWASD.addUsernameToTextarea(target.getAttribute('username').split('@').join(''));
	                        }
	                    });
	                });

	            } else if (settings.wasd.onClickMention[1].toString() === '1') {
	                messageText.innerHTML = messageText.innerHTML.replace(/@[a-zA-Z0-9_-]+/ig, function($1) {
	                    let username = settings.wasd.userNameEdited[$1.trim().split('@').join('')];
	                    if (!username) {username = $1.trim().split('@').join('')}
	                    return `<span style='color: ${usercolor($1.trim())};' class='chat-message-mention click' username="${$1}">@${username.trim()}</span>`;
	                });
	                node.querySelectorAll('.chat-message-mention.click').forEach(element => {
	                    usercolorapi(element);
                        bl += element.getAttribute('username').split('@').join('') + ' '
	                    element.addEventListener('click', ({ target }) => {
	                        if (textarea) {
	                            textarea.value+=target.getAttribute('username').trim()+' ';
	                            textarea.dispatchEvent(new Event('input'));
	                            textarea.focus()
	                        }
	                    })
	                });

	            } else if (settings.wasd.onClickMention[1].toString() === '2') {
	                messageText.innerHTML = messageText.innerHTML.replace(/@[a-zA-Z0-9_-]+/ig, function($1) {
	                    let username = settings.wasd.userNameEdited[$1.trim().split('@').join('')];
	                    if (!username) {username = $1.trim().split('@').join('')}
	                    return `<span style='color: ${usercolor($1.trim())};' class='chat-message-mention click' username="${$1}">@${username.trim()}</span>`;
	                });
	                node.querySelectorAll('.chat-message-mention.click').forEach(element => {
	                    usercolorapi(element);
                        bl += element.getAttribute('username').split('@').join('') + ' '
	                    element.addEventListener('click', ({ target }) => {
	                        if (target.getAttribute('username')) {
	                            if (!HelperWASD.addUsernameToTextarea(target.getAttribute('username').split('@').join(''))) {
	                                HelperWASD.createUserViewerCard(target.getAttribute('username').split('@').join(''));
	                            }
	                        }
	                    })
	                });

	            }

                node.setAttribute('mention', bl)

	            function usercolorapi(element) {
	                // ищем цвет по api если по ласт сообщениям не нашли
	                if (element.style.color == '' && settings.wasd.colorAtTheMention[1]) {
	                    color = "rgba(var(--wasd-color-switch--rgb),.88);";

	                    var oReq = new XMLHttpRequest();
	                    oReq.onload = (out) => {
	                        var out = JSON.parse(oReq.responseText);
	                        let data;
	                        const userColors = ["#7fba40", "#1c3fc8", "#a5276d", "#913ca7", "#4332b6", "#266bc5", "#5bc3c1", "#d87539", "#a9ad47", "#3ca13b", "#4db89a", "#6a4691", "#f5a623", "#e7719e", "#9fcbef", "#7b4b4b"];
	                        if (out.result) {
	                            for (let value of out.result.rows) {
	                                if (value.user_login.toLowerCase().trim() == element.getAttribute('username').split('@').join('').toLowerCase().toLowerCase().trim()) {
	                                    color = userColors[value.user_id % (userColors.length - 1)];
	                                    break;
	                                }
	                            }
	                        }
	                        element.style.color = color;
	                    };
	                    oReq.open("get", `https://wasd.tv/api/search/profiles?limit=999&offset=0&search_phrase=${element.getAttribute('username').split('@').join('').toLowerCase().trim()}`, true); oReq.send();

	                }
	            }

	            function usercolor(channel_name) {
	                // ищем цвет по ласт сообщениям тк у api есть задержка
	                let color;
	                if (settings.wasd.colorAtTheMention[1]) {
	                    allNames = document.querySelectorAll('div.info__text__status__name');
	                    for (let element of allNames) {
	                        if (element.getAttribute('username')) {
	                            if(channel_name.split('@').join('').toLowerCase().trim() == element.getAttribute('username').toLowerCase().trim()) {
	                                color = element.style.color;
	                                break;
	                            }
	                        }
	                    }
	                    return color;
	                }
	            }
	        }

	        if (nicknamediv) {
	            if (settings.wasd.onClickUserName[1].toString() === '0') {
	                nicknamediv.style.cursor = 'auto';
	                nicknamediv.style.textDecoration = 'auto';
	                elClone = nicknamediv.cloneNode(true);
	                nicknamediv.parentNode.replaceChild(elClone, nicknamediv);
	                nicknamediv.addEventListener('click', ({ target }) => {
	                    if (target.getAttribute('username')) {
	                        HelperWASD.addUsernameToTextarea(target.getAttribute('username').split('@').join(''));
	                    }
	                });

	            } else if (settings.wasd.onClickUserName[1].toString() === '2') {
	                elClone = nicknamediv.cloneNode(true);
	                nicknamediv.parentNode.replaceChild(elClone, nicknamediv);
	                nicknamediv = node.querySelector('div.info__text__status__name');
	                nicknamediv.addEventListener('click', ({ target }) => {
	                    if (target.getAttribute('username')) {
	                        if (!HelperWASD.addUsernameToTextarea(target.getAttribute('username').split('@').join(''))) {
	                            HelperWASD.createUserViewerCard(target.getAttribute('username').split('@').join(''));
	                        }
	                    }
	                });
	            }
	        }

	        if (settings.wasd.moderatorMenu[1].toString() === '1') {
	            let loading;
	            if (!node.querySelector('div.is-owner') && node.querySelector('div.message__info__icon')) {

	                node.insertAdjacentHTML("beforeend", "<div class='mod'></div>");
	                moderDiv = node.querySelector('div.mod');

	                moderButtonRemove = moderDiv.insertAdjacentHTML("beforeend", "<div><button class='moderButtonRemove ovg primary' title='Удалить сообщение'><svg viewBox='0 0 24 24' focusable='false'><g><path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z'></path></g></svg></button></div>");
	                moderButtonTimeout = moderDiv.insertAdjacentHTML("beforeend", "<div><button class='moderButtonTimeout ovg primary' title='Временно заблокировать'><svg viewBox='0 0 24 24' focusable='false'><g><path d='M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6z'></path></g></svg></button></div>");
	                moderButtonBan = moderDiv.insertAdjacentHTML("beforeend", "<div><button class='moderButtonBan ovg primary' title='Забанить пользователя'><svg viewBox='0 0 24 24' focusable='false'><g><path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z'></path></g></svg></button></div>");

	                messageInfo = node.querySelector('div.message__info');
	                if (messageInfo) {
	                    messageInfo.insertAdjacentHTML("beforeend", `<div class="lds-ring" style="display: none;"><svg x="0px" y="0px" viewBox="0 0 150 150" class="icon-pending-ovg"><circle cx="75" cy="75" r="60" class="icon-pending-inner-ovg"></circle></svg></div>`);
	                    loading = node.querySelector('.lds-ring');
	                }

	                node.addEventListener('mouseover', ({ target }) => {
	                    if (isPressedAlt) {
	                        if (node.querySelector('div.mod')) node.querySelector('div.mod').classList.add('active');
	                    }
	                });
	                node.addEventListener('mousemove', ({ target }) => {
	                    if (isPressedAlt) {
	                        if (node.querySelector('div.mod')) node.querySelector('div.mod').classList.add('active');
	                    }
	                });
	                node.addEventListener('mouseout', ({ target }) => {
	                    if (node.querySelector('div.mod')) if (node.querySelector('div.mod').classList.contains('active')) {
	                        node.querySelector('div.mod').classList.remove('active');
	                    }
	                });

	                node.querySelector('div.mod > div > .moderButtonRemove').addEventListener('click', ({ target }) => {
	                    if (node.querySelector('div.mod').classList.contains('active')) {
	                        node.querySelector('div.mod').classList.remove('active');
	                    }

	                    if (node.querySelector('.message__info__icon > i')) {
                            node.querySelector('.message__info__icon > i').click();
                            contextMenu = node.querySelector('.message__info > .message__info__icon > wasd-chat-context-menu > .context-menu');
                            if (contextMenu) contextMenuBlocks = contextMenu.querySelectorAll('div.context-menu__block');
                            let edited = false;
                            for (i = 0; i < 10; i++) {
                                if (contextMenuBlocks[i]) {
                                    if (contextMenuBlocks[i].querySelector('div.context-menu__block__text').textContent == " Удалить сообщения ") {
                                        contextMenuBlocks[i].click();
                                        //console.log('remove channal author');
                                        document.querySelector('.message__info').click();
                                        edited = true;
                                        loading.style.display = 'inline-block'
                                        if (document.querySelector('.block__popup__body > .block__popup__body__inner > .block__popup__body__inner__text > div > .inner__text__checkbox > label > input.input').checked) {
                                            document.querySelector('.block__popup__body > .block__popup__body__inner > .block__popup__body__inner__text > div > .inner__text__checkbox > label > input.input').click();
                                        }

                                        if (settings.wasd.moderatorMenuAutomatic[1]) {
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
                            }
                        } else {
                            HelperWASD.showChatMessage('Вы не можете этого сделать');
                        }
	                });
	                node.querySelector('div.mod > div > .moderButtonTimeout').addEventListener('click', ({ target }) => {
	                    if (node.querySelector('div.mod').classList.contains('active')) {
	                        node.querySelector('div.mod').classList.remove('active');
	                    }
                        
	                    if (HelperWASD.isModerator) {
                            let data = node.querySelector('.info__text__status__name').getAttribute('username').toLowerCase()
                            fetch(`https://wasd.tv/api/search/profiles?limit=999&offset=0&search_phrase=${data}`)
                            .then(res => res.json())
                            .then((out) => {
                                if (out.result) {
                                    var finded = false;
                                    for (let value of out.result.rows) {

                                        if (value.user_login.toLowerCase().trim() == data) {
                                            finded = true;
                                            fetch(HelperWASD.getStreamBroadcastsUrl())
                                            .then(res => res.json())
                                            .then((out) => {
                                                let response = {
                                                    method: 'PUT',
                                                    body: `{"user_id":${value.user_id},"stream_id":${out.result.media_container.media_container_streams[0].stream_id}, "keep_messages": ${!settings.wasd.keepMessagesTimeout[1]}, "duration": ${settings.wasd.moderatorMenuTimeout[1]}}`,
                                                    headers: {'Content-Type': 'application/json'},
                                                }
                                                fetch(`https://wasd.tv/api/channels/${out.result.channel.channel_id}/banned-users`, response)
                                                .then(res => res.json())
                                                .then((out) => {
                                                    //console.log(out)
                                                    if (out.error.code == 'STREAMER_BAN_ALREADY_EXISTS') {
                                                        HelperWASD.showChatMessage(`Пользователь @${value.user_login} уже заблокирован`);
                                                    } else if (out.error.code == 'USER_BAD_BAN_PERMISSIONS') {
                                                        HelperWASD.showChatMessage(`Вы не можете этого сделать`);
                                                    }
                                                })
                                            })
                                            break;
                                        }
                                    }
                                    if (!finded) {
                                        HelperWASD.showChatMessage('Пользователь не найден');
                                    }
                                }
                            })
                        } else {
                           HelperWASD.showChatMessage('Вы не можете этого сделать');
                        }
	                });
	                node.querySelector('div.mod > div > .moderButtonBan').addEventListener('click', ({ target }) => {
	                    if (node.querySelector('div.mod').classList.contains('active')) {
	                        node.querySelector('div.mod').classList.remove('active');
	                    }

                        if (HelperWASD.isModerator) {
                            let data = node.querySelector('.info__text__status__name').getAttribute('username').toLowerCase()
                            fetch(`https://wasd.tv/api/search/profiles?limit=999&offset=0&search_phrase=${data}`)
                            .then(res => res.json())
                            .then((out) => {
                                if (out.result) {
                                    var finded = false;
                                    for (let value of out.result.rows) {

                                        if (value.user_login.toLowerCase().trim() == data) {
                                            finded = true;
                                            fetch(HelperWASD.getStreamBroadcastsUrl())
                                            .then(res => res.json())
                                            .then((out) => {
                                                let response = {
                                                    method: 'PUT',
                                                    body: `{"user_id":${value.user_id},"stream_id":${out.result.media_container.media_container_streams[0].stream_id}}`,
                                                    headers: {'Content-Type': 'application/json'},
                                                }
                                                fetch(`https://wasd.tv/api/channels/${out.result.channel.channel_id}/banned-users`, response)
                                                .then(res => res.json())
                                                .then((out) => {
                                                    //console.log(out)
                                                    if (out.error.code == 'STREAMER_BAN_ALREADY_EXISTS') {
                                                        HelperWASD.showChatMessage(`Пользователь @${value.user_login} уже заблокирован`);
                                                    } else if (out.error.code == 'USER_BAD_BAN_PERMISSIONS') {
                                                        HelperWASD.showChatMessage(`Вы не можете этого сделать`);
                                                    }
                                                })
                                            })
                                            break;
                                        }
                                    }
                                    if (!finded) {
                                        HelperWASD.showChatMessage('Пользователь не найден');
                                    }
                                }
                            })
                        } else {
                           HelperWASD.showChatMessage('Вы не можете этого сделать');
                        }
	                });
	            }
	        } else if (settings.wasd.moderatorMenu[1].toString() === '2') {
	            let loading;
	            let messageInfoStatus = node.querySelector('div.info__text__status')
	            if (messageInfoStatus && !node.querySelector('div.is-owner') && node.querySelector('div.message__info__icon')) {
	                messageInfoStatus.insertAdjacentHTML("afterbegin", `<div class="info__text__status-paid-ovg button banned" style="background-color: rgb(0 140 255);"><i class="icon-ovg wasd-icons-ban"></i></div>`);
                    messageInfoStatus.insertAdjacentHTML("afterbegin", `<div class="info__text__status-paid-ovg button timeout" style="background-color: rgb(0 140 255);"><i class="icon-ovg wasd-icons-sound-off"></i></div>`);
	                messageInfoStatus.insertAdjacentHTML("afterbegin", `<div class="info__text__status-paid-ovg button remove" style="background-color: rgb(0 140 255);"><i class="icon-ovg wasd-icons-delete"></i></div>`);

	                messageInfo = node.querySelector('div.message__info');
	                if (messageInfo) {
	                    messageInfo.insertAdjacentHTML("beforeend", `<div class="lds-ring" style="display: none;"><svg x="0px" y="0px" viewBox="0 0 150 150" class="icon-pending-ovg"><circle cx="75" cy="75" r="60" class="icon-pending-inner-ovg"></circle></svg></div>`);
	                    loading = node.querySelector('.lds-ring');
	                }

	                messageInfoStatus.querySelector('.info__text__status-paid-ovg.button.banned').addEventListener('click', ({ target }) => {
	                    if (HelperWASD.isModerator) {
                            let data = node.querySelector('.info__text__status__name').getAttribute('username').toLowerCase()
                            fetch(`https://wasd.tv/api/search/profiles?limit=999&offset=0&search_phrase=${data}`)
                            .then(res => res.json())
                            .then((out) => {
                                if (out.result) {
                                    var finded = false;
                                    for (let value of out.result.rows) {

                                        if (value.user_login.toLowerCase().trim() == data) {
                                            finded = true;
                                            fetch(HelperWASD.getStreamBroadcastsUrl())
                                            .then(res => res.json())
                                            .then((out) => {
                                                let response = {
                                                    method: 'PUT',
                                                    body: `{"user_id":${value.user_id},"stream_id":${out.result.media_container.media_container_streams[0].stream_id}}`,
                                                    headers: {'Content-Type': 'application/json'},
                                                }
                                                fetch(`https://wasd.tv/api/channels/${out.result.channel.channel_id}/banned-users`, response)
                                                .then(res => res.json())
                                                .then((out) => {
                                                    //console.log(out)
                                                    if (out.error.code == 'STREAMER_BAN_ALREADY_EXISTS') {
                                                        HelperWASD.showChatMessage(`Пользователь @${value.user_login} уже заблокирован`);
                                                    } else if (out.error.code == 'USER_BAD_BAN_PERMISSIONS') {
                                                        HelperWASD.showChatMessage(`Вы не можете этого сделать`);
                                                    }
                                                })
                                            })
                                            break;
                                        }
                                    }
                                    if (!finded) {
                                        HelperWASD.showChatMessage('Пользователь не найден');
                                    }
                                }
                            })
                        } else {
                           HelperWASD.showChatMessage('Вы не можете этого сделать');
                        }
	                });

                    messageInfoStatus.querySelector('.info__text__status-paid-ovg.button.timeout').addEventListener('click', ({ target }) => {
                        if (HelperWASD.isModerator) {
                            let data = node.querySelector('.info__text__status__name').getAttribute('username').toLowerCase()
                            fetch(`https://wasd.tv/api/search/profiles?limit=999&offset=0&search_phrase=${data}`)
                            .then(res => res.json())
                            .then((out) => {
                                if (out.result) {
                                    var finded = false;
                                    for (let value of out.result.rows) {

                                        if (value.user_login.toLowerCase().trim() == data) {
                                            finded = true;
                                            fetch(HelperWASD.getStreamBroadcastsUrl())
                                            .then(res => res.json())
                                            .then((out) => {
                                                let response = {
                                                    method: 'PUT',
                                                    body: `{"user_id":${value.user_id},"stream_id":${out.result.media_container.media_container_streams[0].stream_id}, "keep_messages": ${!settings.wasd.keepMessagesTimeout[1]}, "duration": ${settings.wasd.moderatorMenuTimeout[1]}}`,
                                                    headers: {'Content-Type': 'application/json'},
                                                }
                                                fetch(`https://wasd.tv/api/channels/${out.result.channel.channel_id}/banned-users`, response)
                                                .then(res => res.json())
                                                .then((out) => {
                                                    //console.log(out)
                                                    if (out.error.code == 'STREAMER_BAN_ALREADY_EXISTS') {
                                                        HelperWASD.showChatMessage(`Пользователь @${value.user_login} уже заблокирован`);
                                                    } else if (out.error.code == 'USER_BAD_BAN_PERMISSIONS') {
                                                        HelperWASD.showChatMessage(`Вы не можете этого сделать`);
                                                    }
                                                })
                                            })
                                            break;
                                        }
                                    }
                                    if (!finded) {
                                        HelperWASD.showChatMessage('Пользователь не найден');
                                    }
                                }
                            })
                        } else {
                           HelperWASD.showChatMessage('Вы не можете этого сделать');
                        }
                    });

	                messageInfoStatus.querySelector('.info__text__status-paid-ovg.button.remove').addEventListener('click', ({ target }) => {
	                    if (node.querySelector('.message__info__icon > i')) {
	                        node.querySelector('.message__info__icon > i').click();
	                        contextMenu = node.querySelector('.message__info > .message__info__icon > wasd-chat-context-menu > .context-menu');
	                        if (contextMenu) contextMenuBlocks = contextMenu.querySelectorAll('div.context-menu__block');
	                        let edited = false;
	                        for (i = 0; i < 10; i++) {
                                if (contextMenuBlocks[i]) {
                                    if (contextMenuBlocks[i].querySelector('div.context-menu__block__text').textContent == " Удалить сообщения ") {
                                        contextMenuBlocks[i].click();
                                        //console.log('remove channal author');
                                        document.querySelector('.message__info').click();
                                        edited = true;
                                        loading.style.display = 'inline-block'
                                        if (document.querySelector('.block__popup__body > .block__popup__body__inner > .block__popup__body__inner__text > div > .inner__text__checkbox > label > input.input').checked) {
                                            document.querySelector('.block__popup__body > .block__popup__body__inner > .block__popup__body__inner__text > div > .inner__text__checkbox > label > input.input').click();
                                        }

                                        if (settings.wasd.moderatorMenuAutomatic[1]) {
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
                            }
	                    } else {
	                        HelperWASD.showChatMessage('Вы не можете этого сделать');
	                    }
	                });
	            }
	        }
	        
	        a = node.querySelector('div.message-text a');


	        switch (settings.wasd.linkRecognitionRights[1].toString()) {
	            case '0':
	                if (node.querySelector('.is-owner')) linkRecognizerGo()
	                break;
	            case '1':
	                if (node.querySelector('.is-owner') || node.querySelector('.is-moderator')) linkRecognizerGo()
	                break;
	            case '2':
	                if (node.querySelector('.is-owner') || node.querySelector('.is-moderator') || node.querySelector('.info__text__status-paid')) linkRecognizerGo()
	                break;
	            case '3':
	                linkRecognizerGo()
	                break;
	        }
	        function linkRecognizerGo() {
	            if (a) {

	                if (new URL(a.href).host == "wasd.tv" && new URL(a.href).searchParams.get('record') != null) {
	                    if (settings.wasd.linkRecognizerWASD[1]) {
	                        if (node) {
	                            node.insertAdjacentHTML("beforeend", `<div style=" font-size: 11px; margin: 5px;" class="ovg-bg-color-prime tw-border-radius-medium tw-elevation-1 ffz--chat-card tw-relative" style=""><div class="tw-border-radius-medium tw-c-background-base tw-flex tw-full-width"><a data-tooltip-type="link" style="text-decoration: none" data-url="${a.href}" target="_blank" rel="noreferrer noopener" href="${a.href}" class="ffz-interactable--hover-enabled tw-block tw-border-radius-medium tw-full-width ffz-interactable--default tw-interactive"><div class="tw-flex tw-flex-nowrap tw-pd-05"><div class="ffz--header-image" style="height:4.8rem;max-width:25%"></div><div class="ffz--card-text tw-full-width tw-overflow-hidden tw-flex tw-flex-column tw-justify-content-center"><div title="Загрузка..." class="tw-c-text-alt-2 tw-ellipsis tw-mg-x-05">Загрузка...</div></div></div></a></div></div>`);
	                            HelperWASD.scrollChatMessage(node, 50)
	                        }
	                        let linkService = `https://wasd.tv/api/v2/media-containers/${new URL(a.href).searchParams.get('record')}`;
	                        let href = a.href;

	                        var oReq = new XMLHttpRequest();
	                        oReq.onload = (out) => {
	                            var out = JSON.parse(oReq.responseText);
	                            var game = 'неизвестно'
	                            if(out.result.game != null) game = out.result.game.game_name;
	                            node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${out.result.media_container_streams[0].stream_media[0].media_meta.media_preview_images.small}" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${out.result.media_container_name}" class="tw-ellipsis tw-semibold tw-mg-x-05">${out.result.media_container_name}</div><div title="${out.result.media_container_channel.channel_name} играет в ${game}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05"><a target="_blank" href="https://wasd.tv/user/${out.result.user_id}">${out.result.media_container_channel.channel_name}</a> играет в ${game}</div><div title="${out.result.created_at} - ${out.result.media_container_streams[0].stream_total_viewers} просмотров" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${new Date(out.result.created_at).toLocaleDateString()} - ${out.result.media_container_streams[0].stream_total_viewers} просмотров</div></div></div></div>`;
	                        };
	                        oReq.onerror = (err) => {
	                            console.log('не удалось получить данные из сервера');
	                            node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;

	                        };
	                        oReq.open("get", linkService, true); oReq.send();

	                    }

	                } else if (new URL(a.href).host == "wasd.tv" && new URL(a.href).searchParams.get('clip') != null) {
	                    if (settings.wasd.linkRecognizerWASD[1]) {
	                        if (node) {
	                            node.insertAdjacentHTML("beforeend", `<div style=" font-size: 11px; margin: 5px;" class="ovg-bg-color-prime tw-border-radius-medium tw-elevation-1 ffz--chat-card tw-relative" style=""><div class="tw-border-radius-medium tw-c-background-base tw-flex tw-full-width"><a data-tooltip-type="link" style="text-decoration: none" data-url="${a.href}" target="_blank" rel="noreferrer noopener" href="${a.href}" class="ffz-interactable--hover-enabled tw-block tw-border-radius-medium tw-full-width ffz-interactable--default tw-interactive"><div class="tw-flex tw-flex-nowrap tw-pd-05"><div class="ffz--header-image" style="height:4.8rem;max-width:25%"></div><div class="ffz--card-text tw-full-width tw-overflow-hidden tw-flex tw-flex-column tw-justify-content-center"><div title="Загрузка..." class="tw-c-text-alt-2 tw-ellipsis tw-mg-x-05">Загрузка...</div></div></div></a></div></div>`);
	                            HelperWASD.scrollChatMessage(node, 50)
	                        }
	                        let linkService = `https://wasd.tv/api/v2/clips/${new URL(a.href).searchParams.get('clip')}`;
	                        let href = a.href;

	                        var oReq = new XMLHttpRequest();
	                        oReq.onload = (out) => {
	                            var out = JSON.parse(oReq.responseText);

                                if (!out?.error?.code) {
                                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${out.result.clip_data.preview.small}" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${out.result.clip_title}" class="tw-ellipsis tw-semibold tw-mg-x-05">${out.result.clip_title}</div><div title="${out.result.clip_channel.channel_name} играет в ${out.result.clip_game_name}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05"><a target="_blank" href="https://wasd.tv/user/${out.result.clip_channel.user_id}">${out.result.clip_channel.channel_name}</a> играет в ${out.result.clip_game_name}</div><div title="Автор клипа: ${out.result.clip_owner_login} - ${out.result.clip_views_count} просмотров" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">Автор клипа: <a target="_blank" href="https://wasd.tv/user/${out.result.clip_owner_profile_id}">${out.result.clip_owner_login}</a> - ${out.result.clip_views_count} просмотров</div></div></div></div>`;
                                } else {
                                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="${out.error.code}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.error.code}</div></div></div></div>`;
                                }

                            };
	                        oReq.onerror = (err) => {
	                            console.log('не удалось получить данные из сервера');
	                            node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;

	                        };
	                        oReq.open("get", linkService, true); oReq.send();

	                    }
	                        
	                } else if (new URL(a.href).host == "wasd.tv" && new URL(a.href).pathname.split('/')[1] == "games") {
	                    if (settings.wasd.linkRecognizerWASD[1]) {
	                        if (node) {
	                            node.insertAdjacentHTML("beforeend", `<div style=" font-size: 11px; margin: 5px;" class="ovg-bg-color-prime tw-border-radius-medium tw-elevation-1 ffz--chat-card tw-relative" style=""><div class="tw-border-radius-medium tw-c-background-base tw-flex tw-full-width"><a data-tooltip-type="link" style="text-decoration: none" data-url="${a.href}" target="_blank" rel="noreferrer noopener" href="${a.href}" class="ffz-interactable--hover-enabled tw-block tw-border-radius-medium tw-full-width ffz-interactable--default tw-interactive"><div class="tw-flex tw-flex-nowrap tw-pd-05"><div class="ffz--header-image" style="height:4.8rem;max-width:25%"></div><div class="ffz--card-text tw-full-width tw-overflow-hidden tw-flex tw-flex-column tw-justify-content-center"><div title="Загрузка..." class="tw-c-text-alt-2 tw-ellipsis tw-mg-x-05">Загрузка...</div></div></div></a></div></div>`);
	                            HelperWASD.scrollChatMessage(node, 50)
	                        }
	                        let linkService = `https://wasd.tv/api/games/${new URL(a.href).pathname.split('/')[2]}`;
	                        let href = a.href;

	                        var oReq = new XMLHttpRequest();
	                        oReq.onload = (out) => {
                                var out = JSON.parse(oReq.responseText);

                                console.log(out)

                                if (!out?.error?.code) {
                                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${out.result.game_icon.small}" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${out.result.game_asset_name}" class="tw-ellipsis tw-semibold tw-mg-x-05">${out.result.game_asset_name}</div><div title="${out.result.game_description}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.result.game_description != null ? out.result.game_description : 'Нет описания'}</div></div></div></div>`;
                                } else {
                                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="${out.error.code}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.error.code}</div></div></div></div>`;
                                }

	                        };
	                        oReq.onerror = (err) => {
	                            console.log('не удалось получить данные из сервера');
	                            node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;

	                        };
	                        oReq.open("get", linkService, true); oReq.send();

	                    }

	                } else if (new URL(a.href).host == "wasd.tv") {
	                    if (settings.wasd.linkRecognizerWASD[1]) {
	                        if (node) {
	                            node.insertAdjacentHTML("beforeend", `<div style=" font-size: 11px; margin: 5px;" class="ovg-bg-color-prime tw-border-radius-medium tw-elevation-1 ffz--chat-card tw-relative" style=""><div class="tw-border-radius-medium tw-c-background-base tw-flex tw-full-width"><a data-tooltip-type="link" style="text-decoration: none" data-url="${a.href}" target="_blank" rel="noreferrer noopener" href="${a.href}" class="ffz-interactable--hover-enabled tw-block tw-border-radius-medium tw-full-width ffz-interactable--default tw-interactive"><div class="tw-flex tw-flex-nowrap tw-pd-05"><div class="ffz--header-image" style="height:4.8rem;max-width:25%"></div><div class="ffz--card-text tw-full-width tw-overflow-hidden tw-flex tw-flex-column tw-justify-content-center"><div title="Загрузка..." class="tw-c-text-alt-2 tw-ellipsis tw-mg-x-05">Загрузка...</div></div></div></a></div></div>`);
	                            HelperWASD.scrollChatMessage(node, 50)
	                        }
	                        let linkService = 'https://wasd.tv/api/v2/broadcasts/public?channel_name=' + new URL(a.href).pathname.split('/')[1];
	                        let href = a.href;

	                        var oReq = new XMLHttpRequest();
	                        oReq.onload = (out) => {
	                            var out = JSON.parse(oReq.responseText);
	                            if (typeof out.error !== 'undefined') {
	                                node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;
	                            } else {
	                                node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${out.result.channel.channel_image.small}" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${out.result.channel.channel_name}" class="tw-ellipsis tw-semibold tw-mg-x-05">${out.result.channel.channel_name}</div><div title="${out.result.channel.channel_description}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.result.channel.channel_description}</div></div></div></div>`;
	                            }
	                        };
	                        oReq.onerror = (err) => {
	                            console.log('не удалось получить данные из сервера');
	                            node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;

	                        };
	                        oReq.open("get", linkService, true); oReq.send();
	                        
	                    }

	                } else if (new URL(a.href).host == "www.twitch.tv") {
	                    if (settings.wasd.linkRecognizerWASD[1]) {
	                        if (node) {
	                            node.insertAdjacentHTML("beforeend", `<div style=" font-size: 11px; margin: 5px;" class="ovg-bg-color-prime tw-border-radius-medium tw-elevation-1 ffz--chat-card tw-relative" style=""><div class="tw-border-radius-medium tw-c-background-base tw-flex tw-full-width"><a data-tooltip-type="link" style="text-decoration: none" data-url="${a.href}" target="_blank" rel="noreferrer noopener" href="${a.href}" class="ffz-interactable--hover-enabled tw-block tw-border-radius-medium tw-full-width ffz-interactable--default tw-interactive"><div class="tw-flex tw-flex-nowrap tw-pd-05"><div class="ffz--header-image" style="height:4.8rem;max-width:25%"></div><div class="ffz--card-text tw-full-width tw-overflow-hidden tw-flex tw-flex-column tw-justify-content-center"><div title="Загрузка..." class="tw-c-text-alt-2 tw-ellipsis tw-mg-x-05">Загрузка...</div></div></div></a></div></div>`);
	                            HelperWASD.scrollChatMessage(node, 50)
	                        }
	                        let linkService = `https://api-test.frankerfacez.com/v2/link?url=${a.href}`;
	                        let href = a.href;

	                        var oReq = new XMLHttpRequest();
	                        oReq.onload = (out) => {
	                            var out = JSON.parse(oReq.responseText);

	                            if (!out.short.subtitle) {
	                                //console.log("1111 - "+ href);
	                                let img = '';
	                                if (typeof out.short.image != "undefined") {
	                                    img = out.short.image.url;
	                                }
	                                node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${img}" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${out.short.title}" class="tw-ellipsis tw-semibold tw-mg-x-05">${out.short.title}</div></div></div></div>`;
	                            } else {
	                                //console.log(out)
	                                //console.log("2222 - "+ href);
	                                let img = '';
	                                if (typeof out.short.image != "undefined") {
	                                    img = out.short.image.url;
	                                }
	                                node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${img}" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${out.short.title}" class="tw-ellipsis tw-semibold tw-mg-x-05">${out.short.title}</div><div title="${out.short.subtitle.content.user.content.content}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.short.subtitle.content.user.content.content}</div></div></div></div>`;
	                            }
	                            
	                            if (out.error) {
	                                node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;
	                            }
	                        };
	                        oReq.onerror = (err) => {
	                            console.log('не удалось получить данные из сервера');
	                            node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;

	                        };
	                        oReq.open("get", linkService, true); oReq.send();
	                        
	                    }
	                        
	                } else {
	                    if (settings.wasd.linkRecognizerall[1]) {

	                        if (node) {
	                            node.insertAdjacentHTML("beforeend", `<div style=" font-size: 11px; margin: 5px;" class="ovg-bg-color-prime tw-border-radius-medium tw-elevation-1 ffz--chat-card tw-relative" style=""><div class="tw-border-radius-medium tw-c-background-base tw-flex tw-full-width"><a data-tooltip-type="link" style="text-decoration: none" data-url="${a.href}" target="_blank" rel="noreferrer noopener" href="${a.href}" class="ffz-interactable--hover-enabled tw-block tw-border-radius-medium tw-full-width ffz-interactable--default tw-interactive"><div class="lrhiverimg"></div><div class="tw-flex tw-flex-nowrap tw-pd-05"><div class="ffz--header-image" style="height:4.8rem;max-width:25%"></div><div class="ffz--card-text tw-full-width tw-overflow-hidden tw-flex tw-flex-column tw-justify-content-center"><div title="Загрузка..." class="tw-c-text-alt-2 tw-ellipsis tw-mg-x-05">Загрузка...</div></div></div></a></div></div>`);
	                            HelperWASD.scrollChatMessage(node, 50)
	                        }
	                        let linkService = `https://api-test.frankerfacez.com/v2/link?url=${a.href}`;
	                        let href = a.href;

                            let img = ''

	                        var oReq = new XMLHttpRequest();
	                        oReq.onload = (out) => {
	                            var out = JSON.parse(oReq.responseText);

                                if (out?.error?.phrase) {
                                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="${out?.error?.phrase}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out?.error?.phrase}</div></div></div></div>`;
                                } else if ( new URL(href).host == "youtu.be" || new URL(href).host == "m.youtube.com" || new URL(href).host == "youtube.be" || (new URL(href).host == "www.youtube.com" && new URL(href).pathname == "/watch"))  {
                                    let imgdiv = ''
                                    if (typeof out?.short?.image?.url != 'undefined') {
                                        img = `<div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${out.short.image.url}" class=""></div>`
                                    } else {
                                        img = ''
                                    }
                                    var dater = new Date(Number(out?.full?.[0]?.content?.items?.[0]?.["bottom-right"]?.value)*1000)
                                    var textdate = `${(dater.getUTCHours() < 10) ? '0' + dater.getUTCHours() : ((dater.getUTCDate()*24) + dater.getUTCHours())}:${(dater.getUTCMinutes() < 10) ? '0' + dater.getUTCMinutes() : dater.getUTCMinutes()}:${(dater.getUTCSeconds() < 10) ? '0' + dater.getUTCSeconds() : dater.getUTCSeconds()}`
                                    node.querySelector('.lrhiverimg').innerHTML = `<div class="ffz__tooltip--inner ffz-rich-tip tw-align-left">
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
                                    </div>`
                                    imgdiv = ``
                                    node.querySelector('.ffz--header-image').innerHTML = `<div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05 ffz--header-aspect" style="width:8.53333rem">${img}</div>`

	                                node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${out?.short?.title}" class="tw-ellipsis tw-semibold tw-mg-x-05">${out?.short?.title}</div><div title="${out?.short?.subtitle?.content?.channel} • ${out?.short?.subtitle?.content?.views.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} • 👍 ${out?.short?.subtitle?.content?.likes.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}  • 👎 ${out?.short?.subtitle?.content?.dislikes.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out?.short?.subtitle?.content?.channel} • ${out?.short?.subtitle?.content?.views.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} • 👍 ${out?.short?.subtitle?.content?.likes.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}  • 👎 ${out?.short?.subtitle?.content?.dislikes.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}</div><div title="${out?.short?.extra?.[1]} ${new Date(out?.short?.extra?.[2]?.attrs?.datetime).toLocaleDateString()}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05"><span class="ffz-i-youtube-play"></span>${out?.short?.extra?.[1]}<time datetime="${out?.short?.extra?.[2]?.attrs?.datetime}" class="">${new Date(out?.short?.extra?.[2]?.attrs?.datetime).toLocaleDateString()}</time></div></div></div></div>`;
	                            } else if (out?.short?.title) {
	                                if (typeof out.error == 'undefined') {
	                                    if (!out?.short?.subtitle) {
	                                        if (typeof out?.short?.image?.url != 'undefined') {
                                                img = `<div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${out.short.image.url}" class=""></div>`
                                            } else {
                                                img = ''
                                            }
                                            var dater = new Date(Number(out?.full?.[0]?.content?.items?.[0]?.["bottom-right"]?.value)*1000)
                                            var textdate = `${(dater.getUTCHours() < 10) ? '0' + dater.getUTCHours() : ((dater.getUTCDate()*24) + dater.getUTCHours())}:${(dater.getUTCMinutes() < 10) ? '0' + dater.getUTCMinutes() : dater.getUTCMinutes()}:${(dater.getUTCSeconds() < 10) ? '0' + dater.getUTCSeconds() : dater.getUTCSeconds()}`
                                            node.querySelector('.lrhiverimg').innerHTML = `<div class="ffz__tooltip--inner ffz-rich-tip tw-align-left">
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
                                                        ${typeof out?.full?.[2]?.content == 'string' ? `<div class="tw-white-space-pre-wrap ffz--line-clamp tw-mg-y-05" title="${out.full?.[2].content}" style="--ffz-lines:5;">${out.full?.[2].content}</div>` : ``}
                                                        ${out?.short?.extra?.[2]?.attrs?.datetime ? `
                                                            <div class="tw-flex tw-full-width tw-overflow-hidden ffz--rich-header ffz--compact-header tw-align-items-center">
                                                                <div class="tw-ellipsis tw-c-text-alt-2" title="${out.short.extra?.[1]}${new Date(out.short.extra?.[2].attrs.datetime).toLocaleDateString()}"><span class="ffz-i-youtube-play"></span>${out.short.extra?.[1]}<time datetime="${out.short.extra?.[2].attrs.datetime}" class="">${new Date(out.short.extra?.[2].attrs.datetime).toLocaleDateString()}</time></div>
                                                            </div>
                                                        ` : ``}
                                                    </div>
                                                </div>
                                            </div>`
	                                        
	                                        node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05">${img}<div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${out?.short?.title}" class="tw-ellipsis tw-semibold tw-mg-x-05">${out?.short?.title}</div></div></div></div>`;
	                                    } else {
	                                        if (typeof out?.short?.image?.url != 'undefined') {
	                                            img = `<div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${out.short.image.url}" class=""></div>`
                                            } else {
                                                img = ''
                                            }
                                            var dater = new Date(Number(out?.full?.[0]?.content?.items?.[0]?.["bottom-right"]?.value)*1000)
                                            var textdate = `${(dater.getUTCHours() < 10) ? '0' + dater.getUTCHours() : ((dater.getUTCDate()*24) + dater.getUTCHours())}:${(dater.getUTCMinutes() < 10) ? '0' + dater.getUTCMinutes() : dater.getUTCMinutes()}:${(dater.getUTCSeconds() < 10) ? '0' + dater.getUTCSeconds() : dater.getUTCSeconds()}`
                                            node.querySelector('.lrhiverimg').innerHTML = `<div class="ffz__tooltip--inner ffz-rich-tip tw-align-left">
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
                                            </div>`
	                                        
	                                        node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header">${img}<div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${out?.short?.title}" class="tw-ellipsis tw-semibold tw-mg-x-05">${out?.short?.title}</div><div title="${out?.short?.subtitle}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out?.short?.subtitle}</div></div></div></div>`;
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
                                    var dater = new Date(Number(out?.full?.[0]?.content?.items?.[0]?.["bottom-right"]?.value)*1000)
                                    var textdate = `${(dater.getUTCHours() < 10) ? '0' + dater.getUTCHours() : ((dater.getUTCDate()*24) + dater.getUTCHours())}:${(dater.getUTCMinutes() < 10) ? '0' + dater.getUTCMinutes() : dater.getUTCMinutes()}:${(dater.getUTCSeconds() < 10) ? '0' + dater.getUTCSeconds() : dater.getUTCSeconds()}`
                                    node.querySelector('.lrhiverimg').innerHTML = `<div class="ffz__tooltip--inner ffz-rich-tip tw-align-left">
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
                                    </div>`
                                    
                                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header">${img}<div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${out?.base}" class="tw-ellipsis tw-semibold tw-mg-x-05">${out?.base}</div></div></div></div>`;
                                }
	                        };
	                        oReq.onerror = (err) => {
	                            console.log('не удалось получить данные из сервера');
	                            node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;
                                
	                        };
	                        oReq.open("get", linkService, true); oReq.send();
	                    }
	                }
	            }
	        }

	        if (node.querySelector('div.message__info__icon > i')) {
	            node.querySelector('div.message__info__icon > i').addEventListener('click', () => {
	                context_menu = node.querySelector('.context-menu')
	                if (context_menu) {
	                    let item = document.createElement('div')
	                    item.classList.add(`context-menu__block`)
	                    item.innerHTML = `<div class="context-menu__block__icon"><i class="icon wasd-icons-cross"></i></div><div class="context-menu__block__text"> Добавить в ЧС </div>`;
	                    context_menu.append(item)
	                    item.addEventListener('click', ({ target }) => {
	                        let username = node.querySelector('.info__text__status__name').getAttribute('username');
	                        if (!settings.wasd.blockUserList[username]) {
	                            HelperWASD.showChatMessage(`Пользователь ${username} добавлен в ЧС`, 'success')
	                            settings.wasd.blockUserList[username] = new Date();
	                            HelperWASD.addUserToBlackList(username)
	                            HelperSettings.save([document.querySelector('.optionField')]);
	                        } else {
	                            HelperWASD.showChatMessage('Пользователь уже в ЧС, обновите чат!')
	                        }
	                        node.click()
	                    })
	                }
	            })
	        }

	        if (settings.wasd.sticker[1].toString() === '3') {
	            sticker = node.querySelector(`.message__info__text img.sticker`);
	            if (sticker) {
	                node.remove();
	                newMessage = document.querySelector(`div.block__new-messages`);
	                if (newMessage) {
	                    newMessage.remove();
	                }
	            }
	        } else if (settings.wasd.sticker[1].toString() === '4') {
	            sticker = node.querySelector(`.message__info__text img.sticker`);
	            if (sticker) {
	                messageText = node.querySelector(`.message-text > span`);
	                messageText.innerHTML = "<span class='chat-message-text stickertext'>Стикер</span>";
	                newMessage = document.querySelector(`div.block__new-messages`);
	                if (newMessage) {
	                    newMessage.remove();
	                }
	            }
	        }

	        if (settings.wasd.stickerovg[1].toString() === '3') {
	            stickerovg = node.querySelector(`.message__info__text img.stickerovg`);
	            if (stickerovg) {
	                node.remove();
	                newMessage = document.querySelector(`div.block__new-messages`);
	                if (newMessage) {
	                    newMessage.remove();
	                }
	            }
	        } else if (settings.wasd.stickerovg[1].toString() === '4') {
	            stickerovg = node.querySelector(`.message__info__text img.stickerovg`);
	            if (stickerovg) {
	                messageText = node.querySelector(`.message-text > span`);
	                messageText.innerHTML = "<span class='chat-message-text stickertext'>Стикер</span>";
	                stickerovg.stylnewMessage = document.querySelector(`div.block__new-messages`);
	                newMessage = document.querySelector(`div.block__new-messages`);
	                if (newMessage) {
	                    newMessage.remove();
	                }
	            }
	        }

	        var mentoinText;
	        if (settings.wasd.clickMentionAll[1] && node.querySelector('wasd-chat-follower-message')) {
	            mentoinText = node.querySelector('.message-follower__name')
	        }
	        if (settings.wasd.clickMentionAll[1] && node.querySelector('wasd-chat-subscribe-message')) {
	            mentoinText = node.querySelector('.block__item__title')
	        }
	        if (mentoinText) {
	            let mentoinusername = settings.wasd.userNameEdited[mentoinText.textContent.trim().split('@').join('')];
	            if (!mentoinusername) {mentoinusername = mentoinText.textContent.trim().split('@').join('')}

	            if (settings.wasd.onClickMention[1].toString() === '0') {

	                mentoinText.innerHTML = `<span style='color: ${usercolor(mentoinText.textContent.trim())};' class='chat-message-mention' username="@${mentoinText.textContent.trim()}">${mentoinusername}</span>`
	                node.querySelectorAll('.chat-message-mention').forEach(element => {
	                    usercolorapi(element);
	                    element.addEventListener('click', ({ target }) => {
	                        if (target.getAttribute('username')) {
	                            HelperWASD.addUsernameToTextarea(target.getAttribute('username').split('@').join(''));
	                        }
	                    });
	                });

	            } else if (settings.wasd.onClickMention[1].toString() === '1') {
	                mentoinText.innerHTML = `<span style='color: ${usercolor(mentoinText.textContent.trim())};' class='chat-message-mention click' username="@${mentoinText.textContent.trim()}">${mentoinusername}</span>`
	                node.querySelectorAll('.chat-message-mention.click').forEach(element => {
	                    usercolorapi(element);
	                    element.addEventListener('click', ({ target }) => {
	                        if (textarea) {
	                            textarea.value+=target.getAttribute('username').trim()+' ';
	                            textarea.dispatchEvent(new Event('input'));
	                            textarea.focus()
	                        }
	                    })
	                });

	            } else if (settings.wasd.onClickMention[1].toString() === '2') {
	                mentoinText.innerHTML = `<span style='color: ${usercolor(mentoinText.textContent.trim())};' class='chat-message-mention click' username="@${mentoinText.textContent.trim()}">${mentoinusername}</span>`
	                node.querySelectorAll('.chat-message-mention.click').forEach(element => {
	                    usercolorapi(element);
	                    element.addEventListener('click', ({ target }) => {
	                        if (target.getAttribute('username')) {
	                            if (!HelperWASD.addUsernameToTextarea(target.getAttribute('username').split('@').join(''))) {
	                                HelperWASD.createUserViewerCard(target.getAttribute('username').split('@').join(''));
	                            }
	                        }
	                    })
	                });
	            }

	            function usercolorapi(element) {
	                // ищем цвет по api если по ласт сообщениям не нашли
	                if (element.style.color == '' && settings.wasd.colorAtTheMention[1]) {
	                    color = "rgba(var(--wasd-color-switch--rgb),.88);";

	                    var oReq = new XMLHttpRequest();
	                    oReq.onload = (out) => {
	                        var out = JSON.parse(oReq.responseText);
	                        let data;
	                        const userColors = ["#7fba40", "#1c3fc8", "#a5276d", "#913ca7", "#4332b6", "#266bc5", "#5bc3c1", "#d87539", "#a9ad47", "#3ca13b", "#4db89a", "#6a4691", "#f5a623", "#e7719e", "#9fcbef", "#7b4b4b"];
	                        if (out.result) {
	                            for (let value of out.result.rows) {
	                                if (value.user_login.toLowerCase().trim() == element.getAttribute('username').split('@').join('').toLowerCase().toLowerCase().trim()) {
	                                    color = userColors[value.user_id % (userColors.length - 1)];
	                                    break;
	                                }
	                            }
	                        }
	                        element.style.color = color;
	                    };
	                    oReq.open("get", `https://wasd.tv/api/search/profiles?limit=999&offset=0&search_phrase=${element.getAttribute('username').split('@').join('').toLowerCase().trim()}`, true); oReq.send();

	                }
	            }

	            function usercolor(channel_name) {
	                // ищем цвет по ласт сообщениям тк у api есть задержка
	                let color;
	                if (settings.wasd.colorAtTheMention[1]) {
	                    allNames = document.querySelectorAll('div.info__text__status__name');
	                    for (let element of allNames) {
	                        if (element.getAttribute('username')) {
	                            if(channel_name.split('@').join('').toLowerCase().trim() == element.getAttribute('username').toLowerCase().trim()) {
	                                color = element.style.color;
	                                break;
	                            }
	                        }
	                    }
	                    return color;
	                }
	            }
	        }
	    }
	},
};