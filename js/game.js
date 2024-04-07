let canvas;
let world;
let keyboard = new Keyboard();

function startGame() {
    initGame();
    init();
    setTimeout(() => {
        showCanvas();
        soundControll(false);
    }, 200);
}

function init() {
    canvas = document.getElementById('canvas');

    world = new World(canvas, keyboard);
    console.log('My Character is', world.character);
}

function showCanvas() {
    canvas = document.getElementById('canvas');
    canvas.classList.remove('d-none');

    let startScreen = document.getElementById('startScreen');
    startScreen.classList.add('d-none');
}

window.addEventListener("keydown",(e) => {
    
    if (e.keyCode == '38') {
        keyboard.UP = true;
    }
    else if (e.keyCode == '40') {
        keyboard.DOWN = true;
    }
    else if (e.keyCode == '37') {
       keyboard.LEFT = true
    }
    else if (e.keyCode == '39') {
       keyboard.RIGHT = true;
    }
    else if (e.keyCode == '32') {
        keyboard.SPACE = true;
    }
    else if (e.keyCode == '68') {
        keyboard.THROW = true;
    }

    console.log(e);
});

window.addEventListener("keyup",(e) => {
    
    if (e.keyCode == '38') {
        keyboard.UP = false;
    }
    else if (e.keyCode == '40') {
        keyboard.DOWN = false;
    }
    else if (e.keyCode == '37') {
       keyboard.LEFT = false;
    }
    else if (e.keyCode == '39') {
       keyboard.RIGHT = false;
    }
    else if (e.keyCode == '32') {
        keyboard.SPACE = false;
    }
    else if (e.keyCode == '68') {
        keyboard.THROW = false;
    }

    console.log(e);
});