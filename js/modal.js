// Управление модальными окнами
class Modal {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        if (!this.modal) return;
        
        this.closeBtn = this.modal.querySelector('.close');
        this.isOpen = false;

        // Привязываем методы к контексту
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleEscPress = this.handleEscPress.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);

        // Инициализация обработчиков
        this.initEventListeners();
    }

    initEventListeners() {
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', this.close);
        }
        this.modal.addEventListener('click', this.handleOutsideClick);
    }

    handleEscPress(e) {
        if (e.key === 'Escape' && this.isOpen) {
            this.close();
        }
    }

    handleOutsideClick(e) {
        if (e.target === this.modal) {
            this.close();
        }
    }

    open() {
        if (!this.modal) return;
        
        this.modal.classList.add('active');
        document.addEventListener('keydown', this.handleEscPress);
        document.body.style.overflow = 'hidden';
        this.isOpen = true;
    }

    close() {
        if (!this.modal) return;
        
        this.modal.classList.remove('active');
        document.removeEventListener('keydown', this.handleEscPress);
        document.body.style.overflow = '';
        this.isOpen = false;
    }
}

// Инициализация модальных окон при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация модального окна обратного звонка
    const callbackButtons = document.querySelectorAll('.callback-btn');
    if (callbackButtons.length > 0) {
        const callbackModal = new Modal('callbackModal');
        callbackButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                console.log('Opening callback modal');
                callbackModal.open();
            });
        });
    }

    // Инициализация модального окна тестирования
    const testButtons = document.querySelectorAll('.test-btn');
    if (testButtons.length > 0) {
        const testModal = new Modal('testModal');
        testButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                console.log('Opening test modal');
                testModal.open();
            });
        });
    }

    // Глобальный обработчик Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                const modalInstance = new Modal(activeModal.id);
                modalInstance.close();
            }
        }
    });
});

// Функция для создания динамического модального окна
function createModal(content, id = 'dynamicModal') {
    // Удаляем старое модальное окно с таким же id, если оно существует
    const existingModal = document.getElementById(id);
    if (existingModal) {
        existingModal.remove();
    }

    // Создаем новое модальное окно
    const modalHTML = `
        <div class="modal" id="${id}">
            <div class="modal-content">
                <span class="close">&times;</span>
                ${content}
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = new Modal(id);
    modal.open();
    return modal;
}