class Bottle extends MovableObject {

    y = 350;
    height = 80;

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_BOTTLE[0]);
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = Math.random() * 2000 + 300;
    }
}