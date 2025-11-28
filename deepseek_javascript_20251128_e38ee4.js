// -------------------------------------------------------------------------
// 1. Уведомления (Notifications)
// -------------------------------------------------------------------------

/**
 * Показывает плавающее уведомление в нижней части экрана.
 * @param {string} message - Текст сообщения.
 * @param {('success'|'error')} type - Тип уведомления (для стилизации).
 */
function showNotification(message, type) {
    const notification = document.getElementById('notification');
    if (!notification) return;

    // Сброс классов перед показом нового
    notification.className = 'notification'; 
    notification.textContent = message; 
    
    // Добавление классов для показа и стилизации
    notification.classList.add(type, 'show');
    notification.style.display = 'block'; 

    // Автоматическое скрытие через 5 секунд
    setTimeout(() => {
        notification.classList.remove('show');
        // Окончательное скрытие элемента после анимации (0.5s в CSS)
        setTimeout(() => {
            notification.style.display = 'none';
        }, 500);
    }, 5000);
}

// -------------------------------------------------------------------------
// 2. Логика Формы Контактов
// -------------------------------------------------------------------------

/**
 * Обрабатывает отправку формы контактов.
 * @param {Event} event - Событие отправки формы.
 */
function submitForm(event) {
    event.preventDefault(); // Предотвращаем стандартную отправку формы
    const form = event.target;
    
    // В реальном приложении здесь была бы отправка данных на сервер (fetch/AJAX).
    // Для GitHub Pages мы просто имитируем успешную отправку.

    try {
        // Получаем данные формы (для примера)
        const email = form.elements['email'].value;
        const subject = form.elements['subject'].value;
        const message = form.elements['message'].value;

        // Имитация успешной отправки
        console.log("Форма отправлена:");
        console.log(`Email: ${email}, Тема: ${subject}, Сообщение: ${message.substring(0, 50)}...`);

        // Показываем уведомление об успехе
        showNotification('Ваше сообщение успешно отправлено! Мы свяжемся с вами.', 'success');
        
        // Очистка формы
        form.reset();
        
    } catch (e) {
        // Показываем уведомление об ошибке
        console.error("Ошибка при обработке формы:", e);
        showNotification('Произошла ошибка при отправке сообщения. Попробуйте еще раз.', 'error');
    }
}

// -------------------------------------------------------------------------
// 3. Логика FAQ (Техническая Поддержка)
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

// -------------------------------------------------------------------------
// 4. Логика Мобильного Меню (Mobile Navigation)
// -------------------------------------------------------------------------

function initMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = mobileMenu.querySelectorAll('a');

    if (!menuButton || !mobileMenu) return;

    // Переключение меню
    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Закрытие меню при клике на ссылку (для навигации)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}


// -------------------------------------------------------------------------
// 5. Инициализация всех модулей после загрузки DOM
// -------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // Инициализация FAQ
    initFAQ();
    
    // Инициализация Мобильного Меню
    initMobileMenu();

    // Привязка обработчика к форме контактов
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', submitForm);
    }
});
