let baseURL = "https://api.particle.io/v1/devices/300044001847393035313137/";
let token = "?access_token=7fb03fee2cd7553e8dffbedb5bec2da66af6ea2c";
let param1 = "rain";
let param2 = "color";
let param3 = "vab";
let data1URL = baseURL + param1 + token; //for rainsensor
let data2URL = baseURL + param2 + token; //for potentiometer 1
let data3URL = baseURL + param3 + token;
let whichParam = 1;
let numberOfParams = 3; //number of sensors you have
let Waterballs = [];
let currentFactor, prevFactor;
let timeInterval = 1000;
let ballSize = 30;
let bSat = 50;
let bHue = 200;
let ballY = 500;
let wind = 0;

function setup() {
    createCanvas(1000, 1000);
    angleMode(DEGREES);
    for (let i = 0; i < 1; i++) {
        Waterballs[i] = new Waterball((i * 150) + 50, ballY, ballSize, 0, bHue, bSat, wind);
    }
    currentFactor = 0;
    prevFactor = 0;
    colorMode(HSB, 360, 100, 100, 10);
    rectMode(CENTER);
}

function draw() {
    background(219, 10, 100);
    currentFactor = millis() % timeInterval;
    if (currentFactor < prevFactor) {
        let lastWBx = Waterballs[Waterballs.length - 1].ballX;
        Waterballs.push(new Waterball(lastWBx + ballSize + 10, ballY, ballSize, 0, bHue, bSat, wind));
        if (whichParam == 1) {
            loadJSON(data1URL, dataHandle, errorHandle);
        }
        else if (whichParam == 2) {
            loadJSON(data2URL, dataHandle, errorHandle);
        }
        else if (whichParam == 3) {
            loadJSON(data3URL, dataHandle, errorHandle);
        }
        whichParam++;
        if (whichParam == (numberOfParams + 1)) whichParam = 1;
    }
    for (let i = 0; i < Waterballs.length; i++) {
        stroke(0);
        strokeWeight(5);
        strokeWeight(2);
        //if (i != 0) line(Waterballs[i].ballX, Waterballs[i].ballY + 450, Waterballs[i - 1].ballX, Waterballs[i - 1].ballY + 450);
        //d = dist(Waterballs[i].ballX, 500, Waterballs[i - 1].ballX, 500);
        if (i != 0) line(50 + i * 5, Waterballs[i].ballY + 450, 50 + (i - 1) * 5, Waterballs[i - 1].ballY + 450);
        noStroke();
    }

    for (let i = 0; i < Waterballs.length; i++) {
        stroke(bHue, bSat, 90);
        strokeWeight(2);
        if (i != 0) line(Waterballs[i].ballX, Waterballs[i].ballY, Waterballs[i - 1].ballX, Waterballs[i - 1].ballY);
        noStroke();
    }

    Waterballs.forEach(wBall => {
        wBall.show();
        wBall.rollover();
    })
    Waterballs.forEach(wBall => {
        wBall.show(true);
        wBall.rollover();
    })
    prevFactor = currentFactor;
}

function errorHandle(Error) {
    console.log("Error has occured: " + Error);
}

function dataHandle(JSONdata) {
    console.log(JSONdata);
    if (JSONdata.name === "rain") {
        ballSize = map(parseInt(JSONdata.result), 4096, 0, 30, 120);
    }
    else if (JSONdata.name === "color") {
        wind = map(parseInt(JSONdata.result), 0, 4096, 0, 360);
    }
    else if (JSONdata.name === "vab") {
        ballY = map(parseInt(JSONdata.result), 0, 4096, 500, 200);
    }
}

//waterball_2 attributes, 
class Waterball {
    constructor(ballX, ballY, ballSize, opaci, bHue, bSat, wind) {
        this.ballX = ballX;
        this.ballY = ballY;
        this.ballSize = ballSize;
        this.opaci = opaci;
        this.bSat = bSat;
        this.bHue = bHue;
        this.wind = wind;
    }

    show(staticY = false) {
        noStroke();
        //stroke(212, 100, 80);
        fill(0, this.opaci);
        textSize(16);
        textAlign(CENTER, CENTER);
        fill(this.bHue, this.bSat, 100);
        if (staticY) {
            push();
            translate(this.ballX, this.ballY);
            rotate(this.wind);
            ellipse(0, 0, 10, 10);
            fill(0);
            triangle(5, 5, 10, 0, 5, -5)
            pop();
        }
        else {
            ellipse(this.ballX, this.ballY, this.ballSize);
        }
    }

    rollover() {
        let d = dist(mouseX, mouseY, this.ballX, this.ballY);
        if (d < ballSize / 2) {
            noStroke();
            fill(0);
            textAlign(CENTER, CENTER);
            text(this.ballSize, this.ballX, this.ballY - 20);
            Date.now();
            if (this.ballSize < 60) {
                text('not much water', this.ballX, this.ballY - 40);
            }
            else if (this.ballSize > 60 && this.ballSize < 90) {
                text('medium amount of water', this.ballX, this.ballY - 40);
            }
            else if (this.ballSize > 90 && this.ballSize < 120) {
                text('lots of water', this.ballX, this.ballY - 40);
            }
            if (this.ballY > 400) {
                text('weak wind', this.ballX, this.ballY - 60);
            }
            else if (this.ballY < 400 && this.ballY > 300) {
                text('not so weak wind', this.ballX, this.ballY - 60);
            }
            else if (this.ballY < 300 && this.ballY > 200) {
                text('Strong wind! Better get your plants inside', this.ballX, this.ballY - 60)
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
    Waterballs_2.forEach(wBall => {
        wBall.ballX += event.delta;
    })
}