import { parseISO, format } from 'date-fns';
import { Task } from './task';
import { Card } from './card';
import { saveTasksToStorage, loadTasksFromStorage } from './storage';
export { createTask };

function createTask() {
    const addTaskModal = document.getElementById("add-task");

    const addTaskButton = document.querySelector(".create-task");
    addTaskButton.addEventListener("click", () => addTaskModal.showModal());
    
    const exitButton = document.querySelector("#exit");
    exitButton.addEventListener("click", () => addTaskModal.close());
    
    const addTaskForm = document.getElementById("add-task-form");
    addTaskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        if (e.target.closest("#add-task-form")) {
            let title = document.getElementById("title").value;
            console.log(title);

            let subtasks = document.getElementById("subtasks").value;
        
            let dueDate = document.getElementById("due-date").value;
            dueDate = formatDate(dueDate);
            console.log(dueDate);

            let priority = document.getElementById("task-priority").value;
            console.log(priority);

            let project = document.getElementById("project").value;
            console.log(project);

            const task = new Task(title, subtasks, dueDate, Number(priority), project);
            const card = new Card(task);
        }
        
        saveTasksToStorage();
        loadTasksFromStorage();
        addTaskForm.reset();
    });
}


export function formatDate(date) {
    date = parseISO(date);
    const formattedDate = format(date, "MMMM do");
    return formattedDate;
}


