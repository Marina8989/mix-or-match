
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
      

     const grid = document.querySelector(".grid");
     const resultDisplay = document.querySelector("#result");
     const restartBtn = document.createElement("button");
     const timer = document.createElement('h4');
     const h3 = document.querySelector('h3');
     
     restartBtn.textContent = "Restart";

     //randomize the images each time the page loads
     cardArray.sort(() => 0.5 - Math.random());

     // keep track of cards
     let cardsChosen = [];
     let cardsChosenId = [];
     let cardsWon = [];
     
    function itemAttr(item, index) {
      item.setAttribute("src", "img/cover.jpg");
      item.setAttribute("data-id", index);
      item.style.width = "150px";
      item.style.height = "200px";
      item.addEventListener("click", flipCard);

   let count = 10;
   timer.textContent = `Timer: ${count}`;
    h3.append(timer);
     let x = setInterval(() => {
         timer.textContent = `Timer: ${count--}`;
          console.log(count);
          if(count === 0){
              console.log('less than 0');
              clearInterval(x);
             timer.textContent = `Time's UP! Try again!`;
              
                 setTimeout(() => {
                     item.setAttribute("src", "img/cover.jpg");
                     item.setAttribute("data-id", index);
                     item.style.width = "150px";
                     item.style.height = "200px";
                     item.addEventListener("click", flipCard);

                     cardArray.sort(() => 0.5 - Math.random());
                     cardsWon = [];
                     itemAttr(item, index);
                 }, 3000);
          }
      }, 1000);

    }

     // create board and elements, attach them to grid
     function createBoard() {
       for (let i = 0; i < cardArray.length; i++) {
         let card = document.createElement("img");
         itemAttr(card, i);

         //restart everything
         restartBtn.addEventListener("click", function () {
           cardsWon = [];
           cardArray.sort(() => 0.5 - Math.random());
           itemAttr(card, i);
         });
     
         grid.appendChild(card);
       } 
     }

     //check for matches
     function checkForMatch() {
       let cards = document.querySelectorAll("img");
       const optionOneId = cardsChosenId[0];
       const optionTwoId = cardsChosenId[1];

       if (optionOneId == optionTwoId) {
         cards[optionOneId].setAttribute("src", "img/cover.jpg");
         cards[optionTwoId].setAttribute("src", "img/cover.jpg");
         alert("You have clicked the same image!");
       } else if (cardsChosen[0] === cardsChosen[1]) {
         // alert('You found a match!');
         cards[optionOneId].setAttribute("src", "img/done.jpg");
         cards[optionTwoId].setAttribute("src", "img/done.jpg");
         cards[optionOneId].removeEventListener("click", flipCard);
         cards[optionTwoId].removeEventListener("click", flipCard);
         cardsWon.push(cardsChosen);
       } else {
         cards[optionOneId].setAttribute("src", "img/cover.jpg");
         cards[optionTwoId].setAttribute("src", "img/cover.jpg");
       }
       cardsChosen = [];
       cardsChosenId = [];
       resultDisplay.textContent = cardsWon.length;
       if (cardsWon.length === cardArray.length / 2) {
         resultDisplay.textContent = "You found them all!";
       }
     }

     //flip card
     function flipCard() {
       let cardId = this.getAttribute("data-id");
       cardsChosen.push(cardArray[cardId].name);
       cardsChosenId.push(cardId);
       this.setAttribute("src", cardArray[cardId].img);
       if (cardsChosenId.length === 2) {
         setTimeout(checkForMatch, 500);
       }
     }
      createBoard();
     document.body.append(restartBtn);
})

    
    