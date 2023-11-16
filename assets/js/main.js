console.log("I am working");
// DOM variables
const timerEl = document.querySelector("#timeLeft");
const gamesWon = document.querySelector("#wins");
const gamesLost = document.querySelector("#losses");
const word = document.querySelector("#word");
const startBtn = document.querySelector("button");
//other variables
let timerId;
let secondsLeft = 30


function startTimer() {
    timerId = setInterval(function() {
        if(secondsLeft > 0) {
            secondsLeft--;
            timerEl.textContent = secondsLeft;
        } else {
            clearInterval(timerId);
            timerId = null;
            endGame();
        }
    }, 1000)
}
function startGame() {
    startTimer();
}
function endGame() {
    console.log("game is over");
}

startBtn.addEventListener("click", startGame);