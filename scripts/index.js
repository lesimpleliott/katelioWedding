const versionning = "v=1.2.0";
const dataPages = [
    { page: "home", id: "home", scripts: ["home.js", "dataCarousel.js"], popup: true},
    { page: "program", id: "program", scripts: ["program.js"], popup: true},
    { page: "infos", id: "infos", scripts: ["infos.js"], popup: true},
    { page: "dresscode", id: "dresscode", scripts: [], popup: false},
    { page: "giftList", id: "giftList", scripts: [], popup: false},
    { page: "confirm", id: "confirm", scripts: ["confirm.js"], popup: false},
];

// Construction du header
const headerBuild = () => {
    // injecte le header complet
    const header = document.querySelector("header");
    header.insertAdjacentHTML(
        "beforeend",
        `
        <nav class="navbar mobile">
        <div class="navbar__logo">
            <a href="./home.html">
                <img class="navbar__logo__image" src="../assets/logos/LogoKE_WhitePink_NoDate_V2_RVB.svg" alt="logo KatElio Wedding">
            </a>
        </div>    
        <ul class="navbar__links" id="navLinks">
            <li class="navbar__links__link"><a href="./home.html" id="home">Accueil</a></li>
            <li class="navbar__links__link"><a href="./program.html" id="program">Programme</a></li>
            <li class="navbar__links__link"><a href="./infos.html" id="infos">Infos</a></li>
            <li class="navbar__links__link"><a href="./dresscode.html" id="dresscode">Dress code</a></li>
            <li class="navbar__links__link"><a href="./giftList.html" id="giftList">Cadeaux</a></li>
        </ul>   
        <button class="burger" id="burgerBtn">
            <span class="lines">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </span>
        </button>    
        `
    );
};

// // Construction du pop-up
// const popupBuild = () => {
//     const body = document.querySelector("body");
//     body.insertAdjacentHTML(
//         "beforeend",
//         `
//     <aside class="popup" id="popup">
//         <div class="popup__container">
//             <div class="popup__container__text">
//                 <h3>Pensez à confirmer votre venue avant le 1<sup>er</sup> avril&nbsp;!</h3>
//                 <a href="./confirm.html" class="cta">
//                     <i class="fa-regular fa-paper-plane cta__icon"></i>
//                     <span class="cta__text">RSVP</span>
//                 </a>
//             </div>
//             <span class="closeBtn" id="closePopup">
//                 <i class="fa-solid fa-xmark"></i>
//             </span>
//         </div>
//     </aside>
//     `
//     );
// };

// Ajout des datas propres à chaque page
const dataPageBuild = () => {
    // Ajoute les datas propres à chaque page
    try {
        // Récupère le chemin complet de l'URL
        const path = window.location.pathname;

        // Fonction pour ajouter la classe "active" et les scripts
        const addActiveAndScripts = (page) => {
            const pageElement = document.getElementById(page.id);
            if (pageElement) {
                pageElement.classList.add("active");

                for (const script of page.scripts) {
                    const scriptElement = document.createElement("script");
                    scriptElement.src = `../scripts/${script}?v=${versionning}`;
                    scriptElement.type = "module";
                    // scriptElement.defer = true;
                    document.head.appendChild(scriptElement);
                }
            }
            if (page.popup) {
                popupBuild();
            }
        };
        // Boucle à travers les données des pages
        for (const page of dataPages) {
            if (path.includes(page.page)) {
                addActiveAndScripts(page);
                break; // Arrête la boucle dès qu'une page correspondante est trouvée
            }
        }
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
    }
};

//  Ajout du footer
const footerBuild = () => {
    const footer = document.querySelector("footer");

    if (footer !== null) {
        footer.insertAdjacentHTML(
            "beforeend",
            `
            <p class="footerText">Une question ? Contactez-nous : <a href="mailto:contact@katelio.fr">contact@katelio.fr</a></p>
            <p class="footerText">© Katherine & Eliott <em>(Katherine a écrit les textes et Eliott a codé ce site)</em></p>
            <p class="footerText">Crédits images : <a href="https://fr.freepik.com/" target="_blank">Designed by Freepik</a></p>
            <p class="footerText"><a href="./confirm.html">Si t'es du genre en retard mais observateur !</a></p>
            `
        );
    }
};

// Gestion de la navbar
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

// Gestion du popup
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

// vérifie le log
window.addEventListener("load", () => {
    let isLogged = false;
    isLogged = sessionStorage.getItem("isLogged");

    if (isLogged) {
        headerBuild();
        dataPageBuild();
        footerBuild();
        navbar();
        // popupDisplay();
    } else {
        window.location.href = "../index.html";
    }
});
