export class AudioController{

    constructor() {
        this.bgMusic = new Audio("./audio/bgmelody.mp3");
        this.flipSound = new Audio("./audio/flip.mp3");
 
    }
    startMusic() {
        this.bgMusic.play();
    }

    flip() {
        this.flipSound.play();
    }
    match() {
        this.matchSound.play();
    }
  
    

};