let notificationId = null;
let username = null;
let contentTabId = null;
let tab_settingsId = null;

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.notify == "create") {
      contentTabId = sender.tab.id;
      username = request.username
      chrome.notifications.create({
        type: "basic",
        iconUrl: "img/icon128.png",
        title: request.title,
        message: request.message,
        buttons: [{
          title: 'Ответить'
        }]
      }, (id) => {
        notificationId = id
      })
    }
    if (request.update_save) {
      if (contentTabId) chrome.tabs.sendMessage(contentTabId, {
        from: "background",
        update_save: request.update_save
      });
    }
    if (request.update_chat) {
      if (contentTabId) chrome.tabs.sendMessage(contentTabId, {
        from: "background",
        update_chat: request.update_chat
      });
    }
    if (request.location) {
      if (contentTabId) chrome.tabs.sendMessage(contentTabId, {
        from: "background",
        location: request.location
      });
    }
    if (request.from == "tab_settings") {
      tab_settingsId = sender.tab.id;
    }
    if (request.from == "tab_content") {
      contentTabId = sender.tab.id;
    }
  }
);

chrome.notifications.onButtonClicked.addListener((notifId, btnIdx) => {
  if (notifId == notificationId) {
    if (btnIdx == 0 && contentTabId) {
      chrome.tabs.sendMessage(contentTabId, {
        from: "background",
        username: username
      });
    }
  }
});