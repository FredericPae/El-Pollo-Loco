class Level {
    enemies;
    clouds;
    coins;
    bottles;
    backgroundObjects;
    level_x_end = 2900;

    constructor(enemies, clouds, coins, bottles, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.bottles = bottles;
        this.backgroundObjects = backgroundObjects;
    }
}