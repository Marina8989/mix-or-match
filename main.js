document.addEventListener('DOMContentLoaded', () => {
    //define an array of obj with images and name key value pairs
    const cardArray = [
       {
           name: 'blue',
           img: 'img/blue.jpg'
       },
        {
            name: 'green',
            img: 'img/green.jpg'
        },
        {
            name: 'orange',
            img: 'img/orange.jpg'
        },
        {
            name: 'purple',
            img: 'img/purple.jpg'
        },
        {
            name: 'red',
            img: 'img/red.jpg'
        },
        {
            name: 'yellow',
            img: 'img/yellow.jpg'
        },
        {
            name: 'blue',
            img: 'img/blue.jpg'
        },
        {
            name: 'green',
            img: 'img/green.jpg'
        },
        {
            name: 'orange',
            img: 'img/orange.jpg'
        },
        {
            name: 'purple',
            img: 'img/purple.jpg'
        },
        {
            name: 'red',
            img: 'img/red.jpg'
        },
        {
            name: 'yellow',
            img: 'img/yellow.jpg'
        }
    ]

 //randomize the images each time the page loads
 cardArray.sort( () => 0.5 - Math.random());

   const grid = document.querySelector('.grid');
   const resultDisplay = document.querySelector('#result');

   // keep track of cards
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    // create board and elements, attach them to grid
    function createBoard() {
        for(let i = 0; i < cardArray.length; i++) {
           let card = document.createElement('img');
           card.setAttribute('src', 'img/cover.jpg');
           card.setAttribute('data-id', i);
           card.style.width = '150px';
           card.style.height = '200px';
           card.addEventListener('click', flipCard);
           grid.appendChild(card);
        }
    }

    //check for matches
    function checkForMatch() {
        let cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        if(optionOneId == optionTwoId) {
         cards[optionOneId].setAttribute('src', 'img/cover.jpg');
         cards[optionTwoId].setAttribute('src', 'img/cover.jpg');
         alert('You have clicked the same image!');
        }else if(cardsChosen[0] === cardsChosen[1]) {
            // alert('You found a match!');
            cards[optionOneId].setAttribute('src', 'img/done.jpg');
            cards[optionTwoId].setAttribute('src', 'img/done.jpg');
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        }else {
            cards[optionOneId].setAttribute('src', 'img/cover.jpg');
            cards[optionTwoId].setAttribute('src', 'img/cover.jpg');
            // alert('Sorry, try again');
        }
        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;
         if(cardsWon.length === cardArray.length/2) {
           resultDisplay.textContent = 'You found them all!';
         }
    }



     //flip card
    function flipCard() {
      let cardId = this.getAttribute('data-id');
      cardsChosen.push(cardArray[cardId].name);
      cardsChosenId.push(cardId);
      this.setAttribute('src', cardArray[cardId].img)
       if(cardsChosenId.length === 2) {
          setTimeout(checkForMatch, 500);
       }
    }
    
   createBoard();
})