// ******************************************************************************
//  ******************************* IMPROVE *******************************
/*
   - radio Attendance // Ajouter un bouton Reset Formulaire
   - attendance : lorsque je clique sur l'input attendance cela affiche le mainGuestBox et scroll pour afficher celui-ci en haut de la page
   - input text : revoir le style (color bg ...) quand input value !== ""
*/

// ******************************************************************************
//  ******************************* TEXTES *******************************
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
//  **************************** FONCTION USEFULL ****************************
const shakeButton = (btn) => {
    btn.classList.add("shake");
    setTimeout(() => btn.classList.remove("shake"), 300);
};

// ******************************************************************************
//  ********************************* GUESTS *********************************
const attendanceRadio = document.getElementById("attendanceRadio");
const mainGuestBtn = document.getElementById("mainGuestBtn");
const addGuestBtn = document.getElementById("addGuestBtn");
const submitForm = document.getElementById("submitForm");
const mainGuestBox = document.getElementById("mainGuestBox");
let response = null;
let guestlist = [];
let hosts = []; 
let options = [];
let meals = []; 
let message = null;


const attendanceSelection = (e) => {
    if (e.target.tagName === "INPUT") {
        // change style de la section et titre
        const attendance = document.getElementById("attendance");
        attendance.style = "none";
        const attendanceTitle = document.querySelector(
            "#attendance .formSection__title"
        );
        attendanceTitle.style = "none";

        // // Désactive l'écouteur d'événement
        // attendanceRadio.removeEventListener("click", attendanceSelection);

        // on lance la function correspondante au choix
        const selectID = e.target.id;
        if (selectID === "attendanceYes") {
            response = true;
            const attendanceNo = document.getElementById("attendanceNo");
        } else {
            response = false;
            const attendanceYes = document.getElementById("attendanceYes");
        }

        // affiche mainGuestBox
        mainGuestBox.style = "none";
        addMainGuest();
    }
};

const addMainGuest = () => {
    const inputMainFirstname = document.getElementById("inputMainFirstname");
    const inputMainLastname = document.getElementById("inputMainLastname");
    const inputMainEmail = document.getElementById("inputMainEmail");
    const displayError = document.querySelector("#mainGuestBox .displayError");
    const regMail = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
    const guestsListBox = document.getElementById("guestsListBox");
    const mainGuestBox = document.getElementById("mainGuestBox");
    let validDataMainGuest = null;

    // vérifie le formulaire mainGuest
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
    const submitMainGuest = (e) => {
        e.preventDefault();
        if (validDataMainGuest) {
            // stock la data dans la variable guestlist
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
            guestlist.push(mainGuestData);

            // affiche le mainGuest
            const mainGuestName = document.getElementById("mainGuestName");
            const mainGuestEmail = document.getElementById("mainGuestEmail");
            guestsListBox.style = "";
            mainGuestBox.style.display = "none";
            mainGuestName.textContent = `${firstname} ${lastname}`;
            mainGuestEmail.textContent = email;

            // arrete les listeners relatifs à mainGuest
            inputMainFirstname.removeEventListener("input", validMainGuestData);
            inputMainLastname.removeEventListener("input", validMainGuestData);
            inputMainEmail.removeEventListener("input", validMainGuestData);
            mainGuestBtn.removeEventListener("click", submitMainGuest);

            // // affiche la suite !
            displayFullForm(response);

            // Désactive le radio attendance
            attendanceRadio.removeEventListener("click", attendanceSelection);
            attendanceNo.disabled = "true";
            attendanceYes.disabled = "true";
        } else {
            displayError.textContent = "Information(s) manquante(s)";
            shakeButton(mainGuestBtn);
        }
    };
    mainGuestBtn.addEventListener("click", submitMainGuest);
};

const displayFullForm = (reponse) => {
    const host = document.getElementById("host");
    const meal = document.getElementById("meal");
    const message = document.getElementById("message");
    const messageSubtitle = document.getElementById("messageSubtitle");

    // affiche les éléments du formYes ou formNo
    if (response) {
        // affiche le bouton addGuest
        addGuestBtn.style = "none";
        shakeButton(addGuestBtn);

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
    } else {
        // affiche la section Message
        message.style = "";
        messageNo.forEach((text) => {
            const newText = document.createElement("p");
            newText.textContent = text;
            messageSubtitle.appendChild(newText);
        });
    }

    // affiche le bouton de submit du formulaire
    submitForm.style = "none";
};

const addGuests = (e) => {
    e.preventDefault();

    // gestion de la modale
    displayGuestModal();

    const childRadio = document.getElementById("child");
    const adultRadio = document.getElementById("adult");
    const inputGuestLastname = document.getElementById("inputGuestLastname");
    const inputGuestFirstname = document.getElementById("inputGuestFirstname");
    const saveGuestBtn = document.getElementById("saveGuestBtn");
    const modalDisplayError = document.querySelector(
        ".guestsBtnContainer .displayError"
    );
    let selectedAge = null;

    // verifie les données
    const validGuestsData = () => {
        modalDisplayError.textContent = "";
        if (
            inputGuestFirstname.value !== "" &&
            inputGuestLastname.value !== "" &&
            (adultRadio.checked || childRadio.checked)
        ) {
            saveGuestBtn.classList.remove("unable");
            adultRadio.checked
                ? (selectedAge = adultRadio.value)
                : (selectedAge = childRadio.value);
        } else {
            saveGuestBtn.classList.add("unable");
        }
    };
    childRadio.addEventListener("input", validGuestsData);
    adultRadio.addEventListener("input", validGuestsData);
    inputGuestLastname.addEventListener("input", validGuestsData);
    inputGuestFirstname.addEventListener("input", validGuestsData);

    // Submit
    saveGuestBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (!saveGuestBtn.classList.contains("unable")) {
            submitGuest(selectedAge);
        } else {
            shakeButton(saveGuestBtn);
            modalDisplayError.textContent = "Information(s) manquante(s)";
        }
    });
};

const submitGuest = (selectedAge) => {
    const inputGuestLastname = document.getElementById("inputGuestLastname");
    const inputGuestFirstname = document.getElementById("inputGuestFirstname");
    const guestFirstname = inputGuestFirstname.value;
    const guestLastname = inputGuestLastname.value;
    const guestID = Math.floor(Date.parse(new Date()) / 100);

    // stock la data dans dataGuests
    let guestData = {
        firstname: guestFirstname,
        lastname: guestLastname,
        age: selectedAge,
        guestId: guestID,
    };
    guestlist.push(guestData);
    console.log(guestlist);

    // affiche l'invité dans guestBox
    guestsListBox.insertAdjacentHTML(
        "beforeend",
        `
        <div class="cardConfirm__section guests" id="guest${guestID}">
            <p>${guestFirstname} ${guestLastname}</p>
            <button class="deleteBtn" data-guest="${guestID}">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
        `
    );

    // appelle la fonction de suppression
    deleteGuest(guestID);

    // ferme la modale
    closeModal();
};

const deleteGuest = (guestID) => {
    const deleteBtn = document.querySelector(`button[data-guest="${guestID}"]`);

    deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        // supprime l'invité de guestList
        let newGuestList = guestlist.filter(
            (guest) => guest.guestId !== guestID
        );
        guestlist = newGuestList;
        console.log(guestlist);

        // supprime l'invité visuellement
        const elementToDelete = document.getElementById(`guest${guestID}`);
        elementToDelete.remove();
    });
};

const displayGuestModal = () => {
    const addGuestsModal = document.getElementById("addGuestsModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const modalDisplayError = document.querySelector(
        ".guestsBtnContainer .displayError"
    );

    // affiche la modale
    addGuestsModal.style = "none";
    document.body.style.overflowY = "hidden";
    document.querySelector("main").style.filter = "blur(5px)";
    document.querySelector("header").style.filter = "blur(5px)";
    modalDisplayError.textContent = "";

    // fermeture de la modale
    closeModalBtn.addEventListener("click", closeModal);
    window.addEventListener("keydown", closeModalEscapce);
    window.addEventListener("click", closeModalClickOutside);
};
const closeModalEscapce = (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal();
    }
};
const closeModalClickOutside = (e) => {
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
    const closeModalBtn = document.getElementById("closeModalBtn");
    const saveGuestBtn = document.getElementById("saveGuestBtn");

    // fermeture de la modal
    addGuestsModal.style.display = "none";
    document.body.style.overflowY = "";
    document.querySelector("main").style = "none";
    document.querySelector("header").style = "none";

    // reset des input de la modale
    adultRadio.checked = false;
    childRadio.checked = false;
    inputGuestFirstname.value = "";
    inputGuestLastname.value = "";
    saveGuestBtn.classList.add("unable");

    // arrete les eventListener de la modal
    closeModalBtn.removeEventListener("click", closeModal);
    window.removeEventListener("keydown", closeModalEscapce);
    window.removeEventListener("click", closeModalClickOutside);
};

// reponse Yes/No + invité 'principal'
attendanceRadio.addEventListener("click", attendanceSelection);
// ajouter des invités + suppression invités
addGuestBtn.addEventListener("click", addGuests);

// ******************************************************************************
//  ****************************** FONCTION HOSTS ******************************


const hostOptions = () => {
    const towelMinus = document.getElementById("towelMinus");
    const towelPlus = document.getElementById("towelPlus");
    const travelCotMinus = document.getElementById("travelCotMinus");
    const travelCotPlus = document.getElementById("travelCotPlus");
    const babyChairMinus = document.getElementById("babyChairMinus");
    const towelQuantity = document.getElementById("towelQuantity");
    const travelCotQuantity = document.getElementById("travelCotQuantity");
    const babyChairQuantity = document.getElementById("babyChairQuantity");
    const babyChairPlus = document.getElementById("babyChairPlus");

    // Ajoute les écouteurs d'événements aux boutons personnalisés
    const quantityOption = (minusBtn, object, plusBtn, updateFunction) => {
        plusBtn.addEventListener("click", (e) => {
            e.preventDefault();
            object.stepUp();
            updateFunction();
        });
        minusBtn.addEventListener("click", (e) => {
            e.preventDefault();
            // Vérifie si la valeur actuelle est déjà à zéro, sinon décrémente
            object.value = Math.max(0, object.value - 1);
            updateFunction();
        });
    };
    const updateOptions = () => {
        const totalOptions = document.getElementById("totalOptions");
    
        // affiche le resultat 
        let towelPrice = parseInt(towelQuantity.value) * 5;
        let travelCotPrice = parseInt(travelCotQuantity.value) * 15;
        let babyChairPrice = parseInt(babyChairQuantity.value) * 15;
        let fullPrice = towelPrice + travelCotPrice + babyChairPrice;
        totalOptions.textContent = fullPrice;     
    };
    quantityOption(towelMinus, towelQuantity, towelPlus, updateOptions);
    quantityOption(travelCotMinus, travelCotQuantity, travelCotPlus, updateOptions);
    quantityOption(babyChairMinus, babyChairQuantity, babyChairPlus, updateOptions);

    // Ajoute les écouteurs d'événements pour les changements de valeur des inputs
    towelQuantity.addEventListener("input", updateOptions);
    travelCotQuantity.addEventListener("input", updateOptions);
    babyChairQuantity.addEventListener("input", updateOptions);
};



hostOptions();

// ******************************************************************************
//  ****************************** FONCTION MEALS ******************************

// ******************************************************************************
//  ******************************* EVENTS *******************************
// verifie le log au chargement de la page
window.addEventListener("load", () => {
    let isLogged = false;
    isLogged = sessionStorage.getItem("isLogged");
    !isLogged ? (window.location.href = "../index.html") : "";
});
