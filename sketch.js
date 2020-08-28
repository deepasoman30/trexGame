var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage, invisible_wall, cloud_1, cloud_img, o_1, o_2, o_3, o_4, o_5, o_6, obs_1, player_score = 0;
var cloud_group, obstacles_group, gameState = "play";

var trex_collided;
//adding image to a variable
function preload() {

  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
 trex_collided = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloud_img = loadImage("cloud_img.png");
  o_1 = loadImage("obstacle1.png");
  o_2 = loadImage("obstacle2.png");
  o_3 = loadImage("obstacle3.png");
  o_4 = loadImage("obstacle4.png");
  o_5 = loadImage("obstacle5.png");
  o_6 = loadImage("obstacle6.png");
  

}
var edges;

function setup() {
  //canvas setup
  createCanvas(400, 400);


  //create a trex sprite 

  //sprite object  
  trex = createSprite(50, 380, 20, 50);
  //image displayed 
  trex.addAnimation("running", trex_running);
    trex.addAnimation("collided" ,trex_collided);
  //adding scale and position to trex
  trex.scale = 0.5;

  //console.log(trex.y);

  //wall(invisible)not visible.

  invisible_wall = createSprite(200, 390, 800, 10);
  invisible_wall.visible = false;

  //create ground sprite
  ground = createSprite(200, 380, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;
  //groups for clouds and obstacles
  cloud_group = new Group();
  obstacle_group = new Group();
  
  trex.setCollider("circle",0,0,40);
 // trex.debug=true;
}

function draw() {
  console.log(trex.y);
  if (gameState === "play") {

    
  if (World.frameCount % 80 === 0) {
    clouds();
  }
  if (World.frameCount % 60 === 0) {
    ob_1();

  }
    //score  
    player_score = player_score + Math.round(getFrameRate() / 60)
    //jump
    if (keyDown("space") && trex.y > 361) {
      trex.velocityY = -18
    }
    //makes ground move
    ground.velocityX = -2;
    //  makes gravity
    trex.velocityY = trex.velocityY + 0.8
    
    if (obstacle_group.isTouching(trex)) {
    gameState = "gameOver"
  }
  } 
  else if (gameState === "gameOver") {
   ground.velocityX = 0;
   trex.changeAnimation("collided" ,trex_collided);
    obstacle_group.setVelocityXEach(0);
    cloud_group.setVelocityXEach(0);
   }
  
  

  background(180);
  if (ground.x < 0) {
    ground.x = 200;
  }
  // console.log (Math.round(getFrameRate()/60))
  text("score " + player_score, 300, 60);
  //edges = createEdgeSprites();

  //(stop trex from falling down )

  trex.collide(invisible_wall);

  drawSprites();
}


//function
function clouds() {
  cloud_1 = createSprite(300, 30, 30, 30);
  cloud_1.scale = 0.8
  cloud_1.y = Math.round(random(280, 300));
  cloud_1.depth = trex.depth;
  trex.depth = trex.depth + 1;
  cloud_1.lifetime = 600 / 7
  cloud_1.velocityX = -7
  cloud_1.addImage("floating_clouds", cloud_img);
  cloud_group.add(cloud_1)
}

function ob_1() {

  obs = createSprite(400, 378, 10, 10);
  obs.velocityX = -5
  obs.scale = 0.7
  obs.lifetime = 400 / 5;
  var random_number = Math.round(random(1, 6));

  switch (random_number) {

    case 1:
      obs.addImage(o_1);
      break;

    case 2:
      obs.addImage(o_2);

      break;

    case 3:
      obs.addImage(o_3);

      break;

    case 4:
      obs.addImage(o_4);

      break;

    case 5:
      obs.addImage(o_5);

      break;

    case 6:
      obs.addImage(o_6);

      break;

    default:
      break;




  }
  obstacle_group.add(obs);


}