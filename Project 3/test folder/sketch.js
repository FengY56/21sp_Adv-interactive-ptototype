function setup() {
    createCanvas(screen.width, screen.height);
    Waterball = new Waterball(width/2, height/2, 100);
    print(Waterball.ballX, Waterball.ballY);
  }
  
function draw(){
    background(55, 5, 50);
    Waterball.show();
}

class Waterball {
    constructor(ballX, ballY, ballSize) {
        this.ballX = ballX;
        this.ballY = ballY;
        this.ballSize = ballSize;
    }

    show() {
        noStroke();
        fill(255);
        ellipse(this.ballX, this.ballY, this.ballSize);
    }
}