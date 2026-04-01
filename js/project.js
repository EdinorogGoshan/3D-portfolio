// ========== СТРАНИЦЫ ПРОЕКТОВ ==========

// Настройки для навигации между проектами
const projectLinks = [
    "project-1.html",
    "project-2.html",
    "project-3.html",
    "project-4.html",
    "project-5.html"
];

// Определяем текущий проект по URL или по data-атрибуту
const projectElement = document.querySelector('[data-project-id]');
let currentProjectId = projectElement ? parseInt(projectElement.dataset.projectId) : 1;

if (!currentProjectId) {
    const url = window.location.pathname;
    const match = url.match(/project-(\d+)\.html/);
    if (match) {
        currentProjectId = parseInt(match[1]);
    }
}

const totalProjects = projectLinks.length;

// Обновляем счетчик
const projectCounter = document.getElementById('projectCounter');
if (projectCounter) {
    projectCounter.textContent = `Проект ${currentProjectId}/${totalProjects}`;
}

// Навигация с зацикливанием
const prevBtn = document.getElementById('prevProject');
const nextBtn = document.getElementById('nextProject');

if (prevBtn) {
    // Убираем disabled класс, так как навигация теперь зациклена
    prevBtn.classList.remove('disabled');
    
    prevBtn.addEventListener('click', () => {
        let newProjectId;
        
        if (currentProjectId === 1) {
            // Если первый проект, переходим на последний
            newProjectId = totalProjects;
        } else {
            // Иначе на предыдущий
            newProjectId = currentProjectId - 1;
        }
        
        window.location.href = projectLinks[newProjectId - 1];
    });
}

if (nextBtn) {
    // Убираем disabled класс, так как навигация теперь зациклена
    nextBtn.classList.remove('disabled');
    
    nextBtn.addEventListener('click', () => {
        let newProjectId;
        
        if (currentProjectId === totalProjects) {
            // Если последний проект, переходим на первый
            newProjectId = 1;
        } else {
            // Иначе на следующий
            newProjectId = currentProjectId + 1;
        }
        
        window.location.href = projectLinks[newProjectId - 1];
    });
}

// ========== ПЕРЕНАПРАВЛЕНИЕ СКРОЛЛА (БЫСТРАЯ И ПЛАВНАЯ) ==========

(function() {
    const gallery = document.querySelector('.project-gallery');
    if (!gallery) return;
    
    // Настройки (можно менять под свой вкус)
    const SETTINGS = {
        speed: 1.5,        // Скорость прокрутки (1 = стандартная, больше = быстрее)
        smoothness: 0.12,  // Плавность (0.05 = медленно, 0.3 = быстро)
    };
    
    let targetScroll = gallery.scrollTop;
    let currentScroll = gallery.scrollTop;
    let animationFrame = null;
    
    function animate() {
        const diff = targetScroll - currentScroll;
        
        if (Math.abs(diff) < 0.5) {
            currentScroll = targetScroll;
            gallery.scrollTop = targetScroll;
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
            return;
        }
        
        currentScroll += diff * SETTINGS.smoothness;
        gallery.scrollTop = currentScroll;
        
        animationFrame = requestAnimationFrame(animate);
    }
    
    window.addEventListener('wheel', function(event) {
        if (window.innerWidth <= 1024) return;
        
        const maxScroll = gallery.scrollHeight - gallery.clientHeight;
        let newScroll = targetScroll + (event.deltaY * SETTINGS.speed);
        newScroll = Math.max(0, Math.min(maxScroll, newScroll));
        
        if (newScroll === targetScroll) return;
        
        targetScroll = newScroll;
        
        if (!animationFrame) {
            animate();
        }
        
        event.preventDefault();
    }, { passive: false });
    
    gallery.addEventListener('wheel', function(event) {
        event.stopPropagation();
    });
    
    gallery.addEventListener('scroll', function() {
        if (!animationFrame) {
            targetScroll = gallery.scrollTop;
            currentScroll = gallery.scrollTop;
        }
    });
    
})();

// ========== ДОБАВЛЯЕМ ОТСТУП ПОСЛЕ ПОСЛЕДНЕГО ЭЛЕМЕНТА ==========
(function() {
    const gallery = document.querySelector('.gallery-content');
    if (!gallery) return;
    
    // Функция для получения размера отступа в зависимости от ширины экрана
    function getSpacerHeight() {
        const width = window.innerWidth;
        
        // Мобильные устройства (до 768px)
        if (width <= 768) {
            return '40px';
        }
        // Планшеты (769px - 1024px) - опционально
        else if (width <= 1024) {
            return '60px';
        }
        // Десктоп (1025px и выше)
        else {
            return '88px';
        }
    }
    
    // Функция для создания или обновления спейсера
    function updateSpacer() {
        let spacer = gallery.querySelector('.gallery-spacer');
        
        if (!spacer) {
            // Создаем спейсер если его нет
            spacer = document.createElement('div');
            spacer.className = 'gallery-spacer';
            spacer.style.width = '100%';
            spacer.style.flexShrink = '0';
            gallery.appendChild(spacer);
        }
        
        // Обновляем высоту
        const newHeight = getSpacerHeight();
        spacer.style.height = newHeight;
    }
    
    // Создаем спейсер
    updateSpacer();
    
    // Следим за изменением размера окна
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateSpacer();
        }, 100);
    });
})();