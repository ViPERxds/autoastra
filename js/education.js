// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease',
    once: true,
    offset: 100
});

// Callback button functionality
document.addEventListener('DOMContentLoaded', function() {
    const callbackBtn = document.querySelector('.callback-btn');
    
    callbackBtn.addEventListener('click', function() {
        // Add your callback form logic here
        alert('Форма обратного звонка будет добавлена позже');
    });
});
