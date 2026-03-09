//Add start button & timer as an element
let startButton = document.getElementById('start');
let timer = document.getElementById('timer');
let stopTimer = document.getElementById('stop');
let reset = document.getElementById('reset');
let lap = document.getElementById('lap');
let addLaps = document.getElementById('laps');
//Elapsed time storage
let elapsedTime = 0;

//Start timer logic (Can't be started if timer is already started)
let hasStarted = false;

function checkStartButton() {
    if (hasStarted === false) {
        hasStarted = true;
        startTimer();
    }
}
startButton.addEventListener('click', checkStartButton);

//Make time variables and add pads
let minutes;
let seconds;
let millis;

//Start timer function
let timeCounter;
let startTime;

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timeCounter = setInterval(() => {
        //Calculate elapsed time
        let currentTime = Date.now();
        elapsedTime = currentTime - startTime;

        //Convert minutes, seconds, and milliseconds
        minutes = Math.floor(elapsedTime/60000);
        seconds = Math.floor(elapsedTime/1000) % 60;
        millis = Math.floor((elapsedTime/10) % 100);


        timer.textContent = padding(minutes) + ":" + padding(seconds) + ":" + padding(millis);
    }, 10)

}
//Padding numbers to two units
function padding(timeMetric) {
    return String(timeMetric).padStart(2, '0');
}

//Stop timer function logic
function stopTimerButton() {
    if (hasStarted === true) {
        hasStarted = false;
        clearInterval(timeCounter);
        timer.textContent = padding(minutes) + ":" + padding(seconds) + ":" + padding(millis);

    }
}
stopTimer.addEventListener('click', stopTimerButton);

//Add ordered list of current time on lap click
let newLap;
function addLap() {
    if (elapsedTime !== 0) {
        newLap = document.createElement('li');
        newLap.textContent = timer.textContent = padding(minutes) + ":" + padding(seconds) + ":" + padding(millis);
        addLaps.appendChild(newLap);
    }
}
lap.addEventListener('click', addLap)

//Add reset function logic (Clear laps and reset timer once pressed).
let allLaps;
function resetTimer() {
    clearInterval(timeCounter);
    elapsedTime = 0;
    hasStarted = false;
    timer.textContent = "00:00:00";
    allLaps = document.querySelectorAll('#laps li');
    allLaps.forEach((li) => {
        li.remove();
    })
}
reset.addEventListener('click', resetTimer)