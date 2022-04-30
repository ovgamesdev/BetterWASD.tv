const HelperWASD = {
  openUserCardName: '',
  isModerator: false,
  closedViewUrl: 'none',
  self_channel_name: 'none',
  userColors: ["#7fba40", "#1c3fc8", "#a5276d", "#913ca7", "#4332b6", "#266bc5", "#5bc3c1", "#d87539", "#a9ad47", "#3ca13b", "#4db89a", "#6a4691", "#f5a623", "#e7719e", "#9fcbef", "#7b4b4b"],
  subscribers: {},
  messageTimeout: null,
  current: null,
  isTheaterModeNoFS: false,
  TMChannel: '',
  subscriptionPeriods: [{ startDays: 0, iconUrl: "https://static.wasd.tv/images/subscribers/1mon.png" }, { startDays: 60, iconUrl: "https://static.wasd.tv/images/subscribers/3mon.png" }, { startDays: 150, iconUrl: "https://static.wasd.tv/images/subscribers/6mon.png" }, { startDays: 240, iconUrl: "https://static.wasd.tv/images/subscribers/9mon.png" }, { startDays: 330, iconUrl: "https://static.wasd.tv/images/subscribers/12mon.png" }, { startDays: 510, iconUrl: "https://static.wasd.tv/images/subscribers/18mon.png" }, { startDays: 690, iconUrl: "https://static.wasd.tv/images/subscribers/24mon.png" }],
  selfMessagesHistory: [],

  loaded() {

    for (let as in HelperSettings.availableSettings) {
      for (let s in HelperSettings.availableSettings[as]) {
        if (HelperSettings.availableSettings[as][s].inInitChange) {
          let onChange = HelperSettings.availableSettings[as][s].onChange;
          if (typeof onChange === 'function') onChange(settings[as][s]);
        }
      }
    }

    if (new URL(document.URL).searchParams.get('helper-settings')) {
      if (new URL(document.URL).searchParams.get('type') == 'whatsNew') {
        BetterStreamChat.settingsDiv.querySelector('wasd-nav-sidebar [data-tab="changelog"]').click()
      }
      BetterStreamChat.settingsDiv.style.display = 'block'
      BetterStreamChat.settingsDiv.classList.add('fullscreen')

      setInterval(() => {
        Helper.trySendMessage({ from: "tab_settings" })
      }, 5000)
    } else {
      setInterval(() => {
        Helper.trySendMessage({ from: "tab_content" })
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


    if (document.location.hash && document.location.hash != '') {
      var parsedHash = new URLSearchParams(window.location.hash.slice(1));
      window.history.pushState('page', 'Title', '/');
      if (parsedHash.get('access_token')) {
        var access_token = parsedHash.get('access_token');
        Helper.showSettings()
        Cookies.set('BetterWASD_access_token', access_token)
        let notify = alertify.success('Авторизовано', 0);
        Helper.loginTwitchUI()

        if (!Cookies.get('BetterWASD_twitch_display_name')) {
          $.ajax({
            headers: {
              'Client-ID': HelperTwitch['Client-ID'],
              'Authorization': 'Bearer ' + Cookies.get('BetterWASD_access_token')
            },
            url: `https://api.twitch.tv/helix/users`,
            success: (out) => {
              window.history.pushState('page', 'Title', '/');
              Cookies.set('BetterWASD_twitch_display_name', out.data[0].display_name)
              Helper.loginTwitchUI(out.data[0].display_name)
              notify.setContent('Авторизовано: ' + out.data[0].display_name)
              setTimeout(() => {notify.dismiss()}, 10000)
            },
            error: (e) => {
              window.history.pushState('page', 'Title', '/');
              console.log(e)
            }
          });
        }
      }
    } else if (document.location.search && document.location.search != '') {
      var parsedParams = new URLSearchParams(window.location.search);
      window.history.pushState('page', 'Title', '/');
      if (parsedParams.get('error_description')) {
        Helper.showSettings()
        notify.dismiss();
        alertify.error(parsedParams.get('error') + ' - ' + parsedParams.get('error_description'), 5);
        Helper.setUnauthorization()
      }
    }

    $.ajax({
      headers: {
        'Client-ID': HelperTwitch['Client-ID'],
        'Authorization': 'Bearer ' + Cookies.get('BetterWASD_access_token')
      },
      url: `https://api.twitch.tv/helix/users`,
      error: () => {
        Cookies.remove('BetterWASD_access_token')
        Cookies.remove('BetterWASD_twitch_display_name')
        Helper.logoutTwitchUI()
        Helper.setUnauthorization()
      }
    });


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

          HelperWASD.current = out.result
          HelperWASD.self_channel_name = out.result.user_profile.user_login

          $.ajax({
            url: `${HelperBWASD.host}/api/v1/stat/tv/${out.result.user_profile.user_id}`,
            type: "POST",
            data: {
              user_login: out.result.user_profile.user_login,
              channel_image: out.result.user_profile.profile_image.large,
              version: BetterStreamChat.changelog.version
            },
            success: (out) => {
              ovg.log(out)
            }
          })

          Helper.trySendMessage({ setUninstall: out.result.user_profile.user_id })

        }
      }
    })

    BetterStreamChat.openSettings()
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
  elementToURL(html, chat=true) {
    if (html) {
      if (chat) html.innerHTML = html.innerHTML.replace(/<a[^>]*href="([^"]+)"[^>]*>(?:.*?<\/a>)?/g, ' $1 ');
      const options = {
        target: "_blank",
        className: 'test',
        format: (value, type) => {
          if (chat) value = value.replace(/@/g, '+at+')
          if (chat && type === 'url' && value.length > settings.wasd.truncateLink.toString() === '0' ? undefined : Number(settings.wasd.truncateLink)) {
            value = value.slice(0, Number(settings.wasd.truncateLink)) + '…';
          }
          return value
        },
        formatHref: (value) => { if (chat) { return value.replace(/@/g, '+at+') } return value },
      }
      return linkifyElement(html, options, document)
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
      let message = messages.children[messages.children.length - 1]
      //ovg.log(message)
      document.querySelector('.block').scrollTop = messages.scrollHeight
      return message;
    }
  },
  createUserViewerCard(channel_name, positionself = false, node) {
    const removeVC = () => {
      if (document.querySelector('.chat-room__viewer-card')) {
        HelperWASD.highlightMessagesRemove()
        HelperWASD.openUserCardName = ''
        document.querySelector('.chat-room__viewer-card').remove()
      }
    }

    let top_card;
    let left_card = 0;
    let data;

    let rect = node.getBoundingClientRect();

    if (!settings.general.saveCardPosition) {
      if (!positionself) {
        if (document.querySelector('wasd-popout-chat-page')) {
          top_card = rect.top
          left_card = rect.left

          let c = document.querySelector('.chat__wrapper')

          if (top_card > c.offsetHeight - 398) {
            top_card = c.offsetHeight - 398
          }
        } else if (document.querySelector('.content-wrapper.theaterModeNoFS')) {
          top_card = rect.top
          left_card = rect.left

          let c = document.querySelector('wasd-chat')
          let r = document.querySelector('.router-wrapper')

          if (top_card > c.offsetHeight - 398) {
            top_card = c.offsetHeight - 398
          }

          if ((left_card + 320) > r.offsetWidth) {
            left_card = r.offsetWidth - 320
          }
        } else if (document.querySelector('wasd-settings-page')) {
          top_card = (rect.top - 48) + document.querySelector('#scroll-content').scrollTop
          left_card = rect.left - 52
        } else {
          top_card = rect.top - 48
          left_card = window.innerWidth < 640 ? rect.left : rect.left - 52

          let c = document.querySelector('wasd-chat')
          let r = document.querySelector('.router-wrapper')

          if (top_card > c.offsetHeight - 398) {
            top_card = c.offsetHeight - 398
          }

          if ((left_card + 320) > r.offsetWidth) {
            left_card = r.offsetWidth - 320
          }
        }

        let mobile = document.querySelector('.theatre-mode-mobile');
        if (mobile) top_card = mobile.clientHeight + 93 + 7.5
      } else if (document.querySelector('.chat-room__viewer-card')) {
        top_card = document.querySelector('.ovg-viewer-card').offsetTop - 5
        left_card = document.querySelector('.ovg-viewer-card').offsetLeft - 5
      }
    } else {
      top_card = settings.general.cardPosition['y']
      left_card = settings.general.cardPosition['x']
    }

    removeVC()

    let usercard = `<div class="chat-room__viewer-card full-space loading"><div class="viewer-card-layer full-space"><div style="top: ${top_card}px; left: ${left_card}px;" class="tw-border-radius-medium ovg-viewer-card"><div class="full-space"><div class="background-viewer-card"><div style="" class="viewer-card-header__background" style=""><div class="viewer-card-header__overlay full-space"><div class="viewer-card-header__banner"><div class="viewer-card-drag-cancel"><figure class="tw-avatar"><div class="profile-main__avatar" style=""></div></figure></div><div class="viewer-card-header__display-name"><div class="viewer-card-drag-cancel"><div class="tw-full-width tw-pd-r-5"><h4 class="tw-c-text-overlay tw-ellipsis tw-line-clamp-2 tw-word-break-all"><a class="tw-link card_username" rel="noopener noreferrer" target="_blank" href=""></a><button class="bttv-moderator-card-nickname-change-button"><span class="buttonIcon"><svg width="16px" height="16px" version="1.1" viewBox="0 0 16 16" x="0px" y="0px" fill="white"><path clip-rule="evenodd" d="M6.414,12.414L3.586,9.586l8-8l2.828,2.828L6.414,12.414z M4.829,14H2l0,0v-2.828l0.586-0.586l2.828,2.828L4.829,14z" fill-rule="evenodd"></path></svg></span></button></h4></div></div><div class="tw-flex"><i _ngcontent-cel-c162="" class="wasd-icons-games ovg" style="font-size:20px;align-items:center;display:none;justify-content:center"></i><a target="_blank" data-test-selector="viewer_card_game" class="tw-c-text-overlay tw-mg-l-05 tw-mg-t-auto gameurl"></a></div></div></div><div class="bttv-moderator-card-user-stats"><div class="tw-flex tw-full-width"><div style="display:none;" class="tw-align-items-center tw-inline-flex tw-stat tw-pd-l-1 viewers-title" title="Зрителей за стрим"><div class="tw-align-items-center tw-inline-flex tw-stat__icon tw-mg-r-1"><i _ngcontent-cel-c162="" style="font-size:14px;height:14px;width:14px;align-items:center;display:flex;justify-content:center" class="wasd-icons-viewers-live"></i></div><div class="tw-stat__value viewers"></div></div><div class="tw-align-items-center tw-inline-flex tw-stat tw-pd-l-1 channal_followers_count-title" title="Количество фолловеров канала"><div class="tw-align-items-center tw-inline-flex tw-stat__icon tw-mg-r-1"><i _ngcontent-xul-c30="" class="wasd-icons-favorite"></i></div><div class="tw-stat__value channal_followers_count"></div></div><div class="tw-align-items-center tw-inline-flex tw-stat tw-pd-l-1 channal_created_at-title" title="Канал создан"><div class="tw-align-items-center tw-inline-flex tw-stat__icon tw-mg-r-1"><figure class="tw-svg"><svg class="tw-svg__asset tw-svg__asset--heart tw-svg__asset--inherit" width="16px" height="16px" viewBox="0 0 1792 1792" fill="white"><path d="M1792 1408v384h-1792v-384q45 0 85-14t59-27.5 47-37.5q30-27 51.5-38t56.5-11q24 0 44 7t31 15 33 27q29 25 47 38t58 27 86 14q45 0 85-14.5t58-27 48-37.5q21-19 32.5-27t31-15 43.5-7q35 0 56.5 11t51.5 38q28 24 47 37.5t59 27.5 85 14 85-14 59-27.5 47-37.5q30-27 51.5-38t56.5-11q34 0 55.5 11t51.5 38q28 24 47 37.5t59 27.5 85 14zm0-320v192q-24 0-44-7t-31-15-33-27q-29-25-47-38t-58-27-85-14q-46 0-86 14t-58 27-47 38q-22 19-33 27t-31 15-44 7q-35 0-56.5-11t-51.5-38q-29-25-47-38t-58-27-86-14q-45 0-85 14.5t-58 27-48 37.5q-21 19-32.5 27t-31 15-43.5 7q-35 0-56.5-11t-51.5-38q-28-24-47-37.5t-59-27.5-85-14q-46 0-86 14t-58 27-47 38q-30 27-51.5 38t-56.5 11v-192q0-80 56-136t136-56h64v-448h256v448h256v-448h256v448h256v-448h256v448h64q80 0 136 56t56 136zm-1280-864q0 77-36 118.5t-92 41.5q-53 0-90.5-37.5t-37.5-90.5q0-29 9.5-51t23.5-34 31-28 31-31.5 23.5-44.5 9.5-67q38 0 83 74t45 150zm512 0q0 77-36 118.5t-92 41.5q-53 0-90.5-37.5t-37.5-90.5q0-29 9.5-51t23.5-34 31-28 31-31.5 23.5-44.5 9.5-67q38 0 83 74t45 150zm512 0q0 77-36 118.5t-92 41.5q-53 0-90.5-37.5t-37.5-90.5q0-29 9.5-51t23.5-34 31-28 31-31.5 23.5-44.5 9.5-67q38 0 83 74t45 150z"></path></svg></figure></div><div class="tw-stat__value channal_created_at"></div></div>
    
    <div class="tw-align-items-center tw-inline-flex tw-stat tw-pd-l-1 profile_level-title" title="Уровень канала">
      <div class="tw-align-items-center tw-inline-flex tw-stat__icon tw-mg-r-1">
        <i _ngcontent-ykf-c54="" style="font-size:14px;height:14px;width:14px;align-items:center;display:flex;justify-content:center" class="icon wasd-icons-lvl"></i>
      </div>
      <div class="tw-stat__value profile_level"></div>
    </div>

    <div class="tw-align-items-center tw-inline-flex tw-stat tw-pd-l-1 profile_coins-title" title="0 монет" style="display: none">
      <div class="tw-align-items-center tw-inline-flex tw-stat__icon tw-mg-r-1">
        <i _ngcontent-ykf-c54="" style="font-size:14px;height:14px;width:14px;align-items:center;display:flex;justify-content:center" class="icon ovg-icon-coin"></i>
      </div>
      <div class="tw-stat__value profile_coins"></div>
    </div>

    </div></div></div></div><div class="ovg buttonsdiv"><wasd-channel-favorite-btn id="selector-channel-favorite-btn-ovg"><wasd-button class="stroked-btn ovg" wasdtooltip="" style="position: relative;display: inline-block;outline: none;"><button class="medium primary ovg disabled" type="button"><i class="wasd-icons-like ovg"></i> <span></span></button><ovg-tooltip><div class="ovg tooltip tooltip_position-right tooltip_size-small" style="width: 200px;"><div class="tooltip-content tooltip-content_left ovg"> Добавить в избранное </div></div></ovg-tooltip></wasd-button></wasd-channel-favorite-btn><div style="width:100%"></div><div class="item__links-ovg"></div></div><div class="tw-c-background-alt-2 tw-pd-t-05 stickers"><div class="paid_title-ovg" style="display:none;"> Стикеры канала </div><div class="paidsubs-popup__stickers"></div></div> <div class="tw-c-background-alt-2 tw-pd-t-05 roles" style="display: none;padding: 5px 0;"><div class="paid_title-ovg" style="display: block;"> Значки </div><div class="popup__roles" style="display: inline-flex;"></div></div> <div class="user_last_messages-ovg"><button class="paid_title-ovg last_messages" style="display: block;padding-bottom: 10px;box-shadow: 0px 2px 2px -2px rgba(var(--wasd-color-switch--rgb),.32);z-index: 2;position: relative;"><div class="accordion-header-wrap-ovg"><span class="accordion-header-ovg"> Последние сообщения </span><div class="accordion-header-arrow-ovg"><i class="wasd-icons-dropdown-top"></i></div></div><div class="accordion-marker-ovg"></div></button><div class="block-ovg"><div class="block__messages-ovg"></div></div></div></div></div><div data-a-target="viewer-card-close-button" class="tw-absolute tw-mg-r-05 tw-mg-t-05 tw-right-0 tw-top-0"><div class="viewer-card-drag-cancel"><button class="tw-button-icon tw-button-icon--overlay tw-core-button" aria-label="Скрыть" data-test-selector="close-viewer-card"><i _ngcontent-ykf-c54="" style="font-size:13px;align-items:center;display:flex;justify-content:center" class="icon wasd-icons-close"></i></button></div></div></div></div></div>`;
    if (!document.querySelector('.channel-wrapper') && document.querySelector('.chat-room__viewer-card')) {
      document.querySelector('.chat-room__viewer-card').style.zIndex = '5556'
    }

    document.querySelector('.channel-wrapper')?.insertAdjacentHTML("beforeend", usercard);
    document.querySelector('.wasd-container')?.insertAdjacentHTML("beforeend", usercard);
    if (!document.querySelector('.chat-room__viewer-card')) {
      document.querySelector('wasd-root')?.insertAdjacentHTML("beforeend", usercard);
      document.querySelector('.chat-room__viewer-card').style.top = '0'
    }

    let card = document.querySelector('.chat-room__viewer-card')

    if (settings.wasd.highlightMessagesOpenCard) HelperWASD.highlightMessages(channel_name.trim())

    card.querySelector("[data-a-target='viewer-card-close-button']").addEventListener('click', () => removeVC());

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
      grid: [2, 2],
      stop: () => {
        if (settings.general.saveCardPosition) {
          settings.general.cardPosition['y'] = document.querySelector('.ovg-viewer-card').offsetTop
          settings.general.cardPosition['x'] = document.querySelector('.ovg-viewer-card').offsetLeft
          HelperSettings.save([document.querySelector('.optionField')]);
        }
      }
    });

    ws_user = document.querySelector(`.WebSocket_history .user_ws[user_loginlc="${channel_name.trim().toLowerCase().split('@').join('')}"]`)
    let viewerCard = document.querySelector('.chat-room__viewer-card');
    
    const UserCard = (data) => {
      if (data) {

        $.ajax({
          url: `https://wasd.tv/api/v2/profiles/${data.user_id}`,
          success: (out) => {
            if (viewerCard && out.result) {
              viewerCard.querySelector('div.tw-stat__value.profile_level').textContent = out.result.user_xp.profile_level;
              viewerCard.querySelector('.profile_level-title').title = `${out.result.user_xp.profile_level} уровень канала`;

              let date = new Date(out.result.user_profile.created_at);

              if (document.querySelector('.chat-room__viewer-card')) {
                viewerCard = document.querySelector('.chat-room__viewer-card');
                viewerCard.querySelector('.tw-stat__value.channal_created_at').textContent = `${jQuery.timeago(date)} назад`;
                viewerCard.querySelector('.channal_created_at-title').title = `Канал создан ${date.toLocaleString('ru')}`;
                // user_login
                if (settings.wasd.userNameEdited[out.result.user_profile.user_login.trim()]) {
                  viewerCard.querySelector('a.tw-link').textContent = ` ${settings.wasd.userNameEdited[out.result.user_profile.user_login.trim()]} `
                } else {
                  viewerCard.querySelector('a.tw-link').textContent = ` ${out.result.user_profile.user_login} `
                }

                viewerCard.querySelector('a.tw-link').setAttribute('title', out.result.user_profile.user_login);
                // user_id url
                viewerCard.querySelector('a.tw-link').href = `user/${out.result.user_id}`;
                // profile_image
                viewerCard.querySelector('.profile-main__avatar').style.backgroundImage = `url(${out.result.user_profile.profile_image?.large})`;
                // profile_background
                viewerCard.querySelector('.viewer-card-header__background').style.backgroundImage = `url(${out.result.user_profile.profile_background?.large})`;


                card.querySelector("button.bttv-moderator-card-nickname-change-button").addEventListener('click', () => {
                  let newusername;
                  let user_channel_name = out.result.user_profile.user_login;
                  if (user_channel_name && settings.wasd.userNameEdited[user_channel_name]) {
                    newusername = prompt(`Введите обновленный ник для ${user_channel_name} (оставьте поле пустым, чтобы сбросить):`, settings.wasd.userNameEdited[user_channel_name].trim());
                  } else {
                    newusername = prompt(`Введите обновленный ник для ${user_channel_name} (оставьте поле пустым, чтобы сбросить):`, user_channel_name);
                  }

                  if (!(newusername == null || newusername == user_channel_name) && newusername != '') {
                    newusername = newusername.match(/([a-zA-Z0-9_-]+)/g)?.join('')
                    HelperWASD.showChatMessage(`Новый ник ${newusername} пользователя ${user_channel_name}`, 'success');
                    settings.wasd.userNameEdited[user_channel_name] = ` ${newusername} `;
                    HelperWASD.udpateUserNameEdited(user_channel_name, newusername)
                  } else if (newusername == '') {
                    newusername = newusername.match(/([a-zA-Z0-9_-]+)/g)?.join('')
                    HelperWASD.showChatMessage(`Новый ник ${user_channel_name} пользователя ${user_channel_name}`, 'success');
                    delete settings.wasd.userNameEdited[user_channel_name];
                    HelperWASD.udpateUserNameEdited(user_channel_name, user_channel_name)
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
                    let description = viewerCard.querySelector('a.gameurl')

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
                      let message = out.result?.channel?.channel_description
                      if (description.textContent == '' && out.result?.channel?.channel_description) {
                        description.innerHTML = message;
                        description.title = message;
                      }

                    }

                    // followers_count
                    viewerCard.querySelector('div.tw-stat__value.channal_followers_count').textContent = out.result?.channel?.followers_count;
                    viewerCard.querySelector('.channal_followers_count-title').title = `${out.result?.channel?.followers_count} фолловеров`;

                    $.ajax({
                      url: `https://wasd.tv/api/v2/profiles/current`,
                      success: (out) => {
                        if (typeof out.result?.user_login !== "undefined") {
                          if (!(data.user_login.toLowerCase().trim() == out.result.user_profile.user_login?.toLowerCase().trim())) {
                            let buttonfollow = document.querySelector('.ovg-viewer-card wasd-channel-favorite-btn > wasd-button > button')
                            let wasdbuttonfollow = document.querySelector('.ovg-viewer-card wasd-channel-favorite-btn > wasd-button')
                            let ifollow = document.querySelector('.ovg-viewer-card wasd-channel-favorite-btn > wasd-button > button > i')
                            let tooltipfollow = document.querySelector('.ovg-viewer-card wasd-channel-favorite-btn .tooltip > div.tooltip-content')
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
                      }
                    });
                  }

                  let buttonfollow = document.querySelector('.ovg-viewer-card wasd-channel-favorite-btn > wasd-button > button')
                  let wasdbuttonfollow = document.querySelector('.ovg-viewer-card wasd-channel-favorite-btn > wasd-button')
                  let ifollow = document.querySelector('.ovg-viewer-card wasd-channel-favorite-btn > wasd-button > button > i')
                  let tooltipfollow = document.querySelector('.ovg-viewer-card wasd-channel-favorite-btn .tooltip > div.tooltip-content')

                  buttonfollow?.addEventListener('click', () => {

                    if (!buttonfollow.classList.contains('disabled')) {

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
                },
                error: (err) => {
                  card.classList.remove('loading') // loaded card
                  card.classList.add('error')
                  viewerCard.querySelector('a.gameurl').innerHTML = err?.responseJSON?.error?.details
                  viewerCard.querySelector('a.gameurl').title = err?.responseJSON?.error?.details
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
                  if (out.result[0].sticker_pack_status == 'RESOLVED') {
                    viewerCard.querySelector('div.paid_title-ovg').style.display = 'block';
                    for (let value of out.result[0].stickers) {
                      stiscersdiv = document.querySelector('div.paidsubs-popup__stickers');
                      stiscersdiv?.insertAdjacentHTML("beforeend", `<div class="sticker-card"><div class="paidsubs-popup__stickers-item" style="background-image: url(${value.sticker_image.large});"></div><ovg-tooltip style="margin-right: 8px;"><div class="tooltip tooltip_position-bottom tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> ${value.sticker_name} </div></div></ovg-tooltip></div>`);
                    }
                  }
                } else {
                  stiscersdiv = document.querySelector('div.paidsubs-popup__stickers');
                  if (stiscersdiv) {
                    stiscersdiv.style.display = 'none';
                  }
                }
              } else {
                $('div.paidsubs-popup__stickers')?.css("display", "none");
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
            let date = new Date(out.result.find(getChannel)?.channel_follower.updated_at)
            if (date != "Invalid Date") {
              viewerCard.querySelector('a.gameurl').innerHTML = `Отслеживаете с ${date.toLocaleString('ru').split(',')[0]}`
              viewerCard.querySelector('a.gameurl').title = `Отслеживаете с ${date.toLocaleString('ru')}`;
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
                  let coll = document.querySelector('button.paid_title-ovg.last_messages')
                  coll?.addEventListener("click", () => {
                    document.querySelector('.user_last_messages-ovg').classList.toggle("active");
                    let content = coll.nextElementSibling;
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
                        content.style.maxHeight = "153px";
                      }
                      document.querySelector('.block-ovg')?.scrollTo(0,document.querySelector('.block-ovg')?.scrollHeight)
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

                        let isPartner = false
                        if (Array.isArray(message.info.other_roles)) {
                          for (let role of message.info.other_roles) {
                            if (!isPartner) isPartner = (role == 'WASD_PARTNER')
                          }
                        } else {
                          if (!isPartner) isPartner = (message.info.other_roles == 'WASD_PARTNER')
                        }
                        if (isPartner) role += ' partner'

                        messagesDiv.appendChild(HelperWASD.createMessage(role, message.info.user_login.trim(), HelperWASD.userColors[message.info.user_id % (HelperWASD.userColors.length - 1)], message?.info?.message, message?.info?.sticker?.sticker_image?.medium, new Date(message.date_time)))
                      }
                    }
                    if (document.querySelector('.block__messages-ovg').childNodes.length == 0) {
                      $('.user_last_messages-ovg')?.css("display", "none");
                    }
                  }
                },
              })

              if (out.result.media_container.user_id != data.user_id && data.user_id != HelperWASD.current?.user_profile?.user_id ) $.ajax({
                url: `https://wasd.tv/api/chat/streamers/${out.result.media_container.user_id}/ban`,
                success: (out) => {
                  let user = out.result.find(user => user.user_id == data.user_id)
                  if (HelperWASD.isModerator) {
                    const setBanStatus = (by_user_login, created_at, expire_at) => {
                      card.querySelector('.go_unban .by_user_login').textContent  = 'от ' + by_user_login
                      card.querySelector('.go_unban .created_at').title = moment(created_at).format('DD.MM.YY, в (HH:mm)')
                      card.querySelector('.go_unban .created_at').textContent  = moment(created_at).fromNow();
                      card.querySelector('.go_unban .expire_at').title = expire_at ? 'до ' + moment(expire_at).format('DD.MM.YY, в (HH:mm)') : ''
                      let minut = Math.ceil(moment.duration( new Date(expire_at) - new Date(created_at) ).asMinutes())
                      card.querySelector('.go_unban .expire_at').textContent  = `${expire_at ? 'отстранен на ' + minut + ` ${minut == 1 ? 'минуту' : 'минут'}` : 'забанен'}`
                    }

                    card.querySelector('.user_last_messages-ovg').insertAdjacentHTML("beforebegin", `
                      <div class="moderator disabled">
                        <div class="go_ban">
                          <wasd-button class="flat-btn ovg" wasdtooltip="" style="margin-left: 10px;">
                            <button class="basic ovg small tooltip-hover ban" type="button">
                              <i class="wasd-icons-ban"></i>
                              <ovg-tooltip>
                                <div class="tooltip tooltip_position-topLeft tooltip_size-small" style="width: 260px;">
                                  <div class="tooltip-content tooltip-content_left"> Отстранить </div>
                                </div>
                              </ovg-tooltip>
                            </button>
                          </wasd-button>
                          <wasd-button class="flat-btn ovg" wasdtooltip="" style="margin-left: 5px;">
                            <button class="basic ovg small tooltip-hover timeout1m" type="button">
                              <i class="wasd-icons-sound-off"></i>
                              <span> 1 мин </span>
                              <ovg-tooltip>
                                <div class="tooltip tooltip_position-topLeft tooltip_size-small" style="width: 260px;">
                                  <div class="tooltip-content tooltip-content_left"> Отстранить на 1 минуту </div>
                                </div>
                              </ovg-tooltip>
                            </button>
                          </wasd-button>
                          <wasd-button class="flat-btn ovg" wasdtooltip="" style="margin-left: 5px;">
                            <button class="basic ovg small tooltip-hover timeout10m" type="button">
                              <i class="wasd-icons-sound-off"></i>
                              <span> 10 мин </span>
                              <ovg-tooltip>
                                <div class="tooltip tooltip_position-topLeft tooltip_size-small" style="width: 260px;">
                                  <div class="tooltip-content tooltip-content_left"> Отстанить на 10 минут </div>
                                </div>
                              </ovg-tooltip>
                            </button>
                          </wasd-button>
                          <wasd-button class="flat-btn ovg" wasdtooltip="" style="margin-left: 5px;">
                            <button class="basic ovg small tooltip-hover timeout1h" type="button">
                              <i class="wasd-icons-sound-off"></i>
                              <span> 1 час </span>
                              <ovg-tooltip>
                                <div class="tooltip tooltip_position-topLeft tooltip_size-small" style="width: 260px;">
                                  <div class="tooltip-content tooltip-content_left"> Отстранить на 1 час </div>
                                </div>
                              </ovg-tooltip>
                            </button>
                          </wasd-button>
                        </div>
                        <div class="go_unban" style="margin: 3px 10px;">
                          <wasd-button class="flat-btn ovg" wasdtooltip="" style="margin: 0 0 3px 0;">
                            <button class="basic ovg small tooltip-hover unban" type="button">
                              <i class="icon wasd-icons-unban"></i>
                              <ovg-tooltip>
                                <div class="tooltip tooltip_position-topLeft tooltip_size-small" style="width: 260px;">
                                  <div class="tooltip-content tooltip-content_left"> Разбанить </div>
                                </div>
                              </ovg-tooltip>
                            </button>
                          </wasd-button>
                          <span class="third">
                            <span class="expire_at tech-info-ovg warning"></span> • <span class="by_user_login"></span> • <span class="created_at"></span>
                          </span>
                        </div>
                      </div>
                      <div class="tw-c-background-alt-2 tw-pd-t-05 stickers">
                        <div class="paid_title-ovg" style="display:none;"> Стикеры канала </div><div class="paidsubs-popup__stickers"></div>
                      </div>`)

                    card.querySelector('.ban').addEventListener('click', () => {
                      HelperWASD.punishment('2', {user_id: data.user_id}).then((is) => {
                        if (is) {
                          card.querySelector('.moderator').classList.add('ban')
                          let user = {
                            by_user_login: HelperWASD.current.user_login,
                            created_at: new Date(),
                            expire_at: null
                          }
                          setBanStatus(user.by_user_login, user.created_at, user.expire_at)
                        } else {
                          card.querySelector('.moderator').classList.remove('ban')
                        }
                      })
                    })

                    card.querySelector('.unban').addEventListener('click', () => {
                      HelperWASD.punishment('3', {user_id: data.user_id}).then((is) => {
                        if (is) {
                          card.querySelector('.moderator').classList.remove('ban')
                        } else {
                          card.querySelector('.moderator').classList.add('ban')
                        }
                      })
                    })

                    card.querySelector('.timeout1m').addEventListener('click', () => {
                      HelperWASD.punishment('1', {user_id: data.user_id}, '1').then((is) => {
                        if (is) {
                          card.querySelector('.moderator').classList.add('ban')
                          let user = {
                            by_user_login: HelperWASD.current.user_login,
                            created_at: new Date(),
                            expire_at: moment(new Date()).add(1, 'm')
                          }
                          setBanStatus(user.by_user_login, user.created_at, user.expire_at)
                        } else {
                          card.querySelector('.moderator').classList.remove('ban')
                        }
                      })
                    })

                    card.querySelector('.timeout10m').addEventListener('click', () => {
                      HelperWASD.punishment('1', {user_id: data.user_id}, '10').then((is) => {
                        if (is) {
                          card.querySelector('.moderator').classList.add('ban')
                          let user = {
                            by_user_login: HelperWASD.current.user_login,
                            created_at: new Date(),
                            expire_at: moment(new Date()).add(10, 'm')
                          }
                          setBanStatus(user.by_user_login, user.created_at, user.expire_at)
                        } else {
                          card.querySelector('.moderator').classList.remove('ban')
                        }
                      })
                    })

                    card.querySelector('.timeout1h').addEventListener('click', () => {
                      HelperWASD.punishment('1', {user_id: data.user_id}, '60').then((is) => {
                        if (is) {
                          card.querySelector('.moderator').classList.add('ban')
                          let user = {
                            by_user_login: HelperWASD.current.user_login,
                            created_at: new Date(),
                            expire_at: moment(new Date()).add(60, 'm')
                          }
                          setBanStatus(user.by_user_login, user.created_at, user.expire_at)
                        } else {
                          card.querySelector('.moderator').classList.remove('ban')
                        }
                      })
                    })

                    card.querySelector('.moderator')?.classList?.remove('disabled')
                    if (user) {
                      card.querySelector('.moderator')?.classList?.add('ban')
                      setBanStatus(user.by_user_login, user.created_at, user.expire_at)
                    }

                  }
                }
              });

            } else {
              $('.user_last_messages-ovg')?.css("display", "none")
            }
          },
          error: (out) => {
            $('.user_last_messages-ovg')?.css("display", "none")
          }
        });
        // let channelDataset = document.querySelector('wasd-channel').dataset
        // if (channelDataset.streamerId == HelperWASD.current?.user_profile?.user_id) Helper.trySendMessage({ from: 'betterwasd_tv', getCoinUsers: data.user_id });
      } else {
        HelperWASD.showChatMessage('не удалось получить информацию о пользователе, попробуйте обновить чат', 'warning');
        card.querySelector('div[data-a-target="viewer-card-close-button"] > div.viewer-card-drag-cancel > button')?.click();
      }
    }

    if (ws_user) {
      UserCard({
        user_id: ws_user.getAttribute('user_id'),
        user_login: ws_user.getAttribute('user_login')
      })
      
      let role = ws_user.getAttribute('role')
      let allbadge = HelperBWASD.badges[ws_user.getAttribute('user_login')]
      let htmlroles = viewerCard.querySelector('.roles .popup__roles')

      if (allbadge && allbadge.badges.length > 0) {
        for (let badg of allbadge.badges) {
          htmlroles.insertAdjacentHTML("beforeend", `<div class="tooltip-hover" style="display: inline-grid;"> ${badg.tooltip.replace( "{user_color}" , `${HelperWASD.userColors[allbadge.user_id % (HelperWASD.userColors.length - 1)]}` )} <ovg-tooltip style="position: relative;"><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;margin: 0 0px 26px -2px;"><div class="tooltip-content tooltip-content_left"> ${badg.title} </div></div></ovg-tooltip></div>`);
        }
      }
      let _currentPeriod = {iconUrl: ""}
      let userSub = HelperWASD.subscribers[ws_user.getAttribute('user_login')]
      if (userSub) {
        HelperWASD.subscriptionPeriods.every(t => !(t.startDays > userSub.meta.days_as_sub+1 || (_currentPeriod = t, 0)))
        let subtext = `${userSub.meta.days_as_sub} дней подписки`
        let icon = `url(${_currentPeriod.iconUrl})`

        for (let badge in HelperBWASD.subBadges) {
          if (icon.match(badge)) icon = HelperBWASD.subBadges[badge]
        }

        if (role.indexOf('sub') != -1) {
          htmlroles.insertAdjacentHTML("beforeend", `<div class="tooltip-hover" style="display: inline-grid;"> <div ovg="" class="badge_div" style="height: 20px; width: 20px; background-image: ${icon};"><!--i badge="" class="icon wasd-icons-star"    style="position: relative;top: 2px;"></i--></div> <ovg-tooltip style="position: relative;"><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;margin: 0 0px 26px -2px;"><div class="tooltip-content tooltip-content_left"> ${subtext} </div></div></ovg-tooltip></div>`);
        }
      }
      if (role.indexOf('owner') != -1) {
        if (settings.wasd.showOwnerBadge.toString() == '2') {
          htmlroles.insertAdjacentHTML("beforeend", `<div class="info__text__status-ovg-badge tooltip-hover" style="background: url(${git_url}/badges/owner.webp) rgb(233,25,22);"><ovg-tooltip><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Владелец канала </div></div></ovg-tooltip></div>`);
        } else {
          htmlroles.insertAdjacentHTML("beforeend", `<div class="tooltip-hover" style="display: inline-grid;"> <div ovg="" class="badge_div" style="height: 20px; width: 20px; background-color: var(--wasd-color-event3);">   <i badge="" class="icon wasd-icons-owner" style="position: relative;top: 2px;">      </i></div> <ovg-tooltip style="position: relative;"><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;margin: 0 0px 26px -2px;"><div class="tooltip-content tooltip-content_left"> Владелец канала </div></div></ovg-tooltip></div>`);
        }
      }
      if (role.indexOf('moderator') != -1) {
        if (settings.wasd.showModeratorBadge.toString() == '2') {
          htmlroles.insertAdjacentHTML("beforeend", `<div class="info__text__status-ovg-badge tooltip-hover" style="background: url(${git_url}/badges/moderator.webp) rgb(0,173,3);"><ovg-tooltip><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Модератор </div></div></ovg-tooltip></div>`);
        } else {
          htmlroles.insertAdjacentHTML("beforeend", `<div class="tooltip-hover" style="display: inline-grid;"> <div ovg="" class="badge_div" style="height: 20px; width: 20px; background-color: var(--wasd-color-gray2);">    <i badge="" class="icon wasd-icons-moderator" style="position: relative;top: 2px;">  </i></div> <ovg-tooltip style="position: relative;"><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;margin: 0 0px 26px -2px;"><div class="tooltip-content tooltip-content_left"> Модератор </div></div></ovg-tooltip></div>`);
        }
      }
      if (role.indexOf('admin') != -1) {
        htmlroles.insertAdjacentHTML("beforeend", `<div class="tooltip-hover" style="display: inline-grid;"> <div ovg="" class="badge_div" style="height: 20px; width: 20px; background-color: var(--wasd-color-corp-blue);"><i badge="" class="icon wasd-icons-dev" style="position: relative;top: 2px;">        </i></div> <ovg-tooltip style="position: relative;"><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;margin: 0 0px 26px -2px;"><div class="tooltip-content tooltip-content_left"> Администратор </div></div></ovg-tooltip></div>`);
      }
      if (role.indexOf('promowin') != -1) {
        htmlroles.insertAdjacentHTML("beforeend", `<div class="tooltip-hover" style="display: inline-grid;"> <div ovg="" class="badge_div message__promocodes" style="background-color: var(--wasd-color-gray2);width: 20px;"></div> <ovg-tooltip style="position: relative;"><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;margin: 0 0px 26px -2px;"><div class="tooltip-content tooltip-content_left"> Promo Code Winner </div></div></ovg-tooltip></div>`);
      }
      if (role.indexOf('partner') != -1) {
        if (settings.wasd.showPartnerIcon.toString() == '2') {
          htmlroles.insertAdjacentHTML("beforeend", `<div class="info__text__status-ovg-badge tooltip-hover" style="background: url(${git_url}/badges/partner.webp) rgb(145,70,255);"><ovg-tooltip><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Партнёр WASD.TV </div></div></ovg-tooltip></div>`);
        } else {
          htmlroles.insertAdjacentHTML("beforeend", `<div class="tooltip-hover" style="display: inline-grid;"> <div ovg="" class="badge_div message__partner" style="background-color: var(--wasd-color-gray2);width: 20px;"></div> <ovg-tooltip style="position: relative;"><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;margin: 0 0px 26px -2px;"><div class="tooltip-content tooltip-content_left"> Партнёр WASD.TV </div></div></ovg-tooltip></div>`);
        }
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
          HelperWASD.showChatMessage('не удалось получить информацию о пользователе, попробуйте обновить чат', 'warning');
          card.querySelector('div[data-a-target="viewer-card-close-button"] > div.viewer-card-drag-cancel > button')?.click();
        }
      });
    }
  },
  download(filename, text) {
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.setAttribute('download', filename);
    a.setAttribute('href', window.URL.createObjectURL(blob));
    a.click();
    document.body.removeChild(a);
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
    for (let i of document.querySelectorAll('.block__messages__item')) {
      if (i.querySelector('.info__text__status__name'))
        if (i.querySelector('.info__text__status__name').dataset.usernamelc)
          if (i.querySelector('.info__text__status__name').dataset.usernamelc == username.toLowerCase()) {
            i.querySelector('wasd-chat-message > .message').classList.add('openCardColor')
          }
    }
  },
  highlightMessagesRemove() {
    for (let i of document.querySelectorAll('.openCardColor')) {
      i.classList.remove('openCardColor')
    }
  },
  async getIsModerator() {
    let isMod = false;
    return new Promise((resolve, reject) => {
      if (document.querySelector('wasd-header .user-profile__name')) {

        $.ajax({
          url: HelperWASD.getStreamBroadcastsUrl(),
          success: (out) => {
            if (typeof out.result !== 'undefined')
              if (typeof out.result.channel !== 'undefined') {

                $.ajax({
                  url: `https://wasd.tv/api/chat/streamers/${out.result.channel.user_id}/moderators`,
                  success: (out) => {
                    for (let mod of out.result) {
                      if (mod.user_login.trim() == document.querySelector('wasd-header .user-profile__name').textContent.trim()) {
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
  loadBwasdData() {
    HelperBWASD.badges = {}
    HelperBWASD.paints = {}
    $.ajax({
      url: `${HelperBWASD.host}/api/v1/users`,
      success: (out) => {
        HelperBWASD.badges = out.badges
        HelperBWASD.paints = out.paints

        for (let paint in HelperBWASD.paints) {
          for (let user of [...document.querySelectorAll(`.info__text__status__name[data-username="${paint}"] > span`), ...document.querySelectorAll(`.chat-message-mention[data-username="@${paint}"]`)]) {
            if (HelperBWASD.paints[paint].length < 5) {
              user.dataset.betterwasdPaint = HelperBWASD.paints[paint]
            } else if (HelperBWASD.paints[paint].match('gradient')) {
              user.style.backgroundImage = HelperBWASD.paints[paint]
              user.dataset.betterwasdPaint = ""
            } else {
              user.style.color = HelperBWASD.paints[paint]
              user.dataset.betterwasdPaintColor = HelperBWASD.paints[paint]
            }
          }
        }

      }
    });
  },
  loadSubscribersData(channel_id) {
    HelperWASD.subscribers = {}
    const getall = (limit, offset) => {

      $.ajax({
        url: `https://wasd.tv/api/channels/${channel_id}/subscribers?limit=${limit}&offset=${offset}`,
        headers: { 'Access-Control-Allow-Origin': 'https://wasd.tv' },
        success: (out) => {
          if (channel_id == 0) return
          for (let sub of out.result) {
            HelperWASD.subscribers[sub.profile.user_login] = sub.subscription
          }
          if(out.result.length == limit) {
            setTimeout(() => getall(limit, offset+limit), 50)
          }
        },
        error: (err) => console.log(err)
      });

    }
    getall(50, 0)
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
      if (message.dataset.username == username.trim().split('@').join('')) {
        message.remove()
      } else if (settings.wasd.removeMentionBL) {
        for (let msg of message.querySelectorAll(`.chat-message-mention[data-username="@${username.trim().split('@').join('').toLowerCase()}"]`)) {
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
    try {
      if (document.querySelector('.settings-page__title-btns wasd-dropdown .dropdown-title__text') && document.querySelector('.settings-page__title-btns wasd-dropdown .dropdown-title__text').textContent == " Доступно по ссылке " && document.querySelector('.stream-private-link__link-input input')) {
        return 'https://wasd.tv/api/v2/broadcasts/closed/' + new URL(document.querySelector('.stream-private-link__link-input input').value).pathname.split('/')[2]
      } else if (document.querySelector('.settings-page__title-btns wasd-dropdown .dropdown-title__text') && document.querySelector('.settings-page__title-btns wasd-dropdown .dropdown-title__text').textContent == " Доступно для всех " && document.querySelector('#selector-sp-stream-links input[placeholder="Чат"]')) {
        return 'https://wasd.tv/api/v2/broadcasts/public?channel_name=' + new URL(document.querySelector('#selector-sp-stream-links input[placeholder="Чат"]').value).searchParams.get('channel_name')
      } else if (new URL(document.URL).searchParams.get('channel_name')) {
        return 'https://wasd.tv/api/v2/broadcasts/public?channel_name=' + new URL(document.URL).searchParams.get('channel_name')
      } else if (new URL(document.URL).searchParams.get('private_link')) {
        return 'https://wasd.tv/api/v2/broadcasts/closed/' + new URL(document.URL).searchParams.get('private_link')
      } else if (new URL(document.URL).pathname.split('/')[1] == 'private-stream') {
        return 'https://wasd.tv/api/v2/broadcasts/closed/' + new URL(document.URL).pathname.split('/')[2]
      } else {
        return 'https://wasd.tv/api/v2/broadcasts/public?channel_name=' + HelperWASD.getChannelName()
      }
    } catch (err) {
      return 'https://wasd.tv/error/4xx'
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
      HelperWASD.showChatMessage('Пользователь уже в ЧС', 'warning')
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
      HelperWASD.showChatMessage('Пользователь уже в ЧС', 'warning')
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
      HelperWASD.showChatMessage('Пользователь уже в ЧС', 'warning')
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
      HelperWASD.showChatMessage('Пользователь уже в ЧС', 'warning')
    }
    highlightAddTerm.value = ''
  },
  addMessageToCpenCard(role, username, color, message, sticker) {
    let block__messages = document.querySelector('.chat-room__viewer-card .block__messages-ovg')
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
        url: `https://wasd.tv/api/search/profiles?limit=999&offset=0&search_phrase=${element.dataset.username?.split('@').join('').toLowerCase().trim()}`,
        success: (out) => {
          let data;
          if (out.result) {
            for (let value of out.result.rows) {
              if (value?.user_login?.toLowerCase().trim() == element.dataset.username?.split('@').join('').toLowerCase().trim()) {
                color = HelperWASD.userColors[value.user_id % (HelperWASD.userColors.length - 1)];
                break;
              }
            }
            element.style.color = color;
          }
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
    // node.getAttribute('role')
    // node.getAttribute('username')
    // node.getAttribute('message')
    // node.getAttribute('sticker')

    ovg.log(node)
    document.querySelector('pin-chat-messages-ovg').append()
  },
  createMessage(role, username, color, message, sticker, date_time = new Date()) {

    let isOwner          = false // role.indexOf('owner')        != -1 && settings.wasd.showOwnerBadge
    let isModer          = false // role.indexOf('moderator')    != -1 && settings.wasd.showModeratorBadge
    let isSub            = false // role.indexOf('sub')          != -1 && settings.wasd.showSubBadge
    let isAdmin          = false // role.indexOf('admin')        != -1 && settings.wasd.showAdminBadge
    let isPromoCodeWin   = false // role.indexOf('promowin')     != -1 && settings.wasd.showPromoCodeWin
    let isPartner        = false // role.indexOf('partner')      != -1 && settings.wasd.showPartnerIcon
    let blockmessage     = message;
    let bl = ' '

    if (message == undefined) blockmessage = ''

    let newusername = settings.wasd.userNameEdited[username]?.trim();
    if (!newusername) {
      newusername = username.trim()
    }

    let node = document.createElement('div')
    node.classList.add('block__messages__item-ovg')
    node.setAttribute('role', role)
    if (sticker) node.setAttribute('sticker', sticker)
    node.dataset.username = username
    node.setAttribute('message', message)
    let userPaint = HelperBWASD.paints[username.trim()]
    node.innerHTML = `<wasd-chat-message>
      <div class="message-ovg is-time${!!message?.match(HelperWASD.self_channel_name) ? ' has-mention' : ''}">
        <div class="message__time-ovg"> ${moment(date_time).format(settings.wasd.formatMessageSentTime == 'false' ? 'HH:mm' : settings.wasd.formatMessageSentTime)} </div>
          <div class="message__info-ovg">
            <div class="message__info__text-ovg">
              <div class="info__text__status-ovg">
                ${isSub ? `<div _ngcontent-iox-c54="" class="info__text__status-paid" style="background-color: ${color}"><i _ngcontent-iox-c54="" class="icon wasd-icons-star" role-card=""></i></div>` : ``}
                <div data-username="${username}" data-usernamelc="${username.toLowerCase()}" class="info__text__status__name-ovg ${isModer ? 'is-moderator' : ''}${isOwner ? 'is-owner' : ''}${isAdmin ? 'is-admin' : ''}" style="${(settings.wasd.colonAfterNickname) ? `margin: 0px;` : ''}color: ${color}">${isModer ? '<i _ngcontent-eti-c54="" class="icon wasd-icons-moderator"></i>' : ''}${isOwner ? '<i _ngcontent-lef-c54="" class="icon wasd-icons-owner"></i>' : ''}${isAdmin ? '<i _ngcontent-lef-c54="" class="icon wasd-icons-dev"></i>' : ''}<span ${!userPaint?'':userPaint.length<5?'data-betterwasd-paint="'+userPaint+'"': userPaint.match('gradient') ? ' data-betterwasd-paint="" style="background-image:'+userPaint+'"' : 'data-betterwasd-paint-color="'+userPaint+'" style="color:'+userPaint+'"'}>${newusername}</span></div>
                ${isPartner ? '<!--div class="message__partner-ovg"></div-->' : ''}
              </div>
              ${(settings.wasd.colonAfterNickname) ? `<span aria-hidden="true" id="colon-after-author-name-ovg" style=" margin-right: 4px; color: rgba(var(--wasd-color-switch--rgb),.88);left: -4px;position: relative;">: </span>` : '' }
              <div class="message-text-ovg" style="left: -4px;position: relative;"><span>${(blockmessage == 'Стикер') ? '<span class="chat-message-text stickertext">Стикер</span>' : blockmessage }</span></div>
              ${(sticker != undefined) ? '<img alt="sticker" class="sticker small" src="'+sticker+'"> <span class="chat-message-text stickertext sticker_text">Стикер</span>' : ''}
            </div>
          </div>
        </div>
      </div>
    </wasd-chat-message>`;

    node.setAttribute('mention', bl)
    let messageHTML = node.querySelector('.message-text-ovg > span')
    if (messageHTML && messageHTML.innerHTML != '') {
      // Исправить символы ломающие чат 
      if (settings.wasd.fixCharactersBreakingChat) messageHTML.innerHTML = messageHTML.innerHTML.replace(/\p{Diacritic}/gu, "")

      // fix link
      if (settings.wasd.fixedLinks) HelperWASD.elementToURL(messageHTML)

      // emotes
      if (settings.wasd.tv7Emotes) messageHTML.innerHTML = HelperTV7.replaceText(messageHTML.innerHTML);
      if (settings.wasd.bttvEmotes) messageHTML.innerHTML = HelperBTTV.replaceText(messageHTML.innerHTML);
      if (settings.wasd.ffzEmotes) messageHTML.innerHTML = HelperFFZ.replaceText(messageHTML.innerHTML);
      if (settings.wasd.bwasdEmotes) messageHTML.innerHTML = HelperBWASD.replaceText(messageHTML.innerHTML);
      if (settings.wasd.tv7Emotes || settings.wasd.bttvEmotes || settings.wasd.ffzEmotes || settings.wasd.bwasdEmotes) HelperWASD.setZeroSizeEmotes(messageHTML)
    }

    let stickersovg = ''
    for (let stickerovg of node.querySelectorAll('.bttv-emote')) {
      stickersovg += stickerovg.dataset.code + ' '
    }
    node.setAttribute('stickersovg', stickersovg)

    messageHTML.innerHTML = messageHTML.innerHTML.replace(/@[a-zA-Z0-9_-]+/ig, ($1) => {
      let username = settings.wasd.userNameEdited[$1.trim().split('@').join('')];
      if (!username) {
        username = $1.trim().split('@').join('')
      }
      let userPaint = HelperBWASD.paints[$1.trim().split('@').join('')]
      return `<span ${!userPaint?'':userPaint.length<5?'data-betterwasd-paint="'+userPaint+'"': userPaint.match('gradient') ? ' data-betterwasd-paint="" style="background-image:'+userPaint+'"' : 'data-betterwasd-paint-color="'+userPaint+'" style="color:'+userPaint+'"'};' class='chat-message-mention${settings.wasd.onClickMention.toString() !== '0' ? ' click' : ''}' data-username="${$1}" data-usernamelc="${$1.toLowerCase()}">@${username.trim()}</span>`;
    });

    messageHTML.innerHTML = messageHTML.innerHTML.replace(/\+at\+/ig, '@')

    node.querySelectorAll('.chat-message-mention').forEach(element => {
      if (element.style.color == '') HelperWASD.usercolorapi(element);

      bl += element.dataset.usernamelc?.split('@').join('') + ' '

      element.addEventListener('click', ({ target }) => {
        let username = target.dataset.username?.split('@').join('')
        if (username) {
          if (settings.wasd.onClickMention.toString() === '1') {
            if (textarea) {
              textarea.value += target.dataset.username?.trim() + ' ';
              textarea.dispatchEvent(new Event('input'));
              textarea.focus()
            }
          } else if (settings.wasd.onClickMention.toString() === '2') {
            if (!HelperWASD.addUsernameToTextarea(username)) {
              HelperWASD.createUserViewerCard(username, true, node);
            }
          }
        }
      })
    });

    // let allbadge = HelperBWASD.badges[node.getAttribute('username').trim()]
    // if (allbadge && allbadge.badges.length > 0) {
    //   for (let badg of allbadge.badges) {
    //     node.querySelector('.info__text__status-ovg').insertAdjacentHTML("afterbegin", badg.html.replace( "{user_color}" , `${HelperWASD.userColors[allbadge.user_id % (HelperWASD.userColors.length - 1)]}` ));
    //   }
    // }

    let tooltips = node.querySelectorAll(".tooltip-wrapper");
    for (let tooltip of tooltips) {
      $( tooltip ).tooltip({
        classes: { "ui-tooltip": "ui-ovg-tooltip" },
        content: tooltip.dataset.title,
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
    node.querySelectorAll('div.menu__block')[0].insertAdjacentHTML("afterend", `<div id="buttonOvG" class="menu__block-ovg menu__block-header"><div class="menu__block__icon"><i class="icon wasd-icons-settings-profile"></i></div><div class="menu__block__text"> BetterWASD настройки </div></div>`);
    document.querySelector('#buttonOvG')?.addEventListener('click', Helper.showSettings)
  },
  addPipToPlayer(value) {
    if (value) {
      if (!document.querySelector("button.pip")) {
        const divbuttons = document.querySelector("div.buttons-container > div.buttons-right");
        const buttonpip = `<div class="buttons-wraper pip"><button class="player-button pip" type="button"><div class="tooltip tooltip-up tooltip-align-center">Картинка в картинке</div><svg class="tw-icon__svg" width="100%" height="100%" transform="scale(1.3)" viewBox="0 0 128 128"><path fill="#FFF" d="M22 30c-1.9 1.9-2 3.3-2 34s.1 32.1 2 34c1.9 1.9 3.3 2 42 2s40.1-.1 42-2c1.9-1.9 2-3.3 2-34 0-31.6 0-31.9-2.2-34-2.1-1.9-3.3-2-42-2-38.5 0-39.9.1-41.8 2zm78 34v28H28V36h72v28z"></path><path fill="#FFF" d="M60 72v12h32V60H60v12z"></path></svg></button></div>`;
        if (divbuttons && divbuttons.childNodes.length >= 9) {
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
                if (videopanel.webkitVideoDecodedByteCount != 0) videopanel.requestPictureInPicture()
              }
            });
          }
        }
      }
    } else {
      const buttondiv = document.querySelector("div.pip");
      buttondiv?.remove();
    }
  },
  addTheaterModeNoFSToPlayer(value) {
    let playerWrapper = document.querySelector('.player-wrapper')
    let streamInfo = document.querySelector('#streamInfo')
    let theaterButton = document.querySelector('.media-control .theater-button')
    if (value) {
      if (!document.querySelector("button.theaterModeNoFS")) {
        const divbuttons = document.querySelector("div.buttons-container > div.buttons-right");
        let html = ''
        if (HelperWASD.isTheaterModeNoFS) {
          html = `<div class="buttons-wraper theaterModeNoFS"><button class="player-button theaterModeNoFS" type="button"><div class="tooltip tooltip-up tooltip-align-center">Выйти из режима кинотеатра</div><svg width="16" height="16" viewBox="0 0 16 10" xmlns="http://www.w3.org/2000/svg"><path fill="#FFF" d="M15 0a1 1 0 011 1v8a1 1 0 01-1 1h-1a1 1 0 01-1-1V1a1 1 0 011-1h1zm-4 0a1 1 0 011 1v8a1 1 0 01-1 1H1a1 1 0 01-1-1V1a1 1 0 011-1h10z"></path></svg></button></div>`;
        } else {
          html = `<div class="buttons-wraper theaterModeNoFS"><button class="player-button theaterModeNoFS" type="button"><div class="tooltip tooltip-up tooltip-align-center">Режим кинотеатра</div><svg width="16" height="16" viewBox="0 0 16 10" xmlns="http://www.w3.org/2000/svg"><path fill="#FFF" d="M15 0a1 1 0 011 1v8a1 1 0 01-1 1h-1a1 1 0 01-1-1V1a1 1 0 011-1h1zm-4 0a1 1 0 011 1v8a1 1 0 01-1 1H1a1 1 0 01-1-1V1a1 1 0 011-1h10z"></path></svg></button></div>`;
        }

        if (divbuttons && divbuttons.childNodes.length >= 9) {
          divbuttons.childNodes.item(document.querySelector("button.pip") ? 6 : 5).insertAdjacentHTML("afterend", html);
          const button = document.querySelector("button.theaterModeNoFS");
          if (theaterButton) theaterButton.parentElement.style.display = 'none'
          const videopanel = document.querySelector('video');
          if (videopanel) {
            button.addEventListener('click', () => {
              if (HelperWASD.isTheaterModeNoFS) {
                if (document.fullscreen || document.webkitIsFullScreen) { if (document.exitFullscreen) { document.exitFullscreen() } else if (document.webkitExitFullscreen) { document.webkitExitFullscreen() } }
                HelperWASD.isTheaterModeNoFS = false
                HelperWASD.updateStyleTheaterModeNoFS()
                playerWrapper.style.height = ''
                streamInfo.style.width = ''
                let svg = button.querySelector('svg')
                let tooltip = button.querySelector('.tooltip')
                if (svg) svg.outerHTML = `<svg width="16" height="16" viewBox="0 0 16 10" xmlns="http://www.w3.org/2000/svg"><path fill="#FFF" d="M15 0a1 1 0 011 1v8a1 1 0 01-1 1h-1a1 1 0 01-1-1V1a1 1 0 011-1h1zm-4 0a1 1 0 011 1v8a1 1 0 01-1 1H1a1 1 0 01-1-1V1a1 1 0 011-1h10z"></path></svg>`
                if (tooltip) tooltip.textContent = `Режим кинотеатра`
                document.querySelector('.chat-container').classList.remove('theaterModeNoFS')
                document.querySelector('.content-wrapper').classList.remove('theaterModeNoFS')
                if (document.querySelector('#giftsInfo')) document.querySelector('#giftsInfo').style.display = ''
              } else {
                if (settings.wasd.theaterModeFullScreen) {
                  function openFullscreen(elem) {
                    if (elem.requestFullscreen) {
                      elem.requestFullscreen();
                    } else if (elem.webkitRequestFullscreen) { /* Safari */
                      elem.webkitRequestFullscreen();
                    } else if (elem.msRequestFullscreen) { /* IE11 */
                      elem.msRequestFullscreen();
                    }
                  }
                  openFullscreen(document.body)
                } else {
                  if (document.fullscreen || document.webkitIsFullScreen) { if (document.exitFullscreen) { document.exitFullscreen() } else if (document.webkitExitFullscreen) { document.webkitExitFullscreen() } }
                }
                HelperWASD.isTheaterModeNoFS = true
                HelperWASD.updateStyleTheaterModeNoFS()
                HelperWASD.TMChannel = wasd.href.split('/')[3]
                let svg = button.querySelector('svg')
                let tooltip = button.querySelector('.tooltip')
                if (svg) svg.outerHTML = `<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path fill="#FFF" d="M.447.431c.26-.258.691-.277 1.016.051l13.963 13.944c.328.325.244.763 0 1.004-.243.242-.644.345-.99 0L.5 1.48C.16 1.14.188.69.447.432zM1.998 3l9.71 9.707A.997.997 0 0111 13H1a1 1 0 01-1-1V4a1 1 0 011-1h.998zM15 3a1 1 0 011 1v8a.997.997 0 01-.292.706L13 9.998V4a1 1 0 011-1h1zm-4 0a1 1 0 011 1v5L5.999 3H11z"></path></svg>`
                if (tooltip) tooltip.textContent = `Выйти из режима кинотеатра`
                resizeTheaterModeNoFS()
                document.querySelector('.chat-container').classList.add('theaterModeNoFS')
                document.querySelector('.content-wrapper').classList.add('theaterModeNoFS')
              }
            });
          }
        }
      }
    } else {
      if (document.fullscreen || document.webkitIsFullScreen) { if (document.exitFullscreen) { document.exitFullscreen() } else if (document.webkitExitFullscreen) { document.webkitExitFullscreen() } }
      HelperWASD.isTheaterModeNoFS = false
      document.querySelector('style.theaterModeNoFS')?.remove()
      if (playerWrapper && streamInfo) {
        playerWrapper.style.height = ''
        streamInfo.style.width = ''
      }

      document.querySelector('.chat-container')?.classList?.remove('theaterModeNoFS')
      document.querySelector('.content-wrapper')?.classList?.remove('theaterModeNoFS')

      const buttondiv = document.querySelector("div.theaterModeNoFS");
      buttondiv?.remove();
      if (theaterButton) theaterButton.parentElement.style.display = ''
    }
  },
  updateStyleTheaterModeNoFS() {
    if (HelperWASD.isTheaterModeNoFS) {
      let text = `
        #scroll-content {position: fixed!important;z-index: 99!important;top: 0!important;left: 0!important;margin: 0!important;padding: 0!important;bottom: 0!important;width: 100%!important;height: 100%!important;}
        ${!settings.wasd.theaterModeShowContainer ? '#channel-wrapper {overflow: hidden;} .container {display: none;}' : ''}
        .player-wrapper {height: calc(100vh - ${settings.wasd.theaterModeStreamInfo.toString() == '2' ? document.querySelector('#streamInfo').offsetHeight : 0}px)!important;max-height: none !important;}
        .content-wrapper__footer {display: none !important;}
        ${settings.wasd.theaterModeStreamInfo.toString() == '1' ? '.player-streaminfo {opacity: 1;pointer-events: all!important;}' : ''}
        ${settings.wasd.theaterModeStreamInfo.toString() == '2' ? '' : '#streamInfo {position: fixed;top: 100vh;}'}
        ${settings.wasd.theaterModeShowGifts.toString() == 'true' ? '' : '#giftsInfo {display: none}'}
        ${settings.wasd.theaterModeGifts.toString() == 'true' ? '' : settings.wasd.theaterModeGifts.toString() == 'false' ? '.theaterModeNoFS wasd-player-overlay-gifts { display: none!important; }' : document.querySelector('#giftsInfo')?.style.display == 'flex' ? '' : settings.wasd.theaterModeShowGifts.toString() == 'true' ? '' : '.theaterModeNoFS wasd-player-overlay-gifts { display: none!important; }' }`
      if (document.querySelector('style.theaterModeNoFS')) {
        document.querySelector('style.theaterModeNoFS').innerHTML = text
      } else {
        let style = document.createElement('style')
        style.classList.add('theaterModeNoFS')
        style.innerHTML = text
        document.body.appendChild(style)
      }
    } else {
      HelperWASD.TMChannel = ''
      document.querySelector('style.theaterModeNoFS')?.remove()
    }
  },
  createClipByOvg(value) {
    if (value) {
      if (document.querySelector(".clip-button") && !document.querySelector("button.clip-ovg")) {
        document.querySelector('.player-button.clip-button').parentElement.style.display = "none"
        const divbuttons = document.querySelector("div.buttons-container > div.buttons-right");
        const buttonpip = `<div class="buttons-wraper clip-ovg"> <button class="player-button clip-ovg" type="button"> <div class="tooltip tooltip-up tooltip-align-center">Клип</div> <svg width="16" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M6 3.437v4.889c.004.31.407.535.674.375l4-2.445c.257-.158.257-.598 0-.757l-4-2.444A.46.46 0 006 3.437zM14 0a2 2 0 012 2v8a2 2 0 01-2 2H2a2 2 0 01-2-2V2a2 2 0 012-2h12zm0 1H2a1 1 0 00-.993.883L1 2v8a1 1 0 00.883.993L2 11h12a1 1 0 00.993-.883L15 10V2a1 1 0 00-.883-.993L14 1z" fill="#FFF" fill-rule="nonzero"></path></svg></button> </div>`;
        if (divbuttons && divbuttons.children[2]) {
          divbuttons.children[2].insertAdjacentHTML("afterend", buttonpip);
          const button = document.querySelector("button.clip-ovg");

          $.ajax({
            url: HelperWASD.getStreamBroadcastsUrl(),
            success: (out) => {
              if (out.error) {
                new Error(out.error.code)
              } else if (out?.result?.media_container) {
                button.addEventListener('click', () => {
                  if (document.querySelector('iframe#createClip')) {
                    document.querySelector('iframe#createClip').remove()
                  } else {
                    document.querySelector('wasd-player-component > div[data-player]').insertAdjacentHTML("beforeend", `<iframe id="createClip" src="https://wasd.tv/clip/${out.result.media_container.media_container_id}" width="500" height="640" align="left" style="bottom: 15px; right: 5px; position: absolute; z-index: 998;">Ваш браузер не поддерживает плавающие фреймы!</iframe>`);
                    let iframe = document.querySelector('iframe#createClip')
                    iframe.onload = () => {
                      let style = document.createElement('style')
                      style.textContent = 'body {background-color: rgba(0,0,0,0)!important;} #topDiv, wasd-mobile-app, wasd-dynamic-popup, wasd-footer {display: none!important;} #scroll-content {background-color: rgba(0,0,0,0)!important; overflow: hidden;margin: 0!important;height: 100%!important;} .create-clip{padding: 0!important;} div.close-cip {display: flex;width: 100%;max-width: 640px;}div.close-cip .create-clip__title {font-size: 24px;color: var(--wasd-color-switch);width: 100%;max-width: 640px;}div.close-cip .close-clip-btn {background-color: red;width: 28px;height: 28px;text-align: center;}div.close-cip .close-clip-btn span.close-text {font-size: 20px;}} div.tw-absolute.tw-mg-r-05.tw-mg-t-05.tw-right-0.tw-top-0 {margin-right: .5rem!important;margin-top: .5rem!important;right: 0!important;top: 0!important;position: absolute!important;}div.viewer-card-drag-cancel {display: inline-flex!important;cursor: auto;}button.tw-button-icon.tw-button-icon--overlay.tw-core-button {border: 1px solid transparent;background-color: transparent;color: #fff;border-radius: .4rem;height: 3rem;justify-content: center;user-select: none;display: inline-flex;align-items: center;position: relative;-webkit-box-align: center;-webkit-box-pack: center;vertical-align: middle;overflow: hidden;text-decoration: none;white-space: nowrap;text-align: inherit;background: 0 0;  }button.tw-button-icon.tw-button-icon--overlay.tw-core-button:hover {cursor: pointer;background-color: rgb(178 177 177 / 18%);}button.tw-button-icon.tw-button-icon--overlay.tw-core-button:active {background-color: rgba(255, 255, 255, .5);}'
                      iframe.contentDocument.head.appendChild(style)

                      createbtncloseclip = () => {
                        let text_clip = iframe?.contentDocument?.querySelector('.create-clip__title')
                        if (text_clip) {
                          text_clip.outerHTML = '<div class="close-cip"><span class="create-clip__title">Создание клипа</span><div data-a-target="viewer-card-close-button" class="tw-absolute tw-mg-r-05 tw-mg-t-05 tw-right-0 tw-top-0"><div class="viewer-card-drag-cancel"><button class="tw-button-icon tw-button-icon--overlay tw-core-button" aria-label="Скрыть" data-test-selector="close-viewer-card"><i _ngcontent-ykf-c54="" style="font-size:13px;align-items:center;display:flex;justify-content:center" class="icon wasd-icons-close"></i></button></div></div></div>'
                          iframe.contentDocument.querySelector('button.tw-button-icon.tw-button-icon--overlay.tw-core-button').addEventListener("click", () => {
                            document.querySelector('iframe#createClip').remove()
                          })
                        } else {
                          setTimeout(() => {
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
    } else {
      if (document.querySelector('.player-button.clip-button')) {
        document.querySelector('.player-button.clip-button').parentElement.style.display = ""
      }

      if (document.querySelector("button.clip-ovg")) {
        document.querySelector('.buttons-right .buttons-wraper.clip-ovg').remove();
      }

      document.querySelector('iframe#createClip')?.remove()
    }
  },
  updateColonAfterNickname(value) {
    if (value) {
      let messages = document.querySelectorAll('wasd-chat-message')
      for (let message of messages) {
        message.querySelector('.message-text')?.insertAdjacentHTML("beforebegin", `<span aria-hidden="true" id="colon-after-author-name" style=" margin-right: 4px; color: var(--yt-live-chat-primary-text-color, rgba(var(--wasd-color-switch--rgb),.88))" >: </span>`);
        $(message.querySelector('.info__text__status__name'))?.css("margin", "0px")
      }
    } else {
      let messages = document.querySelectorAll('wasd-chat-message')
      for (let message of messages) {
        message.querySelector('#colon-after-author-name')?.remove()
        $(message.querySelector('.info__text__status__name'))?.css("margin", "")
      }
    }
  },
  updateFormatMessageSentTime(value) {
    for (let message of document.querySelectorAll('.block__messages__item.ovg')) {
      if (message.querySelector('.message__time') && message.dataset.time) {
        message.querySelector('.message__time').textContent = moment(message.dataset.time).format(value == 'false' ? 'HH:mm' : value)
      }
    }
  },
  updateBttvEmoteSize(value) {
    for (let emoteimg of document.querySelectorAll('.bttv-emote img')) {
      let size = Number(value) + 1;
      if (!emoteimg.src.match(/betterttv/) && size == 3) size = 4
      let s = emoteimg.src.split('/')
      s[s.length - 1] = s[s.length - 1].replace(/[0-9]/g, size)
      emoteimg.src = s.join('/')
    }
  },
  uptimeStreamTimer: null,
  updateUptimeStream(value) {
    if (value) {

      if (document.querySelector('div.stream-uptime')) return
      if (document.querySelector('.clip-author')) return

      document.querySelector('wasd-user-plays')?.insertAdjacentHTML('afterend', '<div class="stream-uptime tooltip-hover" style="position:relative;"><i _ngcontent-ykf-c54="" style="margin-right: 2.8px;margin-left: 2.8px;font-size: 14px;height: 14px;width: 14px;align-items: center;display: flex;justify-content: center;color: var(--wasd-color-text-fourth);" class="icon wasd-icons-freez"></i><input class="player-info__stat-value" value="00:00:00" readonly><ovg-tooltip><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> аптайм трансляции </div></div></ovg-tooltip></div>')
    
      let uptime = document.querySelector('div.stream-uptime')
      let uptimevalue = document.querySelector('.stream-uptime input.player-info__stat-value')
      let uptimetooltip = document.querySelector('.stream-uptime div.tooltip > div')
      
      uptime?.addEventListener('click', () => {
        uptimevalue.setSelectionRange(0, 20)
        if (document.execCommand("copy")) {
          HelperWASD.showChatMessage('Скопировано в буфер обмена', 'success')
        } else {
          HelperWASD.showChatMessage('Ошибка', 'warning')
        }
        uptimevalue.setSelectionRange(0, 0)
      });

      if (uptime && uptimetooltip) {
        HelperWASD.uptimeStreamTimer = setTimeout(function tick() {
          let published_at = document.querySelector('wasd-channel') && document.querySelector('wasd-channel').dataset.publishedAt?.length > 9 ? document.querySelector('wasd-channel').dataset.publishedAt : socket.channel?.media_container?.published_at
          if (document.querySelector('wasd-player .player-info__off')) return uptime?.remove()
          let date = new Date(published_at);
          if (uptime.innerHTML == '') {
            uptime.innerHTML = '<i _ngcontent-ykf-c54="" style="margin-right: 2.8px;margin-left: 2.8px;font-size: 14px;height: 14px;width: 14px;align-items: center;display: flex;justify-content: center;color: var(--wasd-color-text-fourth);" class="icon wasd-icons-freez"></i><input class="player-info__stat-value" value="00:00:00" readonly><ovg-tooltip><div class="tooltip tooltip_position-top tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> аптайм трансляции </div></div></ovg-tooltip>'
          }

          uptimetooltip.innerHTML = ` аптайм трансляции </br> (с ${date.toLocaleString()}) `
          let value = moment.utc(new Date(new Date() - date)).format('HH:mm:ss')
          uptimevalue.value = value ? value : '00:00:00'

          if (settings.wasd.uptimeStream) HelperWASD.uptimeStreamTimer = setTimeout(tick, 1000);
        }, 1000);
      }

    } else {
      document.querySelector('div.stream-uptime')?.remove()
      clearTimeout(HelperWASD.uptimeStreamTimer)
      HelperWASD.uptimeStreamTimer = null
    }
  },
  uptimeStreamTimerMobile: null,
  updateUptimeStreamMobile(value) {
    if (value) {

      let uptime = document.querySelector('.stream-status-container .stream-status-text.live')
      let published_at = document.querySelector('wasd-channel') && document.querySelector('wasd-channel').dataset.publishedAt?.length > 9 ? document.querySelector('wasd-channel').dataset.publishedAt : socket.channel?.media_container?.published_at
      if (document.querySelector('wasd-player .player-info__off')) return uptime?.remove()
      HelperWASD.uptimeStreamTimerMobile = setTimeout(function tick() {
        let date = new Date(published_at);
        uptime.textContent = moment.utc(new Date(new Date() - date)).format('HH:mm:ss');
        if (settings.wasd.uptimeStreamMobile) HelperWASD.uptimeStreamTimerMobile = setTimeout(tick, 1000);
      }, 1000);

    } else {
      document.querySelector('.stream-status-container .stream-status-text.live').textContent = 'в эфире'
      clearTimeout(HelperWASD.uptimeStreamTimerMobile)
      HelperWASD.uptimeStreamTimerMobile = null
    }
  },
  updateHoverTooltipEmote(value, node) {
    let element = node || document
    for (let emote of element.querySelectorAll('.bttv-emote.tooltip-wrapper')) {
      if (value) {
        emote.title = emote.dataset.title
      } else {
        emote.removeAttribute('title')
      }
    }
  },
  udpateUserNameEdited(user_channel_name, newusername) {
    let divs = []
    divs.push(...document.querySelectorAll(`.chat-message-mention[data-username="@${user_channel_name}"]`))
    divs.push(...document.querySelectorAll(`.info__text__status__name[data-username="${user_channel_name}"]`))
    divs.push(...document.querySelectorAll(`.info__text__status__name-ovg[data-username="${user_channel_name}"]`))
    divs.push(...document.querySelectorAll(`.card_username`))

    for (let div of divs) {
      div.innerHTML = div.innerHTML.replace(/ ([@a-zA-Z0-9_-]+) /ig, ` ${newusername} `)
    }
  },
  updateMoveHideChat(value) {
    if (!document.querySelector('.chat-container__btn-open--desktop')) return
    let button = document.querySelector('.chat-container__btn-open--desktop')
    let header = document.querySelector('wasd-chat-header .header')
    if (value) {
      header.insertAdjacentHTML('afterbegin', `<div class="chat-container__btn-open--desktop-ovg"><i _ngcontent-naa-c162="" class="wasd-icons-right"></i></div>`)
      header.querySelector('.chat-container__btn-open--desktop-ovg').addEventListener('click', () => button?.click())
    } else {
      document.querySelector('.chat-container__btn-open--desktop-ovg')?.remove()
    }
    if (button) button.style.display = document.querySelector('.chat-container__btn-open--desktop > i')?.className == 'wasd-icons-right' && value ? 'none' : ''
  },
  timeData() {
  },
  timerAboutStat: null,
  startTimerStatData() {
    const update = () => {
      $.ajax({
        url: `${HelperBWASD.host}/api/v1/stat/tv`,
        data: { channel_name: socket.channel?.channel?.channel_owner?.user_login },
        success: (data) => {
          document.querySelector('[data-tab="about"] .activeUsers').textContent = data.activeUsers// + '/' + data.users
          // document.querySelector('[data-tab="about"] .activeChannelUsers').textContent = data.activeChannelUsers
          // document.querySelector('[data-tab="about"] .activeChannel').textContent = socket.channel?.channel?.channel_owner?.user_login
        }
      });
    }
    update()
    if (this.timerAboutStat != null) return
    this.timerAboutStat = setInterval(update, 5000)
  },
  stopTimerStatData() {
    clearInterval(this.timerAboutStat)
    this.timerAboutStat = null
  },
  async punishment(type, JSData = {id:'', user_id:0}, duration = '1', keep_messages = true) {
    return new Promise((resolve) => {
      let streamId = document.querySelector('wasd-channel')?.dataset?.streamId || socket.streamId
      let channelId = document.querySelector('wasd-channel')?.dataset?.channelId || socket.channelId

      if (type.toString() == '0') {
        // socket. Удалить

        $.ajax({
          url: `https://wasd.tv/api/chat/streams/${streamId}/delete-messages`,
          type: "POST",
          data: {
            ids: [JSData.id],
            messages_owner_id: Number(JSData.user_id)
          },
          success: (out) => {
            ovg.log(out)
            resolve(true)
          },
          error: (err) => {
            resolve(false)
            let code = err.responseJSON.error.code
            ovg.warning(err.responseJSON)
            if (code == 'NO_ACCESS_RIGHTS') {
              HelperWASD.showChatMessage(`Вы не можете этого сделать`, 'warning')
            } else if (code == 'VALIDATION') {
              HelperWASD.showChatMessage(`Возможно сообщение уже удалено`, 'warning')
            }
          }
        })

      } else if (type.toString() == '1') {
        // socket. Тайм-аут

        $.ajax({
          url: `https://wasd.tv/api/channels/${channelId}/banned-users`,
          type: "PUT",
          data: {
            user_id: Number(JSData.user_id),
            stream_id: streamId,
            keep_messages: keep_messages,
            duration: Number(duration)
          },
          success: (out) => {
            ovg.log(out)
            resolve(true)
          },
          error: (err) => {
            let code = err.responseJSON.error.code
            ovg.warning(err.responseJSON)
            if (code == 'STREAMER_BAN_ALREADY_EXISTS') {
              HelperWASD.showChatMessage(`Пользователь уже заблокирован`, 'warning')
            } else if (code == 'USER_BAD_BAN_PERMISSIONS') {
              HelperWASD.showChatMessage(`Вы не можете этого сделать`, 'warning')
            } else if (code == 'VALIDATION') {
              HelperWASD.showChatMessage(`Возможно пользователь уже заблокирован`, 'warning')
            }
            resolve(false)
          }
        })

      } else if (type.toString() == '2') {
        // socket. Бан

        $.ajax({
          url: `https://wasd.tv/api/channels/${channelId}/banned-users`,
          type: "PUT",
          data: {
            user_id: Number(JSData.user_id),
            stream_id: streamId
          },
          success: (out) => {
            ovg.log(out)
            resolve(true)
          },
          error: (err) => {
            let code = err.responseJSON.error.code
            ovg.warning(err.responseJSON)
            if (code == 'STREAMER_BAN_ALREADY_EXISTS') {
              HelperWASD.showChatMessage(`Пользователь уже заблокирован`, 'warning')
            } else if (code == 'USER_BAD_BAN_PERMISSIONS') {
              HelperWASD.showChatMessage(`Вы не можете этого сделать`, 'warning')
            } else if (code == 'VALIDATION') {
              HelperWASD.showChatMessage(`Возможно пользователь уже заблокирован`, 'warning')
            }
            resolve(false)
          }
        })

      } else if (type.toString() == '3') {
        // socket. Разбан

        $.ajax({
          url: `https://wasd.tv/api/channels/${channelId}/banned-users/${JSData.user_id}`,
          type: "DELETE",
          success: (out) => {
            ovg.log(out)
            resolve(true)
          },
          error: (err) => {
            let code = err.responseJSON.error.code
            ovg.warning(err.responseJSON)
            if (code == 'STREAMER_BAN_NOT_FOUND') {
              HelperWASD.showChatMessage(`Пользователь не забанен`, 'warning')
            } else if (code == 'USER_BAD_BAN_PERMISSIONS') {
              HelperWASD.showChatMessage(`Вы не можете этого сделать`, 'warning')
            } else if (code == 'VALIDATION') {
              HelperWASD.showChatMessage(`Возможно пользователь уже заблокирован`, 'warning')
            }
            resolve(false)
          }
        })

      }
    })
  },
  setZeroSizeEmotes(html) {
    let allEmotes = {}
    for (let emote in HelperBTTV.emotes) allEmotes[emote] = HelperBTTV.emotes[emote]
    for (let emote in HelperBWASD.emotes) allEmotes[emote] = HelperBWASD.emotes[emote]
    for (let emote in HelperFFZ.emotes) allEmotes[emote] = HelperFFZ.emotes[emote]
    for (let emote in HelperTV7.emotes) allEmotes[emote] = HelperTV7.emotes[emote]

    let emotes = html.querySelectorAll('span > .bttv-emote')
    emotes.forEach((value, index) => {
      if ((allEmotes[value.dataset.code]?.zeroWidth || value.dataset.code == 'cvHazmat' || value.dataset.code == 'cvMask') && emotes[index-1]) {
        let emots = html.querySelectorAll('span > .bttv-emote:not(.modified-emote)')

        let modified = emotes[index-1]?.closest('.modified-emote') || emotes[index-1]
        if (!modified.classList.contains('modified-emote')) modified.dataset.title += '</br>'
        modified.classList.add('modified-emote')
        modified.dataset.title += '</br>&nbsp;'+value.dataset.code+'&nbsp; - модификация'

        let span = document.createElement('span')
        span.append(value)
        modified.append(span)
      }
    })
  },
  updateDeletedMessageStyle(value) {
    let deletedMessages = document.querySelectorAll('.block__messages__item[bwasd-deleted]')

    for (let node of deletedMessages) {
      if (value.toString() == '0') {
        node.querySelector('.message-text > span').textContent = '[сообщение удалено]'
      } else {
        let msg = document.querySelector(`.messages_history[bwasd] [data-id="${node.dataset.id}"]`)
        node.querySelector('.message-text_deleted > span').textContent = msg.dataset.message
      }
    }
  },
  add_chat() {
    if (!document.querySelector('wasd-chat-messages')) return
    HelperWASD.loadBwasdData()
    socket.join()

    HelperBWASD.emotes = {}
    HelperBWASD.subBadges = {}

    HelperWASD.isModerator = false
    HelperWASD.getIsModerator().then((resolve) => {
      HelperWASD.isModerator = resolve
      wasd.updatestyle();
    })

    HelperWASD.createPinMessages();

    document.querySelector('.update > i').classList.remove('resetPlayerLoading');
  },
  inputEvents(input) {
    let cachedFetchEmotes = []
    let cachedMatch = null
    let cachedIdx = null
    let cachedEmotes = null

    let cachedMessagesIdx = null
    $(input).bind('keydown', (e) => {

      if (settings.wasd.emotesAutoComplete) {
        if (e.keyCode != '9') {
          cachedFetchEmotes = []
          cachedMatch = null
          cachedIdx = null
          cachedEmotes = null
        } else {
          e.preventDefault()
          const start = input.selectionStart
          const seg = input.value.slice(0, start)

          if (!cachedMatch) cachedMatch = (seg.match(/\S+$/) || [])[0]

          const toLC = (t = '') => settings.wasd.emotesAutoCompleteIgnoreLowerCase ? t.toString().toLowerCase() : t

          if (!cachedFetchEmotes.length) {
            cachedEmotes = [...new Set([ ...Object.keys(HelperBTTV.emotes), ...Object.keys(HelperBWASD.emotes), ...Object.keys(HelperFFZ.emotes), ...Object.keys(HelperTV7.emotes) ])]
            if (settings.wasd.emotesAutoComplete.toString() == '1') {
              cachedFetchEmotes = cachedEmotes.filter(x => toLC(x).startsWith(toLC(cachedMatch)))
            } else if (settings.wasd.emotesAutoComplete.toString() == '2') {
              cachedFetchEmotes = cachedEmotes.filter(x => toLC(x).match(toLC(cachedMatch)))
            }
          }

          if (!cachedFetchEmotes.length) return

          if (typeof cachedIdx != 'number') {
            cachedIdx = 0
          } else {
            cachedIdx = (cachedIdx + 1) % cachedFetchEmotes.length
          }

          const newSeg = seg.replace(/\S+$/, cachedFetchEmotes[cachedIdx])
          input.value = newSeg + input.value.slice(start)
          input.setSelectionRange(newSeg.length, newSeg.length)
          input.dispatchEvent(new Event('input'))
        }
      }

      if (settings.wasd.recentMessagesOnArrows) {
        let tail = $(input).taliner()

        if (e.keyCode == '38' && tail.caretOnFirstLine) {
          e.preventDefault()
          // console.log('up')

          if (typeof cachedMessagesIdx == 'number') {
            cachedMessagesIdx--
            if (cachedMessagesIdx < 0) cachedMessagesIdx = HelperWASD.selfMessagesHistory.length-1
          } else {
            cachedMessagesIdx = HelperWASD.selfMessagesHistory.length-1
            if (input.value.trim() != '') HelperWASD.selfMessagesHistory.push(input.value)
          }

          if (typeof HelperWASD.selfMessagesHistory[cachedMessagesIdx] == 'string') {
            input.value = HelperWASD.selfMessagesHistory[cachedMessagesIdx]
            input.dispatchEvent(new Event('input'))
          }
        }

        if (e.keyCode == '40' && tail.caretOnLastLine) {
          e.preventDefault()
          // console.log('down')

          if (typeof cachedMessagesIdx == 'number') {
            cachedMessagesIdx++
            if (cachedMessagesIdx > HelperWASD.selfMessagesHistory.length-1) cachedMessagesIdx = null
          }

          if (cachedMessagesIdx == null) {
            input.value = ''
            input.dispatchEvent(new Event('input'))
          } else {
            input.value = HelperWASD.selfMessagesHistory[cachedMessagesIdx]
            input.dispatchEvent(new Event('input'))
          }
        }

        if (!(e.keyCode == '40' || e.keyCode == '38')) cachedMessagesIdx = null
      }
      
    });
  }
}