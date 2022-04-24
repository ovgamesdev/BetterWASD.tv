const BetterWS = {
  socket: null,
  intervalcheck: null,
  join() {
    if (this.socket.readyState === this.socket.OPEN) this.socket.send(`42["join",{"streamerId":${socket.channel.channel.user_id}, "userId":${HelperWASD.current?.user_profile?.user_id?HelperWASD.current?.user_profile?.user_id:0}}]`);
  },
  leave() {
    if (this.socket.readyState === this.socket.OPEN) this.socket.send(`42["leave",{"streamerId":${socket.channel.channel.user_id}, "userId":${HelperWASD.current?.user_profile?.user_id?HelperWASD.current?.user_profile?.user_id:0}}]`);
  },
  start(isAutoJoin) {
    this.socket = new WebSocket("wss://betterwasd.herokuapp.com/"); // wss://betterwasd.herokuapp.com/   ws://localhost:5000

    this.socket.onopen = (e) => {
      BetterWS.intervalcheck = setInterval(() => {
        if (BetterWS.socket) {
          try {
            if (BetterWS.socket.readyState === BetterWS.socket.OPEN) BetterWS.socket.send('2')
          } catch (err) {
            console.log(err)
          }
        }
      }, 20000)
      if (isAutoJoin) {
        this.join()
      }
    };

    this.socket.onclose = (e) => {
      clearInterval(BetterWS.intervalcheck)
      setTimeout(() => BetterWS.start(true), 5000)
    };

    this.socket.onmessage = (e) => {
      if (!e || !e.data) return
      let code = null
      let JSData;
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

      if (!JSData) return

      switch (JSData[0]) {
        case "createPaint":
          HelperBWASD.paints[JSData[1].user_login] = JSData[1].paint.toString()
          break;
        case "updatePaint":
          HelperBWASD.paints[JSData[1].user_login] = JSData[1].paint.toString()
          break;
        case "deletePaint":
          delete HelperBWASD.paints[JSData[1].user_login]
          break;

        case "likeEmote":
          if (typeof HelperBWASD.items.bwasdUsers[JSData[1].user_id] == 'undefined') {
            HelperBWASD.items.bwasdUsers[JSData[1].user_id] = {username: socket.channel?.channel?.channel_owner?.user_login, lastUpdate: Date.now()}
          }
          if (typeof HelperBWASD.items.bwasdEmotes[JSData[1].user_id] == 'undefined') {
            HelperBWASD.items.bwasdEmotes[JSData[1].user_id] = {}
          }
          HelperBWASD.items.bwasdEmotes[JSData[1].user_id][JSData[1].code] = {id: JSData[1]._id, zeroWidth: false}
          HelperBWASD.emotes[JSData[1].code] = {id: JSData[1]._id, zeroWidth: false}
          break;
        case "unlikeEmote":
          delete HelperBWASD.items.bwasdEmotes[JSData[1].user_id][JSData[1].code]
          delete HelperBWASD.emotes[JSData[1].code]
          break;
      }

    };

    this.socket.onerror = (err) => {
      clearInterval(BetterWS.intervalcheck)
      setTimeout(() => BetterWS.start(true), 5000)
    };
  }
}