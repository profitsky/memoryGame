import { AudioController } from "./AudioController.js"
export class Game{

    constructor(totalTime, cardsArray){

        this.totalTime = totalTime;
        this.cardsArray = cardsArray;
        this.audioController = new AudioController();        
        this.flipMeter = document.getElementById("flips");
        this.totalClicks = 0;
        this.checkedCards = [];        
        this.blockDeck = true;
        this.cardForCheck = null;
      
    };

    shuffleCards() {
        for (let i = this.cardsArray.length - 1; i > 0; i--) {
            let randIndex = Math.floor(Math.random() * (i + 1));
            this.cardsArray[randIndex].style.order = i;
            this.cardsArray[i].style.order = randIndex;
        };
    };

    

    flipCard(card)
    {
        if(this.canFlip(card))
            card.classList.add("visible");

            if(this.cardForCheck)
            {
                this.checkCardProperties(card);
            } else
            {
                this.cardForCheck = card;
            }
    };

    canFlip(card) {
        return !this.blockDeck && !this.checkedCards.includes(card) && card !== this.cardForCheck;
    }

    

    getCardPropery(card)
    {
         return card.getElementsByClassName('card-value')[0].src;
    }

    checkCardProperties(card)
    {
        if(this.getCardPropery(card) === this.getCardPropery(this.cardForCheck))
        {
            this.cardMatch(card, this.cardForCheck);
        } else
        {
            this.cardMismatch(card, this.cardForCheck);
        };
        this.cardForCheck = null;
    };

    cardMatch(card1, card2)
    {
        this.checkedCards.push(card1);
        this.checkedCards.push(card2);
        card1.classList.add("matched");
        card2.classList.add("matched");
    }

    cardMismatch(card1, card2)
    {
        card1.classList.remove("visible");
        card2.classList.remove("visible");
        this.blockDeck = false;
    }


    

   

   



    startGame(){
        console.log(null);

        this.shuffleCards();
        this.audioController.startMusic();      
       
        this.cardsArray.forEach(card => {
            card.addEventListener("click", () => {
                this.flipCard(card);
            });            
        });

    };
};