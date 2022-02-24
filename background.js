let notificationId = null;
let username = null;
let contentTabId = null;
let tab_settingsId = null;

chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
  console.log(request)
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
      }, (id) => { notificationId = id })
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

    if (request.from == "betterwasd_tv" && request.getCoinUsers) {
      let port = chrome.runtime.connect("fdgepfaignbakmmbiafocfjcnaejgldb")
      port.postMessage({ from: 'betterwasd_tv', getCoinUsers: request.getCoinUsers });
    }

  }
);

chrome.notifications.onButtonClicked.addListener((notifId, btnIdx) => {
  if (notifId == notificationId && btnIdx == 0 && contentTabId) {
    chrome.tabs.sendMessage(contentTabId, { from: "background", username: username });
  }
});


let botPort = null
chrome.runtime.onConnectExternal.addListener(function(port) {
  botPort = port

  botPort.onMessage.addListener(function(msg) {
    // console.log(msg)
    if (msg.from == "background_betterwasd_bot" && msg.userCoins) {

      chrome.tabs.sendMessage(contentTabId, { from: "background", coinUsers: msg.userCoins });

      console.log(msg)

    }
  });

});