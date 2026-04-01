// ========== СТРАНИЦА "ОБО МНЕ" ==========

// Данные навыков
const skills = [
    { name: "Blender", percent: 80, icon: "<img src='images/Blender.png' alt='Blender'>" },
    { name: "Photoshop", percent: 85, icon: "<img src='images/Ps.png' alt='Photoshop'>" },
    { name: "Substance Painter", percent: 88, icon: "<img src='images/Pt.png' alt='Substance Painter'>" },
    { name: "Unreal", percent: 50, icon: "<img src='images/Unreal.png' alt='Unreal Engine'>" },
    { name: "Figma", percent: 83, icon: "<img src='images/Figma.png' alt='Figma'>" },
    { name: "Illustrator", percent: 70, icon: "<img src='images/Ai.png' alt='Illustrator'>" }
];

// Генерация списка навыков
const skillsList = document.getElementById('skillsList');
if (skillsList) {
    skills.forEach((skill) => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML = `
            <div class="skill-icon">${skill.icon}</div>
            <div class="skill-bar-container">
                <div class="skill-bar-bg"></div>
                <div class="skill-bar-fill" data-percent="${skill.percent}"></div>
                <div class="skill-marker" style="left: ${skill.percent}%;"></div>
            </div>
        `;
        skillsList.appendChild(skillItem);
    });
}

// Анимация шкал при прокрутке
const skillBars = document.querySelectorAll('.skill-bar-fill');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible && (bar.style.width === '0px' || bar.style.width === '')) {
            const percent = bar.getAttribute('data-percent');
            bar.style.width = percent + '%';
        }
    });
}

window.addEventListener('load', animateSkillBars);
window.addEventListener('scroll', animateSkillBars);
window.addEventListener('resize', animateSkillBars);