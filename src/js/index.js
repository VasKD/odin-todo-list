import "../css/global.css";
import "../css/nav.css";
import "../css/header.css";
import "../css/card.css";
import "../css/modal.css";
import "../css/toast.css";
import { format, startOfDay } from "date-fns";
import { Task } from "./task";
import { Card } from "./card";
import { createTask } from "./createTask";
import { noSubtaskEventListener, subtaskEventListener } from "./handleTasks";
import { dropdown, filteredViews } from "./nav";
import { createProject } from "./newProject";
import { editTask } from "./editTask";


editTask();
dropdown();
createTask();
filteredViews();
createProject();
subtaskEventListener();
noSubtaskEventListener();

const today = startOfDay(new Date());
const dueDate = format(today, "MMMM do");

const task1 = new Task("Groceries", "Bread, Eggs, Pasta, Cheese", dueDate, 1, "personal");
const task2 = new Task("Study for Exam", "", dueDate, 3, "work");

const taskCard1 = new Card(task1);
const taskCard2 = new Card(task2);
