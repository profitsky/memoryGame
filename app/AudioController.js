export class AudioController{

    constructor() {
        this.bgMusic = new Audio("./audio/bgmelody.mp3");
        this.flipSound = new Audio("./audio/flip.mp3");
        this.matchSound = new Audio("./audio/match.mp3");
        this.victorySound = new Audio("./audio/win.mp3");
        this.gameOverSound = new Audio("./audio/game_over.mp3");
        this.bgMusic.volume = 0.4;
        this.bgMusic.loop = true; 
    };

    startMusic(){
        this.bgMusic.play();
    };

    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    };

    flip(){
        this.flipSound.play();
    }
    match(){
        this.matchSound.play();
    }

    victory(){
        this.stopMusic();
        this.victorySound.play();        
    }

    gameOver(){
        this.stopMusic();
        this.gameOverSound.play();        
    }    

};