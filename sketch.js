var dog,dogimg,dogHappy,foodStock,foods;
var database;
var food1;
var fedTime,lastFed,foodObj

function preload(){
dogimg = loadImage("Dog.png");
dogHappy = loadImage("happydog.png");

}

function setup() {
  database = firebase.database();
  createCanvas(900, 400);
  
  foodObj = new Food();

  dog = createSprite(785,200,20,60);
  dog.addImage(dogimg);
  dog.scale = 0.13;
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
 
  feed=createButton("Feed the Dog")
  feed.position(690,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)

}


function draw() {
  background(46,139,87); 

 
 foodObj.display();

fedTime=database.ref('FeedTime')
fedTime.on("value",function(data){
lastFed=data.val();
});


fill (255,255,254)
textSize(20);
if(lastFed>=12){
text("Last Feed :" + lastFed % 12 + "PM",310,35);
}else if(lastFed==0){
text("Last Feed : 12 AM",310,35)
}else
text("Last Feed :" + lastFed + "AM",310,35)

  drawSprites();
 
}

function readStock(data){
  foods = data.val();

  foodObj.updateFoodStock(foods)
}


function addFoods(){
  foods++;
database.ref('/').update({
Food:foods

});
}

function feedDog(){
dog.addImage(dogHappy);
foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
Food:foodObj.getFoodStock(),
FeedTime:hour()
});
}