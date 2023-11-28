function toggleClass(element, className) {
    element.classList.toggle(className);
}

function toggleMenu() {
    // GESTION LORS DU CLICK SUR BURGER
    const navBar = document.querySelector('.navbar');
    const burgerButton = document.querySelector('.navbar__burger');
    burgerButton.addEventListener('click', () => {
        toggleClass(navBar, 'openNav');
        toggleClass(burgerButton, 'lineEffect');
    })
    
    // GESTION DU CLICK POUR QUITTER LE MENU
    const backLinks = document.querySelector('.navbar__links');
    backLinks.addEventListener('click', (event) => {
        if(!event.target.classList.contains('navbar__links__item')) {
            toggleClass(navBar, 'openNav');
            toggleClass(burgerButton, 'lineEffect');
        }
    })
}

toggleMenu()