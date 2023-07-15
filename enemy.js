class Enemy{
        constructor(){
            this.sizePercentage = 0.1; // 적 크기를 캔버스 크기의 비율로 정의
            this.width = player.width;
            this.height = player.height;
            this.speed = CONFIG.ENEMY_SPEED;
            this.x = Math.random() * (canvas.width - this.width);
            this.y = canvas.height;
            this.cooldown = 5000; // 적 생성 간격
            this.missileCooldown = 2000; // 적 미사일 발사 간격
            this.lastEnemyTime = 0;
            this.isMovingDown = true; // 적 이동 방향 플래그
            this.moveDistance = 40; // 적 이동 거리
            this.disappearedCount = 0;

            // 적 좌우 이동에 필요한 변수 추가
            this.isMovingLeft = Math.random() < 0.5; // 좌우 이동 방향 플래그
            this.moveInterval = Math.random() * 3000 + 1000; // 좌우 이동 간격
            this.lastMoveTime = 0; // 마지막 좌우 이동 시간
        }

        setColldown(cooldown){
            this.cooldown = cooldown; // 적 생성 간격
        }

        moveDown() {
            for (let i = CONFIG.enemies.length - 1; i >= 0; i--) {
                const enemy = CONFIG.enemies[i];
                enemy.y += enemy.speed;
                if (enemy.y > canvas.height) {
                    enemy.y = -enemy.height;
                }

                if (enemy.y > canvas.height - 30) {
                    enemy.disappearedCount++;
                    CONFIG.enemies.splice(i, 1); // 적 삭제
                    console.log('enemies : ',CONFIG.enemies)
                }
            }
        }

        moveLeftRight(timestamp) {
            if (timestamp - this.lastMoveTime >= this.moveInterval) {
            // 좌우 이동
            this.isMovingLeft = !this.isMovingLeft;
            this.lastMoveTime = timestamp;
            }

            // 좌우 이동 속도 설정
            const moveSpeed = CONFIG.ENEMY_SPEED;

            if (this.isMovingLeft) {
            // 왼쪽으로 이동
            this.x -= moveSpeed;

            // 적이 화면 왼쪽을 벗어났을 때 오른쪽으로 이동
            if (this.x < 0) {
                this.isMovingLeft = false;
            }
            } else {
            // 오른쪽으로 이동
            this.x += moveSpeed;

            // 적이 화면 오른쪽을 벗어났을 때 왼쪽으로 이동
            if (this.x + this.width > canvas.width) {
                this.isMovingLeft = true;
            }
            }
        }

        draw() {
            ctx.fillStyle = "red";
            for (let enemy of CONFIG.enemies) {
            enemy.moveLeftRight(Date.now());
            enemy.y += enemy.speed;
            ctx.fillRect(enemy.x, enemy.y, this.width, this.height);
            }
        }

        spawnEnemy(timestamp) {
            if (timestamp - this.lastEnemyTime >= this.cooldown) {
                // 적 생성
                let newEnemy = new Enemy();
                newEnemy.x = Math.random() * (canvas.width - newEnemy.width);
                newEnemy.y = -newEnemy.height;
                CONFIG.enemies.push(newEnemy);
                this.lastEnemyTime = timestamp;
            }
        }
    }