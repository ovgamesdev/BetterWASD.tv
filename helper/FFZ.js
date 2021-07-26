const HelperFFZ = {
    isBusy: false,
    emotes: {},
    updateSettings() {
        let ffzEmoteList = BetterStreamChat.settingsDiv.querySelector(' #ffzEmoteList');
        ffzEmoteList.innerText = '';

        chrome.storage.local.get((items) => {
            HelperFFZ.fetchGlobalEmotes(items).finally(() => {
                ffzEmotes = items.ffzEmotes;
                ffzUsers = items.ffzUsers;
                for (let userID in items.ffzEmotes) {
                    if (items.ffzEmotes.hasOwnProperty(userID)) {
                        let splitdev = document.createElement('div');
                        splitdev.classList.add('stickers__div')
                        splitdev.innerHTML = `<div class="stickers__info"><div class="stickers__info__line"></div><div class="stickers__info__text"> ${typeof ffzUsers[userID].username == 'undefined' ? userID : ffzUsers[userID].username} </div><div class="stickers__info__line"></div></div><div class="stickers__line"></div>`
                        ffzEmoteList.append(splitdev);
                        let stickers__line = splitdev.querySelector('.stickers__line')
                        for (let emoteCode in items.ffzEmotes[userID]) {
                            if (items.ffzEmotes[userID].hasOwnProperty(emoteCode)) {
                                let a = document.createElement('a');
                                let img = document.createElement('img');
                                let span = document.createElement('span');
                                span.innerText = emoteCode;
                                img.src = `https://cdn.frankerfacez.com/emoticon/${HelperFFZ.emotes[emoteCode]}/2`;
                                a.href = `https://www.frankerfacez.com/emoticon/${HelperFFZ.emotes[emoteCode]}`
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
            })
        });

        let list = BetterStreamChat.settingsDiv.querySelector('.ffzUserList');
        list.innerText = '';
        for (let userID in ffzUsers) {
            if (ffzUsers.hasOwnProperty(userID)) {
                HelperFFZ.addUserToList(userID, list);
            }
        }
    },
    loaded() {
        chrome.storage.onChanged.addListener(async function (changes, namespace) {
            if (namespace === 'local') {
                HelperFFZ.update();
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
                
                new Promise((resolve, reject) => {
                    $.ajax(`https://api.frankerfacez.com/v1/set/global`
                    ).always(function (out, textStatus, xhr) {
                        console.log(out, textStatus, xhr)
                        if (xhr.status === 200) { return resolve(out); }
                        else { return reject(); }
                    })
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
                HelperFFZ.fetchGlobalEmotes(items).finally(() => {
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
                    HelperFFZ.emotes = emotes;
                    HelperFFZ.updateSettings();
                    resolve();
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
            if (size == 3) size = 4

            if (this.emotes[word]) word = `<img class="stickerovg small" style="vertical-align: middle; width: auto!important;" src="https://cdn.frankerfacez.com/emote/${this.emotes[word]}/${size}" alt="${word}" title="${word}" />`;

            newText.push(word);
        }
        return newText.join(' ');
    },
    getUserEmotes(userID) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: `https://api.frankerfacez.com/v1/room/id/${userID}`,
                success: function(out){
                    console.log(out)
                    resolve (out)
                }
            });
        });
    },
    updateUserChannelEmotes(userID, username) {
        return HelperFFZ.getUserEmotes(userID).then((ffzData) => {
            return HelperFFZ.updateEmotes(userID, ffzData);
        }).then(() => {
            return HelperFFZ.addUser(userID, username);
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
        if (typeof userID === 'string') userID = parseInt(userID);
        return new Promise((resolve) => {
            let addUser = typeof ffzUsers[userID] === 'undefined';
            ffzUsers[userID] = { username, lastUpdate: Date.now() };
            chrome.storage.local.set({ ffzUsers, ffzEmotes }, () => {
                if (addUser) HelperFFZ.addUserToList(userID);
                resolve();
            });
        });
    },
    tryAddUser() {
        let userElement = BetterStreamChat.settingsDiv.querySelector('#ffzAddUser');
        let button = BetterStreamChat.settingsDiv.querySelector('#ffzAddUserBtn');
        let username = userElement.value.trim();
        if (!username.length) return; 
        if (HelperFFZ.isBusy) return; 

        userElement.setAttribute('disabled', 'disabled');
        button.setAttribute('disabled', 'disabled');
        HelperFFZ.isBusy = true;
        let beforeEmotes = Object.keys(HelperFFZ.emotes).length;
        let userID;
        HelperTwitch.getUserID(username).then((data) => {
            if (data.length) {
                userID = data[0]._id;
                username = data[0].display_name;
                if (typeof ffzUsers[userID] !== 'undefined') return Promise.reject('Пользователь уже в списке'); 
                return HelperFFZ.updateUserChannelEmotes(userID, data[0].display_name);
            }
            else { return Promise.reject('Пользователь Twitch не найден'); }
        }).then(() => {
            return HelperFFZ.update();
        }).then(() => {
            let newEmotes = Object.keys(HelperFFZ.emotes).length - beforeEmotes;
            HelperSettings.showMessage(`Пользователь ${username} и ${newEmotes} уникальные эмоции добавлены.`);
        }).catch((err) => {
            HelperSettings.showMessage(err, 'error');
        }).finally(() => {
            userElement.value = '';
            userElement.removeAttribute('disabled');
            button.removeAttribute('disabled');
            HelperFFZ.isBusy = false;
        });
    },
    addUserToList(userID, list) {
        list = list || BetterStreamChat.settingsDiv.querySelector('.ffzUserList');
        if (userID === 'global') return; 
        let user = ffzUsers[userID];
        let item = document.createElement('tr')
        item.classList.add(`table-menu__block`)
        item.style = 'justify-content: space-between;'
        item.innerHTML = `<td><div><p title="${user.username}"> ${user.username} </p></div></td> <td><div><p> ${(new Date(user.lastUpdate)).toLocaleString()} </p></div></td> <td class="td-btn-remove"><div><button class="removeUser primary ovg basic" data="${userID}"><i class="wasd-icons-delete" style="pointer-events: none;"></i></button><button style="left: 10px;" class="updateUser primary ovg basic" data="${userID}"><i class="wasd-icons-record-icon" style="pointer-events: none;"></i></button></div></td>`;
        list.append(item)
        item.querySelector('.removeUser').addEventListener('click', () => {
            HelperFFZ.removeUser(userID)
        })
        item.querySelector('.updateUser').addEventListener('click', () => {
            HelperFFZ.updateUserChannelEmotes(userID, user.username)
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
                HelperFFZ.updateUserChannelEmotes(userID, items.ffzUsers[userID].username)
            }
        });
    },
}