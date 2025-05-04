export function displayToast() {
    const toastTitle = document.createElement("h2");
    toastTitle.textContent = "Todo It";

    const toastMessage = document.createElement("p");
    toastMessage.textContent = "You've completed a task! Way to go!";

    const toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.appendChild(toastTitle);
    toastContainer.appendChild(toastMessage);

    document.body.appendChild(toastContainer);

    setTimeout(() => {
        document.body.removeChild(toastContainer);
    }, 4000);
}