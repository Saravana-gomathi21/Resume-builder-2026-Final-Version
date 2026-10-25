
// templates section

let resumeTemplates = {
    modern: `
        <article class="resume resume-modern">
            <aside class="modern-sidebar">
                <div class="modern-avatar">JD</div>
                <h2 data-resume="name">Saravana</h2>
                <p class="modern-role" data-resume="role">Software Developer</p>

                <section>
                    <h3>CONTACT</h3>
                    <p data-resume="email"></p>
                    <p data-resume="phone"></p>
                    <p data-resume="location"></p>
                    <p data-resume="linkedin"></p>
                </section>

                <section>
                    <h3>SKILLS</h3>
                    <ul data-resume="skills"></ul>
                </section>

                <section>
                    <h3>LANGUAGES</h3>
                    <div data-resume="languages"></div>
                </section>
            </aside>

            <div class="modern-content">
                <section>
                    <h3>PROFILE</h3>
                    <p data-resume="summary"></p>
                </section>
                <section>
                    <h3>WORK EXPERIENCE</h3>
                    <div data-repeat="experience"></div>
                </section>
                <section>
                    <h3>EDUCATION</h3>
                    <div data-repeat="education"></div>
                </section>
                <section>
                    <h3>PROJECTS</h3>
                    <div data-repeat="project"></div>
                </section>
            </div>
        </article>
    `,

    minimal: `
        <article class="resume resume-minimal">
            <header class="minimal-header">
                <h1 data-resume="name"></h1>
                <p data-resume="role"></p>
                <div class="minimal-contact">
                    <span data-resume="location"></span> |
                    <span data-resume="phone"></span><br>
                    <span data-resume="email"></span> |
                    <span data-resume="linkedin"></span>
                </div>
            </header>

            <section>
                <h3>PROFESSIONAL SUMMARY</h3>
                <p data-resume="summary"></p>
            </section>
            <section>
                <h3>EXPERIENCE</h3>
                <div data-repeat="experience"></div>
            </section>
            <section>
                <h3>EDUCATION</h3>
                <div data-repeat="education"></div>
            </section>
            <section>
                <h3>TECHNICAL SKILLS</h3>
                <p data-resume="skills-inline"></p>
            </section>
            <section>
                <h3>LANGUAGES</h3>
                <p data-resume="languages-inline"></p>
            </section>
            <section>
                <h3>PROJECTS</h3>
                <div data-repeat="project"></div>
            </section>
        </article>
    `,

    developer: `
        <article class="resume resume-developer">
            <header class="developer-header">
                <h1 data-resume="name"></h1>
                <p class="developer-title" data-resume="role"></p>
                <p>
                    <span data-resume="location"></span> |
                    <span data-resume="phone"></span>
                </p>
                <p>
                    <span data-resume="email"></span> |
                    <span data-resume="github"></span>
                </p>
                <p data-resume="linkedin"></p>
            </header>

            <section>
                <h3>SUMMARY</h3>
                <p data-resume="summary"></p>
            </section>
            <section>
                <h3>TECHNICAL SKILLS</h3>
                <p><strong>Skills:</strong>
                    <span data-resume="skills-inline"></span>
                </p>
                <p><strong>Languages:</strong>
                    <span data-resume="languages-inline"></span>
                </p>
            </section>
            <section>
                <h3>PROJECTS</h3>
                <div data-repeat="project"></div>
            </section>
            <section>
                <h3>EDUCATION</h3>
                <div data-repeat="education"></div>
            </section>
            <section>
                <h3>EXPERIENCE</h3>
                <div data-repeat="experience"></div>
            </section>
        </article>
    `,

    custom: `
        <article class="resume resume-custom">
            <div class="custom-canvas"></div>
        </article>
    `
};

// fetching resume sections

let resumeSection = document.getElementById("resume-section");
let resumeForm = document.getElementById("resume-form");

// fetching template name

let requestedTemplate =
    new URLSearchParams(window.location.search).get("template");

let templateName = Object.hasOwn(resumeTemplates, requestedTemplate)
    ? requestedTemplate
    : "custom";

if (templateName == "custom"){
    document.body.classList.add("custom-editor");
}else{
    document.body.classList.remove("custom-editor");
}

