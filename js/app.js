let $btnRock;
let $btnPaper;
let $btnScissors;
let $resultBox;
let $resultText;
let $resultIcon;
let $userChoice;
let $winner;
let $gameFlag = true;
let winSound = new Audio('../sounds/cash.mp3');
let botSound = new Audio('../sounds/swish.m4a');
let loseSound = new Audio('../sounds/aww.mp3');


let gameStatus = {
    'user': {
        scoreDisplay: document.querySelector('#my-score'),
        score: 0
    },
    'bot': { scoreDisplay: document.querySelector('#bot-score'), score: 0 }
}


function prepareDomElements() {
    $btnRock = document.querySelector('.rock');
    $btnPaper = document.querySelector('.paper');
    $btnScissors = document.querySelector('.scissors');

    $resultBox = document.querySelector('.result-box')
    $resultIcon = $resultBox.querySelector('.icon');
    $resultText = $resultBox.querySelector('.result')
}

function prepareDomEvent() {
    $btnPaper.addEventListener('click', startRound);
    $btnRock.addEventListener('click', startRound);
    $btnScissors.addEventListener('click', startRound);
}

function startRound(e) {
    if ($gameFlag) {
        $userChoice = e.target.closest('button');
        $userChoice.classList.add('selected')
        let user = $userChoice.classList[1];
        let bot = botTurn();
        $gameFlag = false;

        if (user === 'paper' && bot == 'rock') {
            userWins();
        } else if (user === 'paper' && bot === 'scissors') {
            botWins();
        } else if (user === 'rock' && bot === 'scissors') {
            userWins();
        } else if (user === 'rock' && bot === 'paper') {
            botWins();
        } else if (user === 'scissors' && bot === 'paper') {
            userWins();
        } else if (user === 'scissors' && bot === 'rock') {
            botWins();
        } else {
            draw();
        }
    }
}


function userWins() {
    $resultBox.classList.add('win');
    $resultBox.classList.remove('hide');
    $resultText.textContent = 'you win';
    $resultIcon.innerHTML = '<i class="fas fa-check"></i>';

    setTimeout(() => {
        winSound.play();
    }, 1000);

    setTimeout(() => {
        $resultBox.classList.remove('win');
        $resultBox.classList.add('hide');
        gameStatus.user.scoreDisplay.innerText = ++gameStatus.user.score;
        $gameFlag = true;

    }, 2300);
}

function botWins() {
    $resultBox.classList.add('lose');
    $resultBox.classList.remove('hide');
    $resultText.textContent = 'you lose';
    $resultIcon.innerHTML = '<i class="fas fa-frown-open"></i>';

    setTimeout(() => {
        loseSound.play()
    }, 1000);


    setTimeout(() => {
        $resultBox.classList.remove('lose');
        $resultBox.classList.add('hide');
        gameStatus.bot.scoreDisplay.innerText = ++gameStatus.bot.score;
        $gameFlag = true;

    }, 2300);
}

function draw() {
    $resultBox.classList.add('draw');
    $resultBox.classList.remove('hide');
    $resultText.textContent = 'TIE';
    $resultIcon.innerHTML = '<i class="fas fa-handshake"></i>';

    setTimeout(() => {
        $resultBox.classList.remove('draw');
        $resultBox.classList.add('hide');
        gameStatus.bot.scoreDisplay.innerText = ++gameStatus.bot.score;
        gameStatus.user.scoreDisplay.innerText = ++gameStatus.user.score;
        $gameFlag = true;
    }, 2300);
}





function botTurn() {
    let choices = ['rock', 'paper', 'scissors'];
    let randomIndex = Math.floor(Math.random() * 3);

    let enemyBox = document.querySelector('.enemy-box');
    let enemyIcon = document.querySelector('#enemyIcon');

    let enemyIconValue = `<i class="fas fa-hand-${choices[randomIndex]} enemy-icon"></i>`

    enemyBox.classList.add('enemy-move');
    enemyIcon.innerHTML = enemyIconValue;

    botSound.play();
    setTimeout(() => {
        enemyBox.classList.remove('enemy-move');
        $userChoice.classList.remove('selected');
    }, 2300);

    return choices[randomIndex];
}

function main() {
    prepareDomElements();
    prepareDomEvent();
}



window.addEventListener('DOMContentLoaded', main)