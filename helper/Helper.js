const Helper = {
    F5: `<a style="position: relative;">(F5)<ovg-tooltip><div class="tooltip tooltip_position-right tooltip_size-small" style="width: 205px;"><div class="tooltip-content tooltip-content_left"> Eсли отключено 'Автоматически обновлять чат после изменения опции' нажмите дважды 'ОБНОВИТЬ ЧАТ'. </div></div></ovg-tooltip></a>`,
    BETA: `<a style="position: relative;">(BETA)<ovg-tooltip><div class="tooltip tooltip_position-right tooltip_size-small" style="width: 205px;"><div class="tooltip-content tooltip-content_left"> Эта опция находится в стадии разработки и может работать некорректно. </div></div></ovg-tooltip></a>`,
    tooltip(text, data) {
        return `<a style="position: relative;">${text}<ovg-tooltip><div class="tooltip tooltip_position-right tooltip_size-small" style="width: 205px;"><div class="tooltip-content tooltip-content_left"> ${data} </div></div></ovg-tooltip></a>`
    },
    getDefaultSettings() {
        return {
            general: {
                autoUpdateChat: false,
            },
            wasd: {
                messageFollower: false,
                messageSub: false,
                messageSystem: false,
                messageHover: true,
                wasdIconsSmile: false,
                wasdIconsCircleRu: false,
                webkitScrollbarWidth: false,
                giftsWrapperSide: false,
                giftsWrapperTopRight: false,
                sticker: "2",
                stickerovg: "2",
                paddingChatMessage: "4",
                colonAfterNickname: false,
                linkColor: "#000000",
                colorAtTheMention: true,
                chatOnTheLeft: false,
                chatWidth: 320,
                hideDonationChannelButton: false,
                hideAmazingChannelButtoan: false,
                hideGiftButtons: false,
                highlightMessagesBold: true,
                streamerMessage: false,
                fontSize: 14,
                topPanel: false,
                topPanelChallenge: false,
                pictureInPicture: true,
                resetToPlayer: false,
                moderatorMenu: "0",
                moderatorMenuAutomatic: true,
                autoPlayStreamersOnMain: true,
                pressedFullScreen: true,
                pressedTheater: true,
                pressedPIP: true,
                pressedClip: true,
                alternatingColorChatMessages: false,
                alternatingColorChatMessagesColor: "#000000",
                onClickMention: "2",
                onClickUserName: "1",
                fixedLinks: true,
                uptimeStream: true,
                bttvEmotes: true,
                bttvInChatMenu: true,
                bttvEmoteSize: "2",
                linkRecognizerall: true,
                linkRecognizerWASD: true,
                decorationLink: true,
                videoOverlay: false,
                userNameEdited: {},
                onClickUser: "2",
                removeMentionBL: true,
                hidePanelMobile: true,
                formatMessageSentTime: "H:mm",
                mentionSelf: true,
                colorMentionSelf: "#000000",
                highlightMessagesOpenCard: false,
                highlightMessagesOpenCardColor: "#000000",
                alwaysOpenVolumeControl: false,
                colorMessageHover: "#000000",
                bttvSize: "56px",
                mutePlayerOnMiddleMouse: false,
                hideBannerOnHome: false,
                hideSelectorStreamSettings: false,
                clickMentionAll: true,
                underlineUsernameAndMention: true,
                iframeCreateClip: false,
                linkRecognitionRights: "3",
                artificialChatDelay: "0",
                forceResizeStickers: "2",
                ffzEmotes: true,
                ffzInChatMenu: true,
                decreaseIndentationStickerMenu: false,
                decreaseIndentationSmilesMenu: false,
                decreaseIndentationBTTVandFFZMenu: false,
                highlightStickersStickerMenu: false,
                hideGreatRandom: false,
                moderatorMenuTimeout: "10",
                keepMessagesTimeout: false,
                chatMobilePlayer: false,
                colorModOptions: "#000000",
                tv7Emotes: true,
                tv7InChatMenu: true,
                uptimeStreamMobile: false,
                highlightingWhenMentionList: {},
                hideWhenMentionList: {},
                hideRaid: false,
                fixCharactersBreakingChat: false,
                blockUserList: {},
                blockTermList: {},
                highlightUserList: {},
                highlightTermList: {},
                notifyOnMention: false
            }
        };
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
    notify(title, body, username) {
        chrome.runtime.sendMessage({notify: "create", title: title, message: body, username: username});
    }
}
