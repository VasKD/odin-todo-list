import { Task } from "./task";

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
                if (currentTask.completed){
                    currentTask.toggleComplete();
                }
            }

            // once all subtasks are completed, task is completed as well
            if (currentTask.subtasks.every(subtask => subtask.completed)){
                    alert("You've completed all the subtasks for this task!");
                    taskCard.style.display = "none";
                    currentTask.toggleComplete();
                    console.log(currentTask.completed);
            }
        }
    });
}


export function noSubtaskEventListener() {
    const noSubtaskDiv = document.querySelector("button.after");
    console.log(noSubtaskDiv);
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("after")) {
            console.log("Ya boi has been clicked");
            const taskCard = e.target.closest(".task-card");
            console.log(taskCard);
            const currentTask = Task.tasks.find(t => t.id === taskCard.id);

            if (!currentTask.completed){
                currentTask.toggleComplete();
                alert("You've completed this task. Way to go!");
                taskCard.style.display = "none";
            }
        }
    });
}

