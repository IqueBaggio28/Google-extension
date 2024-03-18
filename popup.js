const start = document.getElementById('btn');
const increase = document.getElementById('increaseTime');
const decrease = document.getElementById('decreaseTime');
const reset = document.getElementById('reset');
const timeH = document.getElementById('clock');
let start = document.getElementById('btn');
let tasks = document.querySelectorAll('.tasks_list');
let increase = document.getElementById('increaseTime');
let decrease = document.getElementById('decreaseTime');
const checkList = document.querySelectorAll('.check');
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
        if(timeSeconds < 300){
            timeSeconds +=300;
        }
        displayTime(timeSeconds);
    }
})

// document.addEventListener('DOMContentLoaded', function () {
//             var tasks = document.querySelector('.tasks');
//
//             tasks.addEventListener('click', function (event) {
//                 if (event.target.classList.contains('tasks_list')) {
//                     // Create input element
//                     var input = document.createElement('input');
//                     input.style.marginLeft = '15px';
//                     input.type = 'text';
//
//                     // Replace button with input element
//                     var listItem = event.target.parentNode;
//                     listItem.replaceChild(input, event.target);
//
//
//                     // Create "Check" button
//                     checkButton.style.display = 'initial';
//                     checkButton.style.marginRight = '5px';
//                     listItem.appendChild(checkButton);
//
//
//                     // Create "Delete" button
//                     var deleteButton = document.createElement('button');
//                     deleteButton.innerHTML = '&#10006;'; // Black 'X'
//                     deleteButton.classList.add('delete-button');
//                     listItem.appendChild(deleteButton);
//
//                     // Focus on the input element
//                     input.focus();
//
//                     // Track the state of the check button
//                     var isChecked = false;
//
//                     // Listen for "Check" button click
//                     checkButton.addEventListener('click', function () {
//                         if (!isChecked) {
//                             input.style.textDecoration = 'line-through';
//                             checkButton.style.backgroundColor = 'green';
//                             isChecked = true;
//                         } else {
//                             input.style.textDecoration = 'none';
//                             checkButton.style.backgroundColor = 'transparent';
//
//                             isChecked = false;
//                         }
//                     });
//
//                     // Listen for "Delete" button click
//                     deleteButton.addEventListener('click', function () {
//                         // Create new button element
//                         var newButton = document.createElement('button');
//                         newButton.textContent = '+';
//                         checkButton.style.backgroundColor = 'transparent';
//                         newButton.classList.add('tasks_list');
//
//                         // Replace input with button
//                         listItem.replaceChild(newButton, input);
//                         listItem.removeChild(checkButton);
//                         listItem.removeChild(deleteButton);
//                     });
//
//                     // Listen for Enter key press to revert back to button
//                     input.addEventListener('keyup', function (e) {
//                         if (e.keyCode === 13) { // Enter key code
//                             // Create new button element
//                             var button = document.createElement('button');
//                             button.textContent = '+';
//                             button.classList.add('tasks_list');
//
//                             // Replace input with button
//                             listItem.replaceChild(button, input);
//                             listItem.removeChild(checkButton);
//                             listItem.removeChild(deleteButton);
//                         }
//                     });
//                 }
//             });
//         });

document.addEventListener('DOMContentLoaded', function() {
    const addButtonList = document.querySelectorAll('.tasks_list');

    addButtonList.forEach(function(button) {
        button.addEventListener('click', function() {
            const li = this.parentElement;
            const check = li.querySelector('.check');

            // Show check and create input box and delete button
            check.style.display = 'block';
            const input = document.createElement('input');
            input.type = 'text';
            input.classList.add('task-input'); // Add a class for easier styling
            input.placeholder = 'Input your task'; // Set placeholder text
            li.appendChild(input);

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.innerHTML = '&#10006;'; // Black 'X'
            deleteButton.style.scale = '.8';
            li.appendChild(deleteButton);

            // Add functionality to delete button
            deleteButton.addEventListener('click', function() {
                check.style.display = 'none';
                input.remove();
                deleteButton.remove();
                button.style.display = 'inline-block'; // Show '+' button again
                // Reset check color
                check.style.backgroundColor = '';

                // Adjust opacity
            });

            // Remove functionality of '+' button
            this.style.display = 'none';
            // Adjust opacity
            li.style.opacity = '1';
        });
    });
    // Add functionality to check elements
    const checkList = document.querySelectorAll('.check');
    checkList.forEach(function(check) {
        check.addEventListener('click', function() {
            const li = this.parentElement;
            const text = li.querySelector('.task-input');
            if (text.style.textDecoration === 'line-through') {
                text.style.textDecoration = 'none';
                check.style.backgroundColor = '';
            } else {
                text.style.textDecoration = 'line-through';
                check.style.backgroundColor = 'green';
            }
        });
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
