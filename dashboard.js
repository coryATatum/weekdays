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

const dropDownBtn = document.querySelector(".editDropDown");
const dropDown = document.querySelector(".dropdown-content");

dropDownBtn.addEventListener('click', run);

function run() {
    if (dropDown.style.display === "none") {
        dropDown.style.display = "block";
    } else {
        dropDown.style.display = "none";
    }

}



