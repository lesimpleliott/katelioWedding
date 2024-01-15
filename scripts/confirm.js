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
const emailSentMessage =
    "Votre réponse à bien était envoyée et un email de confirmation vous a été envoyé. Pensez à vérifier vos spams !";

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
let hostsData = [];
let optionsData = [];
let mealsData = [];
let messageData = null;

// Selection de la réponse : OUI / NON
const attendanceSelection = (e) => {
    if (e.target.tagName === "INPUT") {
        // change style de la section et titre
        const attendance = document.getElementById("attendance");
        attendance.style = "none";
        const attendanceTitle = document.querySelector(
            "#attendance .formSection__title"
        );
        attendanceTitle.style = "none";

        // on lance la function correspondante au choix
        const selectID = e.target.id;
        if (selectID === "attendanceYes") {
            response = true;
        } else {
            response = false;
        }

        // affiche mainGuestBox
        mainGuestBox.style = "none";
        mainGuestBox.scrollIntoView({ behavior: 'smooth' });
        addMainGuest();
    }
};
attendanceRadio.addEventListener("click", attendanceSelection);

// Ajout du mainGuest
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

// affiche le formulaire correspondant à la réponse
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
        hosts();
        hostOptions();

        // affiche repas
        meal.style = "none";

        // affiche la section Message
        message.style = "";
        messageSubtitle.innerHTML = ""
        messageYes.forEach((text) => {
            const newText = document.createElement("p");
            newText.textContent = text;
            messageSubtitle.appendChild(newText);
        });
    } else {
        // affiche la section Message
        message.style = "";
        messageSubtitle.innerHTML = ""
        messageNo.forEach((text) => {
            const newText = document.createElement("p");
            newText.textContent = text;
            messageSubtitle.appendChild(newText);
        });
    }

    // affiche le bouton de submit du formulaire
    submitForm.style = "none";
};

// Secondary Guests
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
            // mets à jour le tarif des nuits 
            addNight()
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

        // mets à jour le tarif des nuits 
        addNight()
    });
};
addGuestBtn.addEventListener("click", addGuests);

// MODALE
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

// ******************************************************************************
//  ****************************** FONCTION HOSTS ******************************
const addNight = () => {
    const nights = ['thursdayNight', 'fridayNight', 'saturdayNight', 'sundayNight', 'mondayNight'];
    const numberOfNights = document.getElementById("numberOfNights");
    const hostPrice = document.getElementById("hostPrice");
    let weekendNight = 0;
    let extraNight = 0;
    let night = 0;

    nights.forEach(day => {
        const checkbox = document.getElementById(day);
        if (checkbox.checked) {
            night++;
            if (['thursdayNight', 'mondayNight'].includes(day)) {
                extraNight++;
            } else {
                weekendNight = 1;
            }
        }
    });

    // Affiche le résultat
    numberOfNights.textContent = night;
    hostPrice.textContent = (weekendNight * 100 + extraNight * 35) * guestlist.length || 0;
};

