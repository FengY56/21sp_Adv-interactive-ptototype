let Waterballs = [];
//timer
let currentFactor, prevFactor;
let timeInterval = 1000;

function setup() {
    //createCanvas(screen.width, screen.height);
    createCanvas(screen.width, screen.height);
    //colorMode(HSB, 100);
    int ;n = 100;
    for (let i = 0; i < n; i++) {
        Waterballs[i] = new Waterball(100 + i * 200, height/2, 100, 0);
    }
    //print(Waterball.ballX, Waterball.ballY);
    currentFactor = 0;
    prevFactor = 0;
    print(n);
  }
  
function draw(){
    background(55);
    currentFactor = millis() % timeInterval;
    if (currentFactor < prevFactor){ // pass a interval
         for (let i = 0; i < Waterballs.length; i++){
            Waterballs[i].show();
            Waterballs[i].rollover();
        } 
    }
    prevFactor = currentFactor; 
    
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
        text('Water', this.ballX, this.ballY - 15);
        text(this.ballSize, this.ballX, this.ballY);
    }

    clicked() {
        let d = dist(mouseX, mouseY, this.ballX, this.ballY);
        if (d < this.ballSize/2) {
            this.opaci = 360;
        }

    }

    rollover() {
        let d = dist(mouseX, mouseY, this.ballX, this.ballY);
        if (d < this.ballSize/2) {
            fill(0);
            textAlign(CENTER, CENTER);
            text(this.ballSize, this.ballX, this.ballY);
        }
    }

    
}