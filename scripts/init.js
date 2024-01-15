// NAVBAR
const navbar = () => {
    const navBar = document.querySelector(".navbar");
    const burger = document.getElementById("burgerBtn");
    const links = document.getElementById("navLinks");

    // Affichage navbar (responsive)
    const navbarDisplay = () => {
        if (window.innerWidth < 768) {
            navBar.classList.add("mobile");
            navBar.classList.remove("desktop");
        } else {
            navBar.classList.remove("mobile");
            navBar.classList.add("desktop");
        }
    };

    // display de la navbar en fonction de la taille de la fenetre
    navbarDisplay();
    window.addEventListener("resize", navbarDisplay);

    // Open-Close LINKS (burger)
    burger.addEventListener("click", () => {
        burger.classList.toggle("openNav");
        links.classList.toggle("openNav");
    });

    // Close Links (burger) si click exterieur
    links.addEventListener("click", (event) => {
        if (!event.target.classList.contains("navbar__links__link")) {
            burger.classList.toggle("openNav");
            links.classList.toggle("openNav");
        }
    });
};
navbar();

// POPUP
const popupDisplay = () => {
    const popup = document.getElementById("popup");
    if (popup !== null) {
        let playPopup = true;
        window.addEventListener("scroll", () => {
            // On recupere la valeur 'basse' du scroll (0 en haut de la page / 1 en bas de la page)
            let scrollValue =
                (window.scrollY + window.innerHeight) /
                document.body.offsetHeight;

            // Apparition de la popup
            // si scrollValue est sup à 0.9 et si playPopup === TRUE
            if (scrollValue > 0.9 && playPopup) {
                popup.style.opacity = "1";
                popup.style.transform = "translateX(0)";
            } else {
                popup.style.opacity = "";
                popup.style.transform = "";
            }
        });

        const closePopup = document.getElementById("closePopup");
        closePopup.addEventListener("click", () => {
            popup.style.opacity = "";
            popup.style.transform = "";
            playPopup = false;
        });
    }
};
// popupDisplay(); ///////////// A REACTIVER LORS DU DEPLOIEMENT

// vérifie le log
window.addEventListener("load", () => {
    let isLogged = false;
    isLogged = sessionStorage.getItem("isLogged");
    !isLogged ? (window.location.href = "../index.html") : "";
});