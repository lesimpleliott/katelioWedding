const cards = document.querySelectorAll('.card');
const closeButtons = document.querySelectorAll('.closeCard');



// ouvre les cards
cards.forEach(card => {
    card.addEventListener('click', (e) => {
        const id = e.target.closest('.card').id
        const card = document.getElementById(id);
        card.classList.add('open')
    })
})

// ferme les cards
closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation()
        console.log(e.target)

    })
})

