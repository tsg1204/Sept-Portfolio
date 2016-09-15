
var wordlist = ["Albani", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", 
                "Czech Republic", "Denmark", "Estonia", "Faroe Islands", "Finland", "France", "Georgia", "Germany", 
                "Gibraltar", "Greece", "Guernsey", "Hungary", "Iceland", "Ireland", "Isle of Man", "Italy", "Jersey", 
                "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Malta", "Moldova", "Monaco", 
                "Montenegro", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", 
                "Slovakia", "Slovenia", "Spain", "Svalbard and Jan Mayen", "Sweden", "Switzerland", "Ukraine", "United Kingdom", 
                "Vatican City"];
var targetWord = '';
var guesses = [];
var maxLives = 6;
var wins = 0;
var gameOver = false;


function newWord() {
    targetWord = wordlist[Math.floor(Math.random() * wordlist.length)];
}

function guessWord() {
    var gWord = '';

    for (var i = 0; i < targetWord.length; i++) {
        if (guesses.indexOf(targetWord[i].toLowerCase(), 0) == -1) {
            gWord += ' _ ';
        } else {
            gWord += targetWord[i];
        }
    }
    return gWord;

}

function drawWord() {   
    while (targetWord == '') {
        newWord();
    }

    var html = "<p>Current word: </p>" + guessWord();

    document.getElementById("target-word").innerHTML = html;
}

function drawGuesses() {
    guesses.sort();
    document.getElementById('previous-guesses').innerHTML = guesses.join(', ');
}

function addGuess() {
    var temp = '';

        temp =  String.fromCharCode(event.keyCode).toLowerCase();;
        guesses.push(temp);
}

function endGame(isWinner) {
    if (isWinner) {
        document.querySelector('#won').innerHTML = "You won! Congratulations! :)";
    } else {
       document.querySelector('#won').innerHTML = "You lost! Sorry! Try again! :(";
    }
    setTimeout(function () {
        location.reload()
    }, 3000);
}

function reviewLives() {
    var livesRemaining = maxLives,
            string = targetWord.toLowerCase();

    for (var i = 0; i < guesses.length; i++) {
        if (string.indexOf(guesses[i], 0) == -1) {
            livesRemaining--;

        }
    }
    switch(livesRemaining) {
        case 0: document.getElementById("hang-img").className = "live6";
                break;
        case 1: document.getElementById("hang-img").className = "live5";
                break;
        case 2: document.getElementById("hang-img").className = "live4";
                break;
        case 3: document.getElementById("hang-img").className = "live3";
                break;
        case 4: document.getElementById("hang-img").className = "live2";
                break;
        case 5: document.getElementById("hang-img").className = "live1";
                break;
        case 6: document.getElementById("hang-img").className = "alive";
    }

    document.querySelector('#lives-left').innerHTML = "Number of guesses remaining: " + livesRemaining;

    if (livesRemaining <= 0) {
        //image  to alive
        document.getElementById("hang-img").className = "live6";
        document.getElementById('lost-sound').play();
        endGame(false);
        return;
    }
}

function checkIfWon() {
    if (guessWord() == targetWord) {
        document.getElementById('win-sound').play();
        wins++;
        endGame(true);
    }
}

function resetGame() {
    //image to alive;
    document.getElementById("hang-img").className = "alive";
    document.querySelector('#wins').innerHTML = "Wins: " + wins;
    document.querySelector('#won').innerHTML = "";
    targetWord = '';
    guesses = [];
    newWord();
}

function update() {
    addGuess();
    drawWord();
    drawGuesses();
    reviewLives();
    checkIfWon();
    document.querySelector('#wins').innerHTML = "Wins: " + wins; 
}

document.onkeyup = function(event) {
    update();
}

window.onload = function(event) {
    drawWord();
}

