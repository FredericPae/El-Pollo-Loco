class ThrowableObject extends MovableObject {

    bottleCollided = false;
    isSpinning = false;

    IMAGES_BOTTLE_SPIN = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGE_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    throw_sound = new Audio('audio/throw.mp3');
    bottle_hit_sound = new Audio('audio/bottle-hit.mp3');

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_SPIN);
        this.loadImages(this.IMAGE_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 80;
        this.throw();
        this.animate();
    }

    bottleIsColliding() {
        this.bottleCollided = true;
        this.bottle_hit_sound.play();
    }

    throw() {
        this.speedY = 20;
        this.isSpinning = true;
        this.throw_sound.play();
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }

    animate() {
        setInterval(() => {
            if(this.isSpinning = true) {
                this.playAnimation(this.IMAGES_BOTTLE_SPIN);
            }
        }, 50);
        
        setInterval(() => {
            if(this.bottleCollided) {
                this.isSpinning = false;
                this.playAnimation(this.IMAGE_BOTTLE_SPLASH);
            }
        }, 50);
    }
}