import "../css/global.css";
import "../css/nav.css";
import "../css/header.css";
import "../css/card.css";
import "../css/modal.css";

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