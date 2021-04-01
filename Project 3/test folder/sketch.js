let baseURL = "https://api.particle.io/v1/devices/300044001847393035313137/";
let token = "?access_token=4ad5c7d03d2dc76b3a8887b23761022d1118fb7b";
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
let ballSize = 100;
let ballX = 100;
function setup() {
    createCanvas(1000, screen.height);
    for (let i = 0; i < 8; i++) {
        Waterballs[i] = new Waterball(ballX + i * 150, height/2, ballSize, 0);
            if (ballX + i * 150 > 900) {
                ballX = ballX - 300
            }
            print(ballX);
    }
    currentFactor = 0;
    prevFactor = 0;
}

function draw() {
    background(56, 132, 207);
    for (let i = 0; i < Waterballs.length; i++) {
        Waterballs[i].show();
        Waterballs[i].rollover();
    }
    currentFactor = millis() % timeInterval;
    if (currentFactor < prevFactor) { // pass a interval
        if (whichParam == 1) {
            loadJSON(data1URL, dataHandle, errorHandle);
        }
        else {
            loadJSON(data2URL, dataHandle, errorHandle);
        }
        whichParam++;
        if (whichParam == (numberOfParams + 1)) whichParam = 1;
    }
    prevFactor = currentFactor;
}

function errorHandle(Error) {
    console.log("Error has occured: " + Error);
}

function dataHandle(JSONdata) {
    console.log(JSONdata);
    if (JSONdata.name === "rain") { //
        b = map(parseInt(JSONdata.result), 4096, 0, 100, 200);
    }
    else if (JSONdata.name === "color") {
        ballSize = map(parseInt(JSONdata.result), 0, 4096, 100, 300);
    }
}

//waterball attributes
class Waterball {
    constructor(ballX, ballY, ballSize, opaci) {
        this.ballX = ballX;
        this.ballY = ballY;
        //this.ballSize = ballSize;
        this.opaci = opaci;
    }

    show() {
        noStroke();
        fill(212, 241, 249);
        ellipse(this.ballX, this.ballY, ballSize);
        textSize(16);
        textAlign(CENTER, CENTER);
        fill(0, this.opaci);
    }

    // clicked() {
    //     let d = dist(mouseX, mouseY, this.ballX, this.ballY);
    //     if (d < ballSize / 2) {
    //         this.opaci = 360;
    //     }

    // }

    rollover() {
        let d = dist(mouseX, mouseY, this.ballX, this.ballY);
        if (d < ballSize / 2) {
            fill(0);
            textAlign(CENTER, CENTER);
            text(ballSize, this.ballX, this.ballY);
            if (ballSize < 600) {
                text('not much water', this.ballX, this.ballY - 30);
            }
            else if (ballSize > 600 && ballSize < 700) {
                text('medium amount of water', this.ballX, this.ballY - 30);
            }
            else if (ballSize > 700 && ballSize < 800) {
                text('lots of water', this.ballX, this.ballY - 30);
            }
        }
    }
}