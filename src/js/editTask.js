import { Task } from "./task";
import { addSubtaskStates } from "./card";
import { formatDate } from "./createTask";
import priority1 from "../img/Priority 1.png";
import priority2 from "../img/Priority 2.png";
import priority3 from "../img/Priority 3.png";
import { loadTasksFromStorage, saveTasksToStorage } from "./storage";
import { displayToast } from "./toast";



export function editTask() {
    const editTaskModal = document.getElementById("edit-task");
    const editTaskForm = document.getElementById("edit-task-form");
    const deleteButton = document.getElementById("delete");
    const cardsContainer = document.querySelector(".cards-container");
    let currentTaskCard = null;
    let taskObject = null;

    document.addEventListener("click", (e) => {
        if (e.target.closest("#edit")) {
            editTaskModal.showModal();
            currentTaskCard = e.target.closest(".task-card");
            taskObject = Task.tasks.find(task => task.id === currentTaskCard.id);
        }   
    });


    deleteButton.addEventListener("click", (e) => {
        e.preventDefault();

        // remove task from DOM
        cardsContainer.removeChild(currentTaskCard);

        // remove task from object list
        let objectIndex = Task.tasks.findIndex(task => task.id === taskObject.id);
        Task.tasks.splice(objectIndex, 1);

        saveTasksToStorage();
        loadTasksFromStorage();
    });

   
    editTaskForm.addEventListener("submit", (e) => {
        e.preventDefault();
       
        // prevent changes being made to completed tasks
        if (checkCompletion(taskObject)) {
            editTaskModal.close();
            return;
        }

        // update object and card title
        const newTitle = document.getElementById("edit-title").value;
        if (newTitle !== "") {
            taskObject.title = newTitle;
            updateTitle(currentTaskCard.querySelector("h2"), newTitle);
        }

        // add subtasks to object and corresponding card
        let newSubtask = document.getElementById("add-subtask").value;
        if (newSubtask !== "") {
            newSubtask = addSubtaskStates(newSubtask);
            if (taskObject.subtasks.length === 0){
                taskObject.subtasks = newSubtask;
            } else {
                taskObject.addSubtask(newSubtask);
            }
            addSubtasks(newSubtask, currentTaskCard.querySelector(".tasks-container")); 
        }

        // remove subtasks from object and corresponding card
        let removedSubtask = document.getElementById("remove-subtask").value.split(",");
        if (removedSubtask[0] !== "") {
            for (const subtask of removedSubtask) {
                const subtaskIndex = taskObject.subtasks.findIndex(obj => obj.title === subtask.trim());
                taskObject.subtasks.splice(subtaskIndex, 1);
                removeSubtasks(subtask, currentTaskCard);
            }
        }

        // update due date
        let newDate = document.getElementById("edit-due-date").value;
        if (newDate !== ""){
            newDate = formatDate(newDate);
            taskObject.dueDate = newDate;
            updateDueDate(currentTaskCard.querySelector("h3"), newDate); 
        }


        // update priority
        let newPriority = Number(document.getElementById("edit-priority").value);
        let priorityImg = currentTaskCard.querySelector("#priority");
        if (newPriority > 0 && newPriority < 4) {
            taskObject.priority = newPriority;
            if (newPriority === 1) {
                priorityImg.src = priority1;
            } else if (newPriority === 2) {
                priorityImg.src = priority2;
            } else if (newPriority === 3) {
                priorityImg.src = priority3;
            }
        }


        // update project
        let newProject = document.getElementById("edit-project").value;
        if (newProject !== "") {
            taskObject.project = newProject;
        }
            
        editTaskForm.reset();
        saveTasksToStorage();
    });
    
    const exitButton = document.querySelector("#edit-exit");
    exitButton.addEventListener("click", () => editTaskModal.close());
}




function checkCompletion(task){
    if (task.completed) {
        displayToast("edit");
        return true;
    }
}

function updateTitle(title, newTitle){
    title.textContent = newTitle;
}
    
function addSubtasks(newSubtasks, currentTaskCard){
    for (const subtask of newSubtasks) {
        const noTaskDiv = currentTaskCard.querySelector(".no-task");

        // if the current card does not have subtasks remove 
        // the no subtask div before adding subtask
        if (noTaskDiv){
            currentTaskCard.removeChild(noTaskDiv);
        }

        const subtaskDiv = document.createElement("div");
        subtaskDiv.classList.add("task");

        // create checkbox
        const checkBox = document.createElement("input");
        checkBox.classList.add("checkbox");
        checkBox.setAttribute("type", "checkbox");
        checkBox.setAttribute("id", "checkbox");
        checkBox.setAttribute("name", "checkbox");
        subtaskDiv.appendChild(checkBox);

        // add the subtask title
        const subtaskTitle = document.createElement("p");
        subtaskTitle.textContent = subtask.title;
        subtaskDiv.appendChild(subtaskTitle);
        currentTaskCard.appendChild(subtaskDiv);
    }
}

function removeSubtasks(subtask, currentTaskCard){
    const subtaskContainer = currentTaskCard.querySelector(".tasks-container");
    const subtaskDivs = document.querySelectorAll(".task");
    for (const subtaskDiv of subtaskDivs) {
        if (subtaskDiv.querySelector("p").textContent === subtask.trim()){
            subtaskContainer.removeChild(subtaskDiv);
        }
        if (subtaskDivs.length === 1) {
            createNoSubtasksDiv(subtaskContainer);
        }
    }
}

function createNoSubtasksDiv(subtasksContainer) {
    const noSubtaskDiv = document.createElement("div");
    noSubtaskDiv.classList.add("no-task");

    const message = document.createElement("p");
    message.textContent = "No Subtasks!"
    noSubtaskDiv.appendChild(message);

    const completeTaskButton = document.createElement("button");
    completeTaskButton.classList.add("after");
    completeTaskButton.textContent = "Click to Complete Task";
    noSubtaskDiv.appendChild(completeTaskButton);

    subtasksContainer.appendChild(noSubtaskDiv);
}

function updateDueDate(dueDate, newDate) {
    dueDate.textContent = "Due: " + newDate;
}