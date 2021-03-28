var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed,lastfed;

function preload(){
sadDog=loadImage("sadDog.png");
happyDog=loadImage("happyDog.png");
kennel=loadImage("dogbg.png");
}

function setup() {

  createCanvas(1000,400);
  database = firebase.database();
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;


  feedDoggy=createButton("Feed The Puppy");
  feedDoggy.position(900,95);
  feedDoggy.mousePressed(minusStock);
  //feedDoggy.mousePressed(feedDog);
  



  addFood=createButton("Restock Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  //addFood.mousePressed(sadDogs); 
  
}



function draw() {
  background(kennel);
  foodObj.display();

  lastFedTime();
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function addFoods(){
  
  foodS++;
  database.ref('/').update({
    Food:foodS
  })

  dog.addImage(sadDog);
  dog.scale=dog.scale-0.1
}



function minusStock(){

  foodS=foodS-1;
  database.ref('/').update({
    Food:foodS
  })

  dog.addImage(happyDog);
  dog.scale=dog.scale+0.1
}

async function lastFedTime()
{var response= await fetch("http://worldclockapi.com/api/json/est/now");
var responseJSON=await response.json();

var dateTime=responseJSON.currentDateTime;
var hour=dateTime.slice(11,13);
foodTime=createButton("Last Fed:"+hour+":00");
  foodTime.position(600,95);

}



