const cards = document.querySelectorAll(".memory-card");

let wasCardTurned = false;
let stopCards = false;
let firstCard, secondCard;


var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
let timer = setInterval(setTime, 1000);

function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}



// Check if player won
function checkIfWon() {
    let turned = document.getElementsByClassName("turn");
    //  console.log(turned.length);
    if (turned.length == 16) {
        //player won
        clearInterval(timer);
        let myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
        myModal.show();
        document.getElementById("endMin").innerHTML = pad(
            parseInt(totalSeconds / 60)
        );
        document.getElementById("endSec").innerHTML = pad(totalSeconds % 60);
    }
}

function turnCard() {
    if (stopCards) return;
    if (this === firstCard) return;

    this.classList.add("turn");

    if (!wasCardTurned) {
        // first click
        wasCardTurned = true;
        firstCard = this;

        return;
    }

    // console.log(document.sele)
    // second click
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unturnCard();
    
    if (isMatch) checkIfWon();
}

function disableCards() {
    firstCard.removeEventListener("click", turnCard);
    secondCard.removeEventListener("click", turnCard);

    resetBoard();
}

function unturnCard() {
    stopCards = true;

    setTimeout(() => {
        firstCard.classList.remove("turn");
        secondCard.classList.remove("turn");

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [wasCardTurned, stopCards] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener("click", turnCard));