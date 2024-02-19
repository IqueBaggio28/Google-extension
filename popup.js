const timeH = document.getElementById('clock');
let start = document.getElementById('btn');
let increase = document.getElementById('increaseTime');
let decrease = document.getElementById('decreaseTime');
let time = 1500;
let timeSeconds = time;
let breakSeconds = timeSeconds * 0.2;
let countDown = null;
let running = false;
let paused = false;



displayTime(timeSeconds);

function displayTime(seconds){
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    timeH.innerHTML = `${min<10? '0':''}${min}:${sec<10? '0':''}${sec}`;

}
function startBreak() {

    displayTime(breakSeconds);
    let breakInterval = setInterval(() => {
        breakSeconds--;
        if (breakSeconds >= 0) {
            displayTime(breakSeconds);
        } else {
            clearInterval(breakInterval);
            // After break ends, restart the work timer
            timeSeconds = time * .2; // Resetting work timer to 25 minutes
            displayTime(timeSeconds);
            start.innerHTML = "Start";
        }
    }, 1000);
}

increase.addEventListener('click',function () {
    if(!running && !paused) {
        timeSeconds += 300;
        displayTime(timeSeconds);
        if(timeSeconds > 3000){
            timeSeconds -=300;
        }
    }
})
decrease.addEventListener('click',function () {
    if(!running && timeSeconds !== 0 && !paused) {
        timeSeconds -= 300;
        if(timeSeconds < 300){
            timeSeconds +=300;
        }
        displayTime(timeSeconds);
    }
})


start.addEventListener('click',function(){
        if(running){
            clearInterval(countDown);
            paused = true;
            running = false;
            start.innerHTML = "Start";
        }
        else {
            countDown = setInterval( ()=>{
                timeSeconds--;
                if (timeSeconds >= 0){
                    displayTime(timeSeconds);
                }
                else{
                    clearInterval(countDown);
                    //startBreak();
                }
            },1000);
            running = true;
            paused = false
            start.innerHTML = "Pause";

        }

})
