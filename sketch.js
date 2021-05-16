  var score; 
  var END=0; 
  var PLAY=1;
  var fruitGroup;
  var enemyGroup; 
  var gameState=1;
  var sword,swordImage;
  var gameover,enemy,enemyImage;
  var fruit,fruit1,fruit2,fruit3,fruit4;
  
function preload()
{
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  swordImage = loadImage("sword.png");
  gameover = loadImage("gameover.png"); 
  gameOver = loadSound("gameover.mp3");
  enemyImage = loadAnimation("alien1.png");
  knifeSound = loadSound("knifeSwooshSound.mp3")
  
}

function setup() 
  {
  createCanvas(400,400)
  sword = createSprite(40,200,20,20); 
  sword.addImage(swordImage);
  sword.scale = 0.6;
  fruitGroup = new Group();
  enemyGroup = new Group();
  score = 0;
  }

function draw()
  {
  background(220);
  if (gameState===PLAY)
  {
   spawnAliens();
   fruits();
    
   sword.y = World.mouseY;
   sword.x = World.mouseX;
    
   if(fruitGroup.isTouching(sword))
   { 
   fruitGroup.destroyEach();
   knifeSound.play();
   score = score+2; 
   }
    
   else{ 
     
   if(enemyGroup.isTouching(sword))
   {
    gameState = END;
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    gameOver.play();
     
    sword.addImage(gameover)
    sword.x = 200
    sword.y = 200   
   }
  }
 }
    
  drawSprites()
  text("Score: "+ score, 200,50);
}
function fruits()
  {
    if(frameCount%80===0)
    {
     position=Math.round(random(1,2));
     fruit=createSprite(400,200,20,20);
          
  if(position==1)
  {
  fruit.x=400;
  fruit.velocityX=-(10+(score/4));
  fruit.scale = 0.2;  
  }
    else
  {
  fruit.x=0;
  fruit.velocityX=(10+(score/4));      
  fruit.scale=0.2;
  fruit.debug=true;
  }    
  r=Math.round(random(1,4));
  if (r== 1){
   fruit.addImage(fruit1);
  } else if (r==2) {
  fruit.addImage(fruit2)
  } else if (r== 3) {
  fruit.addImage(fruit3);
  } else{
  fruit.addImage(fruit4);
  }
  
  fruit.y=Math.round(random(50,200));
  
  
  fruit.setLifetime=100;
    
  fruitGroup.add(fruit)
  }
 
}
function spawnAliens()
  {
  if (frameCount%200===0)
  {
  enemy = createSprite(400,200,20,20);
  enemy.addAnimation("moving", enemyImage);
  enemy.y=Math.round(random(100,300));
  enemy.velocityX=-8;
  enemy.setLifetime=50;
  enemyGroup.add(enemy)
  }
 }




