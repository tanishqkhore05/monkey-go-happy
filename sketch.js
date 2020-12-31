var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,200);

  monkey=createSprite(60,140,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  
  
  
  ground=createSprite(300,180,900,10);
  ground.velocityX=-4;
  ground.x = ground.width/2;
  console.log(ground.x);
  //ground.debug= true  
}


function draw() {
background("white");
  
  if(gameState===PLAY){
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space")&& monkey.y >=140){
     monkey.velocityY=-6;
     }
  
  monkey.velocityY = monkey.velocityY + 0.2;
  
  monkey.collide(ground);    
    
  //   if(monkey.isTouching(FoodGroup)){
  //   FoodGroup.destroyEach();
  // }
   
  
  food();
  
  spawnObstacle()
  
  FoodGroup=createGroup();
  
 obstacleGroup=createGroup();
  
   
 
  fill("white")
 text("Score: "+ score, 500,50);
  
  fill("black")
  textSize(20)
  survivalTime=Math.round(frameCount/frameRate())
  text("Survival Time: "+ survivalTime, 100,50);
  }
    
     
  
//   if(monkey.isTouching(obstacleGroup)){
//     gameState=END;
//   }
  
  drawSprites();
}



function food(){
 if (frameCount % 80 ===0){
  banana=createSprite(350,Math.round(random(40,70)),10,10);
   banana.addImage("banana",bananaImage);
   banana.scale=0.08;
   banana.velocityX=-4;
   FoodGroup.add(banana);
   banana.lifetime=100;
   banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
} 
}

function spawnObstacle(){
  if (frameCount%80 === 0){
   obstacle = createSprite(350,150,20,20);
   obstacle.addImage(obstacleImage);
  obstacle.velocityX = -6;
   
    //generate random obstacles
    var rand = Math.round(random(1));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.18;
    obstacle.lifetime = 100;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}

