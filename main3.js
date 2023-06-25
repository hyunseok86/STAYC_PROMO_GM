var fps = 60;
var timer = 0;
var obstacles = [];
var jump = false;
var jumpTimer = 0;
var animation;
var canvas = document.getElementById('GameCanvas');
var ctx = canvas.getContext('2d'); 
var gameOver = false;
// canvas.width = window.innerWidth / 2;
// canvas.height = window.innerHeight / 2;

canvas.width = 400
canvas.height = 600


function init(){
    intervalId = setInterval(gameLoop, 1000/fps);
}

function gameLoop(){ 
   update();
   display();
}

 

function update(){

//    //Set Rectangle Position(Random Positioning In Canvas)
//    position.x = Math.floor(Math.random() * (canvasElement.width - 20));  //0~480
//    position.y = Math.floor(Math.random() * (canvasElement.height - 20)); //0~380
 
//    //Set Random Coloring
//    gameContext.fillStyle = 'rgb(' + Math.floor(Math.random() * 255) + ','
//                        + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';  
}

 

function display(){  

    timer++;
    ctx.clearRect(0,0, canvas.width, canvas.height)

    
    if(timer % 300 === 0){
        var obstacle = new Obstacle();
        obstacles.push(obstacle);
    }

    obstacles.forEach((item, index, object)=>{
        if(item.x < 0 ){
            object.splice(index, 1);
        }
        item.x-=6;;
        isCrashe(User, item)
        item.draw();
    })

    if(jump){
        User.y -= 6;
        jumpTimer++;
    }

    if(jumpTimer > 30){
        jump = false;
        
    }

    if(!jump && User.y < 200){
        User.y += 6;
        jumpTimer=0;
    }


    User.draw();
//    ctx.fillRect(position.x, position.y, 20, 20);
}


var User = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x,this.y, this.width, this.height);
    }
}   

class Obstacle {
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x,this.y, this.width, this.height);
    }
}

//충돌
function isCrashe(dino, obstacle){
    var x = obstacle.x - (dino.x + dino.width)
    var y = obstacle.y - (dino.y + dino.height)
    if(x < 0 && y < 0){
        ctx.clearRect(0,0, canvas.width, canvas.height)
        gameOver  = true;
        // cancelAnimationFrame(animation)
        // alert('game over')
    }
}

function handleStart(e){
    
    // if(e.code === 'Space'){
    if(!jump){
        console.log(e.code)
        jump = true;
    }
    // }
};

 

window.addEventListener('load', init, false);
canvas.addEventListener("touchstart", handleStart,false);