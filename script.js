const dataArr = JSON.parse(localStorage.getItem("data")) || [];
const taskDataArr = JSON.parse(localStorage.getItem("tasks")) || [];

let currentTask = {};
let currentTask2 = {};

const menuIcon = document.getElementById("menu-icon");
const sideBar = document.querySelector(".sidebar");
const listMenu = document.querySelector(".list-summary");
const listIcon = document.getElementById("list-collapse");
const listNames = document.querySelector(".list-names");
const createListBtn = document.querySelector(".create-list");
const createListForm = document.querySelector(".form-layout");
const createListCancelBtn = document.getElementById("create-list-cancel-btn");
const createListDoneBtn = document.getElementById("create-list-done-btn");
const createListOverlay = document.querySelector(".create-list-overlay");
const createTaskBtn = document.getElementById("create-task-btn");
const taskFormLayout = document.querySelector(".task-form-layout");
const createTaskFormCancel = document.getElementById("create-form-cancel")
const completedTasksBtn = document.querySelector(".completed-tasks");
const completedTasksBody = document.querySelector(".completed-tasks-body");
const listNameInput = document.getElementById("listname");
const createForm = document.getElementById("create-list-form");
const taskContainer = document.querySelector(".tasks-container");
const taskTitle = document.getElementById("task-title");
const taskDate = document.getElementById("task-date");
const taskDescription = document.getElementById("task-description");
const selectContainer = document.getElementById("select-container");
const saveTaskBtn = document.getElementById("save-task-btn1");


menuIcon.addEventListener('click', () => {
    sideBar.classList.toggle('show-sidebar');
});

listMenu.addEventListener('click', () => {
    listNames.classList.toggle('active');
    listIcon.classList.toggle('active-list');
});

createListBtn.addEventListener('click', () => {
    createListForm.style.display = "block";
    createListOverlay.style.display = "block";
});

createListCancelBtn.addEventListener('click', () => {
    createListForm.style.display = "none";
    createListOverlay.style.display = "none";
});

createListOverlay.addEventListener('click', () => {
    createListOverlay.style.display = "none";
    createListForm.style.display = "none";
    taskFormLayout.style.display = "none";
});

createTaskBtn.addEventListener('click', () => {
    taskFormLayout.style.display = "flex";
    createListOverlay.style.display = "block";
});

createTaskFormCancel.addEventListener('click', () => {
    taskFormLayout.style.display = "none";
    createListOverlay.style.display = "none";
    resetTaskForm();
});

completedTasksBtn.addEventListener('click', () => {
    completedTasksBtn.classList.toggle('active');
});

createForm.addEventListener('submit', (event) => {
    event.preventDefault();

    createOrRenameList();
    updateListNames();
    updateSelectListOptions();
    filterCheckedList();
});

taskContainer.addEventListener("click", (e) => {
    const menuBtn = e.target.closest(".task-card-menu-svg");
    if (!menuBtn) return;

    const menuId = menuBtn.dataset.menu;
    const currentMenu = document.getElementById(menuId);
    if (!currentMenu) return;

    const isOpen = currentMenu.classList.contains("show-menu");

    // Close all menus
    document.querySelectorAll(".dropdown-list-menu.show-menu")
        .forEach(menu => menu.classList.remove("show-menu"));

    // Re-open only if it was previously closed
    if (!isOpen) {
        currentMenu.classList.add("show-menu");
    }
});


document.addEventListener("click", (e) => {
    if (!e.target.closest(".task-card-menu-svg")) {
        document.querySelectorAll(".dropdown-list-menu.show-menu")
            .forEach(menu => menu.classList.remove("show-menu"));
    }
});


document.addEventListener("DOMContentLoaded", function () {
    updateListNames();
    filterCheckedList();
    updateSelectListOptions();
    updateTaskList();
});

taskFormLayout.addEventListener("submit", (e) => {
    e.preventDefault();

    addTask();
    taskFormLayout.style.display = "none";
    createListOverlay.style.display = "none";
});

const countNumberofTasks = (nameOfList) => {
    let count = 0;
    taskDataArr.filter(task => task.listName === nameOfList).forEach(task => {
        count++;
    });
    return count;
}

const updateListNames = () => {
    listNames.innerHTML = "";

    dataArr.forEach(({ listname }) => {

        listNames.innerHTML += `
        <div class="list-entry" id="list-entry-${listname.trim().replace(" ", "-").toLowerCase()}">
            <input type="checkbox" class="listname-checkbox" id="${listname}-checkbox" value="${listname}" checked onclick="filterCheckedList()" >
            <span id="task-name">${listname}</span>
            <span id="number-of-tasks">${countNumberofTasks(listname)}</span>
        </div>
    `
    });
}

