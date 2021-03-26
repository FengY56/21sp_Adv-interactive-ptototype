let baseURL = "https://api.particle.io/v1/devices/300044001847393035313137/";
let token = "?access_token=13a834cb8b030dc651af854c81a23ac39f251b03";
let param1 = "rain";
let param2 = "color";
let data1URL = baseURL + param1 + token; //for rainsensor
let data2URL = baseURL + param2 + token; //for potentiometer 1
let whichParam = 1;
let numberOfParams = 2; //number of sensors you have

let Waterballs = [];
//timer
let currentFactor, prevFactor;
let timeInterval = 1000;

function setup() {
    createCanvas(screen.width, screen.height);
    int ;n = 100;
    for (let i = 0; i < n; i++) {
        Waterballs[i] = new Waterball(100 + i * 200, height/2, 100, 0);
    }
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