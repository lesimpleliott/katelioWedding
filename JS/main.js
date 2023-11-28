function toggleMenu() {
    const navBar = document.querySelector('.navbar');
    const burgerButton = document.querySelector('.navbar__burger');

    burgerButton.addEventListener('click', () => {
        navBar.classList.toggle('openNav')
        burgerButton.classList.toggle('lineEffect')
    })
}

toggleMenu()