var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');



canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight -100;



var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x,this.y, this.width, this.height);
    }
}   

class Cactus {
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


var timer = 0;
var cactusList = [];
var jump = false;
var jumpTimer = 0;
var animation;
function drowFrame(){
    animation = requestAnimationFrame(drowFrame);
    timer++;
    ctx.clearRect(0,0, canvas.width, canvas.height)

    
    if(timer % 300 === 0){
        var cactus = new Cactus();
        cactusList.push(cactus);
    }

    cactusList.forEach((item, index, object)=>{
        if(item.x < 0 ){
            object.splice(index, 1);
        }
        item.x-=6;;
        isCrashe(dino, item)
        item.draw();
    })

    if(jump){
        dino.y -= 6;
        jumpTimer++;
    }

    if(jumpTimer > 30){
        jump = false;
        
    }

    if(!jump && dino.y < 200){
        dino.y += 6;
        jumpTimer=0;
    }
    

    dino.draw();
}

// function animate(){ // 매 프레임마다 벌어지는 일들
//     ctx.fillStyle='rgba(255,255,255,0.8)'; // 전체 화면 지우기. 하얀색의 alpha값을 변경함에 따라 공의 잔상이 달라진다.
//     ctx.fillRect(0,0,canvas.width,canvas.height);
//        dino.update();
//        dino.draw();
//  }

drowFrame();


//충돌
function isCrashe(dino, cactus){
    var x = cactus.x - (dino.x + dino.width)
    var y = cactus.y - (dino.y + dino.height)
    if(x < 0 && y < 0){
        ctx.clearRect(0,0, canvas.width, canvas.height)
        cancelAnimationFrame(animation)
    }
}

// document.addEventListener('keydown', function(e){
    
//     if(e.code === 'Space'){
//         console.log(e.code)
//         jump = true;
//     }
// })



function handleStart(e){
    
    // if(e.code === 'Space'){
    if(!jump){
        console.log(e.code)
        jump = true;
    }
    // }
};


canvas.addEventListener("touchstart", handleStart,false);