const filterCheckedList = () => {
    const listNameCheckboxes = document.querySelectorAll(".listname-checkbox");
    taskContainer.innerHTML = "";

    listNameCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            taskContainer.innerHTML += `
            <div class="task-card" id="task-card-${checkbox.value.trim().replace(" ", "-").toLowerCase()}">
                <div class="task-card-header">
                    <div class="task-card-nav">
                        <div class="tasklistname">
                            <span id="task-list-name">${checkbox.value}</span>
                        </div>
                        <div class="task-card-menu-svg" data-menu="${checkbox.value.trim().replace(" ", "-").toLowerCase()}">
                            <svg id="task-card-menu" xmlns="http://www.w3.org/2000/svg" height="24px"
                                viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                                <path
                                    d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
                            </svg>
                            <div class="dropdown-list-menu" id="${checkbox.value.trim().replace(" ", "-").toLowerCase()}">
                                <div class="sort-section">
                                    <span>Sort by</span>
                                    <div class="sort-options">
                                        <div class="sort-by-my-order">
                                            <label class="container options">My order
                                                <input type="checkbox" checked="checked">
                                                <span class="checkmark my-order"></span>
                                            </label>
                                        </div>
                                        <div class="sort-by-date">
                                            <label class="container options">Date
                                                <input type="checkbox">
                                                <span class="checkmark my-order"></span>
                                            </label>
                                        </div>
                                        <div class="sort-by-starred">
                                            <label class="container options">Starred Recently
                                                <input type="checkbox" >
                                                <span class="checkmark my-order"></span>
                                            </labe>
                                        </div>
                                        <div class="sort-by-title">
                                            <label class="container options">Title
                                                <input type="checkbox">
                                                <span class="checkmark my-order"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="list-edit-section">
                                    <span id="delete-list-${checkbox.value.trim().replace(" ", "-").toLowerCase()}" onclick="deleteList(this)">Delete list</span>
                                    <span id="rename-list-${checkbox.value.trim().replace(" ", "-").toLowerCase()}" onclick="renameList(this)">Rename list</span>
                                </div>
                                <div class="task-edit-section">
                                    <span>Print list</span>
                                    <span>Delete all completed tasks</span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="add-new-task-row">
                        <div class="new-task-icon">
                            <svg id="add-new-task-icon" xmlns="http://www.w3.org/2000/svg" height="20px"
                            viewBox="0 -960 960 960" width="20px" fill="#a8c7fa">
                            <path
                                d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q32 0 62-6t58-17l60 61q-41 20-86 31t-94 11Zm280-80v-120H640v-80h120v-120h80v120h120v80H840v120h-80ZM424-296 254-466l56-56 114 114 400-401 56 56-456 457Z" />
                        </svg>
                        </div>
                        <div class="add-task-label">
                            <span class="add-new-task-btn">Add a task</span>
                        </div>
                    </div>
                </div>
                <div class="task-card-body">
                    <div class="task-list" id="task-list-${checkbox.value.trim().replace(" ", "-").toLowerCase()}">
                        
                    </div>
                </div>
            </div>
        `;
        }
    });
    updateTaskList();
}

const createOrRenameList = () => {
    const dataPoint = {}
    const dataArrIndex = dataArr.findIndex(data => data["listname"] === currentTask.listname);

    dataPoint["listname"] = listNameInput.value;

    if (dataArrIndex === -1) {
        dataArr.unshift(dataPoint);
    } else {
        dataArr[dataArrIndex] = dataPoint;
    }

    localStorage.setItem("data", JSON.stringify(dataArr));


    listNameInput.value = "";
    createListForm.style.display = "none";
    createListOverlay.style.display = "none";
}

const deleteList = (deleteBtn) => {
    const listname = deleteBtn.id.slice(12).replace("-", " ");
    const dataArrIndex = dataArr.findIndex(data => data["listname"].toLowerCase() === listname);

    document.getElementById(`task-card-${listname.replace(" ", "-")}`).remove();
    document.getElementById(`list-entry-${listname.replace(" ", "-")}`).remove();

    dataArr.splice(dataArrIndex, 1);
    localStorage.setItem("data", JSON.stringify(dataArr));
    updateSelectListOptions();
}

const renameList = (renameBtn) => {
    const listname = renameBtn.id.slice(12).replace("-", " ");
    const dataArrIndex = dataArr.findIndex(data => data["listname"].toLowerCase() === listname);

    currentTask = dataArr[dataArrIndex];

    console.log(currentTask);

    listNameInput.value = currentTask.listname;
    createListForm.style.display = "block";
    createListOverlay.style.display = "block";
    updateSelectListOptions();

}

const updateSelectListOptions = () => {
    selectContainer.innerHTML = "";

    dataArr.forEach(({ listname }) => {
        selectContainer.innerHTML += `
            <option value="${listname}">${listname}</option>
        `;
    })
}

const removeSpecialChars = (val) => {
    return val.trim().replace(/[^A-Za-z0-9\-\s]/g, '')
}

const addTask = () => {
    const dataArrIndex = taskDataArr.findIndex(data => data.id === currentTask2.id);

    const taskObj = {
        id: `${removeSpecialChars(taskTitle.value).toLowerCase().split(" ").join("-")}-${Date.now()}`,
        title: taskTitle.value,
        date: taskDate.value,
        description: taskDescription.value,
        listName: selectContainer.value,
    };

    if (dataArrIndex === -1) {
        taskDataArr.unshift(taskObj);
    } else {
        taskDataArr[dataArrIndex] = taskObj;
    }

    localStorage.setItem("tasks", JSON.stringify(taskDataArr));
    updateTaskList();
    resetTaskForm();
}

const updateTaskList = () => {
    const listnameArr = document.querySelectorAll("#task-list-name");

    listnameArr.forEach(name => {
        const taskListContainer = document.getElementById(`task-list-${name.textContent.trim().replace(" ", "-").toLowerCase()}`);
        taskListContainer.innerHTML = "";
        const filteredArr = taskDataArr.filter(task => task.listName === name.textContent);

        filteredArr.forEach(({ id, title, date, description, listName }) => {
            taskListContainer.innerHTML += `
                <div class="task-list-entry-container">
                            <div class="checkbox-container">
                                <label class="container">
                                    <input type="checkbox">
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                            <div class="task-list-entry-info">
                                <span id="task-entry-title">${title}</span>
                                <p id="task-entry-description">${description}</p>
                            </div>
                        </div>
            `
        });
    });
}

const resetTaskForm = () => {
    taskTitle.value = "";
    taskDate.value = "";
    taskDescription.value = "";
}