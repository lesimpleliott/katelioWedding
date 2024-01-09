// ******************************************************************************
//  ******************************* IMPROVE *******************************
// ******************************************************************************
/*
   - radio Attendance // Ajouter un bouton Reset Formulaire
   - attendance : lorsque je clique sur l'input attendance cela affiche le mainGuestBox et scroll pour afficher celui-ci en haut de la page
   - input text : revoir le style (color bg ...) quand input value !== ""
*/

// ******************************************************************************
//  ******************************* TEXTES *******************************
// ******************************************************************************
const messageYes = [
    "Des questions ? Un petit mot ?",
    "Profitez en pour nous indiquer d’éventuelles allergies alimentaires ou besoins.",
];

const messageNo = [
    "Nous sommes désolés de ne pas pouvoir vous compter avec nous pour ce moment.",
    "Nous penserons bien à vous et espérons vous voir bientôt !",
    "Si vous souhaitez nous laisser un petit mot, nous le lirons avec joie.",
    "On vous embrasse fort !",
    "Katherine & Eliott",
];
// ******************************************************************************
//  ******************************* VARIABLES *******************************
// ******************************************************************************
const attendanceRadio = document.getElementById("attendanceRadio");
const addGuestBtn = document.getElementById("addGuestBtn");
const guestsListBox = document.getElementById("guestsListBox");
const host = document.getElementById("host");
const meal = document.getElementById("meal");
const message = document.getElementById("message");
const submitForm = document.getElementById("submitForm");

let response = null; // Stock la reponse attendance true / false
let dataGuests = []; // stock la guestsList
// let validDataGuests = null;

// ******************************************************************************
//  **************************** FONCTION USEFULL ****************************
const shakeButton = (btn) => {
    btn.classList.add("shake");
    setTimeout(() => btn.classList.remove("shake"), 300);
};

// ******************************************************************************
//  ****************************** FONCTION GUESTS ******************************
const attendanceSelection = (e) => {
    if (e.target.tagName === "INPUT") {
        // change style de la section et titre
        const attendance = document.getElementById("attendance");
        attendance.style = "none";
        const attendanceTitle = document.querySelector(
            "#attendance .formSection__title"
        );
        attendanceTitle.style = "none";

        // Désactive l'écouteur d'événement
        attendanceRadio.removeEventListener("click", attendanceSelection);
        // on lance la function correspondante au choix
        const selectID = e.target.id;
        if (selectID === "attendanceYes") {
            response = true;
            const attendanceNo = document.getElementById("attendanceNo");
            attendanceNo.disabled = "true";
            mainGuest();
        } else {
            const attendanceYes = document.getElementById("attendanceYes");
            attendanceYes.disabled = "true";
            mainGuest();
        }
    }
};

const mainGuest = () => {
    const mainGuestBox = document.getElementById("mainGuestBox");
    const inputMainFirstname = document.getElementById("inputMainFirstname");
    const inputMainLastname = document.getElementById("inputMainLastname");
    const inputMainEmail = document.getElementById("inputMainEmail");
    const mainGuestBtn = document.getElementById("mainGuestBtn");
    const displayError = document.querySelector("#mainGuestBox .displayError");
    const regMail = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");

    // affiche mainGuestBox
    mainGuestBox.style = "none";

    // vérifie le formulaire mainGuest
    let validDataMainGuest = false;
    const validMainGuestData = () => {
        displayError.textContent = "";
        if (
            inputMainFirstname.value !== "" &&
            inputMainLastname.value !== "" &&
            regMail.test(inputMainEmail.value)
        ) {
            mainGuestBtn.classList.remove("unable");
            validDataMainGuest = true;
        } else {
            mainGuestBtn.classList.add("unable");
            validDataMainGuest = false;
        }
    };
    inputMainFirstname.addEventListener("input", validMainGuestData);
    inputMainLastname.addEventListener("input", validMainGuestData);
    inputMainEmail.addEventListener("input", validMainGuestData);

    // submit mainGuest
    mainGuestBtn.addEventListener("click", (e) => {
        e.preventDefault();

        if (validDataMainGuest) {
            // stock le le mainGuest dans variable mainGuest
            const firstname = inputMainFirstname.value;
            const lastname = inputMainLastname.value;
            const email = inputMainEmail.value;
            const mainGuestData = {
                firstname: firstname,
                lastname: lastname,
                mainguest: true,
                email: email,
                age: "adult",
            };
            dataGuests.push(mainGuestData);
            console.log(dataGuests);

            // affiche le mainGuest
            const mainGuestName = document.getElementById("mainGuestName");
            const mainGuestEmail = document.getElementById("mainGuestEmail");
            guestsListBox.style = "";
            mainGuestBox.style.display = "none";
            mainGuestName.textContent = `${firstname} ${lastname}`;
            mainGuestEmail.textContent = email;

            // affiche la suite !
            displayFormYesNo();
        } else {
            displayError.textContent = "Information(s) manquante(s)";
            shakeButton(mainGuestBtn);
        }
    });
};

const displayFormYesNo = () => {
    const messageSubtitle = document.getElementById("messageSubtitle");

    if (response === true) {
        // affiche le bouton addGuest
        addGuestBtn.style = "none";

        addGuestBtn.addEventListener("click", (e) => {
            e.preventDefault();
            modal();
        });

        // affiche hebergement
        host.style = "none";
        // affiche repas
        meal.style = "none";
        // affiche la section Message
        message.style = "";
        messageYes.forEach((text) => {
            const newText = document.createElement("p");
            newText.textContent = text;
            messageSubtitle.appendChild(newText);
        });
        // affiche le bouton de submit du formulaire
        submitForm.style = "none";
    }

    if (response === false) {
        // affiche la section Message
        message.style = "";
        messageNo.forEach((text) => {
            const newText = document.createElement("p");
            newText.textContent = text;
            messageSubtitle.appendChild(newText);
        });

        // affiche le bouton de submit du formulaire
        submitForm.style = "none";
    }
};

