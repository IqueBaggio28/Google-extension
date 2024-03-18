console.log("background running");

loadTimerState();

let mode = "work";
let time = 15;
let timeSeconds = time;
let countDown = null;
let cycle = 0;
let running = false;
let paused = false;


// Send initial timer display data when requested by popup
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "request_initial_timer_display") {
        sendMessageToPopup("update_timer_display", {
            minutes: Math.floor(timeSeconds / 60),
            seconds: timeSeconds % 60
        });
    }
});




//Functions
//------------------------------------------------------------------------------------------

function startTimer(){

    countDown = setInterval(()=>{
        timeSeconds--;
        sendMessageToPopup("update_timer_display", {
            minutes: Math.floor(timeSeconds / 60),
            seconds: timeSeconds % 60
        });
        if(timeSeconds === 0){
            clearInterval(countDown);
            switchMode();



        }
        sendMessageToPopup("update_timer_display", {
            minutes: Math.floor(timeSeconds / 60),
            seconds: timeSeconds % 60
        });

    },1000)
}

/**
 * Function responsible for switching between work time, short break and long break
 * */
function switchMode(){
    if(mode === 'work' && cycle === 4){
        cycle = 0;
        mode = 'longBreak';
        timeSeconds = time * 0.6;
    }
    else if(mode === 'shortBreak'){
        cycle++;
        mode = 'work';
        timeSeconds = time;
    }
    else if(mode === 'longBreak'){
        mode = 'work';
        timeSeconds = time;
    }
    else{
        mode = 'shortBreak';
        timeSeconds = time * 0.2;
    }
    sendMessageToPopup("update_timer_display", {
        minutes: Math.floor(timeSeconds / 60),
        seconds: timeSeconds % 60
    });
    sendMessageToPopup("update_button",{text: 'Start'});
    showNotification("Pomodoro Timer", "Time is up!");
    saveTimerState();
}

function showNotification(title, message) {
  chrome.notifications.create(
    null,
    {
        type: "basic",
        iconUrl: "Pomodoro.png",
        title: title,
        message:message,

    },
  );
  playSound();
}
function playSound() {
    chrome.runtime.sendMessage({ action: "play_sound",media: "achive-sound-132273.mp3" });
}

function sendMessageToPopup(action, data) {
    chrome.runtime.sendMessage({ action: action, ...data });
}

// Function to save timer state to storage
function saveTimerState() {
    chrome.storage.local.set({
        mode: mode,
        timeSeconds: timeSeconds,
        cycle: cycle,
        running: running,
        paused: paused
    });
}

// Function to load timer state from storage
function loadTimerState() {
    chrome.storage.local.get(['mode', 'timeSeconds', 'cycle', 'running', 'paused'], function(result) {
        mode = result.mode || "work";
        timeSeconds = result.timeSeconds || 15;
        cycle = result.cycle || 0;
        running = result.running || false;
        paused = result.paused || false;
    });
}
// Buttons
// ----------------------------------------------------------------------------



chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    if(message.action === "start_timer"){
        startTimer();
        running = true;
        paused = false;
    }
    else if(message.action === "pause_timer"){
        clearInterval(countDown);
        paused = true;
        running = false;
    }
    else if(message.action === "increase"){
        if (!running && !paused) {
            timeSeconds += 300;
            time += 300;
            if (timeSeconds > 3300) {
                timeSeconds -= 300;
                time -= 300;
            }
        sendMessageToPopup("update_timer_display", {
            minutes: Math.floor(timeSeconds / 60),
            seconds: timeSeconds % 60
        });
        }
    }
    else if(message.action === "decrease"){
        if (!running && timeSeconds !== 0 && !paused) {
            timeSeconds -= 300;
            time -= 300;
            if (timeSeconds < 300) {
                timeSeconds += 300;
                time += 300;
            }
        sendMessageToPopup("update_timer_display", {
            minutes: Math.floor(timeSeconds / 60),
            seconds: timeSeconds % 60
        });
        }
    }
    else if(message.action === "reset_timer"){
        clearInterval(countDown);
        timeSeconds = time;
        mode = 'work';
        sendMessageToPopup("update_timer_display", {
            minutes: Math.floor(timeSeconds / 60),
            seconds: timeSeconds % 60
        });
        cycle = 0;
        running = false;
        paused = false;
    }
})

