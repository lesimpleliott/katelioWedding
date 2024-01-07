const navbar = () => {
    const navBar = document.querySelector('.navbar');;
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

navbar()