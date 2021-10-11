const BetterStreamChat = {
  activeInstance: null,
  settingsDiv: null,
  isSettingsNewWindow: false,
  async init() {
    //<editor-fold desc="changelog">
    let changelogLabels = {
      added: '<span class="label" style="color: var(--wasd-color-text-prime);background: none;font-weight: 600;">Добавлено</span>',
      optimized: '<span class="label" style="color: var(--wasd-color-text-prime);background: none;font-weight: 600;">Оптимизировано</span>',
      changed: '<span class="label" style="color: var(--wasd-color-text-prime);background: none;font-weight: 600;">Изменено</span>',
      fixed: '<span class="label" style="color: var(--wasd-color-text-prime);background: none;font-weight: 600;">Исправлено</span>',
      removed: '<span class="label" style="color: var(--wasd-color-text-prime);background: none;font-weight: 600;">Удалено</span>'
    };
    let changelogList = [{
      version: '1.3.5',
      date: '2021-10-11',
      items: [{
        text: [
          `Настройки в новом окне.`,
          `Чат для OBS.`
        ],
        label: 'added'
      }, {
        text: [
          `Формат отметок времени для последние сообщения.`,
          `Нажмите клавишу...`
        ],
        label: 'optimized'
      }]
    },{
      version: '1.3.4',
      date: '2021-09-30',
      items: [{
        text: [
          `Выделение - Роль пользователя - Цвет для администратора WASD.`,
          `Подсказка для эмоций BTTV, FFZ и 7TV при наведении.`
        ],
        label: 'added'
      }, {
        text: [
          `Выделение - Роль пользователя.`,
          `Бэкап и восстановление.`,
          `Карточка пользователя.`,
          `Карточка пользователя - Последние сообщения.`
        ],
        label: 'optimized'
      }]
    }, {
      version: '1.3.3',
      date: '2021-09-26',
      items: [{
        text: [
          `СТРИМИНГОВАЯ - Карточка пользователя - Последние сообщения.`
        ],
        label: 'fixed'
      }, {
        text: [
          `Выделение - Роль пользователя.`,
          `Анимированные эмоции.`
        ],
        label: 'added'
      }, {
        text: [
          `Распознавание ссылок.`
        ],
        label: 'optimized'
      }]
    }, {
      version: '1.3.2',
      date: '2021-09-24',
      items: [{
        text: [
          `Карточка пользователя - Действия модерации.`,
          `Фильтрация.`,
          `PUSH уведомление при упоминании.`
        ],
        label: 'added'
      }, {
        text: [
          `Карточка пользователя - Ссылки на соц сети.`,
          `Отображение стикеров WASD.`,
          `Отображение стикеров BTTV, FFZ и 7TV.`,
          `Выделять сообщения, упоминающие вас.`
        ],
        label: 'optimized'
      }]
    }, {
      version: '1.3.1',
      date: '2021-09-16',
      items: [{
        text: [
          `Сообщение - Контекстное меню - Добавить в ЧС.`,
          `Меню модератора.`
        ],
        label: 'fixed'
      }, {
        text: [
          `Исправить символы ломающие чат (Текст Zalgo).`,
          `Заменить надпись 'в эфире' на аптайм трансляции.`,
          `Чат после проигрывателя (Мобильные устройства).`,
          `Cкрыть полосу подарков (справа и снизу).`,
          `Cкрыть рейд.`
        ],
        label: 'added'
      }, {
        text: [
          `Интерфейс.`
        ],
        label: 'optimized'
      }, {
        text: [
          `Cкрыть полосу подарков (справа).`,
          `Поддержка настроек прошлых версий > 1.2.`,
          `WebSocket для чата.`,
          `Меню модератора - YouTube.`
        ],
        label: 'removed'
      }]
    }, {
      version: '1.3',
      date: '2021-07-28',
      items: [{
        text: [
          `СТРИМИНГОВАЯ - Карточка пользователя - Последние сообщения.`
        ],
        label: 'fixed'
      }, {
        text: [
          `<a target="_blank" href="https://7tv.app/">7TV</a> эмоции.`,
          `Поддержка Firefox.`,
          `Чат после проигрывателя (Мобильные устройства).`,
          `Цвет для опции "Меню модератора".`
        ],
        label: 'added'
      }, {
        text: [
          `Карточка пользователя - Последние сообщения.`,
          `Распознавание ссылок`,
          `ЧС.`
        ],
        label: 'optimized'
      }]
    }, {
      version: '1.2.9',
      date: '2021-07-19',
      items: [{
        text: [
          `Меню модератора - Временно заблокировать.`,
          `Срок блока "Временно заблокировать" (Меню модератора).`,
          `Удалить все сообщения "Временно заблокировать" (Меню модератора).`,
        ],
        label: 'added'
      }, {
        text: [
          `ЧС.`,
          `Меню модератора - Забанить пользователя.`,
        ],
        label: 'changed'
      }]
    }, {
      version: '1.2.8',
      date: '2021-07-15',
      items: [{
        text: [
          `Распознавание ссылок.`,
          `Карточка пользователя - Последние сообщения.`,
          `BTTV и FFZ`
        ],
        label: 'optimized'
      }]
    }, {
      version: '1.2.7',
      date: '2021-07-13',
      items: [{
        text: [
          `Скрыть кнопку "Великий рандом!" в заголовке.`
        ],
        label: 'added'
      }, {
        text: [
          `Ошибка инициализации чата при нажатии на Великий рандом!.`
        ],
        label: 'fixed'
      }, {
        text: [
          `<a href="https://chrome.google.com/webstore/detail/fdgepfaignbakmmbiafocfjcnaejgldb" target="_blank">БОТ</a>.`
        ],
        label: 'removed'
      }]
    }, {
      version: '1.2.6',
      date: '2021-07-11',
      items: [{
        text: [
          'Ник пользователя в действиях это упоминание.'
        ],
        label: 'optimized'
      }, {
        text: [
          `Карточка пользователя - Последние сообщения - Роли пользователя.`
        ],
        label: 'added'
      }, {
        text: [
          `Карточка пользователя - Последние сообщения - APNG.`,
          `Принудительно изменять размер стикеров.`,
          `Прокрутка чата.`
        ],
        label: 'fixed'
      }]
    }, {
      version: '1.2.5.2',
      date: '2021-07-06',
      items: [{
        text: [
          'FFZ.'
        ],
        label: 'optimized'
      }]
    }, {
      version: '1.2.5.1',
      date: '2021-07-06',
      items: [{
        text: [
          'Инициализация FFZ.'
        ],
        label: 'fixed'
      }]
    }, {
      version: '1.2.5',
      date: '2021-07-06',
      items: [{
        text: [
          `Разделение BTTV и FFZ эмоций по вкладкам.`,
          `Удалить эмоции пользователя BTTV и FFZ.`,
          `Обновить эмоции пользователя BTTV и FFZ.`
        ],
        label: 'added'
      }, {
        text: [
          'Скрыть кнопку похвалить канал.',
          'Опция BTTV и FFZ в меню смайликов в чате.',
          'Чат в мобильной версии.',
          'Карточка пользователя - Стикеры канала - APNG.'
        ],
        label: 'optimized'
      }]
    }, {
      version: '1.2.4',
      date: '2021-07-04',
      items: [{
        text: [
          `Чат команды пользователя (Префикс в настройках BOT) (title, game).`,
          `<a target="_blank" href="https://www.frankerfacez.com/">FFZ</a> эмоции.`
        ],
        label: 'added'
      }, {
        text: [
          'БОТ.',
          'Инициализация.',
        ],
        label: 'optimized'
      }]
    }, {
      version: '1.2.3',
      date: '2021-07-02',
      items: [{
        text: [
          `Значение по умолчанию.`
        ],
        label: 'added'
      }, {
        text: [
          'Создавать клипы в проигрывателе а не новом окне.',
          'Искусственная задержка чата.',
          `Черный список.`
        ],
        label: 'optimized'
      }, {
        text: [
          'Распознавание упоминаний.',
          'Аптайм трансляции.'
        ],
        label: 'fixed'
      }]
    }, {
      version: '1.2.2',
      date: '2021-06-29',
      items: [{
        text: [
          `Карточка пользователя - Последние сообщения.`,
          `Создавать клип в проигрывателе а не новом окне.`
        ],
        label: 'optimized'
      }, {
        text: [
          'Инициализация private-стримы.',
          'Stream-settings - Карточка пользователя.',
          `Нажмите клавишу '...' чтобы ...`
        ],
        label: 'fixed'
      }]
    }, {
      version: '1.2.1',
      date: '2021-06-26',
      items: [{
        text: [
          `Карточка пользователя - Стикеры канала.`,
          `Создавать клипы в проигрывателе а не новом окне.`
        ],
        label: 'optimized'
      }, {
        text: [
          'Цвет ссылки.'
        ],
        label: 'changed'
      }, {
        text: [
          'Искусственная задержка чата.',
          'Чат команды пользователя (Префикс в настройках BOT) (user).',
          'Чат команды (Префикс в настройках BOT) (followers, followersoff, subscribers, subscribersoff).'
        ],
        label: 'added'
      }]
    }, {
      version: '1.2.0.2',
      date: '2021-06-22',
      items: [{
        text: [
          `Карточка пользователя - Перемещение.`,
          `Чат команды.`
        ],
        label: 'optimized'
      }, {
        text: [
          'Создавать клипы в проигрывателе а не новом окне.'
        ],
        label: 'added'
      }]
    }, {
      version: '1.2.0.1',
      date: '2021-06-22',
      items: [{
        text: [
          'Канал (скрыть) - Симпа - Всплывающая подсказка.'
        ],
        label: 'optimized'
      }]
    }, {
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
      }, {
        text: [
          `Карточка пользователя - Перемещение.`,
          `Чат команды.`
        ],
        label: 'optimized'
      }, {
        text: [
          `Карточка пользователя  - Последние сообщения - Размер шрифта.`,
          `Распознавание ссылок - Прокрутка.`,
          `Меню модератора - ALT - Ссылка.`,
          `Заполнение сообщений чата.`
        ],
        label: 'fixed'
      }, {
        text: [
          `Инициализация чата во время рейда.`,
          `Меню модератора.`
        ],
        label: 'changed'
      }]
    }, {
      version: '1.1.9',
      date: '2021-06-18',
      items: [{
        text: [
          `Чат команды (Префикс в настройках BOT) (title, game, uptime).`
        ],
        label: 'added'
      }, {
        text: [
          `Карточка пользователя.`,
          `Чат команды.`,
          `Распознавание ссылок.`
        ],
        label: 'optimized'
      }, {
        text: [
          `Аптайм трансляции.`
        ],
        label: 'changed'
      }]
    }, {
      version: '1.1.8',
      date: '2021-06-16',
      items: [{
        text: [
          `Чат команды (Префикс в настройках BOT) (ban, unban, mod, unmod, raid) (username).`
        ],
        label: 'added'
      }, {
        text: [
          `Ошибка инициализации чата при нажатии на StreamSettings.`
        ],
        label: 'fixed'
      }, {
        text: [
          'WebSocket для чата.'
        ],
        label: 'optimized'
      }]
    }, {
      version: '1.1.7',
      date: '2021-06-15',
      items: [{
        text: [
          'WebSocket для чата.'
        ],
        label: 'added'
      }, {
        text: [
          'Основные ошибки инициализации чата.'
        ],
        label: 'fixed'
      }, {
        text: [
          'Неавторизованные пользователи.',
          'Мобильные устройства.'
        ],
        label: 'optimized'
      }]
    }, {
      version: '1.1.6',
      date: '2021-06-08',
      items: [{
        text: [
          'Мобильные устройства.',
          'Чат в новом окне.'
        ],
        label: 'optimized'
      }]
    }, {
      version: '1.1.5',
      date: '2021-06-06',
      items: [{
        text: ['Черный список.'],
        label: 'added'
      }, {
        text: ['Размер шрифта в пикселях.'],
        label: 'optimized'
      }]
    }, {
      version: '1.1.4',
      date: '2021-06-04',
      items: [{
        text: [
          'Действие при клике на пользователя или упоминание пользователя при зажатой клавише.'
        ],
        label: 'added'
      }, {
        text: [
          'Театральный режим - Карточка пользователя - Последние сообщения.'
        ],
        label: 'fixed'
      }, {
        text: [
          'Меню смайликов - BTTV.',
          'Распознавание ссылок.'
        ],
        label: 'optimized'
      }]
    }, {
      version: '1.1.3',
      date: '2021-06-03',
      items: [{
        text: [
          'Карточка пользователя - Изменить ник.'
        ],
        label: 'added'
      }, {
        text: [
          'Карточка пользователя.', 'BTTV.',
          'Карточка пользователя - Последние сообщения - Стикеры.'
        ],
        label: 'optimized'
      }]
    }, {
      version: '1.1.2',
      date: '2021-06-01',
      items: [{
        text: [
          'Карточка пользователя - Последние сообщения.'
        ],
        label: 'added'
      }]
    }, {
      version: '1.1.1',
      date: '2021-05-29',
      items: [{
        text: [
          'Скрыть оверлей над проигрывателем.',
          'Скрыть сообщение о новом подписчике.',
          'Поиск эмоций.'
        ],
        label: 'added'
      }, {
        text: [
          'Скрыть системные сообщения.',
          'Распознаватель ссылок.'
        ],
        label: 'optimized'
      }, {
        text: [
          'Карточка пользователя - Перетаскивание.'
        ],
        label: 'fixed'
      }]
    }, {
      version: '1.1.0',
      date: '2021-05-24',
      items: [{
        text: [
          'Распознаватель ссылок. <a target="_blank" href="https://github.com/FrankerFaceZ/link-service">link-service</a>',
          'Карточка пользователя - Ссылки на соц сети.',
          'Разрешение смайликов в чате.'
        ],
        label: 'added'
      }, {
        text: [
          'BTTV.'
        ],
        label: 'optimized'
      }, {
        text: [
          'Карточка пользователя - Стикеры канала.'
        ],
        label: 'fixed'
      }]
    }, {
      version: '1.0.9',
      date: '2021-05-23',
      items: [{
        text: [
          '<a target="_blank" href="https://betterttv.com/">BTTV</a> эмоции.',
          'Бэкап и восстановление.'
        ],
        label: 'added'
      }]
    }, {
      version: '1.0.8.1',
      date: '2021-05-21',
      items: [{
        text: [
          'Аптайм трансляции.'
        ],
        label: 'added'
      }]
    }, {
      version: '1.0.8',
      date: '2021-05-20',
      items: [{
        text: [
          'Отображение стикеров - Минимизировать (увеличить при наведении).'
        ],
        label: 'added'
      }, {
        text: [
          'Цвет пользователя при упоминании.',
          'Темная тема.',
          'Карточка пользователя.'
        ],
        label: 'optimized'
      }]
    }, {
      version: '1.0.7',
      date: '2021-05-19',
      items: [{
        text: [
          'Исправить ссылки в чате.',
          'Карточка пользователя - Действие при клике на упоминание пользователя.',
          'BetterWASD кнопка в меню дополнительные опции.'
        ],
        label: 'added'
      }, {
        text: [
          'Ссылка.',
          'BetterWASD кнопка в настройках чата.'
        ],
        label: 'optimized'
      }, {
        text: [
          'Ссылка.',
          'При клике на упоминание добавить в текстовое поле.',
          'Отображать упоминания пользователей в чата с их цветом никнейма.',
          'Выделять упоминания в чате жирным шрифтом.'
        ],
        label: 'fixed'
      }]
    }, {
      version: '1.0.6',
      date: '2021-05-15',
      items: [{
        text: [
          'Чередование цвета сообщений в чате.',
          'Панель поиска.'
        ],
        label: 'added'
      }, {
        text: [
          'Alt меню модератора.'
        ],
        label: 'changed'
      }]
    }, {
      version: '1.0.5',
      date: '2021-05-13',
      items: [{
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
      }, {
        text: [
          'При клике на упоминание добавить в текстовое поле.'
        ],
        label: 'optimized'
      }, {
        text: [
          'F5.',
          'Отображение стикера.'
        ],
        label: 'fixed'
      }, {
        text: [
          'Маленькие значки.'
        ],
        label: 'removed'
      }]
    }, {
      version: '1.0.4',
      date: '2021-05-09',
      items: [{
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
    }, {
      version: '1.0.3',
      date: '2021-05-07',
      items: [{
        text: [
          'F5.'
        ],
        label: 'optimized'
      }]
    }, {
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
        }
      ]
    }, {
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
    }, {
      version: '1.0.0',
      date: '2021-05-03',
      items: [{
        text: [
          'Первый выпуск'
        ],
        label: 'added'
      }]
    }];
    //</editor-fold>
    let changelogHtml = '';
    for (let changelog of changelogList) {
      changelogHtml += `<h2 style="color: var(--wasd-color-text-prime);">Version ${changelog.version} (${changelog.date})</h2><ul style="display: grid;padding-inline-start: 4px;margin: 5px 0;">`;

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
    settingsDiv.innerHTML = `
      <div id="status">
        <p>
        </p>
      </div>
      <header>

        <div ovg="" class="burger-menu__wrap" style="width: 1.6rem;padding-left: 6px;"><div ovg="" class="burger-toggle show-section-mobile"><div ovg="" class="burger-toggle__icon icon-default"><i ovg="" class="wasd-icons-menu-burger"></i></div><div ovg="" class="burger-toggle__icon icon-active"><i ovg="" class="wasd-icons-close"></i></div></div></div>

        <div class="logo">
          <img src="chrome-extension://leildpnijdjakgapjimklcbkdgfpheck/img/icon128.png" style="width: 32px; height: 32px;">
          <div style="padding-left: 10px; font-size: 18px; width: 120px;">BetterWASD</div>
        </div>

        <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-valid ng-dirty ng-touched" id="settingsSearchDiv">
          <div ovg="" class="wasd-input-wrapper">
            <div ovg="" class="wasd-input">
              <input ovg="" id="settingsSearch" class="has-button ng-pristine ng-untouched ng-valid ui-autocomplete-input" placeholder="Поиск настроек" type="text" autocomplete="off" style="margin: 0;">
              <button ovg="" type="button" class="button-icon" style="top: 4px;">
                <i ovg="" class="wasd-icons-close"></i>
              </button>
            </div>
          </div>
        </wasd-input>
        
        <div style="width: 100%"></div>

        <wasd-button class="ghost-btn ovg head-buttons">
          <button class="basic medium-cube ovg hide-fullscreen fade" type="button">
            <i class="wasd-icons-show"></i>
          </button>
          <button class="basic medium-cube ovg updateemotes" type="button">
            <i class="wasd-icons-record"></i>
            <ovg-tooltip><div class="tooltip tooltip_position-bottomRight tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Обновить эмоции (нажмите дважды) </div></div></ovg-tooltip>
          </button>
          <button class="basic medium-cube ovg update" type="button">
            <i class="wasd-icons-record"></i>
            <ovg-tooltip><div class="tooltip tooltip_position-bottomRight tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Обновить чат (нажмите дважды) </div></div></ovg-tooltip>
          </button>
          <button class="basic medium-cube ovg hide-fullscreen newtab" type="button">
            <i class="ovg wasd-icons-extract"></i>
            <ovg-tooltip><div class="tooltip tooltip_position-bottomRight tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Открыть настройки в новом окне </div></div></ovg-tooltip>
          </button>
          <button class="basic medium-cube ovg hide-fullscreen close" type="button">
            <i class="ovg wasd-icons-close"></i>
          </button>
        </wasd-button>

      </header>

      <section class="ovg-tabs-wrapper vertical left">
        <div class="tabs">
          <div class="items" style="padding: 10px 0">
            <a role="tab" class="item" data-tab="about">О нас</a>
            <a role="tab" class="item" data-tab="general">Общий</a>
            <a role="tab" class="item active" data-tab="wasdSettings">Настройки</a>
            <a role="tab" class="item" data-tab="bttvSettings">BTTV</a>
            <a role="tab" class="item" data-tab="ffzSettings">FFZ</a>
            <a role="tab" class="item" data-tab="tv7Settings">7TV</a>
            <a role="tab" class="item" data-tab="filtration">Фильтрация</a>
            <a role="tab" class="item" data-tab="obschat">Чат для OBS (beta)</a>
            <a role="tab" class="item" data-tab="changelog">Журнал изменений</a>
            <a role="tab" class="item" data-tab="backup">Бэкап</a>
          </div>
        </div>
      </section>

      <main class="text" data-tab="about" style="background-color: var(--wasd-color-bg-prime);">
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
          <br><br>
          или скачайте БОТа для вашего WASD канала <a target="_blank" href="https://chrome.google.com/webstore/detail/fdgepfaignbakmmbiafocfjcnaejgldb/">Chrome Webstore</a>
          </h2><br>
        </div>
      </main>
      <main id="general" data-tab="general">
        ${HelperSettings.build('general')}
      </main>
      <main class="text" data-tab="bttvSettings">
        <h1 style="padding-left: 10px; padding-right: 10px;"> BetterTTV  </h1>
        <div>
            
          <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-valid ng-dirty ng-touched">
            <div ovg="" class="wasd-input-wrapper"><div ovg="" class="wasd-input">
              <label ovg=""></label>
              <input id="bttvAddUser" ovg="" class="has-button ng-pristine ng-untouched ng-valid" placeholder="Добавить новый канал (Twitch username)" type="text">
                <button id="bttvAddUserBtn" ovg="" type="button" class="button-icon">
                  <i ovg="" class="wasd-icons-add"></i>
                </button>
              </div>
            </div>
          </wasd-input>
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

        <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-valid ng-dirty ng-touched">
          <div ovg="" class="wasd-input-wrapper">
            <div ovg="" class="wasd-input">
              <label ovg=""></label>
              <input id="bttvemojiSearch" ovg="" class="has-button ng-pristine ng-untouched ng-valid" placeholder="Поиск эмоций" type="text">
              <button ovg="" type="button" class="button-icon">
                <i ovg="" class="wasd-icons-close"></i>
              </button>
            </div>
          </div>
        </wasd-input>

        <ul id="bttvEmoteList"></ul>
      </main>

      <main class="text" data-tab="ffzSettings">
        <h1 style="padding-left: 10px; padding-right: 10px;"> FrankerFaceZ </h1>
        <div>

          <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-valid ng-dirty ng-touched">
            <div ovg="" class="wasd-input-wrapper"><div ovg="" class="wasd-input">
              <label ovg=""></label>
              <input id="ffzAddUser" ovg="" class="has-button ng-pristine ng-untouched ng-valid" placeholder="Добавить новый канал (Twitch username)" type="text">
                <button id="ffzAddUserBtn" ovg="" type="button" class="button-icon">
                  <i ovg="" class="wasd-icons-add"></i>
                </button>
              </div>
            </div>
          </wasd-input>
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

        <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-valid ng-dirty ng-touched">
          <div ovg="" class="wasd-input-wrapper"><div ovg="" class="wasd-input">
            <label ovg=""></label>
            <input id="ffzemojiSearch" ovg="" class="has-button ng-pristine ng-untouched ng-valid" placeholder="Поиск эмоций" type="text">
              <button ovg="" type="button" class="button-icon">
                <i ovg="" class="wasd-icons-close"></i>
              </button>
            </div>
          </div>
        </wasd-input>

        <ul id="ffzEmoteList"></ul>
      </main>

      <main class="text" data-tab="tv7Settings">
        <h1 style="padding-left: 10px; padding-right: 10px;"> 7TV </h1>
        <div>

          <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-valid ng-dirty ng-touched">
            <div ovg="" class="wasd-input-wrapper"><div ovg="" class="wasd-input">
              <label ovg=""></label>
              <input id="tv7AddUser" ovg="" class="has-button ng-pristine ng-untouched ng-valid" placeholder="Добавить новый канал (Twitch username)" type="text">
                <button id="tv7AddUserBtn" ovg="" type="button" class="button-icon">
                  <i ovg="" class="wasd-icons-add"></i>
                </button>
              </div>
            </div>
          </wasd-input>
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
          <tbody class="tv7UserList ovg-items">
          </tbody>
        </table>

        <h2> Доступные эмоции 7TV </h2>

        <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-valid ng-dirty ng-touched">
          <div ovg="" class="wasd-input-wrapper"><div ovg="" class="wasd-input">
            <label ovg=""></label>
            <input id="tv7emojiSearch" ovg="" class="has-button ng-pristine ng-untouched ng-valid" placeholder="Поиск эмоций" type="text">
              <button ovg="" type="button" class="button-icon">
                <i ovg="" class="wasd-icons-close"></i>
              </button>
            </div>
          </div>
        </wasd-input>

        <ul id="tv7EmoteList"></ul>
      </main>

      <main class="active" data-tab="wasdSettings">
        ${HelperSettings.build('wasd')}
      </main>

      <main data-tab="obschat">
        <h1 style="padding: 20px 10px 5px 10px;"> Чат для OBS с эмоциями </h1>
        ${HelperSettings.build('obschat')}
        <p style="padding: 20px 10px 5px 10px;">Если вы обновите ссылку на закрытую трансляцию, то чат в доступе по ссылке перестанет работать! </p>
      </main>
      <iframe src="" class="obschat"></iframe>

      <main class="text" data-tab="changelog">
        <h1>Журнал изменений</h1>
        <h4 style="margin-top:10px;padding-left: 10px;padding-right: 0px;margin-bottom: 0px;"> Информацию о будущих версиях можно найти <a href="https://wasd.tv/ovgames/posts">тут</a></h4>
        ${changelogHtml}
      </main>

      <main class="text" data-tab="backup">
        <input id="importInput" type="file" accept=".backup, .backup.txt" style="display: none;">
        <span> Эта функция позволяет вам сохранить и восстановить ваши настройки BetterWASD </span>
        <div style="padding-top: 10px;">
          <div class="flat-btn ovg ovg-button-div" style="margin: 0px 10px 10px 10px;">
            <button class="primary medium ovg backup-download">
              <span class="ovg-button-span">
                <img style="width: 20px; height: 20px;" src="${chrome.extension.getURL("img/download.png")}">
              </span>
              <span> Сохранить </span>
            </button>
          </div>
          <div class="flat-btn ovg ovg-button-div" style="margin: 0px 10px 10px 10px;">
            <button class="primary medium ovg backup-upload">
              <span class="ovg-button-span">
                <img style="width: 20px; height: 20px;" src="${chrome.extension.getURL("img/upload.png")}">
              </span>
              <span> Восстановить </span>
            </button>
          </div>
          <div class="flat-btn ovg ovg-button-div" style="margin: 0px 10px 10px 10px;">
            <button class="backup-reset medium ovg warning">
              <span class="ovg-button-span">
              <i class="wasd-icons-record" style="font-size: 20px;"></i></span><span class=""> Сбросить по умолчанию </span>
              <ovg-tooltip><div class="tooltip tooltip_position-bottomRight tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> нажмите дважды </div></div></ovg-tooltip>
            </button>
          </div>
        </div>
        <div id="backupDropContainer" class="drodHere">Drop Here</div>
      </main>

      <main class="text" data-tab="filtration">
        <h1 style="padding-left: 10px; padding-right: 10px;"> Фильтрация </h1>
        
        <div class="blacklist">
          <h3 style="padding-left: 10px; padding-right: 10px;"> Блокировка - Пользователи </h3>
          <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-valid ng-dirty ng-touched">
            <div ovg="" class="wasd-input-wrapper">
              <div ovg="" class="wasd-input">
                <label ovg=""></label>
                <input id="blacklistAddUser" ovg="" class="has-button ng-pristine ng-untouched ng-valid" placeholder=" Добавить пользователя " type="text">
                <button id="blacklistAddUserBtn" ovg="" type="button" class="button-icon">
                  <i ovg="" class="wasd-icons-add"></i>
                </button>
              </div>
            </div>
          </wasd-input>

          <table class="table-ovg user">
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
            <tbody class="ovg-items">
            </tbody>
          </table>


          <h3 style="padding-left: 10px; padding-right: 10px;"> Блокировка - Термины </h3>
          <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-valid ng-dirty ng-touched">
            <div ovg="" class="wasd-input-wrapper">
              <div ovg="" class="wasd-input">
                <label ovg=""></label>
                <input id="blacklistAddTerm" ovg="" class="has-button ng-pristine ng-untouched ng-valid" placeholder=" Добавить термин " type="text">
                <button id="blacklistAddTermBtn" ovg="" type="button" class="button-icon">
                  <i ovg="" class="wasd-icons-add"></i>
                </button>
              </div>
            </div>
          </wasd-input>

          <table class="table-ovg term">
            <thead class="thead-ovg">
              <th class="table-heading-ovg">
                <div class="table-heading-text-ovg">Термин</div>
              </th>
              <th class="table-heading-ovg">
                <div class="table-heading-text-ovg">Время добавления</div>
              </th>
              <th class="table-heading-ovg remove">
                <div class="table-heading-text-ovg">Действия</div>
              </th>
            </thead>
            <tbody class="ovg-items">
            </tbody>
          </table>
        </div>

        <div class="highlight">
          <h3 style="padding-left: 10px; padding-right: 10px;"> Выделение - Пользователи </h3>
          <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-valid ng-dirty ng-touched">
            <div ovg="" class="wasd-input-wrapper">
              <div ovg="" class="wasd-input">
                <label ovg=""></label>
                <input id="highlightAddUser" ovg="" class="has-button ng-pristine ng-untouched ng-valid" placeholder=" Добавить пользователя " type="text">
                <button id="highlightAddUserBtn" ovg="" type="button" class="button-icon">
                  <i ovg="" class="wasd-icons-add"></i>
                </button>
                <div class="clr-field" style="color: #00000000;">
                <button aria-labelledby="clr-open-label"></button>
                <input id="highlightAddUserColor" type="text" value="#00000000" data-coloris>
                  </div>
              </div>
            </div>
          </wasd-input>

          <table class="table-ovg user">
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
            <tbody class="ovg-items">
            </tbody>
          </table>


          <h3 style="padding-left: 10px; padding-right: 10px;"> Выделение - Термины </h3>
          <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-valid ng-dirty ng-touched">
            <div ovg="" class="wasd-input-wrapper">
              <div ovg="" class="wasd-input">
                <label ovg=""></label>
                <input id="highlightAddTerm" ovg="" class="has-button ng-pristine ng-untouched ng-valid" placeholder=" Добавить термин " type="text">
                <button id="highlightAddTermBtn" ovg="" type="button" class="button-icon">
                  <i ovg="" class="wasd-icons-add"></i>
                </button>
                <div class="clr-field" style="color: #00000000;">
                <button aria-labelledby="clr-open-label"></button>
                <input id="highlightAddTermColor" type="text" value="#00000000" data-coloris>
                </div>
              </div>
            </div>
          </wasd-input>

          <table class="table-ovg term">
            <thead class="thead-ovg">
              <th class="table-heading-ovg">
                <div class="table-heading-text-ovg">Термин</div>
              </th>
              <th class="table-heading-ovg">
                <div class="table-heading-text-ovg">Время добавления</div>
              </th>
              <th class="table-heading-ovg remove">
                <div class="table-heading-text-ovg">Действия</div>
              </th>
            </thead>
            <tbody class="ovg-items">
            </tbody>
          </table>
          <h3 style="padding: 0 10px 5px 10px;"> Выделение - Роль пользователя </h3>
          <div style="margin-left: -10px; width: calc(100% + 20px);">
            ${HelperSettings.build('highlightRole')}
          </div>
        </div>
      </main>
      <footer>
      <span>BetterWASD ${changelogList[0].version} (${changelogList[0].date})</span>
      <span>
        Offered by <a href="https://ovgamesdev.github.io/ru/" target="_blank">OvGames</a> | <a href="https://wasd.tv/ovgames" target="_blank">WASD</a>
      </span>`;
    document.body.append(settingsDiv);

    // bttv events
    bttvAddUserBtn.addEventListener('click', () => {
      HelperBTTV.tryAddUser();
    });
    var bttvAddUser = settingsDiv.querySelector('#bttvAddUser')
    bttvAddUser.addEventListener('keyup', (event) => {
      if (event.key !== 'Enter') return;
      HelperBTTV.tryAddUser();
    });

    // ffz events
    ffzAddUserBtn.addEventListener('click', () => {
      HelperFFZ.tryAddUser();
    });
    var ffzAddUser = settingsDiv.querySelector('#ffzAddUser')
    ffzAddUser.addEventListener('keyup', (event) => {
      if (event.key !== 'Enter') return;
      HelperFFZ.tryAddUser();
    });

    // tv7 events
    tv7AddUserBtn.addEventListener('click', () => {
      HelperTV7.tryAddUser();
    });
    tv7AddUser.addEventListener('keyup', (event) => {
      if (event.key !== 'Enter') return;
      HelperTV7.tryAddUser();
    });


    // filtration events
    blacklistAddUserBtn.addEventListener('click', () => {
      text = blacklistAddUser.value
      if (text != '') HelperWASD.addUserToBL(text)
    });
    blacklistAddUser.addEventListener('keyup', (event) => {
      if (event.key !== 'Enter') return;
      text = blacklistAddUser.value
      HelperWASD.addUserToBL(text)
    });


    blacklistAddTermBtn.addEventListener('click', () => {
      text = blacklistAddTerm.value
      if (text != '') HelperWASD.addTermToBL(text)
    });
    blacklistAddTerm.addEventListener('keyup', (event) => {
      if (event.key !== 'Enter') return;
      text = blacklistAddTerm.value
      HelperWASD.addTermToBL(text)
    });


    highlightAddUserBtn.addEventListener('click', () => {
      text = highlightAddUser.value
      if (text != '') HelperWASD.addUserToHL(text)
    });
    highlightAddUser.addEventListener('keyup', (event) => {
      if (event.key !== 'Enter') return;
      text = highlightAddUser.value
      HelperWASD.addUserToHL(text)
    });


    highlightAddTermBtn.addEventListener('click', () => {
      text = highlightAddTerm.value
      if (text != '') HelperWASD.addTermToHL(text)
    });
    highlightAddTerm.addEventListener('keyup', (event) => {
      if (event.key !== 'Enter') return;
      text = highlightAddTerm.value
      HelperWASD.addTermToHL(text)
    });


    for (let user of Object.keys(settings.list.blockUserList)) {
      HelperWASD.addUserToBlackList(user)
    }
    for (let term of Object.keys(settings.list.blockTermList)) {
      HelperWASD.addTermToBlackList(term)
    }
    for (let user of Object.keys(settings.list.highlightUserList)) {
      HelperWASD.addUserToHighLight(user)
    }
    for (let term of Object.keys(settings.list.highlightTermList)) {
      HelperWASD.addTermToHighLight(term)
    }


    // bind fade settings
    settingsDiv.querySelector('.fade').addEventListener('click', () => {
      settingsDiv.classList.toggle('faded')
      settingsDiv.querySelector('.fade > i').classList.toggle('wasd-icons-show')
      settingsDiv.querySelector('.fade > i').classList.toggle('wasd-icons-hide')
    });

    // bind close settings 
    settingsDiv.querySelector('.close').addEventListener('click', () => {
      settingsDiv.style.animationName = 'hidebetterpanel';
      setTimeout(() => {
        settingsDiv.style.display = 'none';
      }, 350);
      document.body.style.overflowY = "";
      if (settingsDiv.classList.contains('faded')) {
        settingsDiv.querySelector('.fade').click()
      }
    });

    // bind update chat 
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
          }
        }
      } else {
        if (settingsDiv.classList.contains('fullscreen')) {
          chrome.runtime.sendMessage({
            update_chat: true
          });
        } else {
          HelperSettings.showMessage(`Чат не найден.`, 'error');
        }
      }
    });

    // bind newtab settings
    settingsDiv.querySelector('.newtab').addEventListener('click', () => {
      let settings_window = window.open('https://wasd.tv/chat?helper-settings=settings', '_blank', 'location=yes,height=500,width=800')
      BetterStreamChat.isSettingsNewWindow = true
      var timer_settings_window = setInterval(() => { 
        if(settings_window.closed) {
          clearInterval(timer_settings_window);
          BetterStreamChat.isSettingsNewWindow = false
        }
      }, 200);
      window.onunload = () => { settings_window?.close() }
      settingsDiv.querySelector('.close').click()
    });

    // bind update emotes 
    settingsDiv.querySelector('.updateemotes').addEventListener('dblclick', () => {
      let header_block_menu = document.querySelector('.header > div.header__block__menu')

      settingsDiv.querySelector('.updateemotes > i').classList.add('resetPlayerLoading');
      setTimeout(() => {
        settingsDiv.querySelector('.updateemotes > i').classList.remove('resetPlayerLoading');
      }, 1000);

      HelperBTTV.updateEmotesBttv();
      HelperFFZ.updateEmotesFfz()
      HelperTV7.updateEmotesTv7()
    });

    // bind search settings
    var filter1, ul1, options1, title1, titleline1, i1;
    settingsSearch.addEventListener('input', () => {
      filter1 = settingsSearch.value.toUpperCase();
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
    var bttvfilter, bttvul, bttvoptions, bttvtitle, bttvtitleline, bttvi;
    bttvemojiSearch.addEventListener('input', () => {
      bttvfilter = bttvemojiSearch.value.toUpperCase();
      bttvul = document.querySelector("main[data-tab='bttvSettings'] > #bttvEmoteList");
      bttvoptions = bttvul.querySelectorAll(".div_emoteCard");
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

    var ffzfilter, ffzul, ffzoptions, ffztitle, ffztitleline, ffzi;
    ffzemojiSearch.addEventListener('input', () => {
      ffzfilter = ffzemojiSearch.value.toUpperCase();
      ffzul = document.querySelector("main[data-tab='ffzSettings'] > #ffzEmoteList");
      ffzoptions = ffzul.querySelectorAll(".div_emoteCard");
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

    var tv7filter, tv7ul, tv7options, tv7title, tv7titleline, tv7i;
    tv7emojiSearch.addEventListener('input', () => {
      tv7filter = tv7emojiSearch.value.toUpperCase();
      tv7ul = document.querySelector("main[data-tab='tv7Settings'] > #tv7EmoteList");
      tv7options = tv7ul.querySelectorAll(".div_emoteCard");
      for (tv7i = 0; tv7i < tv7options.length; tv7i++) {
        tv7title = tv7options[tv7i].querySelector("span");
        if (tv7title) {
          if (tv7title.textContent.toUpperCase().indexOf(tv7filter) != -1) {
            tv7options[tv7i].style.display = "";
          } else {
            tv7options[tv7i].style.display = "none";
          }
        }
      }
    });

    // backup
    settingsDiv.querySelector('.backup-upload').addEventListener('click', () => {
      settingsDiv.querySelector('#importInput').click()
    });

    settingsDiv.querySelector('input#importInput').onchange = (() => {
      let files = settingsDiv.querySelector('input#importInput').files[0]
      var reader = new FileReader()
      reader.onload = processFile(files)
      if (files.name.indexOf('.backup') == files.name.length - 7 || files.name.indexOf('.backup.txt') == files.name.length - 11) {
        reader.readAsText(files)
      } else {
        HelperSettings.showMessage(`только .backup файлы`, 'error');
      }
    })

    function processFile(theFile) {
      return function(e) {
        chrome.storage[storageType].set(JSON.parse(e.target.result), () => {
          location.reload()
          chrome.runtime.sendMessage({
            location: 'reload'
          });
          HelperSettings.showMessage(`reload`)
        })
      }
    }

    // show-section-mobile
    settingsDiv.querySelector('.show-section-mobile').addEventListener('click', () => {
      settingsDiv.querySelector('section').classList.toggle('mobile-show')
      settingsDiv.querySelector('.show-section-mobile').classList.toggle('active')
    });


    /************/

    settingsDiv.ondragenter = function(e) {
      e.preventDefault();
    };
    settingsDiv.ondragover = function(e) {
      e.preventDefault();
      this.classList.add('dragoverbackup');
    }
    settingsDiv.ondragleave = function(e) {
      e.preventDefault();
      this.classList.remove('dragoverbackup');
    }
    settingsDiv.ondrop = function(e) {
      e.preventDefault();
      this.classList.remove('dragoverbackup');
    };


    backupDropContainer.ondragenter = function(e) {
      e.preventDefault();
    };
    backupDropContainer.ondragover = function(e) {
      e.preventDefault();
      this.classList.add('dragover');
    }
    backupDropContainer.ondragleave = function(e) {
      e.preventDefault();
      this.classList.remove('dragover');
    }
    backupDropContainer.ondrop = function(e) {
      e.preventDefault();
      this.classList.remove('dragover');
      var reader = new FileReader();
      reader.onload = processFile(e.dataTransfer.files[0]);
      let n = e.dataTransfer?.files[0]?.name

      if (n && n.indexOf('.backup') == n.length - 7 || n && n.indexOf('.backup.txt') == n.length - 11) {
        reader.readAsText(e.dataTransfer.files[0]);
      } else {
        HelperSettings.showMessage(`только .backup файлы`, 'error');
      }
    };

    /************/

    settingsDiv.querySelector('.backup-download').addEventListener('click', () => {
      HelperWASD.download(`BetterWASD-settings.backup`, JSON.stringify(settings));
    });

    settingsDiv.querySelector('.backup-reset').addEventListener('dblclick', () => {
      chrome.storage[storageType].set(Helper.getDefaultSettings(), () => {
        location.reload()
        chrome.runtime.sendMessage({
          location: 'reload'
        });
      })
    });

    // navigation
    for (let navItem of settingsDiv.querySelectorAll('section .items > a')) {
      navItem.addEventListener('click', ({
        target
      }) => {
        let links = settingsDiv.querySelectorAll('section .items > a');
        let tabs = settingsDiv.querySelectorAll('main');
        for (let element of [...tabs, ...links]) {
          element.classList.remove('active');
        }

        if (target.getAttribute('data-tab') == 'wasdSettings') {
          settingsSearchDiv.classList.remove('hidden')
        } else {
          settingsSearchDiv.classList.add('hidden')
        }

        if (target.getAttribute('data-tab') == 'obschat') {
          loadObsChat()
        } else {
          unloadObsChat()
        }

        target.classList.add('active');
        settingsDiv.querySelector(`main[data-tab="${target.dataset.tab}"]`).classList.add('active');
      });
    }

    function loadObsChat() {
      // https://ovgamesdev.github.io/BetterWASD.obs_chat/preview
      // http://localhost/preview
      settingsDiv.querySelector('iframe.obschat').src = `https://ovgamesdev.github.io/BetterWASD.obs_chat/preview/?channel_name=${HelperWASD.channel_name}&private-stream=${HelperWASD.closedViewUrl}&settings=${encodeURI(JSON.stringify(settings.obschat)).replace(/#/ig, 'HASH')}`
    }
    function unloadObsChat() {
      if (settingsDiv.querySelector('iframe.obschat').src != '') settingsDiv.querySelector('iframe.obschat').src = ''
    }

    settingsDiv.querySelector('.ovg-tabs-wrapper').addEventListener('click', () => {
      settingsDiv.querySelector('.show-section-mobile')?.click()
    })



    // to def
    for (let option of settingsDiv.querySelectorAll('.optionField.def')) {
      option.addEventListener('click', (event) => {
        let split = event.target.dataset.name.split('_');
        switch (event.target.getAttribute('option-type')) {
          // case 'boolean':
          //     event.target.parentElement.querySelector(`input[id=boolean_${event.target.getAttribute('data-name')}]`).checked = Helper.getDefaultSettings()[split[0]][split[1]]
          //     HelperSettings.save([event.target.parentElement.querySelector('input[type="checkbox"]')])
          //     break;
          // case 'text':
          //     event.target.parentElement.querySelector('input[type="text"]').value = Helper.getDefaultSettings()[split[0]][split[1]]
          //     HelperSettings.save([event.target.parentElement.querySelector('input[type="text"]')])
          //     break;
          case 'number':
            event.target.parentElement.querySelector('input[type="number"]').value = Helper.getDefaultSettings()[split[0]][split[1]]
            event.target.parentElement.querySelector('input[type="number"]').dispatchEvent(new Event('change'));
            break;
          case 'select':
            event.target.parentElement.querySelector('select').value = Helper.getDefaultSettings()[split[0]][split[1]]
            event.target.parentElement.querySelector('select').dispatchEvent(new Event('change'));
            break;
          case 'color':
            let defVal = Helper.varColorToColor(Helper.getDefaultSettings()[split[0]][split[1]])
            event.target.parentElement.querySelector('input[data-coloris]').value = defVal
            event.target.parentElement.style.color = defVal
            event.target.parentElement.querySelector('input[data-coloris]').dispatchEvent(new Event('change'));
            break;
            // case 'botevent':
            //     if (Helper.getDefaultSettings()[split[0]][split[1]]) {
            //         event.target.parentElement.querySelector(`input[id=boolean_${event.target.getAttribute('data-name')}]`).click()
            //     } else {
            //         event.target.parentElement.querySelector(`input[id=boolean_${event.target.getAttribute('data-name')}_no]`).click()
            //     }
            //     event.target.parentElement.querySelector('input[type="text"]').value = Helper.getDefaultSettings()[split[0]][split[1]][0]
            //     HelperSettings.save([event.target.parentElement.querySelector('input[type="text"]')])
            //     break;
          default:
            ovg.log('def')
            break;
        }
      });
    }

    for (let option of settingsDiv.querySelectorAll('.optionField')) {
      option.addEventListener('contextmenu', (event) => {
        let split = event.target.dataset.name.split('_');
        switch (event.target.getAttribute('option-type')) {
          // case 'boolean':
          //     event.target.parentElement.querySelector(`input[id=boolean_${event.target.getAttribute('data-name')}]`).checked = Helper.getDefaultSettings()[split[0]][split[1]]
          //     HelperSettings.save([event.target.parentElement.querySelector('input[type="checkbox"]')])
          //     break;
          // case 'text':
          //     event.target.parentElement.querySelector('input[type="text"]').value = Helper.getDefaultSettings()[split[0]][split[1]]
          //     HelperSettings.save([event.target.parentElement.querySelector('input[type="text"]')])
          //     break;
          case 'number':
            event.target.parentElement.querySelector('input[type="number"]').value = Helper.getDefaultSettings()[split[0]][split[1]]
            event.target.parentElement.querySelector('input[type="number"]').dispatchEvent(new Event('change'));
            break;
          case 'select':
            event.target.parentElement.querySelector('select').value = Helper.getDefaultSettings()[split[0]][split[1]]
            event.target.parentElement.querySelector('select').dispatchEvent(new Event('change'));
            break;
          case 'color':
            let defVal = Helper.varColorToColor(Helper.getDefaultSettings()[split[0]][split[1]])
            event.target.parentElement.querySelector('input[data-coloris]').value = defVal
            event.target.parentElement.style.color = defVal
            event.target.parentElement.querySelector('input[data-coloris]').dispatchEvent(new Event('change'));
            break;
            // case 'botevent':
            //     if (Helper.getDefaultSettings()[split[0]][split[1]]) {
            //         event.target.parentElement.querySelector(`input[id=boolean_${event.target.getAttribute('data-name')}]`).click()
            //     } else {
            //         event.target.parentElement.querySelector(`input[id=boolean_${event.target.getAttribute('data-name')}_no]`).click()
            //     }
            //     event.target.parentElement.querySelector('input[type="text"]').value = Helper.getDefaultSettings()[split[0]][split[1]][0]
            //     HelperSettings.save([event.target.parentElement.querySelector('input[type="text"]')])
            //     break;
          default:
            ovg.log('def')
            break;
        }
        event.preventDefault();
      });
    }



    // change event
    for (let option of settingsDiv.querySelectorAll('.optionField')) {
      option.addEventListener('change', (event) => {
        HelperSettings.save([event.target]);

        let split = option.dataset.name.split('_');
        let value = null;

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

        chrome.runtime.sendMessage({
          update_save: {
            split: split,
            value: value
          }
        })

      });
    }

    $("#blacklistAddUser").autocomplete({
      source: function(request, response) {
        $.ajax({
          url: `https://wasd.tv/api/search/profiles?limit=5&offset=0&search_phrase=${blacklistAddUser.value.toLowerCase()}`,
          success: function(data) {
            response($.map(data?.result?.rows, function(item) {
              return {
                label: item.user_login,
                value: item.user_login,
                logo: item.profile_image.small
              }
            }));
          }
        });
      }
    });

    $("#highlightAddUser").autocomplete({
      source: function(request, response) {
        $.ajax({
          url: `https://wasd.tv/api/search/profiles?limit=5&offset=0&search_phrase=${highlightAddUser.value.toLowerCase()}`,
          success: function(data) {
            response($.map(data?.result?.rows, function(item) {
              return {
                label: item.user_login,
                value: item.user_login,
                logo: item.profile_image.small
              }
            }));
          }
        });
      }
    });

    $("#bttvAddUser").autocomplete({
      source: function(request, response) {
        $.ajax({
          url: `https://api.twitch.tv/kraken/search/channels?query=${bttvAddUser.value.toLowerCase()}&limit=5`,
          headers: {
            'Client-ID': 'iteua36t3bn764geiij8px2tr5w5bl',
            Accept: 'application/vnd.twitchtv.v5+json'
          },
          success: function(data) {
            response($.map(data.channels, function(item) {
              return {
                label: item.display_name,
                value: item.display_name,
                logo: item.logo
              }
            }));
          }
        });
      }
    });

    $("#ffzAddUser").autocomplete({
      source: function(request, response) {
        $.ajax({
          url: `https://api.twitch.tv/kraken/search/channels?query=${ffzAddUser.value.toLowerCase()}&limit=5`,
          headers: {
            'Client-ID': 'iteua36t3bn764geiij8px2tr5w5bl',
            Accept: 'application/vnd.twitchtv.v5+json'
          },
          success: function(data) {
            response($.map(data.channels, function(item) {
              return {
                label: item.display_name,
                value: item.display_name,
                logo: item.logo
              }
            }));
          }
        });
      }
    });

    $("#tv7AddUser").autocomplete({
      source: function(request, response) {
        $.ajax({
          url: `https://api.twitch.tv/kraken/search/channels?query=${tv7AddUser.value.toLowerCase()}&limit=5`,
          headers: {
            'Client-ID': 'iteua36t3bn764geiij8px2tr5w5bl',
            Accept: 'application/vnd.twitchtv.v5+json'
          },
          success: function(data) {
            response($.map(data.channels, function(item) {
              return {
                label: item.display_name,
                value: item.display_name,
                logo: item.logo
              }
            }));
          }
        });
      }
    });

    // bind wasd-input
    for (let wasdinput of settingsDiv.querySelectorAll('wasd-input')) {
      let label = wasdinput.querySelector('label[ovg]')
      let input = wasdinput.querySelector('input[ovg]')
      let text = input?.placeholder
      if (label) label.textContent = text
      wasdinput.querySelector('input').addEventListener('focus', () => {
        label?.classList.add('show')
        input.placeholder = ''
      })
      wasdinput.querySelector('input').addEventListener('blur', () => {
        label?.classList.remove('show')
        input.placeholder = text
      })
      wasdinput.querySelector('button')?.addEventListener('click', () => {
        input.value = ''
        input.dispatchEvent(new Event('input'))
      })
    }

    testNotify.addEventListener('click', () => {
      Helper.notify(`Тест`, `Тестовое уведомление`, 'test')
    })

    // load bttv, ffz and 7tv emotes
    await HelperBTTV.update();
    HelperBTTV.loaded();

    await HelperFFZ.update();
    HelperFFZ.loaded();

    await HelperTV7.update();
    HelperTV7.loaded();

    // load chat
    HelperWASD.loaded();

    $( "#bscSettingsPanel" ).draggable({ containment: "body", scroll: false, cursor: "move", drag: function( event, ui ) {
      ui.position.left = Math.max( (bscSettingsPanel.clientWidth / 2), ui.position.left );
      ui.position.top = Math.max( (bscSettingsPanel.clientHeight / 2), ui.position.top );
    }});

    this.install();
  },
  install() {
    this.activeInstance = 'wasd'
    wasd.init();
  },
  uninstall() {
    wasd.uninstall();
    this.activeInstance = null;
  },
  update() {
    if (this.activeInstance) {
      wasd.update();
      $('.blacklist .user .ovg-items').empty();
      for (let user of Object.keys(settings.list.blockUserList)) {
        HelperWASD.addUserToBlackList(user)
      }

      $('.blacklist .term .ovg-items').empty();
      for (let term of Object.keys(settings.list.blockTermList)) {
        HelperWASD.addTermToBlackList(term)
      }

      $('.highlight .user .ovg-items').empty();
      for (let user of Object.keys(settings.list.highlightUserList)) {
        HelperWASD.addUserToHighLight(user)
      }

      $('.highlight .term .ovg-items').empty();
      for (let term of Object.keys(settings.list.highlightTermList)) {
        HelperWASD.addTermToHighLight(term)
      }
    }
  },
  openSettings() {
    if (HelperWASD.closedViewUrl  == '' || HelperWASD.channel_name == '') {
      $.ajax({
        url: `https://wasd.tv/api/v2/profiles/current/broadcasts/closed-view-url`,
        success: function(out) {
          HelperWASD.closedViewUrl = out.result.view_url.replace('https://wasd.tv/private-stream/', '')
          $.ajax({
            url: `https://wasd.tv/api/v2/profiles/current`,
            success: function(out) {
              HelperWASD.channel_name = out.result.user_profile.user_login
            }
          });
        }
      });
    }
  }
}




$.widget("app.autocomplete", $.ui.autocomplete, {
  _renderItem: function(ul, item) {
    var result = this._super(ul, item);
    if (item.logo) {
      result.find("div").addClass("ui-menu-item-icon").css("background-image", "url(" + item.logo + ")");
    }
    return result;
  }
});