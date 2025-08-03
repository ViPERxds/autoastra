// Инициализация AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Галерея
const galleryItems = document.querySelectorAll('.gallery-item');
let currentImage = null;

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        
        if (!currentImage) {
            // Создаем модальное окно
            const modal = document.createElement('div');
            modal.classList.add('gallery-modal');
            
            const modalImg = document.createElement('img');
            modalImg.src = img.src;
            
            const closeBtn = document.createElement('span');
            closeBtn.classList.add('gallery-close');
            closeBtn.innerHTML = '&times;';
            
            modal.appendChild(modalImg);
            modal.appendChild(closeBtn);
            document.body.appendChild(modal);
            
            // Анимация открытия
            setTimeout(() => modal.classList.add('active'), 10);
            
            currentImage = modal;
            
            // Обработчики закрытия
            closeBtn.addEventListener('click', closeGallery);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeGallery();
            });
        }
    });
});

function closeGallery() {
    if (currentImage) {
        currentImage.classList.remove('active');
        setTimeout(() => {
            currentImage.remove();
            currentImage = null;
        }, 300);
    }
}

// Параллакс эффект для героя
const heroSection = document.querySelector('.about-hero');

window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    heroSection.style.backgroundPositionY = `${scroll * 0.5}px`;
});

// Анимация таймлайна
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.5
});

timelineItems.forEach(item => timelineObserver.observe(item));

// Анимация статистики команды
const stats = document.querySelectorAll('.stat span');

function animateStats(stat) {
    const value = parseInt(stat.textContent);
    let current = 0;
    const increment = value / 50;
    const duration = 1500;
    const interval = duration / 50;

    const counter = setInterval(() => {
        current += increment;
        if (current >= value) {
            stat.textContent = value + (stat.textContent.includes('+') ? '+' : '');
            clearInterval(counter);
        } else {
            stat.textContent = Math.floor(current);
        }
    }, interval);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

stats.forEach(stat => statsObserver.observe(stat));

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Добавляем стили для галереи модального окна
const style = document.createElement('style');
style.textContent = `
    .gallery-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .gallery-modal.active {
        opacity: 1;
    }
    
    .gallery-modal img {
        max-width: 90%;
        max-height: 90vh;
        object-fit: contain;
        border-radius: 5px;
    }
    
    .gallery-close {
        position: absolute;
        top: 20px;
        right: 20px;
        color: white;
        font-size: 40px;
        cursor: pointer;
        transition: transform 0.3s ease;
    }
    
    .gallery-close:hover {
        transform: rotate(90deg);
    }
`;

document.head.appendChild(style);