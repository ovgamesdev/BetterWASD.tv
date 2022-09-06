const wasd = {
  style: null,
  isObserverEndBind: false,
  isObserverEndBindBody: false,
  observer: null,
  href: "",
  init() {
    ovg.log("init");
    HelperWASD.loadBwasdData();
    const config = {
      // attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    };

    const callback = async (mutationsList, observer) => {
      for (let mutation of mutationsList) {
        const { addedNodes, removedNodes } = mutation;

        // if (removedNodes.length != 0) console.log('321 removedNodes', removedNodes)
        // if (addedNodes.length != 0) console.log('321 addedNodes', addedNodes)

        // work
        // const a2 = [...addedNodes]
        //   .filter(node => node.nodeType === 1)
        //   .filter(element => element.matches('div.card-wrapper-content'));
        //   // .post-item__image > img
        //   // https://wasd.tv/subscriptions/posts пост
        // if (a2.length) {
        //   let icon = a2[0].querySelector('.card-wrapper-content__img > img')
        //   let username = a2[0].querySelector('.card-wrapper-content__login').textContent

        //   if (username.trim() == 'EmTorn') icon.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png'
        //   // console.log('пост', icon, username)

        //   // $(icon).attrchange({
        //   //   trackValues: true,
        //   //   callback: function (event) {
        //   //     console.log(event)
        //   //   }
        //   // });
        // }

        // const a3 = [...addedNodes]
        //   .filter(node => node.nodeType === 1)
        //   .filter(element => element.matches('a.comment-item__avatar'));
        //   // img
        //   // https://wasd.tv/subscriptions/posts комент поста
        // if (a3.length) {
        //   let icon = a3[0].querySelector('img')
        //   // let username = a3[0].querySelector('.comment-info__login').textContent
        //   // icon.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png'
        //   // console.log('комент поста', icon, username)
        // }

        // post self icon

        // work
        // const a4 = [...addedNodes]
        //   .filter(node => node.nodeType === 1)
        //   .filter(element => element.matches('div.clip-card-list__item') || element.matches('div.clip-card'));
        //   // .clip-card__info--avatar > img
        //   // https://wasd.tv/subscriptions/clips клип
        // if (a4.length) {
        //   let icon = a4[0].querySelector('.clip-card__info--avatar > img')
        //   let username = a4[0].querySelector('.clip-card__info--descr__channel').textContent

        //   if (username.trim() == 'TwistAssist') icon.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png'
        //   // console.log('клип', icon, username)

        //   $(icon).attrchange({
        //     trackValues: true,
        //     callback: function (event) {
        //       if (event.attributeName == 'src' && event.newValue.match('st.wasd.tv') && username.trim() == 'TwistAssist') icon.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png'
        //     }
        //   });
        // }

        // const a5 = [...addedNodes]
        //   .filter(node => node.nodeType === 1)
        //   .filter(element => element.matches('div.streams-layout__card'));
        //   // .stream-card__avatar > img
        //   // https://wasd.tv/subscriptions/videos видео
        // if (a5.length) {
        //   let icon = a5[0].querySelector('.stream-card__avatar > img')
        //   // let username = a5[0].querySelector('.user-plays  a:nth-child(1)').textContent
        //   // icon.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png'
        //   // console.log('видео', icon, username)
        // }
        // не всегда прогружает аватарки

        // const a6 = [...addedNodes]
        //   .filter(node => node.nodeType === 1)
        //   .filter(element => element.matches('div.channel-preview'));
        //   // .channel-preview__img // background-image: url()
        //   // https://wasd.tv/subscriptions/favorites пользователь
        // if (a6.length) {
        //   let icon = a6[0].querySelector('.channel-preview__img')
        //   // let username = a6[0].querySelector('.channel-preview__name').textContent
        //   // if (username == 'Beerqules') icon.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png'
        //   console.log('пользователь', icon, a6[0])
        // }

        const add_chat = [...addedNodes].filter((node) => node.nodeType === 1).filter((element) => element.matches("wasd-chat-messages"));

        const remove_chat = [...removedNodes]
          .filter((node) => node.nodeType === 1)
          .filter((element) => element.matches("wasd-chat-messages") || element.matches("wasd-chat-wrapper") || element.matches("wasd-channel"));

        const add_player_buttons_stream = [...addedNodes].filter((node) => node.nodeType === 1).filter((element) => element.matches("div.media-control"));

        // const add_settings_button_burger = [...addedNodes]
        //   .filter(node => node.nodeType === 1)
        //   .filter(element => element.matches('div#topDiv.fixed-wrapper'));

        const add_wasd_chat_message = [...addedNodes]
          .filter((node) => node.nodeType === 1)
          .filter((element) => element.matches("wasd-chat-message").parentNode || element.matches("div.block__messages__item"));

        const add_emoji_menu = [...addedNodes].filter((node) => node.nodeType === 1).filter((element) => element.matches("wasd-chat-emoji"));

        const add_chat_menu = [...addedNodes].filter((node) => node.nodeType === 1).filter((element) => element.matches("div.menu__block.menu__block-header"));

        const add_carousel_container_chromeless = [...addedNodes].filter((node) => node.nodeType === 1).filter((element) => element.matches("div.container.chromeless"));

        const add_carousel_pending = [...addedNodes].filter((node) => node.nodeType === 1).filter((element) => element.matches("div.pending"));

        const add_uptime = [...addedNodes].filter((node) => node.nodeType === 1).filter((element) => element.matches("div.player-info") || element.matches("div.stream-viewers"));

        // const add_playerInfo = [...addedNodes]
        //   .filter(node => node.nodeType === 1)
        //   .filter(element => element.matches('div.player-info'));

        // const add_channelInfo = [...addedNodes]
        //   .filter(node => node.nodeType === 1)
        //   .filter(element => element.matches('div.channel-info-wrap'));

        // const add_profileHead = [...addedNodes]
        //   .filter(node => node.nodeType === 1)
        //   .filter(element => element.matches('section.section-profile-head'));

        // const add_channelProfile = [...addedNodes]
        //   .filter(node => node.nodeType === 1)
        //   .filter(element => element.matches('div.channel-preview'));

        // const add_channelHeader = [...addedNodes]
        //   .filter(node => node.nodeType === 1)
        //   .filter(element => element.matches('wasd-channel-header'));

        const add_wasd_chat_header = [...addedNodes].filter((node) => node.nodeType === 1).filter((element) => element.matches("div.header"));

        const add_header = [...addedNodes].filter((node) => node.nodeType === 1).filter((element) => element.matches("div#topDiv.fixed-wrapper"));

        // const add_giftsInfo = [...addedNodes]
        //   .filter(node => node.nodeType === 1)
        //   .filter(element => element.matches('div#giftsInfo.gifts-info'));

        const remove_uptime = [...addedNodes].filter((node) => node.nodeType === 1).filter((element) => element.matches("div.player-info__stat-value"));

        const add_streaming_player = [...addedNodes].filter((node) => node.nodeType === 1).filter((element) => element.matches("div.container"));

        const add_wasd_player = [...addedNodes].filter((node) => node.nodeType === 1).filter((element) => element.matches("wasd-player#player.player"));

        const add_user_item = [...addedNodes].filter((node) => node.nodeType === 1).filter((element) => element.matches("div.users__item.item--hover"));

        const add_wasd_player_component = [...addedNodes].filter((node) => node.nodeType === 1).filter((element) => element.matches("wasd-player-component"));

        const add_wasd_chat_footer = [...addedNodes].filter((node) => node.nodeType === 1).filter((element) => element.matches("#chat-footer-block.footer"));

        const add_wasd_modal_window = [...addedNodes].filter((node) => node.nodeType === 1).filter((element) => element.matches("wasd-modal-window.show"));

        const add_channel_item_navigation = [...addedNodes].filter((node) => node.nodeType === 1).filter((element) => element.matches("a.channels__item"));

        const add_chat_paid_message = [...addedNodes].filter((node) => node.nodeType === 1).filter((element) => element.matches("wasd-chat-paid-messages"));

        const add_chat_context_message = [...addedNodes].filter((node) => node.nodeType === 1).filter((element) => element.matches("wasd-chat-context-menu"));

        const add_li = [...addedNodes].filter((node) => node.nodeType === 1).filter((element) => element.matches("li"));

        if (add_li.length) {
          if (add_li[0].querySelector(".wasd-icons-settings")) addBetterButtonToHeader();
        }

        if (add_chat_context_message.length) {
          context_menu = add_chat_context_message[0].childNodes[0];
          if (!context_menu.querySelector(".contextBlacklistAddUser") && settings.wasd.addContextBlacklistAddUser) {
            let item = document.createElement("div");
            item.classList.add(`context-menu__block`);
            item.setAttribute("ovg", "");
            item.innerHTML = `<div class="context-menu__block__icon contextBlacklistAddUser"><i class="icon wasd-icons-cross"></i></div><div class="context-menu__block__text"> Добавить в ЧС </div>`;
            context_menu.append(item);
            const usernameTextCached = context_menu.closest(".block__messages__item").dataset.user_login;
            console.log(usernameTextCached);
            item.addEventListener("click", () => {
              if (!settings.list.blockUserList[usernameTextCached]) {
                HelperWASD.showChatMessage(`Пользователь ${usernameTextCached} добавлен в ЧС`, "success");
                settings.list.blockUserList[usernameTextCached] = new Date();
                HelperWASD.addUserToBlackList(usernameTextCached);
                HelperSettings.save([document.querySelector(".optionField")]);
              } else {
                HelperWASD.showChatMessage("Пользователь уже в ЧС, обновите чат!", "warning");
              }
              context_menu.closest(".block__messages__item")?.click();
            });
          }
        }

        if (add_chat_paid_message.length) {
          const user = add_chat_paid_message[0].querySelector(".message-title__name");
          if (user && settings.wasd.betterwasyaPaint) {
            let userPaint = HelperBWASYA.paints[user.textContent.trim()];
            if (userPaint) {
              if (userPaint.length < 5) {
                user.dataset.betterwasyaPaint = userPaint;
              } else if (userPaint.match("gradient")) {
                user.style.backgroundImage = userPaint;
                user.dataset.betterwasyaPaint = "";
              } else {
                user.style.color = userPaint;
                user.dataset.betterwasyaPaintColor = userPaint;
              }
            }
          }

          const input = add_chat_paid_message[0].querySelector("textarea");
          if (input) HelperWASD.inputEvents(input);
        }

        if (add_channel_item_navigation.length) {
          const item = add_channel_item_navigation[0];
          item.dataset.online = !!item.querySelector(".channels__item-icon-wrap").className.match("online");
        }

        if (add_wasd_modal_window.length) {
          let icons = add_wasd_modal_window[0].querySelector(".bonuses__icons")?.querySelectorAll("img");
          if (icons) {
            for (let icon of icons) {
              for (let badge in HelperBWASYA.subBadges) {
                if (icon.src?.match(badge)) icon.src = HelperBWASYA.subBadges[badge].replace("url(", "").replace(")", "");
              }
            }
          }
        }

        if (add_wasd_chat_footer.length) {
          const footer = add_wasd_chat_footer[0];
          let div = document.createElement("div");
          div.classList.add("footer__block__icons__item");
          div.classList.add("gifts");
          div.setAttribute("ovg", "");
          div.innerHTML = `<i class="icon wasd-icons-xp"></i>`;
          footer.querySelector(".footer__block__icons").appendChild(div);

          div.addEventListener("click", () => {
            let giftsInfo = document.querySelector("#giftsInfo");
            if (!giftsInfo) return;
            if (giftsInfo.style.display == "") {
              giftsInfo.style.display = "flex";
            } else {
              giftsInfo.style.display = "";
            }
            HelperWASD.updateStyleTheaterModeNoFS();
            resizeTheaterModeNoFS(false);
          });

          const input = footer.querySelector("textarea");
          if (input) HelperWASD.inputEvents(input);
        }

        // if (add_playerInfo.length) {
        //   let icon = add_playerInfo[0].querySelector('.channel__avatar')
        //   let username = add_playerInfo[0].querySelector('.user-plays  a:nth-child(1)').textContent

        //   icon.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png'
        //   console.log(icon, username)
        // }

        // if (add_channelInfo.length) {
        //   let icon = add_channelInfo[0].querySelector('.channel-info__avatar > img')
        //   let username = add_channelInfo[0].querySelector('.channel-name > h3').textContent

        //   if (username.trim() == 'OvGames') icon.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png'
        //   console.log(icon, username)
        // }

        // if (add_channelHeader.length) {
        //   let icon = add_channelHeader[0].querySelector('img.channel-image')
        //   let username = add_channelHeader[0].querySelector('.channel-info__name').textContent

        //   if (username.trim() == 'OvGames') icon.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png'
        //   console.log(icon, username)
        // }

        // if (add_profileHead.length) {
        //   let icon = add_profileHead[0].querySelector('.profile-main__avatar')
        //   let username = add_profileHead[0].querySelector('.profile-main__name').textContent

        //   if (username.trim() == 'OvGames') icon.style.backgroundImage = 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png)'
        //   console.log(icon, username)
        // }

        // if (add_channelProfile.length) {
        //   let icon = add_channelProfile[0].querySelector('.channel-preview__img')
        //   let username = add_channelProfile[0].querySelector('.channel-preview__name').textContent

        //   if (username.trim() == 'OvGames') icon.style.backgroundImage = 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png)'
        //   console.log(icon, username)
        // }

        const isLive =
          new URL(document.URL).pathname.split("/")[2] != "videos" &&
          new URL(document.URL).pathname.split("/")[2] != "clips" &&
          document.querySelector("wasd-user-plays .user-plays__text")?.textContent != "стримил";

        if (add_wasd_player_component.length && settings.wasd.theaterModeAutoOnChannel) {
          HelperWASD.isTheaterModeNoFS = true;
          HelperWASD.updateStyleTheaterModeNoFS();
          resizeTheaterModeNoFS();
          document.querySelector(".chat-container")?.classList.add("theaterModeNoFS");
          document.querySelector(".content-wrapper")?.classList.add("theaterModeNoFS");
          let button = document.querySelector("button.theaterModeNoFS");
          if (button)
            button.querySelector(
              "svg"
            ).outerHTML = `<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path fill="#FFF" d="M.447.431c.26-.258.691-.277 1.016.051l13.963 13.944c.328.325.244.763 0 1.004-.243.242-.644.345-.99 0L.5 1.48C.16 1.14.188.69.447.432zM1.998 3l9.71 9.707A.997.997 0 0111 13H1a1 1 0 01-1-1V4a1 1 0 011-1h.998zM15 3a1 1 0 011 1v8a.997.997 0 01-.292.706L13 9.998V4a1 1 0 011-1h1zm-4 0a1 1 0 011 1v5L5.999 3H11z"></path></svg>`;
          if (button) button.querySelector(".tooltip").textContent = `Выйти из режима кинотеатра`;
        }

        if (add_user_item.length) {
          let username = add_user_item[0].querySelector(".item") ? add_user_item[0].querySelector(".users__item-name") : null;
          let modRef = add_user_item[0].querySelector(".is-moderator");
          let ownerRef = add_user_item[0].querySelector(".is-owner");

          if (username) {
            if (modRef && settings.wasd.showModeratorBadge.toString() == "2") {
              modRef.classList.remove("is-moderator");
              modRef.querySelector(".icon.wasd-icons-moderator").remove();
              add_user_item[0]
                .querySelector(".item")
                .insertAdjacentHTML("beforebegin", `<div class="info__text__status-ovg-badge" style="background: url(${git_url}/badges/moderator.webp) rgb(0,173,3);"><i class="icon"></i></div>`);
            }
            if (ownerRef && settings.wasd.showOwnerBadge.toString() == "2") {
              ownerRef.classList.remove("is-owner");
              ownerRef.querySelector(".icon.wasd-icons-owner").remove();
              add_user_item[0]
                .querySelector(".item")
                .insertAdjacentHTML("beforebegin", `<div class="info__text__status-ovg-badge" style="background: url(${git_url}/badges/owner.webp) rgb(233,25,22);"><i class="icon"></i></div>`);
            }

            let userPaint = settings.wasd.betterwasyaPaint ? HelperBWASYA.paints[username.textContent.trim()] : null;
            if (userPaint)
              username.innerHTML = username.innerHTML.replace(/> ([a-zA-Z0-9_-]+) /i, ($0) => {
                let username = settings.wasd.userNameEdited[$0.split(">").join("").trim()];
                if (!username) username = $0.split(">").join("").trim();
                return `><span ${
                  !userPaint
                    ? ""
                    : userPaint.length < 5
                    ? 'data-betterwasya-paint="' + userPaint + '"'
                    : userPaint.match("gradient")
                    ? ' data-betterwasya-paint="" style="background-image:' + userPaint + '"'
                    : 'data-betterwasya-paint-color="' + userPaint + '" style="color:' + userPaint + '"'
                }>${username}</span>`;
              });

            let allbadge = HelperBWASYA.badges[username.textContent.trim()];
            if (allbadge && allbadge.badges.length > 0) {
              for (let badg of allbadge.badges) {
                add_user_item[0]
                  .querySelector(".item")
                  .insertAdjacentHTML("beforebegin", badg.html.replace("{user_color}", `${HelperWASD.userColors[allbadge.user_id % (HelperWASD.userColors.length - 1)]}`));
              }
            }

            let userSub = HelperWASD.subscribers[username.textContent.trim()];
            if (userSub && settings.wasd.subscriberOnUserList) {
              let _currentPeriod = { iconUrl: "" };
              HelperWASD.subscriptionPeriods.every((t) => !(t.startDays > userSub.meta.days_as_sub + 1 || ((_currentPeriod = t), 0)));
              let subtext = `${userSub.meta.days_as_sub} дней подписки`;
              let icon = `url(${_currentPeriod.iconUrl})`;

              for (let badge in HelperBWASYA.subBadges) {
                if (icon.match(badge)) icon = HelperBWASYA.subBadges[badge];
              }

              add_user_item[0]
                .querySelector(".item")
                .insertAdjacentHTML(
                  "beforebegin",
                  `<div class="tooltip-hover" style="display: flex;"> <div ovg="" class="badge_div" style="height: 20px; width: 20px; background-image: ${icon};"><!--i badge="" class="icon wasd-icons-star"    style="position: relative;top: 2px;"></i--></div> <ovg-tooltip style="position: relative;pointer-events: none;"><div class="tooltip tooltip_position-right tooltip_size-small" style="width: 260px;margin: 0 0px 26px -2px;"><div class="tooltip-content tooltip-content_left"> ${subtext} </div></div></ovg-tooltip></div>`
                );
            }
          }
        }

        if (add_chat.length) {
          HelperWASD.add_chat();
        }
        if (remove_chat.length) {
          socket.leave();
        }

        if (add_player_buttons_stream.length) {
          if (add_player_buttons_stream[0].className.match("live")) {
            HelperWASD.createClipByOvg(settings.wasd.iframeCreateClip);
            HelperWASD.updateUptimeStreamMobile(settings.wasd.uptimeStreamMobile);
          }

          HelperWASD.addPipToPlayer(settings.wasd.pictureInPicture);
          HelperWASD.addTheaterModeNoFSToPlayer(settings.wasd.theaterModeNoFS);
        }

        if (add_wasd_chat_message.length) {
          let is = false;
          if (add_wasd_chat_message[0] == document.querySelector(".block__messages")?.lastElementChild) {
            is = true;
            if (!!socket.channelId) {
              is = true;
            }
          }
          wasd.handleMessage(add_wasd_chat_message[0], is);
        }

        if (add_emoji_menu.length) {
          if (settings.wasd.bwasdEmotes && settings.wasd.bwasdInChatMenu) HelperBWASYA.addToChatMenu();
          if (settings.wasd.bttvEmotes && settings.wasd.tv7InChatMenu) HelperTV7.addToChatMenu();
          if (settings.wasd.ffzEmotes && settings.wasd.bttvInChatMenu) HelperBTTV.addToChatMenu();
          if (settings.wasd.tv7Emotes && settings.wasd.ffzInChatMenu) HelperFFZ.addToChatMenu();
        }

        if (add_chat_menu.length) {
          HelperWASD.addToMenu(add_chat_menu[0].parentNode);
        }

        if (add_carousel_container_chromeless.length && !settings.wasd.autoPlayStreamersOnMain) {
          let video = add_carousel_container_chromeless[0].querySelector("video");

          video?.addEventListener("play", () => {
            if (!settings.wasd.autoPlayStreamersOnMain) video.pause();
          });
        }
        if (add_carousel_pending.length && !settings.wasd.autoPlayStreamersOnMain) {
          add_carousel_pending[0].style.display = "none";
        }

        if (add_uptime.length) {
          HelperWASD.updateUptimeStream(settings.wasd.uptimeStream);
        }

        if (remove_uptime.length) {
          HelperWASD.updateUptimeStream(false);
        }

        if (add_wasd_chat_header.length) {
          HelperWASD.updateMoveHideChat(settings.wasd.moveHideChat);

          let button = document.querySelector(".chat-container__btn-open--desktop");
          button?.addEventListener("click", () => {
            if (document.querySelector(".chat-container__btn-open--desktop > i")?.className === "wasd-icons-right" && settings.wasd.moveHideChat) {
              button.style.display = "none";
            } else {
              button.style.display = "";
            }
          });
        }

        if (add_wasd_chat_header.length && isLive && socket.socketd?.readyState != 1) {
          add_wasd_chat_header[0].lastChild.insertAdjacentHTML(
            "beforebegin",
            `<div class="lds-ring websocket_loader tooltip-hover" style="height: 100%;position: absolute;right: 40px;" ovg=""><svg x="0px" y="0px" viewBox="0 0 150 150" class="icon-pending-ovg"><circle cx="75" cy="75" r="60" class="icon-pending-inner-ovg"></circle></svg><ovg-tooltip style="position: absolute;left: 0px;"><div class="tooltip tooltip_position-left tooltip_size-small" style="width: 260px;"><div class="tooltip-content tooltip-content_left"> Ожидаем подключение WebSocket </div></div></ovg-tooltip></div>`
          );
        }

        if (add_header.length && isLive) {
          addToHeader();
        }

        if (add_streaming_player.length && document.querySelector("wasd-stream-preview") && !settings.wasd.autoPlayPreviewOnStreaming) {
          let video = add_streaming_player[0].querySelector("video");
          let i = 0;
          video?.addEventListener("play", () => {
            if (i == 0 && !settings.wasd.autoPlayPreviewOnStreaming) {
              video.pause();
              i++;
              document.querySelector(".stream-preview__placeholder")?.remove();
            }
          });
        }

        if (add_wasd_player.length) {
          add_wasd_player[0].onmousedown = (e) => {
            if (settings.wasd.mutePlayerOnMiddleMouse && e.button == 1) {
              document.querySelector(".player-button.volume-button").click();
              return false;
            }
          };
        }
      }

      if (location.href !== wasd.href) {
        wasd.href = location.href;

        if (location.href.toLowerCase().indexOf(socket.channel?.channel?.channel_name?.toLowerCase()) === -1) {
          socket.leave();
          HelperWASD.add_chat();
        }

        if (location.href.indexOf(HelperWASD.TMChannel) === -1) {
          let playerWrapper = document.querySelector(".player-wrapper");
          let streamInfo = document.querySelector("#streamInfo");
          let button = document.querySelector("button.theaterModeNoFS");
          let svg = button?.querySelector("svg");
          let tooltip = button?.querySelector(".tooltip");

          if (document.fullscreen || document.webkitIsFullScreen) {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
              document.webkitExitFullscreen();
            }
          }
          HelperWASD.isTheaterModeNoFS = false;
          HelperWASD.updateStyleTheaterModeNoFS();
          if (playerWrapper) playerWrapper.style.height = "";
          if (streamInfo) streamInfo.style.width = "";
          if (svg)
            svg.outerHTML = `<svg width="16" height="16" viewBox="0 0 16 10" xmlns="http://www.w3.org/2000/svg"><path fill="#FFF" d="M15 0a1 1 0 011 1v8a1 1 0 01-1 1h-1a1 1 0 01-1-1V1a1 1 0 011-1h1zm-4 0a1 1 0 011 1v8a1 1 0 01-1 1H1a1 1 0 01-1-1V1a1 1 0 011-1h10z"></path></svg>`;
          if (tooltip) tooltip.textContent = `Режим кинотеатра`;
          document.querySelector(".chat-container")?.classList.remove("theaterModeNoFS");
          document.querySelector(".content-wrapper")?.classList.remove("theaterModeNoFS");
          if (document.querySelector("#giftsInfo")) document.querySelector("#giftsInfo").style.display = "";
        }
      }
    };

    const observer = new MutationObserver(callback);

    observer.observe(document.body, config);

    if (this.style === null) {
      this.style = document.createElement("style");
      this.style.type = "text/css";
      document.body.append(this.style);
      wasd.updatestyle();

      let fontStyle = document.createElement("style");
      fontStyle.type = "text/css";
      fontStyle.innerHTML = "";
      fontStyle.appendChild(
        document.createTextNode(`@font-face {
        font-family: 'ovg-icons';
        src:  url(${chrome.runtime.getURL("css/fonts/ovg-icons.ttf")}?batw30) format('truetype'),
          url(${chrome.runtime.getURL("css/fonts/ovg-icons.woff")}?batw30) format('woff'),
          url(${chrome.runtime.getURL("css/fonts/ovg-icons.svg")}?batw30#ovg-icons) format('svg');
        font-weight: normal;
        font-style: normal;
        font-display: block;
      }`)
      );

      document.body.append(fontStyle);
    }

    const fixMobilePlayer = () => {
      setTimeout(() => {
        if (document.querySelector(".theatre-mode-mobile")) {
          document.querySelector(".theatre-mode-mobile").classList.remove("theatre-mode-mobile");
          document.querySelector(".chat-container__btn-open--mobile").addEventListener("click", () => {
            document.querySelector(".player-wrapper").classList.add("theatre-mode-mobile");
          });
          document.querySelector(".chat-container__btn-close--mobile").addEventListener("click", () => {
            document.querySelector(".player-wrapper").classList.remove("theatre-mode-mobile");
          });
        } else {
          fixMobilePlayer();
        }
      }, 100);
    };

    fixMobilePlayer(); // tr_optimization

    const addBetterButtonToHeader = () => {
      let selectorSettings = document.querySelector("li#selector-bm-ovg-settings");
      if (!BetterStreamChat.isSettingsNewWindow && !selectorSettings) {
        document
          .querySelector("wasd-profile-menu #profile-menu .profile-menu__list .wasd-icons-settings")
          ?.closest("li")
          ?.insertAdjacentHTML(
            "beforebegin",
            `<li id="selector-bm-ovg-settings"><a class="profile-menu__link"><i class="wasd-icons-settings-profile"></i><span> BetterWASYA настройки </span></a></li>`
          );
        document.querySelector("li#selector-bm-ovg-settings")?.addEventListener("click", Helper.showSettings);
      }
    };

    const addToHeader = () => {
      addBetterButtonToHeader();
      let toggle = document.querySelector(".header__left-side .header__nav-sidebar-toggle");
      if (toggle) document.querySelector(".header__right-side")?.append(toggle.cloneNode(true));
      let newtoggle = document.querySelector(".header__right-side .header__nav-sidebar-toggle");
      toggle = document.querySelector(".header__left-side .header__nav-sidebar-toggle");
      if (newtoggle) {
        newtoggle.style.transform = "rotate(180deg)";
        newtoggle.addEventListener("click", () => {
          if (!document.querySelector("#nav-sidebar").classList.contains("nav-sidebar--expanded")) {
            setTimeout(() => {
              document.querySelector(".header__left-side .header__nav-sidebar-toggle").click();
            }, 25);
          }
        });

        $("#nav-sidebar").attrchange({
          trackValues: true,
          callback: function (event) {
            if (event.newValue == "nav-sidebar") {
              newtoggle.classList.remove("nav-sidebar-toggle--active");
            } else {
              newtoggle.classList.add("nav-sidebar-toggle--active");
            }
          },
        });
      }

      BetterStreamChat.settingsDiv.querySelector(".header__left-side .logo img").src =
        localStorage.theme !== "light" ? git_url + "img/Wasya_Better_color_logo_dark.svg" : git_url + "img/Wasya_Better_color_logo.svg";
    };

    addToHeader();
  },
  updatestyle() {
    let cssCode = ``;

    if (settings.wasd.messageFollower) {
      cssCode += `wasd-chat-follower-message { display: none!important; }`;
    }

    if (settings.wasd.messageSub) {
      cssCode += `wasd-chat-subscribe-message { display: none!important; }`;
    }

    if (settings.wasd.messageSystem) {
      cssCode += `wasd-chat-system-message { display: none!important; }`;
    }

    if (settings.wasd.messagePromoCodes) {
      cssCode += `wasd-chat-promo-codes-message { display: none!important; }`;
    }

    if (settings.wasd.wasdIconsSmile) {
      cssCode += `.footer__block__icons > :nth-child(1) { display: none!important; }`;
    }

    if (settings.wasd.wasdIconsCircleRu) {
      cssCode += `#chat-footer-icon-money-paid { display: none!important; }`;
    }

    if (settings.wasd.webkitScrollbarWidth) {
      cssCode += "div#channel-wrapper::-webkit-scrollbar { width: 0px; }";
      cssCode += "wasd-chat-body { box-shadow: 0 0 2px 0 rgba(var(--wasd-color-switch--rgb),.32); }";
      cssCode += "div#channel-wrapper { scrollbar-width: none; }";
    }

    if (settings.wasd.giftsWrapperSide) {
      cssCode += ".gifts-wrapper-side { display: none!important; }";
      cssCode += ".gifts-wrapper-bottom { display: none!important; }";
    }

    if (settings.wasd.giftsWrapperTopRight) {
      cssCode += ".gifts-wrapper-top-right { display: none!important; }";
    }

    cssCode += ".info__text__status > div[ovg], .info__text__status-ovg > div[ovg] { line-height: inherit; }";
    if (settings.wasd.sticker.toString() === "0") {
      cssCode += ".message__status, .info__text__status-ovg, #colon-after-author-name, #colon-after-author-name-ovg { vertical-align: top; }";
      cssCode += '[sticker^="http"] .chat-message-text.stickertext { display: none; }';
      if (settings.wasd.forceResizeStickers.toString() === "1") {
        cssCode += ".message__info img.sticker { display: block; height: 128px!important; width: 128px!important; margin-top: 8px; }";
      } else if (settings.wasd.forceResizeStickers.toString() === "2") {
        cssCode += ".message__info img.sticker { display: block; height: 56px!important; width: 56px!important; margin-top: 8px; }";
      }
    } else if (settings.wasd.sticker.toString() === "1") {
      cssCode += "img.sticker { width: 28px!important; height: 28px!important; margin-top: 0px!important; display: inline!important; vertical-align: middle!important; margin: -.5rem 0!important; }";
      cssCode += '[sticker^="http"] .chat-message-text.stickertext { display: none; }';
    } else if (settings.wasd.sticker.toString() === "2") {
      if (settings.wasd.forceResizeStickers.toString() === "0") {
        cssCode +=
          "img.sticker {max-width: -webkit-fill-available; transition: transform .2s; width: 28px!important; height: 28px!important; margin-top: 0px!important; display: inline!important; vertical-align: middle!important; margin: -.5rem 0!important; }";
        cssCode +=
          "img.sticker:hover { transform: scale(4.4) translateY(-8px); background-color: var(--wasd-color-prime); border-radius: 4px; box-shadow: 0 0 4px 0 rgba(var(--wasd-color-switch--rgb),.16); }";
        cssCode +=
          "img.sticker.small:hover { transform: scale(2.2) translateY(-4px); background-color: var(--wasd-color-prime); border-radius: 4px; box-shadow: 0 0 4px 0 rgba(var(--wasd-color-switch--rgb),.16); }";
      } else if (settings.wasd.forceResizeStickers.toString() === "1") {
        cssCode +=
          "img.sticker {max-width: -webkit-fill-available; transition: transform .2s; width: 28px!important; height: 28px!important; margin-top: 0px!important; display: inline!important; vertical-align: middle!important; margin: -.5rem 0!important; }";
        cssCode +=
          "img.sticker:hover { transform: scale(4.4) translateY(-8px); background-color: var(--wasd-color-prime); border-radius: 4px; box-shadow: 0 0 4px 0 rgba(var(--wasd-color-switch--rgb),.16); }";
      } else if (settings.wasd.forceResizeStickers.toString() === "2") {
        cssCode +=
          "img.sticker {max-width: -webkit-fill-available; transition: transform .2s; width: 28px!important; height: 28px!important; margin-top: 0px!important; display: inline!important; vertical-align: middle!important; margin: -.5rem 0!important; }";
        cssCode +=
          "img.sticker:hover { transform: scale(2.2) translateY(-8px); background-color: var(--wasd-color-prime); border-radius: 4px; box-shadow: 0 0 4px 0 rgba(var(--wasd-color-switch--rgb),.16); }";
      }

      cssCode += "div.block__messages__item:hover { z-index: 1; }";
      cssCode += "div.block__messages__item-ovg:hover { z-index: 1; }";
      cssCode += ".block__new-messages { z-index: 1; }";
      cssCode += '[sticker^="http"] .chat-message-text.stickertext { display: none; }';
    } else if (settings.wasd.sticker.toString() === "3") {
      cssCode += ".block__messages__item[sticker] { display: none!important; }";
      cssCode += ".block__messages__item-ovg[sticker] { display: none!important; }";
    } else if (settings.wasd.sticker.toString() === "4") {
      cssCode += "img.sticker { display: none!important; }";
      cssCode += ".sticker_text { display: inline!important; }";
    }

    if (settings.wasd.stickerovg.toString() === "0") {
      cssCode += `.message__info .stickerovg, .message__info-ovg .stickerovg {max-width: -webkit-fill-available; display: block; height: ${settings.wasd.bttvSize}; min-width: ${settings.wasd.bttvSize}; margin-top: 8px; }`;
    } else if (settings.wasd.stickerovg.toString() === "1" || settings.wasd.stickerovg.toString() === "2") {
      cssCode +=
        ".stickerovg {max-width: -webkit-fill-available; width: 28px!important; min-width: 28px; height: 28px!important; margin-top: 0px!important; display: inline!important; vertical-align: middle!important; margin: -.5rem 0!important; }";
    }

    if (settings.wasd.stickerovg.toString() === "3") {
      cssCode += '[stickersovg*=" "] { display: none!important; }';
    } else if (settings.wasd.stickerovg.toString() === "4") {
      cssCode += "img.stickerovg { display: none!important; }";
      cssCode += ".stickerovg_text { display: inline; }";
    }

    cssCode += `div.message-text span a, div.message-text-ovg span a { color: ${settings.wasd.linkColor != "#000000" ? settings.wasd.linkColor : "inherit"}; }`;
    cssCode += `div.message-text.message-text--deleted span a { color: inherit!important; }`;

    if (settings.wasd.chatOnTheLeft) {
      cssCode += `@media screen and (min-width:481px) { wasd-chat-wrapper > div.chat-container:not(.theaterModeNoFS) { width: ${settings.wasd.chatWidth}px!important } }`;
      cssCode += `wasd-chat-wrapper > div.chat-container.theaterModeNoFS { width: ${settings.wasd.theaterModeChatWidth}px!important }`;
      cssCode += `wasd-channel > div.channel-wrapper > div#channel-wrapper { order: 1!important; }`;
      cssCode += `div.player-wrapper.theatre-mode { left: ${settings.wasd.chatWidth}px!important; width: calc(100vw - ${settings.wasd.chatWidth}px)!important; }`;
      cssCode += `#scroll-content { padding-right: 52px!important; padding-left: 0px!important; }`;
      cssCode += `wasd-header #nav-sidebar { left: auto!important; right: 0!important;}`;
      cssCode += `.header__left-side .header__nav-sidebar-toggle { display: none!important; }`;
      cssCode += `.profile-menu-toggle { margin-right: 8px!important; }`;
      cssCode += `#profile-menu { z-index: 1; }`;

      // fix скрыть чат
      if (settings.wasd.moveHideChat) cssCode += `.chat-container__btn-open--desktop-ovg .wasd-icons-right:before {transform: rotate(180deg)!important;}`;
      cssCode += `.chat-container.close--desktop {overflow: hidden!important;}`;
      cssCode += `.chat-container__btn-open--desktop { left: 100%!important;transform: rotate(180deg)!important; }`;
      cssCode += `.chat-container__btn-open--desktop .text { transform: rotate(180deg)!important; }`;
    } else {
      cssCode += `@media screen and (min-width:481px) {wasd-chat-wrapper > div.chat-container:not(.theaterModeNoFS) { width: ${settings.wasd.chatWidth}px!important }}`;
      cssCode += `wasd-chat-wrapper > div.chat-container.theaterModeNoFS { width: ${settings.wasd.theaterModeChatWidth}px!important }`;
      cssCode += `div.player-wrapper.theatre-mode { width: calc(100vw - ${settings.wasd.chatWidth}px)!important; }`;
      cssCode += `.header__right-side .header__nav-sidebar-toggle { display: none!important; }`;
    }
    cssCode += "wasd-chat-wrapper > div.chat-container.close--desktop { width: 0px!important; }";

    if (settings.wasd.hideDonationChannelButton & settings.wasd.hideAmazingChannelButtoan & settings.wasd.hideGiftButtons) {
      cssCode += "div#giftsInfo.gifts-info { display: none!important; }";
    } else {
      if (settings.wasd.hideDonationChannelButton) {
        cssCode += "wasd-channel-donate-btn { display: none!important; }";
      }
      if (settings.wasd.hideAmazingChannelButtoan) {
        cssCode += "wasd-channel-amazing-btn { display: none!important; }";
      }
      if (settings.wasd.hideGiftButtons) {
        cssCode += "div.gifts-info__gift_buttons { display: none!important; }";
      }
    }

    if (settings.wasd.highlightMessagesBold) {
      cssCode += ".chat-message-mention { font-weight: 700!important; }";
    }

    if (settings.wasd.streamerMessage) {
      cssCode += "wasd-chat-ya-streamer-message { display: none!important; }";
    }

    if (settings.wasd.fontSize) {
      cssCode += `.message__status--name, .message__status--name-ovg { font-size: ${settings.wasd.fontSize}px!important;}`; // display: contents!important;
      cssCode += `.message__status--name.is-admin, .message__status--name-ovg.is-admin { display: inline!important; }`;
      cssCode += `.message__status--name.is-moderator, .message__status--name-ovg.is-moderator { display: inline!important; }`;
      cssCode += `.message__status--name.is-owner, .message__status--name-ovg.is-owner { display: inline!important; }`;
      cssCode += `.message-text, .message-text-ovg { font-size: ${settings.wasd.fontSize}px!important; }`;
      cssCode += `.chat-message-mention { font-size: ${settings.wasd.fontSize}px!important; }`;
      cssCode += `.message__time, .message__time-ovg { font-size: ${settings.wasd.fontSize - 4}px!important;}`;
      cssCode += `#colon-after-author-name, #colon-after-author-name-ovg { font-size: ${settings.wasd.fontSize}px!important; }`;
    } else {
      cssCode += `.message__status--name-ovg, .message-text-ovg, #colon-after-author-name-ovg { font-size: 14px!important;}`;
      cssCode += `.message__time-ovg { font-size: 10px!important;}`;
    }

    if (settings.wasd.topPanel) {
      cssCode += "wasd-chat-ya-streamer-notifications { display: none!important; }";
    }

    if (settings.wasd.topPanelChallenge) {
      cssCode += "wasd-chat-challenge-notifications { display: none!important; }";
    }

    if (!settings.wasd.autoPlayStreamersOnMain) {
      cssCode += ".carousel__slide.active > div > div > wasd-player > div.player > div.pending { display: none!important; }";
    }

    if (settings.wasd.alternatingColorChatMessages) {
      cssCode += `div.block__messages__item:nth-child(2n+1), div.block__messages__item-ovg:nth-child(2n+1) { background-color: ${
        settings.wasd.alternatingColorChatMessagesColor != "#000000" ? settings.wasd.alternatingColorChatMessagesColor + "" : "var(--wasd-color-prime)"
      }; }`;
    }

    if (settings.wasd.decorationLink) {
      cssCode += `wasd-chat-message a:hover { text-decoration: underline; }`;
    }

    if (settings.wasd.videoOverlay) {
      cssCode += `wasd-player-overlay-video { display: none!important; }`;
      cssCode += `wasd-player-overlay-events { display: none!important; }`;
    }

    if (settings.wasd.hidePanelMobile) {
      cssCode += `wasd-notification-app { display: none!important; }`;
      cssCode += `wasd-mobile-app { display: none!important; }`;
      cssCode += `.wrapper-notification { margin-top: 48px!important; height: calc(100% - 48px)!important; transition: 0s!important; }`;
      cssCode += `#banner_mobile_app { display: none!important; }`;
    }

    if (settings.wasd.alwaysOpenVolumeControl) {
      cssCode += `div.volume-container .volume-slider-container {width: 86px!important;}`;
    }

    if (settings.wasd.hideBannerOnHome) {
      cssCode += `wasd-home wasd-banner { display: none!important; }`;
    }

    if (settings.wasd.hideSelectorStreamSettings && document.querySelector(".header__stream-settings-btn")) {
      //new
      cssCode += `.header__stream-settings-btn, hr#selector-header-buttons-right-hr-first { display: none!important; }`;
    }
    if (settings.wasd.hideSelectorStreamSettings) {
      //old
      cssCode += `#selector-header-stream-settings { display: none!important; }`;
    }

    if (settings.wasd.underlineUsernameAndMention) {
      cssCode += `.chat-message-mention:hover, .message__status--name:hover { text-decoration: underline!important; }`;
    }

    cssCode += `.message__time, .message__time-ovg {min-width: auto!important; overflow: unset!important; width: auto!important;}`;

    let bgmc = "";
    if (settings.wasd.mentionSelf) {
      bgmc = `background-color: ${settings.wasd.colorMentionSelf != "#000000" ? settings.wasd.colorMentionSelf + "!important" : "rgba(var(--wasd-color-switch--rgb),.08)!important"}`;
    } else {
      bgmc = `background-color: rgba(0, 0, 0, 0)!important`;
    }
    cssCode += `.message.has-mention-ovg, .message-ovg.has-mention {${bgmc}}`;

    cssCode += `.message.openCardColor {background-color: ${
      settings.wasd.highlightMessagesOpenCardColor != "#000000" ? settings.wasd.highlightMessagesOpenCardColor + "!important" : "rgba(var(--wasd-color-switch--rgb),.08)!important"
    }}`;

    cssCode += `.ovg-moderator-tools {display: ${HelperWASD.isModerator ? "" : "none!important;"}}`;

    if (settings.wasd.messageHover) {
      cssCode += `.message:hover { background-color: ${
        settings.wasd.colorMessageHover != "#000000" ? settings.wasd.colorMessageHover + "!important" : "rgba(var(--wasd-color-switch--rgb),.08)!important"
      }; }`;
      cssCode += `.message-ovg:hover { background-color: ${
        settings.wasd.colorMessageHover != "#000000" ? settings.wasd.colorMessageHover + "!important" : "rgba(var(--wasd-color-switch--rgb),.08)!important"
      }; }`;
      cssCode += `.ovg-bg-color-prime:hover { background-color: ${
        settings.wasd.colorMessageHover != "#000000" ? settings.wasd.colorMessageHover + "!important" : "rgba(var(--wasd-color-switch--rgb),.08)!important"
      }; }`;
    }
    cssCode += `.paidsubs-popup__stickers-item {cursor: url(${git_url + "img/cursorS.png"}) 4 4, auto}`;

    if (settings.wasd.decreaseIndentationStickerMenu) {
      cssCode +=
        "wasd-chat-emoji-stickers .stickers__body {padding: 6px 0 0 8px!important;}wasd-chat-emoji-stickers .stickers__body__item {min-width: auto!important;padding: 2px!important;margin: 0 8px 8px 0!important;height: 43px!important;width: 43px!important;}wasd-chat-emoji-stickers .stickers__body__item--not-available {width: 18px!important;height: 18px!important;right: 10px!important;bottom: 10px!important;}wasd-chat-emoji-stickers .stickers__body__item--not-available img {height: 11px!important;}";
    }

    if (settings.wasd.highlightStickersStickerMenu) {
      if (settings.wasd.decreaseIndentationSmilesMenu) {
        cssCode += "wasd-chat-emoji-smiles .smiles {height: 210px!important;padding: 5px 0 0 5px!important;justify-content: center!important;}";
        cssCode +=
          "wasd-chat-emoji-smiles .smiles .smiles__item:hover {background-color: rgba(var(--wasd-color-switch--rgb), .2)!important;}wasd-chat-emoji-smiles .smiles .smiles__item {padding: 16.7px!important;margin: 0px;border-radius: 2px;}";
      } else {
        cssCode +=
          "wasd-chat-emoji-smiles .smiles .smiles__item {margin-bottom: 8px!important;margin-right: 11px!important;}wasd-chat-emoji-smiles .smiles .smiles__item:hover {background-color: rgba(var(--wasd-color-switch--rgb), .2)!important;}wasd-chat-emoji-smiles .smiles .smiles__item {padding: 18px!important;margin: 0px;border-radius: 2px;}";
      }

      if (settings.wasd.decreaseIndentationBTTVandFFZMenu) {
        cssCode +=
          "wasd-chat-emoji-smiles-bttv .emoji-ovg,wasd-chat-emoji-smiles-ffz .emoji-ovg {padding: 10px 0 10px 5px!important;}wasd-chat-emoji-smiles-bttv .emoji-ovg .emoji__item-ovg,wasd-chat-emoji-smiles-ffz .emoji-ovg .emoji__item-ovg {margin-bottom: 8px!important;margin-right: 9px!important;}";
        cssCode +=
          "img.emoji__item-ovg:hover {background-color: rgba(var(--wasd-color-switch--rgb), .2)!important;}img.emoji__item-ovg {padding: 5px!important;margin: 0px;border-radius: 2px;width: 33px;height: 33px;}";
      } else {
        cssCode +=
          "img.emoji__item-ovg:hover {background-color: rgba(var(--wasd-color-switch--rgb), .2)!important;}img.emoji__item-ovg {margin-bottom: 0px!important;margin-right: 0px!important;}img.emoji__item-ovg {padding: 9px!important;margin: 0px;border-radius: 2px;width: 44px;height: 44px;}";
      }
    } else {
      if (settings.wasd.decreaseIndentationSmilesMenu) {
        cssCode +=
          "wasd-chat-emoji-smiles .smiles {justify-content: center!important;padding: 10px 0 10px 5px!important;height: 210px!important;}wasd-chat-emoji-smiles .smiles .smiles__item {margin-bottom: 8px!important;margin-right: 9px!important;}";
      }
      if (settings.wasd.decreaseIndentationBTTVandFFZMenu) {
        cssCode += "wasd-chat-emoji-smiles .smiles {height: 210px!important;padding: 5px 0 0 5px!important;justify-content: center!important;}";
      }
    }

    if (settings.wasd.hideGreatRandom) {
      cssCode += ".header__random-stream-wrap {display: none!important}"; //new
      cssCode += ".li#selector-header-random-stream {display: none!important}"; //old
    }

    for (let role in settings.highlightRole) {
      if (!(settings.highlightRole[role] == "#000000" || settings.highlightRole[role] == "#00000000"))
        cssCode += `.block__messages__item[role*="${role}"], .block__messages__item-ovg[role*="${role}"] {background-color:  ${settings.highlightRole[role]}!important}`;
    }

    for (let user in settings.list.blockUserList) {
      cssCode += `.block__messages__item[data-user_login="${user}"], .block__messages__item-ovg[data-usernamelc="${user.toLowerCase()}"] {display: none!important;}`;
      if (settings.wasd.removeMentionBL) {
        cssCode += `.block__messages__item[mention*="${user.toLowerCase()}"], .block__messages__item-ovg[mention*="${user.toLowerCase()}"] {display: none!important;}`;
      }
    }

    for (let term in settings.list.highlightTermList) {
      let setting = settings.list.highlightTermList[term];
      cssCode += `.block__messages__item[data-message*="${setting.term}"], .block__messages__item-ovg[data-message*="${setting.term}"] {background-color: ${setting.color}!important;}`;
    }

    for (let term in settings.list.blockTermList) {
      cssCode += `.block__messages__item[data-message*="${term}"], .block__messages__item-ovg[data-message*="${term}"] {display: none!important;}`;
    }

    for (let user in settings.list.highlightUserList) {
      let setting = settings.list.highlightUserList[user];
      cssCode += `.block__messages__item[data-user_login="${setting.username}"], .block__messages__item-ovg[data-username="${setting.username}"] {background-color: ${setting.color}!important;}`;
    }

    if (settings.wasd.chatMobilePlayer) {
      if (settings.wasd.hidePanelMobile) {
        cssCode += `@media screen and (max-width:480px) {.visible--mobile { width:100%!important}.theatre-mode-mobile{position:fixed!important;top:48px;z-index:999}}`;
        cssCode += `@media screen and (max-width:480px) {.visible--mobile { height: calc((100% - 145px) - 56vw)!important; }}`;
      } else {
        cssCode += `@media screen and (max-width:480px) {.visible--mobile { width:100%!important}.theatre-mode-mobile{position:fixed!important;top:97px;z-index:999}}`;
        cssCode += `@media screen and (max-width:480px) {.visible--mobile { height: calc((100% - 195px) - 56vw)!important; }}`;
      }
    } else {
      if (settings.wasd.hidePanelMobile) {
        cssCode += ` @media screen and (max-width:480px) {.visible--mobile { height: calc(100% - 145px)!important; }}`;
      }
    }

    if (settings.wasd.uptimeStreamMobile) {
      cssCode += `.stream-status-container .stream-status-text { top: 1px; position: relative; }`;
    }

    cssCode += `.ovg-moderator-tools {background-color: ${
      settings.wasd.colorModOptions != "#000000" ? settings.wasd.colorModOptions + "!important" : "rgba(var(--wasd-color-switch--rgb),.08)!important"
    }}`;
    cssCode += `.ovg-copy-tools {background-color: ${
      settings.wasd.colorCopuOptions != "#000000" ? settings.wasd.colorCopuOptions + "!important" : "rgba(var(--wasd-color-switch--rgb),.08)!important"
    }}`;

    if (settings.wasd.hideRaid) {
      cssCode += `.player-info .raid { display: none !important; }`;
    }

    if (settings.general.uiTransparency && !new URL(document.URL).searchParams.get("helper-settings")) {
      cssCode += `#bscSettingsPanel {background: rgba(var(--wasd-color-prime--rgb), 0.25);backdrop-filter: blur(7px);}`;
      cssCode += `#bscSettingsPanel .stickers__info-ovg {background: none;backdrop-filter: blur(7px);}`;
    }

    if (settings.wasd.swapGiftAndInformationPlace) {
      cssCode += `.content-wrapper__info, .placeholder-player {display: flex;flex-direction: column;}`;
      cssCode += `.content-wrapper__info > .gifts-info, .placeholder-player__buttons {order: 0;}`;
      cssCode += `.content-wrapper__info > .player-wrapper, .placeholder-player__screen {order: 1;}`;
      cssCode += `.content-wrapper__info > .stream-info, .placeholder-player__stream-info {order: 2;}`;
      cssCode += `.content-wrapper__info > .container {order: 3;}`;

      // fix tooltip
      cssCode += `.gifts-info__buttons .tooltip.tooltip_position-top {left: 50%;margin-top: 8px;top: 100%;transform: translateX(-50%) translateZ(0);bottom: unset;margin-bottom: unset;}`;
      cssCode += `.gifts-info__buttons .tooltip.tooltip_position-top .tooltip-content:before {border-bottom: unset;top: unset;border: 4px solid transparent;border-bottom: 4px solid rgb(var(--color-switch));border-top: none;bottom: 100%;content: "";height: 0;left: 50%;margin-left: -4px;position: absolute;transition: all .3s ease;}`;

      cssCode += `.gifts-info__buttons .tooltip.tooltip_position-topRight {right: 0;margin-top: 8px;top: 100%;bottom: unset;margin-bottom: unset;}`;
      cssCode += `.gifts-info__buttons .tooltip.tooltip_position-topRight .tooltip-content:before {top: unset; border: 4px solid transparent; border-bottom: 4px solid rgb(var(--color-switch)); border-top: none; bottom: 100%; content: ""; margin-left: -2px; position: absolute; transition: all .3s ease; right: 20px;}`;

      cssCode += `.gifts-info__buttons .tooltip.tooltip_position-topLeft {margin-top: 8px;top: 100%;bottom: unset;margin-bottom: unset;}`;
      cssCode += `.gifts-info__buttons .tooltip.tooltip_position-topLeft .tooltip-content:before {top: unset; border: 4px solid transparent; border-bottom: 4px solid rgb(var(--color-switch)); border-top: none; bottom: 100%; content: ""; margin-left: -2px; position: absolute; transition: all .3s ease; right: 235px;}`;
    }

    if (!settings.wasd.colonAfterNickname) {
      cssCode += `.message-text {margin-left: 4px;}`;
      cssCode += `.message__status .message__status--name {margin-right: 4px !important;}`;
      cssCode += `.message__status .message__partner {margin-right: 0px !important;}`;
    } else {
      cssCode += `.message__status .message__partner {margin-right: 0px !important; margin-left: 4px !important;}`;
    }

    if (!settings.wasd.copyMessage) {
      cssCode += `.ovg-copy-tools {display: none !important;}`;
    }

    if (settings.wasd.showPartnerIcon === "false" || settings.wasd.showPartnerIcon === false || settings.wasd.showPartnerIcon.toString() == "2") {
      cssCode += `.message__status .message__partner {display: none !important;}`;
    }
    if (settings.wasd.showPartnerIcon.toString() == "2") {
      cssCode += `.channel-info__description-title .channel-name .partner-label {background: url(${git_url}//badges/partner.webp) rgb(145, 70, 255) !important; border-radius: 2px !important; background-size: cover !important;}`;
    }

    if (settings.wasd.сhatLineSeparator.toString() === "1") {
      cssCode += `.block__messages__item, .block__messages__item-ovg {border-bottom: 1px solid rgba(var(--wasd-color-switch--rgb), .1);}`;
    } else if (settings.wasd.сhatLineSeparator.toString() === "2") {
      cssCode += `.block__messages__item, .block__messages__item-ovg {border-bottom: 1px solid #000; border-top: 1px solid rgba(255,255,255,0.1);}`;
    } else if (settings.wasd.сhatLineSeparator.toString() === "3") {
      cssCode += `.block__messages__item, .block__messages__item-ovg {border-bottom: 1px solid rgba(255,255,255,0.1); border-top: 1px solid #000;}`;
    } else if (settings.wasd.сhatLineSeparator.toString() === "4") {
      cssCode += `.block__messages__item, .block__messages__item-ovg {border-bottom: 1px solid rgba(var(--wasd-color-switch--rgb), .1); border-top: 1px solid rgba(var(--wasd-color-switch--rgb), .1);}`;
    }

    if (settings.colors.enabled)
      cssCode += `body {
      --wasd-color-black: ${settings.colors.wasdcolorblack} !important;
      --wasd-color-black--rgb: ${hexRgb(settings.colors.wasdcolorblack).red}, ${hexRgb(settings.colors.wasdcolorblack).green}, ${hexRgb(settings.colors.wasdcolorblack).blue} !important;
      --wasd-color-white: ${settings.colors.wasdcolorwhite} !important;
      --wasd-color-white--rgb: ${hexRgb(settings.colors.wasdcolorwhite).red}, ${hexRgb(settings.colors.wasdcolorwhite).green}, ${hexRgb(settings.colors.wasdcolorwhite).blue} !important;
      --wasd-color-corp-prime: ${settings.colors.wasdcolorcorpprime} !important;
      --wasd-color-corp-prime--rgb: ${hexRgb(settings.colors.wasdcolorcorpprime).red}, ${hexRgb(settings.colors.wasdcolorcorpprime).green}, ${
        hexRgb(settings.colors.wasdcolorcorpprime).blue
      } !important;
      --wasd-color-corp-gray: ${settings.colors.wasdcolorcorpgray} !important;
      --wasd-color-corp-gray--rgb: ${hexRgb(settings.colors.wasdcolorcorpgray).red}, ${hexRgb(settings.colors.wasdcolorcorpgray).green}, ${hexRgb(settings.colors.wasdcolorcorpgray).blue} !important;
      --wasd-color-dark-blue: ${settings.colors.wasdcolordarkblue} !important;
      --wasd-color-corp-blue: ${settings.colors.wasdcolorcorpblue} !important;
      --wasd-color-corp-blue--rgb: ${hexRgb(settings.colors.wasdcolorcorpblue).red}, ${hexRgb(settings.colors.wasdcolorcorpblue).green}, ${hexRgb(settings.colors.wasdcolorcorpblue).blue} !important;
      --wasd-color-warning: ${settings.colors.wasdcolorwarning} !important;
      --wasd-color-warning--rgb: ${hexRgb(settings.colors.wasdcolorwarning).red}, ${hexRgb(settings.colors.wasdcolorwarning).green}, ${hexRgb(settings.colors.wasdcolorwarning).blue} !important;
      --wasd-color-success: ${settings.colors.wasdcolorsuccess} !important;
      --wasd-color-success--rgb: ${hexRgb(settings.colors.wasdcolorsuccess).red}, ${hexRgb(settings.colors.wasdcolorsuccess).green}, ${hexRgb(settings.colors.wasdcolorsuccess).blue} !important;
      --wasd-color-event1: ${settings.colors.wasdcolorevent1} !important;
      --wasd-color-event2: ${settings.colors.wasdcolorevent2} !important;
      --wasd-color-event3: ${settings.colors.wasdcolorevent3} !important;
      --wasd-color-xp: ${settings.colors.wasdcolorxp} !important;
      --wasd-color-bordo: ${settings.colors.wasdcolorbordo} !important;
      --wasd-color-prime: ${settings.colors.wasdcolorprime} !important;
      --wasd-color-prime--rgb: ${hexRgb(settings.colors.wasdcolorprime).red}, ${hexRgb(settings.colors.wasdcolorprime).green}, ${hexRgb(settings.colors.wasdcolorprime).blue} !important;
      --wasd-color-switch: ${settings.colors.wasdcolorswitch} !important;
      --wasd-color-switch--rgb: ${hexRgb(settings.colors.wasdcolorswitch).red}, ${hexRgb(settings.colors.wasdcolorswitch).green}, ${hexRgb(settings.colors.wasdcolorswitch).blue} !important;
      --wasd-color-second: ${settings.colors.wasdcolorsecond} !important;
      --wasd-color-third: ${settings.colors.wasdcolorthird} !important;
      --wasd-color-gray1: ${settings.colors.wasdcolorgray1} !important;
      --wasd-color-gray2: ${settings.colors.wasdcolorgray2} !important;
      --wasd-color-gray3: ${settings.colors.wasdcolorgray3} !important;
      --wasd-color-text-prime: rgba(${hexRgb(settings.colors.wasdcolortextprime).red}, ${hexRgb(settings.colors.wasdcolortextprime).green}, ${hexRgb(settings.colors.wasdcolortextprime).blue}, ${
        hexRgb(settings.colors.wasdcolortextprime).alpha
      }) !important;
      --wasd-color-text-second: rgba(${hexRgb(settings.colors.wasdcolortextsecond).red}, ${hexRgb(settings.colors.wasdcolortextsecond).green}, ${hexRgb(settings.colors.wasdcolortextsecond).blue}, ${
        hexRgb(settings.colors.wasdcolortextsecond).alpha
      }) !important;
      --wasd-color-text-third: rgba(${hexRgb(settings.colors.wasdcolortextthird).red}, ${hexRgb(settings.colors.wasdcolortextthird).green}, ${hexRgb(settings.colors.wasdcolortextthird).blue}, ${
        hexRgb(settings.colors.wasdcolortextthird).alpha
      }) !important;
      --wasd-color-text-fourth: rgba(${hexRgb(settings.colors.wasdcolortextfourth).red}, ${hexRgb(settings.colors.wasdcolortextfourth).green}, ${hexRgb(settings.colors.wasdcolortextfourth).blue}, ${
        hexRgb(settings.colors.wasdcolortextfourth).alpha
      }) !important;
      --wasd-color-text-disabled: rgba(${hexRgb(settings.colors.wasdcolortextdisabled).red}, ${hexRgb(settings.colors.wasdcolortextdisabled).green}, ${
        hexRgb(settings.colors.wasdcolortextdisabled).blue
      }, ${hexRgb(settings.colors.wasdcolortextdisabled).alpha}) !important;
      --wasd-color-bg-prime: ${settings.colors.wasdcolorbgprime} !important;
      --wasd-color-bg-second: ${settings.colors.wasdcolorbgsecond} !important;
      --color-lowest-layer: rgba(${hexRgb(settings.colors.colorlowestlayer).red}, ${hexRgb(settings.colors.colorlowestlayer).green}, ${hexRgb(settings.colors.colorlowestlayer).blue}, ${
        hexRgb(settings.colors.colorlowestlayer).alpha
      }) !important;
      --color-background: ${hexRgb(settings.colors.colorbackground).red}, ${hexRgb(settings.colors.colorbackground).green}, ${hexRgb(settings.colors.colorbackground).blue} !important;
      --color-first-layer: ${settings.colors.colorfirstlayer} !important;
      --color-second-layer: ${settings.colors.colorsecondlayer} !important;
      --color-upper-layer: ${settings.colors.colorupperlayer} !important;
      --color-switch: ${hexRgb(settings.colors.colorswitch).red}, ${hexRgb(settings.colors.colorswitch).green}, ${hexRgb(settings.colors.colorswitch).blue} !important;
      --color-shadow: ${hexRgb(settings.colors.colorshadow).red}, ${hexRgb(settings.colors.colorshadow).green}, ${hexRgb(settings.colors.colorshadow).blue} !important;
      --color-system-blue: ${hexRgb(settings.colors.colorsystemblue).red}, ${hexRgb(settings.colors.colorsystemblue).green}, ${hexRgb(settings.colors.colorsystemblue).blue} !important;
      --color-system-dark-blue: ${hexRgb(settings.colors.colorsystemdarkblue).red}, ${hexRgb(settings.colors.colorsystemdarkblue).green}, ${
        hexRgb(settings.colors.colorsystemdarkblue).blue
      } !important;
      --color-system-white: ${hexRgb(settings.colors.colorsystemwhite).red}, ${hexRgb(settings.colors.colorsystemwhite).green}, ${hexRgb(settings.colors.colorsystemwhite).blue} !important;
      --color-system-black: ${hexRgb(settings.colors.colorsystemblack).red}, ${hexRgb(settings.colors.colorsystemblack).green}, ${hexRgb(settings.colors.colorsystemblack).blue} !important;
      --color-system-warning: ${hexRgb(settings.colors.colorsystemwarning).red}, ${hexRgb(settings.colors.colorsystemwarning).green}, ${hexRgb(settings.colors.colorsystemwarning).blue} !important;
      --color-system-attention: ${hexRgb(settings.colors.colorsystemattention).red}, ${hexRgb(settings.colors.colorsystemattention).green}, ${
        hexRgb(settings.colors.colorsystemattention).blue
      } !important;
      --color-system-success: ${hexRgb(settings.colors.colorsystemsuccess).red}, ${hexRgb(settings.colors.colorsystemsuccess).green}, ${hexRgb(settings.colors.colorsystemsuccess).blue} !important;
      --color-system-xp: ${hexRgb(settings.colors.colorsystemxp).red}, ${hexRgb(settings.colors.colorsystemxp).green}, ${hexRgb(settings.colors.colorsystemxp).blue} !important;
      --color-additional-yellow-light: ${settings.colors.coloradditionalyellowlight} !important;
      --color-additional-yellow-dark: ${settings.colors.coloradditionalyellowdark} !important;
      --color-additional-yellow-orange: ${settings.colors.coloradditionalyelloworange} !important;
      --color-additional-orange: ${settings.colors.coloradditionalorange} !important;
      --color-additional-red: ${settings.colors.coloradditionalred} !important;
      --color-additional-pink: ${settings.colors.coloradditionalpink} !important;
      --color-additional-lilac: ${settings.colors.coloradditionallilac} !important;
      --color-additional-violet: ${settings.colors.coloradditionalviolet} !important;
      --color-additional-blue: ${settings.colors.coloradditionalblue} !important;
      --color-additional-blue-light: ${settings.colors.coloradditionalbluelight} !important;
      --color-additional-aquamarine: ${settings.colors.coloradditionalaquamarine} !important;
      --color-additional-blue-green: ${settings.colors.coloradditionalbluegreen} !important;
      --color-additional-green-acid: ${settings.colors.coloradditionalgreenacid} !important;
      --color-additional-green: ${settings.colors.coloradditionalgreen} !important;
      --color-additional-green-light: ${settings.colors.coloradditionalgreenlight} !important;
      --color-additional-gray: ${settings.colors.coloradditionalgray} !important;
    }`;

    if (settings.wasd.chatMobilePlayer) cssCode += `.theatre-mode-mobile .player-streaminfo {opacity: 1;pointer-events: all !important;}`;
    if (settings.wasd.theaterModeShowGifts.toString() != "2") cssCode += `.footer__block__icons__item.gifts {display: none!important}`;

    if (settings.wasd.deletedMessageStyle.toString() == "1") {
      cssCode += ".message-text--deleted img {filter: brightness(0.5);} .message-text--deleted {color: rgba(var(--color-switch),.4);}";
    } else if (settings.wasd.deletedMessageStyle.toString() == "2") {
      cssCode += ".message-text--deleted img {filter: brightness(0.5);} .message-text--deleted {color: rgba(var(--color-switch),.4);} .message-text--deleted {text-decoration: line-through;}";
    } else if (settings.wasd.deletedMessageStyle.toString() == "3") {
      cssCode += ".message-text--deleted {text-decoration: line-through;color: inherit !important;}";
    }

    if (settings.wasd.hideOfflineChannelsOnNavSidebar) cssCode += '#nav-sidebar .channels__list .channels__item[data-online="false"] {display: none !important}';

    if (settings.wasd.blurInfoSiteGoesDown) cssCode += "body > div#info {filter: blur(5px);}";

    if (settings.wasd.hideDescriptionHighlightedMsg) cssCode += "wasd-chat-message > .is-highlighted ~ .description-message {display: none}";

    if (settings.wasd.highlightedMessageColor != "#00000000") cssCode += `wasd-chat-message > .is-highlighted {background-color: ${settings.wasd.highlightedMessageColor} !important}`;

    if (wasd.style) {
      if (typeof wasd.style.styleSheet !== "undefined") {
        wasd.style.styleSheet.cssText = cssCode;
      } else {
        wasd.style.innerHTML = "";
        wasd.style.appendChild(document.createTextNode(cssCode));
      }

      ovg.log("style inited");
    } else {
      ovg.log("style undefined");
      setTimeout(() => {
        wasd.updatestyle();
      }, 50);
    }
  },
  handleMessage(node, isobserver = false) {
    isMessageEdited = node.classList.contains("ovg");
    textarea = document.querySelector(".footer > div > textarea");

    if (!isMessageEdited) {
      node.classList.add("ovg");

      const info_icon = node.querySelector(".message__icon");

      if (info_icon && !node.dataset.id) {
        node.dataset.id = info_icon.id.split("contextMenuItem").join("");
      }

      if (node.querySelector(".message-text--deleted")) {
        node.setAttribute("bwasd-deleted", "");
        if (settings.wasd.deletedMessageStyle.toString() !== "0") {
          let msg = document.querySelector(`.messages_history[bwasd] [data-id="${node.dataset.id}"]`);
          if (msg && msg.dataset.message != "") node.querySelector(".message-text--deleted > span").textContent = msg.dataset.message;
        }
      }

      const messageTextCached = node.querySelector(".message-text > span")?.textContent?.trim();
      const usernameTextCached = node.querySelector(".message__status--name")?.textContent?.trim();

      if (isobserver) {
        if (usernameTextCached == HelperWASD.current?.user_profile?.user_login && messageTextCached) HelperWASD.selfMessagesHistory.push(messageTextCached);
        if (settings.wasd.artificialChatDelay.toString() == "0") {
          node.style.display = "block";
        } else {
          node.style.display = "none";
          setTimeout(() => {
            node.style.display = "block";
            HelperWASD.scrollChatMessage(node, -1, 150);
          }, settings.wasd.artificialChatDelay);
        }
      } else {
        node.style.display = "block";
      }

      adminRef = node.querySelector(".is-admin");
      modRef = node.querySelector(".is-moderator");
      ownerRef = node.querySelector(".is-owner");
      subRef = node.querySelector(".message__status--paid");
      promoCodeWin = node.querySelector(".message__promocodes");

      let color = node.querySelector(".message__status--name")?.style?.color;
      if (subRef) color = subRef?.style?.backgroundColor;
      let sticker = node.querySelector(".sticker")?.src;

      let roles = "";
      if (node.querySelector("wasd-chat-message")) roles += "user";
      if (ownerRef) roles += " owner";
      if (adminRef) roles += " admin";
      if (modRef) roles += " moderator";
      if (subRef) roles += " sub";
      if (node.querySelector(".message__partner")) roles += " partner";
      node.setAttribute("role", roles);

      if (node.querySelector('img[alt="sticker"]')) node.setAttribute("sticker", node.querySelector('img[alt="sticker"]').src);

      if (HelperWASD.openUserCardName == usernameTextCached && node.querySelector("wasd-chat-message > .message")) {
        if (settings.wasd.highlightMessagesOpenCard) node.querySelector("wasd-chat-message > .message").classList.add("openCardColor");
        if (isobserver) HelperWASD.addMessageToCpenCard(roles, usernameTextCached, color, messageTextCached, sticker);
      }

      if (usernameTextCached) node.dataset.username = usernameTextCached;
      if (usernameTextCached) node.dataset.usernamelc = usernameTextCached.toLowerCase();

      if (sticker) {
        const messageText = node.querySelector(".message-text > span");
        messageText.classList.add("chat-message-text");
        messageText.classList.add("stickertext");
        messageText.textContent = "Стикер";
      }

      const msg_time = node.querySelector(".message__time");
      if (msg_time && settings.wasd.formatMessageSentTime.toString() !== "false") {
        if (node.dataset.time) {
          msg_time.textContent = moment(node.dataset.time).format(settings.wasd.formatMessageSentTime);
        } else {
          msg_time.textContent = moment("2000-01-01T" + msg_time.textContent.trim()).format(settings.wasd.formatMessageSentTime);
          setTimeout(() => {
            if (node.dataset.time) msg_time.textContent = moment(node.dataset.time).format(settings.wasd.formatMessageSentTime);
          }, 50);
        }
      }

      let nicknamediv = node.querySelector(".message__status--name");
      let message = node.querySelector(".message-text");
      if (nicknamediv && message && settings.wasd.colonAfterNickname) {
        message.insertAdjacentHTML("beforebegin", `<span id="colon-after-author-name" style=" color: rgbа(var(--wasd-color-switch--rgb),.88);" >: </span>`);
        nicknamediv.style.margin = "0";
      }

      nicknamediv = node.querySelector(".message__status--name");
      if (nicknamediv) {
        nicknamediv.dataset.username = usernameTextCached;
        nicknamediv.dataset.usernamelc = usernameTextCached.toLowerCase();
        let userPaint = settings.wasd.betterwasyaPaint ? HelperBWASYA.paints[usernameTextCached] : null;
        nicknamediv.innerHTML = nicknamediv.innerHTML.replace(
          / ([a-zA-Z0-9_-]+) /gi,
          `<span ${
            !userPaint
              ? ""
              : userPaint.length < 5
              ? 'data-betterwasya-paint="' + userPaint + '"'
              : userPaint.match("gradient")
              ? ' data-betterwasya-paint="" style="background-image:' + userPaint + '"'
              : 'data-betterwasya-paint-color="' + userPaint + '" style="color:' + userPaint + '"'
          }> ${settings.wasd.userNameEdited[usernameTextCached] || usernameTextCached} </span>`
        );
      }

      let messageHTML = node.querySelector(".message-text > span");
      if (messageHTML && messageHTML.innerHTML != "") {
        // Исправить символы ломающие чат
        if (settings.wasd.fixCharactersBreakingChat) messageHTML.innerHTML = messageHTML.innerHTML.replace(/\p{Diacritic}/gu, "");

        messageHTML.querySelectorAll("a").forEach((link) => {
          link.outerHTML = link.outerHTML.replace(/@/g, "+at+");
        });

        // fix link
        if (settings.wasd.fixedLinks) HelperWASD.elementToURL(messageHTML);

        // emotes
        if (settings.wasd.tv7Emotes) messageHTML.innerHTML = HelperTV7.replaceText(messageHTML.innerHTML);
        if (settings.wasd.bttvEmotes) messageHTML.innerHTML = HelperBTTV.replaceText(messageHTML.innerHTML);
        if (settings.wasd.ffzEmotes) messageHTML.innerHTML = HelperFFZ.replaceText(messageHTML.innerHTML);
        if (settings.wasd.bwasdEmotes) messageHTML.innerHTML = HelperBWASYA.replaceText(messageHTML.innerHTML, usernameTextCached);
        if (settings.wasd.tv7Emotes || settings.wasd.bttvEmotes || settings.wasd.ffzEmotes || settings.wasd.bwasdEmotes) HelperWASD.setZeroSizeEmotes(messageHTML);

        let bl = " ";

        messageHTML.innerHTML = messageHTML.innerHTML.replace(/@[a-zA-Z0-9_-]+/gi, ($1) => {
          let username = settings.wasd.userNameEdited[$1.trim().split("@").join("")];
          if (!username) username = $1.trim().split("@").join("");
          return `<span><span style='color: ${HelperWASD.usercolor($1.trim())};' class='chat-message-mention${
            settings.wasd.onClickMention.toString() !== "0" ? " click" : ""
          }' data-username="${$1}" data-usernamelc="${$1.toLowerCase()}"> @${username.trim()} </span></span>`;
        });

        messageHTML.innerHTML = messageHTML.innerHTML.replace(/\+at\+/gi, "@");

        node.querySelectorAll(".chat-message-mention").forEach((element) => {
          // if (element.style.color == '') HelperWASD.usercolorapi(element);
          const username = element.dataset.usernamelc?.split("@").join("");

          bl += username + " ";

          element.addEventListener("click", () => {
            if (username) {
              if (settings.wasd.onClickMention.toString() === "1" && textarea) {
                textarea.value += "@" + username + " ";
                textarea.dispatchEvent(new Event("input"));
                textarea.focus();
              } else if (settings.wasd.onClickMention.toString() === "2") {
                if (!HelperWASD.addUsernameToTextarea(username)) {
                  HelperWASD.createUserViewerCard(username, false, node);
                }
              }
            }
          });
        });

        node.setAttribute("mention", bl);

        let stickersovg = "";
        node.querySelectorAll(".bttv-emote").forEach((stickerovg) => {
          stickersovg += stickerovg.dataset.code + " ";
        });
        node.setAttribute("stickersovg", stickersovg);
      }

      if (nicknamediv && usernameTextCached) {
        if (settings.wasd.onClickUserName.toString() === "0") {
          nicknamediv.style.cursor = "auto";
          nicknamediv.style.textDecoration = "auto";
          elClone = nicknamediv.cloneNode(true);
          nicknamediv.parentNode.replaceChild(elClone, nicknamediv);
          nicknamediv.addEventListener("click", () => {
            HelperWASD.addUsernameToTextarea(usernameTextCached);
          });
        } else if (settings.wasd.onClickUserName.toString() === "2") {
          elClone = nicknamediv.cloneNode(true);
          nicknamediv.parentNode.replaceChild(elClone, nicknamediv);
          nicknamediv = node.querySelector(".message__status--name");
          nicknamediv.addEventListener("click", () => {
            if (!HelperWASD.addUsernameToTextarea(usernameTextCached)) {
              HelperWASD.createUserViewerCard(usernameTextCached, false, node);
            }
          });
        }
      }

      if (settings.wasd.moderatorMenu.toString() === "2" || settings.wasd.moderatorMenu.toString() === "1") {
        let loading;
        let messageInfoStatus = node.querySelector("div.message__status");
        if (messageInfoStatus && !ownerRef && node.querySelector("div.message__icon")) {
          messageInfoStatus.insertAdjacentHTML("afterbegin", `<div class="info__text__status-paid-ovg ovg-moderator-tools button banned"><i class="icon-ovg wasd-icons-ban"></i></div>`);
          messageInfoStatus.insertAdjacentHTML("afterbegin", `<div class="info__text__status-paid-ovg ovg-moderator-tools button timeout"><i class="icon-ovg wasd-icons-sound-off"></i></div>`);
          messageInfoStatus.insertAdjacentHTML("afterbegin", `<div class="info__text__status-paid-ovg ovg-moderator-tools button remove"><i class="icon-ovg wasd-icons-delete"></i></div>`);

          messageInfo = node.querySelector("div.message__info");
          if (messageInfo) {
            messageInfo.insertAdjacentHTML(
              "beforeend",
              `<div class="lds-ring" style="display: none;"><svg x="0px" y="0px" viewBox="0 0 150 150" class="icon-pending-ovg"><circle cx="75" cy="75" r="60" class="icon-pending-inner-ovg"></circle></svg></div>`
            );
            loading = node.querySelector(".lds-ring");
          }

          messageInfoStatus.querySelector(".info__text__status-paid-ovg.button.banned").addEventListener("click", ({ target }) => {
            if (node.querySelector(".message__icon > i")) {
              node.querySelector(".message__icon > i").click();

              const banned_message = () => {
                if (contextMenu) contextMenuBlocks = contextMenu.querySelectorAll("div.context-menu__block");
                let edited = false;
                for (i = 0; i < 10; i++) {
                  if (contextMenuBlocks[i]) {
                    if (contextMenuBlocks[i].querySelector("div.context-menu__block__text").textContent == " Забанить ") {
                      contextMenuBlocks[i].click();
                      //ovg.log('banned channal author');
                      document.querySelector(".message__info").click();
                      edited = true;
                      loading.style.display = "inline-block";

                      if (settings.wasd.moderatorMenuAutomatic) {
                        document.querySelector(".block__popup__body > .block__popup__body__inner > .block__popup__body__inner__buttons > .inner__buttons__item > .ghost-btn > button.warning").click();
                        document.querySelector("wasd-chat-popups > div.block").style.display = "none";

                        loading.style.display = "none";
                      } else {
                        document
                          .querySelector(".block__popup__body > .block__popup__body__inner > .block__popup__body__inner__buttons > .inner__buttons__item > .ghost-btn > button.basic")
                          .addEventListener("click", ({ target }) => {
                            loading.style.display = "none";
                          });
                      }
                      break;
                    }
                  }
                  if (i == 9) {
                    document.querySelector(".message__info").click();
                    HelperWASD.showChatMessage("Вы не можете этого сделать", "warning");
                  }
                }
              };

              fetch_banned_message = () => {
                if (node.querySelector(".message__icon .context-menu")) {
                  contextMenu = node.querySelector(".message__icon .context-menu");
                  banned_message();
                } else {
                  setTimeout(() => {
                    fetch_banned_message();
                  }, 2);
                }
              };
              fetch_banned_message();
            } else {
              HelperWASD.showChatMessage("Вы не можете этого сделать", "warning");
            }
          });

          messageInfoStatus.querySelector(".info__text__status-paid-ovg.button.timeout").addEventListener("click", ({ target }) => {
            if (node.querySelector(".message__icon > i")) {
              node.querySelector(".message__icon > i").click();

              const timeout_message = () => {
                if (contextMenu) contextMenuBlocks = contextMenu.querySelectorAll("div.context-menu__block");
                let edited = false;
                for (i = 0; i < 10; i++) {
                  if (contextMenuBlocks[i]) {
                    if (contextMenuBlocks[i].querySelector("div.context-menu__block__text").textContent == " Временно заблокировать ") {
                      contextMenuBlocks[i].click();
                      //ovg.log('timeout channal author');
                      document.querySelector(".message__info").click();
                      edited = true;
                      loading.style.display = "inline-block";
                      if (!document.querySelector('.block__popup__body > .block__popup__body__inner .inner__text__checkbox [type="checkbox"].input').checked && settings.wasd.keepMessagesTimeout) {
                        document.querySelector('.block__popup__body > .block__popup__body__inner .inner__text__checkbox [type="checkbox"].input').click();
                      }
                      switch (settings.wasd.moderatorMenuTimeout) {
                        case 1:
                        case "1":
                          document.querySelector('[formcontrolname="selectMuteDuration"] [for="0"]').click();
                          break;
                        case 10:
                        case "10":
                          document.querySelector('[formcontrolname="selectMuteDuration"] [for="1"]').click();
                          break;
                        case 60:
                        case "60":
                          document.querySelector('[formcontrolname="selectMuteDuration"] [for="2"]').click();
                          break;
                        default:
                          document.querySelector('[formcontrolname="selectMuteDuration"] [for="0"]').click();
                          break;
                      }

                      if (settings.wasd.moderatorMenuAutomatic) {
                        document.querySelector(".block__popup__body > .block__popup__body__inner > .block__popup__body__inner__buttons > .inner__buttons__item > .ghost-btn > button.warning").click();
                        document.querySelector("wasd-chat-popups > div.block").style.display = "none";

                        loading.style.display = "none";
                      } else {
                        document
                          .querySelector(".block__popup__body > .block__popup__body__inner > .block__popup__body__inner__buttons > .inner__buttons__item > .ghost-btn > button.basic")
                          .addEventListener("click", ({ target }) => {
                            loading.style.display = "none";
                          });
                      }
                      break;
                    }
                  }
                  if (i == 9) {
                    document.querySelector(".message__info").click();
                    HelperWASD.showChatMessage("Вы не можете этого сделать", "warning");
                  }
                }
              };

              fetch_timeout_message = () => {
                if (node.querySelector(".message__icon .context-menu")) {
                  contextMenu = node.querySelector(".message__icon .context-menu");
                  timeout_message();
                } else {
                  setTimeout(() => {
                    fetch_timeout_message();
                  }, 2);
                }
              };
              fetch_timeout_message();
            } else {
              HelperWASD.showChatMessage("Вы не можете этого сделать", "warning");
            }
          });

          messageInfoStatus.querySelector(".info__text__status-paid-ovg.button.remove").addEventListener("click", ({ target }) => {
            if (node.querySelector(".message__icon > i")) {
              node.querySelector(".message__icon > i").click();

              const remove_message = () => {
                if (contextMenu) contextMenuBlocks = contextMenu.querySelectorAll("div.context-menu__block");
                let edited = false;
                for (i = 0; i < 10; i++) {
                  if (contextMenuBlocks[i]) {
                    if (contextMenuBlocks[i].querySelector("div.context-menu__block__text").textContent == " Удалить сообщениe ") {
                      contextMenuBlocks[i].click();
                      //ovg.log('remove channal author');
                      document.querySelector(".message__info").click();
                      edited = true;
                      loading.style.display = "inline-block";
                      if (document.querySelector(".block__popup__body > .block__popup__body__inner > .block__popup__body__inner__text > div > .inner__text__checkbox > label > input.input").checked) {
                        document.querySelector(".block__popup__body > .block__popup__body__inner > .block__popup__body__inner__text > div > .inner__text__checkbox > label > input.input").click();
                      }

                      if (settings.wasd.moderatorMenuAutomatic) {
                        document.querySelector(".block__popup__body > .block__popup__body__inner > .block__popup__body__inner__buttons > .inner__buttons__item > .ghost-btn > button.warning").click();
                        document.querySelector("wasd-chat-popups > div.block").style.display = "none";
                        loading.style.display = "none";
                      } else {
                        document
                          .querySelector(".block__popup__body > .block__popup__body__inner > .block__popup__body__inner__buttons > .inner__buttons__item > .ghost-btn > button.basic")
                          .addEventListener("click", ({ target }) => {
                            loading.style.display = "none";
                          });
                      }
                      break;
                    }
                  }
                  if (i == 9) {
                    document.querySelector(".message__info").click();
                    HelperWASD.showChatMessage("Вы не можете этого сделать", "warning");
                  }
                }
              };

              fetch_remove_message = () => {
                if (node.querySelector(".message__icon .context-menu")) {
                  contextMenu = node.querySelector(".message__icon .context-menu");
                  remove_message();
                } else {
                  setTimeout(() => {
                    fetch_remove_message();
                  }, 2);
                }
              };
              fetch_remove_message();
            } else {
              HelperWASD.showChatMessage("Вы не можете этого сделать", "warning");
            }
          });
        }
      } else if (settings.wasd.moderatorMenu.toString() === "3") {
        let messageInfoStatus = node.querySelector("div.message__status");
        if (messageInfoStatus && !ownerRef && node.querySelector("div.message__icon")) {
          node.querySelector(".message__status--name")?.addEventListener("contextmenu", (e) => {
            if (e.which == 3 && HelperWASD.isModerator) {
              e.preventDefault();
            }
          });

          node.querySelector(".message__status--name")?.addEventListener("mousedown", (e) => {
            if (e.which == 3 && HelperWASD.isModerator) {
              e.preventDefault();
              document.querySelector("#bttv-custom-timeout-contain")?.remove();

              let div = document.createElement("div");
              div.id = "bttv-custom-timeout-contain";
              div.innerHTML = `<div class="text"></div>
              <svg xmlns="http://www.w3.org/2000/svg" width="81" height="223">
                <g fill="none" fill-rule="evenodd">
                  <path fill="#000" fill-opacity=".304" fill-rule="nonzero" d="M.5 0h80v20H.5zM.5 203h80v20H0z"></path>
                  <path stroke="#ACACAC" stroke-opacity=".3" d="M80.5 19.805C64.51 51.825 70.65 154.184.5 180"></path>
                  <path fill="#FFF" fill-rule="nonzero" d="M 18.773 218 v -10.84 h 3.603 c 1.074 0 1.942 0.12 2.604 0.359 c 0.662 0.24 1.234 0.645 1.718 1.216 c 0.766 0.908 1.15 2.104 1.15 3.589 c 0 1.801 -0.477 3.198 -1.429 4.19 c -0.952 0.99 -2.292 1.486 -4.02 1.486 h -3.626 z m 1.538 -1.15 h 1.97 c 1.406 0 2.402 -0.378 2.988 -1.135 c 0.63 -0.806 0.945 -1.887 0.945 -3.245 c 0 -1.274 -0.31 -2.275 -0.93 -3.003 a 2.863 2.863 0 0 0 -1.348 -0.912 c -0.522 -0.163 -1.308 -0.245 -2.358 -0.245 H 20.31 v 8.54 z m 15.571 0.894 c -0.967 0.293 -1.794 0.44 -2.483 0.44 c -1.172 0 -2.128 -0.39 -2.867 -1.17 c -0.74 -0.778 -1.11 -1.787 -1.11 -3.028 c 0 -1.206 0.326 -2.194 0.978 -2.966 c 0.652 -0.771 1.485 -1.157 2.501 -1.157 c 0.962 0 1.705 0.342 2.23 1.025 c 0.525 0.684 0.788 1.655 0.788 2.915 l -0.008 0.447 h -5.017 c 0.21 1.89 1.136 2.834 2.776 2.834 c 0.6 0 1.338 -0.16 2.212 -0.483 v 1.143 z m -4.922 -4.578 h 3.509 c 0 -1.48 -0.552 -2.22 -1.656 -2.22 c -1.108 0 -1.726 0.74 -1.853 2.22 z M 38.41 218 v -11.565 h 1.443 V 218 h -1.443 z m 10.166 -0.256 c -0.967 0.293 -1.794 0.44 -2.483 0.44 c -1.172 0 -2.128 -0.39 -2.867 -1.17 c -0.74 -0.778 -1.11 -1.787 -1.11 -3.028 c 0 -1.206 0.326 -2.194 0.978 -2.966 c 0.652 -0.771 1.485 -1.157 2.501 -1.157 c 0.962 0 1.705 0.342 2.23 1.025 c 0.525 0.684 0.788 1.655 0.788 2.915 l -0.008 0.447 h -5.017 c 0.21 1.89 1.135 2.834 2.776 2.834 c 0.6 0 1.338 -0.16 2.212 -0.483 v 1.143 z m -4.922 -4.578 h 3.508 c 0 -1.48 -0.551 -2.22 -1.655 -2.22 c -1.108 0 -1.726 0.74 -1.853 2.22 z m 9.837 5.017 c -0.733 0 -1.304 -0.21 -1.714 -0.63 c -0.41 -0.42 -0.616 -1.003 -0.616 -1.75 v -4.673 h -0.996 v -1.084 h 0.996 v -1.443 l 1.443 -0.14 v 1.583 h 2.08 v 1.084 h -2.08 v 4.41 c 0 1.04 0.45 1.56 1.348 1.56 c 0.19 0 0.422 -0.033 0.696 -0.096 V 218 c -0.445 0.122 -0.83 0.183 -1.157 0.183 z m 9.052 -0.44 c -0.967 0.294 -1.794 0.44 -2.483 0.44 c -1.172 0 -2.127 -0.39 -2.867 -1.168 c -0.74 -0.779 -1.11 -1.788 -1.11 -3.029 c 0 -1.206 0.326 -2.194 0.978 -2.966 c 0.652 -0.771 1.486 -1.157 2.501 -1.157 c 0.962 0 1.706 0.342 2.23 1.025 c 0.525 0.684 0.788 1.655 0.788 2.915 l -0.007 0.447 h -5.018 c 0.21 1.89 1.136 2.834 2.776 2.834 c 0.6 0 1.338 -0.16 2.212 -0.483 v 1.143 z m -4.922 -4.577 h 3.509 c 0 -1.48 -0.552 -2.22 -1.656 -2.22 c -1.108 0 -1.726 0.74 -1.853 2.22 z M 35.065 11.985 c 0 0.542 -0.102 1.02 -0.307 1.435 a 2.9 2.9 0 0 1 -0.828 1.026 c -0.41 0.322 -0.86 0.552 -1.351 0.688 c -0.49 0.137 -1.115 0.205 -1.871 0.205 H 26.84 V 4.434 h 3.23 c 0.796 0 1.392 0.029 1.787 0.087 c 0.396 0.06 0.774 0.181 1.136 0.367 c 0.4 0.21 0.69 0.48 0.871 0.809 c 0.18 0.33 0.271 0.724 0.271 1.183 c 0 0.517 -0.132 0.958 -0.395 1.322 a 2.847 2.847 0 0 1 -1.055 0.875 v 0.059 c 0.737 0.151 1.318 0.475 1.743 0.97 c 0.425 0.496 0.637 1.122 0.637 1.879 z M 32.626 7.07 c 0 -0.263 -0.043 -0.486 -0.131 -0.666 a 1.02 1.02 0 0 0 -0.425 -0.44 a 2.06 2.06 0 0 0 -0.835 -0.245 a 12.934 12.934 0 0 0 -1.216 -0.048 h -1.728 v 3.15 h 1.875 c 0.454 0 0.815 -0.023 1.084 -0.07 c 0.268 -0.046 0.517 -0.143 0.747 -0.29 c 0.23 -0.146 0.391 -0.335 0.487 -0.567 c 0.095 -0.232 0.142 -0.506 0.142 -0.824 z m 0.93 4.973 c 0 -0.439 -0.065 -0.788 -0.197 -1.047 c -0.132 -0.259 -0.371 -0.478 -0.718 -0.66 a 2.407 2.407 0 0 0 -0.853 -0.237 a 11.454 11.454 0 0 0 -1.22 -0.055 h -2.277 v 4.058 h 1.918 c 0.635 0 1.155 -0.033 1.56 -0.1 c 0.406 -0.065 0.738 -0.186 0.997 -0.362 a 1.84 1.84 0 0 0 0.6 -0.652 c 0.127 -0.244 0.19 -0.559 0.19 -0.945 z m 9.815 3.296 h -1.37 v -0.871 a 25.28 25.28 0 0 0 -0.494 0.348 a 4.094 4.094 0 0 1 -1.395 0.637 a 4.284 4.284 0 0 1 -1.048 0.113 c -0.737 0 -1.362 -0.244 -1.875 -0.732 c -0.512 -0.488 -0.769 -1.11 -0.769 -1.868 c 0 -0.62 0.133 -1.122 0.4 -1.505 c 0.266 -0.383 0.645 -0.685 1.138 -0.904 c 0.499 -0.22 1.097 -0.369 1.795 -0.447 A 36.096 36.096 0 0 1 42 9.934 v -0.212 c 0 -0.313 -0.054 -0.572 -0.164 -0.777 a 1.2 1.2 0 0 0 -0.473 -0.483 a 1.954 1.954 0 0 0 -0.703 -0.227 a 6.057 6.057 0 0 0 -0.857 -0.059 c -0.361 0 -0.764 0.048 -1.208 0.143 a 9.395 9.395 0 0 0 -1.377 0.414 h -0.073 V 7.334 c 0.268 -0.073 0.656 -0.154 1.164 -0.242 a 8.793 8.793 0 0 1 1.502 -0.132 c 0.576 0 1.077 0.048 1.505 0.143 c 0.427 0.095 0.797 0.258 1.11 0.487 c 0.307 0.225 0.541 0.515 0.702 0.872 c 0.162 0.356 0.242 0.798 0.242 1.326 v 5.551 z m -1.37 -2.014 v -2.278 c -0.42 0.025 -0.914 0.061 -1.483 0.11 c -0.569 0.05 -1.019 0.12 -1.351 0.213 c -0.396 0.112 -0.715 0.286 -0.96 0.523 c -0.244 0.237 -0.366 0.563 -0.366 0.978 c 0 0.469 0.142 0.822 0.425 1.058 c 0.283 0.237 0.715 0.356 1.297 0.356 a 3.08 3.08 0 0 0 1.325 -0.282 a 5.97 5.97 0 0 0 1.113 -0.678 z m 10.862 2.014 h -1.377 v -4.658 a 8.02 8.02 0 0 0 -0.066 -1.058 c -0.044 -0.33 -0.124 -0.587 -0.241 -0.773 a 1.114 1.114 0 0 0 -0.528 -0.458 c -0.23 -0.1 -0.527 -0.15 -0.893 -0.15 a 2.86 2.86 0 0 0 -1.18 0.279 c -0.41 0.185 -0.803 0.422 -1.179 0.71 v 6.108 h -1.377 V 7.16 H 47.4 v 0.907 c 0.43 -0.356 0.874 -0.634 1.333 -0.835 c 0.46 -0.2 0.93 -0.3 1.414 -0.3 c 0.884 0 1.558 0.266 2.021 0.798 c 0.464 0.533 0.696 1.3 0.696 2.3 v 5.31 z"></path>
                </g>
              </svg>
              <div class="cursor" style="top: 119.875px;"></div>`;
              document.body.append(div);

              let rect = node.getBoundingClientRect();

              const updatePosition = () => {
                if (div.getBoundingClientRect().top === 0) {
                  div.style.top = rect.top - 100 + "px";
                  return setTimeout(() => updatePosition(), 1);
                }

                if (div.getBoundingClientRect().top + div.getBoundingClientRect().height >= document.body.clientHeight) {
                  div.style.top = document.body.clientHeight - div.getBoundingClientRect().height + "px";
                } else {
                  div.style.top = rect.top - 100 + "px";
                }
              };
              updatePosition();

              div.style.left = rect.left + 210 + "px";

              let cursor = div.querySelector(".cursor");
              let text = div.querySelector(".text");

              div.addEventListener("mousemove", (e) => {
                cursor.style.top = e.offsetY + "px";
                position = e.offsetY;

                if (e.offsetY < 21) {
                  text.textContent = "Бан";
                } else if (e.offsetY < 82) {
                  text.textContent = "60 Минут";
                } else if (e.offsetY < 142) {
                  text.textContent = "10 Минут";
                } else if (e.offsetY < 202) {
                  text.textContent = "1 Минута";
                } else {
                  text.textContent = "Удалить";
                }
              });

              div.addEventListener("click", (e) => {
                let user_id = node.dataset.user_id || document.querySelector(`.messages_history[bwasd] [data-usernamelc="${node.dataset.usernamelc}"]`)?.dataset.user_id;
                let id = node.dataset.id;

                if (e.offsetY < 21) {
                  HelperWASD.punishment("2", { user_id: user_id });
                } else if (e.offsetY < 82) {
                  HelperWASD.punishment("1", { user_id: user_id }, "60", !settings.wasd.keepMessagesTimeout);
                } else if (e.offsetY < 142) {
                  HelperWASD.punishment("1", { user_id: user_id }, "10", !settings.wasd.keepMessagesTimeout);
                } else if (e.offsetY < 202) {
                  HelperWASD.punishment("1", { user_id: user_id }, "1", !settings.wasd.keepMessagesTimeout);
                } else {
                  HelperWASD.punishment("0", { user_id: user_id, id: id });
                }
              });
            }
          });
        }
      }

      const linkRecognizerGo = () => {
        if (a && linkify.test(a.href, "url")) {
          if (new URL(a.href).host == "wasd.tv" && new URL(a.href).searchParams.get("record") != null) {
            if (settings.wasd.linkRecognizerWASD) {
              if (node) {
                node.insertAdjacentHTML(
                  "beforeend",
                  `<div style=" font-size: 11px; margin: 5px;" class="ovg-bg-color-prime tw-border-radius-medium tw-elevation-1 ffz--chat-card tw-relative" style=""><div class="tw-border-radius-medium tw-c-background-base tw-flex tw-full-width"><a data-tooltip-type="link" style="text-decoration: none" data-url="${a.href}" target="_blank" rel="noreferrer noopener" href="${a.href}" class="ffz-interactable--hover-enabled tw-block tw-border-radius-medium tw-full-width ffz-interactable--default tw-interactive"><div class="tw-flex tw-flex-nowrap tw-pd-05"><div class="ffz--header-image" style="height:4.8rem;"></div><div class="ffz--card-text tw-full-width tw-overflow-hidden tw-flex tw-flex-column tw-justify-content-center"><div title="Загрузка..." class="tw-c-text-alt-2 tw-ellipsis tw-mg-x-05">Загрузка...</div></div></div></a></div></div>`
                );
                HelperWASD.scrollChatMessage(node, 50);
              }

              $.ajax({
                url: `https://wasd.tv/api/v2/media-containers/${new URL(a.href).searchParams.get("record")}`,
                success: (out) => {
                  let game = "неизвестно";
                  if (out.result.game != null) game = out.result.game.game_name;
                  let username = out.result.media_container_channel.channel_name;
                  let usernameed = settings.wasd.userNameEdited[username.trim()];
                  node.querySelector(
                    "div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center"
                  ).innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${
                    out.result.media_container_streams[0].stream_media[0].media_meta.media_preview_images.small
                  }" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${
                    out.result.media_container_name
                  }" class="tw-ellipsis tw-semibold tw-mg-x-05">${out.result.media_container_name}</div><div title="${
                    usernameed ? usernameed + " (" + username + ")" : username
                  } играет в ${game}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05"><a target="_blank" href="https://wasd.tv/user/${out.result.user_id}">${
                    usernameed ? usernameed : username
                  }</a> играет в ${game}</div><div title="${out.result.created_at} - ${
                    out.result.media_container_streams[0].stream_total_viewers
                  } просмотров" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${new Date(out.result.created_at).toLocaleDateString()} - ${
                    out.result.media_container_streams[0].stream_total_viewers
                  } просмотров</div></div></div></div>`;
                },
                error: (out) => {
                  node.querySelector(
                    "div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center"
                  ).innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;
                },
              });
            }
          } else if (new URL(a.href).host == "wasd.tv" && new URL(a.href).searchParams.get("clip") != null) {
            if (settings.wasd.linkRecognizerWASD) {
              if (node) {
                node.insertAdjacentHTML(
                  "beforeend",
                  `<div style=" font-size: 11px; margin: 5px;" class="ovg-bg-color-prime tw-border-radius-medium tw-elevation-1 ffz--chat-card tw-relative" style=""><div class="tw-border-radius-medium tw-c-background-base tw-flex tw-full-width"><a data-tooltip-type="link" style="text-decoration: none" data-url="${a.href}" target="_blank" rel="noreferrer noopener" href="${a.href}" class="ffz-interactable--hover-enabled tw-block tw-border-radius-medium tw-full-width ffz-interactable--default tw-interactive"><div class="tw-flex tw-flex-nowrap tw-pd-05"><div class="ffz--header-image" style="height:4.8rem;"></div><div class="ffz--card-text tw-full-width tw-overflow-hidden tw-flex tw-flex-column tw-justify-content-center"><div title="Загрузка..." class="tw-c-text-alt-2 tw-ellipsis tw-mg-x-05">Загрузка...</div></div></div></a></div></div>`
                );
                HelperWASD.scrollChatMessage(node, 50);
              }

              $.ajax({
                url: `https://wasd.tv/api/v2/clips/${new URL(a.href).searchParams.get("clip")}`,
                success: (out) => {
                  if (!out?.error?.code) {
                    let username = out.result.clip_channel.channel_name;
                    let usernameed = settings.wasd.userNameEdited[username.trim()];
                    let clip_owner_login = out.result.clip_owner_login;
                    let clip_owner_logined = settings.wasd.userNameEdited[clip_owner_login.trim()];
                    node.querySelector(
                      "div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center"
                    ).innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${
                      out.result.clip_data.preview.small
                    }" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${
                      out.result.clip_title
                    }" class="tw-ellipsis tw-semibold tw-mg-x-05">${out.result.clip_title}</div><div title="${usernameed ? usernameed + " (" + username + ")" : username} играет в ${
                      out.result.clip_game_name
                    }" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05"><a target="_blank" href="https://wasd.tv/user/${out.result.clip_channel.user_id}">${
                      usernameed ? usernameed : username
                    }</a> играет в ${out.result.clip_game_name}</div><div title="Автор клипа: ${clip_owner_logined ? clip_owner_logined + " (" + clip_owner_login + ")" : clip_owner_login} - ${
                      out.result.clip_views_count
                    } просмотров" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">Автор клипа: <a target="_blank" href="https://wasd.tv/user/${out.result.clip_owner_profile_id}">${
                      clip_owner_logined ? clip_owner_logined : clip_owner_login
                    }</a> - ${out.result.clip_views_count} просмотров</div></div></div></div>`;
                  } else {
                    node.querySelector(
                      "div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center"
                    ).innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="${out.error.code}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.error.code}</div></div></div></div>`;
                  }
                },
                error: (out) => {
                  node.querySelector(
                    "div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center"
                  ).innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;
                },
              });
            }
          } else if (new URL(a.href).host == "wasd.tv" && new URL(a.href).pathname.split("/")[1] == "games") {
            if (settings.wasd.linkRecognizerWASD) {
              if (node) {
                node.insertAdjacentHTML(
                  "beforeend",
                  `<div style=" font-size: 11px; margin: 5px;" class="ovg-bg-color-prime tw-border-radius-medium tw-elevation-1 ffz--chat-card tw-relative" style=""><div class="tw-border-radius-medium tw-c-background-base tw-flex tw-full-width"><a data-tooltip-type="link" style="text-decoration: none" data-url="${a.href}" target="_blank" rel="noreferrer noopener" href="${a.href}" class="ffz-interactable--hover-enabled tw-block tw-border-radius-medium tw-full-width ffz-interactable--default tw-interactive"><div class="tw-flex tw-flex-nowrap tw-pd-05"><div class="ffz--header-image" style="height:4.8rem;"></div><div class="ffz--card-text tw-full-width tw-overflow-hidden tw-flex tw-flex-column tw-justify-content-center"><div title="Загрузка..." class="tw-c-text-alt-2 tw-ellipsis tw-mg-x-05">Загрузка...</div></div></div></a></div></div>`
                );
                HelperWASD.scrollChatMessage(node, 50);
              }

              $.ajax({
                url: `https://wasd.tv/api/games/${new URL(a.href).pathname.split("/")[2]}`,
                success: (out) => {
                  if (!out?.error?.code) {
                    node.querySelector(
                      "div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center"
                    ).innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${
                      out.result.game_icon.small
                    }" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${
                      out.result.game_asset_name
                    }" class="tw-ellipsis tw-semibold tw-mg-x-05">${out.result.game_asset_name}</div><div title="${out.result.game_description}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${
                      out.result.game_description != null ? out.result.game_description : "Нет описания"
                    }</div></div></div></div>`;
                  } else {
                    node.querySelector(
                      "div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center"
                    ).innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="${out.error.code}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.error.code}</div></div></div></div>`;
                  }
                },
                error: (out) => {
                  node.querySelector(
                    "div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center"
                  ).innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;
                },
              });
            }
          } else if (new URL(a.href).host == "wasd.tv") {
            if (settings.wasd.linkRecognizerWASD) {
              if (node) {
                node.insertAdjacentHTML(
                  "beforeend",
                  `<div style=" font-size: 11px; margin: 5px;" class="ovg-bg-color-prime tw-border-radius-medium tw-elevation-1 ffz--chat-card tw-relative" style=""><div class="tw-border-radius-medium tw-c-background-base tw-flex tw-full-width"><a data-tooltip-type="link" style="text-decoration: none" data-url="${a.href}" target="_blank" rel="noreferrer noopener" href="${a.href}" class="ffz-interactable--hover-enabled tw-block tw-border-radius-medium tw-full-width ffz-interactable--default tw-interactive"><div class="tw-flex tw-flex-nowrap tw-pd-05"><div class="ffz--header-image" style="height:4.8rem;"></div><div class="ffz--card-text tw-full-width tw-overflow-hidden tw-flex tw-flex-column tw-justify-content-center"><div title="Загрузка..." class="tw-c-text-alt-2 tw-ellipsis tw-mg-x-05">Загрузка...</div></div></div></a></div></div>`
                );
                HelperWASD.scrollChatMessage(node, 50);
              }

              $.ajax({
                url: `https://wasd.tv/api/v2/broadcasts/public?channel_name=${new URL(a.href).pathname.split("/")[1]}`,
                success: (out) => {
                  if (typeof out.error !== "undefined") {
                    node.querySelector(
                      "div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center"
                    ).innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;
                  } else {
                    let username = out.result.channel.channel_name;
                    let usernameed = settings.wasd.userNameEdited[username.trim()];
                    node.querySelector(
                      "div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center"
                    ).innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${
                      out.result.channel.channel_image.small
                    }" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${
                      usernameed ? usernameed + " (" + username + ")" : username
                    }" class="tw-ellipsis tw-semibold tw-mg-x-05">${usernameed ? usernameed : username}</div><div title="${
                      out.result.channel.channel_description
                    }" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.result.channel.channel_description}</div></div></div></div>`;
                  }
                },
                error: (out) => {
                  node.querySelector(
                    "div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center"
                  ).innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;
                },
              });
            }
          } else if (new URL(a.href).host == "www.twitch.tv") {
            if (settings.wasd.linkRecognizerWASD) {
              if (node) {
                node.insertAdjacentHTML(
                  "beforeend",
                  `<div style=" font-size: 11px; margin: 5px;" class="ovg-bg-color-prime tw-border-radius-medium tw-elevation-1 ffz--chat-card tw-relative" style=""><div class="tw-border-radius-medium tw-c-background-base tw-flex tw-full-width"><a data-tooltip-type="link" style="text-decoration: none" data-url="${a.href}" target="_blank" rel="noreferrer noopener" href="${a.href}" class="ffz-interactable--hover-enabled tw-block tw-border-radius-medium tw-full-width ffz-interactable--default tw-interactive"><div class="tw-flex tw-flex-nowrap tw-pd-05"><div class="ffz--header-image" style="height:4.8rem;"></div><div class="ffz--card-text tw-full-width tw-overflow-hidden tw-flex tw-flex-column tw-justify-content-center"><div title="Загрузка..." class="tw-c-text-alt-2 tw-ellipsis tw-mg-x-05">Загрузка...</div></div></div></a></div></div>`
                );
                HelperWASD.scrollChatMessage(node, 50);
              }

              $.ajax({
                url: `https://api-test.frankerfacez.com/v2/link?url=${a.href}`,
                success: (out) => {
                  if (!out.short?.subtitle) {
                    let img = "";
                    let title = out.short.title;
                    if (typeof title == "object") title = out.short.title[0];
                    if (typeof out.short.image != "undefined") img = out.short.image.url;
                    node.querySelector(
                      "div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center"
                    ).innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${img}" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${title}" class="tw-ellipsis tw-semibold tw-mg-x-05">${title}</div></div></div></div>`;
                  } else {
                    let img = "";
                    if (typeof out.short.image != "undefined") img = out.short.image.url;
                    let d = "";
                    let title = out.short.title;
                    if (typeof title == "object") title = out.short.title[0];
                    if (out.short?.subtitle?.content?.user?.content?.content != undefined)
                      d = `<div title="${out.short?.subtitle?.content?.user?.content?.content}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.short?.subtitle?.content?.user?.content?.content}</div>`;
                    node.querySelector(
                      "div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center"
                    ).innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${img}" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${title}" class="tw-ellipsis tw-semibold tw-mg-x-05">${title}</div>${d}</div></div></div>`;
                  }

                  if (out.error) {
                    node.querySelector(
                      "div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center"
                    ).innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;
                  }
                },
                error: (out) => {
                  node.querySelector(
                    "div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center"
                  ).innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;
                },
              });
            }
          } else if (new URL(a.href).host == "twitter.com") {
            if (settings.wasd.linkRecognizerWASD) {
              if (node) {
                node.insertAdjacentHTML(
                  "beforeend",
                  `<div style=" font-size: 11px; margin: 5px;" class="ovg-bg-color-prime tw-border-radius-medium tw-elevation-1 ffz--chat-card tw-relative" style=""><div class="tw-border-radius-medium tw-c-background-base tw-flex tw-full-width"><a data-tooltip-type="link" style="text-decoration: none" data-url="${a.href}" target="_blank" rel="noreferrer noopener" href="${a.href}" class="ffz-interactable--hover-enabled tw-block tw-border-radius-medium tw-full-width ffz-interactable--default tw-interactive"><div class="tw-flex tw-flex-nowrap tw-pd-05"><div class="ffz--header-image" style="height:4.8rem;"></div><div class="ffz--card-text tw-full-width tw-overflow-hidden tw-flex tw-flex-column tw-justify-content-center"><div title="Загрузка..." class="tw-c-text-alt-2 tw-ellipsis tw-mg-x-05">Загрузка...</div></div></div></a></div></div>`
                );
                HelperWASD.scrollChatMessage(node, 50);
              }

              $.ajax({
                url: `https://api-test.frankerfacez.com/v2/link?url=${a.href}`,
                success: (out) => {
                  let img = "";
                  if (typeof out.short.image != "undefined") img = out.short.image.url;
                  let d = "";
                  let title = out.short.title;
                  if (typeof title == "object") title = out.short.title.content[0].content;
                  if (typeof out.short?.subtitle[0] == "string") d = `<div title="${out.short?.subtitle[0]}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.short?.subtitle[0]}</div>`;
                  if (typeof out.short?.subtitle?.content?.tweet[0] == "string")
                    d = `<div title="${out.short.subtitle?.content?.tweet[0]}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.short?.subtitle?.content?.tweet[0]}</div>`;

                  node.querySelector(
                    "div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center"
                  ).innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${img}" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${title}" class="tw-ellipsis tw-semibold tw-mg-x-05">${title}</div>${d}</div></div></div>`;

                  if (out.error) {
                    node.querySelector(
                      "div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center"
                    ).innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;
                  }
                },
                error: () => {
                  node.querySelector(
                    "div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center"
                  ).innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;
                },
              });
            }
          } else {
            if (settings.wasd.linkRecognizerall) {
              if (node) {
                node.insertAdjacentHTML(
                  "beforeend",
                  `<div style=" font-size: 11px; margin: 5px;" class="ovg-bg-color-prime tw-border-radius-medium tw-elevation-1 ffz--chat-card tw-relative" style=""><div class="tw-border-radius-medium tw-c-background-base tw-flex tw-full-width"><a data-tooltip-type="link" style="text-decoration: none" data-url="${a.href}" target="_blank" rel="noreferrer noopener" href="${a.href}" class="ffz-interactable--hover-enabled tw-block tw-border-radius-medium tw-full-width ffz-interactable--default tw-interactive"><div class="lrhiver"></div><div class="tw-flex tw-flex-nowrap tw-pd-05"><div class="ffz--header-image" style="height:4.8rem;"></div><div class="ffz--card-text tw-full-width tw-overflow-hidden tw-flex tw-flex-column tw-justify-content-center"><div title="Загрузка..." class="tw-c-text-alt-2 tw-ellipsis tw-mg-x-05">Загрузка...</div></div></div></a></div></div>`
                );
                HelperWASD.scrollChatMessage(node, 50);
              }
              let href = a.href;

              let img = "";

              $.ajax({
                url: `https://api-test.frankerfacez.com/v2/link?url=${a.href}`,
                success: (out) => {
                  if (out?.error?.phrase) {
                    node.querySelector(
                      "div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center"
                    ).innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="${out?.error?.phrase}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out?.error?.phrase}</div></div></div></div>`;
                  } else if (
                    new URL(href).host == "youtu.be" ||
                    new URL(href).host == "m.youtube.com" ||
                    new URL(href).host == "youtube.be" ||
                    (new URL(href).host == "www.youtube.com" && new URL(href).pathname == "/watch")
                  ) {
                    let imgdiv = "";
                    if (typeof out?.short?.image?.url != "undefined") {
                      img = `<div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${out.short.image.url}" class=""></div>`;
                    } else {
                      img = "";
                    }
                    let dater = new Date(Number(out?.full?.[0]?.content?.items?.[0]?.["bottom-right"]?.value) * 1000);
                    let textdate = `${dater.getUTCHours() < 10 ? "0" + dater.getUTCHours() : dater.getUTCDate() * 24 + dater.getUTCHours()}:${
                      dater.getUTCMinutes() < 10 ? "0" + dater.getUTCMinutes() : dater.getUTCMinutes()
                    }:${dater.getUTCSeconds() < 10 ? "0" + dater.getUTCSeconds() : dater.getUTCSeconds()}`;
                    node.querySelector(".lrhiver").innerHTML = `<div class="lrhiverimg">
                      <div class="ffz__tooltip--inner ffz-rich-tip tw-align-left">
                        <div>
                          <div class="ffz--shift-hide">
                            ${
                              out?.short?.image?.url
                                ? `
                              <div class="ffz--rich-gallery" data-items="1">
                                <div class="ffz--gallery-column" data-items="1">
                                  <div class="ffz--overlay">
                                    <div class="ffz--overlay__content">
                                      <div class="ffz-aspect ffz-aspect--align-center">
                                        <div class="ffz-aspect__spacer" style="padding-top: 56.25%;"></div><img class=" " src="${out.short.image.url}" title="">
                                      </div>
                                    </div>
                                    <div class="ffz--overlay__bit" data-side="bottom-right">${textdate}</div>
                                  </div>
                                </div>
                              </div>
                            `
                                : ``
                            }
                            
                            <div class="tw-flex ffz--rich-header">
                              <div class="ffz--header-image-h tw-mg-x-05"></div>
                              <div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1">
                                ${out?.short?.title ? `<div class="tw-ellipsis tw-semibold " title="${out.short.title}">${out.short.title}</div>` : ``}
                                ${
                                  out?.short?.subtitle?.content?.channel
                                    ? `<div class="tw-ellipsis tw-c-text-alt-2" title="${out.short.subtitle.content.channel} • ${out.short.subtitle.content.views.replace(
                                        /(\d)(?=(\d{3})+$)/g,
                                        "$1 "
                                      )} • 👍 ${out.short.subtitle.content.likes.replace(/(\d)(?=(\d{3})+$)/g, "$1 ")}">${
                                        out.short.subtitle.content.channel
                                      } • ${out.short.subtitle.content.views.replace(/(\d)(?=(\d{3})+$)/g, "$1 ")} • 👍 ${out.short.subtitle.content.likes.replace(/(\d)(?=(\d{3})+$)/g, "$1 ")}</div>`
                                    : ``
                                }
                              </div>
                            </div>
                            ${
                              out?.full?.[2]?.content
                                ? `<div class="tw-white-space-pre-wrap ffz--line-clamp tw-mg-y-05" title="${out.full?.[2].content}" style="--ffz-lines:5;">${out.full?.[2].content}</div>`
                                : ``
                            }
                            ${
                              out?.short?.extra?.[2]?.attrs?.datetime
                                ? `
                              <div class="tw-flex tw-full-width tw-overflow-hidden ffz--rich-header ffz--compact-header tw-align-items-center">
                                <div class="tw-ellipsis tw-c-text-alt-2" title="${out.short.extra?.[1]}${new Date(
                                    out.short.extra?.[2].attrs.datetime
                                  ).toLocaleDateString()}"><span class="ffz-i-youtube-play"></span>${out.short.extra?.[1]}<time datetime="${out.short.extra?.[2].attrs.datetime}" class="">${new Date(
                                    out.short.extra?.[2].attrs.datetime
                                  ).toLocaleDateString()}</time></div>
                              </div>
                            `
                                : ``
                            }
                          </div>
                        </div>
                      </div></div>`;
                    imgdiv = ``;
                    if (img != "")
                      node.querySelector(
                        ".ffz--header-image"
                      ).innerHTML = `<div class="ffz--header-image tw-flex-shrink-0 ffz--header-aspect" style="width:8.8rem; margin-left: 0 !important; margin-right: 1rem !important;">${img}</div>`;

                    node.querySelector(
                      "div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center"
                    ).innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${
                      out?.short?.title
                    }" class="tw-ellipsis tw-semibold tw-mg-x-05">${out?.short?.title}</div><div title="${out?.short?.subtitle?.content?.channel} • ${out?.short?.subtitle?.content?.views.replace(
                      /(\d)(?=(\d{3})+$)/g,
                      "$1 "
                    )} • 👍 ${out?.short?.subtitle?.content?.likes.replace(/(\d)(?=(\d{3})+$)/g, "$1 ")}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${
                      out?.short?.subtitle?.content?.channel
                    } • ${out?.short?.subtitle?.content?.views.replace(/(\d)(?=(\d{3})+$)/g, "$1 ")} • 👍 ${out?.short?.subtitle?.content?.likes.replace(
                      /(\d)(?=(\d{3})+$)/g,
                      "$1 "
                    )}</div><div title="${out?.short?.extra?.[1]} ${new Date(
                      out?.short?.extra?.[2]?.attrs?.datetime
                    ).toLocaleDateString()}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05"><span class="ffz-i-youtube-play"></span>${out?.short?.extra?.[1]}<time datetime="${
                      out?.short?.extra?.[2]?.attrs?.datetime
                    }" class="">${new Date(out?.short?.extra?.[2]?.attrs?.datetime).toLocaleDateString()}</time></div></div></div></div>`;
                  } else if (out?.short?.title) {
                    if (typeof out.error == "undefined") {
                      if (!out?.short?.subtitle) {
                        if (typeof out?.short?.image?.url != "undefined") {
                          img = `<div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${out.short.image.url}" class=""></div>`;
                        } else {
                          img = "";
                        }
                        let title = out?.short?.title;
                        if (typeof title == "object" && typeof title?.phrase == "string") title = title?.phrase;

                        node.querySelector(
                          "div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center"
                        ).innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05">${img}<div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${title}" class="tw-ellipsis tw-semibold tw-mg-x-05">${title}</div></div></div></div>`;
                      } else {
                        if (typeof out?.short?.image?.url != "undefined") {
                          img = `<div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${out.short.image.url}" class=""></div>`;
                        } else {
                          img = "";
                        }

                        let subtitle = out.short.subtitle;
                        if (typeof subtitle == "object") subtitle = subtitle[0];
                        if (typeof subtitle == "object") subtitle = "";

                        if (!(subtitle == "" || typeof subtitle == "undefined")) {
                          subtitle = `<div title="${subtitle}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${subtitle}</div>`;
                        } else {
                          subtitle = "";
                        }

                        let title = out?.short?.title;

                        if (typeof title == "object" && typeof title?.phrase == "string") title = title?.phrase;
                        if (typeof out.short.subtitle?.content?.name?.content == "string")
                          subtitle = `<div title="${out.short.subtitle?.content?.name?.content}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.short.subtitle?.content?.name?.content}</div>`;

                        node.querySelector(
                          "div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center"
                        ).innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header">${img}<div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${title}" class="tw-ellipsis tw-semibold tw-mg-x-05">${title}</div>${subtitle}</div></div></div>`;
                      }
                    } else {
                      node.querySelector(
                        "div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center"
                      ).innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="${out.error.phrase}" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">${out.error.phrase}</div></div></div></div>`;
                    }
                  } else {
                    if (typeof out?.short?.image?.url != "undefined") {
                      img = `<div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="${out.short.image.url}" class=""></div>`;
                    } else {
                      img = "";
                    }
                    let dater = new Date(Number(out?.full?.[0]?.content?.items?.[0]?.["bottom-right"]?.value) * 1000);
                    let textdate = `${dater.getUTCHours() < 10 ? "0" + dater.getUTCHours() : dater.getUTCDate() * 24 + dater.getUTCHours()}:${
                      dater.getUTCMinutes() < 10 ? "0" + dater.getUTCMinutes() : dater.getUTCMinutes()
                    }:${dater.getUTCSeconds() < 10 ? "0" + dater.getUTCSeconds() : dater.getUTCSeconds()}`;

                    node.querySelector(
                      "div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center"
                    ).innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header">${img}<div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="${out?.base}" class="tw-ellipsis tw-semibold tw-mg-x-05">${out?.base}</div></div></div></div>`;
                  }
                },
                error: (out) => {
                  node.querySelector(
                    "div.ffz--card-text.tw-full-width.tw-overflow-hidden.tw-flex.tw-flex-column.tw-justify-content-center"
                  ).innerHTML = `<div class="ffz--card-rich tw-full-width tw-overflow-hidden tw-flex tw-flex-column"><div class="tw-flex ffz--rich-header"><div class="ffz--header-image tw-flex-shrink-0 tw-mg-x-05"><img src="https://static-cdn.jtvnw.net/emoticons/v1/58765/2.0" class=""></div><div class="tw-flex tw-full-width tw-overflow-hidden tw-justify-content-center tw-flex-column tw-flex-grow-1"><div title="Произошла ошибка." class="tw-ellipsis tw-semibold tw-mg-x-05">Произошла ошибка.</div><div title="No Information Available" class="tw-ellipsis tw-c-text-alt-2 tw-mg-x-05">No Information Available</div></div></div></div>`;
                },
              });
            }
          }
        }
      };

      a = node.querySelector("div.message-text a");

      switch (settings.wasd.linkRecognitionRights.toString()) {
        case "0":
          if (adminRef || ownerRef) linkRecognizerGo();
          break;
        case "1":
          if (adminRef || ownerRef || modRef) linkRecognizerGo();
          break;
        case "2":
          if (adminRef || ownerRef || modRef || subRef) linkRecognizerGo();
          break;
        case "3":
          linkRecognizerGo();
          break;
      }

      let mentoinHtml; // follow / sub
      if (settings.wasd.clickMentionAll && node.querySelector("wasd-chat-follower-message")) {
        mentoinHtml = node.querySelector(".message-follower__name");
      }
      if (settings.wasd.clickMentionAll && node.querySelector("wasd-chat-subscribe-message")) {
        mentoinHtml = node.querySelector(".block__item__title");
      }

      if (mentoinHtml) {
        let username;
        mentoinHtml.innerHTML = mentoinHtml.innerHTML.replace(/ ([a-zA-Z0-9_-]+) /gi, ($0) => {
          username = $0.trim();

          let out;
          if (settings.wasd.onClickMention.toString() === "0") {
            out = `<span><span style='color: ${HelperWASD.usercolor(
              "@" + username
            )};' class='chat-message-mention' data-username="@${username}" data-usernamelc="${username.toLowerCase()}"> ${username} </span></span>`;
            node.querySelectorAll(".chat-message-mention").forEach((element) => {
              // HelperWASD.usercolorapi(element);
              element.addEventListener("click", ({ target }) => {
                if (target.dataset.username) {
                  HelperWASD.addUsernameToTextarea(target.dataset.username?.split("@").join(""));
                }
              });
            });
          } else if (settings.wasd.onClickMention.toString() === "1") {
            out = `<span><span style='color: ${HelperWASD.usercolor(
              "@" + username
            )};' class='chat-message-mention click' data-username="@${username}" data-usernamelc="${username.toLowerCase()}"> ${username} </span></span>`;
            node.querySelectorAll(".chat-message-mention.click").forEach((element) => {
              // HelperWASD.usercolorapi(element);
              element.addEventListener("click", ({ target }) => {
                if (textarea) {
                  textarea.value += target.dataset.username?.trim() + " ";
                  textarea.dispatchEvent(new Event("input"));
                  textarea.focus();
                }
              });
            });
          } else if (settings.wasd.onClickMention.toString() === "2") {
            out = `<span><span style='color: ${HelperWASD.usercolor(
              "@" + username
            )};' class='chat-message-mention click' data-username="@${username}" data-usernamelc="${username.toLowerCase()}"> ${username} </span></span>`;
            node.querySelectorAll(".chat-message-mention.click").forEach((element) => {
              // HelperWASD.usercolorapi(element);
              element.addEventListener("click", ({ target }) => {
                let username = target.dataset.username;
                if (username && !HelperWASD.addUsernameToTextarea(username.split("@").join(""))) {
                  HelperWASD.createUserViewerCard(username.split("@").join(""), false, node);
                }
              });
            });
          }
          return out;
        });

        let element = node.querySelector(".chat-message-mention");

        if (settings.wasd.onClickMention.toString() === "0") {
          element.addEventListener("click", ({ target }) => {
            if (target.dataset.username) {
              HelperWASD.addUsernameToTextarea(target.dataset.username.split("@").join(""));
            }
          });
        } else if (settings.wasd.onClickMention.toString() === "1") {
          element.addEventListener("click", ({ target }) => {
            if (textarea) {
              textarea.value += target.dataset.username.trim() + " ";
              textarea.dispatchEvent(new Event("input"));
              textarea.focus();
            }
          });
        } else if (settings.wasd.onClickMention.toString() === "2") {
          element.addEventListener("click", ({ target }) => {
            let username = target.dataset.username;
            if (username && !HelperWASD.addUsernameToTextarea(username.split("@").join(""))) {
              HelperWASD.createUserViewerCard(username.split("@").join(""), false, node);
            }
          });
        }
      }

      if (settings.wasd.notifyOnMention && isobserver && document.visibilityState != "visible" && node.querySelector(".has-mention")) {
        Helper.notify(`Вас упоминул ${usernameTextCached}`, messageTextCached, usernameTextCached);
      }

      if (settings.wasd.mentionSelf.toString() == "false" && node.querySelector(".has-mention")) {
        node.querySelector(".has-mention").classList.remove("has-mention");
      }
      if (settings.wasd.mentionSelf.toString() == "1" && node.querySelector(".has-mention")) {
        node.querySelector(".has-mention").classList.remove("has-mention");
        node.querySelector(".message").classList.add("has-mention-ovg");
      }

      if (settings.wasd.colorAtTheMention) {
        node.querySelectorAll(".chat-message-mention").forEach((user) => {
          const userPaint = settings.wasd.betterwasyaPaint ? HelperBWASYA.paints[user.dataset.username.split("@").join("")] : null;
          if (userPaint) {
            if (userPaint.length < 5) {
              user.dataset.betterwasyaPaint = userPaint;
            } else if (userPaint.match("gradient")) {
              user.style.backgroundImage = userPaint;
              user.dataset.betterwasyaPaint = "";
            } else {
              user.style.color = userPaint;
              user.dataset.betterwasyaPaintColor = userPaint;
            }
          }
        });
      }

      const userPaint = settings.wasd.betterwasyaPaint ? HelperBWASYA.paints[usernameTextCached] : null;
      if (userPaint) {
        let user = node.querySelector(".message__status--name > span");
        if (userPaint.length < 5) {
          user.dataset.betterwasyaPaint = userPaint;
        } else if (userPaint.match("gradient")) {
          user.style.backgroundImage = userPaint;
          user.dataset.betterwasyaPaint = "";
        } else {
          user.style.color = userPaint;
          user.dataset.betterwasyaPaintColor = userPaint;
        }
      }

      if (settings.wasd.hoverTooltipEmote) {
        let tooltips = node.querySelectorAll(".tooltip-wrapper");
        for (let tooltip of tooltips) {
          $(tooltip).tooltip({
            classes: { "ui-tooltip": "ui-ovg-tooltip" },
            content: tooltip.dataset.title,
            show: false,
            hide: false,
            position: {
              my: "center bottom",
              at: "center top-5",
              within: $("wasd-chat"),
            },
          });
        }
        HelperWASD.updateHoverTooltipEmote(settings.wasd.hoverTooltipEmote, node);
      }

      adminRef = node.querySelector(".is-admin");
      modRef = node.querySelector(".is-moderator");
      ownerRef = node.querySelector(".is-owner");
      subRef = node.querySelector(".message__status--paid");
      promoCodeWin = node.querySelector(".message__promocodes");
      partnerRef = node.querySelector(".message__partner");

      if (modRef && (settings.wasd.showModeratorBadge === "false" || settings.wasd.showModeratorBadge === false || settings.wasd.showModeratorBadge.toString() == "2")) {
        modRef.classList.remove("is-moderator");
        modRef.querySelector(".icon.wasd-icons-moderator").remove();
        let c = HelperWASD.userColors[Number(document.querySelector(`.WebSocket_history [user_login="${usernameTextCached}"]`)?.getAttribute("user_id")) % (HelperWASD.userColors.length - 1)];
        if (c) {
          node.querySelector(".message__status--name").style.color = c;
        }
      }
      if (modRef && settings.wasd.showModeratorBadge.toString() == "2") {
        node
          .querySelector(".message__status--name")
          .insertAdjacentHTML("beforebegin", `<div class="info__text__status-ovg-badge" style="background: url(${git_url}/badges/moderator.webp) rgb(0,173,3);"><i class="icon"></i></div>`);
      }

      if (partnerRef && settings.wasd.showPartnerIcon.toString() == "2") {
        node
          .querySelector(".message__status--name")
          .insertAdjacentHTML("beforebegin", `<div class="info__text__status-ovg-badge" style="background: url(${git_url}/badges/partner.webp) rgb(145,70,255);"><i class="icon"></i></div>`);
      }

      if (ownerRef && (settings.wasd.showOwnerBadge === "false" || settings.wasd.showOwnerBadge === false || settings.wasd.showOwnerBadge.toString() == "2")) {
        ownerRef.classList.remove("is-owner");
        ownerRef.querySelector(".icon.wasd-icons-owner").remove();
        let c = HelperWASD.userColors[Number(document.querySelector(`.WebSocket_history [user_login="${usernameTextCached}"]`)?.getAttribute("user_id")) % (HelperWASD.userColors.length - 1)];
        if (c) {
          node.querySelector(".message__status--name").style.color = c;
        }
      }
      if (ownerRef && settings.wasd.showOwnerBadge.toString() == "2") {
        node
          .querySelector(".message__status")
          .insertAdjacentHTML("afterbegin", `<div class="info__text__status-ovg-badge" style="background: url(${git_url}/badges/owner.webp) rgb(233,25,22);"><i class="icon"></i></div>`);
      }

      if (adminRef && !settings.wasd.showAdminBadge) {
        adminRef.classList.remove("is-admin");
        adminRef.querySelector(".icon.wasd-icons-dev").remove();
        let c = HelperWASD.userColors[Number(document.querySelector(`.WebSocket_history [user_login="${usernameTextCached}"]`)?.getAttribute("user_id")) % (HelperWASD.userColors.length - 1)];
        if (c) {
          node.querySelector(".message__status--name").style.color = c;
        }
      }

      if (subRef && !settings.wasd.showSubBadge) {
        subRef.remove();
      }

      if (promoCodeWin && !settings.wasd.showPromoCodeWin) {
        promoCodeWin.remove();
      }

      if (subRef) {
        for (let badge in HelperBWASYA.subBadges) {
          if (subRef.style.backgroundImage.match(badge)) subRef.style.backgroundImage = HelperBWASYA.subBadges[badge];
        }
      }

      let allbadge = HelperBWASYA.badges[usernameTextCached];
      if (allbadge && allbadge.badges.length > 0) {
        for (let badg of allbadge.badges) {
          node.querySelector(".message__status").insertAdjacentHTML("afterbegin", badg.html.replace("{user_color}", `${HelperWASD.userColors[allbadge.user_id % (HelperWASD.userColors.length - 1)]}`));
        }
      }

      if (settings.wasd.copyMessage) {
        let messageInfoStatus = node.querySelector("div.message__status");
        if (messageInfoStatus) {
          messageInfoStatus.insertAdjacentHTML("afterbegin", `<div class="info__text__status-paid-ovg ovg-copy-tools button copy"><i class="icon-ovg wasd-icons-copy"></i></div>`);

          messageInfoStatus.querySelector(".info__text__status-paid-ovg.button.copy").addEventListener("click", ({ target }) => {
            if (messageTextCached) {
              copyTextToClipboard(messageTextCached);
              HelperWASD.showChatMessage("Сообщение скопировано", "success");
            } else {
              HelperWASD.showChatMessage("Не удалось скопировать сообщение", "warning");
            }
          });
        }
      }
    }
  },
};
