const BetterStreamChat = {
  activeInstance: null,
  settingsDiv: null,
  isSettingsNewWindow: false,
  changelog: '',
  async init() {
    let changelogLabels = {
      fixedwasd: '<span class="label" style="color: var(--wasd-color-text-prime);background: none;font-weight: 600;">Исправлено (Мешает работе WASD.TV)</span>',
      fixed: '<span class="label" style="color: var(--wasd-color-text-prime);background: none;font-weight: 600;">Исправлено</span>',
      added: '<span class="label" style="color: var(--wasd-color-text-prime);background: none;font-weight: 600;">Добавлено</span>',
      changed: '<span class="label" style="color: var(--wasd-color-text-prime);background: none;font-weight: 600;">Изменено</span>',
      optimized: '<span class="label" style="color: var(--wasd-color-text-prime);background: none;font-weight: 600;">Оптимизировано</span>',
      removed: '<span class="label" style="color: var(--wasd-color-text-prime);background: none;font-weight: 600;">Удалено</span>'
    };
    let changelogList = [
      {
        version: '1.6',
        date: '2022-04-18T21:00:56.564Z',
        items: [{
          text: [
            `Стиль удаленных сообщений.`
          ],
          label: 'added'
        }, {
          text: [
            'Меню модератора.',
            'Цвет ссылки.'
          ],
          label: 'fixed'
        }, {
          text: [
            `Подсказка для эмоций BWASD, BTTV, FFZ и 7TV при наведении.`
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.5.9',
        date: '2022-04-17T21:00:00.000Z',
        items: [{
          text: [
            `Меню модератора - Как у BTTV.`,
            `7TV поддержка всех ZeroWidth эмоций.`,
            `FFZ поддержка глобальных ZeroWidth эмоций.`,
            `Показывать последние сообщения в окне ввода на клавишу «&uarr;» и «&darr;».`
          ],
          label: 'added'
        }, {
          text: [
            'Меню модератора - Twitch.'
          ],
          label: 'fixed'
        }, {
          text: [
            `7TV | BetterTTV | FrankerFaceZ | BetterWASD эмоции.`,
            `Аптайм трансляции`,
            'WebSocket.',
            `Формат отметок времени`
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.5.8',
        date: '2022-04-15T17:40:00.000Z',
        items: [{
          text: [
            `Автозаполнение эмоции через Tab.`,
            `Игнорировать БОЛЬШИЕ БУКВЫ для "Автозаполнение эмоции через Tab".`
          ],
          label: 'added'
        }, {
          text: [
            'Режим кинотеатра.'
          ],
          label: 'fixed'
        }, {
          text: [
            `7TV | BetterTTV | FrankerFaceZ | BetterWASD эмоции.`,
            'Карточка пользователя.',
            'WebSocket.'
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.5.7',
        date: '2022-04-08',
        items: [{
          text: [
            `Чат после проигрывателя.`,
            `Разделитель строк в чате.`,
            `Режим кинотеатра`
          ],
          label: 'fixed'
        }, {
          text: [
            `Режим кинотеатра - В полноэкранном режиме.`,
          ],
          label: 'added'
        }, {
          text: [
            `Исправить символы ломающие чат.`,
            `Режим кинотеатра - Показать кнопки подарков.`,
            `Режим кинотеатра - Скрыть подарки.`
          ],
          label: 'changed'
        }, {
          text: [
            `Карточка пользователя.`,
            `Режим кинотеатра.`,
            `Распознавание всех ссылок.`
          ],
          label: 'optimized'
        }, {
          text: [
            `Отображение стикеров BWASD, BTTV, FFZ и 7TV - Мин. (увеличить при наведении).`,
          ],
          label: 'removed'
        }]
      }, {
        version: '1.5.6',
        date: '2022-03-28',
        items: [{
          text: [
            `Карточка пользователя - Последние сообщения.`
          ],
          label: 'fixed'
        }, {
          text: [
            `Проигрыватель » Режим кинотеатра.`,
          ],
          label: 'added'
        }, {
          text: [
            `Карточка пользователя - Стикеры.`,
            `Добавить кнопку 'Картинка в картинке' к управлению проигрывателем (PIP).`,
            `Фильтрация - Выделение - Роль пользователя.`
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.5.5',
        date: '2022-03-25',
        items: [{
          text: [
            `Аптайм трансляции.`
          ],
          label: 'fixed'
        }, {
          text: [
            `Оформление.`,
            `Значок подписчика в списке пользователей.`
          ],
          label: 'added'
        }, {
          text: [
            `WebSocket.`
          ],
          label: 'optimized'
        }]
      }, {
        version: '1.5.4',
        date: '2022-03-23',
        items: [{
          text: [
            `Скрыть баннер на главной странице.`,
            `Поменять боковые панели местами.`,
            `Скрыть кнопку "Начать стрим" в заголовке.`,
            `Скрыть кнопку "Великий рандом!" в заголовке.`
          ],
          label: 'fixed'
        }, {
          text: [
            `Фон для значка (Скопировать сообщение).`
          ],
          label: 'added'
        }, {
          text: [
            `Отображение стикеров WASD.`
          ],
          label: 'optimized'
        }]
      }
    ];

    let changelogHtml = '';
    for (let changelog of changelogList.slice(0, 5)) {
      changelogHtml += `<h2 style="color: var(--wasd-color-text-prime);">Version ${changelog.version} (${moment(changelog.date).format('YYYY-MM-DD')})</h2><ul style="display: grid;padding-inline-start: 4px;margin: 5px 0;">`;

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
          item.text += ` (<a target="_blank" href="https://github.com/ovgamesdev/BetterWASD.tv/issues/${item.issueID}">#${item.issueID}</a>)`;
        }
      }
      changelogHtml += '</ul>';
    }

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

        <div class="header__left-side">
          <div ovg="" class="burger-menu__wrap mobile" style="width: 1.6rem;padding-left: 6px;"><div ovg="" class="burger-toggle show-section-mobile"><div ovg="" class="burger-toggle__icon icon-default"><i ovg="" class="wasd-icons-menu-burger"></i></div><div ovg="" class="burger-toggle__icon icon-active"><i ovg="" class="wasd-icons-close"></i></div></div></div>

          <div ovg="" class="header-new__nav-sidebar-toggle nav-sidebar-toggle open-nav-sidebar">
            <i ovg="" class="wasd-icons-sidebar-burgermenu-closed nav-sidebar-toggle__icon-default"></i>
            <i ovg="" class="wasd-icons-sidebar-burgermenu-opened nav-sidebar-toggle__icon-active"></i>
          </div>

          <a class="logo">
            <img alt="BetterWASD.TV" src="">
            <div class="logo__mob" tabindex="0"></div>
          </a>

          <wasd-input class="ng-valid ng-dirty ng-touched notfocused" id="settingsSearchDiv">
            <div ovg="" class="wasd-input-wrapper">
              <div ovg="" class="wasd-input">
                <input ovg="" id="settingsSearch" class="has-button ng-pristine ng-untouched ng-valid ui-autocomplete-input" placeholder="Поиск настроек" type="text" autocomplete="off" style="margin: 0;">
                <button ovg="" type="button" class="button-icon">
                  <i ovg="" class="wasd-icons-search"></i>
                </button>
              </div>
            </div>
          </wasd-input>

          <div class="header__search-btn" tabindex="0" style="display: none">
            <i class="wasd-icons-search"></i>
          </div>

        </div>

        <div class="header__right-side">
          <wasd-button class="ghost-btn ovg head-buttons" style="margin-right: 8px;">

            <ovg-dropdown class="">
              <div class="dropdown-ovg is-action medium login">
                <button class="basic medium-cube ovg twitch_authorize_public" type="button">
                  <i class="ovg-icon-twitch"></i>
                  <span class="username"></span>
                </button>
                <div class="dropdown-list">
                  <div class="dropdown-list__item logout">
                    <i class="wasd-icons-exit"></i>
                    <span>Выйти</span>
                  </div>
                </div>
              </div>
            </ovg-dropdown>


            <ovg-bell _ngcontent-ljm-c266="" id="ovg_bell__element" _nghost-ljm-c288="">
              <div _ngcontent-ljm-c288="" wasdclickoutside="" class="bell">
                <button _ngcontent-ljm-c288="" class="bell__icon-wrap bell_button basic medium-cube ovg">
                  <i _ngcontent-ljm-c288="" class="bell__icon wasd-icons-bell bell__icon--animation">
                    <svg _ngcontent-ljm-c288="" viewBox="0 0 12 14" xmlns="http://www.w3.org/2000/svg" class="bell__icon-background" style="display: none;"><path _ngcontent-ljm-c288="" fill-rule="evenodd" clip-rule="evenodd" d="M4.83952 1.50457C4.83364 1.48211 4.82838 1.45935 4.82375 1.4363C4.69316 0.786707 5.11402 0.15427 5.76363 0.0237462C6.41323 -0.10679 7.04571 0.313967 7.17628 0.963696C7.21244 1.1438 7.20623 1.32259 7.16453 1.48973C9.0087 2.00916 10.3587 3.76186 10.3587 5.83425V7.29605C10.3587 7.89446 10.6116 8.45966 11.045 8.8377L11.297 9.05753C11.7439 9.44743 12 10.0197 12 10.6206V10.6343C12 11.7502 11.1241 12.6666 10.0281 12.6666H7.88621C7.61167 13.4435 6.87085 14 6 14C5.12914 14 4.38833 13.4435 4.11379 12.6666H1.9719C0.875916 12.6666 0 11.7501 0 10.6343C0 10.0219 0.266038 9.43977 0.72786 9.05002L0.986731 8.83149C1.43413 8.45393 1.69677 7.87929 1.69677 7.26951V5.83425C1.69677 3.78116 3.02171 2.04185 4.83952 1.50457Z" fill="#141820"></path></svg>
                  </i>
                  <ovg-tooltip><div class="tooltip tooltip_position-bottomRight tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Уведомления </div></div></ovg-tooltip>
                </button>
                <div _ngcontent-ljm-c288="" class="bell__info bell-info" hidden="" style="z-index: 5;">
                  <div _ngcontent-ljm-c288="" class="bell-info__title"> Уведомления </div>
                  <div _ngcontent-ljm-c288="" class="bell-info__hr"></div>
                  <div _ngcontent-ljm-c288="" class="bell-info__list bell-info__list--scroll">
                  </div>
                </div>
              </div>
            </ovg-bell>

            <button class="basic medium-cube ovg updateemotes" type="button">
              <i class="wasd-icons-record"></i>
              <ovg-tooltip><div class="tooltip tooltip_position-bottomRight tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Обновить эмоции (нажмите дважды) </div></div></ovg-tooltip>
            </button>
            <button class="basic medium-cube ovg update" type="button">
              <i class="wasd-icons-record"></i>
              <ovg-tooltip><div class="tooltip tooltip_position-bottomRight tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Обновить чат (нажмите дважды) </div></div></ovg-tooltip>
            </button>
            <!--button class="basic medium-cube ovg hide-fullscreen newtab" type="button">
              <i class="ovg wasd-icons-extract"></i>
              <ovg-tooltip><div class="tooltip tooltip_position-bottomRight tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Открыть настройки в новом окне </div></div></ovg-tooltip>
            </button-->
            <button class="basic medium-cube ovg hide-fullscreen close" type="button">
              <i class="ovg wasd-icons-close"></i>
            </button>
          </wasd-button>
        </div>

      </header>

      <section class="ovg-tabs-wrapper vertical left" style="display:none">
        <div class="tabs">
          <div class="items" style="padding: 10px 0">
            <a role="tab" class="item" data-tab="about">О нас</a>
            <a role="tab" class="item" data-tab="general">Общий</a>
            <a role="tab" class="item active" data-tab="wasdSettings">Настройки</a>
            <a role="tab" class="item" data-tab="appearanceDesign">Оформление (beta)</a>
            <a role="tab" class="item" data-tab="emotes">Эмоции</a>
            <a role="tab" class="item" data-tab="filtration">Фильтрация</a>
            <a class="item" id="goToObsChatSetting2">Чат для OBS (beta) <i class="icon wasd-icons-extract" style="padding-left: 5px;"></i></a>
            <a role="tab" class="item" data-tab="changelog">Журнал изменений</a>
          </div>
        </div>
      </section>

      <wasd-nav-sidebar ovg="" style="z-index:5">
        <div ovg="" id="nav-sidebar" class="nav-sidebar" style="height: calc(100% - 48px);z-index: 1;float: left;z-index: 5557;overflow: hidden;">
          <ul ovg="" class="nav-sidebar__list top" style="position: fixed;top: auto;animation-duration: .5s;">
            <li ovg="">
              <a ovg="" class="nav-sidebar__item" data-tab="general" style="position: relative;">
                <i ovg="" class="wasd-icons-settings"></i>
                <span ovg="">Общий</span>
                <ovg-tooltip>
                  <div class="tooltip tooltip_position-right tooltip_size-small" style="width: 260px;">
                    <div class="tooltip-content tooltip-content_left"> Общий </div>
                  </div>
                </ovg-tooltip>
              </a>
            </li>
            <li ovg="">
              <a ovg="" class="nav-sidebar__item nav-sidebar__item--active" data-tab="wasdSettings" style="position: relative;">
                <i ovg="" class="wasd-icons-settings-profile"></i>
                <span ovg="">Настройки</span>
                <ovg-tooltip>
                  <div class="tooltip tooltip_position-right tooltip_size-small" style="width: 260px;">
                    <div class="tooltip-content tooltip-content_left"> Настройки </div>
                  </div>
                </ovg-tooltip>
              </a>
            </li>
            <li ovg="">
              <a ovg="" class="nav-sidebar__item" data-tab="appearanceDesign" style="position: relative;">
                <i ovg="" class="ovg-icon-paint"></i>
                <span ovg="">Оформление (beta)</span>
                <ovg-tooltip>
                  <div class="tooltip tooltip_position-right tooltip_size-small" style="width: 260px;">
                    <div class="tooltip-content tooltip-content_left"> Оформление (beta) </div>
                  </div>
                </ovg-tooltip>
              </a>
            </li>
            <li ovg="">
              <a ovg="" class="nav-sidebar__item" data-tab="emotes" style="position: relative;">
                <i ovg="" class="wasd-icons-smile"></i>
                <span ovg="">Эмоции</span>
                <ovg-tooltip>
                  <div class="tooltip tooltip_position-right tooltip_size-small" style="width: 260px;">
                    <div class="tooltip-content tooltip-content_left"> Эмоции </div>
                  </div>
                </ovg-tooltip>
              </a>
            </li>
            <li ovg="">
              <a ovg="" class="nav-sidebar__item" data-tab="filtration" style="position: relative;">
                <i ovg="" class="ovg-icon-filter" style="font-size: 18px;"></i>
                <span ovg="">Фильтрация</span>
                <ovg-tooltip>
                  <div class="tooltip tooltip_position-right tooltip_size-small" style="width: 260px;">
                    <div class="tooltip-content tooltip-content_left"> Фильтрация </div>
                  </div>
                </ovg-tooltip>
              </a>
            </li>
            <li ovg="">
              <a ovg="" class="nav-sidebar__link" style="position: relative;" id="goToObsChatSetting">
                <i ovg="" class="ovg-icon-chat"></i>
                <span ovg="">Чат для OBS (beta) <i class="icon wasd-icons-extract" style="padding-left: 5px;"></i></span>
                <ovg-tooltip>
                  <div class="tooltip tooltip_position-right tooltip_size-small" style="width: 260px;">
                    <div class="tooltip-content tooltip-content_left"> Чат для OBS (beta) <i class="icon wasd-icons-extract" style="padding-left: 5px;"></i> </div>
                  </div>
                </ovg-tooltip>
              </a>
            </li>
            <li ovg="">
              <a ovg="" class="nav-sidebar__item" data-tab="changelog" style="position: relative;">
                <i ovg="" class="ovg-icon-history"></i>
                <span ovg="">Журнал изменений</span>
                <ovg-tooltip>
                  <div class="tooltip tooltip_position-right tooltip_size-small" style="width: 260px;">
                    <div class="tooltip-content tooltip-content_left"> Журнал изменений </div>
                  </div>
                </ovg-tooltip>
              </a>
            </li>
          </ul>
          <ul ovg="" class="nav-sidebar__list bottom" style="bottom: 40px;">
            <li ovg="" style="position: fixed;">
              <a ovg="" class="nav-sidebar__item" data-tab="about" style="position: relative;">
                <i ovg="" class="wasd-icons-sidebar-faq"></i>
                <span ovg="">О нас</span>
                <ovg-tooltip>
                  <div class="tooltip tooltip_position-right tooltip_size-small" style="width: 260px;">
                    <div class="tooltip-content tooltip-content_left"> О нас </div>
                  </div>
                </ovg-tooltip>
              </a>
            </li>
          </ul>
        </div>
      </wasd-nav-sidebar>

      <main class="text pod-position" data-tab="about">

        <div style="padding: 10px;">
          <span style="font-size: 21px;">Напишите отзыв на <a target="_blank" href="https://chrome.google.com/webstore/detail/betterwasd/cokaeiijnnpcfaoehijmdfcgbkpffgbh">Chrome Webstore</a></span>
        </div>

        <div style="padding: 10px;">
          <span>Автор: <a href="https://ovgamesdev.github.io/" target="_blank">OvGames</a> | <a href="https://wasd.tv/ovgames" target="_blank">WASD</a></span> | <a href="https://t.me/BetterWASD" target="_blank">Telegram</a></span>
        </div>

        <div style="padding: 10px;">
          <h2 style="padding-bottom: 10px;">Настройки</h2>
          <div class="flat-btn ovg ovg-button-div" style="margin: 0!important;display: inline-grid;">
            <button style="margin-bottom: 6px;" class="primary medium ovg backup-download">
              <span class="ovg-button-span">
                <i class="ovg-icon-download" style="font-size: 20px;"></i>
              </span>
              <span> Cкачать резервную копию </span>
            </button>
            <button style="margin-bottom: 6px;" class="primary medium ovg backup-upload">
              <span class="ovg-button-span">
                <i class="ovg-icon-upload" style="font-size: 20px;"></i>
              </span>
              <span> Импортировать настройки </span>
            </button>
            <button style="" class="backup-reset medium ovg warning">
              <span class="ovg-button-span">
                <i class="wasd-icons-record" style="font-size: 20px;"></i>
              </span>
              <span class=""> Сбросить по умолчанию </span>
              <ovg-tooltip><div class="tooltip tooltip_position-bottomRight tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> нажмите дважды </div></div></ovg-tooltip>
            </button>
          </div>
        </div>

        <input id="importInput" type="file" accept=".backup, .backup.txt" style="display: none;">
        <div id="backupDropContainer" class="drodHere">Drop Here</div>

        <div style="top: 48px;right: 0px;position: absolute;">
          <img src="https://raw.githubusercontent.com/ovgamesdev/BetterWASD.data/release/betterwasd_qr_tg.webp" style="width: 140px;margin: 10px;">
        </div>

        <div class="bottom footer">
          <span>Version ${changelogList[0].version} (${moment(changelogList[0].date).format('YYYY-MM-DD')})</span>
          <div class="right tooltip-hover" style="position: relative;">
            <div class="active-tech-status-ovg"></div>
            <span class="activeUsers tech-info-ovg">0</span>
            <ovg-tooltip><div class="tooltip tooltip_position-topRight tooltip_size-small" style="width: 260px;right: -4px;"><div class="tooltip-content tooltip-content_left"> Активных пользователей </div></div></ovg-tooltip>
            
            <!--div><span class="activeChannelUsers">0</span><span> пользователей просматривающие канал </span><span  class="activeChannel"></span></div-->
          </div>
        </div>

      </main>
      <main id="general" data-tab="general">
        ${HelperSettings.build('general')}
      </main>

      <main class="" data-tab="emotes">
        <div style="display: flex;justify-content: space-between;">
          <h1 style="padding-left: 10px;padding-top: 10px;"> Эмоции </h1>
        </div>

        <div class="links_to">

          <div class="option link_to" data-tab="bwasdSettings">
            <div class="ovg-option icon">
              <i class="ovg-icon-bwasd"></i>
              <div class="option-line">
                <div class="labelField">
                  <span class="title"> BetterWASD </span>
                </div>
              </div>
            </div>
          </div>

          <div class="option link_to" data-tab="tv7Settings" >
            <div class="ovg-option icon">
              <i class="ovg-icon-tv7"></i>
              <div class="option-line">
                <div class="labelField">
                  <span class="title"> 7TV </span>
                </div>
              </div>
            </div>
          </div>

          <div class="option link_to" data-tab="bttvSettings" >
            <div class="ovg-option icon">
              <i class="ovg-icon-bttv"></i>
              <div class="option-line">
                <div class="labelField">
                  <span class="title"> BetterTTV </span>
                </div>
              </div>
            </div>
          </div>

          <div class="option link_to" data-tab="ffzSettings" >
            <div class="ovg-option icon">
              <i class="ovg-icon-ffz"></i>
              <div class="option-line">
                <div class="labelField">
                  <span class="title"> FrankerFaceZ </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>


      <main class="text" data-tab="bwasdSettings">
        <ovg-button class="flat-btn links_to ovg" style="display: flex; align-items: center;">
          <button style="margin-right: 10px;" data-tab="emotes" class="link_to ovg basic show small"> назад </button>
          <p style="margin: 5px 0 0 0;"> BetterWASD </p>
        </ovg-button>

        <h2> Доступные эмоции BetterWASD <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSfeR-ASq3bQBE6t3F5lIutvfcJkh8bUxAWqls80Q1WMNAEivQ/viewform?usp=sf_link">Предложить эмоцию</a> </h2>

        <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-valid ng-dirty ng-touched">
          <div ovg="" class="wasd-input-wrapper">
            <div ovg="" class="wasd-input">
              <label ovg=""></label>
              <input id="bwasdemojiSearch" ovg="" class="has-button ng-pristine ng-untouched ng-valid" placeholder="Поиск эмоций" type="text">
              <button ovg="" type="button" class="button-icon">
                <i ovg="" class="wasd-icons-close"></i>
              </button>
            </div>
          </div>
        </wasd-input>

        <ul id="bwasdEmoteList"></ul>
      </main>

      <main class="text" data-tab="bttvSettings">
        <ovg-button class="flat-btn links_to ovg" style="display: flex; align-items: center;">
          <button style="margin-right: 10px;" data-tab="emotes" class="link_to ovg basic show small"> назад </button>
          <p style="margin: 5px 0 0 0;"> BetterTTV </p>
        </ovg-button>
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
        <ovg-button class="flat-btn links_to ovg" style="display: flex; align-items: center;">
          <button style="margin-right: 10px;" data-tab="emotes" class="link_to ovg basic show small"> назад </button>
          <p style="margin: 5px 0 0 0;"> FrankerFaceZ </p>
        </ovg-button>
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
        <ovg-button class="flat-btn links_to ovg" style="display: flex; align-items: center;">
          <button style="margin-right: 10px;" data-tab="emotes" class="link_to ovg basic show small"> назад </button>
          <p style="margin: 5px 0 0 0;"> 7TV </p>
        </ovg-button>
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

      <main class="" data-tab="appearanceDesign">
        <h1 style="padding-left: 10px;padding-top: 10px;"> Оформление (beta) </h1>
        ${HelperSettings.build('colors')}
      </main>

      <main class="text" data-tab="changelog">
        <h1>Список последних обновлений и исправлений.</h1>
        <!--h4 style="margin-top:10px;padding-left: 10px;padding-right: 0px;margin-bottom: 0px;"> Информацию о будущих версиях можно найти <a href="https://wasd.tv/ovgames/posts">тут</a></h4-->
        ${changelogHtml}
      </main>

      <main class="" data-tab="filtration">
        <div style="display: flex;justify-content: space-between;">
          <h1 style="padding-left: 10px;padding-top: 10px;"> Фильтрация </h1>
        </div>

        <div class="links_to">

          <div class="option link_to" data-tab="filtrationBlockUser">
            <div class="ovg-option">
              <div class="option-line">
                <div class="labelField">
                  <span class="title"> Блокировка - Пользователи </span>
                </div>
              </div>
            </div>
          </div>

          <div class="option link_to" data-tab="filtrationBlockTerm" >
            <div class="ovg-option">
              <div class="option-line">
                <div class="labelField">
                  <span class="title"> Блокировка - Термины </span>
                </div>
              </div>
            </div>
          </div>

          <div class="option link_to" data-tab="filtrationHighlightUser" >
            <div class="ovg-option">
              <div class="option-line">
                <div class="labelField">
                  <span class="title"> Выделение - Пользователи </span>
                </div>
              </div>
            </div>
          </div>

          <div class="option link_to" data-tab="filtrationHighlightTerm" >
            <div class="ovg-option">
              <div class="option-line">
                <div class="labelField">
                  <span class="title"> Выделение - Термины </span>
                </div>
              </div>
            </div>
          </div>

          <div class="option link_to" data-tab="filtrationHighlightUserRole" >
            <div class="ovg-option">
              <div class="option-line">
                <div class="labelField">
                  <span class="title"> Выделение - Роль пользователя </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <main class="text" data-tab="filtrationBlockUser">
        <ovg-button class="flat-btn links_to ovg" style="display: flex; align-items: center;">
          <button style="margin-right: 10px;" data-tab="filtration" class="link_to ovg basic show small"> назад </button>
          <p style="margin: 5px 0 0 0;"> Блокировка - Пользователи </p>
        </ovg-button>

        <div class="blacklist">
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
        </div>
      </main>

      <main class="text" data-tab="filtrationBlockTerm">
        <ovg-button class="flat-btn links_to ovg" style="display: flex; align-items: center;">
          <button style="margin-right: 10px;" data-tab="filtration" class="link_to ovg basic show small"> назад </button>
          <p style="margin: 5px 0 0 0;"> Блокировка - Термины </p>
        </ovg-button>

        <div class="blacklist">
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
      </main>

      <main class="text" data-tab="filtrationHighlightUser">
        <ovg-button class="flat-btn links_to ovg" style="display: flex; align-items: center;">
          <button style="margin-right: 10px;" data-tab="filtration" class="link_to ovg basic show small"> назад </button>
          <p style="margin: 5px 0 0 0;"> Выделение - Пользователи </p>
        </ovg-button>

        <div class="highlight">
          <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-valid ng-dirty ng-touched">
            <div ovg="" class="wasd-input-wrapper">
              <div ovg="" class="wasd-input">
                <label ovg=""></label>
                <input id="highlightAddUser" ovg="" class="has-button ng-pristine ng-untouched ng-valid" placeholder=" Добавить пользователя " type="text">
                <button id="highlightAddUserBtn" ovg="" type="button" class="button-icon">
                  <i ovg="" class="wasd-icons-add"></i>
                </button>
                <div class="clr-field" style="color: #00000000;display: flex !important;">
                  <button aria-labelledby="clr-open-label" style="margin-right: -9px;border-radius: 0;"></button>
                  <input id="highlightAddUserColor" type="text" value="#00000000" data-coloris style="width: 40px;height: 29px;">
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
              <th class="table-heading-ovg">
                <div class="table-heading-text-ovg">Цвет</div>
              </th>
              <th class="table-heading-ovg remove">
                <div class="table-heading-text-ovg">Действия</div>
              </th>
            </thead>
            <tbody class="ovg-items">
            </tbody>
          </table>
        </div>
      </main>

      <main class="text" data-tab="filtrationHighlightTerm">
        <ovg-button class="flat-btn links_to ovg" style="display: flex; align-items: center;">
          <button style="margin-right: 10px;" data-tab="filtration" class="link_to ovg basic show small"> назад </button>
          <p style="margin: 5px 0 0 0;"> Выделение - Термины </p>
        </ovg-button>

        <div class="highlight">
          <wasd-input _ngcontent-gmb-c228="" _ngcontent-gmb-c28="" class="ng-valid ng-dirty ng-touched">
            <div ovg="" class="wasd-input-wrapper">
              <div ovg="" class="wasd-input">
                <label ovg=""></label>
                <input id="highlightAddTerm" ovg="" class="has-button ng-pristine ng-untouched ng-valid" placeholder=" Добавить термин " type="text">
                <button id="highlightAddTermBtn" ovg="" type="button" class="button-icon">
                  <i ovg="" class="wasd-icons-add"></i>
                </button>
                <div class="clr-field" style="color: #00000000;display: flex !important;">
                  <button aria-labelledby="clr-open-label"style="margin-right: -9px;border-radius: 0;"></button>
                  <input id="highlightAddTermColor" type="text" value="#00000000" data-coloris style="width: 40px;height: 29px;">
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
              <th class="table-heading-ovg">
                <div class="table-heading-text-ovg">Цвет</div>
              </th>
              <th class="table-heading-ovg remove">
                <div class="table-heading-text-ovg">Действия</div>
              </th>
            </thead>
            <tbody class="ovg-items">
            </tbody>
          </table>
        </div>
      </main>

      <main class="text" data-tab="filtrationHighlightUserRole">
        <ovg-button class="flat-btn links_to ovg" style="display: flex;align-items: center;margin: 0 0 8px;">
          <button style="margin-right: 10px;" data-tab="filtration" class="link_to ovg basic show small"> назад </button>
          <p style="margin: 5px 0 0 0;"> Выделение - Роль пользователя </p>
        </ovg-button>

        <p style="margin: 0 0 5px 0;">Используете <span class="tech-info-ovg">#000000</span> или <span class="tech-info-ovg">#00000000</span> чтобы сбросить цвет. </p>
        <p style="margin: 0 0 5px 0;">Если вам нужен <span class="tech-info-ovg">#000000</span> вы можете использовать ближний к нему цвет <span class="tech-info-ovg">#010101</span>. </p>

        <div class="highlight">
          <div style="margin-left: -10px; width: calc(100% + 20px);">
            ${HelperSettings.build('highlightRole')}
          </div>
        </div>
      </main>`;
    document.body.append(settingsDiv);
    BetterStreamChat.changelog = changelogList[0]

    settingsDiv.querySelector('#settingsSearchDiv button').addEventListener('click', () => {
      settingsSearchDiv.classList.remove('notfocused')
      settingsSearch.dispatchEvent(new Event('input'))
      settingsSearch.focus()
    });

    settingsSearch.addEventListener('blur', () => {
      settingsSearch.value = ''
      settingsSearchDiv.classList.add('notfocused')
    });

    // bttv events
    bttvAddUserBtn.addEventListener('click', () => {
      HelperBTTV.tryAddUser();
    });
    let bttvAddUser = settingsDiv.querySelector('#bttvAddUser')
    bttvAddUser.addEventListener('keyup', (event) => {
      if (event.key !== 'Enter') return;
      HelperBTTV.tryAddUser();
    });

    // ffz events
    ffzAddUserBtn.addEventListener('click', () => {
      HelperFFZ.tryAddUser();
    });
    let ffzAddUser = settingsDiv.querySelector('#ffzAddUser')
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

    // bind close settings 
    settingsDiv.querySelector('.close').addEventListener('click', () => {
      Helper.hideSettings()
    });

    // bind update chat 
    settingsDiv.querySelector('.update').addEventListener('dblclick', () => {
      let header_block_menu = document.querySelectorAll('.header > div.header__block__menu div.header__block__menu__item')
      if (header_block_menu.length >= 1) {
        header_block_menu[1]?.click();
        settingsDiv.querySelector('.update > i').classList.add('resetPlayerLoading');
        header_block_menu[0]?.children[0]?.click()
      } else {
        if (settingsDiv.classList.contains('fullscreen')) {
          Helper.trySendMessage({ update_chat: true })
        } else {
          alertify.error(`Чат не найден.`)
        }
      }
    });

    // bind newtab settings
    settingsDiv.querySelector('.newtab')?.addEventListener('click', () => {
      let settings_window = window.open('https://wasd.tv/chat?helper-settings=settings', '_blank', 'location=yes,height=500,width=800')
      BetterStreamChat.isSettingsNewWindow = true
      let timer_settings_window = setInterval(() => { 
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
      HelperFFZ.updateEmotesFfz();
      HelperTV7.updateEmotesTv7();
      if (socket?.channel?.channel) HelperBWASD.tryAddUser(socket.channel.channel.channel_owner.user_id, socket.channel.channel.channel_owner.user_login)
      HelperBTTV.updateSettings(true)
      HelperFFZ.updateSettings(true)
      HelperTV7.updateSettings(true)
    });

    if (Cookies.get('BetterWASD_access_token')) Helper.loginTwitchUI(Cookies.get('BetterWASD_twitch_display_name'))

    document.body.addEventListener('click', (value) => {
      if (value && value.target && value.target.className && !value.target.className.match('twitch_authorize_public')) {
        document.querySelectorAll('.dropdown-ovg.is-open').forEach((i) => { i.classList.remove('is-open') })
      }

      document.querySelector('#bttv-custom-timeout-contain')?.remove()
    })

    settingsDiv.querySelector('.dropdown-ovg.login').addEventListener('click', () => {
      if (Cookies.get('BetterWASD_twitch_display_name')) {
        settingsDiv.querySelector('.dropdown-ovg.login').classList.toggle('is-open')
      } else {
        window.open('https://id.twitch.tv/oauth2/authorize?client_id=' + HelperTwitch['Client-ID'] + '&redirect_uri=' + encodeURIComponent('https://wasd.tv/') + '&response_type=token')
      }
    })

    // bind twitch_authorize logout
    settingsDiv.querySelector('.dropdown-ovg .logout').addEventListener('click', () => {
      Helper.logoutTwitchUI()
      Helper.setUnauthorization()
      setTimeout(() => {
        Cookies.remove('BetterWASD_access_token')
        Cookies.remove('BetterWASD_twitch_display_name')
      }, 50)
    });

    // bind search settings
    let filter1, ul1, options1, title1, titleline1, i1;
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
    let bwasdfilter, bwasdul, bwasdoptions, bwasdtitle, bwasdtitleline, bwasdi;
    bwasdemojiSearch.addEventListener('input', () => {
      bwasdfilter = bwasdemojiSearch.value.toUpperCase();
      bwasdul = document.querySelector("main[data-tab='bwasdSettings'] > #bwasdEmoteList");
      bwasdoptions = bwasdul.querySelectorAll(".div_emoteCard");
      for (bwasdi = 0; bwasdi < bwasdoptions.length; bwasdi++) {
        bwasdtitle = bwasdoptions[bwasdi].querySelector("span");
        if (bwasdtitle) {
          if (bwasdtitle.textContent.toUpperCase().indexOf(bwasdfilter) != -1) {
            bwasdoptions[bwasdi].style.display = "";
          } else {
            bwasdoptions[bwasdi].style.display = "none";
          }
        }
      }
    });

    let bttvfilter, bttvul, bttvoptions, bttvtitle, bttvtitleline, bttvi;
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

    let ffzfilter, ffzul, ffzoptions, ffztitle, ffztitleline, ffzi;
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

    let tv7filter, tv7ul, tv7options, tv7title, tv7titleline, tv7i;
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
      let reader = new FileReader()
      reader.onload = processFile(files)
      if (files.name.indexOf('.backup') == files.name.length - 7 || files.name.indexOf('.backup.txt') == files.name.length - 11) {
        reader.readAsText(files)
      } else {
        alertify.warning(`только .backup файлы`, 3)
      }
    })

    processFile = (theFile) => {
      return (e) => {
        chrome.storage[storageType].set(JSON.parse(e.target.result), () => {
          location.reload()
          Helper.trySendMessage({ location: 'reload' });
          alertify.warning(`Перезагрузка страницы`, 5)
        })
      }
    }

    // show-section-mobile
    settingsDiv.querySelector('.show-section-mobile').addEventListener('click', () => {
      settingsDiv.querySelector('section').classList.toggle('mobile-show')
      settingsDiv.querySelector('.show-section-mobile').classList.toggle('active')
    });


    /************/

    settingsDiv.ondragenter = (e) => {
      e.preventDefault();
    };
    settingsDiv.ondragover = (e) => {
      e.preventDefault();
      settingsDiv.classList.add('dragoverbackup');
    }
    settingsDiv.ondragleave = (e) => {
      e.preventDefault();
      settingsDiv.classList.remove('dragoverbackup');
    }
    settingsDiv.ondrop = (e) => {
      e.preventDefault();
      settingsDiv.classList.remove('dragoverbackup');
    };


    backupDropContainer.ondragenter = (e) => {
      e.preventDefault();
    };
    backupDropContainer.ondragover = (e) => {
      e.preventDefault();
      backupDropContainer.classList.add('dragover');
    }
    backupDropContainer.ondragleave = (e) => {
      e.preventDefault();
      backupDropContainer.classList.remove('dragover');
    }
    backupDropContainer.ondrop = (e) => {
      e.preventDefault();
      backupDropContainer.classList.remove('dragover');
      let reader = new FileReader();
      reader.onload = processFile(e.dataTransfer.files[0]);
      let n = e.dataTransfer?.files[0]?.name

      if (n && n.indexOf('.backup') == n.length - 7 || n && n.indexOf('.backup.txt') == n.length - 11) {
        reader.readAsText(e.dataTransfer.files[0]);
      } else {
        alertify.warning(`только .backup файлы`, 3);
      }
    };

    /************/

    settingsDiv.querySelector('.backup-download').addEventListener('click', () => {
      HelperWASD.download(`BetterWASD-settings.backup`, JSON.stringify(settings));
    });

    settingsDiv.querySelector('.backup-reset').addEventListener('dblclick', () => {
      chrome.storage[storageType].set(Helper.getDefaultSettings(), () => {
        location.reload()
        Helper.trySendMessage({ location: 'reload' });
      })
    });

    // link to navigation
    for (let link of settingsDiv.querySelectorAll('.links_to .link_to')) {
      link.addEventListener('click', ({ target }) => {

        if (target.classList.value == 'slider-ovg' || target.classList.value == 'optionField') return

        let tabs = settingsDiv.querySelectorAll('main');
        for (let element of [...tabs]) {
          element.classList.remove('active');
        }

        if (target.getAttribute('data-tab') == 'bot') {
          settingsSearchDiv.classList.remove('hidden')
        } else {
          settingsSearchDiv.classList.add('hidden')
        }

        settingsDiv.querySelector(`main[data-tab="${target.dataset.tab}"]`).classList.add('active');

      });
    }

    // navigation old
    for (let navItem of settingsDiv.querySelectorAll('section .items > a')) {
      navItem.addEventListener('click', ({ target }) => {
        if (target.getAttribute('role') !== 'tab') return

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

        if (target.getAttribute('data-tab') == 'about') {
          HelperWASD.startTimerStatData()
        } else {
          HelperWASD.stopTimerStatData()
        }

        target.classList.add('active');
        settingsDiv.querySelector(`main[data-tab="${target.dataset.tab}"]`).classList.add('active');
      });
    }

    // navigation new
    for (let navItem of settingsDiv.querySelectorAll('#nav-sidebar .nav-sidebar__item')) {
      navItem.addEventListener('click', ({ target }) => {
        let links = settingsDiv.querySelectorAll('#nav-sidebar .nav-sidebar__item');
        let tabs = settingsDiv.querySelectorAll('main');
        for (let element of [...tabs]) {
          element.classList.remove('active');
        }
        for (let element of [...links]) {
          element.classList.remove('nav-sidebar__item--active');
        }

        if (target.getAttribute('data-tab') == 'wasdSettings') {
          settingsSearchDiv.classList.remove('hidden')
        } else {
          settingsSearchDiv.classList.add('hidden')
        }

        if (target.getAttribute('data-tab') == 'about') {
          HelperWASD.startTimerStatData()
        } else {
          HelperWASD.stopTimerStatData()
        }

        target.classList.add('nav-sidebar__item--active');
        settingsDiv.querySelector(`main[data-tab="${target.dataset.tab}"]`).classList.add('active');
      });
    }

    // open nav sidebar
    settingsDiv.querySelector('wasd-nav-sidebar').addEventListener('click', () => {
      if (settingsDiv.querySelector('wasd-nav-sidebar[ovg]').classList.contains('nav-sidebar--expanded')) {
        settingsDiv.querySelector('wasd-nav-sidebar[ovg]').classList.remove('nav-sidebar--expanded')
        settingsDiv.querySelector('.open-nav-sidebar').classList.remove('nav-sidebar-toggle--active')
      }
    })
    settingsDiv.querySelector('.open-nav-sidebar').addEventListener('click', () => {
      settingsDiv.querySelector('wasd-nav-sidebar[ovg]').classList.toggle('nav-sidebar--expanded')
      settingsDiv.querySelector('.open-nav-sidebar').classList.toggle('nav-sidebar-toggle--active')
    })

    goToObsChatSetting2.addEventListener('click', () => {
      Helper.trySendMessage({ createWindow: `https://ovgamesdev.github.io/BetterWASD.obs_chat/settings/?channel_name=${HelperWASD.self_channel_name}&private_link=${HelperWASD.closedViewUrl}` });
    })
    goToObsChatSetting.addEventListener('click', () => {
      Helper.trySendMessage({ createWindow: `https://ovgamesdev.github.io/BetterWASD.obs_chat/settings/?channel_name=${HelperWASD.self_channel_name}&private_link=${HelperWASD.closedViewUrl}` });
    })


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

        // Helper.trySendMessage({ update_save: { split: split, value: value } })

//     let newSettings = JSON.parse(JSON.stringify(settings));

//     let option = BetterStreamChat.settingsDiv.querySelector(`[data-name="${msg?.update_save?.split[0]}_${msg?.update_save?.split[1]}"]`)
//     let split = msg.update_save.split
//     let value = msg.update_save.value

//     if (option.type === 'checkbox') {
//       option.checked = value
//     } else {
//       option.value = value
//     }
//     HelperSettings.save([option])

      });
    }

    $("#blacklistAddUser").autocomplete({
      source: (request, response) => {
        $.ajax({
          url: `https://wasd.tv/api/search/profiles?limit=5&offset=0&search_phrase=${blacklistAddUser.value.toLowerCase()}`,
          success: (data) => {
            response($.map(data?.result?.rows, (item) => {
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
      source: (request, response) => {
        $.ajax({
          url: `https://wasd.tv/api/search/profiles?limit=5&offset=0&search_phrase=${highlightAddUser.value.toLowerCase()}`,
          success: (data) => {
            response($.map(data?.result?.rows, (item) => {
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
      source: (request, response) => {
        $.ajax({
          url: `https://api.twitch.tv/helix/search/channels?query=${bttvAddUser.value.toLowerCase()}&first=5`,
          headers: {
            'Client-ID': HelperTwitch['Client-ID'],
            'Authorization': 'Bearer ' + Cookies.get('BetterWASD_access_token')
          },
          success: (data) => {
            response($.map(data.data, (item) => {
              return {
                label: item.display_name,
                value: item.display_name,
                logo: item.thumbnail_url
              }
            }));
          }
        });
      }
    });

    $("#ffzAddUser").autocomplete({
      source: (request, response) => {
        $.ajax({
          url: `https://api.twitch.tv/helix/search/channels?query=${ffzAddUser.value.toLowerCase()}&first=5`,
          headers: {
            'Client-ID': HelperTwitch['Client-ID'],
            'Authorization': 'Bearer ' + Cookies.get('BetterWASD_access_token')
          },
          success: (data) => {
            response($.map(data.data, (item) => {
              return {
                label: item.display_name,
                value: item.display_name,
                logo: item.thumbnail_url
              }
            }));
          }
        });
      }
    });

    $("#tv7AddUser").autocomplete({
      source: (request, response) => {
        $.ajax({
          url: `https://api.twitch.tv/helix/search/channels?query=${tv7AddUser.value.toLowerCase()}&first=5`,
          headers: {
            'Client-ID': HelperTwitch['Client-ID'],
            'Authorization': 'Bearer ' + Cookies.get('BetterWASD_access_token')
          },
          success: (data) => {
            response($.map(data.data, (item) => {
              return {
                label: item.display_name,
                value: item.display_name,
                logo: item.thumbnail_url
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
      wasdinput.querySelector('input')?.addEventListener('focus', () => {
        label?.classList.add('show')
        input.placeholder = ''
      })
      wasdinput.querySelector('input')?.addEventListener('blur', () => {
        label?.classList.remove('show')
        input.placeholder = text
      })
      wasdinput.querySelector('button')?.addEventListener('click', () => {
        input.value = ''
        input.dispatchEvent(new Event('input'))
      })
    }

    // bind Тестовое уведомление
    testNotify.addEventListener('click', () => {
      Helper.notify(`Тест`, `Тестовое уведомление`, 'test')
    })

    // bind Уведомления
    let isOpenBell = false
    let bell__info = ovg_bell__element.querySelector('.bell__info')
    let bell_button = ovg_bell__element.querySelector('.bell_button')
    document.body.addEventListener('click', (e) => {
      if (e && e.target && e.target.className && !e.target.className.match('bell') && isOpenBell) {
        Helper.setNotifyReaded()
        bell__info.setAttribute('hidden', '')
        isOpenBell = false
      }
      if (e && e.target && e.target.className && e.target.className.match('bell__icon') && isOpenBell) {
        setTimeout(() => {
          Helper.setNotifyReaded()
          bell__info.setAttribute('hidden', '')
          isOpenBell = false
        }, 50)
      }
    })
    bell_button.addEventListener('click', () => {
      setTimeout(() => {
        bell__info.removeAttribute('hidden')
        bell__info.querySelector('.bell-info__list').scrollTop = 0
        isOpenBell = true
      }, 50)
    })

    let tooltips = settingsDiv.querySelectorAll(".tooltip-wrapper");
    for (let tooltip of tooltips) {
      $( tooltip ).tooltip({
        classes: { "ui-tooltip": "ui-ovg-tooltip" },
        content: tooltip.title,
        show: false,
        hide: false,
        position: {
          my: "center bottom",
          at: "center top-5",
          within: $('#bscSettingsPanel')
        }
      });
    }

    for (let select of settingsDiv.querySelectorAll('select')) {
      select.onfocus = (e) => e.target.classList.add('active')
      select.onblur = (e) => e.target.classList.remove('active')

      select.onchange = (e) => e.target.blur()
    }

    for (let option of document.querySelectorAll('input[data-coloris]')) {
      if (!option.dataset.name) continue;
      let split = option.dataset.name.split('_');

      let swatches = HelperSettings.availableSettings[split[0]][split[1]].swatches;
      option.addEventListener('focus', () => {
        if (typeof swatches === 'object') {
          Coloris({swatches:[option.value, ...swatches], focusInput: window.innerWidth > 480 })
        } else {
          Coloris({swatches:[option.value], focusInput: window.innerWidth > 480 })
        }
      })
    }

    Coloris({ clearButton: {show: false}, formatToggle: false})
    settingsDiv.querySelectorAll('main').forEach((e) => e.onscroll = () => Coloris.close())

    this.install();

    // load bwasd, bttv, ffz and 7tv emotes
    await HelperBWASD.update();
    HelperBWASD.loaded();

    await HelperBTTV.update();
    HelperBTTV.loaded();

    await HelperFFZ.update();
    HelperFFZ.loaded();

    await HelperTV7.update();
    HelperTV7.loaded();

    // load chat
    HelperWASD.loaded();

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
      wasd.updatestyle();
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
    if (HelperWASD.closedViewUrl  == 'none' || HelperWASD.self_channel_name == 'none') {
      $.ajax({
        url: `https://wasd.tv/api/v2/profiles/current/broadcasts/closed-view-url`,
        success: (out) => {
          HelperWASD.closedViewUrl = out.result.view_url.replace('https://wasd.tv/private-stream/', '')
          $.ajax({
            url: `https://wasd.tv/api/v2/profiles/current`,
            success: (out) => {
              HelperWASD.self_channel_name = out.result.user_profile.user_login
            }
          });
        }
      });
    }

    Helper.buildBell()

    if (document.querySelector('main.active[data-tab="about"]')) {
      HelperWASD.startTimerStatData()
    }

  }
}




$.widget("app.autocomplete", $.ui.autocomplete, {
  _renderItem: (ul, item) => {
    return $( "<li>" )
      .append( `<div class='ui-menu-item-icon' style='background-image: url(${item.logo})'> ${item.label} </div>` )
      .appendTo( ul );
  }
});