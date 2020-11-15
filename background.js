chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
    let msg = {
        time: 5000
    }
    chrome.tabs.sendMessage(tab.id, msg)
}