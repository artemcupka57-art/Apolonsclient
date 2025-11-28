// -------------------------------------------------------------------------
// 0. Инициализация и Приветственный Экран
// -------------------------------------------------------------------------

const introScreen = document.getElementById('intro-screen');

window.onload = function () {
    // Убеждаемся, что все загружено, затем запускаем анимацию
    setTimeout(() => {
        introScreen.classList.add('hidden');
        document.body.classList.add('loaded');
        
        // Удаляем элемент через 1 секунду после начала fade out
        setTimeout(() => {
            introScreen.style.display = 'none';
        }, 1000);
        
        // Инициализация логики FAQ и меню после загрузки
        initFAQ();
        initMenu();
        initModals();
    }, 1500); // Приветственный экран держится 1.5 секунды
};

// -------------------------------------------------------------------------
// 1. Адаптивное Меню (Гамбургер)
// -------------------------------------------------------------------------

const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function initMenu() {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        // Блокируем скролл, когда меню открыто
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Закрытие меню при клике на ссылку
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
    
    // Открытие модального окна из мобильного меню
    document.getElementById('openDownloadBtnMobile').addEventListener('click', () => {
        closeMenu();
        openModal(document.getElementById('downloadModal'));
    });
}

function closeMenu() {
    menuToggle.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
}


// -------------------------------------------------------------------------
// 2. Модальные окна: Открытие/Закрытие
// -------------------------------------------------------------------------

const downloadModal = document.getElementById('downloadModal');
const notification = document.getElementById('notification');

function initModals() {
    // Кнопка Скачать на Hero-секции
    const openDownloadBtnHero = document.getElementById('openDownloadBtnHero');
    const closeButtons = document.querySelectorAll('.modal-close');
    
    openDownloadBtnHero.addEventListener('click', () => openModal(downloadModal));

    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal-target');
            const modal = document.getElementById(modalId);
            closeModal(modal);
        });
    });

    window.addEventListener('click', function(event) {
        if (event.target === downloadModal) {
            closeModal(downloadModal);
        }
    });
}


/**
 * Открывает указанное модальное окно.
 * @param {HTMLElement} modal - Элемент модального окна.
 */
function openModal(modal) {
  if (modal) {
    modal.style.display = 'flex';
    // Даем браузеру время, чтобы применить display: flex, прежде чем добавить active
    setTimeout(() => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокируем скролл фона
    }, 10);
  }
}

/**
 * Закрывает указанное модальное окно.
 * @param {HTMLElement} modal - Элемент модального окна.
 */
function closeModal(modal) {
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Разблокируем скролл фона
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 500); // 500ms соответствует длительности перехода
  }
}

// -------------------------------------------------------------------------
// 3. Уведомление
// -------------------------------------------------------------------------

/**
 * Показывает всплывающее уведомление.
 * @param {string} message - Текст сообщения.
 * @param {'success' | 'error'} type - Тип уведомления.
 */
function showNotification(message, type) {
  notification.textContent = message;
  notification.className = ''; 
  notification.classList.add(type, 'show');
  notification.style.display = 'block'; // Убеждаемся, что он виден
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
        notification.style.display = 'none';
    }, 500);
  }, 5000);
}

// -------------------------------------------------------------------------
// 4. Логика FAQ (Техническая Поддержка)
// -------------------------------------------------------------------------

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const wasOpen = answer.classList.contains('open');
            
            // Закрываем все открытые ответы
            faqItems.forEach(i => {
                i.querySelector('.faq-answer').classList.remove('open');
                i.querySelector('.faq-question').classList.remove('active');
            });
            
            // Если ответ не был открыт, открываем его
            if (!wasOpen) {
                answer.classList.add('open');
                question.classList.add('active');
            }
        });
    });
}