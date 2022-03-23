const Helper = {
  F5: `<a style="position: relative;" class="tooltip-wrapper" title="Eсли отключено 'Автоматически обновлять чат после изменения опции' нажмите дважды 'ОБНОВИТЬ ЧАТ'."><i _ngcontent-boj-c248="" class="wasd-icons-record-1" style="font-size: 14px;"></i></a>`,
  BETA: `<a style="position: relative;" class="tooltip-wrapper" title="Эта опция находится в стадии разработки и может работать некорректно."><i _ngcontent-boj-c248="" class="wasd-icons-beta" style="font-size: 14px;"></i></a>`,
  tooltip(text, data) {
    return `<a style="position: relative;" class="tooltip-wrapper" title='${data}'>${text == '' ? '<i _ngcontent-boj-c248="" class="wasd-icons-notice" style="font-size: 14px;"></i>' : text}</a>`
  },
  getDefaultSettings() {
    return {
      general: {
        autoUpdateChat: false,
        uiTransparency: false,
        saveCardPosition: false,
        cardPosition: {x: 0, y: 0},
        // extensionUpdated: true
      },
      wasd: {
        messageFollower: false,
        messageSub: false,
        messageSystem: false,
        messagePromoCodes: false,
        messageHover: true,
        wasdIconsSmile: false,
        wasdIconsCircleRu: false,
        webkitScrollbarWidth: false,
        giftsWrapperSide: false,
        giftsWrapperTopRight: false,
        sticker: "0",
        stickerovg: "1",
        paddingChatMessage: "4",
        colonAfterNickname: false,
        linkColor: "rgba(var(--wasd-color-switch--rgb),.88)",
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
        alternatingColorChatMessagesColor: "var(--wasd-color-prime)",
        onClickMention: "2",
        onClickUserName: "1",
        fixedLinks: true,
        uptimeStream: true,
        bttvEmotes: true,
        bttvInChatMenu: true,
        bttvEmoteSize: "2",
        linkRecognizerall: false,
        linkRecognizerWASD: true,
        decorationLink: true,
        videoOverlay: false,
        userNameEdited: {},
        onClickUser: "2",
        removeMentionBL: true,
        hidePanelMobile: true,
        formatMessageSentTime: "HH:mm",
        highlightMessagesOpenCard: false,
        highlightMessagesOpenCardColor: "rgba(var(--wasd-color-switch--rgb),.08)",
        alwaysOpenVolumeControl: false,
        colorMessageHover: "rgba(var(--wasd-color-switch--rgb),.08)",
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
        colorModOptions: "rgba(var(--wasd-color-switch--rgb),.08)",
        tv7Emotes: true,
        tv7InChatMenu: true,
        uptimeStreamMobile: false,
        highlightingWhenMentionList: {},
        hideWhenMentionList: {},
        hideRaid: false,
        fixCharactersBreakingChat: false,
        notifyOnMention: false,
        pinMessage: true,
        hoverTooltipEmote: true,
        limitHistoryUsers: "0",
        showOwnerBadge: true,
        showModeratorBadge: true,
        showSubBadge: true,
        showAdminBadge: true,
        showPromoCodeWin: true,
        truncateLink: 0,
        swapGiftAndInformationPlace: false,
        moveHideChat: false,
        autoPlayPreviewOnStreaming: true,
        bwasdEmotes: true,
        bwasdInChatMenu: true,
        copyMessage: false,
        showPartnerIcon: true,
        mentionSelf: true,
        colorMentionSelf: "rgba(var(--wasd-color-switch--rgb),.08)",
        сhatLineSeparator: 0,
        addContextBlacklistAddUser: true,
        colorCopuOptions: "rgba(var(--wasd-color-switch--rgb),.08)"
      },
      list: {
        blockUserList: {},
        blockTermList: {},
        highlightUserList: {},
        highlightTermList: {},
        blockRoleList: {}
      },
      highlightRole: {
        user: "#00000000",
        partner: "#00000000",
        admin: "#00000000",
        sub: "#00000000",
        moderator: "#00000000",
        owner: "#00000000"
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
    Helper.trySendMessage({
      notify: "create",
      title: title,
      message: body,
      username: username
    });
  },
  varColorToColor(value) {
    return value.replace(/var\(\D+\)/ig, ($0) => {
      data = $0.replace('var(', '').replace(')', '')
      return window.getComputedStyle(document.body).getPropertyValue(data).replace(/ /ig, '')
    })
  },
  setUnauthorization() {
    tv7AddUser.disabled = true
    tv7AddUser.placeholder = `Авторизуйтесь с помощью Twicth`

    bttvAddUser.disabled = true
    bttvAddUser.placeholder = `Авторизуйтесь с помощью Twicth`

    ffzAddUser.disabled = true
    ffzAddUser.placeholder = `Авторизуйтесь с помощью Twicth`
  },
  setAuthorization() {
    tv7AddUser.disabled = false
    tv7AddUser.placeholder = `Добавить новый канал (Twitch username)`

    bttvAddUser.disabled = false
    bttvAddUser.placeholder = `Добавить новый канал (Twitch username)`

    ffzAddUser.disabled = false
    ffzAddUser.placeholder = `Добавить новый канал (Twitch username)`
  },
  trySendMessage(arg) {
    if (chrome.runtime?.id) {
      chrome.runtime.sendMessage(arg);
    } else {
      let msg = alertify.warning(`Расширение было обновлено</br>Перезагрузите страницу`, 4.5)
      msg.callback = (isClicked) => {if (isClicked) location.reload()}
    }
  },
  buildBell() {
    $.ajax({
      url: `https://raw.githubusercontent.com/ovgamesdev/BetterWASD.data/main/info.json`,
      success: (out) => {
        out = JSON.parse(out)
        let data = out[BetterStreamChat.changelog.version]
        if (data) {

          ovg_bell__element.querySelector('.bell-info__list').innerHTML = ''

          for(let info in data.info) {

            let div = document.createElement('div'), linkhtml = ''
            div.setAttribute('_ngcontent-ljm-c288', '')
            div.classList.add('bell-info__elem')
            div.classList.add('ovg')
            div.setAttribute('bell_id', data.info[info].id)
            if (data.info[info].link) linkhtml = `<div _ngcontent-ljm-c288="" class="bell-info__link"><a _ngcontent-ljm-c288="" target="_blank" href="${data.info[info].link}"> ${data.info[info].linkText ? data.info[info].linkText : "Подробнее"} </a></div>`
            div.innerHTML = `<div _ngcontent-ljm-c288="" class="bell-info__text"> ${data.info[info].text} </div> ${linkhtml} <div _ngcontent-ljm-c288="" class="bell-info__date"> ${data.info[info].date} </div>`

            ovg_bell__element.querySelector('.bell-info__list').appendChild(div)
          }

          if (data.info.length == 0) {
            ovg_bell__element.style.display = 'none'
          } else {
            ovg_bell__element.style.display = ''
          }

          let wrap = document.querySelector('#bscSettingsPanel .bell__icon-wrap')
          if (Helper.isNotifyReaded()) {
            wrap.classList.remove('bell__icon-wrap--animation')
            wrap.classList.remove('bell__icon-wrap--new-msg')
          } else {
            wrap.classList.add('bell__icon-wrap--animation')
            wrap.classList.add('bell__icon-wrap--new-msg')
          }

        } else {
          ovg_bell__element.style.display = 'none'
        }
      }
    });
  },
  setNotifyReaded() {
    let list = document.querySelector('#bscSettingsPanel .bell-info__list')
    let notifyReaded = ''
    for (let node of list.childNodes) {
      notifyReaded += node.getAttribute('bell_id') + '&'
    }
    Cookies.set('BetterWASD_notify_readed', notifyReaded)

    let wrap = document.querySelector('#bscSettingsPanel .bell__icon-wrap')
    wrap.classList.remove('bell__icon-wrap--animation')
    wrap.classList.remove('bell__icon-wrap--new-msg')
  },
  isNotifyReaded() {
    let list = document.querySelector('#bscSettingsPanel .bell-info__list')
    let notifyReaded = ''
    for (let node of list.childNodes) {
      notifyReaded += node.getAttribute('bell_id') + '&'
    }
    return Cookies.get('BetterWASD_notify_readed') == notifyReaded
  },
  showSettings() {
    BetterStreamChat.settingsDiv.style.display = 'block'
    document.body.click()
    document.body.style.overflowY = "hidden";
    BetterStreamChat.settingsDiv.style.animationName = 'showbetterpanel';
    BetterStreamChat.settingsDiv.querySelector('.nav-sidebar__list.top').style.animationName = 'showbetterpanel_sidebar';
    BetterStreamChat.openSettings()
  },
  hideSettings() {
    BetterStreamChat.settingsDiv.style.animationName = 'hidebetterpanel';
    BetterStreamChat.settingsDiv.querySelector('.nav-sidebar__list.top').style.animationName = 'hidebetterpanel_sidebar';
    HelperWASD.stopTimerStatData()
    setTimeout(() => {
      BetterStreamChat.settingsDiv.style.display = 'none';
    }, 350);
    document.body.style.overflowY = "";
  },
  loginTwitchUI(username = '') {
    document.querySelector('.twitch_authorize_public').classList.add('disable')
    document.querySelector('.twitch_authorize_public').classList.add('medium')
    document.querySelector('.twitch_authorize_public').classList.remove('medium-cube')
    document.querySelector('.twitch_authorize_public .username').textContent = username
  },
  logoutTwitchUI() {
    document.querySelector('.twitch_authorize_public').classList.remove('disable')
    document.querySelector('.twitch_authorize_public').classList.remove('medium')
    document.querySelector('.twitch_authorize_public').classList.add('medium-cube')
    document.querySelector('.twitch_authorize_public .username').textContent = ''
  }
}