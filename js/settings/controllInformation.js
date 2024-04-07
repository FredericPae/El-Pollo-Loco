function showMenu(isActiv) {
    let sideMenu = document.getElementById('sideMenu');
    let showInfo = document.getElementById('showInfo');
    let hideInfo = document.getElementById('hideInfo');

    if(isActiv) {
        showInfo.classList.add('d-none')
        hideInfo.classList.remove('d-none');
        sideMenu.classList.remove('slideOut');
        sideMenu.classList.add('slideIn');
    } else {
        showInfo.classList.remove('d-none');
        hideInfo.classList.add('d-none');
        sideMenu.classList.remove('slideIn');
        sideMenu.classList.add('slideOut');
    }
}