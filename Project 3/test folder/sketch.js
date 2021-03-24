let Waterballs = [];

function setup() {
    //createCanvas(screen.width, screen.height);
    createCanvas(screen.width, screen.height);
    //colorMode(HSB, 100);
    int ;n = width/200;
    for (let i = 0; i < n; i++) {
        Waterballs[i] = new Waterball(100 + i * 200, height/2, 100, 0);
    }
    //print(Waterball.ballX, Waterball.ballY);
    print(n);
  }
  
function draw(){
    background(255);
    for (let i = 0; i < Waterballs.length; i++){
        Waterballs[i].show();
    }
}

function mousePressed() {
    for (let i = 0; i < Waterballs.length; i++){
        Waterballs[i].clicked();
    }
}

//waterball attributes
class Waterball {
    constructor(ballX, ballY, ballSize, opaci) {
        this.ballX = ballX;
        this.ballY = ballY;
        this.ballSize = ballSize;
        this.opaci = opaci;
    }

    show() {
        noStroke();
        fill(237, 100, 65);
        ellipse(this.ballX, this.ballY, this.ballSize);
        textSize(16);
        textAlign(CENTER, CENTER);
        fill(0, this.opaci);
        text(this.ballSize, this.ballX, this.ballY);
    }

    clicked() {
        let d = dist(mouseX, mouseY, this.ballX, this.ballY);
        if (d < this.ballSize/2) {
            this.opaci = 360;
        }

    }

    
}