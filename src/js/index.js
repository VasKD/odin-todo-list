import "../css/global.css";
import "../css/nav.css";
import "../css/header.css";
import "../css/card.css";
import "../css/modal.css";
import "../css/toast.css";
import { createTask } from "./createTask";
import { noSubtaskEventListener, subtaskEventListener } from "./handleTasks";
import { dropdown, filteredViews } from "./nav";
import { createProject } from "./newProject";
import { editTask } from "./editTask";
import { displayStoredTasks, loadProjectsFromStorage, initializeDefaultTask } from "./storage";


editTask();
dropdown();
createTask();
filteredViews();
createProject();
subtaskEventListener();
noSubtaskEventListener();
loadProjectsFromStorage();
initializeDefaultTask(); 
displayStoredTasks();
