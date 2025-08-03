document.addEventListener('DOMContentLoaded', function() {
    // Инициализация AOS
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });

    // Функция для плавной анимации чисел
    function animateValue(element, start, end, duration = 300) {
        if (start === end) return;
        
        const startTime = performance.now();
        const change = end - start;
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const value = Math.round(start + change * progress);
            element.textContent = value.toLocaleString() + ' ₽';
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }

    // Функция для обновления цены
    function updatePrice() {
        const transmission = document.querySelector('input[name="transmission"]:checked').value;
        const format = document.querySelector('input[name="format"]:checked').value;
        const vip = document.querySelector('input[value="vip"]').checked;
        const additionalDriving = document.querySelector('input[value="driving"]').checked;

        let basePrice = 0;

        // Определение базовой цены
        if (transmission === 'manual') {
            if (format === 'online') basePrice = 37000;
            else if (format === 'offline') basePrice = 39000;
            else if (format === 'mixed') basePrice = 40000;
        } else if (transmission === 'automatic') {
            if (format === 'online') basePrice = 39000;
            else if (format === 'offline') basePrice = 40000;
            else if (format === 'mixed') basePrice = 41000;
        }

        // Дополнительные услуги
        let additionalPrice = 0;
        if (vip) additionalPrice += 15000;
        if (additionalDriving) additionalPrice += 1500;

        // Получаем текущие значения
        const currentBase = parseInt(document.querySelector('.base-price').textContent.replace(/[^\d]/g, '')) || 0;
        const currentAdditional = parseInt(document.querySelector('.additional-price').textContent.replace(/[^\d]/g, '')) || 0;
        const currentTotal = parseInt(document.querySelector('.total-price').textContent.replace(/[^\d]/g, '')) || 0;

        // Анимируем изменения цен
        animateValue(document.querySelector('.base-price'), currentBase, basePrice);
        animateValue(document.querySelector('.additional-price'), currentAdditional, additionalPrice);
        animateValue(document.querySelector('.total-price'), currentTotal, basePrice + additionalPrice);
    }

    // Добавление обработчиков событий
    const inputs = document.querySelectorAll('input[type="radio"], input[type="checkbox"]');
    inputs.forEach(input => {
        input.addEventListener('change', updatePrice);
    });

    // Установка начальных значений и цены
    document.querySelector('input[name="transmission"][value="manual"]').checked = true;
    document.querySelector('input[name="format"][value="online"]').checked = true;
    updatePrice();

    // Обработчик кнопки записи
    document.querySelector('.enroll-btn').addEventListener('click', function() {
        // Здесь можно добавить логику для записи на обучение
        alert('Спасибо за интерес! Наш менеджер свяжется с вами в ближайшее время.');
    });
});