const hosts = () => {
    const nights = ['thursdayNight', 'fridayNight', 'saturdayNight', 'sundayNight', 'mondayNight'];

    nights.forEach(day  => {
        const checkbox = document.getElementById(day);
        checkbox.addEventListener("change", addNight);
    })
};

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
    const towel = document.getElementById("towel");
    const travelCot = document.getElementById("travelCot");
    const babyChair = document.getElementById("babyChair");

    // gère les inputs checkbox
    const selectOption = () => {
        towel.checked ? (towelQuantity.value = Math.max(1, towelQuantity.value)) : (towelQuantity.value = 0);
        travelCot.checked ? (travelCotQuantity.value = Math.max(1, travelCotQuantity.value)) : (travelCotQuantity.value = 0);
        babyChair.checked ? (babyChairQuantity.value = Math.max(1, babyChairQuantity.value)) : (babyChairQuantity.value = 0);
        updateOptions();
    };

    towel.addEventListener("input", selectOption);
    travelCot.addEventListener("input", selectOption);
    babyChair.addEventListener("input", selectOption);

    // Ajoute les écouteurs d'événements aux boutons +/- uantité
    const quantityOption = (input, minusBtn, object, plusBtn, updateFunction) => {
        plusBtn.addEventListener("click", (e) => {
            e.preventDefault();
            object.stepUp();
            // uncheckd l'input lorsue l'on arrive à 0
            input.checked = object.value > 0;
            updateFunction();
        });
        minusBtn.addEventListener("click", (e) => {
            e.preventDefault();
            // Vérifie si la valeur actuelle est à zéro, sinon décrémente
            object.value = Math.max(0, object.value - 1);
            // uncheckd l'input lorsue l'on arrive à 0
            input.checked = object.value > 0;

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
    quantityOption(towel, towelMinus, towelQuantity, towelPlus, updateOptions);
    quantityOption(travelCot,travelCotMinus,travelCotQuantity,travelCotPlus,updateOptions);
    quantityOption(babyChair,babyChairMinus,babyChairQuantity,babyChairPlus,updateOptions);

    towelQuantity.addEventListener("input", updateOptions);
    travelCotQuantity.addEventListener("input", updateOptions);
    babyChairQuantity.addEventListener("input", updateOptions);
};

// ******************************************************************************
//  **************************** RECAP AND SUBMIT ****************************

/* SmtpJS.com - v3.0.0 */
const Email = {
    send: function (a) {
        return new Promise(function (n, e) {
            (a.nocache = Math.floor(1e6 * Math.random() + 1)),
                (a.Action = "Send");
            var t = JSON.stringify(a);
            Email.ajaxPost(
                "https://smtpjs.com/v3/smtpjs.aspx?",
                t,
                function (e) {
                    n(e);
                }
            );
        });
    },
    ajaxPost: function (e, n, t) {
        var a = Email.createCORSRequest("POST", e);
        a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
            (a.onload = function () {
                var e = a.responseText;
                null != t && t(e);
            }),
            a.send(n);
    },
    ajax: function (e, n) {
        var t = Email.createCORSRequest("GET", e);
        (t.onload = function () {
            var e = t.responseText;
            null != n && n(e);
        }),
            t.send();
    },
    createCORSRequest: function (e, n) {
        var t = new XMLHttpRequest();
        return (
            "withCredentials" in t
                ? t.open(e, n, !0)
                : "undefined" != typeof XDomainRequest
                ? (t = new XDomainRequest()).open(e, n)
                : (t = null),
            t
        );
    },
};

const sendEmail = (email, subject, body) => {
    Email.send({
        SecureToken: "e13bdadc-8899-4507-ade2-cabd9d7d46f4",
        To: email,
        Bcc: "rsvp@katelio.fr",
        From: "RSVP - Katherine & Eliott <rsvp@katelio.fr>",
        Subject: subject,
        Body: body,
    }).then((message) => {
        if (message === "OK") {
            alert(emailSentMessage);
        }
    });
};

submitForm.addEventListener("click", (e) => {
    e.preventDefault();
    let subject;
    let body;

    // récupère l'ensemble des datas
    const mainGuestFirstname = guestlist[0].firstname;
    const mainGuestLastname = guestlist[0].lastname;
    const mainGuestEmail = guestlist[0].email;
    let guests = "";
    guestlist.forEach((guest, i) => {
        if (guest !== null) {
            guests +=
                i === 0
                    ? `Invité ${i + 1} - ${guest.firstname} / ${
                          guest.lastname
                      } / ${guest.age}`
                    : `<br>Invité ${i + 1} - ${guest.firstname} / ${
                          guest.lastname
                      } / ${guest.age}`;
        }
    });
    const fridayNight = document.getElementById("fridayNight").checked;
    const saturdayNight = document.getElementById("saturdayNight").checked;
    const sundayNight = document.getElementById("sundayNight").checked;

    const towel = document.getElementById("towel").checked;
    const towelValue = document.getElementById("towelQuantity").value;
    const travelCot = document.getElementById("travelCot").checked;
    const travelCotValue = document.getElementById("travelCotQuantity").value;
    const babyChair = document.getElementById("babyChair").checked;
    const babyChairValue = document.getElementById("babyChairQuantity").value;
    const fridayDinner = document.getElementById("fridayDinner").checked;
    const saturdayDinner = document.getElementById("saturdayDinner").checked;
    const sundayBrunch = document.getElementById("sundayBrunch").checked;
    const sundayDinner = document.getElementById("sundayDinner").checked;
    const messageForm = document.getElementById("messageForm").value;

    // construction de l'objet
    response
        ? (subject = `[RSVP - YES] - ${mainGuestFirstname} ${mainGuestLastname}`)
        : (subject = `[RSVP - NO] - ${mainGuestFirstname} ${mainGuestLastname}`);

    // construction du body
    if (response) {
        body = `
Présence : Oui
<br>---------------------------
<br>Prénom : ${mainGuestFirstname}
<br>Nom : ${mainGuestLastname}
<br>email : ${mainGuestEmail}
<br>---------------------------
<br>${guests}
<br>---------------------------
<br>Nuit de vendredi 17 : ${fridayNight}
<br>Nuit de samedi 18 : ${saturdayNight}
<br>Nuit de dimanche 19 : ${sundayNight}
<br>-- 
<br>Serviette : ${towel} - ${towelValue}
<br>Lit parapluie : ${travelCot} - ${travelCotValue}
<br>Chaise bébé : ${babyChair} - ${babyChairValue}
<br>---------------------------
<br>Repas vendredi - diner : ${fridayDinner}
<br>Repas samedi - cocktail + diner : ${saturdayDinner}
<br>Repas dimanche - brunch : ${sundayBrunch}
<br>Repas dimanche - surprise party : ${sundayDinner}
<br>---------------------------
<br>Message : 
<br>${messageForm}
`;
    } else {
        body = `
Présence : Non
<br>---------------------------
<br>Prénom : ${mainGuestFirstname}
<br>Nom : ${mainGuestLastname}
<br>email : ${mainGuestEmail}
<br>---------------------------
<br>Message : 
<br>${messageForm}
`;
    }

    // // pour betaTest -- A Supprimer 
    // console.log(mainGuestEmail);
    // console.log(subject);
    // console.log(body);
    // alert(emailSentMessage);

    // envoi de l'email -- A activer pour deploiement 
    sendEmail(mainGuestEmail, subject, body);
});

