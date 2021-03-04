const cards = document.querySelectorAll('.memory-card');

let wasCardTurned = false;
let stopCards = false;
let firstCard, secondCard;

function turnCard() {
  if (stopCards) return;
  if (this === firstCard) return;

  this.classList.add('turn');

  if (!wasCardTurned) {
    // first click
    wasCardTurned = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unturnCard();
}

function disableCards() {
  firstCard.removeEventListener('click', turnCard);
  secondCard.removeEventListener('click', turnCard);

  resetBoard();
}

function unturnCard() {
  stopCards = true;

  setTimeout(() => {
    firstCard.classList.remove('turn');
    secondCard.classList.remove('turn');

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

cards.forEach(card => card.addEventListener('click', turnCard));