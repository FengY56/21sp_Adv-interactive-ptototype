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
let timeInterval = 5000;
let ballSize = 100;
function setup() {
    createCanvas(1000, 1000);
    for (let i = 0; i < 1; i++) {
        Waterballs[i] = new Waterball((i*150) + 100, height/2, ballSize, 0);
    }
    currentFactor = 0;
    prevFactor = 0;
    colorMode(HSB, 360, 100, 100, 10);
}

function draw() {
    background(219, 10, 100);
    currentFactor = millis() % timeInterval;
    if (currentFactor < prevFactor) {
        let lastWBx = Waterballs[Waterballs.length - 1].ballX;
        Waterballs.push(new Waterball(lastWBx + 300, height/2, ballSize));
        if (whichParam == 1) {
            loadJSON(data1URL, dataHandle, errorHandle);
        }
        else {
            loadJSON(data2URL, dataHandle, errorHandle);
        }
        whichParam++;
        if (whichParam == (numberOfParams + 1)) whichParam = 1;
    }
    Waterballs.forEach(wBall => {
        wBall.show();
        wBall.rollover();
    })
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
        ballSize = map(parseInt(JSONdata.result), 0, 4096, 100, 400);
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
        fill(0, this.opaci);
        textSize(16);
        textAlign(CENTER, CENTER);
        fill(212, 100, 100);
        ellipse(this.ballX, this.ballY, this.ballSize);
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
            if (ballSize < 200) {
                text('not much water', this.ballX, this.ballY - 30);
            }
            else if (ballSize > 200 && ballSize < 300) {
                text('medium amount of water', this.ballX, this.ballY - 30);
            }
            else if (ballSize > 300 && ballSize < 400) {
                text('lots of water', this.ballX, this.ballY - 30);
            }
        }
    }
}
function mouseWheel(event) {
    console.log(event);
    event.stopPropagation();
    Waterballs.forEach(wBall => {
        wBall.ballX += event.delta;
    })
} 