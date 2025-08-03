// Инициализация AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Навигация
const nav = document.querySelector('.main-nav');
const burgerMenu = document.querySelector('.burger-menu');
const navLinks = document.querySelector('.nav-links');

// Убираем обработчик прокрутки, так как хедер всегда белый

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

// Слайдер
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

setInterval(nextSlide, 5000);

// Счетчики
const counters = document.querySelectorAll('.counter');

function startCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };

    updateCounter();
}

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounter(entry.target);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.5
});

counters.forEach(counter => observer.observe(counter));

// Яндекс Карты
let map;
const locations = {
    kiseleva: {
        coords: [54.759036, 32.102222], // Координаты Киселевки (ТЦ Кривич)
        balloonContent: 'ул. Рыленкова, 40 (ТЦ "Кривич")<br>2-ой этаж, каб. 25'
    },
    medgorodok: {
        coords: [54.769425, 32.060971], // Координаты Медгородка
        balloonContent: 'ул. Крупской, 37<br>2-ой этаж, каб. 21'
    }
};

function initMap() {
    map = new ymaps.Map('map', {
        center: locations.kiseleva.coords,
        zoom: 14
    });

    // Создаем метки для каждой локации
    for (let key in locations) {
        const placemark = new ymaps.Placemark(locations[key].coords, {
            balloonContent: locations[key].balloonContent
        });
        map.geoObjects.add(placemark);
    }

    // Устанавливаем начальную локацию
    map.setCenter(locations.kiseleva.coords);
}

ymaps.ready(initMap);

// Переключение локаций
const locationCards = document.querySelectorAll('.location-card');

locationCards.forEach(card => {
    card.addEventListener('click', () => {
        locationCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        
        const location = card.dataset.location;
        if (map && locations[location]) {
            map.setCenter(locations[location].coords, 14, {
                duration: 500
            });
        }
    });
});

// Модальное окно
const modal = document.getElementById('callbackModal');
const callbackBtn = document.querySelector('.callback-btn');
const closeBtn = document.querySelector('.close');

callbackBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Формы
const contactForm = document.getElementById('contactForm');
const callbackForm = document.getElementById('callbackForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Здесь добавить логику отправки формы
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
});

callbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Здесь добавить логику отправки формы
    alert('Спасибо! Мы перезвоним вам в ближайшее время.');
    modal.style.display = 'none';
});

// Маска для телефона
const phoneInputs = document.querySelectorAll('input[type="tel"]');

phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D+/g, '');
        let formatted = '';
        
        if (value.length > 0) {
            formatted = '+7 ';
            if (value.length > 1) {
                formatted += '(' + value.substring(1, 4);
            }
            if (value.length >= 4) {
                formatted += ') ' + value.substring(4, 7);
            }
            if (value.length >= 7) {
                formatted += '-' + value.substring(7, 9);
            }
            if (value.length >= 9) {
                formatted += '-' + value.substring(9, 11);
            }
        }
        
        e.target.value = formatted;
    });
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Функция плавной прокрутки к форме
function scrollToForm() {
    const form = document.getElementById('enrollment-form');
    const offset = 80; // Высота навигационной панели
    const formPosition = form.getBoundingClientRect().top + window.pageYOffset;
    
    window.scrollTo({
        top: formPosition - offset,
        behavior: 'smooth'
    });
}

// Обработка отправки формы
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.callback-form form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Здесь будет логика отправки формы
            console.log('Форма отправлена');
        });
    }
});