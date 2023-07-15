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
        this.autoShootInterval = 400; // 1초마다 자동으로 미사일 발사
        this.level = 5; // 초기 레벨 1 설정

        this.spriteWidth = 128; // 스프라이트 프레임의 너비
        this.spriteHeight = 128; // 스프라이트 프레임의 높이
        this.spriteFrames = 48; // 스프라이트 프레임의 총 개수 (이미지 파일에 포함된 프레임 수에 따라 변경해야 함)
        this.currentFrame = 0; // 현재 플레이어 프레임 인덱스
        this.frameRate = 10; // 애니메이션 속도 조절을 위한 프레임 속도 (원하는 속도로 변경 가능)

        this.frameData = null; // 스프라이트 프레임 데이터
        this.frameIndex = 0; // 현재 프레임 인덱스
    
        this.image = null; // 플레이어 스프라이트 이미지

        this.audio = null; // 플레이어 샷 사운드
    }

    async loadImage() {
        this.image = await new Promise((resolve, reject) => {
            const img = new Image();
            img.src = 'animal/kenney_animal-pack-redux/Spritesheet/round_nodetails.png';

            img.onload = () => resolve(img);
            img.onerror = reject;
        });
        await this.loadXML();
        
    }

    async loadXML() {
        try {
          const response = await fetch('animal/kenney_animal-pack-redux/Spritesheet/round_nodetails.xml');
          if (!response.ok) {
            throw new Error(`Failed to load XML: ${response.statusText}`);
          }
      
          const xmlText = await response.text();
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
          const frames = xmlDoc.getElementsByTagName('frame');
      
          const frameData = [];
          for (let i = 0; i < frames.length; i++) {
            const frameNode = frames[i];
            const frame = {
              x: parseInt(frameNode.getAttribute('x')),
              y: parseInt(frameNode.getAttribute('y')),
              width: parseInt(frameNode.getAttribute('width')),
              height: parseInt(frameNode.getAttribute('height')),
            };
            frameData.push(frame);
          }
      
          this.frameData = frameData;
        } catch (error) {
          console.error(error);
        }
    }
    
    animate() {
        this.currentFrame++; // 다음 프레임으로 이동
        if (this.currentFrame >= this.spriteFrames) {
          this.currentFrame = 0; // 프레임 인덱스 초기화
        }
    
        // 애니메이션 속도 조절을 위해 frameRate에 따라 애니메이션 업데이트 간격을 설정합니다.
        // frameRate 값이 낮을수록 애니메이션 속도가 느려집니다.
        setTimeout(() => {
          this.animate();
        }, 1000 / this.frameRate);
    }

    drow(){
        // ctx.fillStyle = "blue";
        // ctx.drawImage(playerImage,this.x -20,this.y - 60, 80, 80);
        // ctx.fillRect(this.x,this.y, this.width, this.height);

        // if (!this.image) return;

        // const frameX = (this.currentFrame % 6) * this.spriteWidth;
        // const frameY = Math.floor(this.currentFrame / 6) * this.spriteHeight;
    
        // ctx.drawImage(
        //   playerImage,
        //   frameX,
        //   frameY,
        //   this.spriteWidth,
        //   this.spriteHeight,
        //   this.x,
        //   this.y,
        //   this.spriteWidth,
        //   this.spriteHeight
        // );

        // const row = Math.floor(this.frameIndex / this.framesPerRow);
        // const col = this.frameIndex % this.framesPerRow;
        // const sx = col * this.width;
        // const sy = row * this.height;
        // ctx.drawImage(this.image, sx, sy, this.width, this.height, this.x, this.y, this.width, this.height);

        if (null != this.frameData && this.frameData?.length != 0){
            const frame = this.frameData[this.frameIndex];
            ctx.drawImage(
                this.image,
                frame.x,
                frame.y,
                frame.width,
                frame.height,
                this.x,
                this.y,
                frame.width,
                frame.height
            );
        };
    }

    shoot() {
        if(CONFIG.GAME_START){
            this.audio = document.getElementById('shoot-sound');
            if(this.audio!=null) this.audio.play();
            const missile = new Missile(this.x + this.width / 2, this.y - 60); // 플레이어의 중심에서 한 개의 미사일을 발사합니다.
            missile.initImage();
            CONFIG.missiles.push(missile);
        }
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
            for (let j = CONFIG.enemies.length - 1; j >= 0; j--) {
                const enemy = CONFIG.enemies[j];
                if (
                    missile.x + missile.size / 2 >= enemy.x &&
                    missile.x - missile.size / 2 <= enemy.x + enemy.width &&
                    missile.y <= enemy.y + enemy.height
                ) {
                    // 미사일과 적이 충돌했을 때
                    CONFIG.missiles.splice(i, 1); // 미사일 제거
                    CONFIG.enemies.splice(j, 1); // 적 제거
                    break;
                }
            }
        }
    }

}