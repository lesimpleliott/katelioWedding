// ******************************************************************************
//  ******************************* IMPROVE *******************************
// ******************************************************************************
/*
   
*/

// ******************************************************************************
//  ******************************* VARIABLES *******************************
// ******************************************************************************
const presenceYes = document.querySelector("#presenceYes");
const presenceNo = document.querySelector("#presenceNo");
const mainGuestContainer = document.querySelector(".mainGuestContainer");

// ******************************************************************************
//  ******************************* FONCTIONS *******************************
// ******************************************************************************

const mainGuestAdd = () => {
    const mainGuestContainer = document.querySelector(".mainGuestContainer");
    const guests = document.getElementById("guests");
    const inputMainFirstname = document.getElementById("inputMainFirstname");
    const inputMainLastname = document.getElementById("inputMainLastname");
    const inputMainEmail = document.getElementById("inputMainEmail");
    const mainGuestBtn = document.getElementById("mainGuestBtn");
    const regMail = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
    let mainGuestValid = false;
    let errordisplay = null;

    // Save mainGuest
    const addMainGuest = () => {
        const mainGuestName = document.getElementById("mainGuestName");
        const mainGuestEmail = document.getElementById("mainGuestEmail");
        const firstName = inputMainFirstname.value;
        const lastName = inputMainLastname.value;
        const email = inputMainEmail.value;
        const fullname = `${firstName} ${lastName}`;

        // affiche guests container et masque inputMainGuest
        mainGuestContainer.style.display = "none";
        guests.style.display = "";

        // ajoute data MainGuest à guests
        mainGuestName.textContent = fullname;
        mainGuestEmail.textContent = email;

        // reinit du formulaire mainGuest
        inputMainFirstname.value = "";
        inputMainLastname.value = "";
        inputMainEmail.value = "";
    };

    // verifie les input MainGuest
    const validInput = () => {
        if (errordisplay !== null) {
            errordisplay.remove();
            errordisplay = null;
        }

        if (
            inputMainFirstname.value !== "" &&
            inputMainLastname.value !== "" &&
            regMail.test(inputMainEmail.value)
        ) {
            mainGuestBtn.classList.remove("unable");
            mainGuestValid = true;
        } else {
            mainGuestBtn.classList.add("unable");
            mainGuestValid = false;
        }
    };

    // affichage message d'erreur sur input MainGuest
    const displayError = () => {
        mainGuestBtn.classList.add("shake");
        setTimeout(() => mainGuestBtn.classList.remove("shake"), 300);
        if (errordisplay === null) {
            const error = document.createElement("p");
            error.classList.add("errorDisplay");
            error.textContent = "Informations manquantes";
            mainGuestContainer.appendChild(error);
            errordisplay = mainGuestContainer.querySelector(".errorDisplay");
            console.log(errordisplay);
        }
    };

    // Ecoute des inputs
    inputMainFirstname.addEventListener("input", validInput);
    inputMainLastname.addEventListener("input", validInput);
    inputMainEmail.addEventListener("input", validInput);

    // Submit du mainGuest
    mainGuestBtn.addEventListener("click", (e) => {
        e.preventDefault();
        mainGuestValid ? addMainGuest() : displayError();
    });
};

// ******************************************************************************
//  ******************************* EVENTS *******************************
// ******************************************************************************

presenceYes.addEventListener("click", () => {
    mainGuestContainer.style.display = "";
    mainGuestAdd();
});

presenceNo.addEventListener("click", () => {
    mainGuestContainer.style.display = "";
    mainGuestAdd();
});
