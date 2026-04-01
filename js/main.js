// ========== ОБЩИЙ JS ДЛЯ ВСЕХ СТРАНИЦ ==========

// Меню
const menuBtn = document.getElementById('menuBtn');
const burgerDropdown = document.getElementById('burgerDropdown');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuClose = document.getElementById('mobileMenuClose');
let isMenuOpen = false;

const isMobile = () => window.innerWidth <= 768;

function closeMenu() {
    isMenuOpen = false;
    menuBtn.classList.remove('active');
    
    if (isMobile()) {
        mobileMenuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    } else {
        burgerDropdown.classList.remove('active');
    }
    
    const menuText = menuBtn.querySelector('.menu-text');
    menuText.textContent = 'Меню';
}

function openMenu() {
    isMenuOpen = true;
    menuBtn.classList.add('active');
    
    if (isMobile()) {
        mobileMenuOverlay.classList.add('active');
        document.body.classList.add('menu-open');
    } else {
        burgerDropdown.classList.add('active');
    }
    
    const menuText = menuBtn.querySelector('.menu-text');
    menuText.textContent = 'Закрыть';
}

function toggleMenu(e) {
    e.stopPropagation();
    if (isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

if (menuBtn) {
    menuBtn.addEventListener('click', toggleMenu);
}

// Закрытие меню при клике вне
document.addEventListener('click', function(e) {
    if (!isMenuOpen) return;
    
    if (isMobile()) {
        if (mobileMenuOverlay && !mobileMenuOverlay.contains(e.target) && !menuBtn.contains(e.target)) {
            closeMenu();
        }
    } else {
        if (burgerDropdown && !burgerDropdown.contains(e.target) && !menuBtn.contains(e.target)) {
            closeMenu();
        }
    }
});

if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMenu);
}

// Закрытие при клике на ссылки в меню
document.querySelectorAll('.burger-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) closeMenu();
    });
});

// Обновление при изменении размера окна
window.addEventListener('resize', function() {
    if (isMenuOpen) {
        const wasMobile = window.innerWidth <= 768;
        closeMenu();
        setTimeout(() => {
            if (wasMobile === (window.innerWidth <= 768)) {
                openMenu();
            }
        }, 100);
    }
});

// ========== МОДАЛЬНОЕ ОКНО ==========
const contactBtn = document.getElementById('contactBtn');
const contactModal = document.getElementById('contactModal');
const closeModalBtn = document.getElementById('closeModalBtn');

if (contactBtn && contactModal && closeModalBtn) {
    contactBtn.addEventListener('click', () => {
        contactModal.classList.add('active');
    });
    
    closeModalBtn.addEventListener('click', () => {
        contactModal.classList.remove('active');
    });
    
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            contactModal.classList.remove('active');
        }
    });
}

// ========== КНОПКА НАВЕРХ ==========
const scrollTopBtn = document.getElementById('scrollTopBtn');

function checkScroll() {
    if (!scrollTopBtn) return;
    
    // Для страниц проектов
    const gallery = document.querySelector('.project-gallery');
    if (gallery) {
        // Проверяем, в каком режиме сейчас страница
        // На мобилках (ширина <= 1024px) скроллится body, а не галерея
        if (window.innerWidth <= 1024) {
            // Мобильный режим - проверяем скролл body
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        } else {
            // Десктопный режим - проверяем скролл галереи
            if (gallery.scrollTop > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
        return;
    }
    
    // Для обычных страниц
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

if (scrollTopBtn) {
    // Проверяем тип страницы
    const gallery = document.querySelector('.project-gallery');
    
    if (gallery) {
        // Подписываемся на оба события скролла
        gallery.addEventListener('scroll', checkScroll);
        window.addEventListener('scroll', checkScroll);
        
        // При изменении размера окна тоже проверяем
        window.addEventListener('resize', checkScroll);
    } else {
        window.addEventListener('scroll', checkScroll);
    }
    
    checkScroll();
    
    scrollTopBtn.addEventListener('click', () => {
        const gallery = document.querySelector('.project-gallery');
        
        if (gallery) {
            // Проверяем режим
            if (window.innerWidth <= 1024) {
                // Мобильный режим - скроллим body
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                // Десктопный режим - скроллим галерею
                gallery.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

if (scrollTopBtn) {
    // Проверяем тип страницы
    const gallery = document.querySelector('.project-gallery');
    if (gallery) {
        gallery.addEventListener('scroll', checkScroll);
    } else {
        window.addEventListener('scroll', checkScroll);
    }
    checkScroll();
    
    scrollTopBtn.addEventListener('click', () => {
        const gallery = document.querySelector('.project-gallery');
        if (gallery) {
            gallery.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}