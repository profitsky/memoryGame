import "../src/sass/main.scss";
import { Game } from "./app/Game.js";

class Main
{
    constructor({coverLayerWrapper, cardsArray})
    {
        this.coverLayerWrapper = Array.from(coverLayerWrapper);
        this.cardsArray = Array.from(cardsArray);
        this.game = new Game(100, this.cardsArray);
        this.gameFired = false;                
    }; 
    
    startGameFiredOnce(){
        if(this.gameFired === false){
            this.game.startGame();
            this.gameFired = true;
        } else{
             this.gameFired = false;
        }        
    };
    
    loadGame()
    {               
        this.coverLayerWrapper.forEach(coverLayer => {
            coverLayer.addEventListener("click", () =>{
                    coverLayer.classList.remove("visible");
                    this.startGameFiredOnce();                                      
           })
        });                                 
    };
};

const main = new Main({
    coverLayerWrapper: document.getElementsByClassName("cover-layer"),
    cardsArray: document.getElementsByClassName("card")
});
main.loadGame();
