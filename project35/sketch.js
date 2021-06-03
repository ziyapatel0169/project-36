var dog,happyDog;
var database;
var Food,stockFood;
var fedTime,lastFed,Feed,addFood;
var foodObg;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happydogImg = loadImage("images/dogImg1.png");
}

function setup() {

  database=firebase.database();
  createCanvas(1000, 400);


  foodObg= new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);


   dog=createSprite(800,200,150,150);
   dog.addImage(dogImg);
   dog.scale=0.15;

   feed= createButton("Feed the dog");
   feed.position(799,95);
   feed.mousePressed(feedDog);

   addFood= createButton("Add Food");
   addFood.position(800,95);
   addFood.mousePressed(addFoods);


 
  
}


function draw() {  
  background(46,139,87);

  foodObg.display();

  fedTime=database.ref('fedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed:"+ lastFed %12+ "PM",350,30);
  }
  else if(lastFed==0){
    text("Last Feed: 12AM",350,30);
  }

  else{
    text("Last Feed:"+ lastFed %12+ "AM",350,30);
  }


  
  drawSprites();

  
}
//function to read stock

function readStock(data){
  foodS=data.val();
  foodObg.updateFoodStock(foods);

}
//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObg.updateFoodStock(foodObg.getfoodStock()-1);
  database.ref('/').update({
    Food:foodObg.getfoodStock(),
    FeedTime: hour()

  })
}

//function to add food in stock
function addFoods (){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}



//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}