//Default Values of resume

let defaultValues = {
    name: "Saravana",
    role: "Software Developer",
    email: "Saravana@email.com",
    phone: "+91 98765 43210",
    location: "Chennai, India",
    linkedin: "linkedin.com/in/saravana",
    github: "github.com/johndoe",
    summary:
        "Motivated software developer passionate about building reliable, user-friendly web applications and solving real-world problems through technology.",
    skills: "JavaScript, HTML & CSS, React.js, Node.js, SQL",
    languages: "English, Tamil"
};

//Repeatable Resume content

let repeatableConfig = {
    education: {
        listId: "education-list",
        title: "Education",
        fields: [
            ["qualification", "Qualification", "Diploma in Computer Engineering"],
            ["institution", "College / Institution", "Your college name"],
            ["dates", "Study period", "2023 – 2026"],
            ["description", "Details / Achievements", "CGPA, achievements, coursework"]
        ]
    },

    experience: {
        listId: "experience-list",
        title: "Experience",
        fields: [
            ["title", "Job title", "Software Developer"],
            ["company", "Company", "Company name"],
            ["dates", "Duration", "2025 – Present"],
            ["description", "Responsibilities (one per line)", "Developed web applications"]
        ]
    },

    project: {
        listId: "project-list",
        title: "Project",
        fields: [
            ["name", "Project name", "Smart Resume Builder"],
            ["technologies", "Technologies", "HTML, CSS, JavaScript"],
            ["description", "Description", "Describe your project"]
        ]
    }
};

let defaultEntries = {
    education: [{
        qualification: "Bachelor of Computer Science",
        institution: "XYZ College",
        dates: "2021 – 2024",
        description:
            "Graduated with a strong foundation in programming and software development."
    }],

    experience: [{
        title: "Junior Web Developer",
        company: "ABC Technologies",
        dates: "2024 – Present",
        description:
            "Developed responsive web interfaces using HTML, CSS and JavaScript.\nImproved application performance and user experience.\nCollaborated with developers to deliver new features."
    }],

    project: [{
        name: "Smart Resume Builder",
        technologies: "HTML, CSS, JavaScript",
        description:
            "Built a resume creation tool with multiple templates and a responsive interface."
    }]
};

let fieldIds = Object.keys(defaultValues);

// custom section configs

let customSections = {
    profile: {
        title: "Profile",
        content: `
            <h2 data-resume="name"></h2>
            <p data-resume="role"></p>
            <p data-resume="email"></p>
            <p data-resume="phone"></p>
            <p data-resume="location"></p>
            <p data-resume="linkedin"></p>
            <p data-resume="github"></p>
        `
    },

    summary: {
        title: "Professional Summary",
        content: `<p data-resume="summary"></p>`
    },

    skills: {
        title: "Technical Skills",
        content: `<ul data-resume="skills"></ul>`
    },

    education: {
        title: "Education",
        content: `<div data-repeat="education"></div>`
    },

    experience: {
        title: "Work Experience",
        content: `<div data-repeat="experience"></div>`
    },

    project: {
        title: "Projects",
        content: `<div data-repeat="project"></div>`
    },

    languages: {
        title: "Languages",
        content: `<div data-resume="languages"></div>`
    }
};

// get the form fields

function getField(id) {
    return document.getElementById(id);
}

// get the form field values

function getFieldValue(id) {
    let field = getField(id);
    return field ? field.value.trim() : "";
}

//Set the text to the resume content

function setText(selector, value, root = resumeSection) {
    let element = root.querySelector(selector);
    if (element) element.textContent = value;
}

// setting the initial values to form

function fillForm(values = {}) {
    fieldIds.forEach(id => {
        let field = getField(id);
        if (field) {
            field.value = values[id] ?? defaultValues[id];
        }
    });
}

// Creating the entries to the form

