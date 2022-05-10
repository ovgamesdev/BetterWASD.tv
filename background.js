let notificationReplyId = null;
let notificationWhatsNewId = null;
let username = null;
let contentTabId = null;
let tab_settingsId = null;

chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {

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
    }, (id) => { notificationReplyId = id })
  }
  if (request.update_save) {
    if (contentTabId) chrome.tabs.sendMessage(contentTabId, { from: "background", update_save: request.update_save });
  }
  if (request.update_chat) {
    if (contentTabId) chrome.tabs.sendMessage(contentTabId, { from: "background", update_chat: request.update_chat });
  }
  if (request.location) {
    if (contentTabId) chrome.tabs.sendMessage(contentTabId, { from: "background", location: request.location });
  }
  if (request.from == "tab_settings") {
    tab_settingsId = sender.tab.id;
  }
  if (request.from == "tab_content") {
    contentTabId = sender.tab.id;
  }
  if (request.setUninstall) {
    chrome.runtime.setUninstallURL(`https://betterwasd.herokuapp.com/api/v1/stat/tv/delete/${request.setUninstall}`,)
  }
  if (request.createWindow) {
    chrome.windows.create({
      url: request.createWindow,
      type: "popup",
      width: 900,
      height: 560,
      focused: true
    });
  }

  sendResponse({message: 'ok'});
  return true

});

chrome.notifications.onButtonClicked.addListener((notifId, btnIdx) => {
  if (notifId == notificationReplyId && btnIdx == 0 && contentTabId) {
    chrome.tabs.sendMessage(contentTabId, { from: "background", username: username });
  }
  if (notifId == notificationWhatsNewId && btnIdx == 0) {
    chrome.windows.create({
      url: "https://wasd.tv/chat?helper-settings=settings&type=whatsNew",
      type: "popup",
      width: 900,
      height: 560,
      focused: true
    });
  }
});


let botPort = null
chrome.runtime.onConnectExternal.addListener(function(port) {
  botPort = port

  botPort.onMessage.addListener(function(msg, sender, sendResponse) {
    console.log(msg, contentTabId)
    if (msg.from == "background_betterwasd_bot" && msg.userCoins && contentTabId) {
      chrome.tabs.sendMessage(contentTabId, { from: "background", coinUsers: msg.userCoins });
    }

    return true;
  });

});

chrome.runtime.onInstalled.addListener(function(details) {
  // if (details.reason == "install") {
  // }
  if (details.reason == "update") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "img/icon128.png",
      title: "BetterWASD",
      message: "Расширение обновлено",
      buttons: [{
        title: 'Что нового'
      }]
    }, (id) => { notificationWhatsNewId = id })
  }
});
