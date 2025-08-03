// Инициализация AOS
AOS.init({
    duration: 800,
    once: true
});

// Обработка клика по кнопкам
document.querySelectorAll('.info-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Здесь будет логика для открытия соответствующего раздела
        // Пока просто анимация нажатия
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 200);
    });
}); 