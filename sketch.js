var dog,dogImg,dogImgHappy;
var database;
var foodStock;

function preload(){
   dogImg=loadImage("dogImg.png");
   dogImgHappy=loadImage("dogImg1.png");
  }


function setup() {
  database=firebase.database();
  createCanvas(500,500);
  dog=createSprite(250,300,10,10);
  dog.addImage(dogImg);
  dog.scale=0.1;

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  
}


function draw() {
  background(46,139,87);
 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodStock);
    dog.addImage(dogImgHappy);
  }

  drawSprites()
  fill("white")
  stroke("black")
textSize(15)
  text("food remaining : "+foodStock,170,200);
  
}


function readStock(data){
  foodStock=data.val();
}


function writeStock(x){
  
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    food:x
  })
  
}