  var trex, trex_running, trex_collided;
  var ground, invisibleGround, groundImage;
  var cloud, cloudImage;
  var score = 0;
  var obs1, obs2, obs3, obs4, obs5, obs6;
  var cloudsGroup, obstaclesGroup;
  var gameOver, gameOverImage, restart, restartImage; 
  var jump, die, checkpoint;
  var highscore = 0;
  var PLAY = 1;
  var END = 0;
  var gameState = PLAY;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
   obs1 = loadImage("obstacle1.png");
  
   obs2 = loadImage("obstacle2.png");
  
   obs3 = loadImage("obstacle3.png");
  
   obs4 = loadImage("obstacle4.png");
  
   obs5 = loadImage("obstacle5.png");
  
   obs6 = loadImage("obstacle6.png");
  
   gameOverImage = loadImage("gameOver.png");
  
   restartImage = loadImage("restart.png");
  
   jump = loadSound("jump.mp3");
  
   die = loadSound("die.mp3");
  
   checkpoint = loadSound("checkPoint.mp3");
}


function setup() {
  createCanvas(600, 200);
  
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  //create a trex sprite
  trex = createSprite(50,160,20,50);
 
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
 
  trex.setCollider("circle",0,0,40);
 
  
  //create a ground sprite
  ground = createSprite(300,180,600,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
 
  
  invisibleGround = createSprite(300,185,600,5);
  invisibleGround.visible = false;
  
  gameOver = createSprite(300,100);
  gameOver.addImage("gameover", gameOverImage);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  restart = createSprite(300,140);
  restart.addImage("restart", restartImage);
  restart.scale = 0.5;
  restart.visible = false;
}

function draw() {
  background("white");
  
  fill(0);
  textSize(15);
  text("Score :"+score, 480 ,50);
  textSize(15);
  text("HIGH SCORE :"+highscore,300,50);
  
  if(gameState ==PLAY) {
     
     
    
      score = score+Math.round(getFrameRate()/60);
      if(score%100==0 && score>0 ){
        checkpoint.play();
      }
    if (keyDown("space") && trex.y>=159) {
      trex.velocityY = -12;
      jump.play();
    }
  trex.velocityY = trex.velocityY + 0.7
    if (ground.x < 0) {
    ground.x = ground.width / 2;
    
  }
   spawnClouds();
  spawnObstacles();
    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
      die.play();
      
    }
  }
 else if(gameState == END){
     ground.velocityX = 0 ;
     trex.velocityY = 0;
     trex.velocityX = 0;
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     obstaclesGroup.setLifetimeEach(-1);
     cloudsGroup.setLifetimeEach(-1);
     trex.changeAnimation("collided", trex_collided);
     gameOver.visible = true;
     restart.visible = true;
  }
  if(mousePressedOver(restart)){
    reset();
  }
  
  trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnClouds(){
  if(frameCount %60 ==0){
    var clouds = createSprite(600,120,40,10);
    clouds.velocityX = -3;
    
    clouds.y = Math.round(random(70,120));
    clouds.addImage (cloudImage);
    clouds.scale = 0.7;
    clouds.depth = trex.depth;
    trex.depth = trex.depth+1;
    clouds.lifetime = 200;
    cloudsGroup.add(clouds);
  }
}
function spawnObstacles(){
  if(frameCount%60 ==0){
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6+3*score/100);
    
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obs1);
        break;
      case 2: obstacle.addImage(obs2);
        break;
      case 3: obstacle.addImage(obs3);
        break;
      case 4: obstacle.addImage(obs4);
        break;
      case 5: obstacle.addImage(obs5);
        break;
      case 6: obstacle.addImage(obs6);
        break;
      default :break;
    }
    obstacle.scale = 0.5;
    obstacle.lifetime = 130;
    trex.depth = trex.depth+1;
    obstaclesGroup.add(obstacle);
  }
}
function reset(){
  gameState = PLAY;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  gameOver.visible = false;
  restart.visible = false;
  trex.changeAnimation ("running", trex_running);
  if(highscore<score){
    highscore = score;
  }
  score = 0;
}