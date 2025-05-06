import { Task } from "./task";
 
export function dropdown() {
    const projectsBtn = document.getElementById("projects");
    const dropdown = document.getElementById("projects-menu");
    const arrow = document.getElementById("arrow");
    projectsBtn.addEventListener("click", () => {
        if (dropdown.style.display === "none" || dropdown.style.display === "") {
            dropdown.style.display = "flex";
            arrow.classList.remove("rotate-down");
            arrow.classList.add("rotate-up");
        } else {
            dropdown.style.display = "none";
            arrow.classList.remove("rotate-up");
            arrow.classList.add("rotate-down");
        }
    });
}


export function filteredViews() {
    document.addEventListener("click", (e) => {
        let tab = e.target.id;
        let allCards = Array.from(document.querySelectorAll(".task-card"));
        if (e.target.closest(".nav-btns")){
            addHighlight(e.target);
            if (tab === "completed") {
                let completedTasks = Task.tasks.filter(task => task.completed);

                // clear card container before displaying tasks
                clearDOM(allCards);

                // display completed tasks
                displayCards(completedTasks, allCards);
            }

            if (tab === "tasks") {
                let notCompletedTasks = Task.tasks.filter(task => !task.completed);
                clearDOM(allCards);
                displayCards(notCompletedTasks, allCards);
            }
        }

        // project filtered view
        if (e.target.closest("#projects-menu") && e.target.classList[0] !== "add-project" && e.target.id !== "projects-menu") {
            let projectTasks = Task.tasks.filter(task => task.project === tab && !task.completed);
            addHighlight(e.target);
            clearDOM(allCards);
            displayCards(projectTasks, allCards);
        }
    });
}

function addHighlight(tab) {
    // remove highlight from current and add to clicked tab button
    const highlighted = document.querySelector(".clicked");
    highlighted.classList.remove("clicked");

    tab.classList.add("clicked");
}

export function clearDOM(allCards) {
    allCards.forEach(card => {
        card.style.display = "none";
    });
}

function getCards(allCards, task) {
    return allCards.find(card => card.id === task.id);
}

export function displayCards(tasks, allCards){
    for (const task of tasks){
        getCards(allCards, task).style.display = "flex";
    }
}