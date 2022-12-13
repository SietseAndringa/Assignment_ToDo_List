// Selectors:

const getButton = document.getElementById("addButton");
const getUl = document.getElementById("listSection");

// Show tasks on page load:

const showTasksOnLoad = async function () {
    getUl.innerHTML = "";
    let dataFromApi = await getApiData();
    dataFromApi.forEach(task => {
        let taskData = {
            description: task.description,
            _id: task._id,
            done: task.done,
        };
        addTaskToDom(taskData);
    });

}

showTasksOnLoad();

// Add new task:

const addNewTask = function () {
    const userInput = document.getElementById("textInput").value;
    let task = { description: `${userInput}`, _id: "placeholder", done: false };
    addTaskToDom(task);
    postApiData(task);
    addIdToTask();
}

// Add Task to DOM:

const addTaskToDom = function (task) {
    const makeLi = document.createElement("li");
    getUl.appendChild(makeLi);
    const chkbox = document.createElement("input");
    chkbox.setAttribute("type", "checkbox");
    chkbox.setAttribute("class", "chk-box");
    chkbox.setAttribute("id", "chkbox");
    makeLi.setAttribute("class", "task-style");
    makeLi.innerHTML = task.description;
    makeLi.setAttribute("id", task._id);
    if (task.done == true) {
        makeLi.setAttribute("class", "task-style-done");
        chkbox.setAttribute("checked", true);
    } else {
        makeLi.setAttribute("class", "task-style");
    }
    makeLi.appendChild(chkbox);
    const makeButton = document.createElement("button");
    makeButton.setAttribute("class", "delete-button");
    makeLi.appendChild(makeButton);
    const makeIcon = document.createElement("i");
    makeIcon.classList.add("material-symbols-outlined");
    makeIcon.innerHTML = "delete";
    makeButton.appendChild(makeIcon);

}

// Add ID to Task: 

const addIdToTask = async function () {
    let dataFromApi = await getApiData();
    let lastItem = dataFromApi[dataFromApi.length - 1];
    const getLi = document.getElementById("placeholder");
    getLi.setAttribute("id", lastItem._id);
}

// Button actions: 

// Add task

getButton.addEventListener("click", (e) => {
    e.preventDefault();
    addNewTask();
});

// Delete task:

getUl.addEventListener("click", function (task) {
    if (task.target.className === "material-symbols-outlined") {
        const getfirstParent = task.target.closest("li");
        getfirstParent.remove();
        deleteApiData(getfirstParent.id);
    }
})

// Task done/not done:

getUl.addEventListener("change", function (task) {
    const getfirstParent = task.target.closest("li");
    const getCheckbox = task.target.closest("input")
    if (getCheckbox.checked == true) {
        getfirstParent.setAttribute("class", "task-style-done");
        changeApiDataTaskDone(getfirstParent.id, true);
    } else {
        getfirstParent.setAttribute("class", "task-style");
        changeApiDataTaskDone(getfirstParent.id, false);
    }
})