function createEntry(type, values = {}) {
    let config = repeatableConfig[type];
    if (!config) return;

    let list = document.getElementById(config.listId);
    if (!list) return;

    let container = document.createElement("div");
    container.className = "repeatable-entry";
    container.dataset.entryType = type;

    let heading = document.createElement("div");
    heading.className = "entry-heading";

    let title = document.createElement("strong");
    title.textContent = `${config.title} entry`;

    let removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "remove-entry";
    removeButton.textContent = "Remove";

    removeButton.addEventListener("click", () => {
        if (list.children.length > 1) {
            container.remove();
        } else {
<<<<<<< HEAD
            alert("At least one entry is required.");
=======
            alert("Minimum On Field is Required !");
>>>>>>> 44c25e3 (Final UI)
        }

        updateResume();
        saveResume();
    });

    heading.append(title, removeButton);
    container.appendChild(heading);

    config.fields.forEach(([key, labelText, placeholder]) => {
        let id = `${type}-${key}-${crypto.randomUUID()}`;

        let label = document.createElement("label");
        label.htmlFor = id;
        label.textContent = labelText;

        let field = document.createElement(
            key === "description" ? "textarea" : "input"
        );

        field.id = id;
        field.name = key;
        field.dataset.field = key;
        field.placeholder = placeholder;
        field.value = values[key] ?? "";

        if (key === "description") {
            field.rows = 3;
        } else {
            field.type = "text";
        }

        field.addEventListener("input", () => {
            updateResume();
            saveResume();
        });

        container.append(label, field);
    });

    list.appendChild(container);
}

//Read Form Values and convert them to object

function getRepeatableData(type) {
    let list = document.getElementById(repeatableConfig[type].listId);
    if (!list) return [];

    return [...list.querySelectorAll(".repeatable-entry")].map(entry => {
        let data = {};

        entry.querySelectorAll("[data-field]").forEach(field => {
            data[field.dataset.field] = field.value;
        });

        return data;
    });
}

// reconstructs the form entries from saved data

function loadRepeatableData(type, entries) {
    let list = document.getElementById(repeatableConfig[type].listId);
    if (!list) return;

    list.replaceChildren();

    let data = Array.isArray(entries) && entries.length
        ? entries
        : defaultEntries[type];

    data.forEach(entry => createEntry(type, entry));
}

// initializes all three repeatable form types

function initializeRepeatableForms(savedData = {}) {
    Object.keys(repeatableConfig).forEach(type => {
        loadRepeatableData(type, savedData[type]);
    });
}

// To Create the Resume Elements

function createResumeElement(tag, text, className = "") {
    let element = document.createElement(tag);
    element.textContent = text;

    if (className) element.className = className;

    return element;
}

// Rendering repeatable sections in the resume

function renderRepeatableSection(type) {
    let target = resumeSection.querySelector(`[data-repeat="${type}"]`);
    if (!target) return;

    target.replaceChildren();

    getRepeatableData(type).forEach((entry, index) => {
        let item = document.createElement("div");
        item.className = "dynamic-resume-item";

        if (type === "education") {
            item.appendChild(
                createResumeElement("h4", entry.qualification || "Qualification")
            );

            let meta = [entry.institution, entry.dates]
                .filter(Boolean)
                .join(" | ");

            if (meta) {
                item.appendChild(
                    createResumeElement("p", meta, "resume-meta")
                );
            }

            if (entry.description?.trim()) {
                item.appendChild(
                    createResumeElement("p", entry.description)
                );
            }
        }

        if (type === "experience") {
            item.appendChild(
                createResumeElement("h4", entry.title || "Job title")
            );

            let meta = [entry.company, entry.dates]
                .filter(Boolean)
                .join(" | ");

            if (meta) {
                item.appendChild(
                    createResumeElement("p", meta, "resume-meta")
                );
            }

            let list = document.createElement("ul");

            (entry.description || "")
                .split("\n")
                .map(line => line.trim())
                .filter(Boolean)
                .forEach(line => {
                    list.appendChild(createResumeElement("li", line));
                });

            if (list.children.length) item.appendChild(list);
        }

        if (type === "project") {
            item.appendChild(
                createResumeElement("h4", entry.name || `Project ${index + 1}`)
            );

            if (entry.technologies?.trim()) {
                item.appendChild(
                    createResumeElement("p", entry.technologies, "resume-meta")
                );
            }

            if (entry.description?.trim()) {
                item.appendChild(
                    createResumeElement("p", entry.description)
                );
            }
        }

        target.appendChild(item);
    });
}

// To Render Skills and Language

function renderSkillsAndLanguages() {
    let skills = getFieldValue("skills") || defaultValues.skills;
    let languages = getFieldValue("languages") || defaultValues.languages;

    let skillsList = resumeSection.querySelector('[data-resume="skills"]');

    if (skillsList) {
        skillsList.replaceChildren();

        skills.split(",")
            .map(item => item.trim())
            .filter(Boolean)
            .forEach(skill => {
                skillsList.appendChild(createResumeElement("li", skill));
            });
    }

    let languageContainer =
        resumeSection.querySelector('[data-resume="languages"]');

    if (languageContainer) {
        languageContainer.replaceChildren();

        languages.split(",")
            .map(item => item.trim())
            .filter(Boolean)
            .forEach(language => {
                languageContainer.appendChild(
                    createResumeElement("p", language)
                );
            });
    }

    setText(
        '[data-resume="skills-inline"]',
        skills.split(",").map(s => s.trim()).filter(Boolean).join(" · ")
    );

    setText(
        '[data-resume="languages-inline"]',
        languages.split(",").map(s => s.trim()).filter(Boolean).join(" · ")
    );
}

function saveResume() {
    let resumeData = {
        fields: {},
        education: getRepeatableData("education"),
        experience: getRepeatableData("experience"),
        project: getRepeatableData("project"),
        template: templateName
    };

    fieldIds.forEach(id => {
        resumeData.fields[id] = getFieldValue(id);
    });

    sessionStorage.setItem("resumeData", JSON.stringify(resumeData));
}

