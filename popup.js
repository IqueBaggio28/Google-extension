const start = document.getElementById('btn');
const increase = document.getElementById('increaseTime');
const decrease = document.getElementById('decreaseTime');
const reset = document.getElementById('reset');
const timeH = document.getElementById('clock');

chrome.runtime.sendMessage({ action: "request_initial_timer_display" });

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "play_sound") {
        // Play the sound
        const audio = new Audio();
        audio.src = chrome.runtime.getURL(message.media);
        audio.play();
    }
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "update_timer_display") {
        const minutes = Math.floor(message.minutes);
        const seconds = Math.floor(message.seconds);
        timeH.innerHTML = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    else if(message.action === "update_button"){
        start.innerHTML = message.text;
    }
});

start.addEventListener('click', function() {
  if(!running) {
    chrome.runtime.sendMessage({action: "start_timer"});
    start.innerHTML = "Pause";
  }
  else{
    chrome.runtime.sendMessage({action:"pause_timer"});
    start.innerHTML = 'Start';
  }
  running = !running;

});

increase.addEventListener('click', function() {
    chrome.runtime.sendMessage({action:"increase"});
});

decrease.addEventListener('click', function() {
    chrome.runtime.sendMessage({action:"decrease"});
});

reset.addEventListener('click', function() {
    chrome.runtime.sendMessage({ action: "reset_timer" });
    start.innerHTML = "Start";
});