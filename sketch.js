var balloon,database,position;

function preload(){
  backgroundImg = loadImage("Hot Air Ballon-01.png");
  hotairballoonImage1 = loadImage("Hot Air Ballon-02.png");
  hotairballoonImage2 = loadImage("Hot Air Ballon-03.png");
  hotairballoonImage3 = loadImage("Hot Air Ballon-04.png");

}
function setup() {
  createCanvas(1365,655);
  balloon = createSprite(250,400, 50, 50);
  balloon.addAnimation("balloon 1",hotairballoonImage1);
  balloon.addAnimation("balloon 2",hotairballoonImage2);
  balloon.addAnimation("balloon 3",hotairballoonImage3);

  database = firebase.database();
  var balloonPositionRef = database.ref('balloon/height');
  balloonPositionRef.on("value",readPosition,showError);
  
}

function draw() {
  background(backgroundImg);  
  drawSprites();

  textSize(20);
  fill("black");  
  stroke("white");      
  text("**Use arrow keys to move Hot Air Balloon",5,20);

  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x - 10;
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x+10;
  }
  else if(keyDown(UP_ARROW)){
    balloon.y = balloon.y-10;
    balloon.changeAnimation("balloon 2");
    balloon.scale = balloon.scale - 0.01;
    }
  else if(keyDown(DOWN_ARROW)){
    balloon.y = balloon.y+10
    balloon.changeAnimation("balloon 3");
    balloon.scale = balloon.scale + 0.01;
  }
}

function changePosition(x,y){
 database.ref('balloon/height').set({   
      x: position.x + x,
      y: position.y + y
  })
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in reading the position of balloon");
}