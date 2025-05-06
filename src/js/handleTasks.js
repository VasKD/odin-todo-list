import { saveTasksToStorage } from "./storage";
import { Task } from "./task";
import { displayToast } from "./toast";


// keep track of the progression of completing tasks
export function subtaskEventListener() {
    document.addEventListener("change", (e) => {
        if (e.target.type === "checkbox") { 
            const taskCard = e.target.closest(".task-card");
            const currentTask = Task.tasks.find(t => t.id === taskCard.id);
            const subtaskTitle = e.target.nextElementSibling.innerHTML;
            const subtask = currentTask.subtasks.find(task => task.title.trim() === subtaskTitle);

            if (e.target.checked) {
                subtask.completed = true;
            } else {
                subtask.completed = false;
            }

            // once all subtasks are completed, task is completed as well
            if (currentTask.subtasks.every(subtask => subtask.completed) && !currentTask.completed){
                displayToast("completed");
                taskCard.style.display = "none";
                currentTask.toggleComplete();
                saveTasksToStorage();
            }
        }
    });
}


export function noSubtaskEventListener() {
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("after")) {
            const taskCard = e.target.closest(".task-card");
            const currentTask = Task.tasks.find(t => t.id === taskCard.id);

            if (!currentTask.completed){
                currentTask.toggleComplete();
                taskCard.style.display = "none";
                displayToast("completed");
                saveTasksToStorage();
            }
        }
    });
}

