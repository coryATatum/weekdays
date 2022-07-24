let form = document.getElementById("form");
let addTask = document.getElementById("submit")
let input = document.getElementById("content");
let desc = document.getElementById("description")
let due_date = document.getElementById("date");
let posts = document.querySelector(".toDoContainer");
let remove = document.getElementById('discard');
let toDoBg = document.querySelector('toDo');
let progressBar = document.getElementById('progressResult');
let tally = "0";

//-------------------To Do---------------------------------//
form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
    tallyResult();


});



function tallyResult() {

    tally++;
    localStorage.setItem('tally', JSON.stringify(tally));
    tallyData = (JSON.parse(window.localStorage.getItem('tally')));
    progressBar.innerHTML = Number(tallyData);

}


let formValidation = () => {
    if (input.value === "") {
        posts.innerHTML = "Post cannot be blank";
        alert("Please enter task title.");
    } else {
        posts.innerHTML = "";
        acceptData();
    }
};

let data = {};


let acceptData = () => {
    data.push({
        title: input.value,
        desciption: desc.value,
        dueDate: date.value,
    });


    localStorage.setItem("data", JSON.stringify(data));



    createPost();

};


let createPost = () => {
    posts.innerHTML = "";
    data.map((x, y) => {
        return (posts.innerHTML += `
        <div id=${y} class="task-card" draggable="true">
        <div class="task-title">
            <h3>${x.title}</h3>
        </div>
        <div class="task-desc"><span>${x.desciption}</span></div>
        <div class="due-date"><strong>Due Date:</strong>${x.dueDate}
            <div class="delete_editIcons">
                <i onClick="editTask(this);" class=" fas fa-edit"></i>
                <i onClick="deleteTask(this); createTasks();" id="discard"
                    class="fas fa-trash-alt"></i>
            </div>
        </div>
    </div>
                                
    `);

    });

    formReset();
};

let formReset = () => {
    input.value = "";
    desc.value = "";
    date.value = "";
};

let editTask = (e) => {
    let modal = document.querySelector('.modal');
    let selectedTask = e.parentElement;

    modal.style.display = 'grid';



    input.value = selectedTask.children[0].innerHTML;
    desc.value = selectedTask.children[1].innerHTML;
    data.value = selectedTask.children[2].innerHTML;

    deleteTask(e);
    createPost(e);
};

let deleteTask = (e) => {
    e.parentElement.parentElement.parentElement.remove();

    data.splice(e.parentElement.parentElement.id, 1);

    localStorage.setItem("data", JSON.stringify(data));
    discard(e);
};



function discard() {

    tally--;
    localStorage.setItem('tally', JSON.stringify(tally));
    tallyData = (JSON.parse(window.localStorage.getItem('tally')));
    progressBar.innerHTML = tallyData;
}

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    tallyData = (JSON.parse(window.localStorage.getItem('tally'))) || "0";
    createPost();
    tallyResult();
    discard();


})()

//----------------------------Drag and Drop---------------------//


const draggables = document.querySelectorAll('.task-card')
const containers = document.querySelectorAll('.container')

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
        removeItem(data);
    })

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
})

containers.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientY)
        const draggable = document.querySelector('.dragging')
        if (afterElement == null) {
            container.appendChild(draggable)
        } else {
            container.insertBefore(draggable, afterElement)
        }
    })

})

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}

//----------------USER DASH------------------------//

let menuIcon = document.getElementById('menu');
let userDashboard = document.querySelector('.userDash');
let closeIcon = document.getElementById('menuClose');

menuIcon.addEventListener('click', dashOpen)

function dashOpen() {
    userDashboard.style.display = 'block';
    menuIcon.style.display = 'none';
}

closeIcon.addEventListener('click', dashClose)

function dashClose() {
    userDashboard.style.display = 'none';
    menuIcon.style.display = 'block';
}

//----------------Nav Bar------------------//

let todoPage = document.getElementById('todoPage');
let activity = document.querySelector('.activity');
let homepage = document.querySelector('.home');

todoPage.addEventListener('click', openToDo)

function openToDo() {
    activity.style.display = 'block';
    calPage.style.display = 'none'
    homepage.style.display = 'none';

}

//--------------------Calender-------------//

let calPage = document.querySelector('.cal');
let calOpenBtn = document.getElementById('calBtn');

calOpenBtn.addEventListener('click', openCal);

function openCal() {
    homepage.style.display = 'none'
    calPage.style.display = 'block'
    activity.style.display = 'none'
}



let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date) {
    clicked = date;

    const eventForDay = events.find(e => e.date === clicked);

    if (eventForDay) {
        document.getElementById('eventText').innerText = eventForDay.title;
        deleteEventModal.style.display = 'block';
    } else {
        newEventModal.style.display = 'block';
    }

    backDrop.style.display = 'block';
}

function load() {
    const dt = new Date();

    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    document.getElementById('monthDisplay').innerText =
        `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

    calendar.innerHTML = '';

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        const dayString = `${month + 1}/${i - paddingDays}/${year}`;

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;
            const eventForDay = events.find(e => e.date === dayString);

            if (i - paddingDays === day && nav === 0) {
                daySquare.id = 'currentDay';
            }

            if (eventForDay) {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventForDay.title;
                daySquare.appendChild(eventDiv);
            }

            daySquare.addEventListener('click', () => openModal(dayString));
        } else {
            daySquare.classList.add('padding');
        }

        calendar.appendChild(daySquare);
    }
}

function closeModal() {
    eventTitleInput.classList.remove('error');
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    eventTitleInput.value = '';
    clicked = null;
    load();
}

function saveEvent() {
    if (eventTitleInput.value) {
        eventTitleInput.classList.remove('error');

        events.push({
            date: clicked,
            title: eventTitleInput.value,
        });

        localStorage.setItem('events', JSON.stringify(events));
        closeModal();
    } else {
        eventTitleInput.classList.add('error');
    }
}

function deleteEvent() {
    events = events.filter(e => e.date !== clicked);
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });

    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });

    document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeModal);
    document.getElementById('deleteButton').addEventListener('click', deleteEvent);
    document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load();










