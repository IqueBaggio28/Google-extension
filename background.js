const timeH = document.getElementById('clock');
const start = document.getElementById('btn');
const increase = document.getElementById('increaseTime');
const decrease = document.getElementById('decreaseTime');
const reset = document.getElementById('reset');

let mode = "work";
let time = 1500;
let timeSeconds = time;
let countDown = null;
let cycle = 0;
let running = false;
let paused = false;

displayTime(timeSeconds); // display the initial time



//Functions
//------------------------------------------------------------------------------------------

/**
 * Function that will display the time remaining
 * */
function displayTime(seconds){
    const min = Math.floor(seconds / 60); // get minutes
    const sec = Math.floor(seconds % 60); // get seconds
    timeH.innerHTML = `${min < 10? '0':''}${min}:${sec < 10? '0':''}${sec}`;

}

/**
 * Function to display a notification
 */
function showNotification() {
    const options = {
        type: 'basic',
        title: 'Timer Finished',
        message: 'The timer has finished.',
        iconUrl: 'icon.png'
    };
    chrome.notifications.create(options);
}

/**
 * Function that will start the timer
 * */
function startTimer(){
    countDown = setInterval(()=>{
        timeSeconds--;
        displayTime(timeSeconds);
        if(timeSeconds === 0){
            clearInterval(countDown);
            switchMode();
            showNotification();
        }
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
    displayTime(timeSeconds);
    start.innerHTML = "Start";
}

// Save timer state to chrome storage
function saveTimerState() {
    chrome.storage.local.set({
        mode,
        time,
        timeSeconds,
        cycle,
        running,
        paused
    });
}

// Load timer state from chrome storage
function loadTimerState() {
    chrome.storage.local.get(['mode', 'time', 'timeSeconds', 'cycle', 'running', 'paused'], function(result) {
        mode = result.mode || mode;
        time = result.time || time;
        timeSeconds = result.timeSeconds || timeSeconds;
        cycle = result.cycle || cycle;
        running = result.running || running;
        paused = result.paused || paused;
        displayTime(timeSeconds);
        if (running && !paused) {
            startTimer();
        }
    });
}

// Buttons
// ----------------------------------------------------------------------------

start.addEventListener('click', function() {
    if (running) {
        clearInterval(countDown);
        start.innerHTML = 'Start';
        paused = true;
        running = false;

    } else {
        startTimer();
        start.innerHTML = "Pause";
        running = true;
        paused = false;

    }
});

increase.addEventListener('click',function () {
    if(!running && !paused) {
        timeSeconds += 300;
        time += 300;
        if(timeSeconds > 3000){
            timeSeconds -=300;
            time -= 300;
        }
        displayTime(timeSeconds);
    }
})
decrease.addEventListener('click',function () {
    if(!running && timeSeconds !== 0 && !paused) {
        timeSeconds -= 300;
        time -= 300;
        if(timeSeconds < 300){
            timeSeconds +=300;
            time +=300;
        }
        displayTime(timeSeconds);
    }
})

reset.addEventListener('click',function(){
    clearInterval(countDown);
    timeSeconds = time;
    mode = 'work';
    start.innerHTML = "Start";
    displayTime(timeSeconds);
    cycle = 0;
    running = false;
    paused = false;
})

// Load timer state when the popup is opened
document.addEventListener('DOMContentLoaded', loadTimerState);

// Save timer state when the popup is closed
window.addEventListener('beforeunload', saveTimerState);

