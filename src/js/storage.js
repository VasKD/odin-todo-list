import { Task } from "./task";
import { Card } from "./card";
import { format, startOfDay } from "date-fns";


export function saveTasksToStorage() {
    localStorage.setItem("tasks", JSON.stringify(Task.tasks));
    console.log(localStorage);
}

export function loadTasksFromStorage() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    Task.tasks = savedTasks.map(task => Task.fromJSON(task));
    console.log(Task.tasks);
    return Task.tasks;
}

export function displayStoredTasks() {
    console.log(Task.tasks);
    for (const task of Task.tasks){
        const card = new Card(task);

        // only display the uncompleted tasks
        if (task.completed){
            const taskCard = document.getElementById(task.id);
            taskCard.style.display = "none";
        }
    }
} 

export function initializeDefaultTask() {
    const tasks = loadTasksFromStorage(); 

    if (localStorage.getItem("firstLoad")) {
        return;
    }

    // If no tasks exist in localStorage, create and save a default task
    if (tasks.length === 0) {
        const defaultTask = new Task(
            "Welcome!",
            "This is a default task, Edit it, Complete it, Delete it",
            format(startOfDay(new Date()), "MMMM do"),
            1, "personal"
        );
        localStorage.setItem("firstLoad", "true");
        saveTasksToStorage(); 
    } 
}

export function saveProjectsToStorage() {
    const addedProjects = document.querySelectorAll("#projects-menu button:not(.add-project)");
    console.log(addedProjects);
    
    const projectNames = Array.from(addedProjects)
        .slice(2)
        .map(btn => btn.textContent.trim());

    console.log(projectNames);
    localStorage.setItem("projects", JSON.stringify(projectNames));
}


export function loadProjectsFromStorage() {
    const savedProjects = localStorage.getItem("projects");
    if (!savedProjects) {
        return;
    }

    const projectNames = JSON.parse(savedProjects);
    projectNames.forEach(project => {
        addProject(project);
    });
}



function addProject(project) {
    const addProjectBtn = document.querySelector(".add-project");

    const projectTab = document.createElement("button");
    projectTab.id = project.toLowerCase();
    projectTab.textContent = project;
    addProjectBtn.before(projectTab);
}