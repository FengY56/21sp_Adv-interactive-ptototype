import gifAnimation,*;
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
}