const modal = () => {
    const addGuestsModal = document.getElementById("addGuestsModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const adultRadio = document.getElementById("adult");
    const childRadio = document.getElementById("child");
    const inputGuestFirstname = document.getElementById("inputGuestFirstname");
    const inputGuestLastname = document.getElementById("inputGuestLastname");
    const saveGuestBtn = document.getElementById("saveGuestBtn");

    // affiche la modale
    addGuestsModal.style = "none";
    document.body.style.overflowY = "hidden";
    document.querySelector("main").style.filter = "blur(5px)";
    document.querySelector("header").style.filter = "blur(5px)";

    // ferme la modale
    closeModalBtn.addEventListener("click", closeModal);
    window.addEventListener("keydown", eventCloseModal);
    window.addEventListener("click", eventCloseModal);

    // vérifie les inputs dataGuests
    adultRadio.addEventListener("input", validGuestsData);
    childRadio.addEventListener("input", validGuestsData);
    inputGuestFirstname.addEventListener("input", validGuestsData);
    inputGuestLastname.addEventListener("input", validGuestsData);

    // enregistre guest et affiche guest
    saveGuestBtn.addEventListener("click", addGuest);
};

const eventCloseModal = (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal();
    }
    if (e.target.classList.contains("modal")) {
        closeModal();
    }
};

const closeModal = () => {
    const addGuestsModal = document.getElementById("addGuestsModal");
    const adultRadio = document.getElementById("adult");
    const childRadio = document.getElementById("child");
    const inputGuestFirstname = document.getElementById("inputGuestFirstname");
    const inputGuestLastname = document.getElementById("inputGuestLastname");
    const modalDisplayError = document.querySelector(
        ".guestsBtnContainer .displayError"
    );
    const closeModalBtn = document.getElementById("closeModalBtn");
    const saveGuestBtn = document.getElementById("saveGuestBtn");

    addGuestsModal.style.display = "none";
    document.body.style.overflowY = "";
    document.querySelector("main").style = "none";
    document.querySelector("header").style = "none";
    adultRadio.checked = false;
    childRadio.checked = false;
    inputGuestFirstname.value = "";
    inputGuestLastname.value = "";
    modalDisplayError.textContent = "";
    saveGuestBtn.classList.add("unable");

    // arrete les eventListener de la modal
    closeModalBtn.removeEventListener("click", closeModal);
    window.removeEventListener("keydown", eventCloseModal);
    window.removeEventListener("click", eventCloseModal);
    adultRadio.removeEventListener("input", validGuestsData);
    childRadio.removeEventListener("input", validGuestsData);
    inputGuestFirstname.removeEventListener("input", validGuestsData);
    inputGuestLastname.removeEventListener("input", validGuestsData);
};

const validGuestsData = () => {
    const modalDisplayError = document.querySelector(
        ".guestsBtnContainer .displayError"
    );
    const adultRadio = document.getElementById("adult");
    const childRadio = document.getElementById("child");
    const inputGuestFirstname = document.getElementById("inputGuestFirstname");
    const inputGuestLastname = document.getElementById("inputGuestLastname");
    const saveGuestBtn = document.getElementById("saveGuestBtn");

    modalDisplayError.textContent = "";
    if (
        inputGuestFirstname.value !== "" &&
        inputGuestLastname.value !== "" &&
        (adultRadio.checked || childRadio.checked)
    ) {
        saveGuestBtn.classList.remove("unable");
        validDataGuests = true;
        adultRadio.checked
            ? (selectedAge = adultRadio.value)
            : (selectedAge = childRadio.value);
    } else {
        saveGuestBtn.classList.add("unable");
        validDataGuests = false;
    }
};

const addGuest = () => {
    const modalDisplayError = document.querySelector(
        ".guestsBtnContainer .displayError"
    );

    if (validDataGuests) {
        // stock la data dans dataGuests
        const guestFirstname = inputGuestFirstname.value;
        const guestLastname = inputGuestLastname.value;
        const age = selectedAge;
        const guestData = {
            firstname: guestFirstname,
            lastname: guestLastname,
            age: age,
        };
        dataGuests.push(guestData);
        console.log(dataGuests);

        // Affiche la data dans guestsBox
        const icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-trash-can");
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("deleteBtn", "js-deleteGuest");
        deleteBtn.appendChild(icon);
        const guestName = document.createElement("p");
        guestName.textContent = `${guestFirstname} ${guestLastname}`;
        const newGuest = document.createElement("div");
        newGuest.classList.add("cardConfirm__section", "guests");
        newGuest.appendChild(guestName, deleteBtn);
        guestsListBox.appendChild(newGuest);

        // ferme la modale
        closeModal();
        validDataGuests = null;
    } else {
        shakeButton(saveGuestBtn);
        modalDisplayError.textContent = "Information(s) manquante(s)";
    }
};

// ******************************************************************************
//  ****************************** FONCTION HOSTS ******************************



// ******************************************************************************
//  ******************************* EVENTS *******************************
window.addEventListener("load", () => {
    let isLogged = false;
    isLogged = sessionStorage.getItem("isLogged");
    !isLogged ? (window.location.href = "../index.html") : "";
});


attendanceRadio.addEventListener("click", attendanceSelection);

addGuestBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal();
});

// ******************************************************************************
//  ******************************* @ WORK *******************************
// ******************************************************************************
