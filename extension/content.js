let connectionCount = 0;
let intervalId;
function startConnecting() {
    console.log("Starting connection requests...");
    
    // logic for clicking Connect buttons
    const connectButtons = Array.from(document.querySelectorAll('button'))
      .filter(btn => btn.innerText.trim() === 'Connect');
  
    let i = 0;
    intervalId = setInterval(() => {
      if (i >= connectButtons.length) {
        clearInterval(intervalId);
        console.log("Finished clicking all Connect buttons.");
        return;
      }
      const button = connectButtons[i];
      if (button && button.innerText.trim() === 'Connect' || button && button.innerText.trim() === 'Follow') {
        button.click();
        setTimeout(() => {
          const sendButton = document.querySelector('button[aria-label="Send without a note"]');
          if (sendButton) {
            sendButton.click();
            connectionCount++;
            chrome.runtime.sendMessage({ connectionCount });
            console.log(`Clicked Send on connection request ${i + 1}`);
          }
        }, 1500); // 1-second delay to allow dialog to load
      }
  
        console.log(`Clicked Connect button ${i + 1}`);
      i++;
    }, Math.floor(Math.random() * 5000) + 5000); // 5-10 second random delay
  }
  
  function stopConnecting() {
    clearInterval(intervalId);
    console.log("Stopped connection requests.");
    // Logic to stop the process, if needed
  }
  