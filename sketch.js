//declare banana image, player, and ground variables
var bananaImage, player, ground;

//declare obstacle image
var obstacleImage;

//declare back image, player running, and score variables
var backImage,player_running,score;

//declare food and obstacle group
var foodGroup;
var obstacleGroup;

function preload()
{
  //load background image
 backImage=loadImage("jungle.jpg");
  //load player running images
 player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  //load banana and obstacle images
 bananaImage=loadImage("banana.png");
 obstacleImage=loadImage("stone.png");
} 

function setup() 
{
  createCanvas(400, 400);
  
  
  
  //create ground and give ground velocity
  ground=createSprite(200,380,800,20);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //create background
  background1=createSprite(200,200,200,200);
  background1.addAnimation("backImage",backImage);
  
  //create food and obstacle group
  foodGroup=new Group();
  obstacleGroup=new Group();
  
  //create score
  score=0;
  
  //create player
  player= createSprite(50,380,20,20);
  player.addAnimation("monkey",player_running);
  player.scale=0.15;
  player.visible=true;
}

function draw() 
{
  background("white");
  
  //player jumps when space is pressed
  if(keyDown("space")&& player.y >= 200 )
    {
      player.velocityY = -12 ;
    }

  //add gravity
  player.velocityY = player.velocityY + 0.8;

   if (ground.x < 0)
   { 
      ground.x = ground.width/2;
    }
  
  //call spwn food function
  spawnFood();
  
  //call spaen obstacles function
  spawnObstacles();
  
  //if food is touching player, score increases and banana is destroyed
  if(foodGroup.isTouching(player))
  {
    score = score+2;
    foodGroup.destroyEach();
  }
  
  //player size changes
  switch(score)
    {
      case 10:player.scale=0.12;
      break;
      case 20:player.scale=0.14;
      break;
      case 30:player.scale=0.16;
      break;
      case 40:player.scale=0.18;
      break;
      default: break;
    }
  
  //player size decreases when player is touching obstacles
  if(obstacleGroup.isTouching(player))
  {
   player.scale=0.10; 
  } 
   
  drawSprites();
  
  //display score
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 300,20);
  
}

function spawnFood()
{
  //spawn bananas
  if(frameCount % 80 === 0) 
  {
    //create banana
    var banana = createSprite(400,365,10,40);
    
    //assign banana velocity
    banana.velocityX=-3;
    
    //generate random bananas
    var rand= Math.round(random(250,300));
    banana.addImage("banana",bananaImage);
    banana.y=rand;

    //assign scale and lifetime to the bananas          
    banana.scale = 0.05;
    banana.lifetime = 300;
    
    //add each banana to the banana group
    foodGroup.add(banana);
  }
}

function spawnObstacles()
{
  //spawn stones
  if (frameCount % 150 === 0) 
  {
    //create stone
    var stone = createSprite(400,370,40,10);
    
    //assign stone velocity
    stone.velocityX = -3;
    
    //set stone animation
    stone.addImage("stone",obstacleImage);

     //assign scale and lifetime to the stone
    stone.lifetime = 150;
    stone.scale=0.05;
    
    //add each stone to the obstacle group
    obstacleGroup.add(stone);
  }
}








  