const cards = document.querySelectorAll('.memory-card');

let wasCardTurned = false;
let stopCards = false;
let firstCard, secondCard;

function flipCard() {
  if (stopCards) return;

  this.classList.add('turn');

  if (!wasCardTurned) {
    // first click
    wasCardTurned = true;
    firstCard = this;

    return;
  }

  // second click
  wasCardTurned = false;
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unturnCards();
}

function disableCards() {
  firstCard.removeEventListener('click', turnCards);
  secondCard.removeEventListener('click', turnCards);
}

function unturnCards() {
  stopCards = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    stopCards = false;
  }, 1500);
}

cards.forEach(card => card.addEventListener('click', turnCards));