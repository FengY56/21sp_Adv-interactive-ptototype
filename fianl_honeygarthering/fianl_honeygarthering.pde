import gifAnimation, *;
Gif bees; //bee background
PImage bg; //background
float flowerX, flowerY; // flower position
float beeX=-100, beeY=-100, speedX, speedY; // bee position&speed
float beeSize = 0; //bee size
PGraphics flower; //flowers
boolean isShowFlower = false; // show flower
boolean isDrawed = false; // if the flower has been drawed
boolean gatherCompeted = false; // when itd finished
int gatherStart, gatherEnd; // start and finish time
ArrayList<Flower> flowerList - new ArrayList<flower>(); //flower array

void setup() {
  size(1920, 1080);
  imageMode(CENTER);

  bee = new Gif(this, "bees2.gif"); // get bee gif
  bees.loop();
  bg = loadImage("Grass2_Large.jpg");
  v// bg image
}

void draw() {
  background(bg);

  //show flower
  for (Flower flower : flowerList) {
  }
  //show bee
  if (beeSize < 30 &&! gatherCompleted && isShowFlower) {
    beeSize+=0.1;
  }
  fill(255, 205, 66);
  noStroke();
  //bee
  ellipse(flowerX, flowerY, beeSize, beeSize);

  if (isShowFlower) {
    if (abs(beeX - flowerX) < 20 && abs(beeY - flowerY) < 20) {
      gatherEnd = mills();
      //stay on flower for
      if ((gatherEnd - gatherStart) >= 5000) {
        gatherCompleted = true;
      }
    } else {
      if (!gatherCompleted) {
        beeX+=speedX;
        beeY+=speedY;
      }
      gatherStart = millis();
