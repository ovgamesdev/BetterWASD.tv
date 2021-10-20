const socket = {
  socketd: null,
  streamId: 0,
  channelId: 0,
  intervalcheck: null,
  current: null,
  stream_url: null,
  isLiveInited: false,
  intervals: [],
  initChat() {
  	let channel_name = '', WebSocket_history
  	if (document.querySelector('.WebSocket_history')) {
  		WebSocket_history = document.querySelector('.WebSocket_history')
  	} else {
  		WebSocket_history = document.createElement('div')
  		WebSocket_history.classList.add('WebSocket_history')
  		document.body.append(WebSocket_history)
  	}


    $.ajax({
      url: HelperWASD.getStreamBroadcastsUrl(),
      headers: { 'Access-Control-Allow-Origin': 'https://wasd.tv' },
      success: function(out) {
        socket.current = out.result
        if (!document.querySelector('.hidden.info__text__status__name')) {
          let dd = document.createElement('div')
          dd.classList.add('info__text__status__name')
          dd.classList.add('hidden')
          dd.setAttribute('username', '@' + socket.current.channel.channel_owner.user_login.toLowerCase())
          dd.style.color = HelperWASD.userColors[socket.current.channel.channel_owner.user_id % (HelperWASD.userColors.length - 1)]
          dd.style.display = 'none'
          document.body.append(dd)
        }

        if (!socket.isLiveInited && out.result.channel.channel_is_live) {
          socket.isLiveInited = true
          channel_name = socket.current.channel.channel_owner.user_login
          socket.start(channel_name)
          ovg.log('chat inited to channel')
        } else if (socket.isLiveInited && !out.result.channel.channel_is_live) {
          socket.isLiveInited = false
          socket.stop(1000, 'LIVE_CLOSED')
          ovg.log('chat not inited to channel') //-
        } else if (socket.isLiveInited && out.result.channel.channel_is_live) {
          ovg.log('chat worked')
        } else {
          ovg.log('chat not worked')
        }
        setTimeout(() => {
          socket.initChat()
        }, 30000)
      },
      error: function(err) {
        ovg.log('err', err)
        setTimeout(() => {
          socket.initChat()
        }, 30000)
      }
    });
  },
  start(channel_name) {
    this.socketd = new WebSocket("wss://chat.wasd.tv/socket.io/?EIO=3&transport=websocket");

    this.socketd.onopen = function(e) {
      $.ajax({
        url: `https://wasd.tv/api/auth/chat-token`,
        headers: { 'Access-Control-Allow-Origin': 'https://wasd.tv' },
        success: function(out) {
          socket.jwt = out.result
          new Promise((resolve, reject) => {
            socket.stream_url = `https://wasd.tv/api/v2/broadcasts/public?channel_name=${channel_name}`
            $.ajax({
              url: `https://wasd.tv/api/v2/broadcasts/public?channel_name=${channel_name}`,
              headers: { 'Access-Control-Allow-Origin': 'https://wasd.tv' },
              success: function(out) {

                socket.channelId = out.result.channel.channel_id


                $.ajax({
                  url: `https://wasd.tv/api/v2/media-containers?limit=1&offset=0&media_container_status=RUNNING&channel_id=${out.result.channel.channel_id}`,
                  headers: { 'Access-Control-Allow-Origin': 'https://wasd.tv' },
                  success: function(out) {
                    if (out.result[0] && out.result[0].media_container_streams[0]) {
                      resolve(out.result[0])
                    } else {

                      $.ajax({
                        url: `https://wasd.tv/api/v2/media-containers?limit=1&offset=0&media_container_status=RUNNING&channel_id=${out.result.channel.channel_id}`,
                        headers: { 'Access-Control-Allow-Origin': 'https://wasd.tv' },
                        success: function(out) {
                          resolve(out.result)
                        }
                      });

                    }
                  }
                });

              }
            });

          }).then((out) => {
            if (out) {

              if (typeof out.media_container == "undefined") {
                socket.streamId = out.media_container_streams[0].stream_id
              } else {
                socket.streamId = out.media_container.media_container_streams[0].stream_id
              }

          		$.ajax({
	              url: `https://wasd.tv/api/chat/streams/${socket.streamId}/messages?limit=500&offset=0`,
	              headers: { 'Access-Control-Allow-Origin': 'https://wasd.tv' },
	              success: function(out) {
	              	for (let date of out.result.reverse()) {
	              		if (date.info) socket.addWebSocket_history(date.info.user_login, date.info.user_id, date.info.channel_id)
                  }
	              }
            	})

	            var data = `42["join",{"streamId":${socket.streamId},"channelId":${socket.channelId},"jwt":"${socket.jwt}","excludeStickers":true}]`;
	            try {
	              socket.socketd.send(data);
	            } catch (err) {
	              ovg.log('[catch]', err)
	            }
	            socket.intervalcheck = setInterval(() => {
	              if (socket.socketd) {
	                try {
	                  socket.socketd.send('2')
	                } catch (err) {
	                  clearInterval(socket.intervalcheck)
	                  socket.socketd = null
	                  ovg.log('[catch]', err)
	                  // setTimeout(() => { socket.start() }, 10000)
	                }
	              }
	            }, 2000)

            }

          })
        }
      });
    };

    this.socketd.onclose = function(e) {
      clearInterval(socket.intervalcheck)
      socket.socketd = null
      socket.isLiveInited = false
      if (e.code == 404) {
        ovg.log(`[close] Соединение закрыто чисто, код= ${e.code} причина= ${e.reason}`);
      } else if (e.wasClean) {
        ovg.log(`[close] Соединение закрыто чисто, код= ${e.code} причина= ${e.reason}`);
      } else {
        ovg.log('[close] Соединение прервано', "код= " + e.code);
      }
    };

    this.socketd.onmessage = function(e) {
      WebSocket_history = document.querySelector('.WebSocket_history')
      if (WebSocket_history && WebSocket_history.children.length >= 501) {
        WebSocket_history.firstElementChild.remove()
      }

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
              socket.addWebSocket_history(JSData[1].user_login, JSData[1].user_id, JSData[1].channel_id)
              break;
            case "sticker":
              // console.log(`[${JSData[0]}] ${JSData[1].user_login}: ${JSData[1].sticker.sticker_alias}`, JSData);
              socket.addWebSocket_history(JSData[1].user_login, JSData[1].user_id, JSData[1].channel_id)
              break;
            case "viewers":
              // console.log(`[${JSData[0]}] anon: ${JSData[1].anon} auth: ${JSData[1].auth} total: ${JSData[1].total}`, JSData);
              break;
            case "event":
              // console.log(`[${JSData[0]}] ${JSData[1].event_type} - ${JSData[1].payload.user_login} ${JSData[1].message}`, JSData);
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

    this.socketd.onerror = function(error) {
      clearInterval(socket.intervalcheck)
      socket.socketd = null
      ovg.log(`[error]`, error);
    };
  },
  stop(code, reason) {
    clearInterval(socket.intervalcheck)
    this.socketd.close(code, reason)
    this.socketd = null
    this.streamId = 0
    this.channelId = 0
    this.current = null
    this.stream_url = null
  },
  hash(length) {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) { result += characters.charAt(Math.floor(Math.random() * charactersLength)); }
    return result;
  },
  addWebSocket_history(user_login, user_id, channel_id) {
  	if (!document.querySelector(`.WebSocket_history .user_ws[user_login="${user_login}"]`)) {
	  	let user = document.createElement('div')
			user.classList.add('user_ws')
			user.setAttribute('user_login', user_login)
			user.setAttribute('user_loginLC', user_login.toLowerCase())
			user.setAttribute('user_id', user_id)
			user.setAttribute('channel_id', channel_id)
			user.style.display = 'none'
			document.querySelector('.WebSocket_history')?.append(user)
  	}
  }
}