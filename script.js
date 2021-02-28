const cards = document.querySelectorAll('.memory-card');

let cardWasTurned = false;
let firstCard, secondCard;

function turnCard() {
  this.classList.toggle("turn");

  if (!cardWasTurned) {
    cardWasTurned = true;
    firstCard = this;
      } else  {
          cardWasTurned = false;
    secondCard = this; 
 

      if (firstCard.dataset.framework === secondCard.dataset.framework) {
     firstCard.removeEventListener('click', turnCard);
  secondCard.removeEventListener('click', turnCard);
      }else{
          setTimeout(() => {
    firstCard.classList.remove('turn');
    secondCard.classList.remove('turn');

    resetBoard();
  }, 1500);
      }


 
      }
  }


cards.forEach(card => card.addEventListener('click', turnCard));