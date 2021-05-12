
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground;
var gameState = "play";
var survivalTime = 0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  ground = createSprite(300, 400, 10000, 10);
  ground.velocityX = 2;
  
  monkey = createSprite(50, 370, 10, 5);
  monkey.setCollider("rectangle",0 , 0,monkey.width, monkey.x.height);
  monkey.debug = true;
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  background("white");

  if (gameState === "play") {
      spawnObstacles();
      spawnBananas();
      monkey.collide(ground);
  

  
      if (ground.x === 600) {
        ground.x = ground.x/2;
      }
  
      if (keyWentDown("space")  && monkey.y > 350) {
        monkey.velocityY = -4;               
      }
  
      if (monkey.isTouching(foodGroup)) {
        foodGroup.destroyEach();
      }
  
      if (monkey.isTouching(obstacleGroup)) {
        gameState = "end";
      }
     
    survivalTime = Math.ceil(frameCount/frameRate());
  
  
  
  
  }
  
  if (gameState === "end") {
    ground.velocityX = 0;
    ground.width = 600;
    text("Game Over", 200, 200);
    obstacleGroup.destroyEach();
    monkey.destroy();
  }
  
  text("Survival Time: " + survivalTime, 100, 50);
  monkey.velocityY = monkey.velocityY + 0.1
  survivalTime = Math.ceil(frameCount/frameRate());
  drawSprites();
  
  
}

function spawnObstacles(){
 if (frameCount % 200 === 0){
   var obstacle = createSprite(600,ground.y,10,40);
   obstacle.velocityX = -3; 
   obstacle.addImage(obstaceImage);
   obstacle.scale = 0.2;
   obstacle.lifetime = 300;
   obstacleGroup.add(obstacle);
 }
}

function spawnBananas(){
 if (frameCount % 80 === 0){
   var banana = createSprite(600,Math.round(random(300, 400)),10,40);
   banana.velocityX = -3; 
   banana.addImage(bananaImage);
   banana.scale = 0.07;
   banana.lifetime = 300;
   foodGroup.add(banana);
 }
}