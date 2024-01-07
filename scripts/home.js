// ******************************************************************************
//  ******************************* IMPROVE *******************************
// ******************************************************************************
/*
    - countdown : arreter le decompte lorsque la date target sera atteinte
*/

// ******************************************************************************
//  ******************************* FONCTIONS *******************************
// ******************************************************************************

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

    setInterval(() => {
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
    }, 1000);
};


// ******************************************************************************
//  ******************************* EVENT *******************************
// ******************************************************************************

// VERIFIACTION DU LOG
window.addEventListener("load", () => {
    let isLogged = false;
    isLogged = sessionStorage.getItem("isLogged");
    !isLogged ? (window.location.href = "../index.html") : "";

    // animation sur le bouton scroll
    jumpButton(2000);

    // compte à rebour
    countdown("May 18, 2024 14:30:00");
});
