// background.js

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      return {
        cancel: details.url.indexOf("hagrid") != -1
      };
    },
    {urls: ["<all_urls>"]},
    ["blocking"]
);