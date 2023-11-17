console.log("I am working");
// DOM variables
const timerEl = document.querySelector("#timeLeft");
const gamesWon = document.querySelector("#wins");
const gamesLost = document.querySelector("#losses");
const word = document.querySelector("#word");
const startBtn = document.querySelector("button");
const resultP = document.querySelector("#result");
//other variables
let timerId;
let secondsLeft;
let gameActive = false;
let charToMatch = "";
let wins = 0;
let losses = 0;
let gameNumber = 0;
let matcher = [];

const possibleWordsArr = ["excited", "vibrant", "amazing", "dynamic", "curious", "success", "sensual", "radiant", "kinetic", "stringy"];

function startTimer() {
    timerId = setInterval(function() {
        if(secondsLeft > 0) {
            secondsLeft--;
            timerEl.textContent = secondsLeft;
        } else {
            losses++;
            gamesLost.textContent = `LOSSES: ${losses}`;
            resultP.textContent = "Time's up- please try again";
            endGame();
        }
    }, 1000)
}
function startGame() {
    if(gameActive) {
        return;
    }
    clearInterval(timerId);
    timerId = null;
    secondsLeft = 30;
    gameActive = true;
    startTimer();
    // correctWordArr = ["e", "x", "c", "i", "t", "e", "d"]
    correctWordArr = possibleWordsArr[gameNumber].split('');
    gameNumber++;
    matcher = `${correctWordArr[0]} ${correctWordArr[1]} ${correctWordArr[2]} ${correctWordArr[3]} ${correctWordArr[4]} ${correctWordArr[5]} ${correctWordArr[6]}`;
}
function endGame() {
    clearInterval(timerId);
    // timerId = null;
    gameActive = false;
    for(let i = 0; i < 7; i++) {
        document.querySelector(`#L${i}`).textContent = "_";
    }
    console.log("game is over");
}
function letterChooser(e) {
    if(!gameActive) {
        return;
    }
    for(let i = 0; i < correctWordArr.length; i ++) {
        if(e.key === correctWordArr[i]) {
            document.querySelector(`#L${i}`).textContent = correctWordArr[i]; 
        }
    }
 
    if(word.textContent === matcher) {
        userWins();
    }
    console.log(word.textContent);
}
function userWins() {
    wins++;
    gamesWon.textContent = `WINS: ${wins}`;
    resultP.textContent = `You win! You guessed the word with ${secondsLeft} seconds remaining!`
    endGame();
}
// event listeners
startBtn.addEventListener("click", startGame);

window.addEventListener("keydown", letterChooser);