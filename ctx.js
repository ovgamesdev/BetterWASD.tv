// Author: ka.designlab

const channels = [];

/* ================= */

window.bwasd = {
  debug: false,
  channel: {},
  mediaContainer: {},
  chatService: null,
  messageService: null,
  userService: null,
  loading: false,
};

/* HELPERS */

const logger = {
  _prefix: "[BetterWASYA]",
  debug(data) {
    if (bwasd.debug) console.log(logger._prefix, data);
  },
  log(msg) {
    console.log(`${logger._prefix} ${msg}`);
  },
  warn(msg) {
    console.warn(`${logger._prefix} ${msg}`);
  },
  error(err) {
    err.message = `${logger._prefix} ${err.message}`;
    console.error(err);
  },
};

const getCtx = (tag) => {
  const el = document.querySelector(tag);
  if (el && el.__ngContext__) return el.__ngContext__[el.__ngContext__.length - 1];
  return null;
};

const waitForNgElementToLoad = (tag, timeout = 10, ng = true) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(function () {
      const el = document.querySelector(tag);
      if (el && !ng) {
        clearInterval(interval);
        resolve();
      }
      if (el && el.__ngContext__) {
        clearInterval(interval);
        resolve();
      }
    }, 1);
    setTimeout(() => {
      clearInterval(interval);
      reject(`Element ${tag} not found or timeout exceeded`);
    }, timeout * 1000);
  });
};

const waitForNgElementToLoadOneFromArray = (tags = [], timeout = 10, ng = true) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(function () {
      for (let tag of tags) {
        const el = document.querySelector(tag);
        if (el && !ng) {
          clearInterval(interval);
          resolve();
        }
        if (el && el.__ngContext__) {
          clearInterval(interval);
          resolve();
        }
      }
    }, 1);
    setTimeout(() => {
      clearInterval(interval);
      reject(`Element ${tags} not found or timeout exceeded`);
    }, timeout * 1000);
  });
};

let currentHref = document.location.href;

const onLocationChange = async (cb) => {
  const body = document.querySelector("body");
  const observer = new MutationObserver(function (mutations) {
    if (currentHref !== document.location.href) {
      currentHref = document.location.href;
      if (currentHref !== "https://wasd.tv/") cb();
    }
  });
  const config = { childList: true, subtree: true };
  observer.observe(body, config);
};

/* BUSINESS LOGIC */

