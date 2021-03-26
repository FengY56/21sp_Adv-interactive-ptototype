let cf, pf;
let timeIn = 1000;
let balls = [];

function setup() {
  createCanvas(500, 500);
  for (let i = 0; i < 10; i++) {
    balls[i] = new ball(100, 100, 100);
  }
  cf = 0;
  pf = 0;
}


function draw() {
  background(230);
  //cf = millis() % timeIn;
  //for (let i = 0; i < 10; i++) {
  //if (cf < pf) {
  for (let i = 0; i < balls.length; i++) {
    balls[i].show();
    balls[i].ad();
  }
  //}
  //}

  //balls[i].show();
  //pf = cf;
}

class ball {
  constructor(bx, by, bs) {
    this.bx = bx;
    this.by = by;
    this.bs = bs;
  }

  show() {
    fill(255, 0, 0);
    ellipse(this.bx, this.by, this.bs);
  }

  ad() {
    cf = millis() % timeIn;
    for (let i = 0; i < 10; i++) {
      if (cf < pf) {
        this.by = this.by + 10;
      }
    }
    pf = cf;
  }
}
