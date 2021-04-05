let Waterballs = [];
//timer
let currentFactor, prevFactor;
let timeInterval = 1000;
function setup() {
    createCanvas(500, 500);
    for (let i = 0; i < 3; i++) {
        Waterballs[i] = new Waterball((i * 150) + 100, height / 2, random(100, 300));
    }
    currentFactor = 0;
    prevFactor = 0;
}
function draw() {
    background(220);
    currentFactor = millis() % timeInterval;
    if (currentFactor < prevFactor) { // pass a interval
        let lastWBposX = Waterballs[Waterballs.length - 1].posX;
        Waterballs.push(new Waterball(lastWBposX + 150, height / 2, random(100, 300)));
    }
    Waterballs.forEach(wBall => {
        wBall.show();
    })
    prevFactor = currentFactor;
}
class Waterball {
    constructor(_x, _y, _ballSize) {
        this.posX = _x;
        this.posY = _y;
        this.ballSize = _ballSize;
        this.fillColor = color(255, 0, 0);
    }
    show() {
        noStroke();
        fill(this.fillColor);
        ellipse(this.posX, this.posY, this.ballSize);
        fill(0);
        ellipse(this.posX, this.posY, 10);
    }
}
function mouseWheel(event) {
    console.log(event);
    event.stopPropagation();
    Waterballs.forEach(wBall => {
        wBall.posX += event.delta;
    })
}