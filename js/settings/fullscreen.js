function fullscreen(event) {
    let fullscreen = document.getElementById('mainScreen');
    if(event.type === 'click') {
        if(!document.fullscreenElement) {
            enterFullscreen(fullscreen);
        } else {
            exitFullscreen()
        }
    } 
}

function enterFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
  }

  function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }