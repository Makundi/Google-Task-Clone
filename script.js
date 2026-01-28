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



taskContainer.addEventListener("click", (e) => {
    const completedTaskBtn = e.target.closest(".completed-tasks");

    if (!completedTaskBtn) return;

    completedTaskBtn.classList.toggle('active');

    //updateCompletedContainer();
});

createForm.addEventListener('submit', (event) => {
    event.preventDefault();

    createOrRenameList();
    updateListNames();
    updateSelectListOptions();
    filterCheckedList();
    updateTaskList();
    updateCompletedContainer();
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
    addDefaultList();
    updateListNames();
    filterCheckedList();
    updateSelectListOptions();
    updateTaskList();
    updateCompletedContainer();
});

taskFormLayout.addEventListener("submit", (e) => {
    e.preventDefault();

    addTask(taskTitle.value, taskDate.value, taskDescription.value, selectContainer.value);
    updateListNames();

    taskFormLayout.style.display = "none";
    createListOverlay.style.display = "none";
});

const addDefaultList = () => {
    if (dataArr.length === 0 || typeof (dataArr) === null) {
        const dataPoint = {};
        dataPoint["listname"] = "My Tasks";
        dataPoint["default"] = "yes";

        dataArr.unshift(dataPoint);
        localStorage.setItem("data", JSON.stringify(dataArr));

    }
}

