let form = document.getElementById("form");
let addTask = document.getElementById("submit")
let input = document.getElementById("content");
let desc = document.getElementById("description")
let due_date = document.getElementById("date");
let posts = document.querySelector(".toDoCards");
let remove = document.getElementById('delete');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();

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
    
        <div id=${y} class="task-card">
             <div class="task-title">
                  <h3>${x.title}</h3>
             </div>
                <div class="task-desc"><span>${x.desciption}</span></div>
                <div class="due-date"><strong>Due Date:</strong>${x.dueDate}
                 <svg
                    stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1"
                    viewBox="0 0 16 16" height="1.2em" width="1.2em"
                    xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.404 5.11l-1.015-1.014-5.075 5.074c-0.841 0.841-0.841 2.204 0 3.044s2.204 0.841 3.045 0l6.090-6.089c1.402-1.401 1.402-3.673 0-5.074s-3.674-1.402-5.075 0l-6.394 6.393c-0.005 0.005-0.010 0.009-0.014 0.013-1.955 1.955-1.955 5.123 0 7.077s5.123 1.954 7.078 0c0.004-0.004 0.008-0.009 0.013-0.014l0.001 0.001 4.365-4.364-1.015-1.014-4.365 4.363c-0.005 0.004-0.009 0.009-0.013 0.013-1.392 1.392-3.656 1.392-5.048 0s-1.392-3.655 0-5.047c0.005-0.005 0.009-0.009 0.014-0.013l-0.001-0.001 6.395-6.393c0.839-0.84 2.205-0.84 3.045 0s0.839 2.205 0 3.044l-6.090 6.089c-0.28 0.28-0.735 0.28-1.015 0s-0.28-0.735 0-1.014l5.075-5.075z">
          </path>
          </svg></div>
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
