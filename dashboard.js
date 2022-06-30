const openBtn = document.querySelector('.cardAdd');
const closeBtn = document.querySelector('#close');
const modal = document.querySelector('.modal');

openBtn.addEventListener('click', openModal);

function openModal() {
    modal.style.display = 'grid'
};

closeBtn.addEventListener('click', closeModal);

function closeModal() {
    modal.style.display = 'none'
};

modal.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal')) {
        closeModal();
    }
});





