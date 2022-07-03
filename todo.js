let form = document.getElementById("form");
let addTask = document.getElementById("submit")
let input = document.getElementById("content");
let desc = document.getElementById("description")
let due_date = document.getElementById("date");
let posts = document.querySelector(".toDoCards");
let remove = document.getElementById('delete');
let toDoBg = document.querySelector('toDo');
let progressBar = document.getElementById('progressResult');
let tally = 0;


form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
    tallyResult();
});



function tallyResult() {

    tally = tally + 1;
    localStorage.setItem('tally', JSON.stringify(tally));
    tallyData = localStorage.getItem('tally');
    progressBar.innerHTML = tallyData;

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
        <div id=${y} class="task-card">
                                <div class="task-title">
                                    <h3>${x.title}</h3>
                                </div>
                                <div class="task-desc"><span>${x.desciption}</span></div>
                                <div class="due-date"><strong>Due Date:</strong>${x.dueDate}
                                    <div class="delete_editIcons">
                                        <i onClick="editTask(this);" class=" fas fa-edit"></i>
                                        <i onClick="deleteTask(this); createTasks(); discard();" class="fas fa-trash-alt" ></i>
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


(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    createPost();
})()

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

function discard() {
    tally = tally - 1;
}









