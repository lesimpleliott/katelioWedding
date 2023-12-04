
// MENU BURGER ET NAVBAR ********************************
// VARIABLES GLOBALES
const tablet = 768; 
const desktop = 1024;

// Gestion de la Navbar
function navbarDisplay() {
    const navbarTag = document.querySelector('.navbar');
    if (window.innerWidth < 768) {
        navbarTag.classList.add("mobile");
        navbarTag.classList.remove("tablet");
    } else {
        navbarTag.classList.remove("mobile");
        navbarTag.classList.add("tablet");
    }
}

// Gestion du burger Menu 
function burgerToggle() {
    const burgerTag = document.querySelector('.burger');
    const linksTag = document.querySelector('.navbar__links');
    // Au click sur le burger 
    burgerTag.addEventListener("click", () => {
        burgerTag.classList.toggle("openNav");
        linksTag.classList.toggle("openNav");
    }); 
    // Click quand la NavBar est ouverte 
    linksTag.addEventListener("click", (event) => {
        if(!event.target.classList.contains("navbar__links__link")) {
            burgerTag.classList.toggle("openNav");
            linksTag.classList.toggle("openNav");
        }
    });
}

burgerToggle();
navbarDisplay();
window.addEventListener('resize', navbarDisplay);


// RADIOFORM ********************************

function radioClick() {

    document.addEventListener("click", (event) => {
        const elementClick = event.target;
    
        // Vérification du label cliqué
        if (elementClick.classList.contains("radioForm__label")) {
            let labelFor = elementClick.getAttribute("for");
            let inputSelect = document.getElementById(labelFor);
            
            // Sélectionner l'input correspondant
            inputSelect.checked.toggle;
            console.log(inputSelect);
        }
    });
}

radioClick();
