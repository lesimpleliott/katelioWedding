function addGuest() {
    const buttonAdult = document.getElementById('buttonAddAdult');
    const buttonChild = document.getElementById('buttonAddChild');

    buttonAdult.addEventListener('click', () => {
        console.log('click Adulte');
        showGuestInfos()
        validGuest()
    })
    buttonChild.addEventListener('click', () => {
        console.log('click Enfant');
        showGuestInfos()
        validGuest()
    })
}



function showGuestInfos() {
    const card = document.getElementById('guest-infos');
    const inputFirstName = document.createElement('input');
    const inputLastName = document.createElement('input');
    const validGuest = document.createElement('div');
    
    if (!card.classList.contains("card")) {
        // Ajoute la class CARD
        card.classList.add("card");
        
        // Crée les éléments input
        inputFirstName.type = 'text';
        inputFirstName.id = 'inputFirstName';
        inputFirstName.placeholder = 'Prénom';
        inputFirstName.required = true;
        
        inputLastName.type = 'text';
        inputLastName.id = 'inputLastName';
        inputLastName.placeholder = 'Nom';
        inputLastName.required = true;
        
        // Crée le bouton valider
        validGuest.id = 'validGuest';
        validGuest.classList.add('addButton');
        validGuest.textContent = 'Valider';
        
        // Ajoute les éléments à la CARD GuestInfos 
        card.appendChild(inputFirstName);
        card.appendChild(inputLastName);
        card.appendChild(validGuest);
    }
}

function validGuest() {
    const validButton = document.getElementById('validGuest');
    const card = document.getElementById('guest-infos');
    const inputFirstName = document.getElementById('inputFirstName');
    const inputLastName = document.getElementById('inputLastName');
    
    validButton.addEventListener('click', () => {
        let prenom = inputFirstName.value
        let nom = inputLastName.value

        saveGuestSumUp(prenom, nom)

        // supprime la class CARD
        card.classList.remove("card");

        // Supprime les éléments de la CARD GuestInfos 
        while (card.firstChild) {
            card.removeChild(card.firstChild);
        }    
    })
}
    

function saveGuestSumUp(prenom, nom) {
    const guestsList = document.getElementById('guests-list');


    if (!guestsList.classList.contains("card")) {
        guestsList.classList.add("card")
    }
    
    console.log(`${prenom} ${nom}`);
}






addGuest()
