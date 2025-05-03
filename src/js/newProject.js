export function createProject(){
    const addProjectModal = document.getElementById("add-project");

    const addProjectBtn = document.querySelector(".add-project");
    addProjectBtn.addEventListener("click", () => addProjectModal.showModal());

    const exitButton = document.querySelector("#project-exit");
    exitButton.addEventListener("click", () => addProjectModal.close());

    const addProjectForm = document.getElementById("add-project-form");
    addProjectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // retrieve project name from input
        const projectName = document.getElementById("project-name").value;

        // create new tab and add right before the add project button
        const projectTab = document.createElement("button");
        projectTab.id = projectName.toLowerCase();
        projectTab.textContent = titleCase(projectName);
        addProjectBtn.before(projectTab);

        // update the add task modal selection element
        const projectOption = document.createElement("option");
        projectOption.value = projectName.toLowerCase();
        projectOption.textContent = titleCase(projectName);

        // append option to both select elements (create and edit modals)
        const projectSelection = document.querySelectorAll("select");
        projectSelection.forEach(selection => {
            const option = projectOption.cloneNode(true);
            selection.appendChild(option);
        });
        
    });
}


function titleCase (str) {
    if (str.length === 0 || !str) {
        return undefined;
    } else {
        return str.toLowerCase().split(' ').map(function(word) {
            return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ');
    }
}