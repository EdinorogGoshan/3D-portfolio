// ========== СТРАНИЦА "ПРОЕКТЫ" ==========

// Данные проектов (заглушки)
const projects = [
    { title: "Часы-барабаны", image: "images/preview1.png", link: "project-1.html" },
    { title: "Стенка ГДР", image: "images/preview2.png", link: "project-2.html" },
    { title: "Комод", image: "images/preview3.png", link: "project-3.html" },
    { title: "Чайник", image: "images/preview4.png", link: "project-4.html" },
    { title: "Электра 1001", image: "images/preview5.png", link: "project-5.html" },
];

const projectsGrid = document.getElementById('projectsGrid');
if (projectsGrid) {
    projects.forEach((project) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-overlay">
                <div class="project-title">${project.title}</div>
            </div>
        `;
        card.addEventListener('click', () => {
            window.location.href = project.link;
        });
        projectsGrid.appendChild(card);
    });
}
