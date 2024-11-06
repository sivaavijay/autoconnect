document.addEventListener('DOMContentLoaded', function () {
  const countDisplay = document.getElementById('countDisplay');
  const statusDisplay = document.getElementById('statusDisplay');
  let isStarted = false;

  // Listen for connection count messages from content.js
  chrome.runtime.onMessage.addListener((message) => {
    console.log('log',message);
    if (message.connectionCount !== undefined) {
      countDisplay.textContent = `Connections made: ${message.connectionCount}`;
    }
  });
  
  document.getElementById('start').onclick = () => {
    if (!isStarted) {
      isStarted = true;
      statusDisplay.textContent = "Status: Started";
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ['content.js']
        }, () => {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => startConnecting()
          });
        });
      });
    }
  };
  
    document.getElementById('stop').onclick = () => {
      if (isStarted) {
        isStarted = false;
        statusDisplay.textContent = "Status: Stopped";
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => stopConnecting()  // Call stop function in content.js
          });
        });
      }
    };
  });
    