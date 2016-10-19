// This is the content script that gets injected to every page
// on lively-web.org

// forward messages from page to background script
window.addEventListener('message', function(event) {
    if (event.source !== window) return;
    
    switch (event.data) {   
        case 'lively-tabshot-detect':
            window.postMessage('lively-tabshot-available', '*');
            break;
        case 'lively-tabshot-snap':
            port.postMessage(event.data);
            break;
    }
});

// forward messages from background script to page
var port = chrome.runtime.connect();
port.onMessage.addListener(function(message) {
    window.postMessage(message, '*');
});
