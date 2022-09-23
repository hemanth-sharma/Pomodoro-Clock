const MAX_TIME = 60;
const DEFUALT_SESSION_TIME = 25;
const DEFUALT_BREAK_TIME = 5;
let SESSION_COUNT = 1;
let CLOCK_ID = 0;
let TIME_RUNNING = false;
let SESSION_FLAG = false;

// control status // toggles between session and break timer
const controlButton = document.getElementById("header-section-btn");
let controlStatus = document.getElementById("status");

// Time - minute and second
const minute = document.getElementById("minute");
const second = document.getElementById("second");

// start and reset buttons 
const start = document.getElementById("start");
const reset = document.getElementById("reset");
let currTimeCounter = 0;

// SESSION - and + buttons
const sessionTimeValue = document.getElementById("session-time-value");
const sMinus = document.getElementById("s-minus");
const sPlus = document.getElementById("s-plus");
let sessionCounter = DEFUALT_SESSION_TIME;
sessionTimeValue.textContent = sessionCounter +" min";

// This flag switches counter between session time and break time
let COUNTER_FLAG = sessionCounter; // Default is session


// BREAK - and + buttons
const breakTimeValue = document.getElementById("break-time-value");
const bMinus = document.getElementById("b-minus");
const bPlus = document.getElementById("b-plus");
let breakCounter = DEFUALT_BREAK_TIME;
breakTimeValue.textContent = breakCounter +" min";


// session time and break time + and - events
sMinus.addEventListener("click", function(){
    if(sessionCounter > 1){
        sessionCounter--;
    }
    sessionTimeValue.textContent = sessionCounter +" min";
    if(!SESSION_FLAG){
        COUNTER_FLAG = sessionCounter;
    }
});
sPlus.addEventListener("click", function(){
    if(sessionCounter < MAX_TIME){
        sessionCounter++;
    }
    sessionTimeValue.textContent = sessionCounter +" min";
    if(!SESSION_FLAG){
        COUNTER_FLAG = sessionCounter;
    }
});
bMinus.addEventListener("click", function(){
    if(breakCounter > 0){
        breakCounter--;
    }
    breakTimeValue.textContent = breakCounter +" min";
    if(SESSION_FLAG){
        COUNTER_FLAG = breakCounter;
    }
});
bPlus.addEventListener("click", function(){
    if(breakCounter < MAX_TIME){
        breakCounter++;
    }
    breakTimeValue.textContent = breakCounter +" min";
    if(SESSION_FLAG){
        COUNTER_FLAG = breakCounter;
    }
});

// Control button for changing status of session and passing control between session and break time
controlButton.addEventListener("click", function(){
    SESSION_FLAG = !SESSION_FLAG;
    updateStatusButton();
    resetTimer();
});

start.addEventListener("click", function(){
    TIME_RUNNING = !TIME_RUNNING;
    updateButton();
    // use a function to show whats running 
    // use a variable counter = sessionCounter or breakCounter, check for who holds control
    // 
    if(TIME_RUNNING){ 
        currTimeCounter = COUNTER_FLAG*60;
        CLOCK_ID = setInterval(function(){
            currTimeCounter--;
            updateTime();
            if(currTimeCounter <= 0){
                if(!SESSION_FLAG){
                    SESSION_COUNT++;
                }
                SESSION_FLAG = !SESSION_FLAG;
                updateStatusButton();
                resetTimer();
            }
        }, 100);
    }
    else{
        clearInterval(CLOCK_ID);
    }

});

reset.addEventListener("click", function(){
    resetTimer();
    SESSION_COUNT = 1;
    updateStatusButton();
});

function updateTime(){
    let min = parseInt(currTimeCounter/60);
    let sec = parseInt(currTimeCounter % 60);
    if(currTimeCounter < 0){
        min = 0;
        sec = 0;
    }
    if(min < 10){
        minute.textContent = "0" + min;
    }
    else{
        minute.textContent = min;
    }

    if(sec < 10){
        second.textContent = "0" + sec;
    }
    else{
        second.textContent = sec;

    }

}
function updateButton(){
    if(TIME_RUNNING){
        start.textContent = "pause";
    }
    else{
        start.textContent = "start";
    }
}
function updateStatusButton(){
    let sessionCountContent = document.getElementById("session-count");
    if(SESSION_FLAG){
        controlStatus.textContent = "Break";
        sessionCountContent.textContent = "Time";
    }
    else{
        controlStatus.textContent = "Session";
        sessionCountContent.textContent = SESSION_COUNT;
    }
}
function toggleSession(){
    if(SESSION_FLAG){
        // console.log("break running");
        if(currTimeCounter !== 0){
            alert("Warning your session is still active");
        }
        COUNTER_FLAG = breakCounter;
    }
    else{
        // console.log("session running");
        COUNTER_FLAG = sessionCounter;
    }
}

function setCountTimeDefault(){
    sessionCounter = DEFUALT_SESSION_TIME;
    breakCounter = DEFUALT_BREAK_TIME;
    sessionTimeValue.textContent = DEFUALT_SESSION_TIME +" min";
    breakTimeValue.textContent = DEFUALT_BREAK_TIME +" min";
}

function resetTimer(){
    TIME_RUNNING = false;
    updateButton();
    clearInterval(CLOCK_ID);
    setCountTimeDefault();
    toggleSession();
    currTimeCounter = 0;
    updateTime();
}