// this background script has permissions to invoke tabCapture API

// listen to messages sent via port in livelyInjection.js
chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(message) {
        if (message === 'lively-tabshot-snap') {
            chrome.tabs.captureVisibleTab({format: 'png'}, function(dataUrl) {
                port.postMessage({'lively-tabshot-data': dataUrl});
            });
        }
    });
});