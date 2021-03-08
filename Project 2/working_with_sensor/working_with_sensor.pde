import gifAnimation.*;
import processing.serial.*;

Serial myConnection;
Gif bees;
PImage bg;//background
float flowerX = 0;
float flowerY = 0;//flower position
int rightClick = 0;
int leftClick = 0;
float beeX=-100, beeY=-100, speedX, speedY;//bee position and speed
PGraphics flower;//slower
boolean isShowFlower = false;//show flower
boolean isDrawed = false;//if the flower has been drawed
boolean gatherCompleted = false;//if the drawing if finished
float beeSize = 0;//bee size
int gatherStart, gatherEnd;//the start of the gathering and the end
ArrayList<Flower> flowerList = new ArrayList<Flower>();//flower list

void setup() {
  size(1920, 1080);
  imageMode(CENTER);
  bees = new Gif(this, "bees2.gif");//bee
  bees.loop();
  bg = loadImage("Grass2_Large.jpg");//bg
  printArray(Serial.list());
  myConnection = new Serial(this, Serial.list()[0], 9600);
  myConnection.bufferUntil('\n');
}

void draw() {
  background(bg);   
  ellipse(flowerX, flowerY, 30, 30); //indicator
  //show flower
  for (Flower flower : flowerList) {
    flower.show();
  }
  if (beeSize<30&&!gatherCompleted&&isShowFlower) {
    beeSize+=0.2;//show bee animation
  }
  if (gatherCompleted) {
    beeSize = 0;//bee turn 0 after gathering
  }
  fill(255, 205, 66);
  noStroke();
  //bee
  ellipse(flowerX, flowerY, beeSize, beeSize);
  if (isShowFlower) {
    if (abs(beeX-flowerX)<20&&abs(beeY-flowerY)<20) {
      gatherEnd = millis();
      //2s time
      if ((gatherEnd-gatherStart)>=1000) {
        gatherCompleted = true;
      }
    } else {
      if (!gatherCompleted) {
        beeX+=speedX;
        beeY+=speedY;
      }
      gatherStart = millis();//start gathering
    }
    if (gatherCompleted) {
      beeX += 50;
      //beeY-=2;
      //net loop
      if (beeX>1920) {
        gatherCompleted = false;
        beeX=-100;
        beeY=-100;
        isDrawed = false;
        isShowFlower = false;
      }
    }
    image(bees, beeX, beeY);//show bee
  }
 
    if (rightClick == 1) {
      if (flowerList.size()<=25&&(!isDrawed)) { //flower number not above 25
        //flowerX = mouseX; 
        //flowerY = mouseY;
        flowerList.add(new Flower(flowerX, flowerY)); //add flower
        isDrawed = true;
        isShowFlower = true;
        //bee speed
        speedX = (flowerX+100)/50;
        speedY = (flowerY+100)/50;
      }
    } else if (leftClick == 1) { //erase flower
      for (Flower flower : flowerList) {
        flower.check(mouseX, mouseY);
      }
    }
  
}

//flower
class Flower {
  float x, y;
  boolean avaiable = true;
  PGraphics flower;
  public Flower(float x, float y) {
    this.x = x;
    this.y = y;
    int size = (int)random(100, 300);//random size
    flower = createGraphics(size, size);
    flower.beginDraw();
    flower.noStroke();
    flower.translate(size/2, size/2);
    flower.fill(random(0, 255), random(0, 255), random(0, 255));//random color
    flower.ellipse(0, 0, size/3, size/3);
    flower.fill(random(0, 255), random(0, 255), random(0, 255));
    for (int i = 1; i<=12; i++) {
      flower.pushMatrix();
      flower.rotate(PI/6*(i));
      flower.ellipse(size/3, 0, size*1/3, size/6);
      flower.popMatrix();
    }
    flower.endDraw();
  }

  void show() {
    if (avaiable) {
      image(flower, x, y);
    }
  }

  void check(float mX, float mY) {
    if (abs(mX-x)<50&&abs(mY-y)<50) {
      avaiable = false;
    }
  }
}

void serialEvent(Serial conn) {
  String fromSerial = conn.readString();

  if (fromSerial != null) {
    fromSerial = trim(fromSerial);
  String [] data = split(fromSerial, ',');
  printArray(data);
  if(data.length == 4){
    rightClick = int(data[0]);
    leftClick = int(data[1]);
    flowerX = float(data[2]);
    flowerX = map(flowerX, 0, 4096, 0, 1920);
    flowerY = float(data[3]);
    flowerY = map(flowerY, 0, 4096, 0, 1080);
  }
  
  //ballX = float(data[1]);
  //ballX = map(ballX, 0, 4096, 0, 1920);
  
  //ballY = float(data[2]);
  //ballY = map(ballY, 0, 4096, 0, 1080);
  }
  //println(fromSerial);
}
