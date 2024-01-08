// // ******************************************************************************
// //  ******************************* IMPROVE *******************************
// // ******************************************************************************
// /*
   
// */

// // ******************************************************************************
// //  ******************************* VARIABLES *******************************
// // ******************************************************************************
// const presenceYes = document.querySelector("#presenceYes");
// const presenceNo = document.querySelector("#presenceNo");

// // ******************************************************************************
// //  ******************************* MAIN GUEST *******************************
// // ******************************************************************************
// const mainGuestContainer = document.getElementById('mainGuestContainer');
// const addGuestsBtn = document.getElementById('addGuests');
// // let guestsList = []; // <============================== gestion variable invités ??

// const mainGuestAdd = () => {
//     const mainGuestContainer = document.querySelector(".mainGuestContainer");
//     const guests = document.getElementById("guests");
//     const inputMainFirstname = document.getElementById("inputMainFirstname");
//     const inputMainLastname = document.getElementById("inputMainLastname");
//     const inputMainEmail = document.getElementById("inputMainEmail");
//     const mainGuestBtn = document.getElementById("mainGuestBtn");
//     const regMail = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
//     let mainGuestValid = false;
//     let errordisplay = null;

//     // Save mainGuest
//     const addMainGuest = () => {        
//         // affiche guests container et masque inputMainGuest
//         mainGuestContainer.style.display = "none";
//         guests.style.display = "";

//         // stocke les datas
//         const firstName = inputMainFirstname.value;
//         const lastName = inputMainLastname.value;
//         const email = inputMainEmail.value;
//         const fullname = `${firstName} ${lastName}`;
        
//         // ajoute data MainGuest à guests
//         const mainGuestName = document.getElementById("mainGuestName");
//         mainGuestName.textContent = fullname;
//         const mainGuestEmail = document.getElementById("mainGuestEmail");
//         mainGuestEmail.textContent = email;
//         // guestsList.push(fullname) // <============================== gestion variable invités ??
//         addGuestsBtn.style.display = "block"; 

//         // reinit du formulaire mainGuest
//         inputMainFirstname.value = "";
//         inputMainLastname.value = "";
//         inputMainEmail.value = "";
//     };

//     // verifie les input MainGuest
//     const validInput = () => {
//         if (errordisplay !== null) {
//             errordisplay.remove();
//             errordisplay = null;
//         }
//         if (
//             inputMainFirstname.value !== "" &&
//             inputMainLastname.value !== "" &&
//             regMail.test(inputMainEmail.value)
//         ) {
//             mainGuestBtn.classList.remove("unable");
//             mainGuestValid = true;
//         } else {
//             mainGuestBtn.classList.add("unable");
//             mainGuestValid = false;
//         }
//     };

//     // affichage message d'erreur sur input MainGuest
//     const displayError = () => {
//         mainGuestBtn.classList.add("shake");
//         setTimeout(() => mainGuestBtn.classList.remove("shake"), 300);
//         if (errordisplay === null) {
//             const error = document.createElement("p");
//             error.classList.add("errorDisplay");
//             error.textContent = "Informations manquantes";
//             mainGuestContainer.appendChild(error);
//             errordisplay = mainGuestContainer.querySelector(".errorDisplay");
//         }
//     };

//     // Ecoute des inputs
//     inputMainFirstname.addEventListener("input", validInput);
//     inputMainLastname.addEventListener("input", validInput);
//     inputMainEmail.addEventListener("input", validInput);

//     // Submit du mainGuest
//     mainGuestBtn.addEventListener("click", (e) => {
//         e.preventDefault();
//         mainGuestValid ? addMainGuest() : displayError();
//     });
// };

// const addGuests = () => {

//     const modal = document.querySelector('.modal');

//     addGuestsBtn.addEventListener('click', (e) => {
//         e.preventDefault()

//         // affiche la modale
//         modal.style.display = "block"
//         document.body.style.overflowY = "hidden";        
//     })

// }


// // ******************************************************************************
// //  ******************************* EVENTS *******************************
// // ******************************************************************************

// presenceYes.addEventListener("click", () => {
//     // desactive la séléction 'Oui' / 'Non'
//     presenceYes.setAttribute("disabled", "true");
//     presenceNo.setAttribute("disabled", "true");

//     // ouvre la div Main Guest
//     mainGuestContainer.style.display = "";
//     mainGuestAdd();
//     addGuests()
// });

// presenceNo.addEventListener("click", () => {
//     // desactive la séléction 'Oui' / 'Non'
//     presenceYes.setAttribute("disabled", "true");
//     presenceNo.setAttribute("disabled", "true");

//     // ouvre la div MainGuest
//     mainGuestContainer.style.display = "";
//     mainGuestAdd();
// });


// let guestsList = {}

// [
//     {
//         "firstname": "Eliott",  
//         "lastname": "Lesimple",  
//         "email": "elio@elio.fr",  
//     }, 
//     {
//         "firstname": "Katherine",  
//         "lastname": "Semennikova", 
//         "age" : "adult" 
//     },
//     {
//         "firstname": "de la dune de cristal",  
//         "lastname": "Berlioz", 
//         "age" : "child" 
//     }
// ]

