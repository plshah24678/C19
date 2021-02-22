var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();

  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  
   ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;
  
  invisibleBlockGroup = new Group();
  
  
}

function draw(){
  background(0);
  
  if(gameState==="play"){
    
  
  
    if(tower.y > 400){
      tower.y = 300
    }
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
}
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
}
  
  if(keyDown("space")){
   ghost.velocityY=-5; 
    }
  
  ghost.velocityY = ghost.velocityY+0.8;
  
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="END";
  }
    spawnDoors();

    
    
    
    
    drawSprites();
  }
  if(gameState==="END"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("gameover",230,250)
  }}
  
  



function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
     var climber = createSprite(200,10);
    
    door.x = Math.round(random(120,400));
     climber.x = door.x;
    
    
    door.addImage(doorImg);
     climber.addImage(climberImg);
    
    var invisibleBlock=createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
   
   
    door.velocityY = 1;
    climber.velocityY = 1;
    
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
   
   
    
    ghost.depth=door.depth;
  //  ghost.depth=ghost.depth+1;
    
    ghost.depth+=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
     climber.lifetime = 800;
    

    
    //add each door to the group
    doorsGroup.add(door);
     climbersGroup.add(climber);
    
    invisibleBlock.debug=true;
    invisibleBlockGroup.add(invisibleBlock)
   
    
  }
}

