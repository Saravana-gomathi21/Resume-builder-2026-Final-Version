
document.querySelectorAll(".choose").forEach(button => {
    button.addEventListener("click", () => {
        console.log(button.dataset.template);
        sessionStorage.setItem("selectedTemplate",button.dataset.template);
        window.location.href = "editor.html";
    });
});