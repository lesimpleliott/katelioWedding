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

//  *****************************************************************************
//  ************************* @ WORK HEADER **********************************

// // Exécute ce script après le chargement du DOM
// document.addEventListener("DOMContentLoaded", function () {
//     // Récupère le chemin de l'URL actuelle
//     var path = window.location.pathname;
    
//     // Récupère tous les liens dans la barre de navigation
//     var navLinks = document.querySelectorAll(".navbar__links__link");
    
//     // Parcours tous les liens
//     navLinks.forEach(function (link) {
//         // Récupère le chemin de chaque lien
//         var linkPath = link.querySelector("a").getAttribute("href");
        
//         // Vérifie si le chemin de l'URL correspond au chemin du lien
//         if (path === linkPath) {
//             // Ajoute la classe "active" au lien correspondant
//             link.classList.add("active");
//         }
//     });
// });


// // Récupère le chemin complet de l'URL
// const cheminComplet = window.location.pathname;

// // Sépare le chemin en segments en utilisant '/' comme délimiteur
// const segments = cheminComplet.split('/');
// console.log(segments[2]);

// const page = document.querySelector("a").getAttribute("href");
// console.log(page);

// if (page.includes(segments[2])) {
//     console.log("La variable 'page' contient le texte de 'segments[2]'.");
//   } else {
//     console.log("La variable 'page' ne contient pas le texte de 'segments[2]'.");
//   }





//  *****************************************************************************
//  *****************************************************************************

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
// popupDisplay();

// vérifie le log
window.addEventListener("load", () => {
    let isLogged = false;
    isLogged = sessionStorage.getItem("isLogged");
    !isLogged ? (window.location.href = "../index.html") : "";
});
