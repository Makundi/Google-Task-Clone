
const dataArr = JSON.parse(localStorage.getItem("data")) || [];

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
});

completedTasksBtn.addEventListener('click', () => {
    completedTasksBtn.classList.toggle('active');
});

createForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const dataPoint = {}
    const name = listNameInput.value;
    dataPoint["listname"] = name;
    dataArr.unshift(dataPoint);

    localStorage.setItem("data", JSON.stringify(dataArr));


    updateListNames();
    filterCheckedList();
    listNameInput.value = "";
    createListForm.style.display = "none";
    createListOverlay.style.display = "none";
});


const updateListNames = () => {
    listNames.innerHTML = "";

    dataArr.forEach(({ listname }) => {
        (listNames.innerHTML += `
        <div class="list-entry">
            <input type="checkbox" class="listname-checkbox" id="${listname}-checkbox" value="${listname}" checked onclick="filterCheckedList()" >
            <span id="task-name">${listname}</span>
            <span id="number-of-tasks">0</span>
        </div>
    `)
    });
}

const filterCheckedList = () => {
    const listNameCheckboxes = document.querySelectorAll(".listname-checkbox");
    taskContainer.innerHTML = "";

    listNameCheckboxes.forEach(checkbox => {

        if (checkbox.checked) {
            taskContainer.innerHTML += `
            <div class="task-card">
                <div class="task-card-header">
                    <div class="task-card-nav">
                        <div class="tasklistname">
                            <span id="task-list-name">${checkbox.value}</span>
                        </div>
                        <div class="task-card-menu-svg">
                            <svg id="task-card-menu" xmlns="http://www.w3.org/2000/svg" height="24px"
                                viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                                <path
                                    d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
                            </svg>

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
                </div>
            </div>
        `;
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    updateListNames();
    filterCheckedList();
});