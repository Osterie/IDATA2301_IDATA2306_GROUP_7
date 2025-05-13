// Optional JavaScript for interactivity (if needed)
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".card-button");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            alert("You clicked on a card!");
        });
    });
});
