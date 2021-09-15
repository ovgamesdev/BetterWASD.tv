const HelperTV7 = {
    isBusy: false,
    emotes: {},
    
    updateSettings() {
        let tv7EmoteList = BetterStreamChat.settingsDiv.querySelector(' #tv7EmoteList');
        tv7EmoteList.innerText = '';

        chrome.storage.local.get((items) => {
            HelperTV7.fetchGlobalEmotes(items).finally(() => {
                tv7Emotes = items.tv7Emotes;
                tv7Users = items.tv7Users;
                for (let userID in items.tv7Emotes) {
                    if (items.tv7Emotes.hasOwnProperty(userID)) {
                        let splitdev = document.createElement('div');
                        splitdev.classList.add('stickers__div')
                        splitdev.innerHTML = `<div class="stickers__info"><div class="stickers__info__line"></div><div class="stickers__info__text"> ${typeof tv7Users[userID].username == 'undefined' ? userID : tv7Users[userID].username} </div><div class="stickers__info__line"></div></div><div class="stickers__line"></div>`
                        tv7EmoteList.append(splitdev);
                        let stickers__line = splitdev.querySelector('.stickers__line')
                        for (let emoteCode in items.tv7Emotes[userID]) {
                            if (items.tv7Emotes[userID].hasOwnProperty(emoteCode)) {
                                let div = document.createElement('div');
                                let a = document.createElement('a');
                                let img = document.createElement('img');
                                let div_span = document.createElement('div');
                                let span = document.createElement('span');
                                div.classList.add('div_emoteCard');
                                span.innerText = emoteCode;
                                img.src = `https://cdn.7tv.app/emote/${HelperTV7.emotes[emoteCode]}/2x`;
                                a.href = `https://7tv.app/emotes/${HelperTV7.emotes[emoteCode]}`
                                a.target = '_blank'
                                a.classList.add('emoteCard');
                                a.append(img);
                                div_span.append(span);
                                div.append(a);
                                a.append(div_span);
                                a.title = emoteCode;
                                tv7EmoteList.append(div);
                            }
                        }
                    }
                }
            })
        });

        let list = BetterStreamChat.settingsDiv.querySelector('.tv7UserList');
        list.innerText = '';
        for (let userID in tv7Users) {
            if (tv7Users.hasOwnProperty(userID)) {
                HelperTV7.addUserToList(userID, list);
            }
        }
    },
    loaded() {
        chrome.storage.onChanged.addListener(async function (changes, namespace) {
            if (namespace === 'local') {
                HelperTV7.update();
            } else if (namespace === 'sync') {
                settings = await Helper.getSettings();
                BetterStreamChat.update();
            }
        });
    },
    fetchGlobalEmotes(items) {
        return new Promise((resolve) => {
            let tv7Emotes = items.tv7Emotes || {};
            let tv7Users = items.tv7Users || {};
            if (typeof tv7Users.global === 'undefined' || Date.now() - tv7Users.global.lastUpdate > 604800000) {
                
                new Promise((resolve, reject) => {
                    $.ajax(`https://api.7tv.app/v2/emotes/global`
                    ).always(function (out, textStatus, xhr) {
                        if (xhr.status === 200) { return resolve(out); }
                        else { return reject(); }
                    })
                }).then((data) => {
                    tv7Emotes.global = {};
                    for (let emote of data) {
                        tv7Emotes.global[emote.name] = emote.id;
                    }
                }).finally(() => {
                    tv7Users.global = {
                        lastUpdate: Date.now()
                    };
                    items.tv7Users = tv7Users;
                    items.tv7Emotes = tv7Emotes;
                    chrome.storage.local.set({ tv7Users, tv7Emotes }, () => resolve());
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
                HelperTV7.fetchGlobalEmotes(items).finally(() => {
                    tv7Emotes = items.tv7Emotes;
                    tv7Users = items.tv7Users;
                    let emotes = {};
                    for (let userID in items.tv7Emotes) {
                        if (items.tv7Emotes.hasOwnProperty(userID)) {
                            for (let emoteCode in items.tv7Emotes[userID]) {
                                if (items.tv7Emotes[userID].hasOwnProperty(emoteCode)) {
                                    emotes[emoteCode] = items.tv7Emotes[userID][emoteCode];
                                }
                            }
                        }
                    }
                    HelperTV7.emotes = emotes;
                    HelperTV7.updateSettings();
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

            if (this.emotes[word]) word = `<img class="stickerovg small" style="vertical-align: middle; width: auto!important;" src="https://cdn.7tv.app/emote/${this.emotes[word]}/${size}x" alt="${word}" title="${word}" />`;

            newText.push(word);
        }
        return newText.join(' ');
    },
    getUserEmotes(username) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: `https://api.7tv.app/v2/users/${username}/emotes`,
                success: function(out){
                    resolve (out)
                },
                error: function(out){
                    reject (out?.message)
                }
            });
        });
    },
    updateUserChannelEmotes(userID, username) {
        return HelperTV7.getUserEmotes(username).then((tv7Data) => {
            return HelperTV7.updateEmotes(userID, tv7Data);
        }).then(() => {
            return HelperTV7.addUser(userID, username);
        }).catch((err) => {
            return Promise.reject('У пользователя нет TV7.');
        });
    },
    updateEmotes(userID, tv7Data) {
        tv7Emotes[userID] = {};
        let emoteList = [];
        if (Array.isArray(tv7Data)) {
            emoteList = emoteList.concat(tv7Data);
        }
        /*if (Array.isArray(tv7Data.sharedEmotes)) {
            emoteList = emoteList.concat(tv7Data.sharedEmotes);
        }*/
        for (let emote of emoteList) {
            tv7Emotes[userID][emote.name] = emote.id;
        }
    },
    addUser(userID, username) {
        if (typeof userID === 'string') userID = parseInt(userID);
        return new Promise((resolve) => {
            let addUser = typeof tv7Users[userID] === 'undefined';
            tv7Users[userID] = { username, lastUpdate: Date.now() };
            chrome.storage.local.set({ tv7Users, tv7Emotes }, () => {
                if (addUser) HelperTV7.addUserToList(userID);
                resolve();
            });
        });
    },
    tryAddUser() {
        let username = tv7AddUser.value.trim();
        if (!username.length) return; 
        if (HelperTV7.isBusy) return; 

        tv7AddUser.setAttribute('disabled', 'disabled');
        tv7AddUserBtn.setAttribute('disabled', 'disabled');
        HelperTV7.isBusy = true;
        let beforeEmotes = Object.keys(HelperTV7.emotes).length;
        let userID;
        HelperTwitch.getUserID(username).then((data) => {
            if (data.length) {
                userID = data[0]._id;
                username = data[0].display_name;
                if (typeof tv7Users[userID] !== 'undefined') return Promise.reject('Пользователь уже в списке'); 
                return HelperTV7.updateUserChannelEmotes(userID, data[0].display_name);
            }
            else { return Promise.reject('Пользователь Twitch не найден'); }
        }).then(() => {
            return HelperTV7.update();
        }).then(() => {
            let newEmotes = Object.keys(HelperTV7.emotes).length - beforeEmotes;
            HelperSettings.showMessage(`Пользователь ${username} и ${newEmotes} уникальные эмоции добавлены.`, 'success');
        }).catch((err) => {
            HelperSettings.showMessage(err, 'error');
        }).finally(() => {
            tv7AddUser.value = '';
            tv7AddUser.removeAttribute('disabled');
            tv7AddUserBtn.removeAttribute('disabled');
            HelperTV7.isBusy = false;
        });
    },
    addUserToList(userID, list) {
        list = list || BetterStreamChat.settingsDiv.querySelector('.tv7UserList');
        if (userID === 'global') return; 
        let user = tv7Users[userID];
        let item = document.createElement('tr')
        item.classList.add(`table-menu__block`)
        item.style = 'justify-content: space-between;'
        item.innerHTML = `<td><div><p title="${user.username}"> ${user.username} </p></div></td> <td><div><p> ${(new Date(user.lastUpdate)).toLocaleString()} </p></div></td> <td class="td-btn-remove"><div>
        <ovg-button class="flat-btn ovg removeUser"> <button class="medium ovg removeUser warning" data="${userID}"><i class="wasd-icons-delete" style="pointer-events: none;"></i></button> <ovg-tooltip><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Удалить </div></div></ovg-tooltip> </ovg-button>
        <ovg-button class="flat-btn ovg updateUser" style="left: 10px;"> <button class="basic medium ovg updateUser" data="${userID}"><i class="wasd-icons-record-icon" style="pointer-events: none;"></i></button> <ovg-tooltip><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Обновить </div></div></ovg-tooltip> </ovg-button>
        </div></td>`;
        list.append(item)
        item.querySelector('.removeUser').addEventListener('click', () => {
            HelperTV7.removeUser(userID)
        })
        item.querySelector('.updateUser').addEventListener('click', () => {
            HelperTV7.updateUserChannelEmotes(userID, user.username)
        })
    },
    removeUser(userID) {
        delete tv7Users[userID]
        delete tv7Emotes[userID]
        chrome.storage.local.set({ tv7Users, tv7Emotes });
    },
    updateEmotesTv7() {
        chrome.storage.local.get((items) => {
            for(let userID in items.tv7Emotes) {
                HelperTV7.updateUserChannelEmotes(userID, items.tv7Users[userID].username)
            }
        });
    },
    restoreSettings(items) {
        return new Promise((resolve, reject) => {
            ovg.log('tv7Users', items)

            chrome.storage.local.set({ tv7Users:items.tv7Users, tv7Emotes:{} });
            
            let l = 0
            let i = 0

            for(let userID in items.tv7Users) { l++ }

            for(let userID in items.tv7Users) {
                // if (userID == 'global' || !items.tv7Users[userID]?.username) {
                //     i++
                //     ovg.log('tv7Users i', i, l)
                //     if (i == l) {
                //         ovg.log('resolve i == l', i, l)
                //         resolve()
                //     }
                // } else {
                    ovg.log(userID)
                    HelperTV7.updateUserChannelEmotes(userID, items.tv7Users[userID].username).finally(() => {
                        i++
                        ovg.log('tv7Users i', i, l)
                        HelperSettings.showMessage(`7TV ${i}/${l}`)
                        if (i == l) {
                            ovg.log('resolve i == l', i, l)
                            resolve()
                        }
                    })
                // }
            }
        });
    }
}