function updateResume() {
    fieldIds.forEach(id => {
        let value = getFieldValue(id) || defaultValues[id];

        resumeSection.querySelectorAll(`[data-resume="${id}"]`)
            .forEach(element => {
                element.textContent =
                    (id === "name" || id === "role") &&
                    templateName === "minimal"
                        ? value.toUpperCase()
                        : value;
            });
    });
    renderSkillsAndLanguages();
    Object.keys(repeatableConfig).forEach(renderRepeatableSection);
    let avatar = resumeSection.querySelector(".modern-avatar");
    if (avatar) {
        let name = getFieldValue("name") || defaultValues.name;
        avatar.textContent = name
            .split(/\s+/)
            .map(part => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    }
}

function loadResume() {
    let savedData = sessionStorage.getItem("resumeData");
    if (!savedData) {
        fillForm(defaultValues);
        initializeRepeatableForms(defaultEntries);
        return;
    }
    try {
        let temp = JSON.parse(savedData);
        fillForm(temp.fields || {});
        initializeRepeatableForms({
            education: temp.education,
            experience: temp.experience,
            project: temp.project
        });
    } catch (error) {
        console.error("Failed to load resume:", error);
        fillForm(defaultValues);
        initializeRepeatableForms(defaultEntries);
    }
}

function addCustomSection(type) {
    if (templateName !== "custom") return;
    let canvas = resumeSection.querySelector(".custom-canvas");
    let config = customSections[type];
    if (!canvas || !config) return;
    if (canvas.querySelector(`[data-section="${type}"]`)) return;
    let section = document.createElement("section");
    section.className = "custom-resume-section";
    section.dataset.section = type;
    let heading = document.createElement("header");
    heading.className = "custom-section-heading";
    let title = document.createElement("strong");
    title.textContent = config.title;
    let handle = document.createElement("span");
    handle.className = "custom-drag-handle";
    handle.textContent = "⠿";
    handle.title = "Drag to rearrange";
    let remove = document.createElement("button");
    remove.type = "button";
    remove.className = "custom-remove-section";
    remove.textContent = "×";
    remove.title = "Remove section";
    remove.addEventListener("click", () => {
        section.remove();
        saveCustomLayout();
    });
    heading.append(title, handle, remove);
    section.appendChild(heading);
    let content = document.createElement("div");
    content.className = "custom-section-content";
    content.innerHTML = config.content;
    section.appendChild(content);
    canvas.appendChild(section);
    updateResume();
    saveCustomLayout();
}

function saveCustomLayout() {
    if (templateName !== "custom") return;
    let canvas = resumeSection.querySelector(".custom-canvas");
    if (!canvas) return;
    let layout = [...canvas.querySelectorAll(":scope > [data-section]")].map(section => section.dataset.section);
    sessionStorage.setItem("customResumeLayout", JSON.stringify(layout));
}

function loadCustomLayout() {
    if (templateName !== "custom") return;
    let layout = [];
    try {
        layout = JSON.parse(
            sessionStorage.getItem("customResumeLayout") || "[]"
        );
    } catch (error) {
        console.error("Failed to load custom layout:", error);
    }
    if (!Array.isArray(layout)) return;
    layout.forEach(type => {
        if (Object.hasOwn(customSections, type)) {
            addCustomSection(type);
        }
    });
}

function initializeCustomDragDrop() {
    if (templateName !== "custom") return;
    let canvas = $(".custom-canvas");
    if (!canvas.length) return;
    canvas.sortable({
        items: "> .custom-resume-section",
        handle: ".custom-drag-handle",
        placeholder: "custom-section-placeholder",
        forcePlaceholderSize: true,
        tolerance: "pointer",
        update: saveCustomLayout
    });
}

function resetResume() {
    fillForm(defaultValues);
    initializeRepeatableForms(defaultEntries);
    if (templateName === "custom") {
        sessionStorage.removeItem("customResumeLayout");
        let canvas = resumeSection.querySelector(".custom-canvas");
        if (canvas) canvas.replaceChildren();
    }
    updateResume();
    saveResume();
}

function printResume() {
    if (!window.jspdf?.jsPDF) {
        alert("PDF library is not loaded.");
        return;
    }
    let resumeTemp = resumeSection.querySelector(".resume");
    if (!resumeTemp) return;
    let doc = new window.jspdf.jsPDF();

    let resumeName =
        resumeSection.querySelector('[data-resume="name"]')?.textContent || getFieldValue("name") || "Resume";
    doc.html(resumeTemp, {
        callback: function (pdf) {
            pdf.save(`${resumeName.trim()}-resume.pdf`);
        },
        x: 1,
        y: 1,
        width: 200,
        windowWidth: 750
    });
}

function initializeEditor() {
    if (!resumeSection || !resumeForm) return;

    if (!Object.hasOwn(resumeTemplates, templateName)) {
        resumeSection.replaceChildren();
        return;
    }

    resumeSection.innerHTML = resumeTemplates[templateName];

    let toolbox = document.getElementById("section-toolbox");

    if (toolbox) {
        toolbox.hidden = templateName !== "custom";
    }

    loadResume();
    updateResume();
    loadCustomLayout();
    initializeCustomDragDrop();

    resumeForm.addEventListener("input", () => {
        updateResume();
        saveResume();
    });

    resumeForm.addEventListener("reset", event => {
        event.preventDefault();
        resetResume();
    });

    document.querySelectorAll("[data-add]").forEach(button => {
        button.addEventListener("click", () => {
            createEntry(button.dataset.add);
            updateResume();
            saveResume();
        });
    });

    document.querySelectorAll("[data-section-add]").forEach(button => {
        button.addEventListener("click", () => {
            addCustomSection(button.dataset.sectionAdd);
        });
    });

    let printButton = document.getElementById("print-resume");

    if (printButton) {
        printButton.addEventListener("click", printResume);
    }
<<<<<<< HEAD
=======
});


document.querySelector(".bot").addEventListener("click",(event)=>{
    event.currentTarget.style.display = "none";
    document.querySelector(".chat").style.display= "block";
});


function printResume(){
    window.jsPDF = window.jspdf.jsPDF;
    let doc = new jsPDF();
    let resumeTemp = document.querySelector(".resume");
    doc.html(resumeTemp,{
        callback: function (doc) {
            doc.save(`${document.querySelector('[data-resume="name"]').textContent}-resume.pdf`)
        },x : 1, y : 1, width : 200, windowWidth : 750
    })
>>>>>>> 44c25e3 (Final UI)
}

document.querySelector(".bot")?.addEventListener("click", event => {
    event.currentTarget.style.display = "none";

    let chat = document.querySelector(".chat");
    if (chat) chat.style.display = "block";
});

initializeEditor();
