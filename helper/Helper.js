const Helper = {
    getDefaultSettings() {
        return {
            general: {
                isUpdatedToNewSettings: false,
                autoUpdateChat: [false, false],
            },
            wasd: {
                messageFollower: [false, false],
                messageSub: [false, false],
                messageSystem: [false, false],
                messageHover: [true, true],
                wasdIconsSmile: [false, false],
                wasdIconsCircleRu: [false, false],
                webkitScrollbarWidth: [false, false],
                giftsWrapperSide: [false, false],
                giftsWrapperTopRight: [false, false],
                sticker: [2, 2],
                stickerovg: [2, 2],
                paddingChatMessage: [4, 4],
                colonAfterNickname: [false, false],
                linkColor: ['#000000', '#000000'],
                colorAtTheMention: [true, true],
                chatOnTheLeft: [false, false],
                chatWidth: [320, 320],
                hideDonationChannelButton: [false, false],
                hideAmazingChannelButtoan: [false, false],
                hideGiftButtons: [false, false],
                highlightMessagesBold: [true, true],
                streamerMessage: [false, false],
                fontSize: [14, 14],
                topPanel: [false, false],
                topPanelChallenge: [false, false],
                pictureInPicture: [true, true],
                resetToPlayer: [false, false],
                moderatorMenu: [0, 0],
                moderatorMenuAutomatic: [true, true],
                autoPlayStreamersOnMain: [true, true],
                pressedFullScreen: [true, true],
                pressedTheater: [true, true],
                pressedPIP: [true, true],
                pressedClip: [true, true],
                alternatingColorChatMessages: [false, false],
                alternatingColorChatMessagesColor: ['#000000', '#000000'],
                onClickMention: [2, 2],
                onClickUserName: [1, 1],
                fixedLinks: [true, true],
                uptimeStream: [true, true],
                bttvEmotes: [true, true],
                bttvInChatMenu: [true, true],
                bttvEmoteSize: [2, 2],
                linkRecognizerall: [true, true],
                linkRecognizerWASD: [true, true],
                decorationLink: [true, true],
                videoOverlay: [false, false],
                userNameEdited: {},
                onClickUser: [2, 2],
                blockUserList: {},
                removeMentionBL: [true, true],
                hidePanelMobile: [true, true],
                formatMessageSentTime: ['H:mm', 'H:mm'],
                mentionSelf: [true, true],
                colorMentionSelf: ['#000000', '#000000'],
                highlightMessagesOpenCard: [false, false],
                highlightMessagesOpenCardColor: ['#000000', '#000000'],
                alwaysOpenVolumeControl: [false, false],
                colorMessageHover: ['#000000', '#000000'],
                bttvSize: ['56px', '56px'],
                mutePlayerOnMiddleMouse: [false, false],
                hideBannerOnHome: [false, false],
                hideSelectorStreamSettings: [false, false],
                clickMentionAll: [true, true],
                underlineUsernameAndMention: [true, true],
                iframeCreateClip: [false, false],
                linkRecognitionRights: [3, 3],
                artificialChatDelay: [0, 0],
                forceResizeStickers: [2, 2],
                ffzEmotes: [true, true],
                ffzInChatMenu: [true, true],
                decreaseIndentationStickerMenu: [false, false],
                decreaseIndentationSmilesMenu: [false, false],
                decreaseIndentationBTTVandFFZMenu: [false, false],
                highlightStickersStickerMenu: [false, false],
                hideGreatRandom: [false, false],
                moderatorMenuTimeout: [10, 10],
                keepMessagesTimeout: [false, false],
                chatMobilePlayer: [false, false],
                colorModOptions: ['#000000', '#000000'],
            }
        };
    },
    fetch(...args) {
        return new Promise((resolve, reject) => {
            console.log(...args)
            $.ajax({
                ...args,
                success: function(out, textStatus, jqXHR){
                    //console.log(out, textStatus, jqXHR)
                    resolve(out);
                },
                error: function(data){
                    reject(data.error);
                },
            });
            // fetch(...args).then((response) => {
            //     response.json().then((json) => {
            //         if (response.status === 200) {
            //             resolve(json);
            //         } else {
            //             reject(json);
            //         }
            //     });
            // });

        });
    },
    getSettings() {
        return new Promise((resolve, reject) => {
            if (typeof chrome !== 'undefined') {
                chrome.storage[storageType].get((items) => {
                    let defaultSettings = this.getDefaultSettings();
                    items = items || {};

                    for (let key in defaultSettings) {
                        if (defaultSettings.hasOwnProperty(key)) {
                            items[key] = Object.assign(defaultSettings[key], items[key] || {});
                        }
                    }
                    resolve(items);
                });
            } else {
                reject('browser not supported?');
            }
        });
    },
}