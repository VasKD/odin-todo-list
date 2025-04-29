import editImg from "../img/Edit Icon (1).png";
import {prioritySVG} from "./svg";

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
        const svgDiv = document.createElement("div");
        svgDiv.innerHTML = prioritySVG.trim();
        cardHeader.appendChild(svgDiv.firstElementChild);

        return cardHeader;
    }

    createEditButton() {
        const editButton = document.createElement("button");
        editButton.classList.add("edit");

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
            for (const item of this.task.subtasks) {
                tasksContainer.appendChild(this.createSubtask(item));
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

        return noSubtaskDiv;
    }
}