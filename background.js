chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.create({'url': chrome.extension.getURL('player.html')}, function(tab) {
        // Tab opened.
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
      chrome.tabs.update(sender.tab.id, {url: chrome.extension.getURL('player.html#'+request.file)});
});