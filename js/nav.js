// Навигация
const nav = document.querySelector('.main-nav');
const burgerMenu = document.querySelector('.burger-menu');
const navLinks = document.querySelector('.nav-links');

burgerMenu.addEventListener('click', (e) => {
    e.stopPropagation(); // Предотвращаем всплытие события
    navLinks.classList.toggle('active');
    burgerMenu.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Закрываем меню при клике на ссылку
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Закрываем меню при клике вне его
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links') && !e.target.closest('.burger-menu')) {
        burgerMenu.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});