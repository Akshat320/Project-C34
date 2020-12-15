//Create variables here
var dog, happyDog, foodS, foodStock, dogHappy, dogSitting;
var database;

function preload()
{
  //load images here
  dogSitting = loadImage("Dog.png"); 
  dogHappy = loadImage("happydog.png");

}

function setup() {

  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(250, 250, 20, 20);
  dog.addImage(dogSitting);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  textSize(20);
  
}


function draw() {  

  background(46, 139, 87);


  if (keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(dogHappy);
  }

  if (keyWentUp(UP_ARROW))
  {
    
    dog.addImage(dogSitting);
  }

  drawSprites();

  fill(255, 255, 254);
  stroke("black")
  textSize(13);
  text("Food Remaining: " + foodS, 180, 100);
  text("Press UP_ARROW Key to Feed the Drago Milk", 120, 20);
  //add styles here

}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x)
{
    if (x<=0)
    {
      x=0;
    }  
    else{
      x = x-1
    }
    

    if(x<1)
    {
      database.ref('/').update({
        Food: 20
      })
    }

    else{
    database.ref('/').update({
    Food: x
  })
}
}


