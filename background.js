let notificationId = null;
let username = null;
let contentTabId = null;

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.notify == "create") {
            contentTabId = sender.tab.id;
            username = request.username
            chrome.notifications.create({
                type: "basic",
                iconUrl: "img/icon128.png",
                title: request.title,
                message: request.message,
                buttons: [
                    { title: 'Ответить' }
                ]
            }, function(id) {
                notificationId = id
            })
        }
    }
);

chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
    if (notifId == notificationId) {
        if (btnIdx == 0 && contentTabId) {
            chrome.tabs.sendMessage(contentTabId, {
                from: "background",
                username: username
            });
        }
    }
});