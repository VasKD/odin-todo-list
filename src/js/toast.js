export function displayToast(message) {
    const toastContainer = document.createElement("div");
    const toastTitle = document.createElement("h2");
    toastTitle.textContent = "Todo It";

    const toastMessage = document.createElement("p");
    if (message === "completed"){
        toastMessage.textContent = "You've completed a task! Way to go!";
    } else if (message === "edit") {
        toastMessage.textContent = "Changes cannot be made to completed tasks";
        toastContainer.style.height = "110px";

    }

    toastContainer.id = "toast-container";
    toastContainer.appendChild(toastTitle);
    toastContainer.appendChild(toastMessage);

    document.body.appendChild(toastContainer);

    setTimeout(() => {
        document.body.removeChild(toastContainer);
    }, 4000);
}