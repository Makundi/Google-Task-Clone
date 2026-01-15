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