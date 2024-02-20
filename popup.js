const timeH = document.getElementById('clock');
let start = document.getElementById('btn');
let tasks = document.querySelectorAll('.tasks_list');
let increase = document.getElementById('increaseTime');
let decrease = document.getElementById('decreaseTime');
let checkButton = document.getElementById('task-check')
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
        start.addEventListener('click',()=> {
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
        })
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
        if(timeSeconds < 0){
            timeSeconds +=300;
        }
        displayTime(timeSeconds);
    }
})

document.addEventListener('DOMContentLoaded', function () {
            var tasks = document.querySelector('.tasks');

            tasks.addEventListener('click', function (event) {
                if (event.target.classList.contains('tasks_list')) {
                    // Create input element
                    var input = document.createElement('input');
                    input.style.marginLeft = '15px';
                    input.type = 'text';

                    // Replace button with input element
                    var listItem = event.target.parentNode;
                    listItem.replaceChild(input, event.target);


                    // Create "Check" button
                    checkButton.style.display = 'initial';
                    checkButton.style.marginRight = '5px';
                    listItem.appendChild(checkButton);


                    // Create "Delete" button
                    var deleteButton = document.createElement('button');
                    deleteButton.innerHTML = '&#10006;'; // Black 'X'
                    deleteButton.classList.add('delete-button');
                    listItem.appendChild(deleteButton);

                    // Focus on the input element
                    input.focus();

                    // Track the state of the check button
                    var isChecked = false;

                    // Listen for "Check" button click
                    checkButton.addEventListener('click', function () {
                        if (!isChecked) {
                            input.style.textDecoration = 'line-through';
                            checkButton.style.backgroundColor = 'green';
                            isChecked = true;
                        } else {
                            input.style.textDecoration = 'none';
                            checkButton.style.backgroundColor = 'transparent';

                            isChecked = false;
                        }
                    });

                    // Listen for "Delete" button click
                    deleteButton.addEventListener('click', function () {
                        // Create new button element
                        var newButton = document.createElement('button');
                        newButton.textContent = '+';
                        checkButton.style.backgroundColor = 'transparent';
                        newButton.classList.add('tasks_list');

                        // Replace input with button
                        listItem.replaceChild(newButton, input);
                        listItem.removeChild(checkButton);
                        listItem.removeChild(deleteButton);
                    });

                    // Listen for Enter key press to revert back to button
                    input.addEventListener('keyup', function (e) {
                        if (e.keyCode === 13) { // Enter key code
                            // Create new button element
                            var button = document.createElement('button');
                            button.textContent = '+';
                            button.classList.add('tasks_list');

                            // Replace input with button
                            listItem.replaceChild(button, input);
                            listItem.removeChild(checkButton);
                            listItem.removeChild(deleteButton);
                        }
                    });
                }
            });
        });

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
                    // paused = true;
                    // running = false;
                    // start.innerHTML = 'Start';
                    // startBreak();

                }
            },1000);
            running = true;
            paused = false;
            start.innerHTML = "Pause";

        }

})

