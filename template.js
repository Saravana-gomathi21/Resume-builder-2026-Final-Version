document.querySelectorAll(".choose").forEach(button => {
    button.addEventListener("click", () => {
        const template = button.dataset.template;
        const allowedTemplates = ["modern","minimal","developer"];
        if (!allowedTemplates.includes(template)) {
            return;
        }
        window.location.href =`editor.html?template=${encodeURIComponent(template)}`;
    });
});

