
let todo_modal = document.querySelector('.modal')
let form = document.getElementById("form");
let addTask = document.getElementById("submit")
let input = document.getElementById("content");
let desc = document.getElementById("description")
let due_date = document.getElementById("date");
let posts = document.querySelector(".toDoContainer");
let remove = document.getElementById('discard');
let toDoBg = document.querySelector('toDo');
let progressBar = document.getElementById('progressResult');
let homePage = document.querySelector('.homePage')

//-------------------To Do---------------------------------//
form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
    todo_modal.style.display = 'none'
});

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
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    tallyData = (JSON.parse(window.localStorage.getItem('tally'))) || "0";
    createPost();
})()
//----------------Nav Bar------------------//

let todoPage = document.getElementById('todoPage');
let activity = document.querySelector('.activity');
let homepage = document.querySelector('.home');
let hpBtn = document.getElementById('homeBtn')
let calPage = document.querySelector('.cal');
let calOpenBtn = document.getElementById('calBtn');
let stickNotesPage = document.querySelector('.stickyNotes');
let stickyNoteBtn = document.getElementById('stickNotes');
let logoutBtn = document.getElementById('logoutBtn');
const mq = window.matchMedia("(max-width: 600px)");

window.onload = mediaLoad();

function mediaLoad() {
    if (mq.matches) {
        document.querySelector('.mediaHomePage').style.display = 'block';
        document.querySelector('.landing').style.display = 'none';
    } else {
        document.querySelector('.mediaHomePage').style.display = 'none';
    }
}

document.getElementById('beginBtn').addEventListener('click', scroll)

function scroll() {
    document.querySelector('.landing').style.display = 'block';
    document.querySelector('.mediaHomePage').style.display = 'none';
}

hpBtn.addEventListener('click', openHome)

function openHome() {
    homepage.style.display = 'block'
    homePage.style.display = 'block'
    activity.style.display = 'none';
    calPage.style.display = 'none'
    stickNotesPage.style.display = 'none';

}

todoPage.addEventListener('click', openToDo)

function openToDo() {
    activity.style.display = 'block';
    calPage.style.display = 'none'
    homepage.style.display = 'none';
    stickNotesPage.style.display = 'none';
    homePage.style.display = 'none'

}

calOpenBtn.addEventListener('click', openCal);

function openCal() {
    stickNotesPage.style.display = 'none'
    homepage.style.display = 'none'
    calPage.style.display = 'block'
    activity.style.display = 'none'
    homePage.style.display = 'none'
}

stickyNoteBtn.addEventListener('click', openStickyNote);

function openStickyNote() {
    stickNotesPage.style.display = 'block'
    homepage.style.display = 'none'
    calPage.style.display = 'none'
    activity.style.display = 'none'
    homePage.style.display = 'none'
}



//--------------------Calender-------------//


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

//----------------------------Sticky Notes --------------------------//

var random_margin = ["-5px", "1px", "5px", "10px", "7px"];
var random_colors = ["#a26360", "#d4a29c", "#e8b298", "#edcc8b", "#bdd1c5", "#9daaa2"];
var random_degree = ["rotate(3deg)", "rotate(1deg)", "rotate(-1deg)", "rotate(-3deg)", "rotate(-5deg)", "rotate(-8deg)"];
var index = 0;
let stickyModal = document.getElementById('stickyModal');


window.onload = document.querySelector("#user_input").select();

document.querySelector("#add_note").addEventListener("click", () => {
    document.querySelector("#stickyModal").style.display = "block";
    homePage.style.display = 'none'
});

document.querySelector("#hide").addEventListener("click", () => {
    document.querySelector("#stickyModal").style.display = "none";

});

document.querySelector("#user_input").addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const text = document.querySelector("#user_input");
        createStickyNote(text.value);
        stickyModal.style.display = 'none'
    }
});

createStickyNote = (text) => {
    let note = document.createElement("div");
    let details = document.createElement("div");
    let noteText = document.createElement("h1");

    note.className = "note";
    details.className = "details";
    noteText.textContent = text;

    details.appendChild(noteText);
    note.appendChild(details);

    if (index > random_colors.length - 1)
        index = 0;

    note.setAttribute("style", `margin:${random_margin[Math.floor(Math.random() * random_margin.length)]}; background-color:${random_colors[index++]}; transform:${random_degree[Math.floor(Math.random() * random_degree.length)]}`);

    note.addEventListener("dblclick", () => {
        note.remove();
    })

    document.querySelector("#all_notes").appendChild(note);
}










