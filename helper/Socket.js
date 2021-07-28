const HelperSocket = {
    socketd: null,
    streamId: 0,
    channelId: 0,
    intervalcheck: null,
    async start(channel_name) {
        new Promise((resolve, reject) => {
            if (!HelperSocket.socketd) {
                HelperSocket.socketd = new WebSocket("wss://chat.wasd.tv/socket.io/?EIO=3&transport=websocket");
                HelperSocket.socketd.onopen = function(e) {
                    $.ajax({
                        url: `https://wasd.tv/api/auth/chat-token`,
                        success: function(out){
                            $.ajax({
                                url: HelperWASD.getStreamBroadcastsUrl(),
                                success: function(out){
                                    if (typeof out.result !== 'undefined') if (out.result !== null) if (out.result.media_container !== null) if (typeof out.result.media_container !== 'undefined') {
                                        HelperSocket.streamId = out.result.media_container.media_container_streams[0].stream_id
                                        HelperSocket.channelId = out.result.channel.channel_id
                                        var data = `42["join",{"streamId":${HelperSocket.streamId},"channelId":${HelperSocket.channelId},"jwt":"${HelperSocket.jwt}","excludeStickers":true}]`;
                                        if (HelperSocket.socketd && HelperSocket.socketd.readyState === 1) HelperSocket.socketd.send(data);
                                        HelperSocket.intervalcheck = setInterval(() => {
                                            if (HelperSocket.socketd) {
                                                try {
                                                    if (HelperSocket.socketd && HelperSocket.socketd.readyState === 1) HelperSocket.socketd.send('2')
                                                } catch {
                                                    clearInterval(HelperSocket.intervalcheck)
                                                    HelperSocket.socketd = null
                                                    console.log('[catch]', HelperSocket.socketd)
                                                    HelperSocket.start(getChannelName())
                                                }
                                            }
                                        }, 5000)
                                    }
                                }
                            });
                        }
                    });
                };

                HelperSocket.socketd.onclose = function(e) {
                    clearInterval(HelperSocket.intervalcheck)
                    HelperSocket.socketd = null
                    if (e.wasClean) {
                        console.log(`[close] Соединение закрыто чисто, код= ${e.code} ${e.reason == '' ? '':'причина='+e.reason }`);
                    } else {
                        console.log('[close] Соединение прервано');
                    }
                };

                HelperSocket.socketd.onmessage = function(e) {
                    if (e.data == 3) {
                    } else {
                        var JSData;
                        if (e.data.indexOf('[') != -1) {
                            code = e.data.slice(0, e.data.indexOf('['));
                            data = e.data.slice(e.data.indexOf('['), e.data.length);
                            JSData = JSON.parse(data);
                        } else {
                            JSData = null;
                            code = e.data;
                        }

                        if (JSData) switch (JSData[0]) {
                            case "joined":
                                //console.log(`${code}[${JSData[0]}]`, JSData[1]);
                                break;
                            case "system_message":
                                //console.log(`${code}[${JSData[0]}] ${JSData[1].message}`, JSData);
                                break;
                            case "message":
                                //console.log(`${code}[${JSData[0]}] ${JSData[1].user_login}: ${JSData[1].message}`, JSData);
                                break;
                            case "sticker":
                                //console.log(`${code}[${JSData[0]}] ${JSData[1].user_login}: ${JSData[1].sticker.sticker_alias}`, JSData);
                                break;
                            case "viewers":
                                //console.log(`${code}[${JSData[0]}] anon: ${JSData[1].anon} auth: ${JSData[1].auth} total: ${JSData[1].total}`, JSData);
                                break;
                            case "event":
                                //console.log(`${code}[${JSData[0]}] ${JSData[1].event_type} - ${JSData[1].payload.user_login} ${JSData[1].message}`, JSData);
                                break;
                            case "giftsV1":
                                //console.log(`${code}[${JSData[0]}] ${JSData[1].gift_name}`, JSData);
                                break;
                            case "yadonat":
                                //console.log(`${code}[${JSData[0]}] ${JSData[1].donator} - ${JSData[1].donation} - ${JSData[1].msg}`, JSData);
                                break;
                            case "messageDeleted":
                                //console.log(`${code}[${JSData[0]}] ${JSData[1].ids}`, JSData);
                                break;
                            case "subscribe":
                                //console.log(`${code}[${JSData[0]}] ${JSData[1].user_login} - ${JSData[1].product_name}`, JSData);
                                break;
                            case "_system":
                                //console.log(`${code}[${JSData[0]}] ${JSData[1]}`, JSData);
                                break;
                            case "leave":
                                //console.log(`${code}[${JSData[0]}] ${JSData[1].streamId}`, JSData);
                                resolve('leave')
                                break;
                            case "user_ban":
                                //console.log(`${code}[${JSData[0]}] ${JSData[1].payload.user_login}`, JSData);
                                break;
                            case "settings_update":
                                //console.log(`${code}[${JSData[0]}] ${JSData[1]}`, JSData);
                                break
                            default:
                                HelperWASD.addMessageToChat('Произошло что-то неизвестное помогите BetterWASD узнать что именно, кликните, чтобы отправить форму.', true).addEventListener('click', ()=>{
                                    window.open(`mailto:ovgamesdev@gmail.com?subject=New parameter ${code}-${JSData[0]}&body=${JSON.stringify(JSData)}`)
                                })
                                console.warn(`${code}[${JSData[0]}]`, JSData);
                                break;
                        }
                    }
                };

                HelperSocket.socketd.onerror = function(error) {
                    clearInterval(HelperSocket.intervalcheck)
                    HelperSocket.socketd = null
                    console.log(`[error] ${error}`);
                    HelperSocket.start(getChannelName())
                };
            }
        })
    },
    stop() {
        if (HelperSocket.socketd) {
            clearInterval(HelperSocket.intervalcheck)
            HelperSocket.socketd.close()
            HelperSocket.socketd = null
        }
    },
    send(message) {

        if (HelperSocket.socketd.readyState === 1) HelperSocket.socketd.send(`42["message",{"hash":"${HelperSocket.hash(25)}","streamId":${HelperSocket.streamId},"channelId":${HelperSocket.channelId},"jwt":"${HelperSocket.jwt}","message":"${message}"}]`)
    },
    hash(length) {
        var result = '';
        var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
}