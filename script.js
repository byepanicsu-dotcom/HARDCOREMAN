э// script.js - чистый код без мемов
document.addEventListener('DOMContentLoaded', function() {
    // Функция обновления времени
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        const timeElement = document.getElementById('currentTime');
        if (timeElement) {
            timeElement.textContent = timeString;
        }
    }
    
    // Микровзаимодействия для ссылок
    const dynamicLinks = document.querySelectorAll('.link-card.dynamic');
    
    dynamicLinks.forEach(link => {
        link.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        link.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Инициализация
    updateTime();
    setInterval(updateTime, 1000);
});