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

const dropDownBtn = document.getElementById('todo-editBtn');
const dropDownBtn2 = document.getElementById('doing-editBtn');
const dropDownBtn3 = document.getElementById('done-editBtn');
const dropDown = document.getElementById('todo-dropdown');
const dropDownTwo = document.getElementById('doing-dropdown');
const dropDownThree = document.getElementById('done-dropdown');

dropDownBtn.addEventListener('click', todoToggle);
dropDownBtn2.addEventListener('click', doingToggle);
dropDownBtn3.addEventListener('click', doneToggle);

function todoToggle() {
    if (dropDown.style.display === "none") {
        dropDown.style.display = "block";
    } else {
        dropDown.style.display = "none";
    }
}

function doingToggle() {
    if (dropDownTwo.style.display === "none") {
        dropDownTwo.style.display = "block";
    } else {
        dropDownTwo.style.display = "none";
    }
}

function doneToggle() {
    if (dropDownThree.style.display === "none") {
        dropDownThree.style.display = "block";
    } else {
        dropDownThree.style.display = "none";
    }
}



