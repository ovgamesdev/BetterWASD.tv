const HelperWASD = {
  openUserCardName: '',
  isModerator: false,
  closedViewUrl: 'none',
  self_channel_name: 'none',
  userColors: ["#7fba40", "#1c3fc8", "#a5276d", "#913ca7", "#4332b6", "#266bc5", "#5bc3c1", "#d87539", "#a9ad47", "#3ca13b", "#4db89a", "#6a4691", "#f5a623", "#e7719e", "#9fcbef", "#7b4b4b"],
  badges: {},
  messageTimeout: null,
  loaded() {
    if (new URL(document.URL).searchParams.get('helper-settings')) {
      BetterStreamChat.settingsDiv.style.display = 'block'
      BetterStreamChat.settingsDiv.classList.add('fullscreen')

      setInterval(() => {
        if(typeof chrome.app?.isInstalled !== 'undefined') chrome.runtime.sendMessage({
          from: "tab_settings"
        })
      }, 5000)
    } else {
      setInterval(() => {
        if(typeof chrome.app?.isInstalled !== 'undefined') chrome.runtime.sendMessage({
          from: "tab_content"
        })
      }, 5000)

      $( "#bscSettingsPanel" ).draggable({
        containment: "body",
        handle: "header",
        snap: ".player-wrapper",
        scroll: false,
        grid: [2, 2],
        drag: (event, ui) => {
          ui.position.left = Math.max( (bscSettingsPanel.clientWidth / 2), ui.position.left );
          ui.position.top = Math.max( (bscSettingsPanel.clientHeight / 2), ui.position.top );
        }
      });
    }

    chrome.storage.onChanged.addListener(async (changes, namespace) => {
      if (namespace === 'sync') {
        settings = await Helper.getSettings();
        BetterStreamChat.update();
      }
    });

    $.ajax({
      url: `https://wasd.tv/api/v2/profiles/current`,
      success: (out) => {
        if (out.result.user_role != "GUEST") {
          HelperWASD.self_channel_name = out.result.user_profile.user_login
          $.ajax({
            url: `https://radiant-basin-27885.herokuapp.com/api/v1/init`,
            type: "POST",
            data: {
              user_login: out.result.user_profile.user_login,
              user_id: out.result.user_profile.user_id,
              channel_image: out.result.user_profile.profile_image.large
            },
            success: (out) => {
              ovg.log(out)
            }
          })
        }
      }
    })

  },
  addUserToBlackList(username) {
    let html = document.querySelector('.blacklist .user .ovg-items')
    let item = document.createElement('tr')
    item.classList.add(`table-menu__block`)
    item.style = 'justify-content: space-between;'

    let usernameed = settings.wasd.userNameEdited[username.trim().split('@').join('')];
    item.innerHTML = `<td><div><p title="${username}"> ${usernameed ? usernameed+' ('+username+')' : username} </p></div></td> <td><div><p> ${(new Date(settings.list.blockUserList[username])).toLocaleString()} </p></div></td> <td class="td-btn-remove"><div> <ovg-button class="flat-btn ovg removeUser"> <button class="medium ovg remove warning" data="${username}"><i class="wasd-icons-delete" style="pointer-events: none;"></i></button> <ovg-tooltip><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Удалить </div></div></ovg-tooltip> </ovg-button> </div></td>`;
    item.setAttribute('data', username)
    html.append(item)
    item.querySelector('.remove').addEventListener('click', ({ target }) => {
      let nickname = target.getAttribute('data')
      delete settings.list.blockUserList[nickname];
      item.remove()
      HelperWASD.showChatMessage(`Пользователь ${nickname} удален из ЧС`, 'success')
      //ovg.log(settings.list.blockUserList)
      HelperSettings.save([document.querySelector('.optionField')]);
    })
  },
  addUserToHighLight(username) {
    let html = document.querySelector('.highlight .user .ovg-items')
    let item = document.createElement('tr')
    item.classList.add(`table-menu__block`)
    item.style = 'justify-content: space-between;'

    let usernameed = settings.wasd.userNameEdited[username.trim().split('@').join('')];
    let setting = settings.list.highlightUserList[username]

    item.innerHTML = `<td><div><p title="${username}, ${setting.color}, ${setting.register}"> ${usernameed ? usernameed+' ('+username+')' : username} </p></div></td> <td><div><p> ${new Date(setting.date).toLocaleString()} </p></div></td> <td><div><p><div class="clr-field" style="color: ${setting.color};height: 24px;width: 34px;"><button aria-labelledby="clr-open-label"></button></div></p></div></td> <td class="td-btn-remove"><div> <ovg-button class="flat-btn ovg removeUser"> <button class="medium ovg remove warning" data="${username}"><i class="wasd-icons-delete" style="pointer-events: none;"></i></button> <ovg-tooltip><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Удалить </div></div></ovg-tooltip> </ovg-button> </div></td>`;
    item.setAttribute('data', username)
    html.append(item)
    item.querySelector('.remove').addEventListener('click', ({ target }) => {
      let nickname = target.getAttribute('data')
      delete settings.list.highlightUserList[nickname];
      item.remove()
      HelperWASD.showChatMessage(`Пользователь ${nickname} удален из выделения`, 'success')
      //ovg.log(settings.list.highlightUserList)
      HelperSettings.save([document.querySelector('.optionField')]);
    })
  },
  addTermToBlackList(term) {
    let html = document.querySelector('.blacklist .term .ovg-items')
    let item = document.createElement('tr')
    item.classList.add(`table-menu__block`)
    item.style = 'justify-content: space-between;'

    item.innerHTML = `<td><div><p title="${term}"> ${term} </p></div></td> <td><div><p> ${(new Date(settings.list.blockTermList[term])).toLocaleString()} </p></div></td> <td class="td-btn-remove"><div> <ovg-button class="flat-btn ovg removeUser"> <button class="medium ovg remove warning" data="${term}"><i class="wasd-icons-delete" style="pointer-events: none;"></i></button> <ovg-tooltip><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Удалить </div></div></ovg-tooltip> </ovg-button> </div></td>`;
    item.setAttribute('data', term)
    html.append(item)
    item.querySelector('.remove').addEventListener('click', ({ target }) => {
      let termin = target.getAttribute('data')
      delete settings.list.blockTermList[termin];
      item.remove()
      HelperWASD.showChatMessage(`Термин ${termin} удален из ЧС`, 'success')
      //ovg.log(settings.list.blockTermList)
      HelperSettings.save([document.querySelector('.optionField')]);
    })
  },
  addTermToHighLight(term) {
    let html = document.querySelector('.highlight .term .ovg-items')
    let item = document.createElement('tr')
    item.classList.add(`table-menu__block`)
    item.style = 'justify-content: space-between;'

    let setting = settings.list.highlightTermList[term]

    item.innerHTML = `<td><div><p title="${term}, ${setting.color}, ${setting.register}, ${setting.whole}"> ${term} </p></div></td> <td><div><p> ${new Date(setting.date).toLocaleString()} </p></div></td> <td><div><p><div class="clr-field" style="color: ${setting.color};height: 24px;width: 34px;"><button aria-labelledby="clr-open-label"></button></div></p></div></td> <td class="td-btn-remove"><div> <ovg-button class="flat-btn ovg removeUser"> <button class="medium ovg remove warning" data="${term}"><i class="wasd-icons-delete" style="pointer-events: none;"></i></button> <ovg-tooltip><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Удалить </div></div></ovg-tooltip> </ovg-button> </div></td>`;
    item.setAttribute('data', term)
    html.append(item)
    item.querySelector('.remove').addEventListener('click', ({ target }) => {
      let termin = target.getAttribute('data')
      delete settings.list.highlightTermList[termin];
      item.remove()
      HelperWASD.showChatMessage(`Термин ${termin} удален из выделения`, 'success')
      //ovg.log(settings.list.highlightTermList)
      HelperSettings.save([document.querySelector('.optionField')]);
    })
  },
  obs_addUserToBlackList(username) {
    let html = document.querySelector('.obs_blacklist .user .ovg-items')
    let item = document.createElement('tr')
    item.classList.add(`table-menu__block`)
    item.style = 'justify-content: space-between;'

    let usernameed = settings.wasd.userNameEdited[username.trim().split('@').join('')];
    item.innerHTML = `<td><div><p title="${username}"> ${usernameed ? usernameed+' ('+username+')' : username} </p></div></td> <td><div><p> ${(new Date(settings.obschat.list.blockUserList[username])).toLocaleString()} </p></div></td> <td class="td-btn-remove"><div> <ovg-button class="flat-btn ovg removeUser"> <button class="medium ovg remove warning" data="${username}"><i class="wasd-icons-delete" style="pointer-events: none;"></i></button> <ovg-tooltip><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Удалить </div></div></ovg-tooltip> </ovg-button> </div></td>`;
    item.setAttribute('data', username)
    html.append(item)
    item.querySelector('.remove').addEventListener('click', ({ target }) => {
      let nickname = target.getAttribute('data')
      delete settings.obschat.list.blockUserList[nickname];
      item.remove()
      HelperWASD.showChatMessage(`Пользователь ${nickname} удален из ЧС`, 'success')
      //ovg.log(settings.list.blockUserList)
      HelperSettings.save([document.querySelector('.optionField')]);
    })
  },
  obs_addUserToHighLight(username) {
    let html = document.querySelector('.obs_highlight .user .ovg-items')
    let item = document.createElement('tr')
    item.classList.add(`table-menu__block`)
    item.style = 'justify-content: space-between;'

    let usernameed = settings.wasd.userNameEdited[username.trim().split('@').join('')];
    let setting = settings.obschat.list.highlightUserList[username]

    item.innerHTML = `<td><div><p title="${username}, ${setting.color}, ${setting.register}"> ${usernameed ? usernameed+' ('+username+')' : username} </p></div></td> <td><div><p> ${new Date(setting.date).toLocaleString()} </p></div></td> <td><div><p><div class="clr-field" style="color: ${setting.color};height: 24px;width: 34px;"><button aria-labelledby="clr-open-label"></button></div></p></div></td> <td class="td-btn-remove"><div> <ovg-button class="flat-btn ovg removeUser"> <button class="medium ovg remove warning" data="${username}"><i class="wasd-icons-delete" style="pointer-events: none;"></i></button> <ovg-tooltip><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Удалить </div></div></ovg-tooltip> </ovg-button> </div></td>`;
    item.setAttribute('data', username)
    html.append(item)
    item.querySelector('.remove').addEventListener('click', ({ target }) => {
      let nickname = target.getAttribute('data')
      delete settings.obschat.list.highlightUserList[nickname];
      item.remove()
      HelperWASD.showChatMessage(`Пользователь ${nickname} удален из выделения`, 'success')
      //ovg.log(settings.list.highlightUserList)
      HelperSettings.save([document.querySelector('.optionField')]);
    })
  },
  obs_addTermToBlackList(term) {
    let html = document.querySelector('.obs_blacklist .term .ovg-items')
    let item = document.createElement('tr')
    item.classList.add(`table-menu__block`)
    item.style = 'justify-content: space-between;'

    item.innerHTML = `<td><div><p title="${term}"> ${term} </p></div></td> <td><div><p> ${(new Date(settings.obschat.list.blockTermList[term])).toLocaleString()} </p></div></td> <td class="td-btn-remove"><div> <ovg-button class="flat-btn ovg removeUser"> <button class="medium ovg remove warning" data="${term}"><i class="wasd-icons-delete" style="pointer-events: none;"></i></button> <ovg-tooltip><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Удалить </div></div></ovg-tooltip> </ovg-button> </div></td>`;
    item.setAttribute('data', term)
    html.append(item)
    item.querySelector('.remove').addEventListener('click', ({ target }) => {
      let termin = target.getAttribute('data')
      delete settings.obschat.list.blockTermList[termin];
      item.remove()
      HelperWASD.showChatMessage(`Термин ${termin} удален из ЧС`, 'success')
      //ovg.log(settings.list.blockTermList)
      HelperSettings.save([document.querySelector('.optionField')]);
    })
  },
  obs_addTermToHighLight(term) {
    let html = document.querySelector('.obs_highlight .term .ovg-items')
    let item = document.createElement('tr')
    item.classList.add(`table-menu__block`)
    item.style = 'justify-content: space-between;'

    let setting = settings.obschat.list.highlightTermList[term]

    item.innerHTML = `<td><div><p title="${term}, ${setting.color}, ${setting.register}, ${setting.whole}"> ${term} </p></div></td> <td><div><p> ${new Date(setting.date).toLocaleString()} </p></div></td> <td><div><p><div class="clr-field" style="color: ${setting.color};height: 24px;width: 34px;"><button aria-labelledby="clr-open-label"></button></div></p></div></td> <td class="td-btn-remove"><div> <ovg-button class="flat-btn ovg removeUser"> <button class="medium ovg remove warning" data="${term}"><i class="wasd-icons-delete" style="pointer-events: none;"></i></button> <ovg-tooltip><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Удалить </div></div></ovg-tooltip> </ovg-button> </div></td>`;
    item.setAttribute('data', term)
    html.append(item)
    item.querySelector('.remove').addEventListener('click', ({ target }) => {
      let termin = target.getAttribute('data')
      delete settings.obschat.list.highlightTermList[termin];
      item.remove()
      HelperWASD.showChatMessage(`Термин ${termin} удален из выделения`, 'success')
      //ovg.log(settings.list.highlightTermList)
      HelperSettings.save([document.querySelector('.optionField')]);
    })
  },
  textToURL(text) {
    if (text) {
      text = text.replace(/<a[^>]*href="([^"]+)"[^>]*>(?:.*?<\/a>)?/g, ' $1 ');
      return linkifyHtml(text, {
        target: "_blank",
        className: 'test',
        format: (value) => value.replace(/@/g, '+at+'),
        formatHref: (value) => value.replace(/@/g, '+at+'),
        truncate: settings.wasd.truncateLink.toString() === '0' ? null : settings.wasd.truncateLink
      });
    }
  },
  showChatMessage(message, type = 'warning') {
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

      if (HelperWASD.messageTimeout) {
        clearTimeout(HelperWASD.messageTimeout);
      }
      statusNofify.classList.add('active');
    }

    const hide = () => {
      if (HelperWASD.messageTimeout) {
        clearTimeout(HelperWASD.messageTimeout);
      }
      HelperWASD.messageTimeout = null;
      if (statusNofify) {
        statusNofify.removeEventListener('click', hide);
        statusNofify.classList.remove('active');
      }

    };
    if (statusNofify) {
      statusNofify.addEventListener('click', hide);
      HelperWASD.messageTimeout = setTimeout(hide, 2000);
    }
  },
  addMessageToChat(messagetext, isClick = false) {
    messages = document.querySelector('.block__messages')
    if (messages) {
      messages.children[messages.children.length - 1].insertAdjacentHTML("afterend", `<div class="block__messages__item" style="margin-bottom:4px;display:flex;flex-direction:row;justify-content:center;width:100%;font-family:Roboto,sans-serif;font-size:12px;letter-spacing:normal;line-height:normal"><wasd-chat-system-message style="display:flex;margin:0 4px;width:100%"><div class="block" style="font-family:Roboto,sans-serif;width:100%"><div class="block__item" style="${isClick?'cursor:pointer;':''}-moz-user-select:none;-webkit-user-select:none;background-color:rgba(var(--wasd-color-switch--rgb),.08);border-radius:4px;color:var(--wasd-color-text-third);font-size:12px;margin:8px 0;padding:8px 16px;text-align:center;user-select:none"><div style="line-height:14px"> ${messagetext} </div></div></div></wasd-chat-system-message></div>`)
      var message = messages.children[messages.children.length - 1]
      //ovg.log(message)
      document.querySelector('.block').scrollTop = messages.scrollHeight
      return message;
    }
  },
  createUserViewerCard(channel_name, positionself = false) {
    const removeVC = () => {
      if (document.querySelector('.chat-room__viewer-card')) {
        HelperWASD.highlightMessagesRemove()
        HelperWASD.openUserCardName = ''
        document.querySelector('.chat-room__viewer-card').remove()
      }
    }

    var top_card;
    var left_card = 0;
    var data;
    if (!positionself) {
      if (document.querySelector('div.chat-container')) {
        let content = document.querySelector('#scroll-content')
        if (!settings.wasd.chatOnTheLeft) {
          top_card = y - 13;
          left_card = content.offsetWidth - document.querySelector('div.chat-container').offsetWidth + 5;
        } else {
          top_card = y - 13;
          left_card = 0;
        }

        if (content.offsetWidth - 9 <= left_card + 362) {
          left_card = (content.offsetWidth - 9) - 362 - 1;
        }
        if (!(left_card <= 9)) {
          if ((left_card >= (content.offsetWidth - 9) - 180)) {
            left_card = ((content.offsetWidth - 9) - 181);
          }
        } else {
          left_card = 0;
        }

        if (!(top_card <= 9)) {
          if ((top_card >= (content.offsetHeight - 9) - 476)) {
            top_card = ((content.offsetHeight - 9) - 477);
          }
        } else {
          top_card = 10;
        }
      } else {
        top_card = y - 13;
        left_card = x - 13 - 50;
        let content = document.querySelector('#scroll-content')
        if ((left_card >= (content.offsetWidth - 9) - 180)) {
          left_card = ((content.offsetWidth - 9) - 181);
        }
        if (content.offsetWidth - 9 <= left_card + 370) {
          left_card = (content.offsetWidth - 9) - 370 - 1;
        }
      }

      let mobile = document.querySelector('.theatre-mode-mobile');
      if (mobile) {
        top_card = mobile.clientHeight + 93 + 7.5
      }
    } else if (document.querySelector('.chat-room__viewer-card')) {
      top_card = document.querySelector('.ovg-viewer-card').offsetTop
      left_card = document.querySelector('.ovg-viewer-card').offsetLeft
    }

    removeVC()

    var usercard = `<div class="chat-room__viewer-card loading"><div class="tw-full-height tw-full-width tw-relative tw-z-above viewer-card-layer"><div style="top: ${top_card}px; left: ${left_card}px;" class="tw-border-radius-medium ovg-viewer-card"><div class="tw-full-height tw-full-width"><div class="tw-border-radius-medium tw-c-background-base viewer-card"><div style="" class="tw-c-background-accent-alt viewer-card-header__background" style=""><div class="tw-flex tw-flex-column tw-full-height tw-full-width viewer-card-header__overlay"><div class="tw-align-center tw-align-items-start tw-c-background-overlay tw-c-text-overlay tw-flex tw-flex-row tw-full-width tw-justify-content-start tw-relative viewer-card-header__banner"><div class="tw-inline-flex viewer-card-drag-cancel"><figure class="tw-avatar"><div class="profile-main__avatar" style=""></div></figure></div><div class="tw-align-left viewer-card-header__display-name"><div class="tw-inline-flex viewer-card-drag-cancel"><div class="tw-full-width tw-pd-r-5"><h4 class="tw-c-text-overlay tw-ellipsis tw-line-clamp-2 tw-word-break-all"><a class="tw-link" rel="noopener noreferrer" target="_blank" href=""></a><button class="bttv-moderator-card-nickname-change-button"><span class="buttonIcon"><svg width="16px" height="16px" version="1.1" viewBox="0 0 16 16" x="0px" y="0px" fill="white"><path clip-rule="evenodd" d="M6.414,12.414L3.586,9.586l8-8l2.828,2.828L6.414,12.414z M4.829,14H2l0,0v-2.828l0.586-0.586l2.828,2.828L4.829,14z" fill-rule="evenodd"></path></svg></span></button></h4></div></div><div class="tw-flex"><i _ngcontent-cel-c162="" class="wasd-icons-games ovg" style="font-size:20px;align-items:center;display:none;justify-content:center"></i><a target="_blank" data-test-selector="viewer_card_game" class="tw-c-text-overlay tw-mg-l-05 tw-mg-t-auto gameurl"></a></div></div></div><div class="bttv-moderator-card-user-stats"><div class="tw-flex tw-full-width"><div style="display:none;" class="tw-align-items-center tw-inline-flex tw-stat tw-pd-l-1 viewers-title" title="Зрителей за стрим"><div class="tw-align-items-center tw-inline-flex tw-stat__icon tw-mg-r-1"><i _ngcontent-cel-c162="" style="font-size:14px;height:14px;width:14px;align-items:center;display:flex;justify-content:center" class="wasd-icons-viewers-live"></i></div><div class="tw-stat__value viewers"></div></div><div class="tw-align-items-center tw-inline-flex tw-stat tw-pd-l-1 channal_followers_count-title" title="Количество фолловеров канала"><div class="tw-align-items-center tw-inline-flex tw-stat__icon tw-mg-r-1"><i _ngcontent-xul-c30="" class="wasd-icons-favorite"></i></div><div class="tw-stat__value channal_followers_count"></div></div><div class="tw-align-items-center tw-inline-flex tw-stat tw-pd-l-1 channal_created_at-title" title="Канал создан"><div class="tw-align-items-center tw-inline-flex tw-stat__icon tw-mg-r-1"><figure class="tw-svg"><svg class="tw-svg__asset tw-svg__asset--heart tw-svg__asset--inherit" width="16px" height="16px" viewBox="0 0 1792 1792" fill="white"><path d="M1792 1408v384h-1792v-384q45 0 85-14t59-27.5 47-37.5q30-27 51.5-38t56.5-11q24 0 44 7t31 15 33 27q29 25 47 38t58 27 86 14q45 0 85-14.5t58-27 48-37.5q21-19 32.5-27t31-15 43.5-7q35 0 56.5 11t51.5 38q28 24 47 37.5t59 27.5 85 14 85-14 59-27.5 47-37.5q30-27 51.5-38t56.5-11q34 0 55.5 11t51.5 38q28 24 47 37.5t59 27.5 85 14zm0-320v192q-24 0-44-7t-31-15-33-27q-29-25-47-38t-58-27-85-14q-46 0-86 14t-58 27-47 38q-22 19-33 27t-31 15-44 7q-35 0-56.5-11t-51.5-38q-29-25-47-38t-58-27-86-14q-45 0-85 14.5t-58 27-48 37.5q-21 19-32.5 27t-31 15-43.5 7q-35 0-56.5-11t-51.5-38q-28-24-47-37.5t-59-27.5-85-14q-46 0-86 14t-58 27-47 38q-30 27-51.5 38t-56.5 11v-192q0-80 56-136t136-56h64v-448h256v448h256v-448h256v448h256v-448h256v448h64q80 0 136 56t56 136zm-1280-864q0 77-36 118.5t-92 41.5q-53 0-90.5-37.5t-37.5-90.5q0-29 9.5-51t23.5-34 31-28 31-31.5 23.5-44.5 9.5-67q38 0 83 74t45 150zm512 0q0 77-36 118.5t-92 41.5q-53 0-90.5-37.5t-37.5-90.5q0-29 9.5-51t23.5-34 31-28 31-31.5 23.5-44.5 9.5-67q38 0 83 74t45 150zm512 0q0 77-36 118.5t-92 41.5q-53 0-90.5-37.5t-37.5-90.5q0-29 9.5-51t23.5-34 31-28 31-31.5 23.5-44.5 9.5-67q38 0 83 74t45 150z"></path></svg></figure></div><div class="tw-stat__value channal_created_at"></div></div><div class="tw-align-items-center tw-inline-flex tw-stat tw-pd-l-1 profile_level-title" title="Уровень канала"><div class="tw-align-items-center tw-inline-flex tw-stat__icon tw-mg-r-1"><i _ngcontent-ykf-c54="" style="font-size:14px;height:14px;width:14px;align-items:center;display:flex;justify-content:center" class="icon wasd-icons-lvl"></i></div><div class="tw-stat__value profile_level"></div></div></div></div></div></div><div class="ovg buttonsdiv"><wasd-channel-favorite-btn id="selector-channel-favorite-btn-ovg"><wasd-button class="stroked-btn ovg" wasdtooltip="" style="position: relative;display: inline-block;outline: none;"><button class="medium primary ovg disabled" type="button"><i class="wasd-icons-like ovg"></i> <span></span></button><ovg-tooltip><div class="ovg tooltip tooltip_position-right tooltip_size-small" style="width: 200px;"><div class="tooltip-content tooltip-content_left ovg"> Добавить в избранное </div></div></ovg-tooltip></wasd-button></wasd-channel-favorite-btn><div style="width:100%"></div><div class="item__links-ovg"></div></div><div class="tw-c-background-alt-2 tw-pd-t-05 stickers"><div class="paid_title-ovg" style="display:none;"> Стикеры канала </div><div class="paidsubs-popup__stickers"></div></div> <div class="tw-c-background-alt-2 tw-pd-t-05 roles" style="display: none;padding: 5px 0;"><div class="paid_title-ovg" style="display: block;"> Значки </div><div class="popup__roles"></div></div> <div class="user_last_messages-ovg"><button class="paid_title-ovg last_messages" style="display: block;padding-bottom: 10px;box-shadow: 0px 2px 2px -2px rgba(var(--wasd-color-switch--rgb),.32);z-index: 2;position: relative;"><div class="accordion-header-wrap-ovg"><span class="accordion-header-ovg"> Последние сообщения </span><div class="accordion-header-arrow-ovg"><i class="wasd-icons-dropdown-top"></i></div></div><div class="accordion-marker-ovg"></div></button><div class="block-ovg"><div class="block__messages-ovg"></div></div></div></div></div><div data-a-target="viewer-card-close-button" class="tw-absolute tw-mg-r-05 tw-mg-t-05 tw-right-0 tw-top-0"><div class="tw-inline-flex viewer-card-drag-cancel"><button class="tw-button-icon tw-button-icon--overlay tw-core-button" aria-label="Скрыть" data-test-selector="close-viewer-card"><i _ngcontent-ykf-c54="" style="font-size:13px;align-items:center;display:flex;justify-content:center" class="icon wasd-icons-close"></i></button></div></div></div></div></div>`;
    if (!document.querySelector('.channel-wrapper') && document.querySelector('.chat-room__viewer-card')) {
      document.querySelector('.chat-room__viewer-card').style.zIndex = '5556'
    }

    document.querySelector('.channel-wrapper')?.insertAdjacentHTML("beforeend", usercard);
    document.querySelector('.wasd-container')?.insertAdjacentHTML("beforeend", usercard);

    let card = document.querySelector('.chat-room__viewer-card')

    if (settings.wasd.highlightMessagesOpenCard) HelperWASD.highlightMessages(channel_name.trim())

    card.querySelector("[data-a-target='viewer-card-close-button']").addEventListener('click', () => {
      removeVC()
    });

    HelperWASD.openUserCardName = channel_name.trim()

    card.querySelector('wasd-button.flat-btn.ovg > button.ovg')?.addEventListener('mouseover', () => {
      card.querySelector('div.tooltip.tooltip_position-right.tooltip_size-small.ovg').style.display = 'flex';
    });
    card.querySelector('wasd-button.flat-btn.ovg > button.ovg')?.addEventListener('mouseout', () => {
      card.querySelector('div.tooltip.tooltip_position-right.tooltip_size-small.ovg').style.display = '';
    });

    $( ".tw-border-radius-medium.ovg-viewer-card" ).draggable({
      containment: ".viewer-card-layer",
      handle: ".viewer-card-header__background",
      scroll: false,
      grid: [2, 2]
    });

    ws_user = document.querySelector(`.WebSocket_history .user_ws[user_loginlc="${channel_name.trim().toLowerCase().split('@').join('')}"]`)
    var viewerCard = document.querySelector('.chat-room__viewer-card');
    
    const UserCard = (data) => {
      if (data) {

        $.ajax({
          url: `https://wasd.tv/api/v2/profiles/${data.user_id}`,
          success: (out) => {
            if (viewerCard && out.result) {
              viewerCard.querySelector('div.tw-stat__value.profile_level').textContent = out.result.user_xp.profile_level;
              viewerCard.querySelector('.profile_level-title').title = `${out.result.user_xp.profile_level} уровень канала`;

              var date = new Date(out.result.user_profile.created_at);

              if (document.querySelector('.chat-room__viewer-card')) {
                viewerCard = document.querySelector('.chat-room__viewer-card');
                viewerCard.querySelector('div.tw-stat__value.channal_created_at').textContent = `${jQuery.timeago(date)} назад`;
                viewerCard.querySelector('.channal_created_at-title').title = `Канал создан ${date.toLocaleString('ru')}`;
                // user_login
                if (settings.wasd.userNameEdited[out.result.user_profile.user_login.trim()]) {
                  viewerCard.querySelector('a.tw-link').textContent = settings.wasd.userNameEdited[out.result.user_profile.user_login.trim()];
                } else {
                  viewerCard.querySelector('a.tw-link').textContent = out.result.user_profile.user_login;
                }

                viewerCard.querySelector('a.tw-link').setAttribute('title', out.result.user_profile.user_login);
                // user_id url
                viewerCard.querySelector('a.tw-link').href = `user/${out.result.user_id}`;
                // profile_image
                viewerCard.querySelector('div.profile-main__avatar').style.backgroundImage = `url(${out.result.user_profile.profile_image?.large})`;
                // profile_background
                viewerCard.querySelector('div.tw-c-background-accent-alt.viewer-card-header__background').style.backgroundImage = `url(${out.result.user_profile.profile_background?.large})`;


                card.querySelector("button.bttv-moderator-card-nickname-change-button").addEventListener('click', () => {
                  var newusername;
                  var user_channel_name = out.result.user_profile.user_login;
                  if (user_channel_name && settings.wasd.userNameEdited[user_channel_name]) {
                    newusername = prompt(`Введите обновленный ник для ${user_channel_name} (оставьте поле пустым, чтобы сбросить):`, settings.wasd.userNameEdited[user_channel_name].trim());
                  } else {
                    newusername = prompt(`Введите обновленный ник для ${user_channel_name} (оставьте поле пустым, чтобы сбросить):`, user_channel_name);
                  }

                  if (!(newusername == null || newusername == user_channel_name) && newusername != '') {
                    HelperWASD.showChatMessage(`Новый ник ${newusername} пользователя ${user_channel_name}`, 'success');
                    settings.wasd.userNameEdited[user_channel_name] = ` ${newusername} `;
                  } else if (newusername == '') {
                    HelperWASD.showChatMessage(`Новый ник ${user_channel_name} пользователя ${user_channel_name}`, 'success');
                    delete settings.wasd.userNameEdited[user_channel_name];
                  }

                  HelperSettings.save([document.querySelector('.optionField')]);
                });
              }

              $.ajax({
                url: `https://wasd.tv/api/v2/broadcasts/public?channel_id=${out.result.user_profile.channel_id}`, // user card broadcast
                success: (out) => {

                  card.classList.remove('loading') // loaded card
                  if (viewerCard.querySelector('.roles .popup__roles').childElementCount != 0) {
                    viewerCard.querySelector('.roles').style.display = 'block'
                  }

                  let databroadcasts = out;
                  if (viewerCard) {
                    var description = viewerCard.querySelector('a.tw-c-text-overlay.tw-mg-l-05.tw-mg-t-auto.gameurl')

                    if (out.result.media_container != null) {
                      isLiveDisplay = () =>  {
                        if (out.result.channel.channel_is_live) {
                          return 'inline-flex';
                        } else {
                          return 'none';
                        }
                      }
                      // gamepad display
                      if (description.textContent == '') viewerCard.querySelector('.wasd-icons-games.ovg').style.display = isLiveDisplay()
                      // stream_total_viewers display
                      viewerCard.querySelector('div.tw-align-items-center.tw-inline-flex.tw-stat.tw-pd-l-1').style.display = isLiveDisplay()
                    
                      // game_name
                      if (description.textContent == '') description.textContent = ` Стримит ${out.result?.media_container?.game?.game_name? out.result?.media_container?.game?.game_name : ''}`;
                      if (description.textContent == '') description.title = ` Стримит ${out.result?.media_container?.game?.game_name? out.result?.media_container?.game?.game_name : ''}`;
                      // stream_total_viewers
                      viewerCard.querySelector('div.tw-stat__value.viewers').textContent = out.result?.media_container?.media_container_streams[0]?.stream_total_viewers;
                      viewerCard.querySelector('.viewers-title').title = `Зрителей за стрим ${out.result?.media_container?.media_container_streams[0]?.stream_total_viewers}`;
                      // game_id url
                      if (description.textContent == '') description.href = `games/${out.result?.media_container?.game?.game_id}`;
                    } else {
                      // channel_description
                      let message = out.result?.channel?.channel_description;
                      if (description.textContent == '' && out.result?.channel?.channel_description) {
                        description.innerHTML = HelperWASD.textToURL(message);
                        description.title = out.result?.channel?.channel_description;
                      }

                    }

                    // followers_count
                    viewerCard.querySelector('div.tw-stat__value.channal_followers_count').textContent = out.result?.channel?.followers_count;
                    viewerCard.querySelector('.channal_followers_count-title').title = `${out.result?.channel?.followers_count} фолловеров`;

                    $.ajax({
                      url: `https://wasd.tv/api/v2/profiles/current`,
                      success: (out) => {
                        if (typeof out.result?.user_login !== "undefined")
                          if (!(data.user_login.toLowerCase().trim() == out.result.user_profile.user_login?.toLowerCase().trim())) {
                            let buttonfollow = document.querySelector('div.viewer-card > div.ovg.buttonsdiv > wasd-channel-favorite-btn > wasd-button > button')
                            let wasdbuttonfollow = document.querySelector('div.viewer-card > div.ovg.buttonsdiv > wasd-channel-favorite-btn > wasd-button')
                            let ifollow = document.querySelector('div.viewer-card > div.ovg.buttonsdiv > wasd-channel-favorite-btn > wasd-button > button > i')
                            let tooltipfollow = document.querySelector('wasd-channel-favorite-btn#selector-channel-favorite-btn-ovg > wasd-button > ovg-tooltip > div.tooltip > div.tooltip-content')
                            if (buttonfollow && wasdbuttonfollow) {
                              buttonfollow.classList.remove('disabled');
                              if (databroadcasts.result?.channel?.is_user_follower) {
                                wasdbuttonfollow.classList.add('stroked-btn'); // add class to unfollow
                                wasdbuttonfollow.classList.remove('flat-btn');

                                ifollow.classList.remove('wasd-icons-like');
                                ifollow.classList.add('wasd-icons-favorite');

                                tooltipfollow.textContent = ' В избранном ';
                              } else {
                                wasdbuttonfollow.classList.add('flat-btn'); // add class to follow
                                wasdbuttonfollow.classList.remove('stroked-btn');

                                ifollow.classList.remove('wasd-icons-favorite');
                                ifollow.classList.add('wasd-icons-like');

                                tooltipfollow.textContent = ' Добавить в избранное ';
                              }
                            }
                          }

                      }
                    });
                  }

                  let buttonfollow = document.querySelector('div.viewer-card > div.ovg.buttonsdiv > wasd-channel-favorite-btn > wasd-button > button')
                  let wasdbuttonfollow = document.querySelector('div.viewer-card > div.ovg.buttonsdiv > wasd-channel-favorite-btn > wasd-button')
                  let ifollow = document.querySelector('div.viewer-card > div.ovg.buttonsdiv > wasd-channel-favorite-btn > wasd-button > button > i')
                  let tooltipfollow = document.querySelector('wasd-channel-favorite-btn#selector-channel-favorite-btn-ovg > wasd-button > ovg-tooltip > div.tooltip > div.tooltip-content')

                  buttonfollow?.addEventListener('click', () => {

                    if (!buttonfollow.classList.contains('disabled')) {

                      console.log(out.result, data)
                      $.ajax({
                        url: `https://wasd.tv/api/v2/broadcasts/public?channel_id=${out.result.channel.channel_id}`,
                        success: (out) => {
                          if (!out.result.channel.is_user_follower) {
                            // follow

                            $.ajax({
                              method: 'PUT',
                              url: `https://wasd.tv/api/channels/${out.result.channel.channel_id}/followers/`,
                              success: (out) => {
                                if (buttonfollow && wasdbuttonfollow) {
                                  wasdbuttonfollow.classList.add('stroked-btn'); // add class to unfollow
                                  wasdbuttonfollow.classList.remove('flat-btn');
                                  buttonfollow.classList.remove('disabled');

                                  ifollow.classList.remove('wasd-icons-like');

                                  ifollow.classList.add('wasd-icons-favorite');
                                  tooltipfollow.textContent = ' В избранном ';
                                }
                              }
                            });

                          } else {
                            // un follow

                            $.ajax({
                              method: 'DELETE',
                              url: `https://wasd.tv/api/channels/${out.result.channel.channel_id}/followers/`,
                              success: (out) => {
                                if (buttonfollow && wasdbuttonfollow) {
                                  wasdbuttonfollow.classList.add('flat-btn'); // add class to follow
                                  wasdbuttonfollow.classList.remove('stroked-btn');
                                  buttonfollow.classList.remove('disabled');

                                  ifollow.classList.remove('wasd-icons-favorite');
                                  ifollow.classList.add('wasd-icons-like');

                                  tooltipfollow.textContent = ' Добавить в избранное ';
                                }
                              }
                            });

                          }
                        }
                      });

                    }
                  });
                }
              });

              $.ajax({
                url: `https://wasd.tv/api/channels/${out.result.user_profile.channel_id}/links`,
                success: (out) => {
                  if (out.result.length != 0) {
                    linkIndex = -1;
                    itemLinks = document.querySelector('div.item__links-ovg');
                    if (out.result.length > 6) {
                      itemLinks.insertAdjacentHTML("beforeend", `<a class="link"><div class="plus">+ ${out.result.length - 5}</div></a>`);
                      for (let data of out.result) {
                        linkIndex++;
                        if (itemLinks && linkIndex <= 4) {
                          itemLinks.insertAdjacentHTML("beforeend", `<a target="_blank" class="link" href="${data.channel_link_value}"><img style="pointer-events: none;" src="${data.channel_link_type.channel_link_type_icon.large}"></a>`);
                        }
                      }
                    } else {
                      for (let data of out.result) {
                        itemLinks?.insertAdjacentHTML("beforeend", `<a target="_blank" class="link" href="${data.channel_link_value}"><img style="pointer-events: none;" src="${data.channel_link_type.channel_link_type_icon.large}"></a>`);
                      }
                    }
                  }
                }
              });

            }
          }
        });

        $.ajax({
          url: `https://wasd.tv/api/sticker-service/stickerpacks?streamer_id=${data.user_id}&limit=12&offset=0`,
          success: (out) => {
            if (viewerCard) {
              if (out.result) {
                // paid_title-ovg display
                if (out.result.length >= 1 && out.result[0].stickers.length != 0) {
                  viewerCard.querySelector('div.paid_title-ovg').style.display = 'block';
                  for (let value of out.result[0].stickers) {
                    stiscersdiv = document.querySelector('div.paidsubs-popup__stickers');
                    if (stiscersdiv) {
                      stiscersdiv.insertAdjacentHTML("beforeend", `<div class="sticker-card"><div class="paidsubs-popup__stickers-item" style="background-image: url(${value.sticker_image.large});"></div><ovg-tooltip style="margin-right: 8px;"><div class="tooltip tooltip_position-bottom tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> ${value.sticker_name} </div></div></ovg-tooltip></div>`);
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
          }
        });

        getChannel = (element, index, array) => {
          return element.user_id == data.user_id;
        }
        $.ajax({
          url: `https://wasd.tv/api/profiles/current/followed-channels?limit=1000&offset=0`,
          success: (out) => {
            var date = new Date(out.result.find(getChannel)?.channel_follower.updated_at)
            if (date != "Invalid Date") {
              viewerCard.querySelector('a.tw-c-text-overlay.tw-mg-l-05.tw-mg-t-auto.gameurl').innerHTML = `Отслеживаете с ${date.toLocaleString('ru').split(',')[0]}`
              viewerCard.querySelector('a.tw-c-text-overlay.tw-mg-l-05.tw-mg-t-auto.gameurl').title = `Отслеживаете с ${date.toLocaleString('ru')}`;
              viewerCard.querySelector('.wasd-icons-games.ovg').style.display = 'none'
            }
          }
        })

        $.ajax({
          url: HelperWASD.getStreamBroadcastsUrl(),
          success: (out) => {
            if (out.result.media_container && out.result.media_container.media_container_streams[0]) {
              $.ajax({
                url: `https://wasd.tv/api/chat/streams/${out.result.media_container.media_container_streams[0].stream_id}/messages?limit=500&offset=0`,
                success: (out) => {
                  var coll = document.querySelector('button.paid_title-ovg.last_messages')
                  coll?.addEventListener("click", () => {
                    document.querySelector('.user_last_messages-ovg').classList.toggle("active");
                    var content = coll.nextElementSibling;
                    if (content.style.maxHeight) {
                      content.style.maxHeight = null;
                    } else {
                      if (document.querySelector('.theatre-mode-mobile') && settings.wasd.chatMobilePlayer) {

                        if (settings.wasd.hidePanelMobile) {
                          document.querySelector('.block-ovg').style.maxHeight = document.querySelector('.chat-container__wrap').clientHeight - (62 + document.querySelector('.ovg-viewer-card').clientHeight) + 'px'
                        } else {
                          document.querySelector('.block-ovg').style.maxHeight = document.querySelector('.chat-container__wrap').clientHeight - (64 + document.querySelector('.ovg-viewer-card').clientHeight) + 'px'
                        }

                      } else {
                        content.style.maxHeight = "190px";
                      }
                    }
                  });

                  let messagesDiv = document.querySelector('.block__messages-ovg');
                  if (messagesDiv) {
                    let divMessageDiv = document.querySelector('.block-ovg');
                    for (let message of out.result) {
                      if (message.info.user_id == data.user_id) {

                        let role = 'user'

                        let isSub = false
                        if (Array.isArray(message.info.other_roles)) {
                          for (let role of message.info.other_roles) {
                            if (!isSub) isSub = (role == 'CHANNEL_SUBSCRIBER')
                          }
                        } else {
                          if (!isSub) isSub = (message.info.other_roles == 'CHANNEL_SUBSCRIBER')
                        }
                        if (isSub) role += ' sub'

                        let isOwner = false
                        if (Array.isArray(message.info.user_channel_role)) {
                          for (let role of message.info.user_channel_role) {
                            if (!isOwner) isOwner = (role == 'CHANNEL_OWNER')
                          }
                        } else {
                          if (!isOwner) isOwner = (message.info.user_channel_role == 'CHANNEL_OWNER')
                        }
                        if (isOwner) role += ' owner'

                        let isModer = false
                        if (Array.isArray(message.info.user_channel_role)) {
                          for (let role of message.info.user_channel_role) {
                            if (!isModer) isModer = (role == 'CHANNEL_MODERATOR')
                          }
                        } else {
                          if (!isModer) isModer = (message.info.user_channel_role == 'CHANNEL_MODERATOR')
                        }
                        if (isModer) role += ' moderator'

                        let isAdmin = false
                        if (Array.isArray(message.info.user_channel_role)) {
                          for (let role of message.info.user_channel_role) {
                            if (!isAdmin) isAdmin = (role == 'WASD_ADMIN')
                          }
                        } else {
                          if (!isAdmin) isAdmin = (message.info.user_channel_role == 'WASD_ADMIN')
                        }
                        if (isAdmin) role += ' admin'

                        let isPromoCodeWin = false
                        if (Array.isArray(message.info.other_roles)) {
                          for (let role of message.info.other_roles) {
                            if (!isPromoCodeWin) isPromoCodeWin = (role == 'PROMO_CODE_WINNER')
                          }
                        } else {
                          if (!isPromoCodeWin) isPromoCodeWin = (message.info.other_roles == 'PROMO_CODE_WINNER')
                        }
                        if (isPromoCodeWin) role += ' promowin'

                        messagesDiv.appendChild(HelperWASD.createMessage(role, message.info.user_login.trim(), HelperWASD.userColors[message.info.user_id % (HelperWASD.userColors.length - 1)], message?.info?.message, message?.info?.sticker?.sticker_image?.medium, new Date(message.date_time)))

                        divMessageDiv.scrollTop = divMessageDiv.scrollHeight;
                      }
                    }
                    if (document.querySelector('.block__messages-ovg').childNodes.length == 0) {
                      if (document.querySelector('.user_last_messages-ovg')) document.querySelector('.user_last_messages-ovg').style.display = 'none';

                    }
                  }
                },
              })

              if (out.result.media_container.user_id != data.user_id) $.ajax({
                url: `https://wasd.tv/api/chat/streamers/${out.result.media_container.user_id}/ban?user_id=${data.user_id}`,
                success: (out) => {
                  if (HelperWASD.isModerator) {
                    card.querySelector('.user_last_messages-ovg').insertAdjacentHTML("beforebegin", `
                      <div class="moderator disabled">
                        <div class="go_ban">
                          <wasd-button class="flat-btn ovg" wasdtooltip="" style="margin-left: 10px;">
                            <button class="basic ovg small ban" type="button">
                              <i class="wasd-icons-ban"></i>
                            </button>
                          </wasd-button>
                          <wasd-button class="flat-btn ovg" wasdtooltip="" style="margin-left: 5px;">
                            <button class="basic ovg small timeout1m" type="button">
                              <i class="wasd-icons-sound-off"></i>
                              <span> 1 мин </span>
                            </button>
                          </wasd-button>
                          <wasd-button class="flat-btn ovg" wasdtooltip="" style="margin-left: 5px;">
                            <button class="basic ovg small timeout10m" type="button">
                              <i class="wasd-icons-sound-off"></i>
                              <span> 10 мин </span>
                            </button>
                          </wasd-button>
                          <wasd-button class="flat-btn ovg" wasdtooltip="" style="margin-left: 5px;">
                            <button class="basic ovg small timeout1h" type="button">
                              <i class="wasd-icons-sound-off"></i>
                              <span> 1 час </span>
                            </button>
                          </wasd-button>
                        </div>
                        <div class="go_unban">
                          <wasd-button class="flat-btn ovg" wasdtooltip="" style="margin-left: 10px;">
                            <button class="basic ovg small unban" type="button">
                              <i class="icon wasd-icons-unban"></i>
                            </button>
                          </wasd-button>
                        </div>
                      </div>
                      <div class="tw-c-background-alt-2 tw-pd-t-05 stickers">
                        <div class="paid_title-ovg" style="display:none;"> Стикеры канала </div><div class="paidsubs-popup__stickers"></div>
                      </div>`)

                    card.querySelector('.ban').addEventListener('click', () => {
                      fetch(HelperWASD.getStreamBroadcastsUrl())
                        .then(res => res.json())
                        .then((out) => {
                          let response = {
                            method: 'PUT',
                            body: `{"user_id":${data.user_id},"stream_id":${out.result.media_container.media_container_streams[0].stream_id}}`,
                            headers: {
                              'Content-Type': 'application/json'
                            },
                          }
                          card.querySelector('.moderator').classList.add('ban')
                          fetch(`https://wasd.tv/api/channels/${out.result.channel.channel_id}/banned-users`, response)
                            .then(res => res.json())
                            .then((out) => {
                              card.querySelector('.moderator').classList.remove('ban')
                              if (out.error.code == 'STREAMER_BAN_ALREADY_EXISTS') {
                                HelperWASD.showChatMessage(`Пользователь @${data.user_login} уже заблокирован`);
                              } else if (out.error.code == 'USER_BAD_BAN_PERMISSIONS') {
                                HelperWASD.showChatMessage(`Вы не можете этого сделать`);
                              }
                            })
                        })
                    })

                    card.querySelector('.unban').addEventListener('click', () => {
                      fetch(HelperWASD.getStreamBroadcastsUrl())
                        .then(res => res.json())
                        .then((out) => {
                          let response = {
                            method: 'DELETE',
                          }
                          card.querySelector('.moderator').classList.remove('ban')
                          fetch(`https://wasd.tv/api/channels/${out.result.channel.channel_id}/banned-users/${data.user_id}`, response)
                            .then(res => res.json())
                            .then((out) => {
                              card.querySelector('.moderator').classList.remove('ban')
                              if (out.error.code == 'STREAMER_BAN_NOT_FOUND') {
                                HelperWASD.showChatMessage(`Пользователь @${data.user_login} не забанен`)
                              } else if (out.error.code == 'USER_BAD_BAN_PERMISSIONS') {
                                HelperWASD.showChatMessage(`Вы не можете этого сделать`);
                              }
                            })
                        })
                    })

                    card.querySelector('.timeout1m').addEventListener('click', () => {
                      fetch(HelperWASD.getStreamBroadcastsUrl())
                        .then(res => res.json())
                        .then((out) => {
                          let response = {
                            method: 'PUT',
                            body: `{"user_id":${data.user_id},"stream_id":${out.result.media_container.media_container_streams[0].stream_id}, "keep_messages": true, "duration": 1}`,
                            headers: {
                              'Content-Type': 'application/json'
                            },
                          }
                          card.querySelector('.moderator').classList.add('ban')
                          fetch(`https://wasd.tv/api/channels/${out.result.channel.channel_id}/banned-users`, response)
                            .then(res => res.json())
                            .then((out) => {
                              card.querySelector('.moderator').classList.remove('ban')
                              if (out.error.code == 'STREAMER_BAN_ALREADY_EXISTS') {
                                HelperWASD.showChatMessage(`Пользователь @${data.user_login} уже заблокирован`);
                              } else if (out.error.code == 'USER_BAD_BAN_PERMISSIONS') {
                                HelperWASD.showChatMessage(`Вы не можете этого сделать`);
                              }
                            })
                        })
                    })

                    card.querySelector('.timeout10m').addEventListener('click', () => {
                      fetch(HelperWASD.getStreamBroadcastsUrl())
                        .then(res => res.json())
                        .then((out) => {
                          let response = {
                            method: 'PUT',
                            body: `{"user_id":${data.user_id},"stream_id":${out.result.media_container.media_container_streams[0].stream_id}, "keep_messages": true, "duration": 10}`,
                            headers: {
                              'Content-Type': 'application/json'
                            },
                          }
                          card.querySelector('.moderator').classList.add('ban')
                          fetch(`https://wasd.tv/api/channels/${out.result.channel.channel_id}/banned-users`, response)
                            .then(res => res.json())
                            .then((out) => {
                              card.querySelector('.moderator').classList.remove('ban')
                              if (out.error.code == 'STREAMER_BAN_ALREADY_EXISTS') {
                                HelperWASD.showChatMessage(`Пользователь @${data.user_login} уже заблокирован`);
                              } else if (out.error.code == 'USER_BAD_BAN_PERMISSIONS') {
                                HelperWASD.showChatMessage(`Вы не можете этого сделать`);
                              }
                            })
                        })
                    })

                    card.querySelector('.timeout1h').addEventListener('click', () => {
                      fetch(HelperWASD.getStreamBroadcastsUrl())
                        .then(res => res.json())
                        .then((out) => {
                          let response = {
                            method: 'PUT',
                            body: `{"user_id":${data.user_id},"stream_id":${out.result.media_container.media_container_streams[0].stream_id}, "keep_messages": true, "duration": 60}`,
                            headers: {
                              'Content-Type': 'application/json'
                            },
                          }
                          card.querySelector('.moderator').classList.add('ban')
                          fetch(`https://wasd.tv/api/channels/${out.result.channel.channel_id}/banned-users`, response)
                            .then(res => res.json())
                            .then((out) => {
                              card.querySelector('.moderator').classList.remove('ban')
                              if (out.error.code == 'STREAMER_BAN_ALREADY_EXISTS') {
                                HelperWASD.showChatMessage(`Пользователь @${data.user_login} уже заблокирован`);
                              } else if (out.error.code == 'USER_BAD_BAN_PERMISSIONS') {
                                HelperWASD.showChatMessage(`Вы не можете этого сделать`);
                              }
                            })
                        })
                    })
                  }

                  card.querySelector('.moderator')?.classList?.remove('disabled')
                  if (out.result.length != 0) {
                    card.querySelector('.moderator')?.classList?.add('ban')
                  }
                }
              });

            } else {
              if (document.querySelector('.user_last_messages-ovg')) document.querySelector('.user_last_messages-ovg').style.display = 'none';
            }
          },
          error: (out) => {
            if (document.querySelector('.user_last_messages-ovg')) document.querySelector('.user_last_messages-ovg').style.display = 'none';
          }
        });
      } else {
        HelperWASD.showChatMessage('не удалось получить информацию о пользователе, попробуйте обновить чат');
        card.querySelector('div[data-a-target="viewer-card-close-button"] > div.viewer-card-drag-cancel > button')?.click();
      }
    }

    if (ws_user) {
      UserCard({
        user_id: ws_user.getAttribute('user_id'),
        user_login: ws_user.getAttribute('user_login')
      })
      
      let role = ws_user.getAttribute('role')
      let badge = HelperWASD.badges[ws_user.getAttribute('user_login')]
      let htmlroles = viewerCard.querySelector('.roles .popup__roles')

      if (badge && badge.user_role == 'DEV') {
        htmlroles.insertAdjacentHTML("beforeend", `<div class="tooltip-hover" style="display: inline-grid;"> <div ovg="" class="info__text__status-dev" style="height: 20px; width: 23px; background-color: ${HelperWASD.userColors[ws_user.getAttribute('user_id') % (HelperWASD.userColors.length - 1)]};"><i badge="" class="icon wasd-icons-dev dev"></i></div> <ovg-tooltip style="position: relative;"><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;margin: 0 0px 26px -2px;"><div class="tooltip-content tooltip-content_left"> BetterWASD Разработчик </div></div></ovg-tooltip></div>`);
      }
      if (role.indexOf('sub') != -1) {
        htmlroles.insertAdjacentHTML("beforeend", `<div class="tooltip-hover" style="display: inline-grid;"> <div ovg="" class="info__text__status-dev" style="height: 20px; width: 23px; background-color: ${HelperWASD.userColors[ws_user.getAttribute('user_id') % (HelperWASD.userColors.length - 1)]};"><i badge="" class="icon wasd-icons-star">   </i></div> <ovg-tooltip style="position: relative;"><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;margin: 0 0px 26px -2px;"><div class="tooltip-content tooltip-content_left"> Подписчик </div></div></ovg-tooltip></div>`);
      }
      if (role.indexOf('owner') != -1) {
        htmlroles.insertAdjacentHTML("beforeend", `<div class="tooltip-hover" style="display: inline-grid;"> <div ovg="" class="info__text__status-dev" style="height: 20px; width: 23px; background-color: var(--wasd-color-event3);">   <i badge="" class="icon wasd-icons-owner">      </i></div> <ovg-tooltip style="position: relative;"><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;margin: 0 0px 26px -2px;"><div class="tooltip-content tooltip-content_left"> Владелец канала </div></div></ovg-tooltip></div>`);
      }
      if (role.indexOf('moderator') != -1) {
        htmlroles.insertAdjacentHTML("beforeend", `<div class="tooltip-hover" style="display: inline-grid;"> <div ovg="" class="info__text__status-dev" style="height: 20px; width: 23px; background-color: var(--wasd-color-gray2);">    <i badge="" class="icon wasd-icons-moderator">  </i></div> <ovg-tooltip style="position: relative;"><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;margin: 0 0px 26px -2px;"><div class="tooltip-content tooltip-content_left"> Модератор </div></div></ovg-tooltip></div>`);
      }
      if (role.indexOf('admin') != -1) {
        htmlroles.insertAdjacentHTML("beforeend", `<div class="tooltip-hover" style="display: inline-grid;"> <div ovg="" class="info__text__status-dev" style="height: 20px; width: 23px; background-color: var(--wasd-color-corp-blue);"><i badge="" class="icon wasd-icons-dev">        </i></div> <ovg-tooltip style="position: relative;"><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;margin: 0 0px 26px -2px;"><div class="tooltip-content tooltip-content_left"> Администратор </div></div></ovg-tooltip></div>`);
      }
      if (role.indexOf('promowin') != -1) {
        htmlroles.insertAdjacentHTML("beforeend", `<div class="tooltip-hover" style="display: inline-grid;"> <div ovg="" class="message__promocodes"></div> <ovg-tooltip style="position: relative;"><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;margin: 0 0px 26px -2px;"><div class="tooltip-content tooltip-content_left"> Promo Code Winner </div></div></ovg-tooltip></div>`);
      }

    } else {
      $.ajax({
        url: `https://wasd.tv/api/search/profiles?limit=999&offset=0&search_phrase=${channel_name.trim()}`,
        success: (out) => {
          if (out.result) {
            for (let value of out.result?.rows) {
              if (value.user_login?.trim() == channel_name?.trim()) {
                data = value;
                break;
              }
            }
            if (!data) {
              for (let value of out.result?.rows) {
                if (value.user_login?.trim()?.toLowerCase() == channel_name?.trim()?.toLowerCase()) {
                  data = value;
                  break;
                }
              }
            }
          }

          UserCard(data)
        },
        error: (out) => {
          HelperWASD.showChatMessage('не удалось получить информацию о пользователе, попробуйте обновить чат');
          card.querySelector('div[data-a-target="viewer-card-close-button"] > div.viewer-card-drag-cancel > button')?.click();
        }
      });
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
  addUsernameToTextarea(username) {
    let textarea = document.querySelector('.footer > div >textarea');
    if (settings.wasd.onClickUser.toString() === '1') {
      if (isPressedControl) {
        if (textarea) {
          textarea.value += `@${username} `;
          textarea.dispatchEvent(new Event('input'));
          textarea.focus()
        }
        return true;
      } else {
        return false;
      }
    } else if (settings.wasd.onClickUser.toString() === '2') {
      if (isPressedShift) {
        if (textarea) {
          textarea.value += `@${username} `;
          textarea.dispatchEvent(new Event('input'));
          textarea.focus()
        }
        return true;
      } else {
        return false;
      }
    } else if (settings.wasd.onClickUser.toString() === '3') {
      if (isPressedAlt) {
        if (textarea) {
          textarea.value += `@${username} `;
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
  highlightMessages(username) {
    for (var i of document.querySelectorAll('.block__messages__item')) {
      if (i.querySelector('.info__text__status__name'))
        if (i.querySelector('.info__text__status__name').getAttribute('usernamelc'))
          if (i.querySelector('.info__text__status__name').getAttribute('usernamelc') == username.toLowerCase()) {
            i.querySelector('wasd-chat-message > .message').classList.add('openCardColor')
          }
    }
  },
  highlightMessagesRemove() {
    for (var i of document.querySelectorAll('.openCardColor')) {
      i.classList.remove('openCardColor')
    }
  },
  async getIsModerator() {
    var isMod = false;
    return new Promise((resolve, reject) => {
      if (document.querySelector('#selector-header-profile .header__user-profile-name')) {

        $.ajax({
          url: HelperWASD.getStreamBroadcastsUrl(),
          success: (out) => {
            if (typeof out.result !== 'undefined')
              if (typeof out.result.channel !== 'undefined') {

                $.ajax({
                  url: `https://wasd.tv/api/chat/streamers/${out.result.channel.user_id}/moderators`,
                  success: (out) => {
                    for (var mod of out.result) {
                      if (mod.user_login.trim() == document.querySelector('#selector-header-profile .header__user-profile-name').textContent.trim()) {
                        isMod = true
                        resolve(isMod)
                      }
                    }
                    if (!isMod) resolve(isMod)
                  }
                });

              }
          },
          error: () => {
            resolve(false)
          }
        });

      } else {
        resolve(false)
      }
    });
  },
  loadBadges() {
    $.ajax({
      url: `https://raw.githubusercontent.com/ovgamesdev/BetterWASD.data/main/badges.json`,
      success: (out) => {
        HelperWASD.badges = JSON.parse(out)
      },
      error: () => {
        HelperWASD.badges = {}
      }
    });
  },
  scrollChatMessage(message, scrollend = 200, scrollstart = -1) {
    messagess = document.querySelector('.block')
    if (messagess && message) {
      scrollPosition = messagess.scrollTop + messagess.offsetHeight
      messagePosition = message.offsetTop + message.offsetHeight

      if ((messagePosition - scrollPosition) > 0 && (messagePosition - scrollPosition) < 150) {
        document.querySelector('.block').scrollTop = document.querySelector('.block__messages').scrollHeight
      }
    }
  },
  removeMessagesOfUsername(username) {
    for (let message of document.querySelectorAll('.block__messages__item')) {
      if (message.getAttribute('username') == username.trim().split('@').join('')) {
        message.remove()
      } else if (settings.wasd.removeMentionBL) {
        for (let msg of message.querySelectorAll(`.chat-message-mention[username="@${username.trim().split('@').join('').toLowerCase()}"]`)) {
          msg.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
        }
      }
    }
  },
  parseCmd(message, isDataArray = false, prefix = '!') {
    let cmd = message.slice(prefix.length, message.indexOf(" ")).trim().toLowerCase()
    if (!(message.indexOf(" ") != -1)) cmd = message.slice(prefix.length, message.length).trim().toLowerCase()
    let data = message.slice(message.indexOf(" "), message.length).trim()
    if (isDataArray) data = data.split(' ')
    if (data == data.slice(data.length - 1)) {
      data = null
    }
    return {
      cmd: cmd,
      data: data
    }
  },
  getStreamBroadcastsUrl() {
    if (document.querySelector('.settings-page__title-btns wasd-dropdown .dropdown-title__text') && document.querySelector('.settings-page__title-btns wasd-dropdown .dropdown-title__text').textContent == " Доступно по ссылке " && document.querySelector('.stream-private-link__link-input input')) {
      return 'https://wasd.tv/api/v2/broadcasts/closed/' + new URL(document.querySelector('.stream-private-link__link-input input').value).pathname.split('/')[2]
    } else if (document.querySelector('.settings-page__title-btns wasd-dropdown .dropdown-title__text') && document.querySelector('.settings-page__title-btns wasd-dropdown .dropdown-title__text').textContent == " Доступно для всех " && document.querySelector('#selector-sp-stream-links input[placeholder="Чат"]')) {
      return 'https://wasd.tv/api/v2/broadcasts/public?channel_name=' + new URL(document.querySelector('#selector-sp-stream-links input[placeholder="Чат"]').value).searchParams.get('channel_name')
    } else if (new URL(document.URL).pathname.split('/')[1] == 'private-stream') {
      return 'https://wasd.tv/api/v2/broadcasts/closed/' + new URL(document.URL).pathname.split('/')[2]
    } else {
      return 'https://wasd.tv/api/v2/broadcasts/public?channel_name=' + HelperWASD.getChannelName()
    }
  },
  getChannelName() {
    if (document.querySelector('#selector-sp-stream-links .wasd-input input[placeholder="Чат"]'))return new URL(document.querySelector('#selector-sp-stream-links .wasd-input input[placeholder="Чат"]').value.trim().toLowerCase()).searchParams.get('channel_name')
    if (document.querySelector('wasd-user-plays > .user-plays > a[href^="/channel"]')) return document.querySelector('wasd-user-plays > .user-plays > a[href^="/channel"]').textContent.trim().toLowerCase()
    if (new URL(document.URL).pathname.split('/')[1] == 'stream-settings') {
      if (document.querySelector('wasd-stream-links input[placeholder="Трансляция"]')) return new URL(document.querySelector('wasd-stream-links input[placeholder="Трансляция"]').value).pathname.split('/')[1].toLowerCase()
    } else {
      new Error(`URL ${document.URL}`)
      return '0';
    }
  },
  addUserToBL(user) {
    let username = user.trim().split('@').join('')
    if (!settings.list.blockUserList[username]) {
      HelperWASD.showChatMessage(`Пользователь ${username} добавлен в ЧС`, 'success')
      settings.list.blockUserList[username] = new Date();
      HelperWASD.addUserToBlackList(username)
      HelperSettings.save([document.querySelector('.optionField')]);
    } else {
      HelperWASD.showChatMessage('Пользователь уже в ЧС')
    }
    blacklistAddUser.value = ''
  },
  addUserToHL(user, color = '', register = true) {
    let username = user.trim().split('@').join('')
    if (!settings.list.highlightUserList[username]) {
      HelperWASD.showChatMessage(`Пользователь ${username} добавлен в выделение`, 'success')
      settings.list.highlightUserList[username] = {}
      settings.list.highlightUserList[username]['username'] = username
      settings.list.highlightUserList[username]['date'] = new Date()
      settings.list.highlightUserList[username]['color'] = highlightAddUserColor.value
      settings.list.highlightUserList[username]['register'] = register
      HelperWASD.addUserToHighLight(username)
      HelperSettings.save([document.querySelector('.optionField')]);
    } else {
      HelperWASD.showChatMessage('Пользователь уже в ЧС')
    }
    highlightAddUser.value = ''
  },
  addTermToBL(t) {
    let term = t.trim()
    if (!settings.list.blockTermList[term]) {
      HelperWASD.showChatMessage(`Термин ${term} добавлен в ЧС`, 'success')
      settings.list.blockTermList[term] = new Date();
      HelperWASD.addTermToBlackList(term)
      HelperSettings.save([document.querySelector('.optionField')]);
    } else {
      HelperWASD.showChatMessage('Пользователь уже в ЧС')
    }
    blacklistAddTerm.value = ''
  },
  addTermToHL(t, color = '', register = true, whole = true) {
    let term = t.trim()
    if (!settings.list.highlightTermList[term]) {
      HelperWASD.showChatMessage(`Термин ${term} добавлен в выделение`, 'success')
      settings.list.highlightTermList[term] = {}
      settings.list.highlightTermList[term]['term'] = term
      settings.list.highlightTermList[term]['date'] = new Date()
      settings.list.highlightTermList[term]['color'] = highlightAddTermColor.value
      settings.list.highlightTermList[term]['register'] = register
      settings.list.highlightTermList[term]['whole'] = whole
      HelperWASD.addTermToHighLight(term)
      HelperSettings.save([document.querySelector('.optionField')]);
    } else {
      HelperWASD.showChatMessage('Пользователь уже в ЧС')
    }
    highlightAddTerm.value = ''
  },
  obs_addUserToBL(user) {
    let username = user.trim().split('@').join('')
    if (!settings.obschat.list.blockUserList[username]) {
      HelperWASD.showChatMessage(`Пользователь ${username} добавлен в obs ЧС`, 'success')
      settings.obschat.list.blockUserList[username] = new Date();
      HelperWASD.obs_addUserToBlackList(username)
      HelperSettings.save([document.querySelector('.optionField')]);
    } else {
      HelperWASD.showChatMessage('Пользователь уже в obs ЧС')
    }
    blacklistAddUser.value = ''
  },
  obs_addUserToHL(user, color = '', register = true) {
    let username = user.trim().split('@').join('')
    if (!settings.obschat.list.highlightUserList[username]) {
      HelperWASD.showChatMessage(`Пользователь ${username} добавлен в выделение obs`, 'success')
      settings.obschat.list.highlightUserList[username] = {}
      settings.obschat.list.highlightUserList[username]['username'] = username
      settings.obschat.list.highlightUserList[username]['date'] = new Date()
      settings.obschat.list.highlightUserList[username]['color'] = obs_highlightAddUserColor.value
      settings.obschat.list.highlightUserList[username]['register'] = register
      HelperWASD.obs_addUserToHighLight(username)
      HelperSettings.save([document.querySelector('.optionField')]);
    } else {
      HelperWASD.showChatMessage('Пользователь уже в obs ЧС')
    }
    highlightAddUser.value = ''
  },
  obs_addTermToBL(t) {
    let term = t.trim()
    if (!settings.obschat.list.blockTermList[term]) {
      HelperWASD.showChatMessage(`Термин ${term} добавлен в obs ЧС`, 'success')
      settings.obschat.list.blockTermList[term] = new Date();
      HelperWASD.obs_addTermToBlackList(term)
      HelperSettings.save([document.querySelector('.optionField')]);
    } else {
      HelperWASD.showChatMessage('Пользователь уже в obs ЧС')
    }
    blacklistAddTerm.value = ''
  },
  obs_addTermToHL(t, color = '', register = true, whole = true) {
    let term = t.trim()
    if (!settings.obschat.list.highlightTermList[term]) {
      HelperWASD.showChatMessage(`Термин ${term} добавлен в выделение obs`, 'success')
      settings.obschat.list.highlightTermList[term] = {}
      settings.obschat.list.highlightTermList[term]['term'] = term
      settings.obschat.list.highlightTermList[term]['date'] = new Date()
      settings.obschat.list.highlightTermList[term]['color'] = obs_highlightAddTermColor.value
      settings.obschat.list.highlightTermList[term]['register'] = register
      settings.obschat.list.highlightTermList[term]['whole'] = whole
      HelperWASD.obs_addTermToHighLight(term)
      HelperSettings.save([document.querySelector('.optionField')]);
    } else {
      HelperWASD.showChatMessage('Пользователь уже в obs ЧС')
    }
    highlightAddTerm.value = ''
  },
  addMessageToCpenCard(role, username, color, message, sticker) {
    var block__messages = document.querySelector('.chat-room__viewer-card .block__messages-ovg')
    if (block__messages) {
      block__messages.prepend(HelperWASD.createMessage(role, username, color, message, sticker))
      document.querySelector('.chat-room__viewer-card .user_last_messages-ovg').style.display = 'block'
    }
  },
  usercolorapi(element) {
    // ищем цвет по api если по ласт сообщениям не нашли
    if (element.style.color == '' && settings.wasd.colorAtTheMention) {
      color = "rgba(var(--wasd-color-switch--rgb),.88);";
      $.ajax({
        url: `https://wasd.tv/api/search/profiles?limit=999&offset=0&search_phrase=${element.getAttribute('username').split('@').join('').toLowerCase().trim()}`,
        success: (out) => {
          let data;
          if (out.result) {
            for (let value of out.result.rows) {
              if (value?.user_login?.toLowerCase().trim() == element.getAttribute('username').split('@').join('').toLowerCase().trim()) {
                color = HelperWASD.userColors[value.user_id % (HelperWASD.userColors.length - 1)];
                break;
              }
            }
          }
          element.style.color = color;
        }
      });
    }
  },
  usercolor(channel_name) {
    // ищем цвет по ласт сообщениям тк у api есть задержка
    let color = '';
    let ch_name = channel_name.trim().toLowerCase().split('@').join('')
    if (settings.wasd.colorAtTheMention) {

      let u = document.querySelector(`.info__text__status__name[usernamelc="${ch_name}"]`)
      if (u?.style?.color) color = u.style.color;
      if (color == '') {
        let m = document.querySelector(`.chat-message-mention[usernamelc="@${ch_name}"]`)
        if (m?.style?.color) color = m.style.color;
      }
      if (color == '') {
        let ws = document.querySelector(`.WebSocket_history .user_ws[user_loginlc="${ch_name}"]`)
        if (ws) color = HelperWASD.userColors[ws.getAttribute('user_id') % (HelperWASD.userColors.length - 1)]
      }

    } else {
      color = 'inherit'
    }
    return color;
  },
  createPinMessages() {
    if (!settings.wasd.pinMessage) document.querySelector('wasd-chat .body-container').insertAdjacentHTML("afterbegin", `<pin-chat-messages-ovg style="background: var(--wasd-color-prime);"></pin-chat-messages-ovg>`)
  },
  addPinMessage(node) {
    node.getAttribute('role')
    node.getAttribute('username')
    node.getAttribute('message')
    node.getAttribute('sticker')

    ovg.log(node)
    document.querySelector('pin-chat-messages-ovg').append()
  },
  createMessage(role, username, color, message, sticker, date_time = new Date()) {

    let isOwner = role.indexOf('owner')               != -1 && settings.wasd.showOwnerBadge
    let isModer = role.indexOf('moderator')           != -1 && settings.wasd.showModeratorBadge
    let isSub = role.indexOf('sub')                   != -1 && settings.wasd.showSubBadge
    let isAdmin = role.indexOf('admin')               != -1 && settings.wasd.showAdminBadge
    let isPromoCodeWin = role.indexOf('promowin')     != -1 && settings.wasd.showPromoCodeWin
    let blockmessage = message;
    let bl = ' '

    if (message == undefined) blockmessage = ''
    if (blockmessage != '') {
      if (settings.wasd.tv7Emotes) blockmessage = HelperTV7.replaceText(blockmessage);
      if (settings.wasd.bttvEmotes) blockmessage = HelperBTTV.replaceText(blockmessage);
      if (settings.wasd.ffzEmotes) blockmessage = HelperFFZ.replaceText(blockmessage);

      // fix link
      if (settings.wasd.fixedLinks) {
        blockmessage = HelperWASD.textToURL(blockmessage)
      }

      if (settings.wasd.fixCharactersBreakingChat) {
        blockmessage = stripCombiningMarks(blockmessage)
      }
    }

    let newusername = settings.wasd.userNameEdited[username];
    if (!newusername) {
      newusername = username
    }

    let node = document.createElement('div')
    node.classList.add('block__messages__item-ovg')
    node.setAttribute('role', role)
    if (sticker) node.setAttribute('sticker', sticker)
    node.setAttribute('username', username)
    node.setAttribute('message', message)
    node.innerHTML = `<wasd-chat-message>
      <div class="message-ovg is-time${!!message?.match(HelperWASD.self_channel_name) ? ' has-mention' : ''}">
        <div class="message__time-ovg"> ${moment(date_time).format(settings.wasd.formatMessageSentTime)} </div>
          <div class="message__info-ovg">
            <div class="message__info__text-ovg">
              <div class="info__text__status-ovg">
                ${isSub ? `<div _ngcontent-iox-c54="" class="info__text__status-paid" style="background-color: ${color}"><i _ngcontent-iox-c54="" class="icon wasd-icons-star" role-card=""></i></div>` : ``}
                <div class="info__text__status__name-ovg ${isModer ? 'is-moderator' : ''}${isOwner ? 'is-owner' : ''}${isAdmin ? 'is-admin' : ''}" style="${(settings.wasd.colonAfterNickname) ? `margin: 0px;` : ''}color: ${color}">${isModer ? '<i _ngcontent-eti-c54="" class="icon wasd-icons-moderator"></i>' : ''}${isOwner ? '<i _ngcontent-lef-c54="" class="icon wasd-icons-owner"></i>' : ''}${isAdmin ? '<i _ngcontent-lef-c54="" class="icon wasd-icons-dev"></i>' : ''} ${newusername}</div>
              </div>
              ${(settings.wasd.colonAfterNickname) ? `<span aria-hidden="true" id="colon-after-author-name-ovg" style=" margin-right: 4px; color: var(--yt-live-chat-primary-text-color, rgba(var(--wasd-color-switch--rgb),.88))">: </span>` : '' }
              <div class="message-text-ovg"><span>${(blockmessage == 'Стикер') ? '<span class="chat-message-text stickertext">Стикер</span>' : blockmessage }</span></div>
              ${(sticker != undefined) ? '<img alt="sticker" class="sticker small" src="'+sticker+'"> <span class="chat-message-text stickertext sticker_text">Стикер</span>' : ''}
            </div>
          </div>
        </div>
      </div>
    </wasd-chat-message>`;

    let stickersovg = ''
    for (let stickerovg of node.querySelectorAll('.stickerovg')) {
      stickersovg += stickerovg.getAttribute('title') + ' '
    }

    node.setAttribute('stickersovg', stickersovg)
    var messageText = node.querySelector('.message-text-ovg > span')
    node.setAttribute('mention', bl)

    messageText.innerHTML = messageText.innerHTML.replace(/@[a-zA-Z0-9_-]+/ig, ($1) => {
      let username = settings.wasd.userNameEdited[$1.trim().split('@').join('')];
      if (!username) {
        username = $1.trim().split('@').join('')
      }
      return `<span style='color: ${HelperWASD.usercolor($1.trim())};' class='chat-message-mention${settings.wasd.onClickMention.toString() !== '0' ? ' click' : ''}' username="${$1}" usernamelc="${$1.toLowerCase()}">@${username.trim()}</span>`;
    });

    messageText.innerHTML = messageText.innerHTML.replace(/\+at\+/ig, '@')

    node.querySelectorAll('.chat-message-mention').forEach(element => {
      if (element.style.color == '') HelperWASD.usercolorapi(element);

      bl += element.getAttribute('usernamelc').split('@').join('') + ' '

      element.addEventListener('click', ({ target }) => {
        let username = target.getAttribute('username')?.split('@').join('')
        if (username) {
          if (settings.wasd.onClickMention.toString() === '1') {
            if (textarea) {
              textarea.value += target.getAttribute('username').trim() + ' ';
              textarea.dispatchEvent(new Event('input'));
              textarea.focus()
            }
          } else if (settings.wasd.onClickMention.toString() === '2') {
            if (!HelperWASD.addUsernameToTextarea(username)) {
              HelperWASD.createUserViewerCard(username, true);
            }
          }
        }
      })
    });

    let badge = HelperWASD.badges[node.getAttribute('username').trim()]
    if (badge && badge.user_role == 'DEV') {
      node.querySelector('.info__text__status-ovg').insertAdjacentHTML("afterbegin", `<div ovg="" class="info__text__status-dev" style="background-color: ${HelperWASD.userColors[badge.user_id % (HelperWASD.userColors.length - 1)]};"><i badge="" class="icon wasd-icons-dev dev"></i></div>`) 
    }

    var tooltips = node.querySelectorAll(".tooltip-wrapper");
    for (let tooltip of tooltips) {
      $( tooltip ).tooltip({
        classes: { "ui-tooltip": "ui-ovg-tooltip" },
        content: tooltip.title,
        show: false,
        hide: false,
        position: {
          my: "center bottom",
          at: "center top-5",
          within: $('.block__messages-ovg')
        }
      });
    }

    return node
  },
  addToMenu(node) {
    text = " BetterWASD настройки ";
    switcher = `<div id="buttonOvG" class="menu__block-ovg menu__block-header"><div class="menu__block__icon"><i class="icon wasd-icons-settings-profile"></i></div><div class="menu__block__text">${text}</div></div>`;

    node.querySelectorAll('div.menu__block')[0].insertAdjacentHTML("afterend", switcher);

    document.querySelector('#buttonOvG')?.addEventListener('click', () => {
      BetterStreamChat.settingsDiv.style.display = 'block'
      document.querySelector('.header__block__btn > i').click()
      document.body.style.overflowY = "hidden";
      BetterStreamChat.settingsDiv.style.animationName = 'showbetterpanel';
      BetterStreamChat.openSettings()
    })
  }
}