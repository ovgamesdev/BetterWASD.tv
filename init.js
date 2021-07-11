let storageType = 'sync';
var isPressedAlt, isPressedShift, isPressedControl, isPressedFullScreen, isPressedTheater, isPressedPIP, isPressedClip;
var x, y;

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
    if (e.key == "Alt") {

        isPressedAlt = true;
    }
    if (e.key == "Shift") {

        isPressedShift = true;
    }
    if (e.key == "Control") {

        isPressedControl = true;
    }
    if (e.key == "f" || e.key == "а") {
        if (settings.wasd.pressedFullScreen[1]) {
            if (!isPressedFullScreen) {
                if (!(document.activeElement.nodeName == 'TEXTAREA' || document.activeElement.nodeName == 'INPUT')) {
                    if (document.querySelector('button.player-button.fullscreen-button')) document.querySelector('button.player-button.fullscreen-button').click();
                    isPressedFullScreen = true;
                }
            }
        }
    }
    if (e.key == "t" || e.key == "е") {
        if (settings.wasd.pressedTheater[1]) {
            if (!isPressedTheater) {
                if (!(document.activeElement.nodeName == 'TEXTAREA' || document.activeElement.nodeName == 'INPUT')) {
                    if (document.querySelector('button.player-button.theater-button')) document.querySelector('button.player-button.theater-button').click();
                    isPressedTheater = true;
                }
            }
        }
    }
    if (e.key == "i" || e.key == "ш") {
        if (settings.wasd.pressedPIP[1]) {
            if (!isPressedPIP) {
                if (!(document.activeElement.nodeName == 'TEXTAREA' || document.activeElement.nodeName == 'INPUT')) {
                    if (document.querySelector('button.player-button.pip')) document.querySelector('button.player-button.pip').click();
                    isPressedPIP = true;
                }
            }
        }
    }
    if (e.key == "x" || e.key == "ч") {
        if (settings.wasd.pressedClip[1]) {
            if (!isPressedClip) {
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
var twitchGlobalEmotes;
var ffzUsers = {};
var ffzEmotes = {};
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
                moderatorMenuAutomatic: [false, false],
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
                /*autoOnlyAudio: false,*/
                forceResizeStickers: [2, 2],
                ffzEmotes: [true, true],
                ffzInChatMenu: [true, true],
                decreaseIndentationStickerMenu: [false, false],
                decreaseIndentationSmilesMenu: [false, false],
                decreaseIndentationBTTVandFFZMenu: [false, false],
                highlightStickersStickerMenu: [false, false],


            },
            bot: {
                cmdPrefixBotMod: [['/', true], ['/', true]],
                cmdBan: [true, true],
                cmdMod: [true, true],
                cmdRaid: [true, true],
                cmdTitle: [true, true],
                cmdGame: [true, true],
                cmdFollowers: [true, true],
                cmdSubscribers: [true, true],

                cmdPrefixBotUser: [['!', true], ['!', true]],
                cmdUptime: [true, true],
                cmdUserTitle: [true, true],
                cmdUserGame: [true, true],
                /*cmdFollowage: true,*/

                cmdPrefix: [['/', true], ['/', true]],
                cmdUser: [true, true],

                eventFollow: [['{user_login} Спасибо за подписку!', false], ['{user_login} Спасибо за подписку!', false]],
                eventSub: [['{user_login} Спасибо за платную подписку на {product_name}!', false], ['{user_login} Спасибо за платную подписку на {product_name}!', false]],
            }
        };
    },
    fetch(...args) {
        return new Promise((resolve, reject) => {
            fetch(...args).then((response) => {
                response.json().then((json) => {
                    if (response.status === 200) {
                        resolve(json);
                    } else {
                        reject(json);
                    }
                });
            });
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

    Twitch: {
        getUserID(username) {
            return Helper.fetch('https://api.twitch.tv/kraken/users?login=' + username, {
                headers: {
                    'Client-ID': 'iteua36t3bn764geiij8px2tr5w5bl',
                    Accept: 'application/vnd.twitchtv.v5+json'
                }
            }).then((data) => {
                return data.users;
            });
        },
        fetchGlobalEmotes(items) {
            return new Promise((resolve) => {
                let done = () => {
                    if (items.globalTwitchEmotes) {
                        twitchGlobalEmotes = items.globalTwitchEmotes.emotes;
                        resolve();
                    } else {
                        resolve();
                    }
                    
                };

                if (typeof items.globalTwitchEmotes === 'undefined' || items.globalTwitchEmotes === null || Date.now() - items.globalTwitchEmotes.lastUpdate > 604800000) {
                    Helper.fetch('https://api.twitchemotes.com/api/v4/channels/0').then((data) => {
                        items.globalTwitchEmotes = {
                            lastUpdate: Date.now(),
                            emotes: {}
                        };
                        for (let emote of data.emotes) {
                            if (emote.code.match(/^[a-zA-Z0-9]+$/)) {
                                items.globalTwitchEmotes.emotes[emote.code] = emote.id;
                            }
                        }
                        chrome.storage.local.set({ globalTwitchEmotes: items.globalTwitchEmotes }, () => done());
                    }).catch(done);
                }
                else {
                    done();
                }
            });
        }
    },

    BTTV: {
        isBusy: false,
        emotes: {},
        updateSettings() {
            let bttvEmoteList = BetterStreamChat.settingsDiv.querySelector(' #bttvEmoteList');
            bttvEmoteList.innerText = '';

            chrome.storage.local.get((items) => {
                Helper.BTTV.fetchGlobalEmotes(items).finally(() => {
                    bttvEmotes = items.bttvEmotes;
                    bttvUsers = items.bttvUsers;
                    for (let userID in items.bttvEmotes) {
                        if (items.bttvEmotes.hasOwnProperty(userID)) {

                            let splitdev = document.createElement('div');
                            splitdev.classList.add('stickers__div')

                            splitdev.innerHTML = `<div class="stickers__info"><div class="stickers__info__line"></div><div class="stickers__info__text"> ${typeof bttvUsers[userID].username == 'undefined' ? userID : bttvUsers[userID].username} </div><div class="stickers__info__line"></div></div><div class="stickers__line"></div>`
                            bttvEmoteList.append(splitdev);
                            
                            let stickers__line = splitdev.querySelector('.stickers__line')
                            for (let emoteCode in items.bttvEmotes[userID]) {

                                if (items.bttvEmotes[userID].hasOwnProperty(emoteCode)) {

                                    let a = document.createElement('a');
                                    let img = document.createElement('img');
                                    let span = document.createElement('span');
                                    span.innerText = emoteCode;
                                    img.src = `https://cdn.betterttv.net/emote/${Helper.BTTV.emotes[emoteCode]}/2x`;
                                    a.href = `https://betterttv.com/emotes/${Helper.BTTV.emotes[emoteCode]}`
                                    a.target = '_blank'
                                    a.classList.add('emoteCard');
                                    a.append(img);
                                    a.append(span);
                                    a.title = emoteCode;
                                    bttvEmoteList.append(a);

                                }
                            }

                        }
                    }
                })
            });

            let list = BetterStreamChat.settingsDiv.querySelector('.bttvUserList');
            list.innerText = '';
            for (let userID in bttvUsers) {
                if (bttvUsers.hasOwnProperty(userID)) {
                    this.addUserToList(userID, list);
                }
            }
        },
        loaded() {
            chrome.storage.onChanged.addListener(async function (changes, namespace) {
                if (namespace === 'local') {
                    Helper.BTTV.update();
                } else if (namespace === 'sync') {
                    settings = await Helper.getSettings();
                    BetterStreamChat.update();
                }
            });
        },
        fetchGlobalEmotes(items) {
            return new Promise((resolve) => {
                let bttvEmotes = items.bttvEmotes || {};
                let bttvUsers = items.bttvUsers || {};
                if (typeof bttvUsers.global === 'undefined' || Date.now() - bttvUsers.global.lastUpdate > 604800000) {
                    return fetch('https://api.betterttv.net/3/cached/emotes/global').then((response) => {
                        if (response.status === 200) {
                            return response.json();
                        }
                        else {
                            return Promise.reject();
                        }
                    }).then((data) => {
                        bttvEmotes.global = {};
                        for (let emote of data) {
                            bttvEmotes.global[emote.code] = emote.id;
                        }
                    }).finally(() => {
                        bttvUsers.global = {
                            lastUpdate: Date.now()
                        };
                        items.bttvUsers = bttvUsers;
                        items.bttvEmotes = bttvEmotes;
                        chrome.storage.local.set({ bttvUsers, bttvEmotes }, () => resolve());
                    });
                }
                else {
                    resolve();
                }
            });
        },
        update() {
            return new Promise((resolve) => {
                chrome.storage.local.get((items) => {
                    Helper.Twitch.fetchGlobalEmotes(items).finally(() => {
                        this.fetchGlobalEmotes(items).finally(() => {
                            bttvEmotes = items.bttvEmotes;
                            bttvUsers = items.bttvUsers;

                            let emotes = {};
                            for (let userID in items.bttvEmotes) {
                                if (items.bttvEmotes.hasOwnProperty(userID)) {
                                    for (let emoteCode in items.bttvEmotes[userID]) {
                                        if (items.bttvEmotes[userID].hasOwnProperty(emoteCode)) {
                                            emotes[emoteCode] = items.bttvEmotes[userID][emoteCode];
                                        }
                                    }
                                }
                            }
                            this.emotes = emotes;
                            this.updateSettings();
                            resolve();
                        });
                    });
                });
            });
        },
        replaceText(text) {
            let split = text.split(' ');
            let newText = [];
            for (let word of split) {
                size = Number(settings.wasd.bttvEmoteSize[1]) + 1;
                if (typeof size === 'undefined') {size = 2};

                if (this.emotes[word]) {
                    word = `<img class="stickerovg small" style="vertical-align: middle; width: auto!important;" src="https://cdn.betterttv.net/emote/${this.emotes[word]}/${size}x" alt="${word}" title="${word}" />`;
                }
                else if (twitchGlobalEmotes) if (twitchGlobalEmotes[word]) {
                    word = `<img class="stickerovg small" style="vertical-align: middle; width: auto!important;" src="https://static-cdn.jtvnw.net/emoticons/v1/${twitchGlobalEmotes[word]}/${size}.0" alt="${word}" title="${word}" />`;
                }

                newText.push(word);
            }
            //console.log(Helper.BTTV.emotes);
            return newText.join(' ');
        },
        getUserEmotes(userID) {
            return Helper.fetch(`https://api.betterttv.net/3/cached/users/twitch/${userID}`);
        },
        updateUserChannelEmotes(userID, username) {
            return this.getUserEmotes(userID).then((bttvData) => {
                return this.updateEmotes(userID, bttvData);
            }).then(() => {
                return Helper.BTTV.addUser(userID, username);
            }).catch(() => {
                return Promise.reject('У пользователя нет BetterTTV.');
            });
        },
        updateEmotes(userID, bttvData) {
            bttvEmotes[userID] = {};

            let emoteList = [];
            if (Array.isArray(bttvData.channelEmotes)) {
                emoteList = emoteList.concat(bttvData.channelEmotes);
            }
            if (Array.isArray(bttvData.sharedEmotes)) {
                emoteList = emoteList.concat(bttvData.sharedEmotes);
            }

            for (let emote of emoteList) {
                bttvEmotes[userID][emote.code] = emote.id;
            }
        },
        addUser(userID, username) {
            if (typeof userID === 'string') {
                userID = parseInt(userID);
            }

            return new Promise((resolve) => {
                let addUser = typeof bttvUsers[userID] === 'undefined';

                bttvUsers[userID] = { username, lastUpdate: Date.now() }; // update
                chrome.storage.local.set({ bttvUsers, bttvEmotes }, () => {
                    if (addUser) {
                        this.addUserToList(userID);
                    }
                    resolve();
                });
            });
        },
        tryAddUser() {
            let userElement = BetterStreamChat.settingsDiv.querySelector('#bttvAddUser');
            let button = BetterStreamChat.settingsDiv.querySelector('#bttvAddUserBtn');
            let username = userElement.value.trim();
            if (!username.length) {
                return;
            }

            if (this.isBusy) {
                return;
            }

            userElement.setAttribute('disabled', 'disabled');
            button.setAttribute('disabled', 'disabled');
            this.isBusy = true;
            let beforeEmotes = Object.keys(this.emotes).length;
            let userID;
            Helper.Twitch.getUserID(username).then((data) => {
                if (data.length) {
                    userID = data[0]._id;
                    username = data[0].display_name;
                    if (typeof bttvUsers[userID] !== 'undefined') {
                        return Promise.reject('Пользователь уже в списке');
                    }

                    return this.updateUserChannelEmotes(userID, data[0].display_name);
                }
                else {
                    return Promise.reject('Пользователь Twitch не найден');
                }
            }).then(() => {
                return Helper.BTTV.update();
            }).then(() => {
                let newEmotes = Object.keys(Helper.BTTV.emotes).length - beforeEmotes;
                Helper.Settings.showMessage(`Пользователь ${username} и ${newEmotes} эмоции добавлены.`);
            }).catch((err) => {
                Helper.Settings.showMessage(err, 'error');
            }).finally(() => {
                userElement.value = '';
                userElement.removeAttribute('disabled');
                button.removeAttribute('disabled');
                this.isBusy = false;
            });
        },
        addUserToList(userID, list) {
            list = list || BetterStreamChat.settingsDiv.querySelector('.bttvUserList');
            if (userID === 'global') {
                return;
            }

            let user = bttvUsers[userID];
            let item = document.createElement('tr')
            item.classList.add(`table-menu__block`)
            item.style = 'justify-content: space-between;'
            item.innerHTML = `<td><div><p title="${user.username}"> ${user.username} </p></div></td> <td><div><p> ${(new Date(user.lastUpdate)).toLocaleString()} </p></div></td> <td class="td-btn-remove"><div><button class="removeUser primary ovg basic" data="${userID}"><i class="wasd-icons-delete" style="pointer-events: none;"></i></button><button style="left: 10px;" class="updateUser primary ovg basic" data="${userID}"><i class="wasd-icons-record-icon" style="pointer-events: none;"></i></button></div></td>`;
            list.append(item)
            item.querySelector('.removeUser').addEventListener('click', () => {
                this.removeUser(userID)
            })
            item.querySelector('.updateUser').addEventListener('click', () => {
                this.updateUserChannelEmotes(userID, user.username)
            })
        },
        removeUser(userID) {
            delete bttvUsers[userID]
            delete bttvEmotes[userID]
            chrome.storage.local.set({ bttvUsers, bttvEmotes });
        },
        updateEmotesBttv() {
            chrome.storage.local.get((items) => {
                for(let userID in items.bttvEmotes) {
                    this.updateUserChannelEmotes(userID, items.bttvUsers[userID].username)
                }
            });
        },
    },

    FFZ: {
        isBusy: false,
        emotes: {},
        updateSettings() {
            let ffzEmoteList = BetterStreamChat.settingsDiv.querySelector(' #ffzEmoteList');
            ffzEmoteList.innerText = '';

            chrome.storage.local.get((items) => {
                Helper.FFZ.fetchGlobalEmotes(items).finally(() => {
                    ffzEmotes = items.ffzEmotes;
                    ffzUsers = items.ffzUsers;

                    for (let userID in items.ffzEmotes) {
                        if (items.ffzEmotes.hasOwnProperty(userID)) {

                            let splitdev = document.createElement('div');
                            splitdev.classList.add('stickers__div')
                            let usernameovg;
                            if (typeof ffzUsers[userID] != 'undefined') {
                                if(typeof ffzUsers[userID].username != 'undefined'){
                                    usernameovg = ffzUsers[userID].username
                                } else {
                                    if (userID != 'global') delete ffzEmotes[userID]/*remove v5*/
                                    usernameovg = userID/*remove v5*/
                                }
                            } else {
                                if (userID != 'global') delete ffzEmotes[userID]/*remove v5*/
                                usernameovg = userID/*remove v5*/
                            }

                            splitdev.innerHTML = `<div class="stickers__info"><div class="stickers__info__line"></div><div class="stickers__info__text"> ${usernameovg} </div><div class="stickers__info__line"></div></div><div class="stickers__line"></div>`
                            ffzEmoteList.append(splitdev);

                            let stickers__line = splitdev.querySelector('.stickers__line')
                            for (let emoteCode in items.ffzEmotes[userID]) {

                                if (items.ffzEmotes[userID].hasOwnProperty(emoteCode)) {

                                    let a = document.createElement('a');
                                    let img = document.createElement('img');
                                    let span = document.createElement('span');
                                    span.innerText = emoteCode;
                                    img.src = `https://cdn.frankerfacez.com/emoticon/${Helper.FFZ.emotes[emoteCode]}/2`;
                                    a.href = `https://www.frankerfacez.com/emoticon/${Helper.FFZ.emotes[emoteCode]}`
                                    a.target = '_blank'
                                    a.classList.add('emoteCard');
                                    a.append(img);
                                    a.append(span);
                                    a.title = emoteCode;
                                    ffzEmoteList.append(a);

                                }
                            }

                        }
                    }
                    chrome.storage.local.set({ ffzUsers, ffzEmotes });/*remove v5*/

                })
            });

            let list = BetterStreamChat.settingsDiv.querySelector('.ffzUserList');
            list.innerText = '';
            for (let userID in ffzUsers) {
                if (ffzUsers.hasOwnProperty(userID)) {
                    this.addUserToList(userID, list);
                }
            }
        },
        loaded() {
            chrome.storage.onChanged.addListener(async function (changes, namespace) {
                if (namespace === 'local') {
                    Helper.FFZ.update();
                } else if (namespace === 'sync') {
                    settings = await Helper.getSettings();
                    BetterStreamChat.update();
                }
            });
        },
        fetchGlobalEmotes(items) {
            return new Promise((resolve) => {
                let ffzEmotes = items.ffzEmotes || {};
                let ffzUsers = items.ffzUsers || {};
                if (typeof ffzUsers.global === 'undefined' || Date.now() - ffzUsers.global.lastUpdate > 604800000) {
                    return fetch('https://api.frankerfacez.com/v1/set/global').then((response) => {
                        if (response.status === 200) {
                            return response.json();
                        }
                        else {
                            return Promise.reject();
                        }
                    }).then((data) => {
                        ffzEmotes.global = {};
                        for (let emote of data.sets[data.default_sets[0]].emoticons) {
                            ffzEmotes.global[emote.name] = emote.id;
                        }
                    }).finally(() => {
                        ffzUsers.global = {
                            lastUpdate: Date.now()
                        };
                        items.ffzUsers = ffzUsers;
                        items.ffzEmotes = ffzEmotes;
                        chrome.storage.local.set({ ffzUsers, ffzEmotes }, () => resolve());
                    });
                }
                else {
                    resolve();
                }
            });
        },
        update() {
            return new Promise((resolve) => {
                chrome.storage.local.get((items) => {
                    //Helper.Twitch.fetchGlobalEmotes(items).finally(() => {
                        this.fetchGlobalEmotes(items).finally(() => {
                            ffzEmotes = items.ffzEmotes;
                            ffzUsers = items.ffzUsers;

                            let emotes = {};
                            for (let userID in items.ffzEmotes) {
                                if (items.ffzEmotes.hasOwnProperty(userID)) {
                                    for (let emoteCode in items.ffzEmotes[userID]) {
                                        if (items.ffzEmotes[userID].hasOwnProperty(emoteCode)) {
                                            emotes[emoteCode] = items.ffzEmotes[userID][emoteCode];
                                        }
                                    }
                                }
                            }
                            this.emotes = emotes;
                            this.updateSettings();
                            resolve();
                        });
                    //});
                });
            });
        },
        replaceText(text) {
            let split = text.split(' ');
            let newText = [];
            for (let word of split) {
                size = Number(settings.wasd.bttvEmoteSize[1]) + 1;
                if (typeof size === 'undefined') {size = 2};
                switch(size) {
                    case 3:
                        size = 4
                        break;
                }

                if (this.emotes[word]) {
                    word = `<img class="stickerovg small" style="vertical-align: middle; width: auto!important;" src="https://cdn.frankerfacez.com/emote/${this.emotes[word]}/${size}" alt="${word}" title="${word}" />`;
                }

                newText.push(word);
            }
            //console.log(Helper.FFZ.emotes);
            return newText.join(' ');
        },
        getUserEmotes(userID) {
            return Helper.fetch(`https://api.frankerfacez.com/v1/room/id/${userID}`);
        },
        updateUserChannelEmotes(userID, username) {
            return this.getUserEmotes(userID).then((ffzData) => {
                return this.updateEmotes(userID, ffzData);
            }).then(() => {
                return Helper.FFZ.addUser(userID, username);
            }).catch((err) => {
                return Promise.reject('У пользователя нет FFZ.');
            });
        },
        updateEmotes(userID, ffzData) {
            ffzEmotes[userID] = {};

            let emoteList = [];
            if (Array.isArray(ffzData.sets[ffzData.room.set].emoticons)) {
                emoteList = emoteList.concat(ffzData.sets[ffzData.room.set].emoticons);
            }
            /*if (Array.isArray(ffzData.sharedEmotes)) {
                emoteList = emoteList.concat(ffzData.sharedEmotes);
            }*/

            for (let emote of emoteList) {
                ffzEmotes[userID][emote.name] = emote.id;
            }
        },
        addUser(userID, username) {
            if (typeof userID === 'string') {
                userID = parseInt(userID);
            }

            return new Promise((resolve) => {
                let addUser = typeof ffzUsers[userID] === 'undefined';

                ffzUsers[userID] = { username, lastUpdate: Date.now() }; // update
                chrome.storage.local.set({ ffzUsers, ffzEmotes }, () => {
                    if (addUser) {
                        this.addUserToList(userID);
                    }
                    resolve();
                });
            });
        },
        tryAddUser() {
            let userElement = BetterStreamChat.settingsDiv.querySelector('#ffzAddUser');
            let button = BetterStreamChat.settingsDiv.querySelector('#ffzAddUserBtn');
            let username = userElement.value.trim();
            if (!username.length) {
                return;
            }

            if (this.isBusy) {
                return;
            }

            userElement.setAttribute('disabled', 'disabled');
            button.setAttribute('disabled', 'disabled');
            this.isBusy = true;
            let beforeEmotes = Object.keys(this.emotes).length;
            let userID;
            Helper.Twitch.getUserID(username).then((data) => {
                if (data.length) {
                    userID = data[0]._id;
                    username = data[0].display_name;
                    if (typeof ffzUsers[userID] !== 'undefined') {
                        return Promise.reject('Пользователь уже в списке');
                    }
                    
                    return this.updateUserChannelEmotes(userID, data[0].display_name);
                }
                else {
                    return Promise.reject('Пользователь Twitch не найден');
                }
            }).then(() => {
                return Helper.FFZ.update();
            }).then(() => {
                let newEmotes = Object.keys(Helper.FFZ.emotes).length - beforeEmotes;
                Helper.Settings.showMessage(`Пользователь ${username} и ${newEmotes} эмоции добавлены.`);
            }).catch((err) => {
                Helper.Settings.showMessage(err, 'error');
            }).finally(() => {
                userElement.value = '';
                userElement.removeAttribute('disabled');
                button.removeAttribute('disabled');
                this.isBusy = false;
            });
        },
        addUserToList(userID, list) {
            list = list || BetterStreamChat.settingsDiv.querySelector('.ffzUserList');
            if (userID === 'global') {
                return;
            }
            let user = ffzUsers[userID];
            let item = document.createElement('tr')
            item.classList.add(`table-menu__block`)
            item.style = 'justify-content: space-between;'
            item.innerHTML = `<td><div><p title="${user.username}"> ${user.username} </p></div></td> <td><div><p> ${(new Date(user.lastUpdate)).toLocaleString()} </p></div></td> <td class="td-btn-remove"><div><button class="removeUser primary ovg basic" data="${userID}"><i class="wasd-icons-delete" style="pointer-events: none;"></i></button><button style="left: 10px;" class="updateUser primary ovg basic" data="${userID}"><i class="wasd-icons-record-icon" style="pointer-events: none;"></i></button></div></td>`;
            list.append(item)
            item.querySelector('.removeUser').addEventListener('click', () => {
                this.removeUser(userID)
            })
            item.querySelector('.updateUser').addEventListener('click', () => {
                this.updateUserChannelEmotes(userID, user.username)
            })

        },
        removeUser(userID) {
            delete ffzUsers[userID]
            delete ffzEmotes[userID]
            chrome.storage.local.set({ ffzUsers, ffzEmotes });
        },
        updateEmotesFfz() {
            chrome.storage.local.get((items) => {
                for(let userID in items.ffzEmotes) {
                    this.updateUserChannelEmotes(userID, items.ffzUsers[userID].username)
                }
            });
        },
    },

    WASD: {
        openUserCardName: '',
        isModerator: false,
        loaded() {
            chrome.storage.onChanged.addListener(async function(changes, namespace) {
                if (namespace === 'local') {
                    // Helper.WASD.update();
                } else if (namespace === 'sync') {
                    settings = await Helper.getSettings();
                    BetterStreamChat.update();
                }
            });
        },
        addUserToBlackList(username) {
            let html = document.querySelector('.blacklist.ovg-items')
            let item = document.createElement('tr')
            item.classList.add(`table-menu__block`)
            item.style = 'justify-content: space-between;'

            let usernameed = settings.wasd.userNameEdited[username.trim().split('@').join('')];
            item.innerHTML = `<td><div><p title="${username}"> ${usernameed ? usernameed+' ('+username+')' : username} </p></div></td> <td><div><p> ${(new Date(settings.wasd.blockUserList[username])).toLocaleString()} </p></div></td> <td class="td-btn-remove"><div><button class="remove primary ovg basic" data="${username}"><i class="wasd-icons-delete" style="pointer-events: none;"></i></button></div></td>`;
            item.setAttribute('data', username)
            html.append(item)
            item.querySelector('.remove').addEventListener('click', ({ target }) => {
                let nickname = target.getAttribute('data')
                delete settings.wasd.blockUserList[nickname];
                item.remove()
                Helper.WASD.showChatMessage(`Пользователь ${nickname} удален из ЧС`, 'success')
                //console.log(settings.wasd.blockUserList)
                Helper.Settings.save([document.querySelector('.optionField')]);
            })
        },
        textToURL(text) {
            if (text) {
                for (let item of text.split(' ')) {
                    let itemhref;
                    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
                    if (!!pattern.test(item)) {
                        text = text.replace(item, `<a target="_break" href="${hrefhttsadd(item)}">${item}</a>`);
                    }
                    function hrefhttsadd(item) {
                        if (!(item.search('http://')!=-1) && !(item.search('https://')!=-1)){
                            return `//${item}`;
                        } else {
                            return item;
                        }
                    }
                }
                return text;
            }
        },
        showChatMessage(message, type='warning') {
            let statusNofify;
            if (!document.querySelector('div.nofify-message-ovg')) {
                notify = `<div class="nofify-message-ovg"> ${message} </div>`;
                if (document.querySelector('wasd-chat-slow-mode-message')) {
                    document.querySelector('wasd-chat-slow-mode-message').insertAdjacentHTML("afterbegin", notify);
                }
                statusNofify = document.querySelector('div.nofify-message-ovg');
            } else {
                statusNofify = document.querySelector('div.nofify-message-ovg');
                if (statusNofify) {
                    statusNofify.textContent = message;
                }
            }

            if (statusNofify) {
                statusNofify.classList.remove('warning')
                statusNofify.classList.remove('success')
                statusNofify.classList.add(type)

                if (messageTimeout) {
                    clearTimeout(messageTimeout);
                }
                statusNofify.classList.add('active');
            }

            let hide = () => {
                if (messageTimeout) { clearTimeout(messageTimeout); }
                messageTimeout = null;
                statusNofify.removeEventListener('click', hide);
                statusNofify.classList.remove('active');
                
            };
            statusNofify.addEventListener('click', hide);
            messageTimeout = setTimeout(hide, 2000);
        },
        addMessageToChat(messagetext, isClick=false) {
            messages = document.querySelector('.block__messages')
            if (messages) {
                messages.children[messages.children.length-1].insertAdjacentHTML("afterend", `<div class="block__messages__item" style="margin-bottom:4px;display:flex;flex-direction:row;justify-content:center;width:100%;font-family:Roboto,sans-serif;font-size:12px;letter-spacing:normal;line-height:normal"><wasd-chat-system-message style="display:flex;margin:0 4px;width:100%"><div class="block" style="font-family:Roboto,sans-serif;width:100%"><div class="block__item" style="${isClick?'cursor:pointer;':''}-moz-user-select:none;-webkit-user-select:none;background-color:rgba(var(--wasd-color-switch--rgb),.08);border-radius:4px;color:var(--wasd-color-text-third);font-size:12px;margin:8px 0;padding:8px 16px;text-align:center;user-select:none"><div style="line-height:14px"> ${messagetext} </div></div></div></wasd-chat-system-message></div>`)
                var message = messages.children[messages.children.length-1]
                //console.log(message)
                document.querySelector('.block').scrollTop = messages.scrollHeight
                return message;
            }
        },
        createUserViewerCard(channel_name, positionself=false) {
            var y_card;
            var x_card = 5;
            var data;
            if (!positionself) {
                if (document.querySelector('div.chat-container')) {
                    if (!settings.wasd.chatOnTheLeft[1]) {
                        y_card = y-13;
                        x_card = document.querySelector('div#scroll-content.wrapper').offsetWidth - document.querySelector('div.chat-container').offsetWidth + 5;
                    } else {
                        y_card = y-13;
                        x_card = 4;
                    }

                    if (document.querySelector('div#scroll-content.wrapper').offsetWidth-4 <= x_card+310) {
                        x_card = (document.querySelector('div#scroll-content.wrapper').offsetWidth-4) - 310-1;
                    }
                    if (!(x_card <= 4)) {
                        if ((x_card >= (document.querySelector('div#scroll-content.wrapper').offsetWidth-4) - 180)) {
                            x_card = ((document.querySelector('div#scroll-content.wrapper').offsetWidth-4) - 181);
                        }
                    } else {
                        x_card = 5;
                    }

                    if (!(y_card <= 4)) {
                        if ((y_card >= (document.querySelector('div#scroll-content.wrapper').offsetHeight-4) - 476)) {
                            y_card = ((document.querySelector('div#scroll-content.wrapper').offsetHeight-4) - 477);
                        }
                    } else {
                        y_card = 5;
                    }
                } else {
                    y_card = y-13;
                    x_card = x-13;
                }

                let mobile = document.querySelector('.theatre-mode-mobile');
                if (mobile) {
                    y_card = mobile.clientHeight + 44 + 5
                }
            } else if (document.querySelector('div.chat-room__viewer-card')) {
                y_card = document.querySelector('.ovg-viewer-card').offsetTop
                x_card = document.querySelector('.ovg-viewer-card').offsetLeft
            }


            if (document.querySelector('div.chat-room__viewer-card')) {
                Helper.WASD.highlightMessagesRemove()
                Helper.WASD.openUserCardName = ''
                document.querySelector('div.chat-room__viewer-card').remove();
            }

            //console.log(settings.wasd.userNameEdited);

            var usercard = `<div class="chat-room__viewer-card"><div class="tw-full-height tw-full-width tw-relative tw-z-above viewer-card-layer"><div style="top: ${y_card}px; left: ${x_card}px;" class="tw-border-radius-medium ovg-viewer-card"><div class="tw-full-height tw-full-width"><div class="tw-border-radius-medium tw-c-background-base viewer-card"><div style="" class="tw-c-background-accent-alt viewer-card-header__background" style=""><div class="tw-flex tw-flex-column tw-full-height tw-full-width viewer-card-header__overlay"><div class="tw-align-center tw-align-items-start tw-c-background-overlay tw-c-text-overlay tw-flex tw-flex-row tw-full-width tw-justify-content-start tw-relative viewer-card-header__banner"><div class="tw-inline-flex viewer-card-drag-cancel"><figure class="tw-avatar"><div class="profile-main__avatar" style=""></div></figure></div><div class="tw-align-left viewer-card-header__display-name"><div class="tw-inline-flex viewer-card-drag-cancel"><div class="tw-full-width tw-pd-r-5"><h4 class="tw-c-text-overlay tw-ellipsis tw-line-clamp-2 tw-word-break-all"><a class="tw-link" rel="noopener noreferrer" target="_blank" href=""></a><button class="bttv-moderator-card-nickname-change-button"><span class="buttonIcon"><svg width="16px" height="16px" version="1.1" viewBox="0 0 16 16" x="0px" y="0px" fill="white"><path clip-rule="evenodd" d="M6.414,12.414L3.586,9.586l8-8l2.828,2.828L6.414,12.414z M4.829,14H2l0,0v-2.828l0.586-0.586l2.828,2.828L4.829,14z" fill-rule="evenodd"></path></svg></span></button></h4></div></div><div class="tw-flex"><i _ngcontent-cel-c162="" class="wasd-icons-games ovg" style="font-size:20px;align-items:center;display:flex;justify-content:center"></i><a target="_blank" data-test-selector="viewer_card_game" class="tw-c-text-overlay tw-mg-l-05 tw-mg-t-auto gameurl"></a></div></div></div><div class="bttv-moderator-card-user-stats"><div class="tw-flex tw-full-width"><div style="" class="tw-align-items-center tw-inline-flex tw-stat tw-pd-l-1 viewers-title" title="Всего зрителей за стрим"><div class="tw-align-items-center tw-inline-flex tw-stat__icon tw-mg-r-1"><i _ngcontent-cel-c162="" style="font-size:14px;height:14px;width:14px;align-items:center;display:flex;justify-content:center" class="wasd-icons-viewers-live"></i></div><div class="tw-stat__value viewers"></div></div><div class="tw-align-items-center tw-inline-flex tw-stat tw-pd-l-1 channal_followers_count-title" title="Количество фолловеров канала"><div class="tw-align-items-center tw-inline-flex tw-stat__icon tw-mg-r-1"><i _ngcontent-xul-c30="" class="wasd-icons-favorite"></i></div><div class="tw-stat__value channal_followers_count"></div></div><div class="tw-align-items-center tw-inline-flex tw-stat tw-pd-l-1 channal_created_at-title" title="Канал создан"><div class="tw-align-items-center tw-inline-flex tw-stat__icon tw-mg-r-1"><figure class="tw-svg"><svg class="tw-svg__asset tw-svg__asset--heart tw-svg__asset--inherit" width="16px" height="16px" viewBox="0 0 1792 1792" fill="white"><path d="M1792 1408v384h-1792v-384q45 0 85-14t59-27.5 47-37.5q30-27 51.5-38t56.5-11q24 0 44 7t31 15 33 27q29 25 47 38t58 27 86 14q45 0 85-14.5t58-27 48-37.5q21-19 32.5-27t31-15 43.5-7q35 0 56.5 11t51.5 38q28 24 47 37.5t59 27.5 85 14 85-14 59-27.5 47-37.5q30-27 51.5-38t56.5-11q34 0 55.5 11t51.5 38q28 24 47 37.5t59 27.5 85 14zm0-320v192q-24 0-44-7t-31-15-33-27q-29-25-47-38t-58-27-85-14q-46 0-86 14t-58 27-47 38q-22 19-33 27t-31 15-44 7q-35 0-56.5-11t-51.5-38q-29-25-47-38t-58-27-86-14q-45 0-85 14.5t-58 27-48 37.5q-21 19-32.5 27t-31 15-43.5 7q-35 0-56.5-11t-51.5-38q-28-24-47-37.5t-59-27.5-85-14q-46 0-86 14t-58 27-47 38q-30 27-51.5 38t-56.5 11v-192q0-80 56-136t136-56h64v-448h256v448h256v-448h256v448h256v-448h256v448h64q80 0 136 56t56 136zm-1280-864q0 77-36 118.5t-92 41.5q-53 0-90.5-37.5t-37.5-90.5q0-29 9.5-51t23.5-34 31-28 31-31.5 23.5-44.5 9.5-67q38 0 83 74t45 150zm512 0q0 77-36 118.5t-92 41.5q-53 0-90.5-37.5t-37.5-90.5q0-29 9.5-51t23.5-34 31-28 31-31.5 23.5-44.5 9.5-67q38 0 83 74t45 150zm512 0q0 77-36 118.5t-92 41.5q-53 0-90.5-37.5t-37.5-90.5q0-29 9.5-51t23.5-34 31-28 31-31.5 23.5-44.5 9.5-67q38 0 83 74t45 150z"></path></svg></figure></div><div class="tw-stat__value channal_created_at"></div></div><div class="tw-align-items-center tw-inline-flex tw-stat tw-pd-l-1 profile_level-title" title="Уровень канала"><div class="tw-align-items-center tw-inline-flex tw-stat__icon tw-mg-r-1"><i _ngcontent-ykf-c54="" style="font-size:14px;height:14px;width:14px;align-items:center;display:flex;justify-content:center" class="icon wasd-icons-lvl"></i></div><div class="tw-stat__value profile_level"></div></div></div></div></div></div><div class="ovg buttonsdiv"><wasd-channel-favorite-btn id="selector-channel-favorite-btn-ovg" style=""><wasd-button class="flat-btn ovg" wasdtooltip=""><button class="primary medium ovg disabled" type="button"><i class="wasd-icons-like ovg"></i> <span></span></button><wasd-tooltip><div class="tooltip tooltip_position-bottomRight tooltip_size-small ovg"><div class="tooltip-content tooltip-content_left ovg"> Добавить в избранное </div></div></wasd-tooltip></wasd-button></wasd-channel-favorite-btn><div style="width:100%"></div><div class="item__links-ovg"></div></div><div class="tw-c-background-alt-2 tw-pd-t-05"><div class="paid_title-ovg" style="display:none"> Стикеры канала </div><div class="paidsubs-popup__stickers"></div></div><div class="user_last_messages-ovg"><button class="paid_title-ovg last_messages" style="display: block;padding-bottom: 10px;box-shadow: 0px 2px 2px -2px rgba(var(--wasd-color-switch--rgb),.32);z-index: 2;position: relative;"><div class="accordion-header-wrap-ovg"><span class="accordion-header-ovg"> Последние сообщения </span><div class="accordion-header-arrow-ovg"><i class="wasd-icons-dropdown-top"></i></div></div><div class="accordion-marker-ovg"></div></button><div class="block-ovg"><div class="block__messages-ovg"></div></div></div></div></div><div data-a-target="viewer-card-close-button" class="tw-absolute tw-mg-r-05 tw-mg-t-05 tw-right-0 tw-top-0"><div class="tw-inline-flex viewer-card-drag-cancel"><button class="tw-button-icon tw-button-icon--overlay tw-core-button" aria-label="Скрыть" data-test-selector="close-viewer-card"><i _ngcontent-ykf-c54="" style="font-size:13px;align-items:center;display:flex;justify-content:center" class="icon wasd-icons-close"></i></button></div></div></div></div></div>`;
            if (document.querySelector('wasd-channel > div.channel-wrapper')) {
                document.querySelector('wasd-channel > div.channel-wrapper').insertAdjacentHTML("beforeend", usercard);
                if (settings.wasd.highlightMessagesOpenCard[1]) Helper.WASD.highlightMessages(channel_name.trim())
                Helper.WASD.openUserCardName = channel_name.trim()
            } else {
                document.querySelector('div#scroll-content.wrapper').insertAdjacentHTML("beforeend", usercard);
                document.querySelector('.chat-room__viewer-card').style.zIndex = '5556'
            }
            

            document.querySelector(".tw-border-radius-medium.ovg-viewer-card > [data-a-target='viewer-card-close-button']").addEventListener('click', () => {
                Helper.WASD.highlightMessagesRemove()
                Helper.WASD.openUserCardName = ''
                document.querySelector('div.chat-room__viewer-card').remove()
            });

            document.querySelector("button.bttv-moderator-card-nickname-change-button").addEventListener('click', () => {
                var newusername;
                var user_channel_name = channel_name.trim();
                if (settings.wasd.userNameEdited[user_channel_name]) {
                    newusername = prompt(`Введите обновленный ник для ${user_channel_name} (оставьте поле пустым, чтобы сбросить):`, settings.wasd.userNameEdited[user_channel_name].trim());
                } else {
                    newusername = prompt(`Введите обновленный ник для ${user_channel_name} (оставьте поле пустым, чтобы сбросить):`, user_channel_name);
                }

                if (!(newusername == null || newusername == user_channel_name) && newusername != '') {
                   Helper.WASD.showChatMessage(`Новый ник ${newusername} пользователя ${user_channel_name}`, 'success');
                    settings.wasd.userNameEdited[user_channel_name] = ` ${newusername} `;
                } else if (newusername == '') {
                   Helper.WASD.showChatMessage(`Новый ник ${user_channel_name} пользователя ${user_channel_name}`, 'success');
                    delete settings.wasd.userNameEdited[user_channel_name];
                }

                Helper.Settings.save([document.querySelector('.optionField')]);
            });

            document.querySelector('wasd-button.flat-btn.ovg > button.ovg').addEventListener('mouseover', () => {
                document.querySelector('div.tooltip.tooltip_position-bottomRight.tooltip_size-small.ovg').style.display = 'flex';
            });
            document.querySelector('wasd-button.flat-btn.ovg > button.ovg').addEventListener('mouseout', () => {
                document.querySelector('div.tooltip.tooltip_position-bottomRight.tooltip_size-small.ovg').style.display = '';
            });


            Helper.WASD.dragElement(document.querySelector(".tw-border-radius-medium.ovg-viewer-card"));

            if (true) {

                var oReq = new XMLHttpRequest();
                oReq.onload = (out) => {
                    var out = JSON.parse(oReq.responseText);
                    if (out.result) {
                        for (let value of out.result.rows) {
                            if (value.user_login.trim() == channel_name.trim()) {
                                data = value;
                                break;
                            }
                        }
                        if (!data) {
                            for (let value of out.result.rows) {
                                if (value.user_login.trim().toLowerCase() == channel_name.trim().toLowerCase()) {
                                    data = value;
                                    break;
                                }
                            }
                        }
                    }
                        
                    var viewerCard;
                    if (data) {
                        // created_at
                        var date = new Date(data.created_at);
                        //console.log(data.created_at);
                        if (document.querySelector('div.chat-room__viewer-card')) {
                            viewerCard = document.querySelector('div.chat-room__viewer-card');
                            viewerCard.querySelector('div.tw-stat__value.channal_created_at').textContent = `${jQuery.timeago(date)} назад`;
                            viewerCard.querySelector('.channal_created_at-title').title = `Канал создан ${date.toLocaleString('ru')}`;
                            // user_login
                            if (settings.wasd.userNameEdited[data.user_login.trim()]) {
                                viewerCard.querySelector('a.tw-link').textContent = settings.wasd.userNameEdited[data.user_login.trim()];
                            } else {
                                viewerCard.querySelector('a.tw-link').textContent = data.user_login;
                            }

                            viewerCard.querySelector('a.tw-link').setAttribute('title', data.user_login);
                            // user_id url
                            viewerCard.querySelector('a.tw-link').href = `user/${data.user_id}`;
                            // profile_image
                            viewerCard.querySelector('div.profile-main__avatar').style.backgroundImage = `url(${data.profile_image.large})`;
                            // profile_background
                            viewerCard.querySelector('div.tw-c-background-accent-alt.viewer-card-header__background').style.backgroundImage = `url(${data.profile_background.large})`;
                            // gamepad display
                            viewerCard.querySelector('.wasd-icons-games.ovg').style.display = isLiveDisplay()
                            // stream_total_viewers display
                            viewerCard.querySelector('div.tw-align-items-center.tw-inline-flex.tw-stat.tw-pd-l-1').style.display = isLiveDisplay()
                        }
                        

                        function isLiveDisplay() {if(data.profile_is_live){return'inline-flex';}else{return'none';}}


                        var oReq_channel_id = new XMLHttpRequest();
                        oReq_channel_id.onload = (out) => {
                            var out = JSON.parse(oReq_channel_id.responseText);

                            let databroadcasts  = out;
                            if (viewerCard) {
                                //console.log(out.result);
                                if (out.result.media_container != null) {
                                    // game_name
                                    viewerCard.querySelector('a.tw-c-text-overlay.tw-mg-l-05.tw-mg-t-auto.gameurl').textContent = ` Стримит ${out.result.media_container.game.game_name}`; // n error
                                    viewerCard.querySelector('a.tw-c-text-overlay.tw-mg-l-05.tw-mg-t-auto.gameurl').title = ` Стримит ${out.result.media_container.game.game_name}`;
                                    // stream_total_viewers
                                    viewerCard.querySelector('div.tw-stat__value.viewers').textContent = out.result.media_container.media_container_streams[0].stream_total_viewers;
                                    viewerCard.querySelector('.viewers-title').title = `Всего зрителей за стрим ${out.result.media_container.media_container_streams[0].stream_total_viewers}`;
                                    // game_id url
                                    viewerCard.querySelector('a.tw-c-text-overlay.tw-mg-l-05.tw-mg-t-auto.gameurl').href =  `games/${out.result.media_container.game.game_id}`;
                                } else {
                                    // channel_description
                                    let message = out.result.channel.channel_description;
                                    if (out.result.channel.channel_description) {
                                        viewerCard.querySelector('a.tw-c-text-overlay.tw-mg-l-05.tw-mg-t-auto.gameurl').innerHTML = Helper.WASD.textToURL(message);
                                        viewerCard.querySelector('a.tw-c-text-overlay.tw-mg-l-05.tw-mg-t-auto.gameurl').title = out.result.channel.channel_description;
                                    }

                                    // viewerCard.querySelector('a.tw-c-text-overlay.tw-mg-l-05.tw-mg-t-auto.gameurl').innerHTML = out.result.channel.channel_description;
                                    
                                }

                                // followers_count
                                viewerCard.querySelector('div.tw-stat__value.channal_followers_count').textContent = out.result.channel.followers_count;
                                viewerCard.querySelector('.channal_followers_count-title').title = `${out.result.channel.followers_count} фолловеров`;
                                
                                var oReq_current = new XMLHttpRequest();
                                oReq_current.onload = (out) => {
                                    var out = JSON.parse(oReq_current.responseText);

                                    if (typeof out.result.user_login !== "undefined") if(!(data.user_login.toLowerCase().trim() == out.result.user_login.toLowerCase().trim())) {
                                        let buttonfollow = document.querySelector('div.viewer-card > div.ovg.buttonsdiv > wasd-channel-favorite-btn > wasd-button > button')
                                        let ifollow = document.querySelector('div.viewer-card > div.ovg.buttonsdiv > wasd-channel-favorite-btn > wasd-button > button > i')
                                        let tooltipfollow = document.querySelector('wasd-channel-favorite-btn#selector-channel-favorite-btn-ovg > wasd-button > wasd-tooltip > div.tooltip > div.tooltip-content')
                                        if (buttonfollow) {
                                            if (databroadcasts.result.channel.is_user_follower) {
                                                buttonfollow.classList.add('basic'); // add class to unfollow
                                                buttonfollow.classList.remove('medium');
                                                buttonfollow.classList.remove('disabled');

                                                ifollow.classList.remove('wasd-icons-like');
                                                ifollow.classList.add('wasd-icons-favorite');

                                                tooltipfollow.textContent = ' В избранном ';
                                            } else {
                                                buttonfollow.classList.add('medium'); // add class to follow
                                                buttonfollow.classList.remove('basic');
                                                buttonfollow.classList.remove('disabled');

                                                ifollow.classList.remove('wasd-icons-favorite');
                                                ifollow.classList.add('wasd-icons-like');

                                                tooltipfollow.textContent = ' Добавить в избранное ';
                                            }
                                        }
                                    }
                                };
                                oReq_current.onerror = (out) => {
                                };
                                oReq_current.open("get", 'https://wasd.tv/api/v2/profiles/current', true); oReq_current.send();
                            }

                            let buttonfollow = document.querySelector('div.viewer-card > div.ovg.buttonsdiv > wasd-channel-favorite-btn > wasd-button > button')
                            let ifollow = document.querySelector('div.viewer-card > div.ovg.buttonsdiv > wasd-channel-favorite-btn > wasd-button > button > i')
                            let tooltipfollow = document.querySelector('wasd-channel-favorite-btn#selector-channel-favorite-btn-ovg > wasd-button > wasd-tooltip > div.tooltip > div.tooltip-content')

                            if (buttonfollow) {
                                buttonfollow.addEventListener('click', () => {
                                    
                                    if (!buttonfollow.classList.contains('disabled')) {
                                        let urlurlbroadcasts2 = `https://wasd.tv/api/v2/broadcasts/public?channel_id=${data.channel_id}`;
                                        fetch(urlurlbroadcasts2)
                                        .then(res => res.json())
                                        .then((out) => {
                                            if (!out.result.channel.is_user_follower) {
                                                // follow
                                                let url = `https://wasd.tv/api/channels/${data.channel_id}/followers/`
                                                fetch(url, {method: 'PUT'})
                                                .then(res => res.json())
                                                .then((out) => {
                                                    if (buttonfollow) {
                                                        buttonfollow.classList.add('basic'); // add class to unfollow
                                                        buttonfollow.classList.remove('medium');
                                                        buttonfollow.classList.remove('disabled');

                                                        ifollow.classList.remove('wasd-icons-like');
                                                        
                                                        ifollow.classList.add('wasd-icons-favorite');
                                                        tooltipfollow.textContent = ' В избранном ';
                                                    }
                                                    //console.log(out.result);
                                                });
                                            } else {
                                                // un follow
                                                let url = `https://wasd.tv/api/channels/${data.channel_id}/followers/`;
                                                fetch(url, {method: 'DELETE'})
                                                .then(res => res.json())
                                                .then((out) => {
                                                    if (buttonfollow) {
                                                        buttonfollow.classList.add('medium'); // add class to follow
                                                        buttonfollow.classList.remove('basic');
                                                        buttonfollow.classList.remove('disabled');

                                                        ifollow.classList.remove('wasd-icons-favorite');
                                                        ifollow.classList.add('wasd-icons-like');

                                                        tooltipfollow.textContent = ' Добавить в избранное '; 
                                                    }
                                                    //console.log(out.result);
                                                });
                                            }
                                        })
                                    }
                                        
                                });
                            }
                        };
                        oReq_channel_id.onerror = (out) => {
                        };
                        oReq_channel_id.open("get", `https://wasd.tv/api/v2/broadcasts/public?channel_id=${data.channel_id}`, true); oReq_channel_id.send();

                        var oReq_profiles = new XMLHttpRequest();
                        oReq_profiles.onload = (out) => {
                            var out = JSON.parse(oReq_profiles.responseText);

                            // profile_level
                            if (viewerCard) {
                                if (out.result) {
                                    viewerCard.querySelector('div.tw-stat__value.profile_level').textContent = out.result.user_xp.profile_level;
                                    viewerCard.querySelector('.profile_level-title').title = `${out.result.user_xp.profile_level} уровень канала`;
                                }
                            }
                        };
                        oReq_profiles.onerror = (out) => {
                        };
                        oReq_profiles.open("get", `https://wasd.tv/api/v2/profiles/${data.user_id}`, true); oReq_profiles.send();

                        var oReq_stickerpacks = new XMLHttpRequest();
                        oReq_stickerpacks.onload = (out) => {
                            var out = JSON.parse(oReq_stickerpacks.responseText);

                            //console.log(out.result)
                            if (viewerCard) {
                                if(out.result) {
                                    // paid_title-ovg display
                                    if (out.result.length >= 1) {
                                        viewerCard.querySelector('div.paid_title-ovg').style.display = 'block';
                                        for (let value of out.result[0].stickers) {
                                            stiscersdiv = document.querySelector('div.paidsubs-popup__stickers');
                                            if (stiscersdiv) {
                                                stiscersdiv.insertAdjacentHTML("beforeend", `<div class="sticker-card"><div class="paidsubs-popup__stickers-item" style="background-image: url(${value.sticker_image.large});"></div><wasd-tooltip><div class="tooltip tooltip_position-bottom tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> ${value.sticker_name} </div></div></wasd-tooltip></div>`);
                                            }
                                            
                                        }
                                    } else {
                                        stiscersdiv = document.querySelector('div.paidsubs-popup__stickers');
                                        if (stiscersdiv) {
                                            stiscersdiv.style.display = 'none';
                                        }
                                    }
                                } else {
                                    stiscersdiv = document.querySelector('div.paidsubs-popup__stickers');
                                    if (stiscersdiv) {
                                        stiscersdiv.style.display = 'none';
                                    }
                                }
                            }
                        };
                        oReq_stickerpacks.onerror = (out) => {
                        };
                        oReq_stickerpacks.open("get", `https://wasd.tv/api/sticker-service/stickerpacks?streamer_id=${data.user_id}&limit=12&offset=0`, true); oReq_stickerpacks.send();

                        var oReq_links = new XMLHttpRequest();
                        oReq_links.onload = (out) => {
                            var out = JSON.parse(oReq_links.responseText);

                            if (out.result.length != 0) {
                                linkIndex = 0;
                                itemLinks = document.querySelector('div.item__links-ovg');
                                for (let data of out.result) {
                                    linkIndex ++;
                                    if (itemLinks && linkIndex <= 6) {
                                        itemLinks.insertAdjacentHTML("beforeend", `<a target="_blank" class="link" href="${data.channel_link_value}"><img style="pointer-events: none;" src="${data.channel_link_type.channel_link_type_icon.large}"></a>`);
                                    }
                                    //console.log(data);
                                }
                            }
                        };
                        oReq_links.onerror = (out) => {
                        };
                        oReq_links.open("get", `https://wasd.tv/api/channels/${data.channel_id}/links`, true); oReq_links.send();

                        let channel_name = getChannelName()

                        var oReq_channel = new XMLHttpRequest();
                        oReq_channel.onload = (out) => {
                            var out = JSON.parse(oReq_channel.responseText);

                            var oReq_stream_id = new XMLHttpRequest();
                            oReq_stream_id.onload = (out) => {
                                var out = JSON.parse(oReq_stream_id.responseText);

                                var coll = document.querySelector('button.paid_title-ovg.last_messages')
                                if (coll) {
                                    coll.addEventListener("click", function() {
                                        //coll.querySelector('.accordion-header-arrow-ovg')
                                        document.querySelector('.user_last_messages-ovg').classList.toggle("active");
                                        var content = coll.nextElementSibling;
                                        if (content.style.maxHeight) {
                                            content.style.maxHeight = null;
                                        } else {
                                            if (document.querySelector('.theatre-mode-mobile')) {
                                                document.querySelector('.block-ovg').style.maxHeight = document.querySelector('.chat-container__wrap').clientHeight - (13 + document.querySelector('.ovg-viewer-card').clientHeight)+'px'
                                            } else {
                                                content.style.maxHeight = "190px";
                                            }
                                        } 
                                    });
                                }

                                let messagesDiv = document.querySelector('.block__messages-ovg');
                                if (messagesDiv) {
                                    let divMessageDiv = document.querySelector('.block-ovg');
                                    for (let message of out.result) {
                                        if (message.info.user_id == data.user_id) {

                                            let newusername = settings.wasd.userNameEdited[message.info.user_login.trim()];

                                            if (!newusername) {newusername = message.info.user_login.trim()}

                                            function isSub() {
                                                let is = false
                                                if (Array.isArray(message.info.other_roles)) {
                                                    for(let role of message.info.other_roles) {
                                                        if (!is) is = (role == 'CHANNEL_SUBSCRIBER')
                                                    }
                                                } else {
                                                    if (!is) is = (message.info.other_roles == 'CHANNEL_SUBSCRIBER')
                                                }
                                                return is;
                                            }
                                            function isOwner() {
                                                let is = false
                                                if (Array.isArray(message.info.user_channel_role)) {
                                                    for(let role of message.info.user_channel_role) {
                                                        if (!is) is = (role == 'CHANNEL_OWNER')
                                                    }
                                                } else {
                                                    if (!is) is = (message.info.user_channel_role == 'CHANNEL_OWNER')
                                                }
                                                return is;
                                            }
                                            function isModer() {
                                                let is = false
                                                if (Array.isArray(message.info.user_channel_role)) {
                                                    for(let role of message.info.user_channel_role) {
                                                        if (!is) is = (role == 'CHANNEL_MODERATOR')
                                                    }
                                                } else {
                                                    if (!is) is = (message.info.user_channel_role == 'CHANNEL_MODERATOR')
                                                }
                                                return is;
                                            }

                                            if (message.type == 'MESSAGE') {

                                                let blockmessage = message.info.message;
                                                const userColors = ["#7fba40", "#1c3fc8", "#a5276d", "#913ca7", "#4332b6", "#266bc5", "#5bc3c1", "#d87539", "#a9ad47", "#3ca13b", "#4db89a", "#6a4691", "#f5a623", "#e7719e", "#9fcbef", "#7b4b4b"];

                                                if (settings.wasd.bttvEmotes[1]) {
                                                    blockmessage = Helper.BTTV.replaceText(blockmessage);
                                                }
                                                if (settings.wasd.ffzEmotes[1]) {
                                                    blockmessage = Helper.FFZ.replaceText(blockmessage);
                                                }

                                                // fix link
                                                if (settings.wasd.fixedLinks[1]) {
                                                    if (blockmessage) {
                                                        blockmessage = Helper.WASD.textToURL(blockmessage)
                                                    }
                                                }

                                                date_time = new Date(message.date_time);
                                                let div = document.createElement('div')
                                                div.classList.add('block__messages__item-ovg')

                                                div.innerHTML = `<wasd-chat-message>
                                                    <div class="message-ovg is-time">
                                                        <div class="message__time-ovg"> ${(date_time.getHours() < 10) ? '0' + date_time.getHours() : date_time.getHours()}:${(date_time.getMinutes() < 10) ? '0' + date_time.getMinutes() : date_time.getMinutes()} </div>
                                                        <div class="message__info-ovg">
                                                            <div class="message__info__text-ovg">
                                                                <div class="info__text__status-ovg">
                                                                    ${isSub() ? `<div _ngcontent-iox-c54="" class="info__text__status-paid" style="background-color: ${userColors[message.info.user_id % (userColors.length - 1)]}"><i _ngcontent-iox-c54="" class="icon wasd-icons-star"></i></div>` : ``}
                                                                    <div class="info__text__status__name-ovg ${isModer() ? 'is-moderator' : ''}${isOwner() ? 'is-owner' : ''}" style="${(settings.wasd.colonAfterNickname[1]) ? `margin: 0px;` : ''}color: ${userColors[message.info.user_id % (userColors.length - 1)]}">${isModer() ? '<i _ngcontent-eti-c54="" class="icon wasd-icons-moderator"></i>' : ''}${isOwner() ? '<i _ngcontent-lef-c54="" class="icon wasd-icons-owner"></i>' : ''} ${newusername}</div>
                                                                </div>
                                                                ${(settings.wasd.colonAfterNickname[1]) ? `<span aria-hidden="true" id="colon-after-author-name-ovg" style=" margin-right: 4px; color: var(--yt-live-chat-primary-text-color, rgba(var(--wasd-color-switch--rgb),.88))" >: </span>` : '' }
                                                                <div class="message-text-ovg"><span>${blockmessage}</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </wasd-chat-message>`;
                                                    
                                                let node = messagesDiv.appendChild(div)

                                                if (settings.wasd.stickerovg[1].toString() === '3') {
                                                    stickerovg = node.querySelector(`.message__info__text-ovg img.stickerovg`);
                                                    if (stickerovg) {
                                                        node.remove();
                                                    }
                                                } else if (settings.wasd.stickerovg[1].toString() === '4') {
                                                    stickerovg = node.querySelector(`.message__info__text-ovg img.stickerovg`);
                                                    if (stickerovg) {
                                                        messageText = node.querySelector(`.message-text-ovg > span`);
                                                        messageText.innerHTML = "<span class='chat-message-text stickertext'>Стикер</span>";
                                                    }
                                                }

                                                var messageText = node.querySelector('.message-text-ovg > span')
                                                if (messageText) {

                                                    if (settings.wasd.onClickMention[1].toString() === '0') {
                                                        messageText.innerHTML = messageText.innerHTML.replace(/@[a-zA-Z0-9_-]+/ig, function($1) {
                                                            let username = settings.wasd.userNameEdited[$1.trim().split('@').join('')];
                                                            if (!username) {username = $1.trim().split('@').join('')}
                                                            return `<span style='color: ${usercolor($1.trim())};' class='chat-message-mention' username="${$1}">@${username.trim()}</span>`;
                                                        });
                                                        node.querySelectorAll('.chat-message-mention').forEach(element => {
                                                            usercolorapi(element);
                                                            element.addEventListener('click', ({ target }) => {
                                                                if (target.getAttribute('username')) {
                                                                    Helper.WASD.addUsernameToTextarea(target.getAttribute('username').split('@').join(''));
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
                                                            element.addEventListener('click', ({ target }) => {
                                                                if (target.getAttribute('username')) {
                                                                    if (!Helper.WASD.addUsernameToTextarea(target.getAttribute('username').split('@').join(''))) {
                                                                        Helper.WASD.createUserViewerCard(target.getAttribute('username').split('@').join(''), true);
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


                                                divMessageDiv.scrollTop = divMessageDiv.scrollHeight;
                                            } else if (message.type == 'STICKER') {
                                                let blockmessage = '';
                                                const userColors = ["#7fba40", "#1c3fc8", "#a5276d", "#913ca7", "#4332b6", "#266bc5", "#5bc3c1", "#d87539", "#a9ad47", "#3ca13b", "#4db89a", "#6a4691", "#f5a623", "#e7719e", "#9fcbef", "#7b4b4b"];
                        
                                                if (settings.wasd.sticker[1].toString() === '4') {
                                                    blockmessage = 'Стикер';
                                                }
                                                if (settings.wasd.sticker[1].toString() !== '3') {
                                                    date_time = new Date(message.date_time);
                                                    let div = document.createElement('div')
                                                    div.classList.add('block__messages__item-ovg')
                                                    div.innerHTML = `<wasd-chat-message>
                                                        <div class="message-ovg is-time">
                                                            <div class="message__time-ovg"> ${(date_time.getHours() < 10) ? '0' + date_time.getHours() : date_time.getHours()}:${(date_time.getMinutes() < 10) ? '0' + date_time.getMinutes() : date_time.getMinutes()} </div>
                                                                    <div class="message__info-ovg">
                                                                        <div class="message__info__text-ovg">
                                                                            <div class="info__text__status-ovg">
                                                                                ${isSub() ? `<div _ngcontent-iox-c54="" class="info__text__status-paid" style="background-color: ${userColors[message.info.user_id % (userColors.length - 1)]}"><i _ngcontent-iox-c54="" class="icon wasd-icons-star"></i></div>` : ``}
                                                                                <div class="info__text__status__name-ovg ${isModer() ? 'is-moderator' : ''}${isOwner() ? 'is-owner' : ''}" style="${(settings.wasd.colonAfterNickname[1]) ? `margin: 0px;` : ''}color: ${userColors[message.info.user_id % (userColors.length - 1)]}">${isModer() ? '<i _ngcontent-eti-c54="" class="icon wasd-icons-moderator"></i>' : ''}${isOwner() ? '<i _ngcontent-lef-c54="" class="icon wasd-icons-owner"></i>' : ''} ${newusername}</div>
                                                                            </div>
                                                                            ${(settings.wasd.colonAfterNickname[1]) ? `<span aria-hidden="true" id="colon-after-author-name-ovg" style=" margin-right: 4px; color: var(--yt-live-chat-primary-text-color, rgba(var(--wasd-color-switch--rgb),.88))">: </span>` : '' }
                                                                            <div class="message-text-ovg"><span>${(blockmessage == 'Стикер') ? '<span class="chat-message-text stickertext">Стикер</span>' : blockmessage }</span></div>
                                                                            ${(blockmessage == '') ? '<img alt="sticker" class="sticker small" src="'+message.info.sticker.sticker_image.medium+'">' : ''}
                                                                        </div>
                                                                    </div>
                                                            </div>
                                                    </wasd-chat-message>`;

                                                    let node = messagesDiv.appendChild(div)

                                                    if (settings.wasd.sticker[1].toString() === '3') {
                                                        sticker = node.querySelector(`.message__info__text-ovg img.sticker`);
                                                        if (sticker) {
                                                            node.remove();
                                                        }
                                                    } else if (settings.wasd.sticker[1].toString() === '4') {
                                                        sticker = node.querySelector(`.message__info__text-ovg img.sticker`);
                                                        if (sticker) {
                                                            messageText = node.querySelector(`.message-text > span`);
                                                            messageText.innerHTML = "<span class='chat-message-text stickertext'>Стикер</span>";
                                                        }
                                                    }

                                                    divMessageDiv.scrollTop = divMessageDiv.scrollHeight;
                                                }
                                            }
                                        }
                                    }
                                    if(document.querySelector('.block__messages-ovg').childNodes.length == 0) {
                                        if (document.querySelector('.user_last_messages-ovg')) document.querySelector('.user_last_messages-ovg').style.display = 'none';
                                        
                                    }
                                }
                            };
                            oReq_stream_id.onerror = (err) => {

                                console.log(err)
                            };
                            if (out.result.media_container !== null) {
                                oReq_stream_id.open("get", `https://wasd.tv/api/chat/streams/${out.result.media_container.media_container_streams[0].stream_id}/messages?limit=500&offset=0`, true); oReq_stream_id.send();
                            } else {
                                if (document.querySelector('.user_last_messages-ovg')) document.querySelector('.user_last_messages-ovg').style.display = 'none';
                            }
                        };
                        oReq_channel.onerror = (out) => {

                            if (document.querySelector('.user_last_messages-ovg')) document.querySelector('.user_last_messages-ovg').style.display = 'none';
                        };

                        oReq_channel.open("get", `${new URL(document.URL).pathname.split('/')[1] == 'private-stream'? 'https://wasd.tv/api/v2/broadcasts/closed/' + new URL(document.URL).pathname.split('/')[2] : 'https://wasd.tv/api/v2/broadcasts/public?channel_name=' + getChannelName()} `, true); oReq_channel.send();

                    } else {
                       Helper.WASD.showChatMessage('не удалось получить информацию о пользователе');
                        if (document.querySelector('div[data-a-target="viewer-card-close-button"] > div.viewer-card-drag-cancel > button')) {
                            document.querySelector('div[data-a-target="viewer-card-close-button"] > div.viewer-card-drag-cancel > button').click();
                        }
                    }

                };
                oReq.onerror = (err) => {
                    Helper.WASD.showChatMessage('не удалось получить информацию о пользователе');
                    if (document.querySelector('div[data-a-target="viewer-card-close-button"] > div.viewer-card-drag-cancel > button')) {
                        document.querySelector('div[data-a-target="viewer-card-close-button"] > div.viewer-card-drag-cancel > button').click();
                    }
                };
                oReq.open("get", `https://wasd.tv/api/search/profiles?limit=999&offset=0&search_phrase=${channel_name.trim()}`, true); oReq.send();
            }
        },
        download(filename, text) {
            var element = document.createElement('a');
            element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`);
            element.setAttribute('download', filename);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        },
        dragElement(elmnt) {
            var isDrag = false;
            var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            if (document.querySelector(".tw-border-radius-medium.ovg-viewer-card")) {
                document.querySelector(".tw-border-radius-medium.ovg-viewer-card").onmousedown = dragMouseDown;
            } else {
                elmnt.onmousedown = dragMouseDown;
            }

            function dragMouseDown(e) {
                if (!(e.target.nodeName == 'A' || e.target.nodeName == 'BUTTON' || e.target.className == 'chat-message-mention click')) {isDrag = true} else {isDrag = false}
                e = e || window.event;
                e.preventDefault();
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
            }

            function elementDrag(e) {
                if (isDrag) {
                    e = e || window.event;
                    e.preventDefault();
                    pos1 = pos3 - e.clientX;
                    pos2 = pos4 - e.clientY;
                    pos3 = e.clientX;
                    pos4 = e.clientY;

                    if (!((elmnt.offsetTop - pos2) <= 4)) {
                        if (!((elmnt.offsetTop - pos2) >= (document.querySelector('div#scroll-content.wrapper').offsetHeight-4) - document.querySelector('div.tw-border-radius-medium.ovg-viewer-card').offsetHeight)) {
                            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                        } else {
                            elmnt.style.top = ((document.querySelector('div#scroll-content.wrapper').offsetHeight-4) - document.querySelector('div.tw-border-radius-medium.ovg-viewer-card').offsetHeight+1) + "px";
                        }
                    } else {

                        elmnt.style.top = "5px";
                    }

                    if (!((elmnt.offsetLeft - pos1) <= 4)) {
                        if (!((elmnt.offsetLeft - pos1) >= (document.querySelector('div#scroll-content.wrapper').offsetWidth-4) - document.querySelector('div.tw-border-radius-medium.ovg-viewer-card').offsetWidth)) {
                            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                        } else {
                            elmnt.style.left = ((document.querySelector('div#scroll-content.wrapper').offsetWidth-4) - document.querySelector('div.tw-border-radius-medium.ovg-viewer-card').offsetWidth-1) + "px";
                        }
                    } else {

                        elmnt.style.left = "5px";
                    }
                }
            }

            function closeDragElement() {
                document.onmouseup = null;
                document.onmousemove = null;
            }
        },
        addUsernameToTextarea(username) {
            let textarea = document.querySelector('.footer > div >textarea');
            if (settings.wasd.onClickUser[1].toString() === '1') {
                if (isPressedControl) {
                    if (textarea) {
                        textarea.value+=`@${username} `;
                        textarea.dispatchEvent(new Event('input'));
                        textarea.focus()
                    }
                    return true;
                } else {
                    return false;
                }
            } else if (settings.wasd.onClickUser[1].toString() === '2') {
                if (isPressedShift) {
                    if (textarea) {
                        textarea.value+=`@${username} `;
                        textarea.dispatchEvent(new Event('input'));
                        textarea.focus()
                    }
                    return true;
                } else {
                    return false;
                }
            } else if (settings.wasd.onClickUser[1].toString() === '3') {
                if (isPressedAlt) {
                    if (textarea) {
                        textarea.value+=`@${username} `;
                        textarea.dispatchEvent(new Event('input'));
                        textarea.focus()
                    }
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
        updateStreamTimer() {
            let channel_name = new URL(document.URL).searchParams.get('channel_name');
            if (channel_name == null) channel_name = getChannelName()

            if (channel_name) {

                var oReq = new XMLHttpRequest();
                oReq.onload = (out) => {
                    var out = JSON.parse(oReq.responseText);

                    let date1;
                    if (typeof out.result.media_container !== 'undefined') {
                        if (out.result.media_container !== null) date1 = new Date(out.result.media_container.published_at);
                    }
                    
                    //console.log(date1)

                    if (date1) {

                        if (intervalUpdateStreamTimer) clearInterval(intervalUpdateStreamTimer);
                        Helper.WASD.createStreamUptime();

                        if (document.querySelector('div.stream-uptime > wasd-tooltip > div.tooltip > div')) {
                           let date = new Date(out.result.media_container.published_at).toLocaleString();
                            document.querySelector('div.stream-uptime > wasd-tooltip > div.tooltip > div').innerHTML = ` аптайм трансляции </br> (с ${date}) `
                        }
                        changeUptime()
                        intervalUpdateStreamTimer = setInterval(() => {
                            changeUptime()
                        }, 1000);

                        function changeUptime() {
                            if (out.result.media_container.media_container_status == 'RUNNING') {
                                if(document.querySelector('div.stream-uptime > div.player-info__stat-value')) {
                                    const date = new Date();
                                    dater = new Date(date - date1);

                                    textdate = `${(dater.getUTCHours() < 10) ? '0' + dater.getUTCHours() : ((dater.getUTCDate()*24) + dater.getUTCHours())}:${(dater.getUTCMinutes() < 10) ? '0' + dater.getUTCMinutes() : dater.getUTCMinutes()}:${(dater.getUTCSeconds() < 10) ? '0' + dater.getUTCSeconds() : dater.getUTCSeconds()}`

                                    /*if (jQuery.timeago(date1) == "день") {
                                        textdate = `${(dater.getUTCDate() <= 2) ? '' : (dater.getUTCDate()-2) + ' день '}${(dater.getUTCHours() < 10) ? '0' + dater.getUTCHours() : dater.getUTCHours()}:${(dater.getUTCMinutes() < 10) ? '0' + dater.getUTCMinutes() : dater.getUTCMinutes()}:${(dater.getUTCSeconds() < 10) ? '0' + dater.getUTCSeconds() : dater.getUTCSeconds()}`;
                                    } else {
                                        textdate = jQuery.timeago(date1)
                                    }*/
                                    document.querySelector('div.stream-uptime > div.player-info__stat-value').textContent = ` ${textdate} `;

                                }
                            } else {

                                clearInterval(intervalUpdateStreamTimer);
                            }
                        }
                    }
                };
                oReq.onerror = (err) => {
                    clearInterval(intervalUpdateStreamTimer);
                    if(document.querySelector('div.stream-uptime')) document.querySelector('div.stream-uptime').remove()
                };
                oReq.open("get", `${new URL(document.URL).pathname.split('/')[1] == 'private-stream'? 'https://wasd.tv/api/v2/broadcasts/closed/' + new URL(document.URL).pathname.split('/')[2] : 'https://wasd.tv/api/v2/broadcasts/public?channel_name=' + getChannelName()} `, true); oReq.send();
            }
        },
        createStreamUptime() {
            if (settings.wasd.uptimeStream[1] && new URL(document.URL).pathname.split('/')[2] != 'videos' && new URL(document.URL).pathname.split('/')[2] != 'clips') {
                if (document.querySelector('div.player-info__wrap-line > wasd-user-plays')) {
                    if (!document.querySelector('div.stream-uptime')) {
                        document.querySelector('div.player-info__wrap-line > wasd-user-plays').insertAdjacentHTML("afterend", `<div class="stream-uptime" style="position:relative"><i _ngcontent-ykf-c54="" style="margin-right: 2.8px;margin-left: 2.8px;font-size: 14px;height: 14px;width: 14px;align-items: center;display: flex;justify-content: center;color: var(--wasd-color-text-fourth);" class="icon wasd-icons-freez"></i><div class="player-info__stat-value">00:00:00</div><wasd-tooltip><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> аптайм трансляции </div></div></wasd-tooltip></div>`);
                        document.querySelector('div.stream-uptime').addEventListener('mouseover', () => {
                            document.querySelector('div.stream-uptime > wasd-tooltip > div').style.display = 'flex';
                        });
                        document.querySelector('div.stream-uptime').addEventListener('mouseout', () => {
                            document.querySelector('div.stream-uptime > wasd-tooltip > div').style.display = '';
                        });
                    }
                }
            }
        },
        highlightMessages(username) {
            for(var i of document.querySelectorAll('.block__messages__item')) {
                if (i.querySelector('.info__text__status__name')) if (i.querySelector('.info__text__status__name').getAttribute('username')) if (i.querySelector('.info__text__status__name').getAttribute('username').trim() == username) {
                    i.querySelector('wasd-chat-message > .message').classList.add('openCardColor')
                }
            }
        },
        highlightMessagesRemove() {
            for(var i of document.querySelectorAll('.openCardColor')) {
                i.classList.remove('openCardColor')
            }
        },
        async getIsModerator() {
            var isMod = false;
            return new Promise((resolve, reject) => {
                if (document.querySelector('#selector-header-profile .header__user-profile-name')) {
                    fetch(`https://wasd.tv/api/v2/broadcasts/public?channel_name=${getChannelName()}`)
                    .then(res => res.json())
                    .then((out) => {
                        if (typeof out.result !== 'undefined') if (typeof out.result.channel !== 'undefined') {
                            fetch(`https://wasd.tv/api/chat/streamers/${out.result.channel.user_id}/moderators`)
                            .then(res => res.json())
                            .then((out) => {
                                for(var mod of out.result) {
                                    if (mod.user_login.trim() == document.querySelector('#selector-header-profile .header__user-profile-name').textContent.trim()) {
                                        isMod = true
                                        resolve(isMod)
                                    }
                                }
                                if (!isMod) resolve(isMod)
                            })
                        }
                    })
                } else {
                    resolve(false)
                }
            });
        },
        scrollChatMessage(message, scrollend=200, scrollstart=-1) {
            messagess = document.querySelector('.block')
            if (messagess && message) {
                scrollPosition = messagess.scrollTop + messagess.offsetHeight
                messagePosition = message.offsetTop + message.offsetHeight
                //console.log(messagePosition - scrollPosition)

                if ((messagePosition - scrollPosition) > 0 && (messagePosition - scrollPosition) < 150) {
                    document.querySelector('.block').scrollTop = document.querySelector('.block__messages').scrollHeight
                }

            }
        },
        async getSelfDateFollowedTo(user_login) {
            return new Promise((resolve, reject) => {
                fetch('https://wasd.tv/api/profiles/current/followed-channels?limit=999&offset=0')
                .then(res => res.json())
                .then((out) => {
                    var isMod;
                    for (var data of out.result) {
                        if (data.channel_owner.user_login == user_login) {
                            isMod = true;
                            resolve(data.channel_follower.updated_at)
                        }
                    }
                    if (!isMod) reject('NOT_FOUND')
                })
            })
        },
        removeMessagesOfUsername(username) {
            let messages = document.querySelectorAll('.block__messages__item') 

            for(let message of messages) {
                if(message.getAttribute('username') == username.trim().split('@').join('')){
                        message.remove()
                } else if (settings.wasd.removeMentionBL[1]) {
                    for(let msg of message.querySelectorAll(`.chat-message-mention[username="@${username.trim().split('@').join('')}"]`)) {
                        msg.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
                    }
                }
            }
        },
        parseCmd(message, isDataArray=false, prefix='!') {
            let cmd = message.slice(prefix.length, message.indexOf(" ")).trim().toLowerCase()
            if (!(message.indexOf(" ") != -1)) cmd = message.slice(prefix.length, message.length).trim().toLowerCase()
            let data = message.slice(message.indexOf(" "), message.length).trim()
            if (isDataArray) data = data.split(' ')
            if (data == data.slice(data.length-1)) {data = null}
            return {cmd: cmd, data: data}
        },
    },

    Settings: {
        messageTimeout: null,
        availableSettings: {
            general: {
                autoUpdateChat: {
                    title: 'Автоматически обновлять чат после изменения опции.',
                    type: 'boolean'
                },
                BETA: {
                    title: '(BETA) - Эта опция находится в стадии разработки и может работать некорректно.',
                    type: 'none'
                },
            },
            wasd: {
                chatAppearance: {
                    title: 'Чат',
                    type: 'title'
                },
                messageFollower: {
                    title: 'Скрыть сообщение о фолловере.',
                    type: 'boolean'
                },
                messageSub: {
                    title: 'Скрыть сообщение о новом подписчике.',
                    type: 'boolean'
                },
                messageSystem: {
                    title: 'Скрыть системные сообщения.',
                    type: 'boolean'
                },
                messageHover: {
                    title: 'Подсвечивать сообщениие при наведении.',
                    type: 'boolean'
                },
                colorMessageHover: {
                    title: 'Цвет для опции "Подсвечивать сообщениие при наведении".',
                    type: 'color'
                },
                wasdIconsSmile: {
                    title: 'Cкрыть стикеры / смайлы в панели ввода текста.',
                    type: 'boolean'
                },
                wasdIconsCircleRu: {
                    title: 'Скрыть поддержать в панели ввода текста. (ru)',
                    type: 'boolean'
                },
                bttvEmotes: {
                    title: 'Смайлики BTTV в чате. <a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                    type: 'boolean'
                },
                ffzEmotes: {
                    title: 'Смайлики FFZ в чате. <a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                    type: 'boolean'
                },
                bttvInChatMenu: {
                    title: 'Опция BTTV в меню смайликов в чате.',
                    type: 'boolean'
                },
                ffzInChatMenu: {
                    title: 'Опция FFZ в меню смайликов в чате.',
                    type: 'boolean'
                },
                bttvEmoteSize: {
                    title: 'Разрешение смайликов в чате BTTV и FFZ.<a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                    type: 'select',
                    items: [
                        { value: 0, label: 'bttv-28px, ffz-32px' },
                        { value: 1, label: 'bttv-56px, ffz-64px' },
                        { value: 2, label: 'bttv-112px, ffz-128px' }
                    ]
                },
                sticker: {
                    title: `Отображение стикеров WASD. <a title="Минимизировать (увеличить при наведении) зависит от 'Настройки - Вид сообщений в чате - Большой размер стикеров' " class="helpTitleHover">(INFO)</a> <a title="Eсли отключено 'Автоматически обновлять чат после изменений программы'' дважды щелкните 'Close', чтобы обновить чат." class="helpTitleHover">(F5)</a>`,
                    type: 'select',
                    items: [
                        { value: 0, label: 'По умолчанию' },
                        { value: 1, label: 'Минимизировать' },
                        { value: 2, label: `Минимизировать (увеличить при наведении)` }, // (зависит от 'Вид сообщений в чате - Большой размер стикеров')
                        { value: 3, label: 'Скрыть сообщение' },
                        { value: 4, label: 'Показать сообщение: Стикер' }
                    ]
                },
                stickerovg: {
                    title: `Отображение стикеров BTTV и FFZ. <a title="Минимизировать (увеличить при наведении) зависит от 'Настройки - Вид сообщений в чате - Большой размер стикеров' " class="helpTitleHover">(INFO)</a> <a title="Eсли отключено 'Автоматически обновлять чат после изменений программы'' дважды щелкните 'Close', чтобы обновить чат." class="helpTitleHover">(F5)</a>`,
                    type: 'select',
                    items: [
                        { value: 0, label: 'По умолчанию' },
                        { value: 1, label: 'Минимизировать' },
                        { value: 2, label: `Минимизировать (увеличить при наведении)` }, // (зависит от 'Вид сообщений в чате - Большой размер стикеров')
                        { value: 3, label: 'Скрыть сообщение' },
                        { value: 4, label: 'Показать сообщение: Стикер' }
                    ]
                },
                bttvSize: {
                    title: 'Размер стикеров BTTV и FFZ.',
                    type: 'select',
                    items: [
                        { value: '128px', label: 'Большой' },
                        { value: '56px', label: 'Маленький' }
                    ]
                },
                forceResizeStickers: {
                    title: 'Принудиельно изменять размер стикеров WASD.',
                    type: 'select',
                    items: [
                        { value: 0, label: 'Нет' },
                        { value: 1, label: 'Большой' },
                        { value: 2, label: 'Маленький' }
                    ]
                },
                /*decreaseIndentationStickerMenu: {
                    title: 'Уменьшить отступ в меню смайликов - СТИКЕРЫ.',
                    type: 'boolean'
                },
                decreaseIndentationSmilesMenu: {
                    title: 'Уменьшить отступ в меню смайликов - СМАЙЛЫ.',
                    type: 'boolean'
                },
                decreaseIndentationBTTVandFFZMenu: {
                    title: 'Уменьшить отступ в меню смайликов - BTTV и FFZ.',
                    type: 'boolean'
                },
                highlightStickersStickerMenu: {
                    title: 'Подсвечивать СМАЙЛЫ, BTTV и FFZ эмоции в меню стикеров.',
                    type: 'boolean'
                },*/
                paddingChatMessage: {
                    title: 'Заполнение сообщений чата.',
                    type: 'select',
                    items: [
                        { value: 0, label: 'Twitch (5px 20px)' },
                        { value: 1, label: 'YouTube (4px 24px)' },
                        { value: 2, label: 'GoodGame (4px 9px)' },
                        { value: 3, label: 'Другой (3px 15px)' },
                        { value: 4, label: 'WASD (2px 12px)' }
                    ]
                },
                colonAfterNickname: {
                    title: 'Двоеточие после никнейма. <a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                    type: 'boolean'
                },
                /*smallBadges: {
                    title: 'Маленькие значки. <a title="Эта опция находится в стадии разработки и может работать некорректно." class="helpTitleHover">(BETA)</a>',
                    type: 'boolean'
                },*/
                colorAtTheMention: {
                    title: 'Отображать упоминания пользователей в чата с их цветом никнейма. <a title="Эта опция находится в стадии разработки и может работать некорректно." class="helpTitleHover">(BETA)</a> <a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                    type: 'boolean'
                },
                chatWidth: {
                    title: 'Размер (Ширина) чата в пикселях. (320)',
                    type: 'number',
                    min: 200,
                    max: 1200
                },
                fontSize: {
                    title: 'Размер шрифта в пикселях. (14) <a title="Эта опция находится в стадии разработки и может работать некорректно." class="helpTitleHover">(BETA)</a>',
                    type: 'number',
                    min: 12.0,
                    max: 18.0
                },
                highlightMessagesBold: {
                    title: 'Выделять упоминания в чате жирным шрифтом.',
                    type: 'boolean'
                },
                streamerMessage: {
                    title: 'Скрыть сообщение стримеру (донат).',
                    type: 'boolean'
                },
                topPanel: {
                    title: 'Скрыть верхнюю панель (донат).',
                    type: 'boolean'
                },
                topPanelChallenge: {
                    title: 'Скрыть верхнюю панель (испытание).',
                    type: 'boolean'
                },
                moderatorMenu: {
                    title: 'Меню модератора. <a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                    type: 'select',
                    items: [
                        { value: 0, label: 'Нет' },
                        { value: 1, label: 'ALT меню (YouTube)' },
                        { value: 2, label: 'Twitch' }
                    ]
                },
                moderatorMenuAutomatic: {
                    title: 'Автоматически подтверждать бан/удаление (Меню модератора).',
                    type: 'boolean'
                },
                alternatingColorChatMessages: {
                    title: 'Отображать строки с меняющимеся цветами фона.',
                    type: 'boolean'
                },
                alternatingColorChatMessagesColor: {
                    title: 'Цвет для опции "Отображать строки с меняющимеся цветами фона".',
                    type: 'color'
                },
                onClickMention: {
                    title: 'Действие при клике на упоминание пользователя.',
                    type: 'select',
                    items: [
                        { value: 0, label: 'Нет' },
                        { value: 1, label: 'Добавить в текстовое поле' },
                        { value: 2, label: 'Показать карточку пользователя' }
                    ]
                },
                onClickUserName: {
                    title: 'Действие при клике на пользователя. <a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                    type: 'select',
                    items: [
                        { value: 0, label: 'Нет' },
                        { value: 1, label: 'Добавить в текстовое поле' },
                        { value: 2, label: 'Показать карточку пользователя' }
                    ]
                },
                onClickUser: {
                    title: 'Действие при клике на пользователя или упоминание при зажатой клавише. <a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                    type: 'select',
                    items: [
                        { value: 0, label: 'Нет' },
                        { value: 1, label: 'Добавить в текстовое поле (Ctrl)' },
                        { value: 2, label: 'Добавить в текстовое поле (Shift)' },
                        { value: 3, label: 'Добавить в текстовое поле (Alt)' }
                    ]
                },
                linkColor: {
                    title: 'Цвет ссылки.',
                    type: 'color',
                    /*items: [
                        { value: 0, label: 'Default' },
                        { value: 1, label: 'Google' },
                        { value: 2, label: 'Twitch' },
                        { value: 3, label: 'Blue' }
                    ]*/
                },
                fixedLinks: {
                    title: 'Исправить ссылки в чате. <a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                    type: 'boolean'
                },
                linkRecognizerall: {
                    title: 'Распознавание всех ссылок. <a title="Эта опция находится в стадии разработки и может работать некорректно." class="helpTitleHover">(BETA)</a> <a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                    description: 'Распознано с использованием <a target="_blank" href="https://github.com/FrankerFaceZ/link-service">API</a>.',
                    type: 'boolean'
                },
                linkRecognizerWASD: {
                    title: 'Распознавание ссылок wasd.tv. <a title="Эта опция находится в стадии разработки и может работать некорректно." class="helpTitleHover">(BETA)</a> <a title="(wasd.tv/username) (wasd.tv/game/id) (wasd.tv/?record=id) (wasd.tv/?clip=id)" class="helpTitleHover">(i)</a> <a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                    type: 'boolean'
                },
                linkRecognitionRights: {
                    title: 'Необходимый уровень пользователя для "Распознавание ссылок". <a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                    type: 'select',
                    items: [
                        { value: 0, label: 'Стример' },
                        { value: 1, label: 'Модератор' },
                        { value: 2, label: 'Подписчик' },
                        { value: 3, label: 'Каждый' }
                    ]
                },
                decorationLink: {
                    title: 'Подчеркивать ссылки при наведении.',
                    type: 'boolean'
                },
                removeMentionBL: {
                    title: 'Удалять сообщения упоминающие пользователей в ЧС. <a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                    type: 'boolean'
                },
                formatMessageSentTime: {
                    title: 'Формат отметок времени. (Для новых сообщений) <a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                    description: 'Отформатировано <a target="_blank" href="https://github.com/iamkun/dayjs/blob/dev/docs/ru/README-ru.md">library Day.js</a>.',
                    type: 'select',
                    items: [
                        { value: 'h:mm', label: '12 часов' },
                        { value: 'h:mm:ss', label: '12 часов с секундами' },
                        { value: 'H:mm', label: '24 часа' },
                        { value: 'H:mm:ss', label: '24 часа с секундами' },
                        { value: 'hh:mm', label: 'Дополнительные' },
                        { value: 'hh:mm:ss', label: 'Дополнительные с секундами' },
                        { value: 'HH:mm', label: 'Дополнительные 24 часа' },
                        { value: 'HH:mm:ss', label: 'Дополнительные 24 часа с секундами' }
                    ]
                },
                mentionSelf: {
                    title: 'Выделять сообщения, упоминающие вас.',
                    type: 'boolean'
                },
                colorMentionSelf: {
                    title: 'Цвет сообщения, упоминающие вас.',
                    type: 'color'
                },
                highlightMessagesOpenCard: {
                    title: 'Выделять сообщения пользователей с открытыми карточками.',
                    type: 'boolean'
                },
                highlightMessagesOpenCardColor: {
                    title: 'Цвет выделения сообщения пользователя с открытой карточкой.',
                    type: 'color'
                },
                clickMentionAll: {
                    title: 'Ник пользователя в действиях это упоминание (Избранное, Подписка).',
                    type: 'boolean'
                },
                underlineUsernameAndMention: {
                    title: 'Подчеркивать имя пользователя/упоминания при наведении.',
                    type: 'boolean'
                },
                artificialChatDelay: {
                    title: 'Искусственная задержка чата.',
                    type: 'select',
                    items: [
                        { value: 0, label: 'По умолчанию' },
                        { value: 300, label: 'Модерация ботов; (0,3 сек.)' },
                        { value: 1200, label: 'Умеренная модерация; (1,2 сек.)' },
                        { value: 5000, label: 'Убрать спойлеры (5 сек.)' },
                        { value: 10000, label: 'Очень большая (10 сек.)' },
                        { value: 15000, label: 'Крайне большая (15 сек.)' },
                        { value: 20000, label: 'Задержать чат (20 сек.)' },
                        { value: 30000, label: 'Полминуты (30 сек.)' },
                        { value: 60000, label: 'Зачем??? (1 мин.)' }
                    ]
                },

                playerGeneral: {
                    title: 'Проигрыватель',
                    type: 'title'
                },
                webkitScrollbarWidth: {
                    title: 'Скрыть полосу прокрутки плеера.',
                    type: 'boolean'
                },
                giftsWrapperSide: {
                    title: 'Cкрыть полосу подарков.',
                    type: 'boolean'
                },
                giftsWrapperTopRight: {
                    title: 'Скрыть подарки вверху справа.',
                    type: 'boolean'
                },
                videoOverlay: {
                    title: "Скрыть оверлей над проигрывателем.",
                    type: 'boolean'
                },
                pictureInPicture: {
                    title: "Добавить кнопку 'Картинка в картинке' к управлению проигрывателем. (PIP)",
                    type: 'boolean'
                },
                /*resetToPlayer: {
                    title: 'Add button `Reset player` to player control. <a title="Эта опция находится в стадии разработки и может работать некорректно." class="helpTitleHover">(BETA)</a>',
                    description: 'Добавить кнопку `Сбросить проигрыватель` к управлению проигрывателем.',
                    type: 'boolean'
                },*/
                autoPlayStreamersOnMain: {
                    title: 'Авто-воспроизведение предложенных стримеров на главной странице.',
                    type: 'boolean'
                },
                pressedFullScreen: {
                    title: "Нажмите клавишу 'f' чтобы переключить режим 'На весь экран'",
                    type: 'boolean'
                },
                pressedTheater: {
                    title: "Нажмите клавишу 't' чтобы переключить 'Театральный режим'",
                    type: 'boolean'
                },
                pressedPIP: {
                    title: "Нажмите клавишу 'i' чтобы переключить режим 'Картинка в картинке'",
                    type: 'boolean'
                },
                pressedClip: {
                    title: "Нажмите клавишу 'x' чтобы создать `Клип`",
                    type: 'boolean'
                },
                uptimeStream:  {
                    title: 'Аптайм трансляции. <a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                    type: 'boolean'
                },
                alwaysOpenVolumeControl: {
                    title: 'Всегда раскрывать регулятор громкости.',
                    type: 'boolean'
                },
                mutePlayerOnMiddleMouse: {
                    title: 'Заглушить или включить звук проигрывателя путём щелчка по средней кнопке мыши.',
                    type: 'boolean'
                },
                iframeCreateClip: {
                    title: 'Создавать клипы в проигрывателе а не новом окне.',
                    type: 'boolean'
                },/*
                autoOnlyAudio: {
                    title: 'Автоматически открывать стрим в режиме "Только звук".',
                    type: 'boolean'
                },*/

                channelAppearance: {
                    title: 'Канал',
                    type: 'title'
                },
                hideDonationChannelButton: {
                    title: 'Скрыть кнопку пожертвования канал.',
                    type: 'boolean'
                },
                hideAmazingChannelButtoan: {
                    title: 'Скрыть кнопку похвалить канал.',
                    type: 'boolean'
                },
                hideGiftButtons: {
                    title: 'Скрыть подарочные кнопки.',
                    type: 'boolean'
                },

                appearanceLocation: {
                    title: 'Внешний вид',
                    type: 'title'
                },
                chatOnTheLeft: {
                    title: 'Чат слева.',
                    type: 'boolean'
                },
                hidePanelMobile: {
                    title: 'Скрыть мешающие панели на мобильном устройстве.',
                    type: 'boolean'
                },
                hideBannerOnHome: {
                    title: 'Скрыть баннер на главной странице.',
                    type: 'boolean'
                },
                hideSelectorStreamSettings: {
                    title: 'Скрыть кнопку "Начать стрим" в заголовке.',
                    type: 'boolean'
                },
            },
            bot: {
                mybotmod: {
                    title: 'БОТ модератор (beta)',
                    description: 'Эта функция позволяет вам и модераторам использовать бота на своем канале.',
                    type: 'title'
                },
                cmdPrefixBotMod: {
                    title: 'Префикс команд.',
                    type: 'botevent'
                },
                cmdBan: {
                    title: '/ban/unban - Забанить/Разбанить пользователя в чате.',
                    type: 'boolean'
                },
                cmdMod: {
                    title: '/mod/unmod - Повысить пользователя до модератора канала, что даст ему доступ к командам и функциям и наоборот.',
                    type: 'boolean'
                },
                cmdRaid: {
                    title: '/raid  - Эта команда отправит зрителя на другой канал в прямом эфире.',
                    type: 'boolean'
                },
                cmdTitle: {
                    title: '/title - Изменить название стрима.',
                    type: 'boolean'
                },
                cmdGame: {
                    title: '/game - Обновить игру канала (без ошибок).',
                    type: 'boolean'
                },
                cmdFollowers: {
                    title: '/followers/followersoff - Эта команда включает/отключает режим чата только для фолловеров.',
                    type: 'boolean'
                },
                cmdSubscribers: {
                    title: '/subscribers/subscribersoff - Эта команда включает/отключает режим чата только для платных подписчиков.',
                    type: 'boolean'
                },

                mybotuser: {
                    title: 'БОТ пользователь (beta)',
                    description: 'Эта функция позволяет всем использовать бота на вашем канале.',
                    type: 'title'
                },
                cmdPrefixBotUser: {
                    title: 'Префикс команд.',
                    type: 'botevent'
                },
                cmdUptime: {
                    title: '!uptime - Эта команда позволяет узнать сколько идет стрим.',
                    type: 'boolean'
                },
                cmdUserTitle: {
                    title: '!title - Эта команда позволяет узнать название стрима.',
                    type: 'boolean'
                },
                cmdUserGame: {
                    title: '!game - Эта команда позволяет узнать категорию стрима.',
                    type: 'boolean'
                },
                /*cmdFollowage: {
                    title: '!followage - Эта команда позволяет узнать сколько пользователь отслеживает на ваш канал.',
                    type: 'boolean'
                },*/

                help: {
                    title: 'БОТ (beta)',
                    type: 'title'
                },
                cmdPrefix: {
                    title: 'Префикс команд.',
                    type: 'botevent'
                },
                cmdUser: {
                    title: '/user - Эта команда открывает карточку профиля пользователя.',
                    type: 'boolean'
                },

                event: {
                    title: 'Событие (beta)',
                    type: 'title'
                },
                eventFollow: {
                    title: 'Пользователь подписался ({user_login})',
                    type: 'botevent'
                },
                eventSub: {
                    title: 'Пользователь платно подписался ({user_login}, {product_name})',
                    type: 'botevent'
                },
            }
        },
        showMessage(message, type = 'success') {
            if (this.messageTimeout) {
                clearTimeout(this.messageTimeout);
            }

            let statusElement = BetterStreamChat.settingsDiv.querySelector('#status');
            let textElement = statusElement.querySelector('p');
            textElement.innerHTML = message;
            textElement.classList.remove(...statusElement.classList);
            textElement.classList.add(type);
            statusElement.classList.add('active');
            let hide = () => {
                statusElement.removeEventListener('click', hide);
                statusElement.classList.remove('active');
                this.messageTimeout = null;
            };
            statusElement.addEventListener('click', hide);
            this.messageTimeout = setTimeout(hide, 2000);
        },
        _basic(title, description, formField, line=false) {
            return `<div class="option">
                <div class="labelField">
                    <span ${line ? 'class="titleline" style="padding-left: 5px;' : 'class="title"'}">${title}</span>
                    <span class="description">${description || ''}</span>
                </div>
                <div class="formField">${formField}</div>
            </div>`;
        },
        save(optionElements) {
            let newSettings = JSON.parse(JSON.stringify(settings));
            for (let option of optionElements) {
                if (!option.dataset.name) {
                    continue;
                }

                let split = option.dataset.name.split('_');
                let value = null;

                if (option.type === 'radio' && option.classList.contains('botevent')) {
                    value = [settings[split[0]][split[1]][0], [settings[split[0]][split[1]][1][0], option.checked && option.value === '1']];
                } else if (option.type === 'text' && option.classList.contains('botevent')) {
                    value = [settings[split[0]][split[1]][0], [option.value, settings[split[0]][split[1]][1][1]] ];
                } else if (option.type === 'radio') {
                    value = [settings[split[0]][split[1]][0], option.checked && option.value === '1'];
                } else if (option.type === 'checkbox') {
                    value = [settings[split[0]][split[1]][0], option.checked];
                } else if (option.dataset.type === 'number' || option.type === 'number') {
                    value = [settings[split[0]][split[1]][0], parseFloat(option.value)];
                } else {
                    value = [settings[split[0]][split[1]][0], option.value];
                }

                if (!newSettings[split[0]]) {
                    newSettings[split[0]] = {};
                }

                newSettings[split[0]][split[1]] = value;

                let onChange = this.availableSettings[split[0]][split[1]].onChange;
                if (typeof onChange === 'function') {
                    onChange(value);
                }
            }

            // update chat
            setTimeout(() => {
                if (settings.general.autoUpdateChat[1]) {
                    let header_block_menu = document.querySelector('.header > div.header__block__menu')
                    let header_update = document.querySelector('.update > i')
                    if (header_block_menu) {
                        if (header_block_menu.childNodes.length >= 1) {
                            header_update.classList.add('resetPlayerLoading');
                            if (header_block_menu.childNodes[1].nodeName != "#comment") {
                                header_block_menu.childNodes[1].click();
                            } else {
                                header_update.classList.remove('resetPlayerLoading');
                            }
                            if (header_block_menu.childNodes[0].nodeName != "#comment") {
                                header_block_menu.childNodes[0].click();
                            }
                            setTimeout(() => {
                                header_update.classList.remove('resetPlayerLoading');
                            }, 1000);
                        } else {
                            header_update.classList.remove('resetPlayerLoading');
                        }

                    }
                }
            }, 50);
            

            chrome.storage[storageType].set(newSettings, () => {

                this.showMessage('параметры сохранены');
            });
        },
        build(category) {
            let html = '';
            let categorySettings = this.availableSettings[category];
            for (let name in categorySettings) {
                if (categorySettings.hasOwnProperty(name)) {
                    let setting = categorySettings[name];
                    let type = setting.type;
                    let fieldName = `${category}_${name}`;
                    if (type === 'boolean') {
                        html += this.boolean(fieldName, setting.title, setting.description, settings[category][name]);
                    } else if (type === 'text') {
                        html += this.text(fieldName, setting.title, setting.description, settings[category][name]);
                    } else if (type === 'number') {
                        html += this.number(fieldName, setting.title, setting.description, settings[category][name], setting.min, setting.max);
                    } else if (type === 'select') {
                        html += this.select(fieldName, setting.title, setting.description, setting.items, settings[category][name]);
                    } else if (type === 'none') {
                        html += this.none(fieldName, setting.title, setting.description, settings[category][name]);
                    } else if (type === 'title') {
                        html += this.title(fieldName, setting.title, setting.description, settings[category][name]);
                    } else if (type === 'color') {
                        html += this.color(fieldName, setting.title, setting.description, settings[category][name]);
                    } else if (type === 'botevent') {
                        html += this.botevent(fieldName, setting.title, setting.description, settings[category][name]);
                    }
                }
            }

            return html;
        },
        boolean(name, title, description, defaultValue = false, yesButton = 'Вкл', noButton = 'Откл') {
            if (typeof defaultValue[1] === 'undefined') {
                updateSettingsToNew()
                return ''
            } else {
                return this._basic(title, description, `
                    <ol class="flexibleButtonGroup optionTypeBoolean">
                        <li>
                            <input type="radio" id="boolean_${name}" name="boolean_${name}" value="1" class="optionField" data-name="${name}" ${defaultValue[1] ? 'checked' : ''}>
                            <label for="boolean_${name}" class="green"><span class="icon16 fa-check"></span> ${yesButton}</label>
                        </li>
                        <li>
                            <input type="radio" id="boolean_${name}_no" name="boolean_${name}" value="0" class="optionField" data-name="${name}" ${!defaultValue[1] ? 'checked' : ''}>
                            <label for="boolean_${name}_no" class="red"><span class="icon16 fa-times"></span> ${noButton}</label>
                        </li>
                        <button class="optionField def" data-name="${name}" option-type="boolean"><div class="tooltip-ovg"> Сбросить по умолчанию </div><i _ngcontent-khk-c259="" class="wasd-icons-close"></i></button>
                    </ol>`);
            }
        },
        text(name, title, description, defaultValue = '') {
            if (typeof defaultValue[1] === 'undefined') {
                updateSettingsToNew()
                return ''
            } else {
                return this._basic(title, description, `
                    <ol class="flexibleButtonGroup optionTypeBoolean">
                        <input type="text" class="optionField" data-name="${name}" value="${defaultValue[1]}" />
                        <button class="optionField def" data-name="${name}" option-type="text"><div class="tooltip-ovg"> Сбросить по умолчанию </div><i _ngcontent-khk-c259="" class="wasd-icons-close"></i></button>
                    </ol>`);
            }
        },
        number(name, title, description, defaultValue = '', min = 0, max = 0) {
            if (typeof defaultValue[1] === 'undefined') {
                updateSettingsToNew()
                return ''
            } else {
                return this._basic(title, description, `
                    <ol class="flexibleButtonGroup optionTypeBoolean">
                        <input type="number" class="optionField" data-name="${name}" value="${defaultValue[1]}" ${min ? 'min="' + min + '" ' : ''}${max ? 'max="' + max + '"' : ''}/>
                        <button class="optionField def" data-name="${name}" option-type="number"><div class="tooltip-ovg"> Сбросить по умолчанию </div><i _ngcontent-khk-c259="" class="wasd-icons-close"></i></button>
                    </ol>`);
            }
        },
        select(name, title, description, items = [], defaultValue = '') {
            if (typeof defaultValue[1] === 'undefined') {
                updateSettingsToNew()
                return ''
            } else {
                let selectOptions = '';
                defaultValue[1] = defaultValue[1].toString();
                for (let item of items) {
                    selectOptions += `
                    <option value="${item.value}"${item.value.toString() === defaultValue[1] ? ' selected' : ''}>${item.label}</option>`;
                }
                return this._basic(title, description, `
                    <ol class="flexibleButtonGroup optionTypeBoolean">
                        <select class="optionField" data-name="${name}">${selectOptions}</select>
                        <button class="optionField def" data-name="${name}" option-type="select"><div class="tooltip-ovg"> Сбросить по умолчанию </div><i _ngcontent-khk-c259="" class="wasd-icons-close"></i></button>
                    </ol>`);
            }
        },
        none(name, title, description, defaultValue = '') {
            return this._basic(title, description, ``, false);
        },
        title(name, title, description, defaultValue = '') {
            return this._basic(title, description, ``, true);
        },
        color(name, title, description, defaultValue = '') {
            if (typeof defaultValue[1] === 'undefined') {
                updateSettingsToNew()
                return ''
            } else {
                return this._basic(title, description, `
                    <ol class="flexibleButtonGroup optionTypeBoolean">
                        <input type="color" class="optionField" data-name="${name}" value="${defaultValue[1]}" />
                        <button class="optionField def" data-name="${name}" option-type="color"><div class="tooltip-ovg"> Сбросить по умолчанию </div><i _ngcontent-khk-c259="" class="wasd-icons-close"></i></button>
                    </ol>`);
            }
        },
        botevent(name, title, description, defaultValue = ['', false], yesButton = 'Вкл', noButton = 'Откл') {
            if (typeof defaultValue[1] === 'undefined') {
                updateSettingsToNew()
                return ''
            } else {
                return this._basic(title, description, `
                    <ol class="flexibleButtonGroup optionTypeBoolean">
                        <input type="text" class="optionField botevent" data-name="${name}" value="${defaultValue[1][0]}"/>
                        <li>
                            <input type="radio" id="boolean_${name}" name="boolean_${name}" value="1" class="optionField botevent" data-name="${name}" ${defaultValue[1][1] ? 'checked' : ''}>
                            <label for="boolean_${name}" class="green"><span class="icon16 fa-check"></span> ${yesButton}</label>
                        </li>
                        <li>
                            <input type="radio" id="boolean_${name}_no" name="boolean_${name}" value="0" class="optionField botevent" data-name="${name}" ${!defaultValue[1][1] ? 'checked' : ''}>
                            <label for="boolean_${name}_no" class="red"><span class="icon16 fa-times"></span> ${noButton}</label>
                        </li>
                        <button class="optionField def" data-name="${name}" option-type="botevent"><div class="tooltip-ovg"> Сбросить по умолчанию </div><i _ngcontent-khk-c259="" class="wasd-icons-close"></i></button>
                    </ol>`
                );
            }
        },
    },
    
    socket: {
        socketd: null,
        streamId: 0,
        channelId: 0,
        intervalcheck: null,
        /*auth(user_email, user_password) {
            let data = { user_email: user_email, user_password: user_password};
            let response = {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type':'application/json'} ,}
            fetch(`https://wasd.tv/api/v2/auth/tokens`, response)
            .then(res => res.json())
            .then((out) => {
                console.log(out)
            })
        },*/
        async start(channel_name) {
            new Promise((resolve, reject) => {
                if (!Helper.socket.socketd) {
                    Helper.socket.socketd = new WebSocket("wss://chat.wasd.tv/socket.io/?EIO=3&transport=websocket");

                    Helper.socket.socketd.onopen = function(e) {

                        var oReq_chatToken = new XMLHttpRequest();
                        oReq_chatToken.onload = (out) => {
                            var out = JSON.parse(oReq_chatToken.responseText);

                            Helper.socket.jwt = out.result

                            var oReq_channel_name = new XMLHttpRequest();
                            oReq_channel_name.onload = (out) => {
                                var out = JSON.parse(oReq_channel_name.responseText);

                                if (typeof out.result !== 'undefined') if (out.result !== null) if (out.result.media_container !== null) if (typeof out.result.media_container !== 'undefined') {
                                    Helper.socket.streamId = out.result.media_container.media_container_streams[0].stream_id
                                    Helper.socket.channelId = out.result.channel.channel_id

                                    var data = `42["join",{"streamId":${Helper.socket.streamId},"channelId":${Helper.socket.channelId},"jwt":"${Helper.socket.jwt}","excludeStickers":true}]`;
                                    if (Helper.socket.socketd.readyState === 1) Helper.socket.socketd.send(data);
                                    
                                    Helper.socket.intervalcheck = setInterval(() => {
                                        if (Helper.socket.socketd) {
                                            try {
                                                if (Helper.socket.socketd && Helper.socket.socketd.readyState === 1) Helper.socket.socketd.send('2')
                                            } catch {
                                                clearInterval(Helper.socket.intervalcheck)
                                                Helper.socket.socketd = null
                                                console.log('[catch]', Helper.socket.socketd)
                                                Helper.socket.start(getChannelName())
                                            }
                                        }
                                    }, 5000)
                                }
                            };

                            oReq_channel_name.open("get", `${new URL(document.URL).pathname.split('/')[1] == 'private-stream'? 'https://wasd.tv/api/v2/broadcasts/closed/' + new URL(document.URL).pathname.split('/')[2] : 'https://wasd.tv/api/v2/broadcasts/public?channel_name=' + getChannelName()} `, true); oReq_channel_name.send();

                        };
                        oReq_chatToken.onerror = (out) => {

                        };
                        oReq_chatToken.open("get", `https://wasd.tv/api/auth/chat-token`, true); oReq_chatToken.send();
                    };

                    Helper.socket.socketd.onclose = function(e) {
                        clearInterval(Helper.socket.intervalcheck)
                        Helper.socket.socketd = null
                        if (e.wasClean) {
                            console.log(`[close] Соединение закрыто чисто, код= ${e.code} ${e.reason == '' ? '':'причина='+e.reason }`);
                            // Helper.socket.start(getChannelName())
                        } else {
                            console.log('[close] Соединение прервано');
                        }
                    };

                    Helper.socket.socketd.onmessage = function(e) {
                        if (e.data == 3) {
                        } else {
                            var JSData;
                            if (e.data.indexOf('[') != -1) {
                                code = e.data.slice(0, e.data.indexOf('['));
                                data = e.data.slice(e.data.indexOf('['), e.data.length);
                                JSData = JSON.parse(data);
                            } else {
                                JSData = null;
                                code = e.data;
                            }

                            if (JSData) switch (JSData[0]) {
                                case "joined":
                                    //console.log(`${code}[${JSData[0]}]`, JSData[1]);
                                    break;
                                case "system_message":
                                    //console.log(`${code}[${JSData[0]}] ${JSData[1].message}`, JSData);
                                    break;
                                case "message":
                                    //console.log(`${code}[${JSData[0]}] ${JSData[1].user_login}: ${JSData[1].message}`, JSData);
                                    break;
                                case "sticker":
                                    //console.log(`${code}[${JSData[0]}] ${JSData[1].user_login}: ${JSData[1].sticker.sticker_alias}`, JSData);
                                    break;
                                case "viewers":
                                    //console.log(`${code}[${JSData[0]}] anon: ${JSData[1].anon} auth: ${JSData[1].auth} total: ${JSData[1].total}`, JSData);
                                    break;
                                case "event":
                                    //console.log(`${code}[${JSData[0]}] ${JSData[1].event_type} - ${JSData[1].payload.user_login} ${JSData[1].message}`, JSData);
                                    break;
                                case "giftsV1":
                                    //console.log(`${code}[${JSData[0]}] ${JSData[1].gift_name}`, JSData);
                                    break;
                                case "yadonat":
                                    //console.log(`${code}[${JSData[0]}] ${JSData[1].donator} - ${JSData[1].donation} - ${JSData[1].msg}`, JSData);
                                    break;
                                case "messageDeleted":
                                    //console.log(`${code}[${JSData[0]}] ${JSData[1].ids}`, JSData);
                                    break;
                                case "subscribe":
                                    //console.log(`${code}[${JSData[0]}] ${JSData[1].user_login} - ${JSData[1].product_name}`, JSData);
                                    break;
                                case "_system":
                                    //console.log(`${code}[${JSData[0]}] ${JSData[1]}`, JSData);
                                    break;
                                case "leave":
                                    //console.log(`${code}[${JSData[0]}] ${JSData[1].streamId}`, JSData);
                                    resolve('leave')
                                    break;
                                case "user_ban":
                                    //console.log(`${code}[${JSData[0]}] ${JSData[1].payload.user_login}`, JSData);
                                    break;
                                case "settings_update":
                                    //console.log(`${code}[${JSData[0]}] ${JSData[1]}`, JSData);
                                    break
                                default:
                                    Helper.WASD.addMessageToChat('Произошло что-то неизвестное помогите BetterWASD узнать что именно, кликните, чтобы отправить форму.', true).addEventListener('click', ()=>{
                                        window.open(`mailto:ovgamesdev@gmail.com?subject=New parameter ${code}-${JSData[0]}&body=${JSON.stringify(JSData)}`)
                                    })
                                    console.warn(`${code}[${JSData[0]}]`, JSData);
                                    break;
                            }

                        }
                    };

                    Helper.socket.socketd.onerror = function(error) {
                        clearInterval(Helper.socket.intervalcheck)
                        Helper.socket.socketd = null
                        console.log(`[error] ${error}`);
                        Helper.socket.start(getChannelName())
                    };
                }
            })
        },
        stop() {
            if (Helper.socket.socketd) {
                clearInterval(Helper.socket.intervalcheck)
                Helper.socket.socketd.close()
                Helper.socket.socketd = null
            }
        },
        send(message) {

            if (Helper.socket.socketd.readyState === 1) Helper.socket.socketd.send(`42["message",{"hash":"${Helper.socket.hash(25)}","streamId":${Helper.socket.streamId},"channelId":${Helper.socket.channelId},"jwt":"${Helper.socket.jwt}","message":"${message}"}]`)
        },
        hash(length) {
            var result = '';
            var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        },
    },
};

let settings = Helper.getDefaultSettings();
let isObserverBinding, isObserverStarted;

const wasd = {
    style: null,
    isObserverEndBind: false,
    isObserverEndBindBody: false,
    handleMessage(node, isobserver=false) {
        //console.log(node)
        
        isMessageEdited = node.classList.contains('ovg');
        textarea = document.querySelector('.footer > div >textarea');

        if (!isMessageEdited) {
            node.classList.add('ovg');

            if (isobserver) {
                switch (settings.wasd.artificialChatDelay[1].toString()) {
                    case 0:
                        node.style.display = 'block';
                        break;
                    default:
                        node.style.display = 'none'
                        setTimeout(()=>{node.style.display = 'block'; Helper.WASD.scrollChatMessage(node, -1, 150)}, settings.wasd.artificialChatDelay[1])
                        break;
                }
            } else {
                node.style.display = 'block';
            }

            var usernametext;
            if (node.querySelector('div.info__text__status__name')) usernametext = node.querySelector('div.info__text__status__name').textContent.trim()

            if (settings.wasd.highlightMessagesOpenCard[1] && Helper.WASD.openUserCardName == usernametext) {
                if (node.querySelector('wasd-chat-message > .message')) {
                    node.querySelector('wasd-chat-message > .message').classList.add('openCardColor')
                }
            }
            
            if (usernametext) {
                node.setAttribute('username', usernametext)
            }

            var message;
            if (node.querySelector('.message-text > span')) message = node.querySelector('.message-text > span').textContent
            if (message) node.setAttribute('message', message)

            if (isobserver && document.querySelector('.block__messages')) if (document.querySelector('.block__messages').lastElementChild === node ) { // isobserver
                usernameinmsg = node.querySelector('div.info__text__status__name')
                selfusername = document.querySelector('#selector-header-profile div.header__user-profile-name')
                messagetext = node.querySelector('div.message-text')
                isMod = node.querySelector('div.is-moderator') || node.querySelector('div.is-owner')
                // isMod = true

                // bot mod
                if (settings.bot.cmdPrefixBotMod[1][1]) if (usernameinmsg && selfusername && messagetext && isMod) if (messagetext.textContent.trim().slice(0, settings.bot.cmdPrefixBotMod[1][0].length) == settings.bot.cmdPrefixBotMod[1][0]) {
                    //console.log(selfusername.textContent.trim().toLowerCase(), getChannelName())
                    if (selfusername.textContent.trim().toLowerCase() == getChannelName()) {

                        text = messagetext.textContent.trim()
                        let isSendData = (text.indexOf(" ") != -1)
                        var cmd = text.slice(settings.bot.cmdPrefixBotMod[1][0].length, text.indexOf(" ")).trim().toLowerCase()
                        if (!isSendData) cmd = text.slice(settings.bot.cmdPrefixBotMod[1][0].length, text.length).trim().toLowerCase()

                        if (true) {
                            var datatext = text.slice(text.indexOf(" "), text.length).trim()
                            //console.log(cmd, datatext)

                            Helper.WASD.parseCmd(datatext, false, prefix='!')

                            switch (cmd.toLowerCase()) {
                                case "ban":
                                    msgData = Helper.WASD.parseCmd(messagetext.textContent.trim(), false, settings.bot.cmdPrefixBotMod[1][0])
                                    if (settings.bot.cmdBan[1]) {
                                        console.log('ban', msgData.data)
                                        if (msgData.data != null) {
                                            var url = `https://wasd.tv/api/search/profiles?limit=999&offset=0&search_phrase=${msgData.data.split('@').join('').toLowerCase().trim()}`;
                                            fetch(url)
                                            .then(res => res.json())
                                            .then((out) => {
                                                if (out.result) {
                                                    var finded = false;
                                                    for (let value of out.result.rows) {

                                                        if (value.user_login.toLowerCase().trim() == msgData.data.split('@').join('').toLowerCase().trim()) {
                                                            finded = true;
                                                            fetch(`${new URL(document.URL).pathname.split('/')[1] == 'private-stream'? 'https://wasd.tv/api/v2/broadcasts/closed/' + new URL(document.URL).pathname.split('/')[2] : 'https://wasd.tv/api/v2/broadcasts/public?channel_name=' + getChannelName()} `)

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
                                                                        Helper.WASD.showChatMessage('Пользователь уже заблокирован');
                                                                    } else if (out.error.code == 'USER_BAD_BAN_PERMISSIONS') {
                                                                        Helper.WASD.showChatMessage('Вы не можете этого сделать');
                                                                    }
                                                                })
                                                            })
                                                            break;
                                                        }
                                                    }
                                                    if (!finded) {
                                                        Helper.WASD.showChatMessage('Пользователь не найден')
                                                    }
                                                }
                                            })
                                        } else {
                                            Helper.WASD.showChatMessage('Пользователь не найден')
                                            console.log('не хватает username')
                                        }
                                    } else {
                                        Helper.WASD.showChatMessage('Команда отключена')
                                    }
                                    break;
                                case "unban":
                                    msgData = Helper.WASD.parseCmd(messagetext.textContent.trim(), false, settings.bot.cmdPrefixBotMod[1][0])
                                    if (settings.bot.cmdBan[1]) {
                                        console.log('unban', msgData.data)
                                        if (msgData.data != null) {
                                            var url = `https://wasd.tv/api/search/profiles?limit=999&offset=0&search_phrase=${msgData.data.split('@').join('').toLowerCase().trim()}`;
                                            fetch(url)
                                            .then(res => res.json())
                                            .then((out) => {
                                                if (out.result) {
                                                    var finded = false
                                                    for (let value of out.result.rows) {
                                                        if (value.user_login.toLowerCase().trim() == msgData.data.split('@').join('').toLowerCase().toLowerCase().trim()) {
                                                            finded = true;
                                                            fetch(`${new URL(document.URL).pathname.split('/')[1] == 'private-stream'? 'https://wasd.tv/api/v2/broadcasts/closed/' + new URL(document.URL).pathname.split('/')[2] : 'https://wasd.tv/api/v2/broadcasts/public?channel_name=' + getChannelName()} `)
                                                            .then(res => res.json())
                                                            .then((out) => {

                                                                let response = {
                                                                    method: 'DELETE',
                                                                }
                                                                fetch(`https://wasd.tv/api/channels/${out.result.channel.channel_id}/banned-users/${value.user_id}`, response)
                                                                .then(res => res.json())
                                                                .then((out) => {
                                                                    if (out.error.code == 'STREAMER_BAN_NOT_FOUND') {
                                                                        Helper.WASD.showChatMessage('Пользователь не забанен')
                                                                    }/* else {
                                                                        Helper.WASD.showChatMessage(`Пользователь ${value.user_login} разбанен`)
                                                                    }*/
                                                                })
                                                                Helper.WASD.showChatMessage(`Пользователь ${value.user_login} разбанен`, 'success')
                                                            })
                                                            break;
                                                        }
                                                    }
                                                    if (!finded) {
                                                        Helper.WASD.showChatMessage('Пользователь не найден')
                                                    }
                                                }
                                            })
                                        } else {
                                            Helper.WASD.showChatMessage('Пользователь не найден')
                                            console.log('не хватает username')
                                        }
                                    } else {
                                        Helper.WASD.showChatMessage('Команда отключена')
                                    }
                                    break;
                                case "mod":
                                    msgData = Helper.WASD.parseCmd(messagetext.textContent.trim(), false, settings.bot.cmdPrefixBotMod[1][0])
                                    if (settings.bot.cmdMod[1]) {
                                        console.log('mod', msgData.data)
                                        if (msgData.data != null) {
                                            var url = `https://wasd.tv/api/search/profiles?limit=999&offset=0&search_phrase=${msgData.data.split('@').join('').toLowerCase().trim()}`;
                                            fetch(url)
                                            .then(res => res.json())
                                            .then((out) => {
                                                if (out.result) {
                                                    var finded = false;
                                                    for (let value of out.result.rows) {

                                                        if (value.user_login.toLowerCase().trim() == msgData.data.split('@').join('').toLowerCase().trim()) {
                                                            finded = true;
                                                            fetch(`${new URL(document.URL).pathname.split('/')[1] == 'private-stream'? 'https://wasd.tv/api/v2/broadcasts/closed/' + new URL(document.URL).pathname.split('/')[2] : 'https://wasd.tv/api/v2/broadcasts/public?channel_name=' + getChannelName()} `)
                                                            .then(res => res.json())
                                                            .then((out) => {

                                                                let response = {
                                                                    method: 'PUT',
                                                                    body: `{"user_id":${value.user_id}}`,
                                                                    headers: {'Content-Type': 'application/json'},
                                                                }
                                                                fetch(`https://wasd.tv/api/channels/${out.result.channel.channel_id}/moderators`, response)
                                                                .then(res => res.json())
                                                                .then((out) => {
                                                                    //console.log(out)
                                                                    if (out.error.code == 'STREAMER_MODERATOR_ALREADY_EXISTS') {
                                                                        Helper.WASD.showChatMessage('Пользователь уже назначен модератором');
                                                                    } else if (out.error.code == 'USER_CANT_ASSIGN_MODERATOR') {
                                                                        Helper.WASD.showChatMessage('Вы не можете этого сделать');
                                                                    }
                                                                })
                                                                Helper.WASD.showChatMessage(`Пользователь ${value.user_login} назначен модератором`, 'success')
                                                            })
                                                            break;
                                                        }
                                                    }
                                                    if (!finded) {
                                                        Helper.WASD.showChatMessage('Пользователь не найден')
                                                    }
                                                }
                                            })
                                        } else {
                                            Helper.WASD.showChatMessage('Пользователь не найден')
                                            console.log('не хватает username')
                                        }
                                    } else {
                                        Helper.WASD.showChatMessage('Команда отключена')
                                    }
                                    break; 
                                case "unmod":
                                    msgData = Helper.WASD.parseCmd(messagetext.textContent.trim(), false, settings.bot.cmdPrefixBotMod[1][0])
                                    if (settings.bot.cmdMod[1]) {
                                        console.log('unban', msgData.data)
                                        if (msgData.data != null) {
                                            var url = `https://wasd.tv/api/search/profiles?limit=999&offset=0&search_phrase=${msgData.data.split('@').join('').toLowerCase().trim()}`;
                                            fetch(url)
                                            .then(res => res.json())
                                            .then((out) => {
                                                if (out.result) {
                                                    var finded = false
                                                    for (let value of out.result.rows) {
                                                        if (value.user_login.toLowerCase().trim() == msgData.data.split('@').join('').toLowerCase().toLowerCase().trim()) {
                                                            finded = true;
                                                            fetch(`${new URL(document.URL).pathname.split('/')[1] == 'private-stream'? 'https://wasd.tv/api/v2/broadcasts/closed/' + new URL(document.URL).pathname.split('/')[2] : 'https://wasd.tv/api/v2/broadcasts/public?channel_name=' + getChannelName()} `)
                                                            .then(res => res.json())
                                                            .then((out) => {

                                                                let response = {
                                                                    method: 'DELETE',
                                                                }
                                                                fetch(`https://wasd.tv/api/channels/${out.result.channel.channel_id}/moderators/${value.user_id}`, response)
                                                                .then(res => res.json())
                                                                .then((out) => {
                                                                    if (out.error.code == 'STREAMER_MODERATOR_NOT_FOUND') {
                                                                        Helper.WASD.showChatMessage('Пользователь не назначен модератором')
                                                                    } else if (out.error.code == 'USER_CANT_ASSIGN_MODERATOR') {
                                                                        Helper.WASD.showChatMessage('Вы не можете этого сделать')
                                                                    }
                                                                    /* else {
                                                                        Helper.WASD.showChatMessage(`Пользователь ${value.user_login} разбанен`)
                                                                    }*/
                                                                })
                                                                Helper.WASD.showChatMessage(`Пользователь ${value.user_login} уже не модератор`, 'success')
                                                            })
                                                            break;
                                                        }
                                                    }
                                                    if (!finded) {
                                                        Helper.WASD.showChatMessage('Пользователь не найден')
                                                    }
                                                }
                                            })
                                        } else {
                                            Helper.WASD.showChatMessage('Пользователь не найден')
                                            console.log('не хватает username')
                                        }
                                    } else {
                                        Helper.WASD.showChatMessage('Команда отключена')
                                    }
                                    
                                    break;
                                case "raid":
                                    msgData = Helper.WASD.parseCmd(messagetext.textContent.trim(), false, settings.bot.cmdPrefixBotMod[1][0])
                                    if (settings.bot.cmdRaid[1]) {
                                        console.log('raid', msgData.data)
                                        if (msgData.data != null) {
                                            url = msgData.data.split('@').join('').toLowerCase().trim()
                                            if (url.indexOf('://') == -1) { url = `https://wasd.tv/${url}` }
                                            fetch(`${new URL(document.URL).pathname.split('/')[1] == 'private-stream'? 'https://wasd.tv/api/v2/broadcasts/closed/' + new URL(document.URL).pathname.split('/')[2] : 'https://wasd.tv/api/v2/broadcasts/public?channel_name=' + getChannelName()} `)
                                            .then(res => res.json())
                                            .then((out) => {
                                                fetch(`https://wasd.tv/api/v2/channels/${out.result.channel.channel_id}/raid?raid_channel=${url}`, {method: 'POST'})
                                                .then(res => res.json())
                                                .then((out) => {
                                                    //console.log(out)
                                                    if (out.error.code == 'ERROR') {
                                                        Helper.WASD.showChatMessage('Неизвестная ошибка')
                                                    } else if (out.error.code == 'RAID_INFO_ALREADY_EXISTS') {
                                                        Helper.WASD.showChatMessage('Рейд уже начался')
                                                    } else if (out.error.code == 'NO_CHANNEL_WITH_CURRENT_ALIAS') {
                                                        Helper.WASD.showChatMessage('Канал не найден')
                                                    }

                                                })
                                                Helper.WASD.showChatMessage(`Рейд начался`, 'success')
                                                Helper.socket.send(`@${usernameinmsg.textContent.trim()} , Начал рейд на канал ${url}`)
                                            })
                                        } else {
                                            Helper.WASD.showChatMessage('Пользователь не найден')
                                            console.log('не хватает username')
                                        }
                                    } else {
                                        Helper.WASD.showChatMessage('Команда отключена')
                                    }
                                    break;
                                case "title":
                                    msgData = Helper.WASD.parseCmd(messagetext.textContent.trim(), false, settings.bot.cmdPrefixBotMod[1][0])
                                    if (settings.bot.cmdTitle[1]) {
                                        console.log('title', msgData.data)
                                        if (msgData.data != null) {
                                            let title = msgData.data.split('@').join('').trim()
                                            fetch(`https://wasd.tv/api/profiles/current/settings`, {
                                                method: 'PATCH',
                                                body: `{"new_settings":[{"setting_key":"STREAM_NAME","setting_value":"${title}"}]}`,
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                            })
                                            .then(res => res.json())
                                            .then((out) => {
                                                if (out.result[0].setting_key == "STREAM_NAME") {
                                                    Helper.socket.send(`@${usernameinmsg.textContent.trim()} , Название было изменено на '${title}'`)
                                                }
                                            })
                                        } else {
                                            fetch(`https://wasd.tv/api/profiles/current/settings`)
                                            .then(res => res.json())
                                            .then((out) => {
                                                for(let setting_key of out.result) {
                                                    if (setting_key.setting_key == 'STREAM_NAME') {
                                                        Helper.socket.send(`@${usernameinmsg.textContent.trim()} название стрима '${setting_key.setting_value}'`)
                                                    }
                                                }
                                            })
                                        }
                                    } else {
                                        Helper.WASD.showChatMessage('Команда отключена')
                                    }
                                    break;
                                case "game":
                                    msgData = Helper.WASD.parseCmd(messagetext.textContent.trim(), false, settings.bot.cmdPrefixBotMod[1][0])
                                    if (settings.bot.cmdGame[1]) {
                                        console.log('game', msgData.data)
                                        if (msgData.data != null) {
                                            var game = msgData.data.split('@').join('').toLowerCase().trim()
                                            fetch(`https://wasd.tv/api/search/games?limit=999&offset=0&search_phrase=${encodeURIComponent(game.toLowerCase())}`)
                                            .then(res => res.json())
                                            .then((out) => {
                                                //console.log(out.result)
                                                for (let value of out.result.rows) {
                                                    if (game.toLowerCase() == value.game_name.toLowerCase()) {

                                                        fetch(`https://wasd.tv/api/profiles/current/settings`, {
                                                            method: 'PATCH',
                                                            body: `{"new_settings":[{"setting_key":"STREAM_GAME","setting_value":${value.game_id}}]}`,
                                                            headers: {
                                                                'Content-Type': 'application/json'
                                                            },
                                                        })
                                                        .then(res => res.json())
                                                        .then((out) => {
                                                            if (out.result[0].setting_key == "STREAM_GAME") {
                                                                Helper.socket.send(`@${usernameinmsg.textContent.trim()} , Категория была установлена на '${value.game_name}'`)
                                                            }
                                                        })
                                                    }
                                                }
                                            })
                                        } else {
                                            fetch(`https://wasd.tv/api/profiles/current/settings`)
                                            .then(res => res.json())
                                            .then((out) => {
                                                for(let setting_key of out.result) {
                                                    if (setting_key.setting_key == 'STREAM_GAME') {
                                                        Helper.socket.send(`@${usernameinmsg.textContent.trim()} категория стрима '${setting_key.setting_value.game_name}'`)
                                                    }
                                                }
                                            })
                                        }
                                    } else {
                                        Helper.WASD.showChatMessage('Команда отключена')
                                    }
                                    break;
                                case "followers":
                                    msgData = Helper.WASD.parseCmd(messagetext.textContent.trim(), false, settings.bot.cmdPrefixBotMod[1][0])
                                    if (settings.bot.cmdFollowers[1]) {
                                        console.log('followers', msgData.data)
                                        if (msgData) {
                                            fetch(`${new URL(document.URL).pathname.split('/')[1] == 'private-stream'? 'https://wasd.tv/api/v2/broadcasts/closed/' + new URL(document.URL).pathname.split('/')[2] : 'https://wasd.tv/api/v2/broadcasts/public?channel_name=' + getChannelName()} `)
                                            .then(res => res.json())
                                            .then((out) => {

                                                fetch(`https://wasd.tv/api/chat/streams/${out.result.media_container.media_container_streams[0].stream_id}/settings`, {
                                                    method: 'POST',
                                                    body: `{"chatRoleLimitMode":"1"}`,
                                                    headers: {
                                                        'Content-Type': 'application/json'
                                                    },
                                                })
                                                .then(res => res.json())
                                                .then((out) => {
                                                    if (out.error) if (out.error.code == "AUTH_FORBIDDEN") {
                                                        Helper.WASD.showChatMessage('Вы не можете этого сделать')
                                                    } else if (out.error) if (out.error.code == "VALIDATION") {
                                                        Helper.WASD.showChatMessage('Неизвестная ошибка')
                                                    }
                                                })
                                            })
                                        } else {
                                            console.log('Неизвестная ошибка')
                                        }
                                    } else {
                                        Helper.WASD.showChatMessage('Команда отключена')
                                    }
                                    break;
                                case "followersoff":
                                    msgData = Helper.WASD.parseCmd(messagetext.textContent.trim(), false, settings.bot.cmdPrefixBotMod[1][0])
                                    if (settings.bot.cmdFollowers[1]) {
                                        console.log('followersoff', msgData.data)
                                        if (msgData) {
                                            fetch(`${new URL(document.URL).pathname.split('/')[1] == 'private-stream'? 'https://wasd.tv/api/v2/broadcasts/closed/' + new URL(document.URL).pathname.split('/')[2] : 'https://wasd.tv/api/v2/broadcasts/public?channel_name=' + getChannelName()} `)
                                            .then(res => res.json())
                                            .then((out) => {

                                                fetch(`https://wasd.tv/api/chat/streams/${out.result.media_container.media_container_streams[0].stream_id}/settings`, {
                                                    method: 'POST',
                                                    body: `{"chatRoleLimitMode":"0"}`,
                                                    headers: {
                                                        'Content-Type': 'application/json'
                                                    },
                                                })
                                                .then(res => res.json())
                                                .then((out) => {
                                                    if (out.error) if (out.error.code == "AUTH_FORBIDDEN") {
                                                        Helper.WASD.showChatMessage('Вы не можете этого сделать')
                                                    } else if (out.error) if (out.error.code == "VALIDATION") {
                                                        Helper.WASD.showChatMessage('Неизвестная ошибка')
                                                    }
                                                })
                                            })
                                        } else {
                                            console.log('Неизвестная ошибка')
                                        }
                                    } else {
                                        Helper.WASD.showChatMessage('Команда отключена')
                                    }
                                    break;
                                case "subscribers":
                                    msgData = Helper.WASD.parseCmd(messagetext.textContent.trim(), false, settings.bot.cmdPrefixBotMod[1][0])
                                    if (settings.bot.cmdSubscribers[1]) {
                                        console.log('subscribers', msgData.data)
                                        if (msgData) {
                                            fetch(`${new URL(document.URL).pathname.split('/')[1] == 'private-stream'? 'https://wasd.tv/api/v2/broadcasts/closed/' + new URL(document.URL).pathname.split('/')[2] : 'https://wasd.tv/api/v2/broadcasts/public?channel_name=' + getChannelName()} `)
                                            .then(res => res.json())
                                            .then((out) => {

                                                fetch(`https://wasd.tv/api/chat/streams/${out.result.media_container.media_container_streams[0].stream_id}/settings`, {
                                                    method: 'POST',
                                                    body: `{"chatRoleLimitMode":"2"}`,
                                                    headers: {
                                                        'Content-Type': 'application/json'
                                                    },
                                                })
                                                .then(res => res.json())
                                                .then((out) => {
                                                    if (out.error) if (out.error.code == "AUTH_FORBIDDEN") {
                                                        Helper.WASD.showChatMessage('Вы не можете этого сделать')
                                                    } else if (out.error) if (out.error.code == "VALIDATION") {
                                                        Helper.WASD.showChatMessage('Неизвестная ошибка')
                                                    }
                                                })
                                            })
                                        } else {
                                            console.log('Неизвестная ошибка')
                                        }
                                    } else {
                                        Helper.WASD.showChatMessage('Команда отключена')
                                    }
                                    break;
                                case "subscribersoff":
                                    msgData = Helper.WASD.parseCmd(messagetext.textContent.trim(), false, settings.bot.cmdPrefixBotMod[1][0])
                                    if (settings.bot.cmdSubscribers[1]) {
                                        console.log('subscribersoff', msgData.data)
                                        if (msgData) {
                                            fetch(`${new URL(document.URL).pathname.split('/')[1] == 'private-stream'? 'https://wasd.tv/api/v2/broadcasts/closed/' + new URL(document.URL).pathname.split('/')[2] : 'https://wasd.tv/api/v2/broadcasts/public?channel_name=' + getChannelName()} `)
                                            .then(res => res.json())
                                            .then((out) => {

                                                fetch(`https://wasd.tv/api/chat/streams/${out.result.media_container.media_container_streams[0].stream_id}/settings`, {
                                                    method: 'POST',
                                                    body: `{"chatRoleLimitMode":"0"}`,
                                                    headers: {
                                                        'Content-Type': 'application/json'
                                                    },
                                                })
                                                .then(res => res.json())
                                                .then((out) => {
                                                    if (out.error) if (out.error.code == "AUTH_FORBIDDEN") {
                                                        Helper.WASD.showChatMessage('Вы не можете этого сделать')
                                                    } else if (out.error) if (out.error.code == "VALIDATION") {
                                                        Helper.WASD.showChatMessage('Неизвестная ошибка')
                                                    }
                                                })
                                            })
                                        } else {
                                            console.log('Неизвестная ошибка')
                                        }
                                    } else {
                                        Helper.WASD.showChatMessage('Команда отключена')
                                    }
                                    break;
                                default:
                                    // Helper.WASD.showChatMessage('Неизвестная команда')
                                    break;
                            }
                        } else {
                            // Helper.WASD.showChatMessage('Неизвестная команда')
                        }
                    }
                }

                // bot user
                if (settings.bot.cmdPrefixBotUser[1][1]) if (usernameinmsg && selfusername && messagetext) if (messagetext.textContent.trim().slice(0, settings.bot.cmdPrefixBotUser[1][0].length) == settings.bot.cmdPrefixBotUser[1][0]) {
                    if (selfusername.textContent.trim().toLowerCase() == getChannelName()) {
                        text = messagetext.textContent.trim()

                        if (text.indexOf(" ") == -1) {
                            var cmd = text.slice(settings.bot.cmdPrefixBotUser[1][0].length, text.length).trim().toLowerCase()
                            //console.log(text.indexOf(" "))
                            var datatext = text.slice(text.indexOf(" "), text.length).trim()
                            //console.log(cmd, data)
                            switch (cmd.toLowerCase()) {
                                /*case "followage":
                                    if (settings.bot.cmdFollowage) {
                                        console.log('followage', datatext)
                                        let channel_name = node.querySelector('.info__text__status__name').textContent
                                        if (channel_name) {
                                            var oReq_followage = new XMLHttpRequest();
                                            oReq_followage.onload = (out) => {
                                                var out = JSON.parse(oReq_followage.responseText);

                                                Helper.WASD.getSelfDateFollowedTo(out.result.channel.channel_owner.user_login).then((resolve) => {
                                                    console.log(resolve)
                                                    // Helper.socket.send(`@${usernameinmsg.textContent.trim()} вы отслеживаете канал ${jQuery.timeago(new Date(resolve))}`)
                                                    
                                                    let dater = new Date(new Date() - new Date(resolve));
                                                    let textdate;

                                                    if (jQuery.timeago(new Date(resolve)) == "день") {
                                                        textdate = `${(dater.getUTCDate() <= 2) ? '' : (dater.getUTCDate()-2) + ' день '}${(dater.getUTCHours() < 10) ? '0' + dater.getUTCHours() : dater.getUTCHours()}:${(dater.getUTCMinutes() < 10) ? '0' + dater.getUTCMinutes() : dater.getUTCMinutes()}:${(dater.getUTCSeconds() < 10) ? '0' + dater.getUTCSeconds() : dater.getUTCSeconds()}`;
                                                        Helper.socket.send(`@${usernameinmsg.textContent.trim()} вы отслеживаете канал ${textdate}`)
                                                    } else {
                                                        Helper.socket.send(`@${usernameinmsg.textContent.trim()} вы отслеживаете канал ${jQuery.timeago(new Date(resolve))} с ${new Date(out.result.media_container.published_at).toLocaleString()}`)
                                                    }

                                                }).catch(error => {
                                                    if (error == 'NOT_FOUND') Helper.socket.send(`@${usernameinmsg.textContent.trim()} вы не отслеживаете этот канал!`)
                                                });

                                            };
                                            oReq_followage.onerror = (err) => {
                                                Helper.socket.send(`${user} error`)
                                            };
                                            oReq_followage.open("get", `https://wasd.tv/api/v2/broadcasts/public?channel_name=${channel_name.trim()}`, true); oReq_followage.send();
                                        }
                                    } else {
                                        Helper.WASD.showChatMessage('Команда отключена')
                                    }
                                    break;*/
                                case "uptime":
                                    msgData = Helper.WASD.parseCmd(messagetext.textContent.trim(), false, settings.bot.cmdPrefixBotUser[1][0])
                                    if (settings.bot.cmdUptime[1]) {
                                        console.log('uptime', msgData.data)
                                        if (msgData) {
                                            let channel_name = new URL(document.URL).searchParams.get('channel_name');
                                            if (channel_name == null) channel_name = getChannelName()
                                            if (channel_name) {
                                                var oReq_uptime = new XMLHttpRequest();
                                                oReq_uptime.onload = (out) => {
                                                    var out = JSON.parse(oReq_uptime.responseText);
                                                    if (typeof out.result.media_container.published_at !== 'undefined') {
                                                        var date1 = new Date(out.result.media_container.published_at)
                                                        var dater = new Date(new Date() - date1);
                                                        var textdate;

                                                        textdate = `${(dater.getUTCHours() < 10) ? '0' + dater.getUTCHours() : ((dater.getUTCDate()*24) + dater.getUTCHours())}:${(dater.getUTCMinutes() < 10) ? '0' + dater.getUTCMinutes() : dater.getUTCMinutes()}:${(dater.getUTCSeconds() < 10) ? '0' + dater.getUTCSeconds() : dater.getUTCSeconds()}`
                                                        Helper.socket.send(`@${usernameinmsg.textContent.trim()} стрим идет ${textdate}`)
                                                        
                                                    } else {
                                                        Helper.socket.send(`${user} error`)
                                                    }
                                                };
                                                oReq_uptime.onerror = (err) => {
                                                    Helper.socket.send(`${user} error`)
                                                };
                                                oReq_uptime.open("get", `${new URL(document.URL).pathname.split('/')[1] == 'private-stream'? 'https://wasd.tv/api/v2/broadcasts/closed/' + new URL(document.URL).pathname.split('/')[2] : 'https://wasd.tv/api/v2/broadcasts/public?channel_name=' + getChannelName()} `, true); oReq_uptime.send();
                                            }
                                        }
                                    } else {
                                        Helper.WASD.showChatMessage('Команда отключена')
                                    }
                                    break;
                                case "game":
                                    msgData = Helper.WASD.parseCmd(messagetext.textContent.trim(), false, settings.bot.cmdPrefixBotUser[1][0])
                                    if (settings.bot.cmdUserGame[1]) {
                                        if (msgData) {
                                            console.log('game', msgData.data)
                                            fetch(`https://wasd.tv/api/profiles/current/settings`)
                                            .then(res => res.json())
                                            .then((out) => {
                                                for(let setting_key of out.result) {
                                                    if (setting_key.setting_key == 'STREAM_GAME') {
                                                        Helper.socket.send(`@${usernameinmsg.textContent.trim()} категория стрима '${setting_key.setting_value.game_name}'`)
                                                    }
                                                }
                                            })
                                        }
                                    } else {
                                        Helper.WASD.showChatMessage('Команда отключена')
                                    }
                                    break;
                                case "title":
                                    msgData = Helper.WASD.parseCmd(messagetext.textContent.trim(), false, settings.bot.cmdPrefixBotUser[1][0])
                                    if (settings.bot.cmdUserTitle[1]) {
                                        if (msgData) {
                                            console.log('title', msgData.data)
                                            fetch(`https://wasd.tv/api/profiles/current/settings`)
                                            .then(res => res.json())
                                            .then((out) => {
                                                for(let setting_key of out.result) {
                                                    if (setting_key.setting_key == 'STREAM_NAME') {
                                                        Helper.socket.send(`@${usernameinmsg.textContent.trim()} название стрима '${setting_key.setting_value}'`)
                                                    }
                                                }
                                            })
                                        }
                                    } else {
                                        Helper.WASD.showChatMessage('Команда отключена')
                                    }
                                    break;
                                default:
                                    // Helper.WASD.showChatMessage('Неизвестная команда')
                                    break;
                            }
                        } else {
                            // Helper.WASD.showChatMessage('Неизвестная команда')
                        }
                    }
                }
                
                // helper
                if (settings.bot.cmdPrefix[1][1]) if (usernameinmsg && selfusername && messagetext && isMod) if (messagetext.textContent.trim().slice(0, settings.bot.cmdPrefix[1][0].length) == settings.bot.cmdPrefix[1][0]) {
                    if (usernameinmsg.textContent.trim() == selfusername.textContent.trim()) {
                        text = messagetext.textContent.trim()

                        if (text.indexOf(" ") != -1) {
                            var cmd = text.slice(settings.bot.cmdPrefix[1][0].length, text.indexOf(" ")).trim().toLowerCase()
                            //console.log(text.indexOf(" "))
                            var datatext = text.slice(text.indexOf(" "), text.length).trim()
                            //console.log(cmd, data)
                            switch (cmd) {
                                case "user":
                                    msgData = Helper.WASD.parseCmd(messagetext.textContent.trim(), false, settings.bot.cmdPrefix[1][0])
                                    if (settings.bot.cmdUser[1]) {
                                        console.log('user', msgData.data)
                                        if (msgData.data != null) {
                                            Helper.WASD.createUserViewerCard(msgData.data.split('@').join('').toLowerCase().trim());
                                        } else {
                                            Helper.WASD.showChatMessage('Пользователь не найден')
                                        }
                                        break;
                                    } else {
                                        Helper.WASD.showChatMessage('Команда отключена')
                                    }
                                default:
                                    // Helper.WASD.showChatMessage('Неизвестная команда')
                                    break;
                            }
                        } else {
                            // Helper.WASD.showChatMessage('Неизвестная команда')
                        }
                    }
                }

                // event
                if (settings.bot.eventFollow[1][1] && selfusername && selfusername.textContent.trim() == getChannelName()) {
                    if (node.querySelector('wasd-chat-follower-message')) {
                        let text = settings.bot.eventFollow[1][0].replace('{user_login}', '@'+node.querySelector('.message-follower__name').textContent.trim());
                        Helper.socket.send(text)
                    }
                }

                if (settings.bot.eventSub[1][1] && selfusername && selfusername.textContent.trim() == getChannelName()) {
                    if (node.querySelector('wasd-chat-subscribe-message')) {
                        let text = settings.bot.eventSub[1][0].replace('{user_login}', '@'+node.querySelector('.block__item__title').textContent.trim());
                        text.replace('{product_name}', node.querySelector('.block__item__text').textContent.replace('Оформляет подписку на ', '').trim());
                        Helper.socket.send(text)
                    }
                }
            }

            if (!settings.wasd.mentionSelf[1]) {
                metion = document.querySelector('.has-mention')
                if (metion) metion.classList.remove('has-mention')
            }

            if (isobserver && node.querySelector('.message__time')) {
                node.querySelector('.message__time').textContent = dayjs().format(settings.wasd.formatMessageSentTime[1])
            }

            if (settings.wasd.removeMentionBL[1]) {
                let messageText = node.querySelector('.message-text > span');
                if (messageText) {
                    messageText.innerHTML.replace(/@[a-zA-Z0-9_-]+/ig, function($1) {
                        let username = settings.wasd.blockUserList[$1.trim().split('@').join('')];
                        if (username) {node.remove()}
                        return $1;
                    });
                }
            }

            let findtext;
            if (node.querySelector('.info__text__status__name')) {
                findtext = node.querySelector('.info__text__status__name').textContent.trim();
            }

            let username = settings.wasd.blockUserList[findtext];
            if (username) {
                node.remove()
            }

            if (node.querySelector('div.message-text')) {
                node.querySelector('div.message-text').innerHTML = node.querySelector('div.message-text').innerHTML.replace('</',' </').replace('>','> ');
            }

            // fix link
            if (settings.wasd.fixedLinks[1]) {
                if (node.querySelector('div.message-text')) {
                    let message = node.querySelector('div.message-text');
                    message.innerHTML = Helper.WASD.textToURL(message.innerHTML);
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
                    messageText.innerHTML = Helper.BTTV.replaceText(messageText.innerHTML);
                }
                if (settings.wasd.ffzEmotes[1]) {
                    messageText.innerHTML = Helper.FFZ.replaceText(messageText.innerHTML);
                }

                if (settings.wasd.onClickMention[1].toString() === '0') {
                    messageText.innerHTML = messageText.innerHTML.replace(/@[a-zA-Z0-9_-]+/ig, function($1) {
                        let username = settings.wasd.userNameEdited[$1.trim().split('@').join('')];
                        if (!username) {username = $1.trim().split('@').join('')}
                        return `<span style='color: ${usercolor($1.trim())};' class='chat-message-mention' username="${$1}">@${username.trim()}</span>`;
                    });
                    node.querySelectorAll('.chat-message-mention').forEach(element => {
                        usercolorapi(element);
                        element.addEventListener('click', ({ target }) => {
                            if (target.getAttribute('username')) {
                                Helper.WASD.addUsernameToTextarea(target.getAttribute('username').split('@').join(''));
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
                        element.addEventListener('click', ({ target }) => {
                            if (target.getAttribute('username')) {
                                if (!Helper.WASD.addUsernameToTextarea(target.getAttribute('username').split('@').join(''))) {
                                    Helper.WASD.createUserViewerCard(target.getAttribute('username').split('@').join(''));
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

            if (nicknamediv) {
                if (settings.wasd.onClickUserName[1].toString() === '0') {
                    nicknamediv.style.cursor = 'auto';
                    nicknamediv.style.textDecoration = 'auto';
                    elClone = nicknamediv.cloneNode(true);
                    nicknamediv.parentNode.replaceChild(elClone, nicknamediv);
                    nicknamediv.addEventListener('click', ({ target }) => {
                        if (target.getAttribute('username')) {
                            Helper.WASD.addUsernameToTextarea(target.getAttribute('username').split('@').join(''));
                        }
                    });

                } else if (settings.wasd.onClickUserName[1].toString() === '2') {
                    elClone = nicknamediv.cloneNode(true);
                    nicknamediv.parentNode.replaceChild(elClone, nicknamediv);
                    nicknamediv = node.querySelector('div.info__text__status__name');
                    nicknamediv.addEventListener('click', ({ target }) => {
                        if (target.getAttribute('username')) {
                            if (!Helper.WASD.addUsernameToTextarea(target.getAttribute('username').split('@').join(''))) {
                                Helper.WASD.createUserViewerCard(target.getAttribute('username').split('@').join(''));
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
                    moderButtonRemoveAll = moderDiv.insertAdjacentHTML("beforeend", "<div><button class='moderButtonRemoveAll ovg primary' title='Удалить все сообщения пользователя'><span>ВСЕ</span><svg viewBox='0 0 24 24' focusable='false'><g><path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z'></path></g></svg></button></div>");
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
                            contextMenuBlocks = contextMenu.querySelectorAll('div.context-menu__block');
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
                                        } else {
                                            document.querySelector('.block__popup__body > .block__popup__body__inner > .block__popup__body__inner__buttons > .inner__buttons__item > .ghost-btn > button.basic').addEventListener('click', ({ target }) => {
                                                loading.style.display = 'none'
                                            })
                                        }
                                        break;
                                        }
                                }
                            }

                            let interval = setInterval(() => {
                                if (node.querySelector('.message-text.message-text_deleted')) {
                                    loading.style.display = 'none'
                                    clearInterval(interval);
                                }
                            }, 10);
                            if (!edited) {
                                Helper.WASD.showChatMessage('Вы не можете этого сделать');
                            }
                        } else {
                            Helper.WASD.showChatMessage('Вы не можете этого сделать');
                        }
                    });
                    node.querySelector('div.mod > div > .moderButtonRemoveAll').addEventListener('click', ({ target }) => {
                        if (node.querySelector('div.mod').classList.contains('active')) {
                            node.querySelector('div.mod').classList.remove('active');
                        }
                        if (node.querySelector('.message__info__icon > i')) {
                            node.querySelector('.message__info__icon > i').click();
                            contextMenu = node.querySelector('.message__info > .message__info__icon > wasd-chat-context-menu > .context-menu');
                            contextMenuBlocks = contextMenu.querySelectorAll('div.context-menu__block');
                            let edited = false;
                            for (i = 0; i < 10; i++) {
                                if (contextMenuBlocks[i]) {
                                    if (contextMenuBlocks[i].querySelector('div.context-menu__block__text').textContent == " Удалить сообщения ") {
                                        contextMenuBlocks[i].click();
                                        //console.log('remove all channal author');
                                        document.querySelector('.message__info').click();
                                        edited = true;
                                        loading.style.display = 'inline-block';
                                        if (!document.querySelector('.block__popup__body > .block__popup__body__inner > .block__popup__body__inner__text > div > .inner__text__checkbox > label > input.input').checked) {
                                            document.querySelector('.block__popup__body > .block__popup__body__inner > .block__popup__body__inner__text > div > .inner__text__checkbox > label > input.input').click();
                                        }

                                        if (settings.wasd.moderatorMenuAutomatic[1]) {
                                            document.querySelector('.block__popup__body > .block__popup__body__inner > .block__popup__body__inner__buttons > .inner__buttons__item > .ghost-btn > button.warning').click();
                                            document.querySelector('wasd-chat-popups > div.block').style.display = 'none';
                                        } else {
                                            document.querySelector('.block__popup__body > .block__popup__body__inner > .block__popup__body__inner__buttons > .inner__buttons__item > .ghost-btn > button.basic').addEventListener('click', ({ target }) => {
                                                loading.style.display = 'none'
                                            })
                                        }
                                        break;
                                    }
                                }
                            }

                            let interval = setInterval(() => {
                                if (node.querySelector('.message-text.message-text_deleted')) {
                                    loading.style.display = 'none'
                                    clearInterval(interval);
                                }
                            }, 10);
                            if (!edited) {
                               Helper.WASD.showChatMessage('Вы не можете этого сделать');
                            }
                        } else {
                            Helper.WASD.showChatMessage('Вы не можете этого сделать');
                        }
                    });
                    node.querySelector('div.mod > div > .moderButtonBan').addEventListener('click', ({ target }) => {
                        if (node.querySelector('div.mod').classList.contains('active')) {
                            node.querySelector('div.mod').classList.remove('active');
                        }
                        if (node.querySelector('.message__info__icon > i')) {
                            node.querySelector('.message__info__icon > i').click();
                            contextMenu = node.querySelector('.message__info > .message__info__icon > wasd-chat-context-menu > .context-menu');
                            contextMenuBlocks = contextMenu.querySelectorAll('div.context-menu__block');
                            let edited = false;
                            for (i = 0; i < 10; i++) {
                                if (contextMenuBlocks[i]) {
                                    if (contextMenuBlocks[i].querySelector('div.context-menu__block__text').textContent == " Забанить ") {
                                        contextMenuBlocks[i].click();
                                        //console.log('ban channal author');
                                        document.querySelector('.message__info').click();
                                        edited = true;
                                        loading.style.display = 'inline-block'
                                        if (settings.wasd.moderatorMenuAutomatic[1]) {
                                            document.querySelector('.block__popup__body > .block__popup__body__inner > .block__popup__body__inner__buttons > .inner__buttons__item > .ghost-btn > button.warning').click();
                                            document.querySelector('wasd-chat-popups > div.block').style.display = 'none';
                                        } else {
                                            document.querySelector('.block__popup__body > .block__popup__body__inner > .block__popup__body__inner__buttons > .inner__buttons__item > .ghost-btn > button.basic').addEventListener('click', ({ target }) => {
                                                loading.style.display = 'none'
                                            })
                                        }
                                        break;
                                    }
                                }
                            }
                            if (!edited) {
                               Helper.WASD.showChatMessage('Вы не можете этого сделать');
                            }
                        }
                    });
                }
            } else if (settings.wasd.moderatorMenu[1].toString() === '2') {
                let loading;
                let messageInfoStatus = node.querySelector('div.info__text__status')
                if (messageInfoStatus && !node.querySelector('div.is-owner') && node.querySelector('div.message__info__icon')) {
                    messageInfoStatus.insertAdjacentHTML("afterbegin", `<div class="info__text__status-paid-ovg button remove" style="background-color: rgb(0 140 255);"><i class="icon-ovg wasd-icons-ban"></i></div>`);
                    messageInfoStatus.insertAdjacentHTML("afterbegin", `<div class="info__text__status-paid-ovg button banned" style="background-color: rgb(0 140 255);"><i class="icon-ovg wasd-icons-delete"></i></div>`);

                    messageInfo = node.querySelector('div.message__info');
                    if (messageInfo) {
                        messageInfo.insertAdjacentHTML("beforeend", `<div class="lds-ring" style="display: none;"><svg x="0px" y="0px" viewBox="0 0 150 150" class="icon-pending-ovg"><circle cx="75" cy="75" r="60" class="icon-pending-inner-ovg"></circle></svg></div>`);
                        loading = node.querySelector('.lds-ring');
                    }

                    messageInfoStatus.querySelector('.info__text__status-paid-ovg.button.banned').addEventListener('click', ({ target }) => {
                        if (node.querySelector('.message__info__icon > i')) {
                            node.querySelector('.message__info__icon > i').click();
                            contextMenu = node.querySelector('.message__info > .message__info__icon > wasd-chat-context-menu > .context-menu');
                            contextMenuBlocks = contextMenu.querySelectorAll('div.context-menu__block');
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
                                        } else {
                                            document.querySelector('.block__popup__body > .block__popup__body__inner > .block__popup__body__inner__buttons > .inner__buttons__item > .ghost-btn > button.basic').addEventListener('click', ({ target }) => {
                                                loading.style.display = 'none'
                                            })
                                        }
                                        break;
                                    }
                                }
                            }

                            let interval = setInterval(() => {
                                if (node.querySelector('.message-text.message-text_deleted')) {
                                    loading.style.display = 'none'
                                    clearInterval(interval);
                                }
                            }, 10);
                            if (!edited) {
                                Helper.WASD.showChatMessage('Вы не можете этого сделать');
                            }
                        } else {
                            Helper.WASD.showChatMessage('Вы не можете этого сделать');
                        }
                    });
                    messageInfoStatus.querySelector('.info__text__status-paid-ovg.button.remove').addEventListener('click', ({ target }) => {
                        if (node.querySelector('.message__info__icon > i')) {
                            node.querySelector('.message__info__icon > i').click();
                            contextMenu = node.querySelector('.message__info > .message__info__icon > wasd-chat-context-menu > .context-menu');
                            contextMenuBlocks = contextMenu.querySelectorAll('div.context-menu__block');
                            let edited = false;
                            for (i = 0; i < 10; i++) {
                                if (contextMenuBlocks[i]) {
                                    if (contextMenuBlocks[i].querySelector('div.context-menu__block__text').textContent == " Забанить ") {
                                        contextMenuBlocks[i].click();
                                        //console.log('ban channal author');
                                        document.querySelector('.message__info').click();
                                        edited = true;
                                        loading.style.display = 'inline-block'
                                        if (settings.wasd.moderatorMenuAutomatic[1]) {
                                            document.querySelector('.block__popup__body > .block__popup__body__inner > .block__popup__body__inner__buttons > .inner__buttons__item > .ghost-btn > button.warning').click();
                                            document.querySelector('wasd-chat-popups > div.block').style.display = 'none';
                                        } else {
                                            document.querySelector('.block__popup__body > .block__popup__body__inner > .block__popup__body__inner__buttons > .inner__buttons__item > .ghost-btn > button.basic').addEventListener('click', ({ target }) => {
                                                loading.style.display = 'none'
                                            })
                                        }
                                        break;
                                    }
                                }
                            }
                            if (!edited) {
                               Helper.WASD.showChatMessage('Вы не можете этого сделать');
                            }
                        } else {
                            Helper.WASD.showChatMessage('Вы не можете этого сделать');
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
                                node.insertAdjacentHTML("beforeend", `<div style=" font-size: 11px; margin: 5px;" class="ovg-bg-color-prime tw-border-radius-medium tw-elevation-1 ffz--chat-card tw-relative" style=""><div class="tw-border-radius-medium tw-c-background-base tw-flex tw-full-width"><a data-tooltip-type="link" style="text-decoration: none" data-url="${a.href}" target="_blank" rel="noreferrer noopener" href="${a.href}" class="ffz-interactable--hover-enabled tw-block tw-border-radius-medium tw-full-width ffz-interactable ffz-interactable--default tw-interactive"><div class="tw-flex tw-flex-nowrap tw-pd-05"><div class="ffz--header-image" style="height:4.8rem;max-width:25%"></div><div class="ffz--card-text tw-full-width tw-overflow-hidden tw-flex tw-flex-column tw-justify-content-center"><div title="Загрузка..." class="tw-c-text-alt-2 tw-ellipsis tw-mg-x-05">Загрузка...</div></div></div></a></div></div>`);
                                Helper.WASD.scrollChatMessage(node, 50)
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
                                node.insertAdjacentHTML("beforeend", `<div style=" font-size: 11px; margin: 5px;" class="ovg-bg-color-prime tw-border-radius-medium tw-elevation-1 ffz--chat-card tw-relative" style=""><div class="tw-border-radius-medium tw-c-background-base tw-flex tw-full-width"><a data-tooltip-type="link" style="text-decoration: none" data-url="${a.href}" target="_blank" rel="noreferrer noopener" href="${a.href}" class="ffz-interactable--hover-enabled tw-block tw-border-radius-medium tw-full-width ffz-interactable ffz-interactable--default tw-interactive"><div class="tw-flex tw-flex-nowrap tw-pd-05"><div class="ffz--header-image" style="height:4.8rem;max-width:25%"></div><div class="ffz--card-text tw-full-width tw-overflow-hidden tw-flex tw-flex-column tw-justify-content-center"><div title="Загрузка..." class="tw-c-text-alt-2 tw-ellipsis tw-mg-x-05">Загрузка...</div></div></div></a></div></div>`);
                                Helper.WASD.scrollChatMessage(node, 50)
                            }
                            let linkService = `https://wasd.tv/api/v2/clips/${new URL(a.href).searchParams.get('clip')}`;
                            let href = a.href;

                            var oReq = new XMLHttpRequest();
                            oReq.onload = (out) => {
                                var out = JSON.parse(oReq.responseText);
                                node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${out.result.clip_data.preview.small}" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${out.result.clip_title}" class="tw-ellipsis tw-semibold tw-mg-x-05">${out.result.clip_title}</div><div title="${out.result.clip_channel.channel_name} играет в ${out.result.clip_game_name}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05"><a target="_blank" href="https://wasd.tv/user/${out.result.clip_channel.user_id}">${out.result.clip_channel.channel_name}</a> играет в ${out.result.clip_game_name}</div><div title="Автор клипа: ${out.result.clip_owner_login} - ${out.result.clip_views_count} просмотров" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">Автор клипа: <a target="_blank" href="https://wasd.tv/user/${out.result.clip_owner_profile_id}">${out.result.clip_owner_login}</a> - ${out.result.clip_views_count} просмотров</div></div></div></div>`;
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
                                node.insertAdjacentHTML("beforeend", `<div style=" font-size: 11px; margin: 5px;" class="ovg-bg-color-prime tw-border-radius-medium tw-elevation-1 ffz--chat-card tw-relative" style=""><div class="tw-border-radius-medium tw-c-background-base tw-flex tw-full-width"><a data-tooltip-type="link" style="text-decoration: none" data-url="${a.href}" target="_blank" rel="noreferrer noopener" href="${a.href}" class="ffz-interactable--hover-enabled tw-block tw-border-radius-medium tw-full-width ffz-interactable ffz-interactable--default tw-interactive"><div class="tw-flex tw-flex-nowrap tw-pd-05"><div class="ffz--header-image" style="height:4.8rem;max-width:25%"></div><div class="ffz--card-text tw-full-width tw-overflow-hidden tw-flex tw-flex-column tw-justify-content-center"><div title="Загрузка..." class="tw-c-text-alt-2 tw-ellipsis tw-mg-x-05">Загрузка...</div></div></div></a></div></div>`);
                                Helper.WASD.scrollChatMessage(node, 50)
                            }
                            let linkService = `https://wasd.tv/api/games/${new URL(a.href).pathname.split('/')[2]}`;
                            let href = a.href;

                            var oReq = new XMLHttpRequest();
                            oReq.onload = (out) => {
                                var out = JSON.parse(oReq.responseText);
                                node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${out.result.game_icon.small}" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${out.result.game_asset_name}" class="tw-ellipsis tw-semibold tw-mg-x-05">${out.result.game_asset_name}</div><div title="${out.result.game_description}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.result.game_description != null ? out.result.game_description : 'Нет описания'}</div></div></div></div>`;
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
                                node.insertAdjacentHTML("beforeend", `<div style=" font-size: 11px; margin: 5px;" class="ovg-bg-color-prime tw-border-radius-medium tw-elevation-1 ffz--chat-card tw-relative" style=""><div class="tw-border-radius-medium tw-c-background-base tw-flex tw-full-width"><a data-tooltip-type="link" style="text-decoration: none" data-url="${a.href}" target="_blank" rel="noreferrer noopener" href="${a.href}" class="ffz-interactable--hover-enabled tw-block tw-border-radius-medium tw-full-width ffz-interactable ffz-interactable--default tw-interactive"><div class="tw-flex tw-flex-nowrap tw-pd-05"><div class="ffz--header-image" style="height:4.8rem;max-width:25%"></div><div class="ffz--card-text tw-full-width tw-overflow-hidden tw-flex tw-flex-column tw-justify-content-center"><div title="Загрузка..." class="tw-c-text-alt-2 tw-ellipsis tw-mg-x-05">Загрузка...</div></div></div></a></div></div>`);
                                Helper.WASD.scrollChatMessage(node, 50)
                            }
                            let linkService = `${new URL(document.URL).pathname.split('/')[1] == 'private-stream'? 'https://wasd.tv/api/v2/broadcasts/closed/' + new URL(document.URL).pathname.split('/')[2] : 'https://wasd.tv/api/v2/broadcasts/public?channel_name=' + getChannelName()} `;
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
                                node.insertAdjacentHTML("beforeend", `<div style=" font-size: 11px; margin: 5px;" class="ovg-bg-color-prime tw-border-radius-medium tw-elevation-1 ffz--chat-card tw-relative" style=""><div class="tw-border-radius-medium tw-c-background-base tw-flex tw-full-width"><a data-tooltip-type="link" style="text-decoration: none" data-url="${a.href}" target="_blank" rel="noreferrer noopener" href="${a.href}" class="ffz-interactable--hover-enabled tw-block tw-border-radius-medium tw-full-width ffz-interactable ffz-interactable--default tw-interactive"><div class="tw-flex tw-flex-nowrap tw-pd-05"><div class="ffz--header-image" style="height:4.8rem;max-width:25%"></div><div class="ffz--card-text tw-full-width tw-overflow-hidden tw-flex tw-flex-column tw-justify-content-center"><div title="Загрузка..." class="tw-c-text-alt-2 tw-ellipsis tw-mg-x-05">Загрузка...</div></div></div></a></div></div>`);
                                Helper.WASD.scrollChatMessage(node, 50)
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
                                node.insertAdjacentHTML("beforeend", `<div style=" font-size: 11px; margin: 5px;" class="ovg-bg-color-prime tw-border-radius-medium tw-elevation-1 ffz--chat-card tw-relative" style=""><div class="tw-border-radius-medium tw-c-background-base tw-flex tw-full-width"><a data-tooltip-type="link" style="text-decoration: none" data-url="${a.href}" target="_blank" rel="noreferrer noopener" href="${a.href}" class="ffz-interactable--hover-enabled tw-block tw-border-radius-medium tw-full-width ffz-interactable ffz-interactable--default tw-interactive"><div class="tw-flex tw-flex-nowrap tw-pd-05"><div class="ffz--header-image" style="height:4.8rem;max-width:25%"></div><div class="ffz--card-text tw-full-width tw-overflow-hidden tw-flex tw-flex-column tw-justify-content-center"><div title="Загрузка..." class="tw-c-text-alt-2 tw-ellipsis tw-mg-x-05">Загрузка...</div></div></div></a></div></div>`);
                                Helper.WASD.scrollChatMessage(node, 50)
                            }
                            let linkService = `https://api-test.frankerfacez.com/v2/link?url=${a.href}`;
                            let href = a.href;

                            var oReq = new XMLHttpRequest();
                            oReq.onload = (out) => {
                                var out = JSON.parse(oReq.responseText);

                                if ( new URL(href).host == "youtu.be" || new URL(href).host == "m.youtube.com" || new URL(href).host == "youtube.be" || (new URL(href).host == "www.youtube.com" && new URL(href).pathname == "/watch"))  {
                                    
                                    node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05 ffz--header-aspect" style="width:8.53333rem"><img src="${out.short.image.url}" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${out.short.title}" class="tw-ellipsis tw-semibold tw-mg-x-05">${out.short.title}</div><div title="${out.short.subtitle.content.channel} • ${out.short.subtitle.content.views.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} • 👍 ${out.short.subtitle.content.likes.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}  • 👎 ${out.short.subtitle.content.dislikes.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.short.subtitle.content.channel} • ${out.short.subtitle.content.views.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')} • 👍 ${out.short.subtitle.content.likes.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}  • 👎 ${out.short.subtitle.content.dislikes.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}</div><div title="${out.short.extra[1]} ${new Date(out.short.extra[2].attrs.datetime).toLocaleDateString()}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05"><span class="ffz-i-youtube-play"></span>${out.short.extra[1]}<time datetime="${out.short.extra[2].attrs.datetime}" class="">${new Date(out.short.extra[2].attrs.datetime).toLocaleDateString()}</time></div></div></div></div>`;
                                } else {
                                    if (typeof out.error == 'undefined') {
                                        if (!out.short.subtitle) {
                                            //console.log("1111 - "+ href);
                                            let img = '';
                                            if (typeof out.short.image != "undefined") {
                                                img = out.short.image.url;
                                            }
                                            node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${img}" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${out.short.title}" class="tw-ellipsis tw-semibold tw-mg-x-05">${out.short.title}</div></div></div></div>`;
                                        } else {
                                            //console.log("2222 - "+ href);
                                            let img = '';
                                            if (typeof out.short.image != "undefined") {
                                                img = out.short.image.url;
                                            }
                                            node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${img}" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${out.short.title}" class="tw-ellipsis tw-semibold tw-mg-x-05">${out.short.title}</div><div title="${out.short.subtitle}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.short.subtitle}</div></div></div></div>`;
                                        }
                                    } else {
                                        node.querySelector('div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center').innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="${out.error.phrase}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.error.phrase}</div></div></div></div>`;
                                    }
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
                                if (node.querySelector('.lds-ring')) node.querySelector('.lds-ring').style.display = 'inline-block'
                                Helper.WASD.showChatMessage(`Пользователь ${username} добавлен в ЧС`, 'success')
                                settings.wasd.blockUserList[username] = new Date();
                                //console.log(settings.wasd.blockUserList)
                                Helper.WASD.addUserToBlackList(username)
                                Helper.WASD.removeMessagesOfUsername(username)
                                Helper.Settings.save([document.querySelector('.optionField')]);
                            } else {
                                Helper.WASD.showChatMessage('Пользователь уже в ЧС, обновите чат!')
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
                                Helper.WASD.addUsernameToTextarea(target.getAttribute('username').split('@').join(''));
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
                                if (!Helper.WASD.addUsernameToTextarea(target.getAttribute('username').split('@').join(''))) {
                                    Helper.WASD.createUserViewerCard(target.getAttribute('username').split('@').join(''));
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
    // wasd.init();
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
                                Helper.WASD.getIsModerator().then((resolve) => {
                                    Helper.WASD.isModerator = resolve
                                    wasd.update();
                                })

                                wasd.update();
                                isObserverStarted = true;
                                Helper.WASD.updateStreamTimer();

                                Helper.socket.start(getChannelName()).then(i => {
                                    if (i == 'leave') {
                                        isObserverStarted = false;
                                        isObserverBinding = false;
                                        observer.disconnect();

                                        Helper.socket.stop()

                                        clearInterval(intervalUpdateStreamTimer);
                                        console.log("disconnect observer (CHAT) leave");
                                        Helper.WASD.isModerator = false
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

                                        Helper.socket.stop()

                                        clearInterval(intervalUpdateStreamTimer);
                                        console.log("disconnect observer (CHAT) 4");
                                        Helper.WASD.isModerator = false
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

                                        Helper.socket.stop()

                                        clearInterval(intervalUpdateStreamTimer);
                                        console.log("disconnect observer (CHAT) 3");
                                        Helper.WASD.isModerator = false
                                        if (document.querySelector('.chat-container__wrap')) document.querySelector('.chat-container__wrap').remove()
                                        if (document.querySelector('wasd-stream-chat')) document.querySelector('wasd-stream-chat').remove()
                                        setTimeout(startObserver, 200)
                                    });
                                    this.isObserverEndBind = true;
                                }

                            } else {
                                console.log("observer not started (CHAT)");
                                setTimeout(startObserver, 10)
                                Helper.socket.stop()
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

                                            Helper.socket.stop()

                                            clearInterval(intervalUpdateStreamTimer);
                                            console.log("disconnect observer (CHAT) 2");
                                            Helper.WASD.isModerator = false
                                            setTimeout(startObserver, 200)
                                        });

                                        document.body.addEventListener('click', ({ target }) => {
                                            if (isObserverStarted) {
                                                if (!document.querySelector('.header > div.header__block__menu')) {
                                                    isObserverBinding = false;
                                                    isObserverStarted = false;
                                                    observer.disconnect();

                                                    Helper.socket.stop()

                                                    clearInterval(intervalUpdateStreamTimer);
                                                    console.log("disconnect observer (CHAT) 1");
                                                    Helper.WASD.isModerator = false
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

                // show def info player
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
        // normal stream chat
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
        // popout stream chat
        else {
            init(document, target);
        }

        if (this.style === null) {
            this.style = document.createElement('style');
            this.style.type = 'text/css';
            document.body.append(this.style);
            this.update();
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
    // wasd.update()
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
            cssCode += '.block__new-messages { z-index: 1; }'; // исправление ' к новым сообщениям '
        }
        else if (settings.wasd.sticker[1].toString() === '3') {
            cssCode += 'img.sticker { display: none!important; }';
        }
        else if (settings.wasd.sticker[1].toString() === '4') {
            cssCode += 'img.sticker { display: none!important; }';
        } // 3, 4 in handleMessage

        if (settings.wasd.stickerovg[1].toString() === '0') {
            cssCode += `.message__info img.stickerovg {max-width: -webkit-fill-available; display: block; height: ${settings.wasd.bttvSize[1]}; margin-top: 8px; }`
        }
        if (settings.wasd.stickerovg[1].toString() === '2') {
            cssCode += 'div.block__messages__item:hover { z-index: 1; }';
            cssCode += 'div.block__messages__item-ovg:hover { z-index: 1; }';
            cssCode += 'img.stickerovg {max-width: -webkit-fill-available; transition: transform .2s; width: 28px!important; height: 28px!important; margin-top: 0px!important; display: inline!important; vertical-align: middle!important; margin: -.5rem 0!important; }';
            cssCode += `img.stickerovg:hover { transform: scale(${settings.wasd.bttvSize[1] == '128px'? '4.4' : '2.2'}) translateY(-8px); background-color: var(--wasd-color-prime); border-radius: 4px; box-shadow: 0 0 4px 0 rgba(var(--wasd-color-switch--rgb),.16); }`;
            cssCode += '.block__new-messages { z-index: 1; }'; // исправление ' к новым сообщениям '
        }
        else if (settings.wasd.stickerovg[1].toString() === '1') {
            cssCode += 'img.stickerovg {max-width: -webkit-fill-available; width: 28px!important; height: 28px!important; margin-top: 0px!important; display: inline!important; vertical-align: middle!important; margin: -.5rem 0!important; }';
        }
        else if (settings.wasd.stickerovg[1].toString() === '4') {
            cssCode += 'img.stickerovg { display: none!important; }';
        } // 3, 4 in handleMessage


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

        /*if (settings.wasd.smallBadges) {
            cssCode += 'div.info__text__status-paid { width: 18px!important; height: 18px!important; }';
            cssCode += 'div.info__text__status-paid > i:before { font-size: 9.5px!important; transform: translate(0, -30%)!important; }';
            cssCode += 'div.info__text__status { height: 23px!important; }';
            // cssCode += 'div.info__text__status__name { font-size: small!important; }';
        }*/

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
        
        cssCode+= `.info__text__status-paid-ovg {display: ${Helper.WASD.isModerator ? '' : 'none!important;'}}`

        if (settings.wasd.messageHover[1]) {
            cssCode += `.message:hover { background-color: ${settings.wasd.colorMessageHover[1] != '#000000' ? settings.wasd.colorMessageHover[1]+'!important' : 'rgba(var(--wasd-color-switch--rgb),.08)!important' }; }`;
            cssCode += `.message-ovg:hover { background-color: ${settings.wasd.colorMessageHover[1] != '#000000' ? settings.wasd.colorMessageHover[1]+'!important' : 'rgba(var(--wasd-color-switch--rgb),.08)!important' }; }`;
            cssCode += `.ovg-bg-color-prime:hover { background-color: ${settings.wasd.colorMessageHover[1] != '#000000' ? settings.wasd.colorMessageHover[1]+'!important' : 'rgba(var(--wasd-color-switch--rgb),.08)!important' }; }`;
        }
        cssCode+= `.paidsubs-popup__stickers-item {cursor: url(${chrome.extension.getURL("img/cursorS.png")}) 4 4, auto}`

        /*if (settings.wasd.forceResizeStickers[1].toString() === '0') {
            cssCode += 'img.sticker { transition: transform .2s; width: 28px!important; height: 28px!important; margin-top: 0px!important; display: inline!important; vertical-align: middle!important; margin: -.5rem 0!important; }';
            cssCode += 'img.sticker:hover { transform: scale(4.4) translateY(-8px); background-color: var(--wasd-color-prime); border-radius: 4px; box-shadow: 0 0 4px 0 rgba(var(--wasd-color-switch--rgb),.16); }';
            cssCode += 'img.sticker.small:hover { transform: scale(2.2) translateY(-4px); background-color: var(--wasd-color-prime); border-radius: 4px; box-shadow: 0 0 4px 0 rgba(var(--wasd-color-switch--rgb),.16); }';
        } else if (settings.wasd.forceResizeStickers[1].toString() === '1') {
            cssCode += 'img.sticker { transition: transform .2s; width: 28px!important; height: 28px!important; margin-top: 0px!important; display: inline!important; vertical-align: middle!important; margin: -.5rem 0!important; }';
            cssCode += 'img.sticker:hover { transform: scale(4.4) translateY(-8px); background-color: var(--wasd-color-prime); border-radius: 4px; box-shadow: 0 0 4px 0 rgba(var(--wasd-color-switch--rgb),.16); }';
        } else if (settings.wasd.forceResizeStickers[1].toString() === '2') {
            cssCode += 'img.sticker { transition: transform .2s; width: 28px!important; height: 28px!important; margin-top: 0px!important; display: inline!important; vertical-align: middle!important; margin: -.5rem 0!important; }';
            cssCode += 'img.sticker:hover { transform: scale(2.2) translateY(-8px); background-color: var(--wasd-color-prime); border-radius: 4px; box-shadow: 0 0 4px 0 rgba(var(--wasd-color-switch--rgb),.16); }';
        }*/

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


        if (this.style) {
            if (typeof this.style.styleSheet !== 'undefined') {
                this.style.styleSheet.cssText = cssCode;
            } else {
                this.style.innerHTML = '';
                this.style.appendChild(document.createTextNode(cssCode));
            }
            console.log('style inited')
        } else {
            console.log('style undefined')
            setTimeout(()=>{
                wasd.update()
            }, 50)
        }
    }
};

const BetterStreamChat = {
    activeInstance: null,
    settingsDiv: null,
    async init(platform) {
        document.body.classList.add(platform);

        //<editor-fold desc="changelog">
        let changelogLabels = {
            added: '<span class="label" style="color: var(--wasd-color-text-prime);background: none;font-weight: 600;">Добавлено</span>',
            optimized: '<span class="label" style="color: var(--wasd-color-text-prime);background: none;font-weight: 600;">Оптимизировано</span>',
            changed: '<span class="label" style="color: var(--wasd-color-text-prime);background: none;font-weight: 600;">Изменено</span>',
            fixed: '<span class="label" style="color: var(--wasd-color-text-prime);background: none;font-weight: 600;">Исправлено</span>',
            removed: '<span class="label" style="color: var(--wasd-color-text-prime);background: none;font-weight: 600;">Удалено</span>'
        };
        let changelogList = [{
                version: '1.2.6',
                date: '2021-07-11',
                items: [{
                    text: [
                        'Ник пользователя в действиях это упоминание.'
                    ],
                    label: 'optimized'
                },{
                    text: [
                        `Карточка пользователя - Последние сообщения - Роли пользователя.`
                    ],
                    label: 'added'
                },{
                    text: [
                        `Карточка пользователя - Последние сообщения - APNG.`,
                        `Принудительно изменять размер стикеров.`,
                        `Прокрутка чата.`
                    ],
                    label: 'fixed'
                }]
            },{
                version: '1.2.5.2',
                date: '2021-07-06',
                items: [{
                    text: [
                        'FFZ.'
                    ],
                    label: 'optimized'
                }]
            },{
                version: '1.2.5.1',
                date: '2021-07-06',
                items: [{
                    text: [
                        'Инициализация FFZ.'
                    ],
                    label: 'fixed'
                }]
            },{
                version: '1.2.5',
                date: '2021-07-06',
                items: [{
                    text: [
                        `Разделение BTTV и FFZ эмоций по вкладкам.`,
                        `Удалить эмоции пользователя BTTV и FFZ.`,
                        `Обновить эмоции пользователя BTTV и FFZ.`
                    ],
                    label: 'added'
                },{
                    text: [
                        'Скрыть кнопку похвалить канал.',
                        'Опция BTTV и FFZ в меню смайликов в чате.',
                        'Чат в мобильной версии.',
                        'Карточка пользователя - Стикеры канала - APNG.'
                    ],
                    label: 'optimized'
                }]
            },{
                version: '1.2.4',
                date: '2021-07-04',
                items: [{
                    text: [
                        `Чат команды пользователя (Префикс в настройках BOT) (title, game).`,
                        `<a target="_blank" href="https://www.frankerfacez.com/">FFZ</a> эмоции.`
                    ],
                    label: 'added'
                },{
                    text: [
                        'БОТ.',
                        'Инициализация.',
                    ],
                    label: 'optimized'
                }]
            },{
                version: '1.2.3',
                date: '2021-07-02',
                items: [{
                    text: [
                        `Значение по умолчанию.`
                    ],
                    label: 'added'
                },{
                    text: [
                        'Создавать клипы в проигрывателе а не новом окне.',
                        'Искусственная задержка чата.',
                        `Черный список.`
                    ],
                    label: 'optimized'
                },{
                    text: [
                        'Распознавание упоминаний.',
                        'Аптайм трансляции.'
                    ],
                    label: 'fixed'
                }]
            },{
                version: '1.2.2',
                date: '2021-06-29',
                items: [{
                    text: [
                        `Карточка пользователя - Последние сообщения.`,
                        `Создавать клип в проигрывателе а не новом окне.`
                    ],
                    label: 'optimized'
                },{
                    text: [
                        'Инициализация private-стримы.',
                        'Stream-settings - Карточка пользователя.',
                        `Нажмите клавишу '...' чтобы ...`
                    ],
                    label: 'fixed'
                }]
            },{
                version: '1.2.1',
                date: '2021-06-26',
                items: [{
                    text: [
                        `Карточка пользователя - Стикеры канала.`,
                        `Создавать клипы в проигрывателе а не новом окне.`
                    ],
                    label: 'optimized'
                },{
                    text: [
                        'Цвет ссылки.'
                    ],
                    label: 'changed'
                },{
                    text: [
                        'Искусственная задержка чата.',
                        'Чат команды пользователя (Префикс в настройках BOT) (user).',
                        'Чат команды (Префикс в настройках BOT) (followers, followersoff, subscribers, subscribersoff).'
                    ],
                    label: 'added'
                }]
            },{
                version: '1.2.0.2',
                date: '2021-06-22',
                items: [{
                    text: [
                        `Карточка пользователя - Перемещение.`,
                        `Чат команды.`
                    ],
                    label: 'optimized'
                },{
                    text: [
                        'Создавать клипы в проигрывателе а не новом окне.'
                    ],
                    label: 'added'
                }]
            },{
                version: '1.2.0.1',
                date: '2021-06-22',
                items: [{
                    text: [
                        'Канал (скрыть) - Симпа - Всплывающая подсказка.'
                    ],
                    label: 'optimized'
                }]
            },{
                version: '1.2.0',
                date: '2021-06-22',
                items: [{
                    text: [
                        `Карточка пользователя - Последние сообщения - Упоминания.`,
                        `Скрыть кнопку "Начать стрим" в заголовке.`,
                        `Скрыть баннер на главной странице.`,
                        `Заглушить или включить звук проигрывателя путём щелчка по средней кнопке мыши.`,
                        `Размер стикеров BTTV.`,
                        `Отображение стикеров BTTV.`,
                        `Меню модератора - Twicth.`,
                        `Поиск эмоций в меню смайликов - BTTV.`,
                        `Формат отметок времени.`,
                        `Выделять сообщения, упоминающие вас.`,
                        `Цвет сообщения, упоминающие вас.`,
                        `Всегда раскрывать регулятор громкости.`,
                        `Выделять сообщения пользователей с открытыми карточками.`,
                        `Цвет выделения сообщения пользователя с открытой карточкой.`
                    ],
                    label: 'added'
                },{
                    text: [
                        `Карточка пользователя - Перемещение.`,
                        `Чат команды.`
                    ],
                    label: 'optimized'
                },{
                    text: [
                        `Карточка пользователя  - Последние сообщения - Размер шрифта.`,
                        `Распознавание ссылок - Прокрутка.`,
                        `Меню модератора - ALT - Ссылка.`,
                        `Заполнение сообщений чата.`
                    ],
                    label: 'fixed'
                },{
                    text: [
                        `Инициализация чата во время рейда.`,
                        `Меню модератора.`
                    ],
                    label: 'changed'
                }] 
            },{
                version: '1.1.9',
                date: '2021-06-18',
                items: [{
                    text: [
                        `Чат команды (Префикс в настройках BOT) (title, game, uptime).`
                    ],
                    label: 'added'
                },{
                    text: [
                        `Карточка пользователя.`, `Чат команды.`, `Распознавание ссылок.`
                    ],
                    label: 'optimized'
                },{
                    text: [
                        `Аптайм трансляции.`
                    ],
                    label: 'changed'
                }] 
            },{
                version: '1.1.8',
                date: '2021-06-16',
                items: [{
                    text: [
                        `Чат команды (Префикс в настройках BOT) (ban, unban, mod, unmod, raid) (username).`
                    ],
                    label: 'added'
                },{
                    text: [
                        `Ошибка инициализации чата при нажатии на StreamSettings.`
                    ],
                    label: 'fixed'
                },{
                    text: [
                        'WebSocket для чата.'
                    ],
                    label: 'optimized'
                }] 
            },{
                version: '1.1.7',
                date: '2021-06-15',
                items: [{
                    text: [
                        'WebSocket для чата.'
                    ],
                    label: 'added'
                },{
                    text: [
                        'Основные ошибки инициализации чата.'
                    ],
                    label: 'fixed'
                },{
                    text: [
                        'Неавторизованные пользователи.',
                        'Мобильные устройства.'
                    ],
                    label: 'optimized'
                }] 
            },{
                version: '1.1.6',
                date: '2021-06-08',
                items: [{
                    text: [
                        'Мобильные устройства.',
                        'Чат в новом окне.'
                    ],
                    label: 'optimized'
                }] 
            },{
                version: '1.1.5',
                date: '2021-06-06',
                items: [{
                    text: ['Черный список.'],
                    label: 'added'
                },{
                    text: ['Размер шрифта в пикселях.'],
                    label: 'optimized'
                }] 
            },{
                version: '1.1.4',
                date: '2021-06-04',
                items: [{
                    text: [
                        'Действие при клике на пользователя или упоминание пользователя при зажатой клавише.'
                    ],
                    label: 'added'
                },{
                    text: [
                        'Театральный режим - Карточка пользователя - Последние сообщения.'
                    ],
                    label: 'fixed'
                },{
                    text: [
                        'Меню смайликов - BTTV.',
                        'Распознавание ссылок.'
                    ],
                    label: 'optimized'
                }] 
            },{
                version: '1.1.3',
                date: '2021-06-03',
                items: [{
                    text: [
                        'Карточка пользователя - Изменить ник.'
                    ],
                    label: 'added'
                },{
                    text: [
                        'Карточка пользователя.', 'BTTV.',
                        'Карточка пользователя - Последние сообщения - Стикеры.'
                    ],
                    label: 'optimized'
                }] 
            },{
                version: '1.1.2',
                date: '2021-06-01',
                items: [{
                    text: [
                        'Карточка пользователя - Последние сообщения.'
                    ],
                    label: 'added'
                }] 
            },{
                version: '1.1.1',
                date: '2021-05-29',
                items: [{
                    text: [
                        'Скрыть оверлей над проигрывателем.',
                        'Скрыть сообщение о новом подписчике.',
                        'Поиск эмоций.'
                    ],
                    label: 'added'
                },{
                    text: [
                        'Скрыть системные сообщения.',
                        'Распознаватель ссылок.'
                    ],
                    label: 'optimized'
                },{
                    text: [
                        'Карточка пользователя - Перетаскивание.'
                    ],
                    label: 'fixed'
                }]
            },{
                version: '1.1.0',
                date: '2021-05-24',
                items: [{
                    text: [
                        'Распознаватель ссылок. <a target="_blank" href="https://github.com/FrankerFaceZ/link-service">link-service</a>',
                        'Карточка пользователя - Ссылки на соц сети.',
                        'Разрешение смайликов в чате.'
                    ],
                    label: 'added'
                },{
                    text: [
                        'BTTV.'
                    ],
                    label: 'optimized'
                },{
                    text: [
                        'Карточка пользователя - Стикеры канала.'
                    ],
                    label: 'fixed'
                }] 
            },{
                version: '1.0.9',
                date: '2021-05-23',
                items: [{
                    text: [
                        '<a target="_blank" href="https://betterttv.com/">BTTV</a> эмоции.',
                        'Бэкап и восстановление.'
                    ],
                    label: 'added'
                }] 
            },{
                version: '1.0.8.1',
                date: '2021-05-21',
                items: [{
                    text: [
                        'Аптайм трансляции.'
                    ],
                    label: 'added'
                }] 
            },{
                version: '1.0.8',
                date: '2021-05-20',
                items: [{
                    text: [
                        'Отображение стикеров - Минимизировать (увеличить при наведении).'
                    ],
                    label: 'added'
                },{
                    text: [
                        'Цвет пользователя при упоминании.',
                        'Темная тема.',
                        'Карточка пользователя.'
                    ],
                    label: 'optimized'
                }] 
            },{
                version: '1.0.7',
                date: '2021-05-19',
                items: [{
                    text: [
                        'Исправить ссылки в чате.',
                        'Карточка пользователя - Действие при клике на упоминание пользователя.',
                        'BetterWASD кнопка в меню дополнительные опции.'
                    ],
                    label: 'added'
                },{
                    text: [
                        'Ссылка.',
                        'BetterWASD кнопка в настройках чата.'
                    ],
                    label: 'optimized'
                },{
                    text: [
                        'Ссылка.',
                        'При клике на упоминание добавить в текстовое поле.',
                        'Отображать упоминания пользователей в чата с их цветом никнейма.',
                        'Выделять упоминания в чате жирным шрифтом.'
                    ],
                    label: 'fixed'
                }] 
            },{
                version: '1.0.6',
                date: '2021-05-15',
                items: [{
                    text: [
                        'Чередование цвета сообщений в чате.',
                        'Панель поиска.'
                    ],
                    label: 'added'
                },{
                    text: [
                        'Alt меню модератора.'
                    ],
                    label: 'changed'
                }] 
            },{
                version: '1.0.5',
                date: '2021-05-13',
                items: [
                {
                    text: [
                        "Нажмите клавишу 'x' чтобы создать 'Клип'.",
                        "Нажмите клавишу 'i' чтобы переключить режми 'Картинка в картинке'.",
                        "Нажмите клавишу 't' чтобы переключить 'Театральный режим'.",
                        "Нажмите клавишу 'f' чтобы переключить режми 'На весь экран'.",
                        'Отключить Авто-воспроизведение предложенных стримеров на главной странице.',
                        'Alt меню модератора.',
                        'Сбросить проигрыватель.',
                        'Новый режим Картинка в картинке.'
                    ],
                    label: 'added'
                },{
                    text: [
                        'При клике на упоминание добавить в текстовое поле.'
                    ],
                    label: 'optimized'
                },{
                    text: [
                        'F5.',
                        'Отображение стикера.'
                    ],
                    label: 'fixed'
                },{
                    text: [
                        'Маленькие значки.'
                        ],
                    label: 'removed'
                }] 
            },{
                version: '1.0.4',
                date: '2021-05-09',
                items: [
                {
                    text: [
                        'Скрыть верхнюю панель (испытание).',
                        'Скрыть верхнюю панель (пожертвовать).',
                        'Изменить размер шрифта.',
                        'Скрыть сообщение стримеру.',
                        'Скрыть подарочные кнопки.',
                        'Выделять упоминания в чате жирным шрифтом.',
                        'Скрыть удивительную кнопку пожертвования.',
                        'Скрыть кнопку канала пожертвований.',
                        'Размер (ширина) чата в пикселях.',
                        'Чат слева.'
                    ],
                    label: 'added'
                }]
            },{
                version: '1.0.3',
                date: '2021-05-07',
                items: [
                {
                    text: [
                        'F5.'
                    ],
                    label: 'optimized'
                }]
            },{
                version: '1.0.2',
                date: '2021-05-06',
                items: [{
                    text: [
                        'Цвет при упоминании.',
                        'Изменить цвет ссылки.',
                        'Добавить имя пользователя в текстовое поле при нажатии на упоминание.'
                    ],
                    label: 'added'
                },
                {
                    text: [
                        'Отображение стикера.'
                    ],
                    label: 'optimized'
                }]
            },{
                version: '1.0.1',
                date: '2021-05-04',
                items: [{
                    text: [
                        'Использовать небольшой значок.',
                        'Добавлять двоеточие после ника.',
                        'Изменять заполнение сообщений чата.',
                        'Изменить отображение стикера.'
                    ],
                    label: 'added'
                }]
            },{
                version: '1.0.0',
                date: '2021-05-03',
                items: [{
                    text: [
                        'Первый выпуск'
                    ],
                    label: 'added'
                }]
            }
        ];
        //</editor-fold>
        let changelogHtml = '';
        for (let changelog of changelogList) {
            changelogHtml += `<h2 style="color: var(--wasd-color-text-prime);">Version ${changelog.version} (${changelog.date})</h2><ul style="display: grid;">`;

            for (let item of changelog.items) {
                if (item.label) {
                    let labelHtml = '';
                    let labels = item.label.split(' ');

                    for (let label of labels) {
                        changelogHtml += changelogLabels[label];
                    }

                    for (let text of item.text) {
                        changelogHtml += `<span class="textlabel">• ${text}</span>`;
                    }                    
                }

                if (item.issueID) {
                    item.text += ` (<a target="_blank" href="https://github.com/ovgamesdev/WASD_TV/issues/${item.issueID}">#${item.issueID}</a>)`;
                }
            }
            changelogHtml += '</ul>';
        }

        //<editor-fold desc="settings div">
        let settingsDiv = document.createElement('div');
        this.settingsDiv = settingsDiv;
        settingsDiv.style.display = 'none';
        settingsDiv.id = 'bscSettingsPanel';
        settingsDiv.innerHTML = `<div id="status">
            <p>
        </p>
        </div>
        <header>
            <ul class="nav">
                <li><a data-tab="about">О нас</a></li>
                <li><a data-tab="general">Общий</a></li>
                <li><a data-tab="bttvSettings">BTTV</a></li>
                <li><a data-tab="ffzSettings">FFZ</a></li>
                <li class="active"><a data-tab="wasdSettings">Настройки</a></li>
                <li><a data-tab="bot">БОТ</a></li>
                <li><a data-tab="blacklist">ЧС</a></li>
                <li><a data-tab="changelog">Журнал изменений</a></li>
                <li><a data-tab="backup">Бэкап</a></li>
            </ul>
            <!--span title="" class="fade helpTitleHover"><img class="nofade " style="width: 22px; filter: invert(99%) sepia(6%) saturate(1%) hue-rotate(57deg) brightness(95%) contrast(85%);"></span-->
            <span title="Обновить чат, BTTV И FFZ эмоции (щелкните мышью по кнопке дважды) (Подождите пару секунд)." class="update helpTitleHover"><i _ngcontent-boj-c248="" class="wasd-icons-record-icon" style="font-size: 22px;align-items: center;display: flex;justify-content: center;"></i></span>
            <span class="close"><i _ngcontent-khk-c259="" class="wasd-icons-close"></i></span>
        </header>
        <main class="text" data-tab="about">
            <div class="aboutHalf">
                <img class="aboutIcon" src="${chrome.extension.getURL("img/icon128.png")}">
                <h1>BetterWASD v${changelogList[0].version}</h1>
                <h2>от ваших друзей в <a href="https://ovgamesdev.github.io/ru/" target="_blank">OvGames</a></h2>
                <br>
            </div>
            <div class="aboutHalf">
                <h1 style="margin-top: 100px;">Думаете, этот аддон классный?</h1>
                <br><br><h2>
                Напишите отзыв на <a target="_blank" href="https://chrome.google.com/webstore/detail/betterwasd/cokaeiijnnpcfaoehijmdfcgbkpffgbh">Chrome Webstore</a>
                <!-- или <a target="_blank" href="https://addons.mozilla.org/ru/firefox/addon/betterwasd/">Firefox Add-ons site</a-->
                </h2><br>
            </div>
        </main>
        <main id="general" data-tab="general">
            ${Helper.Settings.build('general')}
        </main>
        <main id="bot" data-tab="bot">
            <span style="display: block; padding: 10px;"> Бот отвечает от вашего имени </span>
            ${Helper.Settings.build('bot')}
        </main>
        <main class="text" data-tab="bttvSettings">
            <h1 style="padding-left: 10px; padding-right: 10px;"> BetterTTV  </h1>
            <h4 style="margin-top:10px;padding-left: 10px;padding-right: 0px;">Добавить новый канал (Twitch username)</h4>
            <div style="padding-left: 10px;">
                <input placeholder="username" type="search" id="bttvAddUser" />
                <button id="bttvAddUserBtn" class="ovg-button">+</button>
            </div>

            <table class="table-ovg">

                <thead class="thead-ovg">
                    <th class="table-heading-ovg">
                        <div class="table-heading-text-ovg">Имя пользователя</div>
                    </th>
                    <th class="table-heading-ovg">
                        <div class="table-heading-text-ovg">Время последнего обновления</div>
                    </th>
                    <th class="table-heading-ovg remove">
                        <div class="table-heading-text-ovg">Действия</div>
                    </th>
                </thead>

                <tbody class="bttvUserList ovg-items">
                </tbody>
            </table>

            <h2> Доступные эмоции BetterTTV </h2>
            <input type="search" placeholder="Поиск эмоций" class="option bttvemojiSearch" style="background: url(${chrome.extension.getURL("img/search.png")}) no-repeat 10px; background-color: var(--wasd-color-prime); margin-top: 10px; margin-bottom: 10px; border-bottom-width: 0px!important; min-height: auto;">
            <ul id="bttvEmoteList"></ul>
        </main>

        <main class="text" data-tab="ffzSettings">
            <h1 style="padding-left: 10px; padding-right: 10px;"> FrankerFaceZ </h1>
            <h4 style="margin-top:10px;padding-left: 10px;padding-right: 0px;">Добавить новый канал (Twitch username)</h4>
            <div style="padding-left: 10px;">
                <input placeholder="username" type="search" id="ffzAddUser" />
                <button id="ffzAddUserBtn" class="ovg-button">+</button>
            </div>

            <table class="table-ovg">

                <thead class="thead-ovg">
                    <th class="table-heading-ovg">
                        <div class="table-heading-text-ovg">Имя пользователя</div>
                    </th>
                    <th class="table-heading-ovg">
                        <div class="table-heading-text-ovg">Время последнего обновления</div>
                    </th>
                    <th class="table-heading-ovg remove">
                        <div class="table-heading-text-ovg">Действия</div>
                    </th>
                </thead>

                <tbody class="ffzUserList ovg-items">
                </tbody>
            </table>

            <h2> Доступные эмоции FrankerFaceZ </h2>
            <input type="search" placeholder="Поиск эмоций" class="option ffzemojiSearch" style="background: url(${chrome.extension.getURL("img/search.png")}) no-repeat 10px; background-color: var(--wasd-color-prime); margin-top: 10px; margin-bottom: 10px; border-bottom-width: 0px!important; min-height: auto;">
            <ul id="ffzEmoteList"></ul>
        </main>

        <main class="active" data-tab="wasdSettings">
            <input type="search" placeholder="Поиск настроек" class="option settingsSearch" style="background: url(${chrome.extension.getURL("img/search.png")}) no-repeat 10px;">
            ${Helper.Settings.build('wasd')}
        </main>
        <main class="text" data-tab="changelog">
            <h1>Журнал изменений</h1>
            <h4 style="margin-top:10px;padding-left: 10px;padding-right: 0px;margin-bottom: 0px;"> Информацию о будущих версиях можно найти <a href="https://wasd.tv/ovgames/posts">тут</a></h4>
            ${changelogHtml}
        </main>
        <main class="text" data-tab="backup">

            <input id="importInput" type="file" accept=".backup" style="display: none;">
            <span> Эта функция позволяет вам сохранить и восстановить ваши настройки BetterWASD </span>
            <div style="padding-top: 10px;">
                <div class="ovg-button-div">
                    <button class="primary medium ovg backup-download">
                        <span class="primary medium ovg-button-span">
                            <img style="width: 20px; height: 20px;" src="${chrome.extension.getURL("img/download.png")}">
                        </span>
                        <span> Сохранить </span>
                    </button>
                </div>

                <div class="ovg-button-div">
                    <button class="primary medium ovg backup-upload">
                        <span class="primary medium ovg-button-span">
                            <img style="width: 20px; height: 20px;" src="${chrome.extension.getURL("img/upload.png")}">
                        </span>
                        <span> Восстановить </span>
                    </button>
                </div>
            </div>
        </main>
        <main class="text" data-tab="blacklist">
            <h1 style="padding-left: 10px; padding-right: 10px;"> Черный список (чат) </h1>
            <h4 style="margin-top:10px;padding-left: 10px;padding-right: 0px;"> Добавить в ЧС </h4>
            <div style="padding-left: 10px;">
                <input placeholder="username" type="search" id="blacklistAddUser" />
                <button id="blacklistAddUserBtn" class="ovg-button">+</button>
            </div>
            <table class="table-ovg">

                <thead class="thead-ovg">
                    <th class="table-heading-ovg">
                        <div class="table-heading-text-ovg">Имя пользователя</div>
                    </th>
                    <th class="table-heading-ovg">
                        <div class="table-heading-text-ovg">Время добавления</div>
                    </th>
                    <th class="table-heading-ovg remove">
                        <div class="table-heading-text-ovg">Действия</div>
                    </th>
                </thead>

                <tbody class="blacklist ovg-items">
                </tbody>
            </table>

        </main>
        <footer>
            <span>BetterWASD ${changelogList[0].version} (${changelogList[0].date})</span>
            <span>
                Offered by <a href="https://ovgamesdev.github.io/ru/" target="_blank">OvGames</a> | <a href="https://wasd.tv/ovgames" target="_blank">WASD</a>
            </span>`;
        document.body.append(settingsDiv);

        // bttv events
        settingsDiv.querySelector('#bttvAddUserBtn').addEventListener('click', () => {
            Helper.BTTV.tryAddUser();
        });
        settingsDiv.querySelector('#bttvAddUser').addEventListener('keyup', (event) => {
            if (event.key !== 'Enter') {
                return;
            }

            Helper.BTTV.tryAddUser();
        });

        // ffz events
        settingsDiv.querySelector('#ffzAddUserBtn').addEventListener('click', () => {
            Helper.FFZ.tryAddUser();
        });
        settingsDiv.querySelector('#ffzAddUser').addEventListener('keyup', (event) => {
            if (event.key !== 'Enter') {
                return;
            }

            Helper.FFZ.tryAddUser();
        });

        // bind close settings 
        settingsDiv.querySelector('.close').addEventListener('click', () => {
            settingsDiv.style.animationName = 'hidebetterpanel';
            setTimeout(() => {
                settingsDiv.style.display = 'none';
            }, 350);
            document.body.style.overflowY = "";
        });

        // bind update settings 
        settingsDiv.querySelector('.update').addEventListener('dblclick', () => {
            let header_block_menu = document.querySelector('.header > div.header__block__menu')
            if (header_block_menu) {
                if (header_block_menu.childNodes.length >= 1) {
                    if (header_block_menu.childNodes[1].nodeName != "#comment") {
                        header_block_menu.childNodes[1].click();
                        settingsDiv.querySelector('.update > i').classList.add('resetPlayerLoading');
                        
                    }
                    if (header_block_menu.childNodes[0].nodeName != "#comment") {
                        header_block_menu.childNodes[0].click();
                        setTimeout(() => {
                            settingsDiv.querySelector('.update > i').classList.remove('resetPlayerLoading');
                        }, 1000);
                    }
                }
            }
            Helper.BTTV.updateEmotesBttv();
            Helper.FFZ.updateEmotesFfz()
        });

        // bind search settings
        var input1, filter1, ul1, options1, title1, titleline1, i1;
        input1 = document.querySelector('input.option.settingsSearch');
        input1.addEventListener('input', () => {
            filter1 = input1.value.toUpperCase();
            ul1 = document.querySelector("main[data-tab='wasdSettings']");
            options1 = ul1.querySelectorAll("div.option");
            for (i1 = 0; i1 < options1.length; i1++) {
                title1 = options1[i1].querySelector("span.title");
                if (title1) {
                    if (title1.innerHTML.toUpperCase().indexOf(filter1) > -1) {
                        options1[i1].style.display = "";
                    } else {
                        options1[i1].style.display = "none";
                    }
                }
                // hide >>
                titleline1 = options1[i1].querySelector("span.titleline");
                if (titleline1) {
                    if (filter1 == '') {
                        options1[i1].style.display = "";
                    } else {
                        options1[i1].style.display = "none";
                    }
                }
            }
        });

        // bind search emoji
        var bttvinput, bttvfilter, bttvul, bttvoptions, bttvtitle, bttvtitleline, bttvi;
        bttvinput = document.querySelector('input.option.bttvemojiSearch');
        bttvinput.addEventListener('input', () => {
            bttvfilter = bttvinput.value.toUpperCase();
            bttvul = document.querySelector("main[data-tab='bttvSettings'] > #bttvEmoteList");
            bttvoptions = bttvul.querySelectorAll("a.emoteCard");
            for (bttvi = 0; bttvi < bttvoptions.length; bttvi++) {
                bttvtitle = bttvoptions[bttvi].querySelector("span");
                if (bttvtitle) {
                    if (bttvtitle.textContent.toUpperCase().indexOf(bttvfilter) != -1) {
                        bttvoptions[bttvi].style.display = "";
                    } else {
                        bttvoptions[bttvi].style.display = "none";
                    }
                }
            }
        });

        var ffzinput, ffzfilter, ffzul, ffzoptions, ffztitle, ffztitleline, ffzi;
        ffzinput = document.querySelector('input.option.ffzemojiSearch');
        ffzinput.addEventListener('input', () => {
            ffzfilter = ffzinput.value.toUpperCase();
            ffzul = document.querySelector("main[data-tab='ffzSettings'] > #ffzEmoteList");
            ffzoptions = ffzul.querySelectorAll("a.emoteCard");
            for (ffzi = 0; ffzi < ffzoptions.length; ffzi++) {
                ffztitle = ffzoptions[ffzi].querySelector("span");
                if (ffztitle) {
                    if (ffztitle.textContent.toUpperCase().indexOf(ffzfilter) != -1) {
                        ffzoptions[ffzi].style.display = "";
                    } else {
                        ffzoptions[ffzi].style.display = "none";
                    }
                }
            }
        });


        settingsDiv.querySelector('button.primary.medium.ovg.backup-upload').addEventListener('click', () => {
            settingsDiv.querySelector('#importInput').click();
        });

        settingsDiv.querySelector('input#importInput').onchange = uploadFile;
        function uploadFile(){
          var files = document.querySelector('input#importInput').files[0];
          var reader = new FileReader();
          reader.onload = processFile(files);
          reader.readAsText(files); 
        }

        function processFile(theFile){
          return function(e) { 
                chrome.storage[storageType].set(JSON.parse(e.target.result), () => {
                    location.reload();
                });
            }
        }

        settingsDiv.querySelector('button.primary.medium.ovg.backup-download').addEventListener('click', () => {
            Helper.WASD.download(`BetterWASD-settings.backup`, JSON.stringify(settings));
        });

        for (let user of Object.keys(settings.wasd.blockUserList)) {
            Helper.WASD.addUserToBlackList(user)
        }

        settingsDiv.querySelector('button#blacklistAddUserBtn').addEventListener('click', () => {
            text = settingsDiv.querySelector('input#blacklistAddUser').value
            if (text != '') {
                if (!settings.wasd.blockUserList[text]) {
                   Helper.WASD.showChatMessage(`Пользователь ${text} добавлен в ЧС`, 'success')
                    settings.wasd.blockUserList[text] = new Date();
                    Helper.WASD.addUserToBlackList(text)
                    Helper.WASD.removeMessagesOfUsername(text)
                    Helper.Settings.save([document.querySelector('.optionField')]);
                } else {
                   Helper.WASD.showChatMessage('Пользователь уже в ЧС')
                }
            }
            settingsDiv.querySelector('input#blacklistAddUser').value = ''
        });
        settingsDiv.querySelector('input#blacklistAddUser').addEventListener('change', () => {
            text = settingsDiv.querySelector('input#blacklistAddUser').value
            if (text != '') {
                if (!settings.wasd.blockUserList[text]) {
                   Helper.WASD.showChatMessage(`Пользователь ${text} добавлен в ЧС`, 'success')
                    settings.wasd.blockUserList[text] = new Date();
                    Helper.WASD.addUserToBlackList(text)
                    Helper.WASD.removeMessagesOfUsername(text)
                    Helper.Settings.save([document.querySelector('.optionField')]);
                } else {
                   Helper.WASD.showChatMessage('Пользователь уже в ЧС')
                }
            }
            settingsDiv.querySelector('input#blacklistAddUser').value = ''
        });

        // navigation
        for (let navItem of settingsDiv.querySelectorAll('ul.nav > li > a')) {
            navItem.addEventListener('click', ({ target }) => {
                let links = settingsDiv.querySelectorAll('ul.nav > li');
                let tabs = settingsDiv.querySelectorAll('main');
                for (let element of [...tabs, ...links]) {
                    element.classList.remove('active');
                }
                target.parentNode.classList.add('active');
                settingsDiv.querySelector(`main[data-tab="${target.dataset.tab}"]`).classList.add('active');
            });
        }

        // to def
        for (let option of settingsDiv.querySelectorAll('.optionField.def')) {
            option.addEventListener('click', (event) => {
                let split = event.target.dataset.name.split('_');
                switch(event.target.getAttribute('option-type')) {
                    case 'boolean':
                        if (settings[split[0]][split[1]][0]) {
                            event.target.parentElement.querySelector(`input[id=boolean_${event.target.getAttribute('data-name')}]`).click()
                        } else {
                            event.target.parentElement.querySelector(`input[id=boolean_${event.target.getAttribute('data-name')}_no]`).click()
                        }
                        break;
                    case 'text':
                        event.target.parentElement.querySelector('input[type="text"]').value = settings[split[0]][split[1]][0]
                        Helper.Settings.save([event.target.parentElement.querySelector('input[type="text"]')])
                        break;
                    case 'number':
                        event.target.parentElement.querySelector('input[type="number"]').value = settings[split[0]][split[1]][0]
                        Helper.Settings.save([event.target.parentElement.querySelector('input[type="number"]')])
                        break; 
                    case 'select':
                        event.target.parentElement.querySelector('select').value = settings[split[0]][split[1]][0]
                        Helper.Settings.save([event.target.parentElement.querySelector('select')])
                        break;
                    case 'color':
                        event.target.parentElement.querySelector('input[type="color"]').value = settings[split[0]][split[1]][0]
                        Helper.Settings.save([event.target.parentElement.querySelector('input[type="color"]')])
                        break;
                    case 'botevent':

                        if (settings[split[0]][split[1]][0]) {
                            event.target.parentElement.querySelector(`input[id=boolean_${event.target.getAttribute('data-name')}]`).click()
                        } else {
                            event.target.parentElement.querySelector(`input[id=boolean_${event.target.getAttribute('data-name')}_no]`).click()
                        }

                        event.target.parentElement.querySelector('input[type="text"]').value = settings[split[0]][split[1]][0][0]

                        Helper.Settings.save([event.target.parentElement.querySelector('input[type="text"]')])
                        break;
                    default:
                        console.log('def')
                }
                //Helper.Settings.save([event.target]);
                //console.log(event.target.parentElement)
            });
        }

        // change event
        for (let option of settingsDiv.querySelectorAll('.optionField')) {
            option.addEventListener('change', (event) => {
                Helper.Settings.save([event.target]);
            });
        }
        // load bttv and ffz emotes

        await Helper.BTTV.update();
        Helper.BTTV.loaded();
        //Helper.BTTV.updateEmotesBttv();

        await Helper.FFZ.update();
        Helper.FFZ.loaded();
        //Helper.FFZ.updateEmotesFfz();

        // load chat
        Helper.WASD.loaded();

        this.install(platform);

        if (!settings.wasd.isUpdatedToNewSettings) {
        }
    },
    install(platform) {
        if (platform === 'wasd') {
            this.activeInstance = wasd;
        } else {
            return;
        }
        this.activeInstance.init();
    },
    uninstall() {
        this.activeInstance.uninstall();
        this.activeInstance = null;
    },
    update() {
        if (this.activeInstance) {
            this.activeInstance.update();
        }
    }
};


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
        BetterStreamChat.init('wasd');
    } else {
        for (let option of document.querySelectorAll('.optionField')) {
            let property = option.type === 'checkbox' ? 'checked' : 'value';
            let split = option.dataset.name.split('_');
            option[property] = settings[split[0]][split[1]];
        }

        for (let element of document.querySelectorAll('.enableOption')) {
            let changedEvent = () => {
                if (element.dataset.name) {
                    let streamPlatform = element.dataset.name.split('_')[0];
                    document.querySelector(`#${streamPlatform}Settings`).style.display = element.checked ? 'block' : 'none';
                }
            };
            element.addEventListener('change', changedEvent);
            changedEvent();
        }

        document.body.style.display = '';

        document.getElementById('save').addEventListener('click', () => {
            Helper.Settings.save(document.querySelectorAll('.optionField'));
        });
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
        } else {
            console.log("observer not started (FULL)");
        } // observer.disconnect();

    }, 500);
}
observerFull();
function createbuttonovg() {
    setTimeout(() => {
        chatsettingsbutton = document.querySelectorAll("div.header__block__btn > i");
        if (chatsettingsbutton.item(0)) {
            chatsettingsbutton.item(0).addEventListener("click", clickSettingsButton);
        }
        backbutton = document.querySelectorAll("div.menu.menu__inside > div.menu__block.menu__inside-header");
        if (backbutton.item(0)) {
            if (backbutton.item(0).querySelector('div.menu__block__text').textContent == " Настройки чата ") {
                backbutton.item(0).addEventListener("click", clickSettingsButton);
            }
        }
        createbuttonovg();
    }, 200);
}
createbuttonovg();
function clickSettingsButton() {
    //console.log('bind click');
    divmenu = document.querySelector("wasd-chat-menu > div.menu");
    if (divmenu) {
        addToMenu();
    }
}
function addToMenu() {
    //console.log("addToMenu");
    chatmenu = document.querySelector("wasd-chat-menu > div.menu").querySelectorAll("div.menu__block");
    if (chatmenu) {
        text = " BetterWASD настройки ";
        switcher = `<div id="buttonOvG" class="menu__block menu__block-header"><div class="menu__block__icon"><i class="icon wasd-icons-settings-profile"></i></div><div class="menu__block__text">${text}</div></div>`;
        chatmenu.item(0).insertAdjacentHTML("afterend", switcher);

        if (document.querySelector('#buttonOvG')) {
            document.querySelector('#buttonOvG').addEventListener('click', () => {
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

                        fetch(`${new URL(document.URL).pathname.split('/')[1] == 'private-stream'? 'https://wasd.tv/api/v2/broadcasts/closed/' + new URL(document.URL).pathname.split('/')[2] : 'https://wasd.tv/api/v2/broadcasts/public?channel_name=' + getChannelName()} `)
                        .then(res => res.json())
                        .then((out) => {
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
                        })

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
        if (document.querySelector('iframe#createClip')) {
            document.querySelector('iframe#createClip').remove()
        }
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
        if (buttondiv) {
            buttondiv.remove();
        }
    }
}
//-
let videoPlyerPauseTimer = null;
isInterval = false;
function videoPlyerPauseIsWasdHome() {
    if (document.URL == 'https://wasd.tv/' || document.URL == 'http://wasd.tv/') {
        if (!settings.wasd.autoPlayStreamersOnMain[1]) {
            if (!isInterval) {
                videoPlyerPauseTimer = setInterval(videoPlyerPause, 100);
                isInterval = true;
            }
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
            if (divPending) {
                divPending.style.display = 'none';
            }
            if (!videoActive.paused) {
                videoActive.pause();
            }
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
                //document.body.querySelector('div#scroll-content.wrapper').style.pointerEvents = "none";
                BetterStreamChat.settingsDiv.querySelectorAll('main').forEach(function(main) {
                    main.scrollTo(0, 0)
                })
            });
        }
    }
}
//-
function updateStiskers() {
    if (settings.wasd.bttvInChatMenu[1]) {
        if (!document.querySelector('.bttv-emoji')) {
            if (document.querySelector('div.emoji__head__options')) {

                document.querySelector('div.emoji__head__options').insertAdjacentHTML("beforeend", `<div class="option bttv-emoji"> BTTV </div>`)
                document.querySelector('div.option.bttv-emoji').addEventListener('click', () => {

                    if (document.querySelector('div.emoji__head__options > .active')) {
                        if (document.querySelector('div.emoji__head__options > .active').classList) {
                            document.querySelector('div.emoji__head__options > .active').classList.remove('active');
                        }
                    }

                    if (document.querySelector('wasd-chat-emoji-smiles-ffz')) {
                        document.querySelector('wasd-chat-emoji-smiles-ffz').remove();
                    }

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
                                //console.log(Helper.BTTV.emotes);

                                chrome.storage.local.get((items) => {
                                    Helper.BTTV.fetchGlobalEmotes(items).finally(() => {
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
                                                            img.src = `https://cdn.betterttv.net/emote/${Helper.BTTV.emotes[emoteCode]}/1x`;
                                                            img.classList.add('emoji__item-ovg');
                                                            img.title = emoteCode;
                                                            img.alt = emoteCode;

                                                            stickers__line.append(img);
                                                            img.addEventListener('click', () => {

                                                                let textareabttv = document.querySelector('.footer > div > textarea')
                                                                //saveValuetextareabttv = textareabttv.value;
                                                                textareabttv.value += emoteCode+' ';
                                                                textareabttv.focus()
                                                                textareabttv.dispatchEvent(new Event('input'));
                                                                                
                                                                //document.querySelector('.footer__block.footer__block__btn').click();
                                                                //textareabttv.value = saveValuetextareabttv;
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

                                    /*for(let info of document.querySelectorAll("wasd-chat-emoji-smiles-bttv .stickers__info")) {
                                        info.style.display = `${filterbttv != '' ? '' : ''}`
                                    }*/

                                    /*let stickers = document.querySelectorAll(`wasd-chat-emoji-smiles-bttv .stickers__line`)

                                    for(let sticker of stickers) {
                                        for(let info of sticker.querySelectorAll('.emoji__item-ovg')) {
                                            if (sticker.querySelectorAll('.emoji__item-ovg').length == sticker.querySelectorAll('.emoji__item-ovg[style="display: none;"]').length) {
                                                stickers[sticker].style.display = 'none'
                                            }
                                        }
                                    }*/

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
                        if (option_emotesbttv) {
                            if (option_emotesbttv.classList) {
                                option_emotesbttv.classList.remove('active');
                            }
                        }
                        element.path[0].classList.add('active')

                        if (document.querySelector('wasd-chat-emoji-smiles-bttv')) {
                            document.querySelector('wasd-chat-emoji-smiles-bttv').remove();
                        }

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
        }
    } else {
        let wasd_emoji_smiles = document.querySelector('wasd-chat-emoji-smiles-bttv')
        if (wasd_emoji_smiles) {
            wasd_emoji_smiles.remove();
        }
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

                    if (document.querySelector('div.emoji__head__options > .active')) {
                        if (document.querySelector('div.emoji__head__options > .active').classList) {
                            document.querySelector('div.emoji__head__options > .active').classList.remove('active');
                        }
                    }

                    if (document.querySelector('wasd-chat-emoji-smiles-bttv')) {
                        document.querySelector('wasd-chat-emoji-smiles-bttv').remove();
                    }

                    
                    if (!document.querySelector('div.emoji__head__options > .ffz-emoji.active')) {
                        setTimeout(()=>{
                            let option_emotesffz = document.querySelector('div.option.ffz-emoji')
                            if (option_emotesffz) {
                                if (option_emotesffz.classList) {
                                    option_emotesffz.classList.add('active');
                                }
                            }

                            let emojiSmilesffz = document.querySelector('.emoji__body > wasd-chat-emoji-smiles');
                            if (emojiSmilesffz) {
                                emojiSmilesffz.style.display = 'none';
                            }

                            let emojiStickersffz = document.querySelector('.emoji__body > wasd-chat-emoji-stickers');
                            if (emojiStickersffz) {
                                emojiStickersffz.style.display = 'none';
                            }

                            let emoteBodyffz = document.querySelector('.emoji__body');
                            if (emoteBodyffz) {
                                emoteBodyffz.insertAdjacentHTML("beforeend", `<wasd-chat-emoji-smiles-ffz><div class="emoji-ovg"></div><div style="border-top: 1px solid rgba(var(--wasd-color-switch--rgb),.16);"><input type="search" placeholder="Поиск эмоций" class="option ffzemojiSearch-shat" style="background: url(chrome-extension://iiihfpccbafenoaiclhhejfbldcnbmmd/img/search.png) no-repeat 10px;background-color: var(--wasd-color-prime);border-bottom-width: 0px!important;/* margin-left: 10px; *//* width: calc(100% - 20px); */width: 100%;"></div></wasd-chat-emoji-smiles-ffz>`)
                                let EmoteListffz = emoteBodyffz.querySelector('div.emoji-ovg');
                                //console.log(Helper.FFZ.emotes);

                                chrome.storage.local.get((items) => {
                                    Helper.FFZ.fetchGlobalEmotes(items).finally(() => {
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
                                                            img.src = `https://cdn.frankerfacez.com/emoticon/${Helper.FFZ.emotes[emoteCode]}/1`;
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
                                    
                                    /*for(let info of document.querySelectorAll("wasd-chat-emoji-smiles-ffz .stickers__info")) {
                                        info.style.display = `${filterffz != '' ? 'none' : ''}`
                                    }*/
                                    
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
        let wasd_emoji_smiles = document.querySelector('wasd-chat-emoji-smiles-ffz')
        if (wasd_emoji_smiles) {
            wasd_emoji_smiles.remove();
        }
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
}
/*
let isSetAutoOnlyAudio = null;
function setAutoOnlyAudio() {
    if (settings.wasd.autoOnlyAudio) {
        if (document.querySelector('.menu-settings.main') && !(isSetAutoOnlyAudio == null)) if(document.querySelector('.menu-settings.main').querySelector('.menu-item .settings-aonly input')) if (!(document.querySelector('.menu-settings.main').querySelector('.menu-item .settings-aonly input').checked)) {
            document.querySelector('.menu-settings.main').querySelector('.menu-item .settings-aonly input').click()
            isSetAutoOnlyAudio = true;
        }
    } else {
        if (document.querySelector('.menu-settings.main')) {
            isSetAutoOnlyAudio = false;
        }
    }
}*/

function getChannelName() {
    if (document.querySelector('wasd-user-plays > .user-plays > a[href^="/channel"]')) {
        return document.querySelector('wasd-user-plays > .user-plays > a[href^="/channel"]').textContent.trim().toLowerCase();
    } else if (new URL(document.URL).pathname.split('/')[1] == 'stream-settings') {
        if (document.querySelector('wasd-stream-links input[placeholder="Трансляция"]')) {
            return new URL(document.querySelector('wasd-stream-links input[placeholder="Трансляция"]').value).pathname.split('/')[1].toLowerCase();
        }
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