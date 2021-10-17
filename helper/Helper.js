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
        linkRecognizerall: true,
        linkRecognizerWASD: true,
        decorationLink: true,
        videoOverlay: false,
        userNameEdited: {},
        onClickUser: "2",
        removeMentionBL: true,
        hidePanelMobile: true,
        formatMessageSentTime: "HH:mm",
        mentionSelf: true,
        colorMentionSelf: "rgba(var(--wasd-color-switch--rgb),.08)",
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
        staticGifEmotes: "1",
        pinMessage: true,
        hoverTooltipEmote: true
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
        admin: "#00000000",
        sub: "#00000000",
        owner: "#00000000",
        moderator: "#00000000"
      },
      obschat: {
        theme: 1,
        mf: false,
        ms: false,
        bes: 0,
        st: 1,
        frs: 1,
        ss: 'large',
        can: false,
        catm: true,
        hmb: false,
        sm: false,
        lc: "rgba(var(--wasd-color-switch--rgb),.88)",
        fl: true,
        fmst: "HH:mm",
        cma: true,
        acd: 0,
        fcbc: false,
        stime: false,
        simg: false,
        sdm: 0,
        sl: 0,
        anim: 0,
        nma: 15000,
        mtc: "rgba(var(--wasd-color-switch--rgb), .88)",
        sbo: true,
        sbm: true,
        sbs: true,
        sba: true,

        bttv: '',
        ffz: '',
        tv7: '',
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
    chrome.runtime.sendMessage({
      notify: "create",
      title: title,
      message: body,
      username: username
    });
  },
  varColorToColor(value) {
    return value.replace(/var\(\D+\)/ig, ($0)=>{
      data = $0.replace('var(', '').replace(')', '')
      return window.getComputedStyle(document.body).getPropertyValue(data).replace(/ /ig, '')
    })
  }
}