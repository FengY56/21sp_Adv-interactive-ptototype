import processing.serial.*;

Serial myConnection;
float ballX = 0;
float ballY = 300;
float fill = 0;
void setup() {
  size(1920, 1080);

  printArray(Serial.list());
  myConnection = new Serial(this, Serial.list()[0], 9600);
  myConnection.bufferUntil('\n');
}

void draw() {
  
  background(255);
  if(fill == 1){
  fill(0); 
  }
  else{
    fill(360);
  }
  ellipse(ballX, ballY, 30, 30);
}

void serialEvent(Serial conn) {
  String fromSerial = conn.readString();

  if (fromSerial != null) {
    fromSerial = trim(fromSerial);
  

  String [] data = split(fromSerial, ',');
  printArray(data);
  
  if(data.length == 3){
    fill = float(data[0]);
    
    ballX = float(data[1]);
    ballX = map(ballX, 0, 4096, 0, 1920);
  
    
    ballY = float(data[2]);
    ballY = map(ballY, 0, 4096, 0, 1080);


   
    
  }
  
  //ballX = float(data[1]);
  //ballX = map(ballX, 0, 4096, 0, 1920);
  
  //ballY = float(data[2]);
  //ballY = map(ballY, 0, 4096, 0, 1080);
  }
  //println(fromSerial);
}
