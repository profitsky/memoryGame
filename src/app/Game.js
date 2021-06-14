import { AudioController } from "./AudioController.js"
export class Game{
    

    constructor(totalTime, cardsArray){

        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.cardsArray = cardsArray;
        this.audioController = new AudioController();        
        this.flipMeter = document.getElementById("flips");
        this.timer = document.getElementById("time-remaining");      
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
        if(!this.blockDeck && !this.checkedCards.includes(card) && card !== this.cardForCheck){
        card.classList.add("visible");
        this.audioController.flip();
        this.flipMeter.innerText = ++this.totalClicks;

        if(this.cardForCheck) {
           this.checkCardsProperties(card)          
        } else {
             this.cardForCheck = card };
        };              
    };   

    checkCardsProperties(card)
    {
        if(this.getCardProperties(this.cardForCheck) === this.getCardProperties(card)) {      
            this.cardMatch(this.cardForCheck, card);                     
        } else {
            this.misMatch(this.cardForCheck, card);
        }
        this.cardForCheck = null;
    };

    getCardProperties(card)
    {
        return card.getElementsByClassName("card-image")[0].src;
    };

    cardMatch(card1, card2)
    {                
        this.checkedCards.push(card1);
        this.checkedCards.push(card2);
        card1.classList.add("matched");
        card2.classList.add("matched");
        this.audioController.match();
        if(this.checkedCards.length === this.cardsArray.length)
        {
            this.winGame();
        }      
    };

    misMatch(card1, card2)
    {
        this.blockDeck = true;
        setTimeout(() => {
            card1.classList.remove("visible");
            card2.classList.remove("visible");
            this.blockDeck = false;
        }, 1000);
    };

    winGame()
    {    
        clearInterval(this.countdown);    
        this.audioController.victory();
        setTimeout(() =>
        {
            this.restartCards();
        },500);
        document.getElementById("victory-text").classList.add("visible");
        document.querySelector(".mask").classList.add("visible")
        document.getElementById("score-clicks").innerText = this.totalClicks;
        document.getElementById("score-time").innerText = (100- this.timeRemaining) + " s";
    };

    loseGame()
    {
        clearInterval(this.countdown);
        this.audioController. gameOver();
        document.getElementById("game-over-text").classList.add('visible');
        document.querySelector(".mask").classList.add("visible");
         setTimeout(() =>
        {
            this.restartCards();
        },500);
    };

    restartCards()
    {           
        this.cardsArray.forEach(card => {
        card.classList.remove("visible");
        card.classList.remove("matched");
        });
            
    };
    
    startCountDown()
    {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0){
            this.loseGame(); }            
        }, 1000);        
    }

    startGame(){
        clearInterval(this.countdown);
        this.blockDeck = true;          
        this.totalClicks = 0;
        this.checkedCards = [];       
        this.flipMeter.innerText = this.totalClicks;        
        this.timeRemaining = this.totalTime;        
        this.timer.innerText = this.timeRemaining;
        this.countdown = this.startCountDown();
        setTimeout(() => {
            this.shuffleCards();
            this.audioController.startMusic();
            this.blockDeck = false;                                
        }, 1000)        
       
        this.cardsArray.forEach(card => {
            card.addEventListener("click", () => {
                this.flipCard(card);
            });            
        });
    };
};