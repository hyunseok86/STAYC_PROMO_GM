class Missile {
    constructor(x, y) {
        this.size = 5;
        this.speed = CONFIG.MISSAILE_SPEED;
        this.x = x;
        this.y = y;
        this.bulletImage = new Image();
    }

    initImage(){
        this.bulletImage.src = "buble.png";
    }
    



    move() {
        this.y -= this.speed;
        // 미사일이 화면을 벗어나면 삭제합니다.
        if (this.y < 0) {
            const index = CONFIG.missiles.indexOf(this);
            if (index !== -1) {
                CONFIG.missiles.splice(index, 1);
            }
        }
    }

    draw() {
        ctx.save();
        const missileSize = this.size * player.level; // 플레이어 레벨에 따라 미사일 크기를 조절합니다.
        ctx.beginPath();
        ctx.drawImage(this.bulletImage, this.x - missileSize / 2,this.y, missileSize * 1.5, missileSize * 1.5);
        ctx.fill();
        ctx.restore(); // 그래픽 컨텍스트 상태 복원
    }

    // draw() {
    //     ctx.save();
    //     const missileSize = this.size * player.level; // 플레이어 레벨에 따라 미사일 크기를 조절합니다.
    //     ctx.fillStyle = "blue";
    //     ctx.beginPath();
    //     ctx.arc(this.x, this.y, missileSize / 2, 0, Math.PI * 2);
    //     // ctx.drawImage(bulletImage, this.x, this.y, missileSize / 2, 0, Math.PI * 2);
    //     // ctx.drawImage(this.bulletImage, this.x,this.y, missileSize / 2, 0);
    //     ctx.fill();
    //     ctx.restore(); // 그래픽 컨텍스트 상태 복원
    // }

    
}