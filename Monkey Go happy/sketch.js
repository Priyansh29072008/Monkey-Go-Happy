var PLAY = 1;
var END = 0; 
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,200);
  monkey = createSprite(60,150,20,50)
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(200,180,1000,10)
  ground.velocityX = -4
  ground.x = ground.width/2;
  console.log(ground.x)
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
  
  obstaclesGroup = createGroup();
  foodGroup = createGroup()
}


function draw() {
  background("cyan")
   monkey.collide(ground);
  if(keyDown("Space")&& monkey.y >= 100){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8
  
 if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
 spawnObstacle();
  
  if(obstaclesGroup.isTouching(monkey)){
    ground.velocityX=0;
    monkey.velocityX = 0;
    obstaclesGroup.setLifetimeEach(0);
    obstaclesGroup.setVelocityXEach(0);
    survivalTime = survivalTime-10
  }  
 food();
  stroke("white");
  textSize(20);
  fill("white");
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime,100,50);
  
  if(foodGroup.isTouching(monkey)){
    survivalTime = survivalTime+1
    foodGroup.setLifetimeEach(0);
    foodGroup.setVelocityXEach(0);
  }
 drawSprites();
  
}
function spawnObstacle(){
 if(frameCount % 300 === 0){
   obstacle = createSprite(400,160,40,10);
   obstacle.x = Math.round(random(300,500))
   obstacle.addImage(obstaceImage)
   obstacle.velocityX = -3;
   obstacle.scale = 0.1   
   
   obstaclesGroup.add(obstacle);
  } 
 }
function food(){
  if (frameCount % 80 === 0){
      banana = createSprite(200,150,40,10);
      banana.y = Math.round(random(120,200))
      banana.addImage(bananaImage)
      banana.velocityX = -3;
      banana.scale = 0.1;
    
    foodGroup.add(banana);
    }
}