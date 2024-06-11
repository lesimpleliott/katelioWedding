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
jumpButton(5000);

const countdown = (date) => {
  const targetDate = new Date(date).getTime();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    let days, hours, minutes, seconds;

    if (timeLeft >= 0) {
      // Calculer le temps restant (compte à rebours)
      days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    } else {
      // Calculer le temps écoulé (chronomètre)
      const timeElapsed = now - targetDate;
      days = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));
      hours = Math.floor(
        (timeElapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      minutes = Math.floor((timeElapsed % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((timeElapsed % (1000 * 60)) / 1000);
    }

    days = days < 10 ? `0${days}` : days;
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    // Mettre à jour l'affichage
    document.querySelector("#daysUnit").textContent = days;
    document.querySelector("#hoursUnit").textContent = hours;
    document.querySelector("#minutesUnit").textContent = minutes;
    document.querySelector("#secondsUnit").textContent = seconds;

    // Appeler la fonction de mise à jour chaque seconde
    requestAnimationFrame(updateCountdown);
  };

  // Appeler la fonction de mise à jour une première fois pour éviter le délai initial
  updateCountdown();
};

countdown("May 18, 2024 14:30:00");

import { carouselData } from "./dataCarousel.js";
const carousel = (intervalTime) => {
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

  setInterval(() => {
    index === indexMax - 1 ? (index = 0) : index++;
    showPhoto();
  }, intervalTime);

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
carousel(15000);

const witnessCards = document.querySelectorAll(".witnessCard");
witnessCards.forEach((card) => {
  card.addEventListener("click", () => {
    card.querySelector(".short").classList.toggle("open");
  });
});
