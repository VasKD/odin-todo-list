import "../css/global.css";
import "../css/nav.css";
import "../css/header.css";
import "../css/card.css";
import "../css/modal.css";
import { Task } from "./task";
import { Card } from "./card";
import { createTask } from "./createTask";
import { noSubtaskEventListener, subtaskEventListener } from "./handleTasks";
import { dropdown, filteredViews } from "./nav";
import { createProject } from "./newProject";
import { editTask } from "./editTask";



editTask();
dropdown();
filteredViews();
createProject();
createTask();
subtaskEventListener();
noSubtaskEventListener();


const task1 = new Task("House", "Vacuum, Bathroom, Dishes, Windows", "May 5th", 2, "personal");
const task2 = new Task("Walk Doggo", "", "April 30th", 2, "work");


const taskCard1 = new Card(task1);
const taskCard2 = new Card(task2);
