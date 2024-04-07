class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 60;
    lifePoints = 100;
    movement = 200;
    isActive = false;
    readyForAtack = false;
    gotHit = false;
    markedForDelition = false;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 3200;
        this.animate();
    }

    animate() {

        setInterval(() => {
            if(this.lifePoints > 0 && !this.gotHit && !this.readyForAtack && !this.isActive && this.x < 3200) {
                this.playAnimation(this.IMAGES_WALKING);
                if(this.lifePoints === 75) {
                    this.movement = 300;
                } else if(this.lifePoints === 50) {
                    this.movement = 400;
                } else if(this.lifePoints < 50) {
                    this.movement = 500;
                }
            }
        }, this.movement);

        setInterval( () => {
            if(this.isActive && !this.gotHit && this.x === 3200) {
                this.playAnimation(this.IMAGES_ALERT);
                setTimeout(() => {
                    this.moveLeft();
                }, 1500)
            } else if(this.readyForAtack) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else if(this.gotHit && this.lifePoints > 0) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.markedForDelition) {
                this.playAnimation(this.IMAGES_DEAD);
                setTimeout(() => {
                    this.markedForDelition = false;
                    this.loadImage('img/4_enemie_boss_chicken/5_dead/G26.png');
                }, 200);
            }
        }, 200);
    }

    moveLeft() {
        setInterval(() => {
            if(!this.gotHit && !this.readyForAtack) {
                if(this.lifePoints === 100) {
                    this.x -= this.speed;
                } else if(this.lifePoints === 75) {
                    this.x -= this.speed * 1.5;
                } else if(this.lifePoints === 50) {
                    this.x -= this.speed * 2;
                } else if(this.lifePoints < 50) {
                    this.x -= this.speed * 3;
                }
            }
        }, 15)
    }
}