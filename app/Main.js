import { Game } from "./Game.js";

class Main
{
    constructor({coverLayerWrapper, cardsArray})
    {
        this.coverLayerWrapper = Array.from(coverLayerWrapper);
        this.cardsArray = Array.from(cardsArray);        
    };
    
    loadGame()
    {        
        this.coverLayerWrapper.forEach(coverLayer => {
            coverLayer.addEventListener("click", () =>{
                    coverLayer.classList.remove("visible");                    
            })
        });
        
        this.game = new Game(100, this.cardsArray);                    
                    this.game.startGame();                    
    };
};

const main = new Main({
    coverLayerWrapper: document.getElementsByClassName("cover-layer"),
    cardsArray: document.getElementsByClassName("card")
});
main.loadGame();