const countNumberofTasks = (nameOfList) => {
    let count = 0;
    taskDataArr.filter(task => task.listName === nameOfList && task.completed === "no").forEach(task => {
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
const numberOfCompletedTasks = (nameOfList) => {
    let count = 0;
    taskDataArr.filter(task => task.listName === nameOfList && task.completed === "yes").forEach(task => {
        count++;
    });
    return count;
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
                            <div class="menu-svg">
                                <svg id="task-card-menu" xmlns="http://www.w3.org/2000/svg" height="24px"
                                viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                                <path
                                    d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
                            </svg>
                            </div>
                            <div class="dropdown-list-menu" id="${checkbox.value.trim().replace(" ", "-").toLowerCase()}">
                                <div class="sort-section">
                                    <span>Sort by</span>
                                    <div class="sort-options">
                                        <div class="sort-by-my-order" id="my-order-${checkbox.value.trim().replace(" ", "-").toLowerCase()}" onclick="sortTasks(this)">
                                            <div class="checkmark-svg show" id="my-order-checkmark-svg-${checkbox.value.trim().replace(" ", "-").toLowerCase()}">
                                            </div>
                                           <span>My order</span>
                                        </div>
                                        <div class="sort-by-date" id="date-${checkbox.value.trim().replace(" ", "-").toLowerCase()}" onclick="sortTasks(this)">
                                            <div class="checkmark-svg" id="date-checkmark-svg-${checkbox.value.trim().replace(" ", "-").toLowerCase()}">
                                            </div>
                                            <span>Date</span>               
                                        </div>
                                        <div class="sort-by-starred" id="starred-${checkbox.value.trim().replace(" ", "-").toLowerCase()}" onclick="sortTasks(this)">
                                            <div class="checkmark-svg" id="starred-checkmark-svg-${checkbox.value.trim().replace(" ", "-").toLowerCase()}">
                                            </div>
                                           <span>Starred recently</span>
                                        </div>
                                        <div class="sort-by-title" id="title-${checkbox.value.trim().replace(" ", "-").toLowerCase()}" onclick="sortTasks(this)">
                                            <div class="checkmark-svg" id="title-checkmark-svg-${checkbox.value.trim().replace(" ", "-").toLowerCase()}">
                                            </div>
                                            <span>Title</span>
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
                    <div class="add-new-task-row" id="add-new-task-row-${checkbox.value.trim().replace(" ", "-").toLowerCase()}" onclick="toggleNewTaskForm(this)">
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
                        <div class="task-list-entry-container add-task-mini-form" id="new-form-${checkbox.value.trim().replace(" ", "-").toLowerCase()}">
                            <div class="checkbox-container">
                                <label class="container">
                                    <input type="checkbox">
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                            <div class="task-list-entry-info new-task-form">
                                <form id="new-task-form-${checkbox.value.trim().replace(" ", "-").toLowerCase()}">
                                    <input type="text" class="new-task-form-title" id="new-task-form-title-${checkbox.value.trim().replace(" ", "-").toLowerCase()}" placeholder="Title" required>
                                    <input type="text" class="new-task-form-description" id="new-task-form-description-${checkbox.value.trim().replace(" ", "-").toLowerCase()}" placeholder="Details">
                                    <input type="date" class="new-task-form-date" id="new-task-form-date-${checkbox.value.trim().replace(" ", "-").toLowerCase()}">
                                    <div class="button-layout new-task-layout">
                                        <button id="create-new-task-cancel-btn" type="reset">Cancel</button>
                                        <button id="create-new-task-save-btn" type="submit">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        
                    </div>
                    <div class="completed-tasks">
                        <div class="completed-tasks-header">
                            <div class="task-icon-right">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                    width="24px" fill="#FFFFFF">
                                    <path d="M400-280v-400l200 200-200 200Z" />
                                </svg>
                            </div>
                            <span id="number-of-completed-task-${checkbox.value.trim().replace(" ", "-").toLowerCase()}">Completed (${numberOfCompletedTasks(checkbox.value)})</span>
                        </div>
                        <div class="completed-tasks-body" id="completed-tasks-body-${checkbox.value.trim().replace(" ", "-").toLowerCase()}">
                            
                        </div>
                    </div>
                </div>
            </div>
        `;
        }
    });
}

const toggleNewTaskForm = (el) => {
    const name1 = el.id.slice(17);
    const newForm1 = document.getElementById(`new-form-${name1}`);
    newForm1.classList.toggle("show")
}

const createOrRenameList = () => {
    const dataPoint = {}
    const dataArrIndex = dataArr.findIndex(data => data["listname"] === currentTask.listname);

    dataPoint["listname"] = listNameInput.value;
    dataPoint["default"] = "no";

    if (dataArrIndex === -1) {
        dataArr.unshift(dataPoint);
    } else {
        dataArr[dataArrIndex].listname = listNameInput.value;;
    }

    localStorage.setItem("data", JSON.stringify(dataArr));


    listNameInput.value = "";
    createListForm.style.display = "none";
    createListOverlay.style.display = "none";
}

const deleteList = (deleteBtn) => {
    const listname = deleteBtn.id.slice(12).replace("-", " ");
    const dataArrIndex = dataArr.findIndex(data => data["listname"].toLowerCase() === listname);


    if (dataArr[dataArrIndex].default === "yes") {
        alert("You can't delete a default List");
        return;
    }
    const taskData = taskDataArr.filter(task => task.listName.toLowerCase() !== listname);

    document.getElementById(`task-card-${listname.replace(" ", "-")}`).remove();
    document.getElementById(`list-entry-${listname.replace(" ", "-")}`).remove();

    dataArr.splice(dataArrIndex, 1);
    localStorage.setItem("data", JSON.stringify(dataArr));
    localStorage.setItem("tasks", JSON.stringify(taskData));

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

const addTask = (taskTitle, taskDate, taskDescription, listname) => {
    const dataArrIndex = taskDataArr.findIndex(data => data.id === currentTask2.id);

    const taskObj = {
        id: `${removeSpecialChars(taskTitle).toLowerCase().split(" ").join("-")}-${Date.now()}`,
        title: taskTitle,
        date: taskDate,
        description: taskDescription,
        listName: listname,
        completed: "no",
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

    if (taskDataArr.length === 0) return;

    listnameArr.forEach(name => {
        const taskListContainer = document.getElementById(`task-list-${name.textContent.trim().replace(" ", "-").toLowerCase()}`);
        const filteredArr = taskDataArr.filter(task => task.listName === name.textContent && task.completed === "no");

        if (filteredArr.length === 0) return;

        updateTaskListContainer(filteredArr, taskListContainer)
    });
}

const resetTaskForm = () => {
    taskTitle.value = "";
    taskDate.value = "";
    taskDescription.value = "";
}

const updateCompletedTasks = (el) => {
    const taskEntryContainer = document.querySelector(`#task-list-entry-container-${el.id}`);
    const dataArrIndex = taskDataArr.findIndex(data => data.id === el.id);

    taskDataArr[dataArrIndex].completed = "yes";
    localStorage.setItem("tasks", JSON.stringify(taskDataArr));

    taskEntryContainer.remove();
    document.getElementById(`number-of-completed-task-${taskDataArr[dataArrIndex].listName.trim().replace(" ", "-").toLowerCase()}`).textContent = `Completed (${numberOfCompletedTasks(taskDataArr[dataArrIndex].listName)})`;


    updateCompletedContainer();
    updateListNames();
}

const updateCompletedContainer = () => {

    if (taskDataArr.length === 0) return;

    const listnameArr = document.querySelectorAll("#task-list-name");
    const completedDate = new Date();
    const options = {
        weekday: "short",
        month: "short",
        day: "numeric",
    };

    listnameArr.forEach(name => {
        const completedTaskListContainer = document.getElementById(`completed-tasks-body-${name.textContent.trim().replace(" ", "-").toLowerCase()}`);
        completedTaskListContainer.innerHTML = "";
        const filteredArr = taskDataArr.filter(task => task.listName === name.textContent && task.completed === "yes");

        if (filteredArr.length === 0) return;

        filteredArr.forEach(({ id, title, date, description, listName }) => {
            completedTaskListContainer.innerHTML += `
                <div class="completed-tasks-entry" id="tasks-entry-completed-${id}">
                            <div class="checkbox-container">
                                <label class="container">
                                    <input type="checkbox" id="completed-${id}" onclick="unmarkCompletedTask(this)" checked>
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                            <div class="task-list-entry-info">
                                <span id="task-entry-title">${title}</span>
                                <p id="task-entry-description">${description}</p>
                                <p>Completed: ${completedDate.toLocaleDateString("en-US", options)}</p>
                            </div>
                        </div>
            `
        });
    });
}

const unmarkCompletedTask = (el) => {
    const completedTaskEntry = document.getElementById(`tasks-entry-${el.id}`);
    const dataArrIndex = taskDataArr.findIndex(data => data.id === el.id.slice(10));

    taskDataArr[dataArrIndex].completed = "no";
    localStorage.setItem("tasks", JSON.stringify(taskDataArr));

    completedTaskEntry.remove();
    document.getElementById(`number-of-completed-task-${taskDataArr[dataArrIndex].listName.trim().replace(" ", "-").toLowerCase()}`).textContent = `Completed (${numberOfCompletedTasks(taskDataArr[dataArrIndex].listName)})`;

    updateTaskList();
    updateListNames();
}

const sortTasks = (el) => {
    const sortByList = ["my-order", "date", "starred", "title"];

    sortByList.forEach(item => {
        if (el.id.includes(item)) {
            const listname = el.id.slice(item.length + 1).replace("-", " ");
            const arr = taskDataArr.filter(task => task.listName.toLowerCase() === listname && task.completed === "no");
            sortedTaskList(arr, item, el.id.slice(item.length + 1));
        }
    })
}

const sortedTaskList = (arr, orderBy, name1) => {
    const taskListContainer = document.getElementById(`task-list-${name1}`);
    const checkmarkContainer = document.getElementById(`${orderBy}-checkmark-svg-${name1}`);



    if (orderBy === "my-order") {
        updateTaskListContainer(arr, taskListContainer);
        addOrRemoveCheckmark(checkmarkContainer);
    }
    else if (orderBy === "date") {
        arr.sort((a, b) => new Date(a.date) - new Date(b.date));
        updateTaskListContainer(arr, taskListContainer);
        addOrRemoveCheckmark(checkmarkContainer);
    }
    else if (orderBy === "starred") {
        alert("working on it");
        addOrRemoveCheckmark(checkmarkContainer);
    }
    else if (orderBy === "title") {
        arr.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
        updateTaskListContainer(arr, taskListContainer);
        addOrRemoveCheckmark(checkmarkContainer);
    }
}

const addOrRemoveCheckmark = (currentSortOption) => {
    if (!currentSortOption) return;

    const isChecked = currentSortOption.classList.contains("show");


    document.querySelectorAll(".checkmark-svg.show")
        .forEach(container => container.classList.remove("show"));


    if (!isChecked) {
        currentSortOption.classList.add("show");
    }
    else {
        currentSortOption.classList.add("show");
    }
}

const updateTaskListContainer = (arr, container) => {
    container.innerHTML = "";

    arr.forEach(({ id, title, date, description, listName }) => {
        container.innerHTML += `
                <div class="task-list-entry-container add-task-mini-form" id="new-form-${listName.trim().replace(" ", "-").toLowerCase()}">
                            <div class="checkbox-container">
                                <label class="container">
                                    <input type="checkbox">
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                            <div class="task-list-entry-info new-task-form">
                                <form id="new-task-form-${listName.trim().replace(" ", "-").toLowerCase()}">
                                    <input type="text" class="new-task-form-title" id="new-task-form-title-${listName.trim().replace(" ", "-").toLowerCase()}" placeholder="Title" required>
                                    <input type="text" class="new-task-form-description" id="new-task-form-description-${listName.trim().replace(" ", "-").toLowerCase()}" placeholder="Details">
                                    <input type="date" class="new-task-form-date" id="new-task-form-date-${listName.trim().replace(" ", "-").toLowerCase()}">
                                    <div class="button-layout new-task-layout">
                                        <button id="create-new-task-cancel-btn" type="reset">Cancel</button>
                                        <button id="create-new-task-save-btn" type="submit">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                <div class="task-list-entry-container" id="task-list-entry-container-${id}">
                            <div class="checkbox-container">
                                <label class="container">
                                    <input type="checkbox" id="${id}" onclick="updateCompletedTasks(this)">
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
}

taskContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    const entry = e.target.closest(".task-list-entry-container.add-task-mini-form");

    if (!entry) return;

    const listName = entry.id.slice(9);
    const title = document.getElementById(`new-task-form-title-${listName}`);
    const description = document.getElementById(`new-task-form-description-${listName}`);
    const date = document.getElementById(`new-task-form-date-${listName}`);


    const index = dataArr.findIndex(data => data.listname.toLowerCase() === listName.replace("-", " "));
    const realName = dataArr[index].listname;
    addTask(title.value, date.value, description.value, realName);

    title.value = "";
    description.value = "";
    date.value = "";
    toggleNewTaskForm();
    updateTaskList();

});