// ******************************************************************************
//  ******************************* IMPROVE *******************************
// ******************************************************************************
/*
    - countdown : arreter le decompte lorsque la date target sera atteinte
*/

const jumpButton = (time) => {
    const scrollButtons = document.querySelectorAll(".scrollBtn");

    scrollButtons.forEach((btn) => {
        setInterval(() => {
            btn.classList.toggle("jumpButton");
        }, time);
    });
};

const countdown = (date) => {
    const targetDate = new Date(date).getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        //Jour
        const daysUnit = document.querySelector("#daysUnit");
        let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        days = days < 10 ? `0${days}` : days;
        daysUnit.textContent = days;

        // heure
        const hoursUnit = document.querySelector("#hoursUnit");
        let hours = Math.floor(
            (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        hours = hours < 10 ? `0${hours}` : hours;
        hoursUnit.textContent = hours;

        // minutes
        const minutesUnit = document.querySelector("#minutesUnit");
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        minutesUnit.textContent = minutes;

        // seconds
        const secondsUnit = document.querySelector("#secondsUnit");
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        secondsUnit.textContent = seconds;

        // Appeler la fonction de mise à jour chaque seconde
        requestAnimationFrame(updateCountdown);
    };

    // Appeler la fonction de mise à jour une première fois pour éviter le délai initial
    updateCountdown();
};

import { carouselData } from "./dataCarousel.js";
const carousel = () => {
    const indexMax = carouselData.length; // nombre d'images
    const imageCarousel = document.getElementById("imageCarousel");
    const arrowPrevious = document.getElementById("arrowPrevious");
    const arrowNext = document.getElementById("arrowNext");
    const carouselTitle = document.getElementById("carouselTitle");
    const carouselText = document.getElementById("carouselText");
    const dotsContainer = document.getElementById("dots");
    let index = 0;

    // Ajout des dots
    for (let i = 0; i < indexMax; i++) {
        const dot = document.createElement("i");
        dot.classList.add("fa-heart", "fa-regular", "dot");
        dotsContainer.appendChild(dot);
    }
    const dots = document.querySelectorAll(".dot");

    // Ajout de la première image
    imageCarousel.setAttribute("src", carouselData[index].file);
    carouselTitle.textContent = carouselData[index].title;
    carouselText.textContent = carouselData[index].text;
    dots[index].classList.add("select");

    // Slide photos avec transition
    const showPhoto = () => {
        imageCarousel.classList.remove("fade");
        setTimeout(() => {
            // affiche l'image
            imageCarousel.setAttribute("src", carouselData[index].file);
            carouselTitle.textContent = carouselData[index].title;
            carouselText.textContent = carouselData[index].text;
            // selectionne le dot correspondant
            dots.forEach((dot, i) => {
                dot.classList.toggle("fa-solid", i === index);
                dot.classList.toggle("fa-regular", i !== index);
            });

            imageCarousel.classList.add("fade");
        }, 50);
    };

    arrowNext.addEventListener("click", () => {
        index === indexMax - 1 ? (index = 0) : index++;
        showPhoto();
    });
    arrowPrevious.addEventListener("click", () => {
        index === 0 ? (index = indexMax - 1) : index--;
        showPhoto();
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
            index === indexMax - 1 ? (index = 0) : index++;
            showPhoto();
        }
        if (e.key === "ArrowLeft") {
            index === 0 ? (index = indexMax - 1) : index--;
            showPhoto();
        }
    });

    // Affiche la première photo avec la transition
    showPhoto();
};

const witnessCards = document.querySelectorAll(".witnessCard");

witnessCards.forEach((card) => {
    card.addEventListener("click", () => {
        card.querySelector(".short").classList.toggle("open");
    });
});

countdown("May 18, 2024 14:30:00");
jumpButton(5000);
carousel();
