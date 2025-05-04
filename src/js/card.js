import editImg from "../img/Edit Icon (1).png";
import priority1 from "../img/Priority 1.png";
import priority2 from "../img/Priority 2.png";
import priority3 from "../img/Priority 3.png";



export class Card {
    static cards = [];

    constructor(task) {
        this.task = task;
        this.card = this.createCard();
        Card.cards.push(this);
    }

    createCard() {
        const cardsContainer = document.querySelector(".cards-container");

        // Create card container
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");
        console.log(this.task.id);
        taskCard.id = this.task.id;
        console.log(this.task.project);

        // Add header and content to the card
        taskCard.appendChild(this.createCardHeader());
        taskCard.appendChild(this.createCardContent());

        cardsContainer.appendChild(taskCard);
    }

    createCardHeader() {
        const cardHeader = document.createElement("div");
        cardHeader.classList.add("card-header");

        // Title container
        const titleContainer = document.createElement("div");
        titleContainer.classList.add("title-container");

        const title = document.createElement("h2");
        title.textContent = this.task.title;
        titleContainer.appendChild(title);

        const editButton = this.createEditButton();
        titleContainer.appendChild(editButton);

        cardHeader.appendChild(titleContainer);

        // Priority SVG
        const priorityImg = document.createElement("img");
        priorityImg.id = "priority";

        if (this.task.priority === 1) {
            priorityImg.src = priority1;
        } else if (this.task.priority === 2) {
            priorityImg.src = priority2;
        } else if (this.task.priority === 3) {
            priorityImg.src = priority3;
        }
        
        cardHeader.appendChild(priorityImg);

        return cardHeader;
    }

    createEditButton() {
        const editButton = document.createElement("button");
        editButton.id = "edit";

        const editIcon = document.createElement("img");
        editIcon.src = editImg;
        editButton.appendChild(editIcon);

        return editButton;
    }

    createCardContent() {
        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");

        // Due date
        const dueDate = document.createElement("h3");
        dueDate.textContent = "Due: " + this.task.dueDate;
        cardContent.appendChild(dueDate);

        // Subtasks container
        const tasksContainer = document.createElement("div");
        tasksContainer.classList.add("tasks-container");

        if (this.task.subtasks.length === 0) {
            tasksContainer.appendChild(this.noSubtasks());
        } else {
            this.task.subtasks = addSubtaskStates(this.task.subtasks);
            for (const item of this.task.subtasks) {
                console.log(item.title);
                tasksContainer.appendChild(this.createSubtask(item.title.trim()));
            }
        }

        cardContent.appendChild(tasksContainer);
        return cardContent;
    }

    createSubtask(item) {
        const subtaskDiv = document.createElement("div");
        subtaskDiv.classList.add("task");

        const checkBox = document.createElement("input");
        checkBox.classList.add("checkbox");
        checkBox.setAttribute("type", "checkbox");
        checkBox.setAttribute("id", "checkbox");
        checkBox.setAttribute("name", "checkbox");
        subtaskDiv.appendChild(checkBox);

        const subtask = document.createElement("p");
        subtask.textContent = item;
        subtaskDiv.appendChild(subtask);

        return subtaskDiv;
    }

    noSubtasks() {
        const noSubtaskDiv = document.createElement("div");
        noSubtaskDiv.classList.add("no-task");

        const message = document.createElement("p");
        message.textContent = "No Subtasks!"
        noSubtaskDiv.appendChild(message);

        const completeTaskButton = document.createElement("button");
        completeTaskButton.classList.add("after");
        completeTaskButton.textContent = "Click to Complete Task";
        noSubtaskDiv.appendChild(completeTaskButton);

        return noSubtaskDiv;
    }
}

export function addSubtaskStates(subtasks) {
    subtasks = subtasks.split(",");
    const subtaskStates = subtasks.map(title => ({
        title: title.trim(),
        completed: false
    }));
    
    return subtaskStates;
}

