class World {

    character = new Character();
    endboss = LEVEL1.enemies[LEVEL1.enemies.length - 1];
    level = LEVEL1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    powerBar = new Powerbar();
    coinBar = new Coinbar();
    bottleBar = new Bottlebar();
    endbossPowerbar = new EndbossPowerbar();
    kill_sound = new Audio('audio/punch-2-123106.mp3');
    thorwableObject = [];
    demage = 25;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollectableObjects();
            this.characterIsfalling();
            this.checkBottleCollisions();
            this.activateEndboss();
            this.endbossReadyForAtack();
        }, 100);

        setInterval(() => {
            this.checkIfCollisionFromTop();
        }, 25);
    }

    checkThrowObjects() {
        if(this.keyboard.THROW && this.character.collectedBottles > 0 && this.thorwableObject.length === 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.thorwableObject.push(bottle);
            this.bottleBar.setPercentage(this.character.collectedBottles -= 20);
        };
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)) {
                this.character.hit(enemy);
                this.powerBar.setPercentage(this.character.lifePoints);
            };
        })
    }

    checkBottleCollisions() {
        this.thorwableObject.forEach((bottle, bottleIndex) => {
            this.level.enemies.forEach((enemy) => {
                if(bottle.y > 350) {
                    bottle.bottleIsColliding();
                    setTimeout(() => {
                        this.thorwableObject.splice(bottleIndex, 1);
                    }, 100);
                } else {
                    this.bottleDemage(bottle, bottleIndex, enemy);
                    this.deleteDeadEnemy(enemy);
                }
            });
        });
    }

    bottleDemage(bottle, bottleIndex, enemy) {
        if(bottle.isColliding(enemy)) {
            enemy.lifePoints -= this.demage;
            this.demage = 0;
            this.hitEndboss(enemy);
            bottle.bottleIsColliding();
            setTimeout(() => {
                this.thorwableObject.splice(bottleIndex, 1);
                this.demage = 25;
            }, 200);
        } 
    }

    hitEndboss(enemy) {
        enemy.gotHit = true;
        this.endbossPowerbar.setPercentage(this.endboss.lifePoints);
        setTimeout(() => {
            enemy.gotHit = false;
        }, 1000);
    }

    characterIsfalling() {
        if(this.character.isAboveGround() && this.character.speedY < 0) {
            this.character.isFalling = true;
            this.character.characterIsImun = true;
            this.kill_sound.currentTime = 0;
        } else {
            this.character.isFalling = false;
            this.character.characterIsImun = false;

            }
        }

    checkIfCollisionFromTop() {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy) && this.character.isFalling) {
                this.kill_sound.play();
                enemy.lifePoints = 0;
                this.deleteDeadEnemy(enemy);
            }
        })
    }

    deleteDeadEnemy(enemy) {
        if(enemy.lifePoints <= 0) {
            enemy.speed = 0;
            enemy.markedForDelition = true;
            setTimeout(() => {
                this.level.enemies = this.level.enemies.filter(enemy => !enemy.markedForDelition);
            }, 600);
        };
    }

    activateEndboss() {
        if(this.endboss.x - this.character.x < 500 && this.endboss.x === 3200) {
            this.endboss.isActive = true;
        } else {
            this.endboss.isActive = false;
        }
    }

    endbossReadyForAtack() {
        if(this.endboss.x - this.character.x < 150) {
            this.endboss.readyForAtack = true;
        } else {
            this.endboss.readyForAtack = false;
        }
    }


    checkCollectableObjects() {
        this.collectCoins();
        this.collectBottles();
    }

    collectCoins() {
        this.level.coins.forEach((coin, index) => {
            if(this.character.isColliding(coin)) {
                this.collectCoin_sound = new Audio('audio/collect-coin.mp3');
                this.collectCoin_sound.play();
                this.character.selectCoin();
                this.level.coins.splice(index, 1);
                this.coinBar.setPercentage(this.character.collectedCoins);
            };
        });
    }

    collectBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if(this.character.isColliding(bottle)) {
                this.collectBottle_sound = new Audio('audio/collect-bottle.mp3');
                this.collectBottle_sound.play();
                this.character.selectBottle();
                this.level.bottles.splice(index, 1);
                this.bottleBar.setPercentage(this.character.collectedBottles);
            };
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.powerBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.endbossPowerbar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.thorwableObject);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        })
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        
        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}