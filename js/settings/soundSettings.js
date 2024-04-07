const bgSound = new Audio('audio/bg-music.mp3');
bgSound.loop = true;

function soundControll(isTurnedOff) {
    toggleSoundButtons(isTurnedOff);
    toggleSound(isTurnedOff);
}

function toggleSoundButtons(isTurnedOff) {
    let turnOn = document.getElementById('soundOn');
    let turnOff = document.getElementById('soundOff');
    if(isTurnedOff) {
        turnOn.classList.add('d-none');
        turnOff.classList.remove('d-none');
    } else {
        turnOn.classList.remove('d-none');
        turnOff.classList.add('d-none');
    }
}

function toggleSound(isTurnedOff) {
    if(isTurnedOff) {
        bgSound.pause();
    } else {
        bgSound.play();
    }
}