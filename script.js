(function(){


 function drawMap(){
   var paramCell=50;
   for (i = 0; i <= 7; i++) {
     for (j = 0; j <= 9; j++) {
       if(map[j][i]==0){           //Если в ячейке нет змейки
         context.beginPath();
         context.rect(i*50, j*50, paramCell, paramCell);
         context.closePath();
         context.fillStyle = "blue";
         context.fill();
         context.stroke();


       }else if(map[j][i]==1){       //Если в ячейке есть змейка
         context.beginPath();
         context.rect(i*50, j*50, paramCell, paramCell);
         context.closePath();
         context.fillStyle = "red";
         context.fill();
         context.stroke();

       }else if(map[j][i]==2){       //Если в ячейке есть змейка
         context.beginPath();
         context.rect(i*50, j*50, paramCell, paramCell);
         context.closePath();
         context.fillStyle = "yellow";
         context.fill();
         context.stroke();

       }
    }
  }
}


 function drawGrid(){    //Рисование сетки
 for (i = 0; i <= 500; i=i+50) {
   context.beginPath();
   context.moveTo(0,i);
   context.lineTo(400,i);
   context.stroke();
 }

 for (i = 0; i <= 400; i=i+50) {
   context.beginPath();
   context.moveTo(i,0);
   context.lineTo(i,500);
   context.stroke();
 }
}

function start(){
if(direction=='up'){
  moving('up');
}else if(direction=='left'){
  moving('left');
}else if(direction=='right'){
  moving('right');
}else if(direction=='down'){
  moving('down');
}


}
function check(fff){
  console.log(fff);
  if(fff[0]<0 || fff[1]<0 || fff[0]>9 || fff[1]>7){
    console.log("Выход за рамки");
    clearInterval(intervalID);
    endGame=true;
    return false;
  }

  for (i = 1; i <snake.length; i++){
    if(fff[0]==snake[i][0] && fff[1]==snake[i][1] ){
      console.log("Врезался сам в себя");
      clearInterval(intervalID);
      endGame=true;
      return false;
    }
  }


  return true;

}


function loop(){
  updateMap();
  drawMap();
  drawBerry();
  drawGrid();

}

function updateMap(){
  for (i = 0; i <= 7; i++) {
    for (j = 0; j <= 9; j++) {
      map[j][i]=0;
    }
  }
  var k;

  for (i = 0; i <snake.length; i++){

   k=snake[i];
   if(i!=0){
   map[k[0]][k[1]]=1;
 }else{
   map[k[0]][k[1]]=2;
 }
  }

}

function catchBerry(){
  if(snake[0][0]==y && snake[0][1]==x){
    var elem = document.getElementById("score");
    elem.innerHTML=Number.parseInt(elem.innerHTML)+1;
    generateBerry();
    drawBerry();
    snake.push(snake[1]);

  }
}


function moving(a){
  switch (a) {
  case "left":
    clearInterval(intervalID);                  //Влево
  var t;
  var lastY=snake[0].slice();
  var mk=snake[0].slice();
  mk[1]=(mk[1]-1);
  var f= check(mk);
  if(f==true){
    snake[0][1]=(snake[0][1]-1);
  for (i = 1; i < snake.length; i++) {

         t=snake[i];
         snake[i]=lastY;
         lastY=t;
  }
catchBerry();
}else{
  return;
}
  direction="left";
  loop();
  intervalID=setInterval(start,1000);
    break;


  case "up":
    clearInterval(intervalID);                       //Вверх
  var t;
  var lastY=snake[0].slice();
  var mk   =snake[0].slice();
  mk[0]=(mk[0]-1);
  var f= check(mk);
  if(f==true){
    snake[0][0]=(snake[0][0]-1);
  for (i = 1; i < snake.length; i++) {
         t=snake[i];
         snake[i]=lastY;
         lastY=t;
  }
  catchBerry();
}else{
  return;
}
  direction="up";
  loop();
  intervalID=setInterval(start,1000);
    break;
  case "right":
    clearInterval(intervalID);            //Вправо
  var t;
  var lastY=snake[0].slice();
  var mk=snake[0].slice();
  mk[1]=(mk[1]+1);
  var f= check(mk);
  if(f==true){
    snake[0][1]=(snake[0][1]+1);
  for (i = 1; i < snake.length; i++) {
         t=snake[i];
         snake[i]=lastY;
         lastY=t;
  }
  catchBerry();
}else{
  return;
}
  direction='right';
  loop();
  intervalID=setInterval(start,1000);
  break;
  case "down":
    clearInterval(intervalID);            //Вниз
  var t;
  var lastY=snake[0].slice();
  var mk=snake[0].slice();
  mk[0]=(mk[0]+1);
  var f= check(mk);
  if(f==true){
    snake[0][0]=(snake[0][0]+1);
  for (i = 1; i < snake.length; i++) {
         t=snake[i];
         snake[i]=lastY;
         lastY=t;
  }
  catchBerry();
}else{
  return;
}
  direction='down';
  loop();
  intervalID=setInterval(start,1000);
    break;
  default:
    alert( 'Я таких значений не знаю' );
}
}


addEventListener("keydown", function(event) {
    if (event.keyCode == 37) {
        if(direction!="left" && direction!="right" && endGame!=true){
         moving("left");
       }
    }

    if (event.keyCode == 38) {
      if(direction!="up" && direction!="down" && endGame!=true){
        moving("up");
      }
  }

    if (event.keyCode == 39) {
        if(direction!="right" && direction!="left" && endGame!=true){
      moving("right");
    }
  }

  if (event.keyCode == 40) {
    if(direction!="down" && direction!="up" && endGame!=true){
      moving("down");
    }
}


});

function generateBerry(){

  do{
    var b=true;
  x = Math.floor(Math.random() * (7 - 0)) + 0;
  y = Math.floor(Math.random() * (9 - 0)) + 0;

  for (i = 0; i < snake.length; i++) {
    if(snake[i][0]==y && snake[i][1]==x){
    b=false;
    break;
  }

  }

   }while (b==false);

}

function drawBerry(){
  context.drawImage(berry,x*50,y*50,50,50);
}

function increaseMovespeed(speed){
  intervalID=setInterval(start,speed);
}

var drawingCanvas = document.getElementById('smile');
var context = drawingCanvas.getContext('2d');
drawGrid();
var map = [              //Создаю карту
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,2,0,0,0,0,0],
    [0,0,1,0,0,0,0,0],
    [0,0,1,0,0,0,0,0],
    [0,0,1,0,0,0,0,0],
    [0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
  ];
  var snake =[    //Координаты змейки
  [3,2],
  [4,2],
  [5,2],
  [6,2],
  [7,2]
  ];

  var endGame=false;
  var berry = new Image();
  berry.src="assets/клубника.png";
  var direction="up";
  var intervalID;
  var x,y;
  berry.onload = function(){
     drawMap();
     generateBerry();
     drawBerry();
     intervalID=setInterval(start,1000);
  }
})();