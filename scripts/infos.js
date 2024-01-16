const displayCardsPlaces = () => {
    const cards = document.querySelectorAll(".card");
    const closeButtons = document.querySelectorAll(".closeCard");

    // ouvre les cards
    cards.forEach((card) => {
        card.addEventListener("click", (e) => {
            const id = e.target.closest(".card").id;
            const card = document.getElementById(id);
            card.classList.add("open");
        });
    });

    // ferme les cards
    closeButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = e.currentTarget.dataset.id;
            const card = document.getElementById(id);
            card.classList.remove("open");
        });
    });
};
displayCardsPlaces()


const displayCardsTravel = () => {
    const travelCards = document.querySelectorAll('.travelCard');

    travelCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('open')
        })
    })

}
displayCardsTravel()