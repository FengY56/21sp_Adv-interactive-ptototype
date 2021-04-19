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
let timeInterval = 2000;
let ballSize = 30;
let bSat = 50;
let bHue = 200;
let ballY = 500;
let wind = 0;
let particles = [];

let numBalls = 30;
let spring = 0.05;
let gravity = 0;
let friction = -0.2;
let balls = [];

function setup() {
    createCanvas(1000, 1000);

    for (let i = 0; i < numBalls; i++) {
        balls[i] = new Ball(
            random(width),
            random(height),
            random(30, 70),
            i,
            balls
        );
    }

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
    background(233, 30, 65);
    balls.forEach(ball => {
        ball.collide();
        ball.move();
        ball.display();
    });

    push();
    translate(500, 750);
    //rect
    fill(255);
    rect(0, 0, 400, 200, 40);
    fill(280, 34, 27);
    rect(100, 0, 200, 200, 0, 40, 40, 0);
    //title
    fill(0);
    textSize(32);
    text('Latest Waterball', 0, -120);
    textSize(16);
    //graph
    push();
    translate(-100, 0);
    rotate(wind);
    fill(bHue, bSat, 100);
    triangle(0, ballSize / 2, ballSize, 0, 0, ballSize / 2 * -1);
    ellipse(0, 0, ballSize);
    noFill();
    stroke(bHue, bSat, 100);
    ellipse(0, 0, ballSize + 10);
    pop();
    textAlign(LEFT);
    textStyle(NORMAL);
    fill(100, 33, 71);
    text('Wind direction:', 10, 40);
    if (wind < 45) {
        fill(0);
        textStyle(NORMAL);
        text('E', -105, 0);
        fill(100, 33, 71);
        textStyle(BOLD);
        text('EAST', 10, 60)
    }
    else if (wind > 315 && wind < 360) {
        fill(0);
        textStyle(NORMAL);
        text('E', -105, 0);
        fill(100, 33, 71);
        textStyle(BOLD);
        text('EAST', 10, 60)
    }
    else if (wind > 45 && wind < 135) {
        fill(0);
        textStyle(NORMAL);
        text('S', -105, 0);
        fill(100, 33, 71);
        textStyle(BOLD);
        text('SOUTH', 10, 60)
    }
    else if (wind > 135 && wind < 225) {
        fill(0);
        textStyle(NORMAL);
        text('W', -105, 0);
        fill(100, 33, 71);
        textStyle(BOLD);
        text('WEST', 10, 60)
    }
    else if (wind > 225 && wind < 315) {
        fill(0);
        textStyle(NORMAL);
        text('N', -105, 0);
        fill(100, 33, 71);
        textStyle(BOLD);
        text('NORTH', 10, 60)
    }

    //data
    textStyle(NORMAL);
    fill(100, 33, 71);
    text('Water Level:', 10, -80);//water level
    textStyle(BOLD);
    if (ballSize < 60) {
        fill(120, 50, 100);
        ellipse(110, -80, 10, 10);
        fill(100, 33, 71);
        text('NOT MUCH WATER', 10, -60);
    }
    else if (ballSize > 60 && this.ballSize < 90) {
        fill(60, 50, 100);
        ellipse(110, -80, 10, 10);
        fill(100, 33, 71);
        text('medium amount of water', 10, -60);
    }
    else if (ballSize > 90 && ballSize < 120) {
        fill(0, 50, 100);
        ellipse(110, -80, 10, 10);
        fill(100, 33, 71);
        text('lots of water', 10, -60);
    }
    fill(100, 33, 71);
    textStyle(NORMAL);
    text('Wind Strength:', 10, -20);//wind strength
    textStyle(BOLD);
    if (ballY > 400) {
        fill(120, 50, 100);
        ellipse(128, -20, 10, 10);
        fill(100, 33, 71);
        text('WEAK WIND', 10, 0);
    }
    else if (ballY < 400 && ballY > 300) {
        fill(60, 50, 100);
        ellipse(128, -20, 10, 10);
        fill(100, 33, 71);
        text('NOT SO WEAK WIND', 10, 0);
    }
    else if (ballY < 300 && ballY > 200) {
        fill(0, 50, 100);
        ellipse(128, -20, 10, 10);
        fill(100, 33, 71);
        text('STRONG WIND!', 10, 0);
        text('BETTER GET YOUR PLANTS INSIDE!', 10, 15);
    }
    pop();

    currentFactor = millis() % timeInterval;
    if (currentFactor < prevFactor) {
        let lastWBx = Waterballs[Waterballs.length - 1].ballX;
        Waterballs.push(new Waterball(lastWBx + ballSize + 50, ballY, ballSize, 0, bHue, bSat, wind));
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
    //for (let i = 0; i < Waterballs.length; i++) {
    //stroke(0);
    //strokeWeight(2);
    //if (i != 0) line(Waterballs[i].ballX, Waterballs[i].ballY + 450, Waterballs[i - 1].ballX, Waterballs[i - 1].ballY + 450);
    //d = dist(Waterballs[i].ballX, 500, Waterballs[i - 1].ballX, 500);
    //if (i != 0) line(Waterballs[i].ballX, Waterballs[i].ballY + 450, Waterballs[i - 1].ballX, Waterballs[i - 1].ballY + 450);
    //noStroke();
    //}
    for (let i = 0; i < 3; i++) {
        let lastWBx = Waterballs[Waterballs.length - 1].ballX;
        let p = new Particle(lastWBx, ballY);
        particles.push(p);
    }
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].show();
        if (particles[i].finished()) {
            // remove this particle
            particles.splice(i, 1);
        }
    }

    for (let i = 0; i < Waterballs.length; i++) {
        stroke(220, 60, 100);
        strokeWeight(2);
        if (i != 0) line(Waterballs[i].ballX, Waterballs[i].ballY + 4, Waterballs[i - 1].ballX, Waterballs[i - 1].ballY + 4);
        stroke(0);
        strokeWeight(5);
        if (i != 0) line(Waterballs[i].ballX, Waterballs[i].ballY, Waterballs[i - 1].ballX, Waterballs[i - 1].ballY);
        stroke(220, 60, 100);
        strokeWeight(2);
        if (i != 0) line(Waterballs[i].ballX, Waterballs[i].ballY - 4, Waterballs[i - 1].ballX, Waterballs[i - 1].ballY - 4);
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
class Particle {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = random(-3, 3);
        this.vy = random(-3, 3);
        this.alpha = 255;
    }

    finished() {
        return this.alpha < 0;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 11;
    }

    show() {
        noStroke();
        //stroke(255);
        fill(255, this.alpha);
        ellipse(this.x, this.y, 16);
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
            //main
            push();
            translate(this.ballX, this.ballY);
            rotate(this.wind);
            ellipse(0, 0, 10, 10);
            fill(this.bHue, this.bSat, 100);
            triangle(0, this.ballSize / 2, this.ballSize, 0, 0, this.ballSize / 2 * -1);
            noFill();
            stroke(this.bHue, this.bSat, 100);
            ellipse(0, 0, this.ballSize + 10);
            pop();

            push();
            textSize(16);
            textAlign(CENTER, CENTER);
            fill(0);
            if (this.wind < 45) {
                text('E', this.ballX, this.ballY);
            }
            else if (this.wind > 315 && this.wind < 360) {
                text('E', this.ballX, this.ballY);
            }
            else if (this.wind > 45 && this.wind < 135) {
                text('S', this.ballX, this.ballY);
            }
            else if (this.wind > 135 && this.wind < 225) {
                text('W', this.ballX, this.ballY);
            }
            else if (this.wind > 225 && this.wind < 315) {
                text('N', this.ballX, this.ballY);
            }
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
            //text(this.ballSize, this.ballX, this.ballY - 20);
            //text(this.wind, this.ballX, this.ballY - 80);
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

class Ball {
    constructor(xin, yin, din, idin, oin) {
        this.x = xin;
        this.y = yin;
        this.vx = 0;
        this.vy = 0;
        this.diameter = din;
        this.id = idin;
        this.others = oin;
    }

    collide() {
        for (let i = this.id + 1; i < numBalls; i++) {
            // console.log(others[i]);
            let dx = this.others[i].x - this.x;
            let dy = this.others[i].y - this.y;
            let distance = sqrt(dx * dx + dy * dy);
            let minDist = this.others[i].diameter / 2 + this.diameter / 2;
            //   console.log(distance);
            //console.log(minDist);
            if (distance < minDist) {
                //console.log("2");
                let angle = atan2(dy, dx);
                let targetX = this.x + cos(angle) * minDist;
                let targetY = this.y + sin(angle) * minDist;
                let ax = (targetX - this.others[i].x) * spring;
                let ay = (targetY - this.others[i].y) * spring;
                this.vx -= ax;
                this.vy -= ay;
                this.others[i].vx += ax;
                this.others[i].vy += ay;
            }
        }
    }

    move() {
        this.vy += gravity;
        this.x += this.vx;
        this.y += this.vy;
        if (this.x + this.diameter / 2 > width) {
            this.x = width - this.diameter / 2;
            this.vx *= friction;
        } else if (this.x - this.diameter / 2 < 0) {
            this.x = this.diameter / 2;
            this.vx *= friction;
        }
        if (this.y + this.diameter / 2 > height) {
            this.y = height - this.diameter / 2;
            this.vy *= friction;
        } else if (this.y - this.diameter / 2 < 0) {
            this.y = this.diameter / 2;
            this.vy *= friction;
        }
    }

    display() {
        fill(255, 5);
        ellipse(this.x, this.y, this.diameter, this.diameter);
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