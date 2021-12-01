const socket = {
  socketd: null,
  streamId: 0,
  channelId: 0,
  intervalcheck: null,
  channel: null,
  stream_url: null,
  isLiveInited: false,
  intervals: [],
  WebSocket_history: null,
  initChat() {
  	let channel_name = ''
  	if (document.querySelector('.WebSocket_history')) {
  		this.WebSocket_history = document.querySelector('.WebSocket_history')
  	} else {
  		this.WebSocket_history = document.createElement('div')
  		this.WebSocket_history.classList.add('WebSocket_history')
  		document.body.append(this.WebSocket_history)
  	}


    $.ajax({
      url: HelperWASD.getStreamBroadcastsUrl(),
      headers: { 'Access-Control-Allow-Origin': 'https://wasd.tv' },
      success: (out) => {
        socket.channel = out.result
        if (!document.querySelector('.hidden.info__text__status__name')) {
          let dd = document.createElement('div')
          dd.classList.add('info__text__status__name')
          dd.classList.add('hidden')
          dd.setAttribute('username', '@' + socket.channel.channel.channel_owner.user_login.toLowerCase())
          dd.style.color = HelperWASD.userColors[socket.channel.channel.channel_owner.user_id % (HelperWASD.userColors.length - 1)]
          dd.style.display = 'none'
          document.body.append(dd)
        }

        if (!socket.isLiveInited && out.result.channel.channel_is_live) {
          socket.isLiveInited = true
          channel_name = socket.channel.channel.channel_owner.user_login
          socket.start(channel_name)
          ws.log('chat init to channel', channel_name)
        } else if (socket.isLiveInited && !out.result.channel.channel_is_live) {
          socket.isLiveInited = false
          socket.stop(1000, 'LIVE_CLOSED')
          ws.log('chat not inited to channel') //-
        } else if (socket.isLiveInited && out.result.channel.channel_is_live) {
          // ws.log('chat worked')
        } else {
          ws.log('chat not worked')
          // setTimeout(() => {
          //   socket.initChat()
          // }, 30000)
        }
      },
      error: (err) => {
        ws.log('err', err)
        setTimeout(() => {
          socket.initChat()
        }, 30000)
      }
    });
  },
  start(channel_name) {
    this.socketd = new WebSocket("wss://chat.wasd.tv/socket.io/?EIO=3&transport=websocket");

    this.socketd.onopen = (e) => {
      $.ajax({
        url: `https://wasd.tv/api/auth/chat-token`,
        headers: { 'Access-Control-Allow-Origin': 'https://wasd.tv' },
        success: (out) => {
          socket.jwt = out.result
          new Promise((resolve, reject) => {
            socket.stream_url = HelperWASD.getStreamBroadcastsUrl()
            $.ajax({
              url: HelperWASD.getStreamBroadcastsUrl(),
              headers: { 'Access-Control-Allow-Origin': 'https://wasd.tv' },
              success: (out) => {

                socket.channelId = out.result.channel.channel_id

                resolve(out.result)
                
              }
            });

          }).then((out) => {
            if (out) {

              if (typeof out.media_container == "undefined") {
                socket.streamId = out.media_container_streams[0].stream_id
              } else {
                if (typeof out?.media_container?.media_container_streams[0] == 'undefined') return
                socket.streamId = out.media_container.media_container_streams[0].stream_id
              }

          		$.ajax({
	              url: `https://wasd.tv/api/chat/streams/${socket.streamId}/participants?limit=999&offset=0`,
	              headers: { 'Access-Control-Allow-Origin': 'https://wasd.tv' },
	              success: (out) => {
	              	for (let date of out.result) {
                    socket.addWebSocket_history(date)
                    for (let mention of document.querySelectorAll(`.chat-message-mention[style="color: ;"][usernamelc="@${date.user_login.toLowerCase()}"]`)) {
                      mention.style.color = HelperWASD.userColors[date.user_id % (HelperWASD.userColors.length - 1)]
                    }
                  }
	              }
            	})

              $.ajax({
                url: `https://wasd.tv/api/chat/streams/${socket.streamId}/messages?limit=500&offset=0`,
                headers: { 'Access-Control-Allow-Origin': 'https://wasd.tv' },
                success: (out) => {
                  for (let date of out.result.reverse()) {
                    socket.addWebSocket_history(date.info)
                    for (let mention of document.querySelectorAll(`.chat-message-mention[style="color: ;"][usernamelc="@${date.info.user_login.toLowerCase()}"]`)) {
                      mention.style.color = HelperWASD.userColors[date.info.user_id % (HelperWASD.userColors.length - 1)]
                    }
                  }
                }
              })

	            var data = `42["join",{"streamId":${socket.streamId},"channelId":${socket.channelId},"jwt":"${socket.jwt}","excludeStickers":true}]`;
	            try {
                if (socket.socketd.readyState === socket.socketd.OPEN) {
                  socket.socketd.send(data);
                  ws.log('chat initid to channel', channel_name)
                } 
              } catch (err) {
	              ws.log('[catch]', err)
	            }
	            socket.intervalcheck = setInterval(() => {
	              if (socket.socketd) {
	                try {
	                  if (socket.socketd.readyState === socket.socketd.OPEN) socket.socketd.send('2')
	                } catch (err) {
	                  clearInterval(socket.intervalcheck)
	                  socket.socketd = null
	                  ws.log('[catch]', err)
	                  // setTimeout(() => { socket.start() }, 10000)
	                }
	              }
	            }, 2000)

            }

          })
        }
      });
    };

    this.socketd.onclose = (e) => {
      clearInterval(socket.intervalcheck)
      socket.socketd = null
      socket.isLiveInited = false

      if (e.code == 404) {
        ws.log(`[close] Соединение закрыто чисто, код= ${e.code} причина= ${e.reason}`);
      } else if (e.wasClean) {
        ws.log(`[close] Соединение закрыто чисто, код= ${e.code} причина= ${e.reason}`);
      } else {
        ws.log('[close] Соединение прервано', "код= " + e.code);
      }
    };

    this.socketd.onmessage = (e) => {

      if (e.data != 3) {
        var JSData;
        if (e.data.indexOf('[') != -1 && e.data.indexOf('[') < e.data.indexOf('{')) {
          code = e.data.slice(0, e.data.indexOf('['));
          data = e.data.slice(e.data.indexOf('['), e.data.length);
          JSData = JSON.parse(data);
        } else if (e.data.indexOf('{') != -1) {
          code = e.data.slice(0, e.data.indexOf('{'));
          data = e.data.slice(e.data.indexOf('{'), e.data.length);
          JSData = JSON.parse(data);
        } else {
          JSData = null;
          code = e.data;
        }
        if (JSData) {
          switch (JSData[0]) {
            case "joined":
              // console.log(`[${JSData[0]}] ${JSData[1].user_channel_role}`, JSData);
              break;
            case "system_message":
              // console.log(`[${JSData[0]}] ${JSData[1].message}`, JSData);
              break;
            case "message":
              // console.log(`[${JSData[0]}] ${JSData[1].user_login}: ${JSData[1].message}`, JSData)
              socket.addWebSocket_history(JSData[1])
              break;
            case "sticker":
              // console.log(`[${JSData[0]}] ${JSData[1].user_login}: ${JSData[1].sticker.sticker_alias}`, JSData);
              socket.addWebSocket_history(JSData[1])
              break;
            case "viewers":
              // console.log(`[${JSData[0]}] anon: ${JSData[1].anon} auth: ${JSData[1].auth} total: ${JSData[1].total}`, JSData);
              break;
            case "event":
              // console.log(`[${JSData[0]}] ${JSData[1].event_type} - ${JSData[1].payload.user_login} ${JSData[1].message}`, JSData);
              // if (JSData[1].event_type == "NEW_FOLLOWER") socket.addWebSocket_history(JSData, JSData[1].payload.user_login, JSData[1].payload.user_id, JSData[1].payload.channel_id)
              break;
            case "giftsV1":
              // console.log(`[${JSData[0]}] ${JSData[1].gift_name}`, JSData);
              break;
            case "yadonat":
              // console.log(`[${JSData[0]}] ${JSData[1].donator} - ${JSData[1].donation} - ${JSData[1].msg}`, JSData);
              break;
            case "messageDeleted":
              // console.log(`[${JSData[0]}] ${JSData[1].ids}`, JSData);
              break;
            case "subscribe":
              // console.log(`[${JSData[0]}] ${JSData[1].user_login} - ${JSData[1].product_name}`, JSData);
                break;
            case "_system":
              // console.log(`[${JSData[0]}] ${JSData[1]}`, JSData);
              break;
            case "leave":
              // console.log(`[${JSData[0]}] ${JSData[1].streamId}`, JSData);
              break;
            case "user_ban":
              // console.log(`[${JSData[0]}] ${JSData[1].payload.user_login}`, JSData);
              break;
            case "settings_update":
              // console.log(`[${JSData[0]}] ${JSData[1]}`, JSData);
              break
            default:
              // console.log('def', code, JSData);
              break;
          }
        }

      }
    };

    this.socketd.onerror = (error) => {
      clearInterval(socket.intervalcheck)
      socket.socketd = null
      ws.log(`[error]`, error);
    };
  },
  stop(code, reason) {
    clearInterval(socket.intervalcheck)
    try {
      this.socketd.close(code, reason)
      this.socketd = null
      this.streamId = 0
      this.channelId = 0
      this.channel = null
      this.stream_url = null
    } catch (err) {
      ws.log('err', err)
    }
  },
  hash(length) {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) { result += characters.charAt(Math.floor(Math.random() * charactersLength)); }
    return result;
  },
  addWebSocket_history(JSData) {
    if (this.WebSocket_history && this.WebSocket_history.children.length >= Number(settings.wasd.limitHistoryUsers) + 1 && settings.wasd.limitHistoryUsers != 0) {
      this.WebSocket_history.firstElementChild.remove()
    }

    // console.log(JSData)

  	let user = document.createElement('div')
		user.classList.add('user_ws')
		user.setAttribute('user_login', JSData.user_login)
		user.setAttribute('user_loginLC', JSData.user_login.toLowerCase())
		user.setAttribute('user_id', JSData.user_id)
		// user.setAttribute('channel_id', JSData.channel_id)

    isMod = (JSData) => {
      if (JSData) {
        let role = JSData.user_channel_role == 'CHANNEL_MODERATOR'
        // if (!role) role = JSData.user_channel_role == 'CHANNEL_MODERATOR'
        return role
      } else {
        return false
      }
    }
    isSub = (JSData) => {
      if (JSData) {
        let role = false
        if (JSData.other_roles) for (let rol of JSData.other_roles) { if (rol == 'CHANNEL_SUBSCRIBER') role = true }
        if (!role) role = JSData.user_channel_role == 'CHANNEL_SUBSCRIBER'

        return role
      } else {
        return false
      }
    }
    isOwner = (JSData) => {
      if (JSData) {
        let role = false
        if (JSData.other_roles) for (let rol of JSData.other_roles) { if (rol == 'CHANNEL_OWNER') role = true }
        if (!role) role = JSData.user_channel_role == 'CHANNEL_OWNER'
        return role
      } else {
        return false
      }
    }
    isAdmin = (JSData) => {
      if (JSData) {
        let role = false
        if (JSData.other_roles) for (let rol of JSData.other_roles) { if (rol == 'WASD_ADMIN') role = true }
        if (!role) role = JSData.user_channel_role == 'WASD_ADMIN'
        return role
      } else {
        return false
      }
    }
    isPromoCodeWin = (JSData) => {
      if (JSData) {
        let role = false
        if (JSData.other_roles) for (let rol of JSData.other_roles) { if (rol == 'PROMO_CODE_WINNER') role = true }
        if (!role) role = JSData.user_channel_role == 'PROMO_CODE_WINNER'
        return role
      } else {
        return false
      }
    }

    let role = 'user'
    if (isOwner(JSData)) role += ' owner'
    if (isMod(JSData)) role += ' moderator'
    if (isSub(JSData)) role += ' sub'
    if (isAdmin(JSData)) role += ' admin'
    if (isPromoCodeWin(JSData)) role += ' promowin'
    user.setAttribute('role', role)
		user.style.display = 'none'

    let old = this.WebSocket_history.querySelector(`.user_ws[user_login="${JSData.user_login}"]`)
    if (old) {
      old.replaceWith(user)
    } else {
      this.WebSocket_history?.append(user)
    }

  }
}