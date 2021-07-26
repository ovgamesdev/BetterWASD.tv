const HelperSettings = {
    messageTimeout: null,
    availableSettings: {
        general: {
            autoUpdateChat: {
                title: 'Автоматически обновлять чат после изменения опции.',
                type: 'boolean'
            },
            BETA: {
                title: '(BETA) - Эта опция находится в стадии разработки и может работать некорректно.',
                type: 'none'
            },
        },
        wasd: {
            chatAppearance: {
                title: 'Чат',
                type: 'title'
            },
            messageFollower: {
                title: 'Скрыть сообщение о фолловере.',
                type: 'boolean'
            },
            messageSub: {
                title: 'Скрыть сообщение о новом подписчике.',
                type: 'boolean'
            },
            messageSystem: {
                title: 'Скрыть системные сообщения.',
                type: 'boolean'
            },
            messageHover: {
                title: 'Подсвечивать сообщениие при наведении.',
                type: 'boolean'
            },
            colorMessageHover: {
                title: 'Цвет для опции "Подсвечивать сообщениие при наведении".',
                type: 'color'
            },
            wasdIconsSmile: {
                title: 'Cкрыть стикеры / смайлы в панели ввода текста.',
                type: 'boolean'
            },
            wasdIconsCircleRu: {
                title: 'Скрыть поддержать в панели ввода текста. (ru)',
                type: 'boolean'
            },
            bttvEmotes: {
                title: 'Смайлики BTTV в чате. <a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                type: 'boolean'
            },
            ffzEmotes: {
                title: 'Смайлики FFZ в чате. <a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                type: 'boolean'
            },
            bttvInChatMenu: {
                title: 'Опция BTTV в меню смайликов в чате.',
                type: 'boolean'
            },
            ffzInChatMenu: {
                title: 'Опция FFZ в меню смайликов в чате.',
                type: 'boolean'
            },
            bttvEmoteSize: {
                title: 'Разрешение смайликов в чате BTTV и FFZ.<a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                type: 'select',
                items: [
                    { value: 0, label: 'bttv-28px, ffz-32px' },
                    { value: 1, label: 'bttv-56px, ffz-64px' },
                    { value: 2, label: 'bttv-112px, ffz-128px' }
                ]
            },
            sticker: {
                title: `Отображение стикеров WASD. <a title="Минимизировать (увеличить при наведении) зависит от 'Настройки - Вид сообщений в чате - Большой размер стикеров' " class="helpTitleHover">(INFO)</a> <a title="Eсли отключено 'Автоматически обновлять чат после изменений программы'' дважды щелкните 'Close', чтобы обновить чат." class="helpTitleHover">(F5)</a>`,
                type: 'select',
                items: [
                    { value: 0, label: 'По умолчанию' },
                    { value: 1, label: 'Минимизировать' },
                    { value: 2, label: `Минимизировать (увеличить при наведении)` }, // (зависит от 'Вид сообщений в чате - Большой размер стикеров')
                    { value: 3, label: 'Скрыть сообщение' },
                    { value: 4, label: 'Показать сообщение: Стикер' }
                ]
            },
            stickerovg: {
                title: `Отображение стикеров BTTV и FFZ. <a title="Минимизировать (увеличить при наведении) зависит от 'Настройки - Вид сообщений в чате - Большой размер стикеров' " class="helpTitleHover">(INFO)</a> <a title="Eсли отключено 'Автоматически обновлять чат после изменений программы'' дважды щелкните 'Close', чтобы обновить чат." class="helpTitleHover">(F5)</a>`,
                type: 'select',
                items: [
                    { value: 0, label: 'По умолчанию' },
                    { value: 1, label: 'Минимизировать' },
                    { value: 2, label: `Минимизировать (увеличить при наведении)` }, // (зависит от 'Вид сообщений в чате - Большой размер стикеров')
                    { value: 3, label: 'Скрыть сообщение' },
                    { value: 4, label: 'Показать сообщение: Стикер' }
                ]
            },
            bttvSize: {
                title: 'Размер стикеров BTTV и FFZ.',
                type: 'select',
                items: [
                    { value: '128px', label: 'Большой' },
                    { value: '56px', label: 'Маленький' }
                ]
            },
            forceResizeStickers: {
                title: 'Принудиельно изменять размер стикеров WASD.',
                type: 'select',
                items: [
                    { value: 0, label: 'Нет' },
                    { value: 1, label: 'Большой' },
                    { value: 2, label: 'Маленький' }
                ]
            },
            /*decreaseIndentationStickerMenu: {
                title: 'Уменьшить отступ в меню смайликов - СТИКЕРЫ.',
                type: 'boolean'
            },
            decreaseIndentationSmilesMenu: {
                title: 'Уменьшить отступ в меню смайликов - СМАЙЛЫ.',
                type: 'boolean'
            },
            decreaseIndentationBTTVandFFZMenu: {
                title: 'Уменьшить отступ в меню смайликов - BTTV и FFZ.',
                type: 'boolean'
            },
            highlightStickersStickerMenu: {
                title: 'Подсвечивать СМАЙЛЫ, BTTV и FFZ эмоции в меню стикеров.',
                type: 'boolean'
            },*/
            paddingChatMessage: {
                title: 'Заполнение сообщений чата.',
                type: 'select',
                items: [
                    { value: 0, label: 'Twitch (5px 20px)' },
                    { value: 1, label: 'YouTube (4px 24px)' },
                    { value: 2, label: 'GoodGame (4px 9px)' },
                    { value: 3, label: 'Другой (3px 15px)' },
                    { value: 4, label: 'WASD (2px 12px)' }
                ]
            },
            colonAfterNickname: {
                title: 'Двоеточие после никнейма. <a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                type: 'boolean'
            },
            /*smallBadges: {
                title: 'Маленькие значки. <a title="Эта опция находится в стадии разработки и может работать некорректно." class="helpTitleHover">(BETA)</a>',
                type: 'boolean'
            },*/
            colorAtTheMention: {
                title: 'Отображать упоминания пользователей в чата с их цветом никнейма. <a title="Эта опция находится в стадии разработки и может работать некорректно." class="helpTitleHover">(BETA)</a> <a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                type: 'boolean'
            },
            chatWidth: {
                title: 'Размер (Ширина) чата в пикселях. (320)',
                type: 'number',
                min: 200,
                max: 1200
            },
            fontSize: {
                title: 'Размер шрифта в пикселях. (14) <a title="Эта опция находится в стадии разработки и может работать некорректно." class="helpTitleHover">(BETA)</a>',
                type: 'number',
                min: 12.0,
                max: 18.0
            },
            highlightMessagesBold: {
                title: 'Выделять упоминания в чате жирным шрифтом.',
                type: 'boolean'
            },
            streamerMessage: {
                title: 'Скрыть сообщение стримеру (донат).',
                type: 'boolean'
            },
            topPanel: {
                title: 'Скрыть верхнюю панель (донат).',
                type: 'boolean'
            },
            topPanelChallenge: {
                title: 'Скрыть верхнюю панель (испытание).',
                type: 'boolean'
            },
            moderatorMenu: {
                title: 'Меню модератора. <a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                type: 'select',
                items: [
                    { value: 0, label: 'Нет' },
                    { value: 1, label: 'ALT меню (YouTube)' },
                    { value: 2, label: 'Twitch' }
                ]
            },
            moderatorMenuAutomatic: {
                title: 'Автоматически подтверждать бан/удаление (Меню модератора).',
                type: 'boolean'
            },
            moderatorMenuTimeout: {
                title: 'Срок блока "Временно заблокировать" (Меню модератора).',
                type: 'select',
                items: [
                    { value: 1, label: '1 минута' },
                    { value: 10, label: '10 минут' },
                    { value: 60, label: '1 час' }
                ]
            },
            keepMessagesTimeout: {
                title: 'Удалить все сообщения "Временно заблокировать" (Меню модератора).',
                type: 'boolean'
            },
            colorModOptions: {
                title: 'Цвет для опции "Меню модератора".',
                type: 'color'
            },
            alternatingColorChatMessages: {
                title: 'Отображать строки с меняющимеся цветами фона.',
                type: 'boolean'
            },
            alternatingColorChatMessagesColor: {
                title: 'Цвет для опции "Отображать строки с меняющимеся цветами фона".',
                type: 'color'
            },
            onClickMention: {
                title: 'Действие при клике на упоминание пользователя.',
                type: 'select',
                items: [
                    { value: 0, label: 'Нет' },
                    { value: 1, label: 'Добавить в текстовое поле' },
                    { value: 2, label: 'Показать карточку пользователя' }
                ]
            },
            onClickUserName: {
                title: 'Действие при клике на пользователя. <a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                type: 'select',
                items: [
                    { value: 0, label: 'Нет' },
                    { value: 1, label: 'Добавить в текстовое поле' },
                    { value: 2, label: 'Показать карточку пользователя' }
                ]
            },
            onClickUser: {
                title: 'Действие при клике на пользователя или упоминание при зажатой клавише. <a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                type: 'select',
                items: [
                    { value: 0, label: 'Нет' },
                    { value: 1, label: 'Добавить в текстовое поле (Ctrl)' },
                    { value: 2, label: 'Добавить в текстовое поле (Shift)' },
                    { value: 3, label: 'Добавить в текстовое поле (Alt)' }
                ]
            },
            linkColor: {
                title: 'Цвет ссылки.',
                type: 'color',
                /*items: [
                    { value: 0, label: 'Default' },
                    { value: 1, label: 'Google' },
                    { value: 2, label: 'Twitch' },
                    { value: 3, label: 'Blue' }
                ]*/
            },
            fixedLinks: {
                title: 'Исправить ссылки в чате. <a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                type: 'boolean'
            },
            linkRecognizerall: {
                title: 'Распознавание всех ссылок. <a title="Эта опция находится в стадии разработки и может работать некорректно." class="helpTitleHover">(BETA)</a> <a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                description: 'Распознано с использованием <a target="_blank" href="https://github.com/FrankerFaceZ/link-service">API</a>.',
                type: 'boolean'
            },
            linkRecognizerWASD: {
                title: 'Распознавание ссылок wasd.tv. <a title="Эта опция находится в стадии разработки и может работать некорректно." class="helpTitleHover">(BETA)</a> <a title="(wasd.tv/username) (wasd.tv/game/id) (wasd.tv/?record=id) (wasd.tv/?clip=id)" class="helpTitleHover">(i)</a> <a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                type: 'boolean'
            },
            linkRecognitionRights: {
                title: 'Необходимый уровень пользователя для "Распознавание ссылок". <a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                type: 'select',
                items: [
                    { value: 0, label: 'Стример' },
                    { value: 1, label: 'Модератор' },
                    { value: 2, label: 'Подписчик' },
                    { value: 3, label: 'Каждый' }
                ]
            },
            decorationLink: {
                title: 'Подчеркивать ссылки при наведении.',
                type: 'boolean'
            },
            removeMentionBL: {
                title: 'Удалять сообщения упоминающие пользователей в ЧС. <a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                type: 'boolean'
            },
            formatMessageSentTime: {
                title: 'Формат отметок времени. (Для новых сообщений) <a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                description: 'Отформатировано <a target="_blank" href="https://github.com/iamkun/dayjs/blob/dev/docs/ru/README-ru.md">library Day.js</a>.',
                type: 'select',
                items: [
                    { value: 'h:mm', label: '12 часов' },
                    { value: 'h:mm:ss', label: '12 часов с секундами' },
                    { value: 'H:mm', label: '24 часа' },
                    { value: 'H:mm:ss', label: '24 часа с секундами' },
                    { value: 'hh:mm', label: 'Дополнительные' },
                    { value: 'hh:mm:ss', label: 'Дополнительные с секундами' },
                    { value: 'HH:mm', label: 'Дополнительные 24 часа' },
                    { value: 'HH:mm:ss', label: 'Дополнительные 24 часа с секундами' }
                ]
            },
            mentionSelf: {
                title: 'Выделять сообщения, упоминающие вас.',
                type: 'boolean'
            },
            colorMentionSelf: {
                title: 'Цвет сообщения, упоминающие вас.',
                type: 'color'
            },
            highlightMessagesOpenCard: {
                title: 'Выделять сообщения пользователей с открытыми карточками.',
                type: 'boolean'
            },
            highlightMessagesOpenCardColor: {
                title: 'Цвет выделения сообщения пользователя с открытой карточкой.',
                type: 'color'
            },
            clickMentionAll: {
                title: 'Ник пользователя в действиях это упоминание (Избранное, Подписка).',
                type: 'boolean'
            },
            underlineUsernameAndMention: {
                title: 'Подчеркивать имя пользователя/упоминания при наведении.',
                type: 'boolean'
            },
            artificialChatDelay: {
                title: 'Искусственная задержка чата.',
                type: 'select',
                items: [
                    { value: 0, label: 'По умолчанию' },
                    { value: 300, label: 'Модерация ботов; (0,3 сек.)' },
                    { value: 1200, label: 'Умеренная модерация; (1,2 сек.)' },
                    { value: 5000, label: 'Убрать спойлеры (5 сек.)' },
                    { value: 10000, label: 'Очень большая (10 сек.)' },
                    { value: 15000, label: 'Крайне большая (15 сек.)' },
                    { value: 20000, label: 'Задержать чат (20 сек.)' },
                    { value: 30000, label: 'Полминуты (30 сек.)' },
                    { value: 60000, label: 'Зачем??? (1 мин.)' }
                ]
            },

            playerGeneral: {
                title: 'Проигрыватель',
                type: 'title'
            },
            webkitScrollbarWidth: {
                title: 'Скрыть полосу прокрутки плеера.',
                type: 'boolean'
            },
            giftsWrapperSide: {
                title: 'Cкрыть полосу подарков.',
                type: 'boolean'
            },
            giftsWrapperTopRight: {
                title: 'Скрыть подарки вверху справа.',
                type: 'boolean'
            },
            videoOverlay: {
                title: "Скрыть оверлей над проигрывателем.",
                type: 'boolean'
            },
            pictureInPicture: {
                title: "Добавить кнопку 'Картинка в картинке' к управлению проигрывателем. (PIP)",
                type: 'boolean'
            },
            /*resetToPlayer: {
                title: 'Add button `Reset player` to player control. <a title="Эта опция находится в стадии разработки и может работать некорректно." class="helpTitleHover">(BETA)</a>',
                description: 'Добавить кнопку `Сбросить проигрыватель` к управлению проигрывателем.',
                type: 'boolean'
            },*/
            autoPlayStreamersOnMain: {
                title: 'Авто-воспроизведение предложенных стримеров на главной странице.',
                type: 'boolean'
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
            uptimeStream:  {
                title: 'Аптайм трансляции. <a title="Eсли отключено `Автоматически обновлять чат после изменений программы` дважды щелкните `Close`, чтобы обновить чат." class="helpTitleHover">(F5)</a>',
                type: 'boolean'
            },
            alwaysOpenVolumeControl: {
                title: 'Всегда раскрывать регулятор громкости.',
                type: 'boolean'
            },
            mutePlayerOnMiddleMouse: {
                title: 'Заглушить или включить звук проигрывателя путём щелчка по средней кнопке мыши.',
                type: 'boolean'
            },
            iframeCreateClip: {
                title: 'Создавать клипы в проигрывателе а не новом окне.',
                type: 'boolean'
            },

            channelAppearance: {
                title: 'Канал',
                type: 'title'
            },
            hideDonationChannelButton: {
                title: 'Скрыть кнопку пожертвования канал.',
                type: 'boolean'
            },
            hideAmazingChannelButtoan: {
                title: 'Скрыть кнопку похвалить канал.',
                type: 'boolean'
            },
            hideGiftButtons: {
                title: 'Скрыть подарочные кнопки.',
                type: 'boolean'
            },

            appearanceLocation: {
                title: 'Внешний вид',
                type: 'title'
            },
            chatOnTheLeft: {
                title: 'Чат слева.',
                type: 'boolean'
            },
            hidePanelMobile: {
                title: 'Скрыть мешающие панели на мобильном устройстве.',
                type: 'boolean'
            },
            hideBannerOnHome: {
                title: 'Скрыть баннер на главной странице.',
                type: 'boolean'
            },
            hideSelectorStreamSettings: {
                title: 'Скрыть кнопку "Начать стрим" в заголовке.',
                type: 'boolean'
            },
            hideGreatRandom: {
                title: 'Скрыть кнопку "Великий рандом!" в заголовке.',
                type: 'boolean'
            },
            chatMobilePlayer: {
                title: 'Чат после проигрывателя (Мобильные устройства).',
                type: 'boolean'
            }
        },
    },
    showMessage(message, type = 'success') {
        console.log(message, type)
        if (this.messageTimeout) clearTimeout(this.messageTimeout);

        let statusElement = BetterStreamChat.settingsDiv.querySelector('#status');
        let textElement = statusElement.querySelector('p');
        textElement.innerHTML = message;
        textElement.classList.remove(...statusElement.classList);
        textElement.classList.add(type);
        statusElement.classList.add('active');
        let hide = () => {
            statusElement.removeEventListener('click', hide);
            statusElement.classList.remove('active');
            this.messageTimeout = null;
        };
        statusElement.addEventListener('click', hide);
        this.messageTimeout = setTimeout(hide, 2000);
    },
    _basic(title, description, formField, line=false) {
        return `<div class="option">
            <div class="labelField">
                <span ${line ? 'class="titleline" style="padding-left: 5px;' : 'class="title"'}">${title}</span>
                <span class="description">${description || ''}</span>
            </div>
            <div class="formField">${formField}</div>
        </div>`;
    },
    save(optionElements) {
        let newSettings = JSON.parse(JSON.stringify(settings));
        for (let option of optionElements) {
            if (!option.dataset.name) continue;

            let split = option.dataset.name.split('_');
            let value = null;

            if (option.type === 'radio' && option.classList.contains('botevent')) {
                value = [settings[split[0]][split[1]][0], [settings[split[0]][split[1]][1][0], option.checked && option.value === '1']];
            } else if (option.type === 'text' && option.classList.contains('botevent')) {
                value = [settings[split[0]][split[1]][0], [option.value, settings[split[0]][split[1]][1][1]] ];
            } else if (option.type === 'radio') {
                value = [settings[split[0]][split[1]][0], option.checked && option.value === '1'];
            } else if (option.type === 'checkbox') {
                value = [settings[split[0]][split[1]][0], option.checked];
            } else if (option.dataset.type === 'number' || option.type === 'number') {
                value = [settings[split[0]][split[1]][0], parseFloat(option.value)];
            } else {
                value = [settings[split[0]][split[1]][0], option.value];
            }

            if (!newSettings[split[0]]) newSettings[split[0]] = {};

            newSettings[split[0]][split[1]] = value;

            let onChange = this.availableSettings[split[0]][split[1]].onChange;
            if (typeof onChange === 'function') onChange(value);
        }

        setTimeout(() => {
            if (settings.general.autoUpdateChat[1]) {
                let header_block_menu = document.querySelector('.header > div.header__block__menu')
                let header_update = document.querySelector('.update > i')
                if (header_block_menu) {
                    if (header_block_menu.childNodes.length >= 1) {
                        header_update.classList.add('resetPlayerLoading');
                        if (header_block_menu.childNodes[1].nodeName != "#comment") {
                            header_block_menu.childNodes[1].click();
                        } else {
                            header_update.classList.remove('resetPlayerLoading');
                        }
                        if (header_block_menu.childNodes[0].nodeName != "#comment") {
                            header_block_menu.childNodes[0].click();
                        }
                        setTimeout(() => {
                            header_update.classList.remove('resetPlayerLoading');
                        }, 1000);
                    } else { header_update.classList.remove('resetPlayerLoading'); }
                }
            }
        }, 50);
        
        chrome.storage[storageType].set(newSettings, () => { this.showMessage('параметры сохранены'); });
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
                    html += this.boolean(fieldName, setting.title, setting.description, settings[category][name]);
                } else if (type === 'text') {
                    html += this.text(fieldName, setting.title, setting.description, settings[category][name]);
                } else if (type === 'number') {
                    html += this.number(fieldName, setting.title, setting.description, settings[category][name], setting.min, setting.max);
                } else if (type === 'select') {
                    html += this.select(fieldName, setting.title, setting.description, setting.items, settings[category][name]);
                } else if (type === 'none') {
                    html += this.none(fieldName, setting.title, setting.description, settings[category][name]);
                } else if (type === 'title') {
                    html += this.title(fieldName, setting.title, setting.description, settings[category][name]);
                } else if (type === 'color') {
                    html += this.color(fieldName, setting.title, setting.description, settings[category][name]);
                } else if (type === 'botevent') {
                    html += this.botevent(fieldName, setting.title, setting.description, settings[category][name]);
                }
            }
        }
        return html;
    },
    boolean(name, title, description, defaultValue = false, yesButton = 'Вкл', noButton = 'Откл') {
        if (typeof defaultValue[1] === 'undefined') {
            updateSettingsToNew()
            return ''
        } else {
            return this._basic(title, description, `
                <ol class="flexibleButtonGroup optionTypeBoolean">
                    <li>
                        <input type="radio" id="boolean_${name}" name="boolean_${name}" value="1" class="optionField" data-name="${name}" ${defaultValue[1] ? 'checked' : ''}>
                        <label for="boolean_${name}" class="green"><span class="icon16 fa-check"></span> ${yesButton}</label>
                    </li>
                    <li>
                        <input type="radio" id="boolean_${name}_no" name="boolean_${name}" value="0" class="optionField" data-name="${name}" ${!defaultValue[1] ? 'checked' : ''}>
                        <label for="boolean_${name}_no" class="red"><span class="icon16 fa-times"></span> ${noButton}</label>
                    </li>
                    <button class="optionField def" data-name="${name}" option-type="boolean"><div class="tooltip-ovg"> Сбросить по умолчанию </div><i _ngcontent-khk-c259="" class="wasd-icons-close"></i></button>
                </ol>`);
        }
    },
    text(name, title, description, defaultValue = '') {
        if (typeof defaultValue[1] === 'undefined') {
            updateSettingsToNew()
            return ''
        } else {
            return this._basic(title, description, `
            <ol class="flexibleButtonGroup optionTypeBoolean">
                <input type="text" class="optionField" data-name="${name}" value="${defaultValue[1]}" />
                <button class="optionField def" data-name="${name}" option-type="text"><div class="tooltip-ovg"> Сбросить по умолчанию </div><i _ngcontent-khk-c259="" class="wasd-icons-close"></i></button>
            </ol>`);
        }
    },
    number(name, title, description, defaultValue = '', min = 0, max = 0) {
        if (typeof defaultValue[1] === 'undefined') {
            updateSettingsToNew()
            return ''
        } else {
            return this._basic(title, description, `
            <ol class="flexibleButtonGroup optionTypeBoolean">
                <input type="number" class="optionField" data-name="${name}" value="${defaultValue[1]}" ${min ? 'min="' + min + '" ' : ''}${max ? 'max="' + max + '"' : ''}/>
                <button class="optionField def" data-name="${name}" option-type="number"><div class="tooltip-ovg"> Сбросить по умолчанию </div><i _ngcontent-khk-c259="" class="wasd-icons-close"></i></button>
            </ol>`);
        }
    },
    select(name, title, description, items = [], defaultValue = '') {
        if (typeof defaultValue[1] === 'undefined') {
            updateSettingsToNew()
            return ''
        } else {
            let selectOptions = '';
            defaultValue[1] = defaultValue[1].toString();
            for (let item of items) {
                selectOptions += `<option value="${item.value}"${item.value.toString() === defaultValue[1] ? ' selected' : ''}>${item.label}</option>`;
            }
            return this._basic(title, description, `
            <ol class="flexibleButtonGroup optionTypeBoolean">
                <select class="optionField" data-name="${name}">${selectOptions}</select>
                <button class="optionField def" data-name="${name}" option-type="select"><div class="tooltip-ovg"> Сбросить по умолчанию </div><i _ngcontent-khk-c259="" class="wasd-icons-close"></i></button>
            </ol>`);
        }
    },
    none(name, title, description, defaultValue = '') {
        return this._basic(title, description, ``, false);
    },
    title(name, title, description, defaultValue = '') {
        return this._basic(title, description, ``, true);
    },
    color(name, title, description, defaultValue = '') {
        if (typeof defaultValue[1] === 'undefined') {
            updateSettingsToNew()
            return ''
        } else {
            return this._basic(title, description, `
            <ol class="flexibleButtonGroup optionTypeBoolean">
                <input type="color" class="optionField" data-name="${name}" value="${defaultValue[1]}" />
                <button class="optionField def" data-name="${name}" option-type="color"><div class="tooltip-ovg"> Сбросить по умолчанию </div><i _ngcontent-khk-c259="" class="wasd-icons-close"></i></button>
            </ol>`);
        }
    },
    botevent(name, title, description, defaultValue = ['', false], yesButton = 'Вкл', noButton = 'Откл') {
        if (typeof defaultValue[1] === 'undefined') {
            updateSettingsToNew()
            return ''
        } else {
            return this._basic(title, description, `
                <ol class="flexibleButtonGroup optionTypeBoolean">
                    <input type="text" class="optionField botevent" data-name="${name}" value="${defaultValue[1][0]}"/>
                    <li>
                        <input type="radio" id="boolean_${name}" name="boolean_${name}" value="1" class="optionField botevent" data-name="${name}" ${defaultValue[1][1] ? 'checked' : ''}>
                        <label for="boolean_${name}" class="green"><span class="icon16 fa-check"></span> ${yesButton}</label>
                    </li>
                    <li>
                        <input type="radio" id="boolean_${name}_no" name="boolean_${name}" value="0" class="optionField botevent" data-name="${name}" ${!defaultValue[1][1] ? 'checked' : ''}>
                        <label for="boolean_${name}_no" class="red"><span class="icon16 fa-times"></span> ${noButton}</label>
                    </li>
                    <button class="optionField def" data-name="${name}" option-type="botevent"><div class="tooltip-ovg"> Сбросить по умолчанию </div><i _ngcontent-khk-c259="" class="wasd-icons-close"></i></button>
                </ol>`
            );
        }
    },
}