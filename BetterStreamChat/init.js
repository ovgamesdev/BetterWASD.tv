const BetterStreamChat = {
    activeInstance: null,
    settingsDiv: null,
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
                version: '1.3',
                date: '2021-07-28',
                items: [{
                    text: [
                        `СТРИМИНГОВАЯ - Карточка пользователя - Последние сообщения.`
                    ],
                    label: 'fixed'
                },{
                    text: [
                        `<a target="_blank" href="https://7tv.app/">7TV</a> эмоции.`,
                        `Поддержка Firefox.`,
                        `Чат после проигрывателя (Мобильные устройства).`,
                        `Цвет для опции "Меню модератора".`
                    ],
                    label: 'added'
                },{
                    text: [
                        `Карточка пользователя - Последние сообщения.`,
                        `Распознавание ссылок`,
                        `ЧС.`
                    ],
                    label: 'optimized'
                }]
            },{
                version: '1.2.9',
                date: '2021-07-19',
                items: [{
                    text: [
                        `Меню модератора - Временно заблокировать.`,
                        `Срок блока "Временно заблокировать" (Меню модератора).`,
                        `Удалить все сообщения "Временно заблокировать" (Меню модератора).`,
                    ],
                    label: 'added'
                },{
                    text: [
                        `ЧС.`,
                        `Меню модератора - Забанить пользователя.`,
                    ],
                    label: 'changed'
                }]
            },{
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
            },{
                version: '1.2.7',
                date: '2021-07-13',
                items: [{
                    text: [
                        `Скрыть кнопку "Великий рандом!" в заголовке.`
                    ],
                    label: 'added'
                },{
                    text: [
                        `Ошибка инициализации чата при нажатии на Великий рандом!.`
                    ],
                    label: 'fixed'
                },{
                    text: [
                        `<a href="https://chrome.google.com/webstore/detail/fdgepfaignbakmmbiafocfjcnaejgldb" target="_blank">БОТ</a>.`
                    ],
                    label: 'removed'
                }]
            },{
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
                // <ul class="nav">
                //     <li><a data-tab="about">О нас</a></li>
                //     <li><a data-tab="general">Общий</a></li>
                //     <li><a data-tab="bttvSettings">BTTV</a></li>
                //     <li><a data-tab="ffzSettings">FFZ</a></li>
                //     <li><a data-tab="tv7Settings">TV7</a></li>
                //     <li class="active"><a data-tab="wasdSettings">Настройки</a></li>
                //     <!--div><a href="https://chrome.google.com/webstore/detail/fdgepfaignbakmmbiafocfjcnaejgldb" target="_blank">БОТ</a></div-->
                //     <li><a data-tab="blacklist">ЧС</a></li>
                //     <li><a data-tab="changelog">Журнал изменений</a></li>
                //     <li><a data-tab="backup">Бэкап</a></li>
                // </ul>
        settingsDiv.innerHTML = `<div id="status">
            <p>
            </p>
            </div>
            <header>

                <section class="tabs-ovg-wrapper horizontal left">
                    <div class="tabs-ovg">
                        <div class="items">
                            <a role="tab" class="item" data-tab="about">О нас</a>
                            <a role="tab" class="item" data-tab="general">Общий</a>
                            <a role="tab" class="item" data-tab="bttvSettings">BTTV</a>
                            <a role="tab" class="item" data-tab="ffzSettings">FFZ</a>
                            <a role="tab" class="item" data-tab="tv7Settings">TV7</a>
                            <a role="tab" class="item active" data-tab="wasdSettings">Настройки</a>
                            <a role="tab" class="item" data-tab="blacklist">ЧС</a>
                            <a role="tab" class="item" data-tab="changelog">Журнал изменений</a>
                            <a role="tab" class="item" data-tab="backup">Бэкап</a>
                        </div>
                    </div>
                </section>

                <!--span title="" class="fade helpTitleHover"><img class="nofade " style="width: 22px; filter: invert(99%) sepia(6%) saturate(1%) hue-rotate(57deg) brightness(95%) contrast(85%);"></span-->
                <span style="margin-right: 5px;" title="Обновить BTTV, FFZ и TV7 эмоции (щелкните мышью по кнопке дважды) (Подождите пару секунд)." class="updateemotes helpTitleHover"><i _ngcontent-boj-c248="" class="wasd-icons-record-icon" style="font-size: 22px;align-items: center;display: flex;justify-content: center;"></i></span>
                <span style="margin-right: 10px;" title="Обновить чат (щелкните мышью по кнопке дважды) (Подождите пару секунд)." class="update helpTitleHover"><i _ngcontent-boj-c248="" class="wasd-icons-record-icon" style="font-size: 22px;align-items: center;display: flex;justify-content: center;"></i></span>
                
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

            <main class="text" data-tab="tv7Settings">
                <h1 style="padding-left: 10px; padding-right: 10px;"> 7TV </h1>
                <h4 style="margin-top:10px;padding-left: 10px;padding-right: 0px;">Добавить новый канал (Twitch username)</h4>
                <div style="padding-left: 10px;">
                    <input placeholder="username" type="search" id="tv7AddUser" />
                    <button id="tv7AddUserBtn" class="ovg-button">+</button>
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
                <input type="search" placeholder="Поиск эмоций" class="option tv7emojiSearch" style="background: url(${chrome.extension.getURL("img/search.png")}) no-repeat 10px; background-color: var(--wasd-color-prime); margin-top: 10px; margin-bottom: 10px; border-bottom-width: 0px!important; min-height: auto;">
                <ul id="tv7EmoteList"></ul>
            </main>

            <main class="active" data-tab="wasdSettings">
                <input type="search" placeholder="Поиск настроек" class="option settingsSearch" style="background: url(${chrome.extension.getURL("img/search.png")}) no-repeat 10px;">
                ${HelperSettings.build('wasd')}
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
                <div style="padding-left: 10px;display: inline-flex;">
                    <div style="min-width: 105px;overflow: unset;height: 22px;">
                        <input placeholder="username" type="search" id="blacklistAddUser" style="width: -webkit-fill-available;">
                    </div>
                    <button id="blacklistAddUserBtn" class="ovg-button" style="height: min-content;">+</button>
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
            HelperBTTV.tryAddUser();
        });
        settingsDiv.querySelector('#bttvAddUser').addEventListener('keyup', (event) => {
            if (event.key !== 'Enter') return;
            HelperBTTV.tryAddUser();
        });

        // ffz events
        settingsDiv.querySelector('#ffzAddUserBtn').addEventListener('click', () => {
            HelperFFZ.tryAddUser();
        });
        settingsDiv.querySelector('#ffzAddUser').addEventListener('keyup', (event) => {
            if (event.key !== 'Enter') return;
            HelperFFZ.tryAddUser();
        });

        // tv7 events
        settingsDiv.querySelector('#tv7AddUserBtn').addEventListener('click', () => {
            HelperTV7.tryAddUser();
        });
        settingsDiv.querySelector('#tv7AddUser').addEventListener('keyup', (event) => {
            if (event.key !== 'Enter') return;
            HelperTV7.tryAddUser();
        });

        // bl events
        settingsDiv.querySelector('#blacklistAddUserBtn').addEventListener('click', () => {
            text = settingsDiv.querySelector('#blacklistAddUser').value
            if (text != '') HelperWASD.addUserToBL(text)
        });
        settingsDiv.querySelector('#blacklistAddUser').addEventListener('keyup', (event) => {
            if (event.key !== 'Enter') return;
            text = settingsDiv.querySelector('#blacklistAddUser').value
            HelperWASD.addUserToBL(text)
        });

        // bind close settings 
        settingsDiv.querySelector('.close').addEventListener('click', () => {
            settingsDiv.style.animationName = 'hidebetterpanel';
            setTimeout(() => { settingsDiv.style.display = 'none'; }, 350);
            document.body.style.overflowY = "";
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
            	HelperSettings.showMessage(`Чат не найден.`, 'error');
            }
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
        var input1, filter1, ul1, options1, title1, titleline1, i1;
        input1 = document.querySelector('input.option.settingsSearch');
        input1.addEventListener('input', () => {
            filter1 = input1.value.toUpperCase();
            ul1 = document.querySelector("main[data-tab='wasdSettings']");
            options1 = ul1.querySelectorAll("div.option");
            for (i1 = 0; i1 < options1.length; i1++) {
                title1 = options1[i1].querySelector("span.title");
                if (title1) {
                    if (title1.innerHTML.toUpperCase().indexOf(filter1) > -1) { options1[i1].style.display = ""; }
                    else { options1[i1].style.display = "none"; }
                }

                titleline1 = options1[i1].querySelector("span.titleline");
                if (titleline1) {
                    if (filter1 == '') { options1[i1].style.display = ""; }
                    else { options1[i1].style.display = "none"; }
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
                    if (bttvtitle.textContent.toUpperCase().indexOf(bttvfilter) != -1) { bttvoptions[bttvi].style.display = ""; }
                    else { bttvoptions[bttvi].style.display = "none"; }
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
                    if (ffztitle.textContent.toUpperCase().indexOf(ffzfilter) != -1) { ffzoptions[ffzi].style.display = ""; }
                    else { ffzoptions[ffzi].style.display = "none"; }
                }
            }
        });

        var tv7input, tv7filter, tv7ul, tv7options, tv7title, tv7titleline, tv7i;
        tv7input = document.querySelector('input.option.tv7emojiSearch');
        tv7input.addEventListener('input', () => {
            tv7filter = tv7input.value.toUpperCase();
            tv7ul = document.querySelector("main[data-tab='tv7Settings'] > #tv7EmoteList");
            tv7options = tv7ul.querySelectorAll("a.emoteCard");
            for (tv7i = 0; tv7i < tv7options.length; tv7i++) {
                tv7title = tv7options[tv7i].querySelector("span");
                if (tv7title) {
                    if (tv7title.textContent.toUpperCase().indexOf(tv7filter) != -1) { tv7options[tv7i].style.display = ""; }
                    else { tv7options[tv7i].style.display = "none"; }
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
            HelperWASD.download(`BetterWASD-settings.backup`, JSON.stringify(settings));
        });

        for (let user of Object.keys(settings.wasd.blockUserList)) {
            HelperWASD.addUserToBlackList(user)
        }

        // navigation
        for (let navItem of settingsDiv.querySelectorAll('section .items > a')) {
            navItem.addEventListener('click', ({ target }) => {
                let links = settingsDiv.querySelectorAll('section .items > a');
                let tabs = settingsDiv.querySelectorAll('main');
                for (let element of [...tabs, ...links]) {
                    element.classList.remove('active');
                }
                target.classList.add('active');
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
                        HelperSettings.save([event.target.parentElement.querySelector('input[type="text"]')])
                        break;
                    case 'number':
                        event.target.parentElement.querySelector('input[type="number"]').value = settings[split[0]][split[1]][0]
                        HelperSettings.save([event.target.parentElement.querySelector('input[type="number"]')])
                        break; 
                    case 'select':
                        event.target.parentElement.querySelector('select').value = settings[split[0]][split[1]][0]
                        HelperSettings.save([event.target.parentElement.querySelector('select')])
                        break;
                    case 'color':
                        event.target.parentElement.querySelector('input[type="color"]').value = settings[split[0]][split[1]][0]
                        HelperSettings.save([event.target.parentElement.querySelector('input[type="color"]')])
                        break;
                    case 'botevent':
                        if (settings[split[0]][split[1]][0]) {
                            event.target.parentElement.querySelector(`input[id=boolean_${event.target.getAttribute('data-name')}]`).click()
                        } else {
                            event.target.parentElement.querySelector(`input[id=boolean_${event.target.getAttribute('data-name')}_no]`).click()
                        }
                        event.target.parentElement.querySelector('input[type="text"]').value = settings[split[0]][split[1]][0][0]
                        HelperSettings.save([event.target.parentElement.querySelector('input[type="text"]')])
                        break;
                    default:
                        console.log('def')
                }
            });
        }

        // change event
        for (let option of settingsDiv.querySelectorAll('.optionField')) {
            option.addEventListener('change', (event) => {
                HelperSettings.save([event.target]);
            });
        }

        let searchInput = settingsDiv.querySelector('#blacklistAddUser')
        $("#blacklistAddUser").autocomplete({
            source: function(request, response) {
                $.ajax({
                    url: `https://wasd.tv/api/search/profiles?limit=5&offset=0&search_phrase=${searchInput.value.toLowerCase()}`,
                    success: function(data){
                        response($.map(data?.result?.rows, function(item) {
                            return { label: item.user_login, value: item.user_login }
                        }));
                    }
                });
            }
        });

        let searchBTTVUser = settingsDiv.querySelector("#bttvAddUser")
        $("#bttvAddUser").autocomplete({
            source: function(request, response) {
                $.ajax({
                    url: `https://api.twitch.tv/kraken/search/channels?query=${searchBTTVUser.value.toLowerCase()}&limit=5`,
                    headers: {
                        'Client-ID': 'iteua36t3bn764geiij8px2tr5w5bl',
                        Accept: 'application/vnd.twitchtv.v5+json'
                    },
                    success: function(data){
                        response($.map(data.channels, function(item) {
                            return { label: item.display_name, value: item.display_name }
                        }));
                    }
                });
            }
        });

        let searchFFZUser = settingsDiv.querySelector("#ffzAddUser")
        $("#ffzAddUser").autocomplete({
            source: function(request, response) {
                $.ajax({
                    url: `https://api.twitch.tv/kraken/search/channels?query=${searchFFZUser.value.toLowerCase()}&limit=5`,
                    headers: {
                        'Client-ID': 'iteua36t3bn764geiij8px2tr5w5bl',
                        Accept: 'application/vnd.twitchtv.v5+json'
                    },
                    success: function(data){
                        response($.map(data.channels, function(item) {
                            return { label: item.display_name, value: item.display_name }
                        }));
                    }
                });
            }
        });

        let searchTV7User = settingsDiv.querySelector("#tv7AddUser")
        $("#tv7AddUser").autocomplete({
            source: function(request, response) {
                $.ajax({
                    url: `https://api.twitch.tv/kraken/search/channels?query=${searchTV7User.value.toLowerCase()}&limit=5`,
                    headers: {
                        'Client-ID': 'iteua36t3bn764geiij8px2tr5w5bl',
                        Accept: 'application/vnd.twitchtv.v5+json'
                    },
                    success: function(data){
                        response($.map(data.channels, function(item) {
                            return { label: item.display_name, value: item.display_name }
                        }));
                    }
                });
            }
        });

        // load bttv, ffz and 7tv emotes
        await HelperBTTV.update();
        HelperBTTV.loaded();

        await HelperFFZ.update();
        HelperFFZ.loaded();

        await HelperTV7.update();
        HelperTV7.loaded();

        // load chat
        HelperWASD.loaded();

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
        }
    }
}