const initChat = async () => {
  await Promise.all([waitForNgElementToLoad("wasd-chat", 120), waitForNgElementToLoad("wasd-chat-messages", 120)]).catch((e) => {
    throw new Error("Failed to load!");
  });

  const messagesCtx = getCtx("wasd-chat-messages");

  bwasd.chatService = messagesCtx._chatService;

  bwasd.messageService = bwasd.chatService.chatMessageService;
  bwasd.userService = bwasd.chatService.chatUserService;

  const channel = document.querySelector("wasd-channel") || document.querySelector("wasd-settings-page");
  if (bwasd.chatService) {
    channel.dataset.streamId = bwasd.chatService.streamId;
    channel.dataset.channelId = bwasd.chatService.channelId;
    channel.dataset.streamerId = bwasd.chatService.streamerId;
    channel.dataset.streamerName = bwasd.chatService.streamerName;
    channel.dataset.viewerUserId = bwasd.chatService._viewerUserId;
    channel.dataset.viewerUserName = bwasd.chatService.viewerUserName;
  }

  const wasdAddMessage = bwasd.messageService.addMessage.bind(bwasd.messageService);

  bwasd.messageService.addMessage = async function (e) {
    logger.debug(e);
    if (!e.id) return wasdAddMessage(e);
    addHistoryMessage(e.id, e.message, e.sticker?.sticker_image?.large, e.user_id, e.user_login);

    e.message = `<span class="id_${e.id}"> ${e.message ? e.message : ""} </span>`;

    wasdAddMessage(e);

    waitForNgElementToLoad(`span.id_${e.id}`, 5, false).then(() => {
      let div = document.querySelector(`span.id_${e.id}`);
      let msg = div.closest("div.block__messages__item");

      msg.dataset.id = e.id;
      msg.dataset.user_login = e.user_login;
      msg.dataset.user_id = e.user_id;
      msg.dataset.message = e.message.replace(/<span class="id_([A-Za-a0-9-])\S+">/gi, "").replace(/<\/span>/gi, "");
      msg.dataset.sticker = e.sticker?.sticker_image?.large;
      msg.dataset.time = e.date_time;
      if (e.sticker) {
        msg.dataset.sticker_id = e.sticker?.sticker_id;
        msg.dataset.sticker_name = e.sticker?.sticker_name;
        msg.dataset.sticker_pack_id = e.sticker?.sticker_pack_id;
      }
    });
  };

  logger.log("Ready");
  bwasd.loading = false;

  waitForNgElementToLoad(".block__messages__item", 30).then(() => {
    let messages = document.querySelectorAll(`.block__messages__item`);

    messages.forEach((msg, index) => {
      if (!bwasd.messageService || !bwasd.messageService._messages) return;
      let e = bwasd.messageService._messages[index];

      if (!e) return;

      addHistoryMessage(e.id, e.message, e.sticker?.sticker_image?.large, e.user_id, e.user_login);

      msg.dataset.id = e.id;
      msg.dataset.user_login = e.user_login;
      msg.dataset.user_id = e.user_id;
      msg.dataset.message = e.message;
      msg.dataset.sticker = e.sticker?.sticker_image?.large;
      msg.dataset.time = e.date_time;
      if (e.sticker) {
        msg.dataset.sticker_id = e.sticker?.sticker_id;
        msg.dataset.sticker_name = e.sticker?.sticker_name;
        msg.dataset.sticker_pack_id = e.sticker?.sticker_pack_id;
      }
    });
  });
};

const addHistoryMessage = (id, message, sticker, user_id, user_login) => {
  let history = document.querySelector(".messages_history");
  let msg = document.createElement("div");
  msg.dataset.id = id || "";
  msg.dataset.message = message || "";
  msg.dataset.sticker = sticker || "";
  msg.dataset.usernamelc = user_login?.toLowerCase() || "";
  msg.dataset.username = user_login || "";
  msg.dataset.user_id = user_id || "";
  if (!history) {
    history = document.createElement("div");
    history.classList.add("messages_history");
    history.setAttribute("bwasd", "");
    document.body.append(history);
  }
  history.append(msg);
  if (history.childElementCount > 200) history.firstChild.remove();
};

const resetGlobals = () => {
  bwasd.channel = {};
  bwasd.mediaContainer = {};
  bwasd.chatService = null;
  bwasd.messageService = null;
  bwasd.userService = null;
};

const init = async () => {
  if (bwasd.loading) return;

  bwasd.loading = true;

  resetGlobals();
  await waitForNgElementToLoadOneFromArray(["wasd-channel", "wasd-settings-page"], 15);
  const channelCtx = getCtx("wasd-channel") || getCtx("wasd-settings-page");
  bwasd.channel = channelCtx.channel;
  bwasd.mediaContainer = channelCtx.mediaContainer;

  let channel = document.querySelector(`wasd-channel`) || document.querySelector("wasd-settings-page");
  channel.dataset.publishedAt = channelCtx?.mediaContainer?.published_at;

  if (bwasd.channel) {
    await initChat();
  } else {
    bwasd.loading = false;
  }
};

/* ================ */
if (typeof $ != "function") {
  logger.log("не найден jquery");
} else {
  $((e) => {
    logger.debug("Debug mode enabled");

    init()
      .then(async () => {
        await onLocationChange(() => {
          init().catch((e) => {
            logger.error(e);
          });
        });
      })
      .catch((e) => {
        logger.error(e);
      });
  });
}
