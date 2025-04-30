import "../css/global.css";
import "../css/nav.css";
import "../css/header.css";
import "../css/card.css";
import "../css/modal.css";
import { Task } from "./task";
import { Card } from "./card";
import { createTask } from "./createTask";
import { noSubtaskEventListener, subtaskEventListener } from "./handleTasks";
import { dropdown, completeButton } from "./nav";




dropdown();
completeButton();
createTask();
subtaskEventListener();
noSubtaskEventListener();

const task1 = new Task("Clean House", "Vacuum, Bathroom, Dishes, Windows", "May 5th", 2, "Personal");
const task2 = new Task("Walk Doggo", "", "April 30th", 2, "Personal");


const taskCard1 = new Card(task1);
const taskCard2 = new Card(task2);
