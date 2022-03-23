const HelperSettings = {
  messageTimeout: null,
  availableSettings: {
    general: {
      autoUpdateChat: {
        title: 'Автоматическое обновление чата после изменения опций',
        type: 'boolean'
      },
      uiTransparency: {
        title: 'Прозрачность пользовательского интерфейса',
        type: 'boolean'
      },
      saveCardPosition: {
        title: 'Сохранять последнюю позицию карточки пользователя',
        type: 'boolean'
      },
      // extensionUpdated: {
      //   title: 'Получать уведомление, когда расширение получает новую версию',
      //   type: 'boolean'
      // },
      BETA: {
        title: `${Helper.BETA} - Эта опция находится в стадии разработки и может работать некорректно`,
        type: 'none'
      },
      F5: {
        title: `${Helper.F5} - Эта опция требует обновления чата`,
        type: 'none'
      }
    },
    wasd: {

      q: {
        title: 'Чат',
        id: 'ovg_settings_chat',
        type: 'title'
      },
      fontSize: {
        title: `Размер шрифта в пикселях ${Helper.BETA}`,
        type: 'number',
        min: 12.0,
        max: 18.0
      },
      chatWidth: {
        title: `Размер чата в пикселях ${Helper.tooltip('', "(Ширина) </br> не работает в СТРИМИНГОВАЯ")}`,
        type: 'number',
        min: 200,
        max: 1200
      },
      moveHideChat: {
        title: `Переместить кнопку 'Скрыть чат' в заголовок чата`,
        type: 'boolean',
        onChange: (value) => HelperWASD.updateMoveHideChat(value)
      },

      wasdIconsSmile: {
        title: 'Cкрыть "стикеры / смайлы" в панели ввода текста',
        type: 'boolean'
      },
      wasdIconsCircleRu: {
        title: 'Скрыть "поддержать" в панели ввода текста',
        type: 'boolean'
      },

      messageFollower: {
        title: 'Скрыть сообщение о новом фолловере',
        type: 'boolean'
      },
      messageSub: {
        title: 'Скрыть сообщение о новом подписчике',
        type: 'boolean'
      },
      messageSystem: {
        title: `Скрыть системные сообщения ${Helper.tooltip('', `Добро пожаловать, бан пользователя и др.`)}`,
        type: 'boolean'
      },
      messagePromoCodes: {
        title: `Скрыть промо сообщения ${Helper.tooltip('', `Например: ПОЛУЧИ УНИКАЛЬНЫЙ СТАТУС В ЧАТЕ!`)}`,
        type: 'boolean'
      },

      streamerMessage: {
        title: 'Скрыть сообщение стримеру (донат)',
        type: 'boolean'
      },

      addContextBlacklistAddUser: {
        title: `Добавить в контекст меню сообщения "Добавить в ЧС"`,
        type: 'boolean'
      },


      qq: {
        title: 'Строки в чате',
        type: 'podtitle'
      },

      alternatingColorChatMessages: {
        title: 'Отображать строки с меняющимися цветами фона',
        type: 'boolean',
        inInitChange: true,
        onChange: (value) => {
          if (value) {
            document.querySelector('#alternatingColorChatMessagesColor').classList.remove('disabled')
          } else {
            document.querySelector('#alternatingColorChatMessagesColor').classList.add('disabled')
          }
        }
      },
      alternatingColorChatMessagesColor: {
        title: 'Цвет для опции "Отображать строки с меняющимися цветами фона"',
        id: 'alternatingColorChatMessagesColor',
        type: 'color'
      },
      сhatLineSeparator: {
        title: `Разделитель строк в чате`,
        type: 'select',
        items: [
          {
            value: 0,
            label: 'Выключено'
          },
          {
            value: 1,
            label: 'Обычная линия (1п. сплошная)'
          },
          {
            value: 2,
            label: '3D линия (2п. канавка)'
          },
          {
            value: 3,
            label: '3D линия (2п. канавка со вставкой)'
          },
          {
            value: 4,
            label: 'Широкая линия (2п. сплошная)'
          }
        ]
      },
      formatMessageSentTime: {
        title: `Формат отметок времени ${Helper.tooltip('', 'Для новых сообщений')}`,
        description: 'Отформатировано <a target="_blank" href="https://momentjs.com/">library Moment.js</a>.',
        type: 'select',
        items: [
          {
            value: 'h:mm',
            label: '12 часов (2:15)'
          },
          {
            value: 'h:mm:ss',
            label: '12 часов с сек. (2:15:35)'
          },
          {
            value: 'H:mm',
            label: '24 часа (14:15)'
          },
          {
            value: 'H:mm:ss',
            label: '24 часа с сек. (14:15:35)'
          },
          {
            value: 'hh:mm',
            label: 'Доп. (02:15)'
          },
          {
            value: 'hh:mm:ss',
            label: 'Доп. с сек. (02:15:35)'
          },
          {
            value: 'HH:mm',
            label: 'Доп. 24 часа (14:15)'
          },
          {
            value: 'HH:mm:ss',
            label: 'Доп. 24 часа с сек. (14:15:35)'
          }
        ],
        onChange: (value) => HelperWASD.updateFormatMessageSentTime(value)
      },
      colonAfterNickname: {
        title: `Двоеточие после никнейма`,
        type: 'boolean',
        onChange: (value) => HelperWASD.updateColonAfterNickname(value)
      },
      colorMessageHover: {
        title: 'Цвет для опции "Подсвечивать сообщениие при наведении"',
        id: 'colorMessageHover',
        type: 'color'
      },
      messageHover: {
        title: 'Подсвечивать сообщениие при наведении',
        type: 'boolean',
        inInitChange: true,
        onChange: (value) => {
          if (value) {
            document.querySelector('#colorMessageHover').classList.remove('disabled')
          } else {
            document.querySelector('#colorMessageHover').classList.add('disabled')
          }
        }
      },
      paddingChatMessage: {
        title: 'Заполнение сообщений чата',
        type: 'select',
        items: [
          {
            value: 0,
            label: 'Twitch (5px 20px)'
          },
          {
            value: 1,
            label: 'YouTube (4px 24px)'
          },
          {
            value: 2,
            label: 'GoodGame (4px 9px)'
          },
          {
            value: 3,
            label: 'Другой (3px 15px)'
          },
          {
            value: 4,
            label: 'WASD (2px 12px)'
          }
        ]
      },


      qw: {
        title: 'Сообщество',
        type: 'podtitle'
      },

      topPanel: {
        title: 'Скрыть верхнюю панель (донат)',
        type: 'boolean'
      },
      topPanelChallenge: {
        title: 'Скрыть верхнюю панель (испытание)',
        type: 'boolean'
      },


      qe: {
        title: 'Смайлы',
        type: 'podtitle'
      },

      bwasdEmotes: {
        title: `Смайлики BWASD в чате ${Helper.F5}`,
        updateChat: true,
        type: 'boolean',
        inInitChange: true,
        onChange: (value) => {
          if (value) {
            document.querySelector('#bwasdInChatMenu').classList.remove('disabled')
          } else {
            document.querySelector('#bwasdInChatMenu').classList.add('disabled')
          }

          if (value || settings.wasd.bttvEmotes ||  settings.wasd.ffzEmotes || settings.wasd.tv7Emotes) {
            document.querySelector('#bttvEmoteSize').classList.remove('disabled')
            document.querySelector('#stickerovg').classList.remove('disabled')
            document.querySelector('#bttvSize').classList.remove('disabled')
            document.querySelector('#hoverTooltipEmote').classList.remove('disabled')
          } else {
            document.querySelector('#bttvEmoteSize').classList.add('disabled')
            document.querySelector('#stickerovg').classList.add('disabled')
            document.querySelector('#bttvSize').classList.add('disabled')
            document.querySelector('#hoverTooltipEmote').classList.add('disabled')
          }
        }
      },
      bttvEmotes: {
        title: `Смайлики BTTV в чате ${Helper.F5}`,
        updateChat: true,
        type: 'boolean',
        inInitChange: true,
        onChange: (value) => {
          if (value) {
            document.querySelector('#bttvInChatMenu').classList.remove('disabled')
          } else {
            document.querySelector('#bttvInChatMenu').classList.add('disabled')
          }

          if (settings.wasd.bwasdEmotes || value ||  settings.wasd.ffzEmotes || settings.wasd.tv7Emotes) {
            document.querySelector('#bttvEmoteSize').classList.remove('disabled')
            document.querySelector('#stickerovg').classList.remove('disabled')
            document.querySelector('#bttvSize').classList.remove('disabled')
            document.querySelector('#hoverTooltipEmote').classList.remove('disabled')
          } else {
            document.querySelector('#bttvEmoteSize').classList.add('disabled')
            document.querySelector('#stickerovg').classList.add('disabled')
            document.querySelector('#bttvSize').classList.add('disabled')
            document.querySelector('#hoverTooltipEmote').classList.add('disabled')
          }
        }
      },
      ffzEmotes: {
        title: `Смайлики FFZ в чате ${Helper.F5}`,
        updateChat: true,
        type: 'boolean',
        inInitChange: true,
        onChange: (value) => {
          if (value) {
            document.querySelector('#ffzInChatMenu').classList.remove('disabled')
          } else {
            document.querySelector('#ffzInChatMenu').classList.add('disabled')
          }

          if (settings.wasd.bwasdEmotes || settings.wasd.bttvEmotes ||  value || settings.wasd.tv7Emotes) {
            document.querySelector('#bttvEmoteSize').classList.remove('disabled')
            document.querySelector('#stickerovg').classList.remove('disabled')
            document.querySelector('#bttvSize').classList.remove('disabled')
            document.querySelector('#hoverTooltipEmote').classList.remove('disabled')
          } else {
            document.querySelector('#bttvEmoteSize').classList.add('disabled')
            document.querySelector('#stickerovg').classList.add('disabled')
            document.querySelector('#bttvSize').classList.add('disabled')
            document.querySelector('#hoverTooltipEmote').classList.add('disabled')
          }
        }
      },
      tv7Emotes: {
        title: `Смайлики 7TV в чате ${Helper.F5}`,
        updateChat: true,
        type: 'boolean',
        inInitChange: true,
        onChange: (value) => {
          if (value) {
            document.querySelector('#tv7InChatMenu').classList.remove('disabled')
          } else {
            document.querySelector('#tv7InChatMenu').classList.add('disabled')
          }

          if (settings.wasd.bwasdEmotes || settings.wasd.bttvEmotes ||  settings.wasd.ffzEmotes || value) {
            document.querySelector('#bttvEmoteSize').classList.remove('disabled')
            document.querySelector('#stickerovg').classList.remove('disabled')
            document.querySelector('#bttvSize').classList.remove('disabled')
            document.querySelector('#hoverTooltipEmote').classList.remove('disabled')
          } else {
            document.querySelector('#bttvEmoteSize').classList.add('disabled')
            document.querySelector('#stickerovg').classList.add('disabled')
            document.querySelector('#bttvSize').classList.add('disabled')
            document.querySelector('#hoverTooltipEmote').classList.add('disabled')
          }
        }
      },

      bttvEmoteSize: {
        title: `Разрешение смайликов в чате BWASD, BTTV, FFZ и 7TV`,
        id: 'bttvEmoteSize',
        type: 'select',
        items: [
          {
            value: 0,
            label: '~32px, 28px, 32px, 32px'
          },
          {
            value: 1,
            label: '~64px, 56px, 64px, 48px'
          },
          {
            value: 2,
            label: '~128px, 112px, 128px, 128px'
          }
        ],
        onChange: (value) => HelperWASD.updateBttvEmoteSize(value)
      },
      sticker: {
        title: `Отображение стикеров WASD ${Helper.tooltip('', "Мин. (увеличить при наведении) зависит от \u0022Настройки - Вид сообщений в чате - Большой размер стикеров\u0022")}`,
        type: 'select',
        items: [
          {
            value: 0,
            label: 'По умолчанию'
          },
          {
            value: 1,
            label: 'Минимизировать'
          },
          {
            value: 2,
            label: `Мин. (увеличить при наведении)`
          }, // (зависит от 'Вид сообщений в чате - Большой размер стикеров')
          {
            value: 3,
            label: 'Скрыть сообщение'
          },
          {
            value: 4,
            label: 'Показать сообщение: Стикер'
          }
        ]
      },
      stickerovg: {
        title: `Отображение стикеров BWASD, BTTV, FFZ и 7TV ${Helper.tooltip('', "Мин. (увеличить при наведении) зависит от \u0022Настройки - Вид сообщений в чате - Большой размер стикеров\u0022")}`,
        id: 'stickerovg',
        type: 'select',
        items: [
          {
            value: 0,
            label: 'По умолчанию'
          },
          {
            value: 1,
            label: 'Минимизировать'
          },
          {
            value: 2,
            label: `Мин. (увеличить при наведении)`
          }, // (зависит от 'Вид сообщений в чате - Большой размер стикеров')
          {
            value: 3,
            label: 'Скрыть сообщение'
          },
          {
            value: 4,
            label: 'Показать сообщение: Стикер'
          }
        ]
      },
      bttvSize: {
        title: 'Размер стикеров BWASD, BTTV, FFZ и 7TV',
        id: 'bttvSize',
        type: 'select',
        items: [
          {
            value: '128px',
            label: 'Большой'
          },
          {
            value: '56px',
            label: 'Маленький'
          }
        ]
      },

      hoverTooltipEmote: {
        title: `Подсказка для эмоций BWASD, BTTV, FFZ и 7TV при наведении`,
        id: 'hoverTooltipEmote',
        type: 'boolean',
        onChange: (value) => HelperWASD.updateHoverTooltipEmote(value)
      },
      forceResizeStickers: {
        title: 'Принудиельно изменять размер стикеров WASD',
        type: 'select',
        items: [
          {
            value: 0,
            label: 'Нет'
          },
          {
            value: 1,
            label: 'Большой'
          },
          {
            value: 2,
            label: 'Маленький'
          }
        ]
      },


      qr: {
        title: 'Встраиваемый контент',
        type: 'podtitle'
      },

      linkRecognizerall: {
        title: `Распознавание всех ссылок ${Helper.BETA} ${Helper.F5}`,
        updateChat: true,
        description: 'Распознано с использованием <a target="_blank" href="https://github.com/FrankerFaceZ/link-service">API</a>',
        type: 'boolean',
        inInitChange: true,
        onChange: (value) => {
          if (value || settings.wasd.linkRecognizerWASD) {
            document.querySelector('#linkRecognitionRights').classList.remove('disabled')
          } else {
            document.querySelector('#linkRecognitionRights').classList.add('disabled')
          }
        }
      },
      linkRecognizerWASD: {
        title: `Распознавание ссылок wasd.tv ${Helper.BETA} ${Helper.tooltip('', '(wasd.tv/username) (wasd.tv/game/id) (wasd.tv/?record=id) (wasd.tv/?clip=id)')} ${Helper.F5}`,
        updateChat: true,
        type: 'boolean',
        inInitChange: true,
        onChange: (value) => {
          if (value || settings.wasd.linkRecognizerall) {
            document.querySelector('#linkRecognitionRights').classList.remove('disabled')
          } else {
            document.querySelector('#linkRecognitionRights').classList.add('disabled')
          }
        }
      },
      linkRecognitionRights: {
        title: `Необходимый уровень пользователя для "Распознавание ссылок" ${Helper.F5}`,
        id: 'linkRecognitionRights',
        updateChat: true,
        type: 'select',
        items: [
          {
            value: 0,
            label: 'Стример'
          },
          {
            value: 1,
            label: 'Модератор'
          },
          {
            value: 2,
            label: 'Подписчик'
          },
          {
            value: 3,
            label: 'Каждый'
          }
        ]
      },


      qt: {
        title: 'Значки',
        type: 'podtitle'
      },

      showOwnerBadge: {
        title: `Показать значки создателя ${Helper.F5}`,
        updateChat: true,
        type: 'boolean'
      },
      showModeratorBadge: {
        title: `Показать значки модератора ${Helper.F5}`,
        updateChat: true,
        type: 'boolean'
      },
      showSubBadge: {
        title: `Показать значки подписчика ${Helper.F5}`,
        updateChat: true,
        type: 'boolean'
      },
      showAdminBadge: {
        title: `Показать значки администратора ${Helper.F5}`,
        updateChat: true,
        type: 'boolean'
      },
      showPromoCodeWin: {
        title: `Показать промо-значки ${Helper.F5}`,
        updateChat: true,
        type: 'boolean'
      },
      showPartnerIcon: {
        title: `Показать значки партнера`,
        type: 'boolean'
      },

      copyMessage: {
        title: `Добавить значок скопировать сообщение`,
        type: 'boolean'
      },
      colorCopuOptions: {
        title: 'Фон для значка (Скопировать сообщение)',
        type: 'color'
      },


      qy: {
        title: 'Поведение',
        type: 'podtitle'
      },

      artificialChatDelay: {
        title: 'Искусственная задержка чата',
        type: 'select',
        items: [
          {
            value: 0,
            label: 'По умолчанию'
          },
          {
            value: 300,
            label: 'Модерация ботов; (0,3 сек.)'
          },
          {
            value: 1200,
            label: 'Умеренная модерация; (1,2 сек.)'
          },
          {
            value: 5000,
            label: 'Убрать спойлеры (5 сек.)'
          },
          {
            value: 10000,
            label: 'Очень большая (10 сек.)'
          },
          {
            value: 15000,
            label: 'Крайне большая (15 сек.)'
          },
          {
            value: 20000,
            label: 'Задержать чат (20 сек.)'
          },
          {
            value: 30000,
            label: 'Полминуты (30 сек.)'
          },
          {
            value: 60000,
            label: 'Зачем??? (1 мин.)'
          }
        ]
      },
      notifyOnMention: {
        title: `PUSH уведомление при упоминании ${Helper.tooltip('', 'если окно не видно')} <wasd-button class="flat-btn ovg" style="display: inline-block;padding: 5px 0 5px 10px;"><button id="testNotify" class="basic fade ovg small" type="button"> Показать тестовое уведомление </button></wasd-button>`,
        type: 'boolean'
      },
      clickMentionAll: {
        title: `Ник пользователя в действиях это упоминание ${Helper.tooltip('', 'Избранное, Подписка')}`,
        type: 'boolean'
      },
      fixCharactersBreakingChat: {
        title: `Исправить символы ломающие чат ${Helper.F5} ${Helper.tooltip('', 'Текст Zalgo')}`,
        updateChat: true,
        description: 'С использованием <a target="_blank" href="https://github.com/mathiasbynens/strip-combining-marks/blob/master/README.md">library strip-combining-marks.js</a>.',
        type: 'boolean'
      },
      limitHistoryUsers: {
        title: `Лимит истории пользователей ${Helper.F5} ${Helper.tooltip('', 'для определения цвета пользователя и его карточки, рекомендуем \u0022без ограничения\u0022 но если у вас лагает рекотендуем снизить')}`,
        updateChat: true,
        type: 'select',
        items: [
          {
            value: 500,
            label: '500'
          },
          {
            value: 1000,
            label: '1000'
          },
          {
            value: 2000,
            label: '2000'
          },
          {
            value: 5000,
            label: '5000'
          },
          {
            value: 10000,
            label: '10000'
          },
          {
            value: 0,
            label: 'без ограничения'
          },
        ]
      },
      underlineUsernameAndMention: {
        title: 'Подчеркивать имя пользователя/упоминания при наведении',
        type: 'boolean'
      },

      onClickMention: {
        title: 'Действие при клике на упоминание пользователя',
        type: 'select',
        items: [
          {
            value: 0,
            label: 'Нет'
          },
          {
            value: 1,
            label: 'Добавить в текстовое поле'
          },
          {
            value: 2,
            label: 'Карточка пользователя'
          }
        ]
      },
      onClickUserName: {
        title: `Действие при клике на пользователя ${Helper.F5}`,
        updateChat: true,
        type: 'select',
        items: [
          {
            value: 0,
            label: 'Нет'
          },
          {
            value: 1,
            label: 'Добавить в текстовое поле'
          },
          {
            value: 2,
            label: 'Карточка пользователя'
          }
        ]
      },
      onClickUser: {
        title: `Действие при клике на пользователя или упоминание при зажатой клавише`,
        updateChat: true,
        type: 'select',
        items: [
          {
            value: 0,
            label: 'Нет'
          },
          {
            value: 1,
            label: 'Добавить в текстовое поле (Ctrl)'
          },
          {
            value: 2,
            label: 'Добавить в текстовое поле (Shift)'
          },
          {
            value: 3,
            label: 'Добавить в текстовое поле (Alt)'
          }
        ]
      },

      removeMentionBL: {
        title: `Удалять сообщения упоминающие пользователей в Фильтрация - Блокировка - Пользователи`,
        type: 'boolean'
      },


      qu: {
        title: 'Ссылки',
        type: 'podtitle'
      },

      linkColor: {
        title: 'Цвет ссылки',
        type: 'color',
      },
      truncateLink: {
        title: `Лимит символов ссылки ${Helper.F5} ${Helper.tooltip('', 'Удаляет символы в URL-адресах, чтобы текст ссылки не превышал указанную длину.')}`,
        id: 'truncateLink',
        updateChat: true,
        type: 'number',
        min: 0,
        max: 240
      },
      decorationLink: {
        title: 'Подчеркивать ссылки при наведении',
        type: 'boolean'
      },
      fixedLinks: {
        title: `Исправить ссылки в чате ${Helper.F5}`,
        updateChat: true,
        description: 'Исправлено с использованием <a target="_blank" href="https://linkify.js.org/">API</a>',
        type: 'boolean',
        inInitChange: true,
        onChange: (value) => {
          if (value) {
            document.querySelector('#truncateLink').classList.remove('disabled')
          } else {
            document.querySelector('#truncateLink').classList.add('disabled')
          }
        }
      },


      qi: {
        title: 'Меню смайлов',
        type: 'podtitle'
      },

      bwasdInChatMenu: {
        title: 'Опция BWASD в меню смайликов в чате',
        id: 'bwasdInChatMenu',
        type: 'boolean'
      },
      bttvInChatMenu: {
        title: 'Опция BTTV в меню смайликов в чате',
        id: 'bttvInChatMenu',
        type: 'boolean'
      },
      ffzInChatMenu: {
        title: 'Опция FFZ в меню смайликов в чате',
        id: 'ffzInChatMenu',
        type: 'boolean'
      },
      tv7InChatMenu: {
        title: 'Опция 7TV в меню смайликов в чате',
        id: 'tv7InChatMenu',
        type: 'boolean'
      },


      qo: {
        title: 'Фильтрация » Общие',
        type: 'podtitle'
      },

      highlightMessagesBold: {
        title: 'Выделять упоминания в чате жирным шрифтом',
        type: 'boolean'
      },
      colorAtTheMention: {
        title: `Упоминания пользователей в чата с их цветом никнейма ${Helper.BETA} ${Helper.F5}`,
        updateChat: true,
        type: 'boolean'
      },

      mentionSelf: {
        title: `Вид сообщения, упоминающие вас ${Helper.F5}`,
        updateChat: true,
        type: 'select',
        items: [
          {
            value: false,
            label: 'Нет'
          },
          {
            value: true,
            label: 'По умолчанию'
          },
          {
            value: 1,
            label: 'Выделить сообщение'
          }
        ],
        inInitChange: true,
        onChange: (value) => {
          if (value == '1') {
            document.querySelector('#colorMentionSelf').classList.remove('disabled')
          } else {
            document.querySelector('#colorMentionSelf').classList.add('disabled')
          }
        },
      },
      colorMentionSelf: {
        title: 'Цвет сообщения, упоминающие вас',
        id: 'colorMentionSelf',
        type: 'color'
      },


      qp: {
        title: 'Карточки пользователей',
        type: 'podtitle'
      },

      highlightMessagesOpenCardColor: {
        title: 'Цвет выделения сообщения пользователя с открытой карточкой',
        id: 'highlightMessagesOpenCardColor',
        type: 'color'
      },
      highlightMessagesOpenCard: {
        title: 'Выделять сообщения пользователей с открытыми карточками',
        type: 'boolean',
        inInitChange: true,
        onChange: (value) => {
          if (value) {
            document.querySelector('#highlightMessagesOpenCardColor').classList.remove('disabled')
          } else {
            document.querySelector('#highlightMessagesOpenCardColor').classList.add('disabled')
          }
        }
      },


      qa: {
        title: 'Меню модератора',
        type: 'podtitle'
      },

      moderatorMenu: {
        title: `Меню модератора ${Helper.F5}`,
        updateChat: true,
        type: 'select',
        items: [
          {
            value: 0,
            label: 'Нет'
          },
          // { value: 1, label: 'ALT меню (YouTube)' },
          {
            value: 2,
            label: 'Twitch'
          }
        ],
        inInitChange: true,
        onChange: (value) => {
          if (value.toString() === '2') {
            document.querySelector('#moderatorMenuAutomatic').classList.remove('disabled')
            document.querySelector('#moderatorMenuTimeout').classList.remove('disabled')
            document.querySelector('#keepMessagesTimeout').classList.remove('disabled')
          } else {
            document.querySelector('#moderatorMenuAutomatic').classList.add('disabled')
            document.querySelector('#moderatorMenuTimeout').classList.add('disabled')
            document.querySelector('#keepMessagesTimeout').classList.add('disabled')
          }
        }
      },
      moderatorMenuAutomatic: {
        title: 'Автоматически подтверждать бан/таймаут/удаление',
        id: 'moderatorMenuAutomatic',
        type: 'boolean'
      },
      moderatorMenuTimeout: {
        title: 'Срок блока (Временно заблокировать)',
        id: 'moderatorMenuTimeout',
        type: 'select',
        items: [
          {
            value: 1,
            label: '1 минута'
          },
          {
            value: 10,
            label: '10 минут'
          },
          {
            value: 60,
            label: '1 час'
          }
        ]
      },
      keepMessagesTimeout: {
        title: 'Удалить все сообщения (Временно заблокировать)',
        id: 'keepMessagesTimeout',
        type: 'boolean'
      },
      colorModOptions: {
        title: 'Фон для значка',
        type: 'color'
      },


      playerGeneral: {
        title: 'Проигрыватель',
        id: 'ovg_settings_player',
        type: 'title'
      },

      pictureInPicture: {
        title: "Добавить кнопку 'Картинка в картинке' к управлению проигрывателем (PIP)",
        type: 'boolean',
        onChange: (value) => HelperWASD.addPipToPlayer(value)
      },
      iframeCreateClip: {
        title: 'Создавать клипы в проигрывателе а не новом окне',
        type: 'boolean',
        onChange: (value) => HelperWASD.createClipByOvg(value)
      },



      w: {
        title: 'Воспроизведение',
        type: 'podtitle'
      },

      autoPlayStreamersOnMain: {
        title: 'Автовоспроизведение предложенных стримеров на главной странице',
        type: 'boolean',
        onChange: (value) => {
          if (value) {
            document.querySelector('.carousel__slide-body__player video')?.play()
          } else {
            document.querySelector('.carousel__slide-body__player video')?.pause()
          }
        }
      },
      autoPlayPreviewOnStreaming: {
        title: 'Автовоспроизведение предпросмотра стримера в стриминговой',
        type: 'boolean',
        onChange: (value) => {
          if (value) {
            document.querySelector('wasd-stream-preview video')?.play()
          } else {
            document.querySelector('wasd-stream-preview video')?.pause()
          }
        }
      },

      wq: {
        title: 'Громкость',
        type: 'podtitle'
      },

      mutePlayerOnMiddleMouse: {
        title: 'Заглушить или включить звук проигрывателя путём щелчка по средней кнопке мыши',
        type: 'boolean'
      },
      alwaysOpenVolumeControl: {
        title: 'Всегда раскрывать регулятор громкости',
        type: 'boolean'
      },

      ww: {
        title: 'Управление',
        type: 'podtitle'
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

      channelAppearance: {
        title: 'Внешний вид',
        id: 'ovg_settings_appearance',
        type: 'title'
      },

      e: {
        title: 'Канал',
        type: 'podtitle'
      },

      uptimeStream: {
        title: `Аптайм трансляции`,
        type: 'boolean',
        onChange: (value) => HelperWASD.updateUptimeStream(value)
      },
      uptimeStreamMobile: {
        title: `Заменить надпись 'в эфире' на аптайм трансляции`,
        type: 'boolean',
        onChange: (value) => HelperWASD.updateUptimeStreamMobile(value)
      },

      hideDonationChannelButton: {
        title: 'Скрыть кнопку пожертвования канал',
        type: 'boolean'
      },
      hideAmazingChannelButtoan: {
        title: 'Скрыть кнопку похвалить канал',
        type: 'boolean'
      },
      hideGiftButtons: {
        title: 'Скрыть подарочные кнопки',
        type: 'boolean'
      },
      swapGiftAndInformationPlace: {
        title: `Поменять панель подарков и информацию о стриме местами`,
        type: 'boolean'
      },
      hideRaid: {
        title: 'Скрыть рейд',
        type: 'boolean'
      },

      webkitScrollbarWidth: {
        title: 'Скрыть полосу прокрутки плеера',
        type: 'boolean'
      },
      giftsWrapperSide: {
        title: `Cкрыть полосу подарков ${Helper.tooltip('', 'справа и снизу')}`,
        type: 'boolean'
      },
      giftsWrapperTopRight: {
        title: `Скрыть подарки ${Helper.tooltip('', 'вверху справа')}`,
        type: 'boolean'
      },
      videoOverlay: {
        title: "Скрыть оверлей над проигрывателем",
        type: 'boolean'
      },

      eq: {
        title: 'Главная',
        type: 'podtitle'
      },

      hideBannerOnHome: {
        title: 'Скрыть баннер на главной странице',
        type: 'boolean'
      },

      ew: {
        title: 'Боковая навигация',
        type: 'podtitle'
      },

      chatOnTheLeft: {
        title: 'Поменять боковые панели местами',
        type: 'boolean'
      },

      ee: {
        title: 'Верхняя навигация',
        type: 'podtitle'
      },

      hideSelectorStreamSettings: {
        title: 'Скрыть кнопку "Начать стрим" в заголовке',
        type: 'boolean'
      },
      hideGreatRandom: {
        title: 'Скрыть кнопку "Великий рандом!" в заголовке',
        type: 'boolean'
      },

      er: {
        title: 'Мобильные устройства',
        type: 'podtitle'
      },

      hidePanelMobile: {
        title: 'Скрыть мешающие панели на мобильном устройстве',
        type: 'boolean'
      },
      chatMobilePlayer: {
        title: `Чат после проигрывателя ${Helper.tooltip('', 'Мобильные устройства')}`,
        type: 'boolean'
      }
    },
    highlightRole: {
      user: {
        title: 'Цвет для пользователя',
        type: 'color'
      },
      partner: {
        title: 'Цвет для WASD партнёра',
        type: 'color'
      },
      admin: {
        title: 'Цвет для администратора WASD',
        type: 'color'
      },
      sub: {
        title: 'Цвет для подписчика канала',
        type: 'color'
      },
      moderator: {
        title: 'Цвет для модератора канала',
        type: 'color'
      },
      owner: {
        title: 'Цвет для создателя канала',
        type: 'color'
      }
    }
  },
  showMessage(message, type = 'success') {
    if (this.messageTimeout) clearTimeout(this.messageTimeout);
    let statusElement = document.querySelector('#status');
    let textElement = statusElement.querySelector('p');
    textElement.innerHTML = message;
    textElement.classList.remove(...textElement.classList);
    textElement.classList.add(type);
    statusElement.classList.add('active');
    let hide = () => {
      statusElement.removeEventListener('click', hide);
      statusElement.classList.remove('active');
      this.messageTimeout = null;
    };
    statusElement.addEventListener('click', hide);
    if (message == 'Расширение было обновлено | Перезагрузите страницу')statusElement.addEventListener('click', () => {location.reload()});

    this.messageTimeout = setTimeout(hide, 2000);
  },
  _basic(title, description, formField, line = false, id) {
    return `
      <div class="option ${line ? "title" : ""}" ${id ? "id=" + id : ""}>
        <div class="ovg-option" >
          <div class="option-line" >

            <div class="labelField">
              ${line ? '<div class="line"></div>' : ''}
              <span ${line ? 'class="titleline"' : 'class="title"'}> ${title} </span>
              ${description ? `<span class="description"> ${description} </span>` : ''}
            </div>

            <div class="formField"> ${formField} </div>

          </div>
        </div>
      </div>`;
  },
  _podtitle(title, description, formField, line = false, id) {
    return `
      <div class="option podtitle" ${id ? "id=" + id : ""} style="min-height: 20px;">
        <div class="ovg-option" >
          <div class="option-line" >

            <div class="labelField">
              <div class="line"></div>
              <span class="titleline"> ${title} </span>
              ${description ? `<span class="description"> ${description} </span>` : ''}
            </div>

            <div class="formField"> ${formField} </div>

          </div>
        </div>
      </div>`;
  },
  save(optionElements) {
    let newSettings = JSON.parse(JSON.stringify(settings));
    let update = false

    for (let option of optionElements) {
      if (!option.dataset.name) continue;

      let split = option.dataset.name.split('_');
      let value = null;

      if (typeof option.getAttribute('updatechat') === 'string') update = true

      if (option.type === 'radio' && option.classList.contains('botevent')) {
        value = option.checked && option.value === '1';
      } else if (option.type === 'text' && option.classList.contains('botevent')) {
        value = option.value;
      } else if (option.type === 'radio') {
        value = option.checked && option.value === '1';
      } else if (option.type === 'checkbox') {
        value = option.checked;
      } else if (option.dataset.type === 'number' || option.type === 'number') {
        value = parseFloat(option.value);
      } else {
        value = option.value;
      }

      if (!newSettings[split[0]]) newSettings[split[0]] = {};

      newSettings[split[0]][split[1]] = value;

      let onChange = this.availableSettings[split[0]][split[1]].onChange;
      if (typeof onChange === 'function') onChange(value);
    }

    if (settings.general.autoUpdateChat && update) {
      setTimeout(() => {
        BetterStreamChat.settingsDiv.querySelector('.update').dispatchEvent(new Event('dblclick'))
      }, 50);
    }

    chrome.storage[storageType].set(newSettings, () => {
      alertify.success('параметры сохранены', 1.25);
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
          html += this.boolean(fieldName, setting.title, setting.description, settings[category][name], 'Вкл', 'Откл', setting.updateChat, setting.id);
        } else if (type === 'text') {
          html += this.text(fieldName, setting.title, setting.description, settings[category][name], setting.updateChat, setting.id);
        } else if (type === 'number') {
          html += this.number(fieldName, setting.title, setting.description, settings[category][name], setting.min, setting.max, setting.updateChat, setting.id);
        } else if (type === 'select') {
          html += this.select(fieldName, setting.title, setting.description, setting.items, settings[category][name], setting.updateChat, setting.id);
        } else if (type === 'none') {
          html += this.none(fieldName, setting.title, setting.description, settings[category][name]);
        } else if (type === 'title') {
          html += this.title(fieldName, setting.title, setting.description, settings[category][name], setting.id);
        } else if (type === 'color') {
          html += this.color(fieldName, setting.title, setting.description, settings[category][name], setting.updateChat, setting.id);
        } else if (type === 'botevent') {
          html += this.botevent(fieldName, setting.title, setting.description, settings[category][name], setting.updateChat, setting.id);
        } else if (type === 'podtitle') {
          html += this.podtitle(fieldName, setting.title, setting.description, settings[category][name], setting.id);
        }
      }
    }
    return html;
  },
  boolean(name, title, description, defaultValue = false, yesButton = 'Вкл', noButton = 'Откл', updateChat = false, id = '') {
    return this._basic(title, description, `
      <ol class="flexibleButtonGroup optionTypeBoolean">
        <label class="switch-ovg">
          <input option-type="boolean" type="checkbox" id="boolean_${name}" name="boolean_${name}" value="0" class="optionField" data-name="${name}" ${defaultValue ? 'checked' : ''}${updateChat ? " updatechat=''" : ""}>
          <span class="slider-ovg"> <div class="switcher_thumb-ovg"></div> </span>
        </label>
      </ol>`, false, id);
  },
  text(name, title, description, defaultValue = '', updateChat = false, id = '') {
    return this._basic(title, description, `
      <ol class="flexibleButtonGroup optionTypeBoolean">
        <input type="text" class="optionField" data-name="${name}" value="${defaultValue}"${updateChat ? " updatechat=''" : ""} />
      </ol>`, false, id);
  },
  number(name, title, description, defaultValue = '', min = 0, max = 0, updateChat = false, id = '') {
    return this._basic(title, description, `
      <ol class="flexibleButtonGroup optionTypeBoolean">
        <div class="def">
          <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-dirty ng-touched ng-valid">
            <div ovg="" class="wasd-input-wrapper" style="padding: 0 0 4px 0;">
              <div ovg="" class="wasd-input">
                <input ovg="" option-type="number" type="number" class="ng-pristine optionField ng-untouched ng-valid" data-name="${name}" value="${defaultValue}" ${min ? 'min="' + min + '" ' : ''}${max ? 'max="' + max + '"' : ''}${updateChat ? " updatechat=''" : ""}/>
              </div>
            </div>
          </wasd-input>
          <ovg-tooltip><div class="tooltip tooltip_position-topRight tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Правая кнопка мыши для сброса </div></div></ovg-tooltip>
        </div>
        <!--button class="optionField def" data-name="${name}" option-type="number"><div class="tooltip-ovg"> Сбросить по умолчанию </div><i _ngcontent-khk-c259="" class="wasd-icons-close"></i></button-->
      </ol>`, false, id);
  },
  select(name, title, description, items = [1], defaultValue = '', updateChat = false, id = '') {
    let selectOptions = '';
    defaultValue = defaultValue.toString();
    for (let item of items) {
      selectOptions += `<option value="${item.value}"${item.value.toString() === defaultValue ? ' selected' : ''}>${item.label}</option>`;
    }
    return this._basic(title, description, `
      <ol class="flexibleButtonGroup optionTypeBoolean">
        <div class="def">
          <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-dirty ng-touched ng-valid">
            <div ovg="" class="wasd-input-wrapper" style="padding: 0 0 4px 0;">
              <div ovg="" class="wasd-input">
                <select option-type="select" class="optionField" data-name="${name}"${updateChat ? " updatechat=''" : ""} style="padding-right: 35px;">${selectOptions}</select> <div class="accordion-header-arrow-ovg"><i class="wasd-icons-dropdown-top"></i></div>
                <ovg-tooltip><div class="tooltip tooltip_position-topRight tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Правая кнопка мыши для сброса </div></div></ovg-tooltip>
              </div>
            </div>
          </wasd-input>
        </div>
        <!--button class="optionField def" data-name="${name}" option-type="select"><div class="tooltip-ovg"> Сбросить по умолчанию </div><i _ngcontent-khk-c259="" class="wasd-icons-close"></i></button-->
      </ol>`, false, id);
  },
  none(name, title, description, defaultValue = '') {
    return this._basic(title, description, ``, false);
  },
  title(name, title, description, defaultValue = '', id = '') {
    return this._basic(title, description, ``, true, id);
  },
  color(name, title, description, defaultValue = '', updateChat = false, id = '') {
    defaultValue = Helper.varColorToColor(defaultValue)
    return this._basic(title, description, `
      <ol class="flexibleButtonGroup optionTypeBoolean">
        <div class="def">
          <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-dirty ng-touched ng-valid">
            <div ovg="" class="wasd-input-wrapper" style="padding: 0 0 4px 0;">
              <div ovg="" class="wasd-input clr-field" style="color: ${defaultValue};">
                <input ovg="" option-type="color" type="text" class="ng-pristine optionField ng-untouched ng-valid" data-name="${name}" value="${defaultValue}" data-coloris${updateChat ? " updatechat=''" : ""}/>
                <button aria-labelledby="clr-open-label"></button>
              </div>
            </div>
          </wasd-input>
          <ovg-tooltip><div class="tooltip tooltip_position-topRight tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Правая кнопка мыши для сброса </div></div></ovg-tooltip>
        </div>
        <button class="optionField def" data-name="${name}" option-type="color"><div class="tooltip-ovg"> Сбросить по умолчанию </div><i _ngcontent-khk-c259="" class="wasd-icons-close"></i></button>
      </ol>`, false, id);
  },
  botevent(name, title, description, defaultValue = ['', false], yesButton = 'Вкл', noButton = 'Откл', updateChat = false, id = '') {
    return this._basic(title, description, `
      <ol class="flexibleButtonGroup optionTypeBoolean">
        <input option-type="botevent" type="text" class="optionField botevent" data-name="${name}" value="${defaultValue[0]}"/>
        <li>
          <input option-type="botevent" type="radio" id="boolean_${name}" name="boolean_${name}" value="1" class="optionField botevent" data-name="${name}" ${defaultValue[1] ? 'checked' : ''}${updateChat ? " updatechat=''" : ""}>
          <label for="boolean_${name}" class="green"><span class="icon16 fa-check"></span> ${yesButton}</label>
        </li>
        <li>
          <input option-type="botevent" type="radio" id="boolean_${name}_no" name="boolean_${name}" value="0" class="optionField botevent" data-name="${name}" ${!defaultValue[1] ? 'checked' : ''}${updateChat ? " updatechat=''" : ""}>
          <label for="boolean_${name}_no" class="red"><span class="icon16 fa-times"></span> ${noButton}</label>
        </li>
      </ol>`, false, id);
  },
  podtitle(name, title, description, defaultValue = '', id = '') {
    return this._podtitle(title, description, ``, ``, id);
  }
}