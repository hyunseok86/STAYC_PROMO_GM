class Player{
    constructor(){
        this.sizePercentage = 0.1; // 플레이어 크기를 캔버스 크기의 비율로 정의
        this.width = canvas.width * this.sizePercentage;
        this.height = canvas.height * this.sizePercentage;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 10;
        this.speed = CONFIG.BASE_SPEED;

        // 터치 이벤트 처리
        this.isTouching = false;
        this.touchX = 0;

        // 자동 발사 간격 및 레벨 설정
        this.autoShootInterval = 1000; // 1초마다 자동으로 미사일 발사
        this.level = 5; // 초기 레벨 1 설정
    }

    drow(){
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x,this.y, this.width, this.height);
    }

    shoot() {
        const missile = new Missile(this.x + this.width / 2, this.y); // 플레이어의 중심에서 한 개의 미사일을 발사합니다.
        CONFIG.missiles.push(missile);
    }

    startAutoShoot() {
        this.autoShootTimer = setInterval(() => {
            this.shoot();
        }, this.autoShootInterval);
    }

    stopAutoShoot() {
        clearInterval(this.autoShootTimer);
    }

    handleCollision() {
        for (let i = CONFIG.missiles.length - 1; i >= 0; i--) {
            const missile = CONFIG.missiles[i];
            for (let j = enemies.length - 1; j >= 0; j--) {
                const enemy = enemies[j];
                if (
                    missile.x + missile.size / 2 >= enemy.x &&
                    missile.x - missile.size / 2 <= enemy.x + enemy.width &&
                    missile.y <= enemy.y + enemy.height
                ) {
                    // 미사일과 적이 충돌했을 때
                    missiles.splice(i, 1); // 미사일 제거
                    enemies.splice(j, 1); // 적 제거
                    break;
                }
            }
        }
    }

}