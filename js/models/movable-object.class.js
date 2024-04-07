class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    isJumping = false;
    isFalling = false;
    speedY = 0;
    acceleration = 2;
    characterIsImun = false;
    lifePoints = 100;
    collectedCoins = 0;
    collectedBottles = 0;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    isAboveGround() {
        if(this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 170;
        }
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
    }

    hit(enemy) {
        if(!this.characterIsImun && enemy.lifePoints > 0) {
            this.lifePoints -= 1;
            if(this.lifePoints < 0) {
                this.lifePoints = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
    }

    isHurt() {
        if(!this.characterIsImun) {
            let timepassed = new Date().getTime() - this.lastHit;
            timepassed = timepassed / 1000;
            return timepassed < 0.5;
        }
    }

    isDead() {
        return this.lifePoints == 0;
    }

    selectCoin() {
        this.collectedCoins += 20;
    }

    selectBottle() {
        this.collectedBottles += 20;
    }

    movingRight() {
        this.x += this.speed;
    }

    moveLeft() {
            this.x -= this.speed;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 25;
    }
}