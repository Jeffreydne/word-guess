console.log("I am working");
// DOM variables
const timerEl = document.querySelector("#timeLeft");
const gamesWon = document.querySelector("#wins");
const gamesLost = document.querySelector("#losses");
const word = document.querySelector("#word");
const startBtn = document.querySelector("button");
const resultP = document.querySelector("#result");
const gameScore = document.querySelector("#gameScore");
//other variables
let timerId;
let secondsLeft;
let gameActive = false;
let charToMatch = "";
let wins = 0;
let losses = 0;
let gameNumber = 0;
let matcher = [];
// Set wins and losses to 0 in event storage if they don't already exist
if(!localStorage.getItem("userLosses")) {
    localStorage.setItem("userLosses", "LOSSES: 0");
}
if(!localStorage.getItem("userWins")) {
    localStorage.setItem("userWins", "WINS: 0");
}
//use local storage to put the number of wins and losses into the DOM
gamesWon.textContent = localStorage.getItem("userWins");
gamesLost.textContent = localStorage.getItem("userLosses");

// array of 10 7-letter words
const possibleWordsArr = ["excited", "vibrant", "amazing", "dynamic", "curious", "success", "sensual", "radiant", "kinetic", "stringy"];

//start timer function called by start game fxn below.  This sets up the clock, feeds the time into the DOM and if secondsLeft === 0 will add one loss to the score and call endGame fxn 
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
    // start game fxn called by start button event listener (at bottom). If game is already underway then nothing happens (game continues)
    if(gameActive) {
        return;
    } 
    // set text content for user wins and losses (needed when user playing more than one game)
        gamesWon.textContent = localStorage.getItem("userWins");
  
        gamesLost.textContent = localStorage.getItem("userLosses");
 //reset timer & set gameAcitve to ture, then  call startTimer fxn
    clearInterval(timerId);
    timerId = null;
    secondsLeft = 30;
    gameActive = true;
    startTimer();
  // choose word to guess from the array of possible word based on number of games the user has already played, and turn that word into an array of letters that make up the word using .split(''). Then increment gameNumber
    correctWordArr = possibleWordsArr[gameNumber].split('');
    gameNumber++;
//matcher is a string with spaces between each of the correct letters to match the dom (ie the array ["e", "x", "c", "i", "t", "e", "d"] will become the string "e x c i t e d")
    matcher = `${correctWordArr[0]} ${correctWordArr[1]} ${correctWordArr[2]} ${correctWordArr[3]} ${correctWordArr[4]} ${correctWordArr[5]} ${correctWordArr[6]}`;
}
//end game is called if the user gets the word or if time runs out. It sets the number of user wins and losses in local storage and resets the timer. It also resets the DOM to 7 underscores to replace whatever letters the user had chosen during the game. gameActive also set to false
function endGame() {
    localStorage.setItem("userWins", gamesWon.textContent);
    localStorage.setItem("userLosses", gamesLost.textContent);
    clearInterval(timerId);
    timerId = null;
    gameActive = false;
    for(let i = 0; i < 7; i++) {
        document.querySelector(`#L${i}`).textContent = "_";
    }
}
//a keyboard press calls the letterChooser fxn using event listener below. If the game is not active nothing happens (prevents user from populating the DOM before clock has started). A for loop is used so that any keydown will be checked against all 7 letters in the active word and if that letter matches then it is fed into the DOM at the correct location so that the user knows they have guessed correctly. 
function letterChooser(e) {
    if(!gameActive) {
        return;
    }
    for(let i = 0; i < correctWordArr.length; i ++) {
        if(e.key === correctWordArr[i]) {
            document.querySelector(`#L${i}`).textContent = correctWordArr[i]; 
        }
    }
 //if the user has guessed all 7 letters then userWins fxn is called
    if(word.textContent === matcher) {
        userWins();
    }
}
// userWins fxn inrements wins and fills new infor into DOM and lets user know they won, then calls endGame fxn
function userWins() {
    wins++;
    gamesWon.textContent = `WINS: ${wins}`;
    resultP.textContent = `You win! You guessed the word with ${secondsLeft} seconds remaining!`
    endGame();
}
// event listeners
startBtn.addEventListener("click", startGame);

window.addEventListener("keydown", letterChooser);