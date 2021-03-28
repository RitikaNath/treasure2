var PLAY = 1;
var END = 0;
var gameState = PLAY;
var path, boy, cash, diamonds, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup,gameover;

function preload() {
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png", "runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadImage("gameOver.png");
}

function setup() {

  createCanvas(400, 400);
  // Moving background
  path = createSprite(200, 200);
  path.addImage(pathImg);
  path.velocityY = 4;


  //creating boy running
  boy = createSprite(70, 330, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.08;
  gameover = createSprite(200,200);
  gameover.visible = false;
  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();

}

function draw() {

  background(0);
  boy.x = World.mouseX;

  edges = createEdgeSprites();
  boy.collide(edges);

  //code to reset the background
  if (path.y > 400) {
    path.y = height / 2;
  }
if(gameState==PLAY){
  createCash();
  createDiamonds();
  createJwellery();
  createSword();
if (cashG.isTouching(boy)) {
    cashG.destroyEach();
    gameState = PLAY;
   
    treasureCollection=treasureCollection+100;
  } else if (diamondsG.isTouching(boy)) {
    diamondsG.destroyEach();
    treasureCollection = treasureCollection+50;


  } else if (jwelleryG.isTouching(boy)) {
    jwelleryG.destroyEach();
    treasureCollection=treasureCollection+20;

  } }
  if(gameState===END){
   cashG.setVelocityYEach(0);
   diamondsG.setVelocityYEach(0);
   jwelleryG.setVelocityYEach(0);
   swordGroup.setVelocityYEach(0);
    path.velocityY = 0;
    cashG.setLifetimeEach(0);
    diamondsG.setLifetimeEach(0);
    jwelleryG.setLifetimeEach(0);
    swordGroup.setLifetimeEach(0);
    gameover.depth =gameover.depth+2;
    gameover.scale=0.8;
    gameover.visible = true;
    gameover.addImage("shaillooses",endImg);
    boy.visible=false;
  }

       else if(swordGroup.isTouching
 (boy)){
      swordGroup.destroyEach();
         gameState= END;
     
      
      
    }
console.log("This is in "+gameState+" game state");
  

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: " + treasureCollection, 150, 30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
     cash = createSprite(Math.round(random(50, 350), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 3;
    cash.lifetime = 150;
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 40 == 0) {
     diamonds = createSprite(Math.round(random(50, 350), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 150;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
     jwellery = createSprite(Math.round(random(50, 350), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 3;
    jwellery.lifetime = 150;
    jwelleryG.add(jwellery);
  }
}

function createSword() {
  if (World.frameCount % 150 == 0) {
     sword = createSprite(Math.round(random(50, 350), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 3;
    sword.lifetime = 150;
    swordGroup.add(sword);
  }
}