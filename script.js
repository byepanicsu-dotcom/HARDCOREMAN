// ЛЁГКИЕ АНИМАЦИИ ДЛЯ СТЕКЛЯННОГО СТИЛЯ
document.addEventListener('DOMContentLoaded', function() {
    console.log('[Glass] System initializing...');
    
    // 1. ВРЕМЯ В РЕАЛЬНОМ ВРЕМЕНИ
    function updateTime() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('ru-RU', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        const timeElement = document.getElementById('currentTime');
        if (timeElement) {
            timeElement.textContent = timeStr;
            
            // Лёгкое мерцание двоеточий
            timeElement.style.opacity = now.getSeconds() % 2 === 0 ? '0.9' : '1';
        }
    }
    
    // 2. АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ
    function animateElements() {
        const elements = document.querySelectorAll('.link-item, .avatar-section');
        
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 + (index * 150));
        });
    }
    
    // 3. ЭФФЕКТ ПЛАВАНИЯ ДЛЯ АВАТАРА
    function setupAvatarFloat() {
        const avatarWrapper = document.querySelector('.avatar-wrapper');
        if (!avatarWrapper) return;
        
        let mouseX = 0;
        let mouseY = 0;
        let avatarX = 0;
        let avatarY = 0;
        const friction = 0.1;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
        });
        
        function animate() {
            avatarX += (mouseX - avatarX) * friction;
            avatarY += (mouseY - avatarY) * friction;
            
            if (avatarWrapper) {
                avatarWrapper.style.transform = `translate(${avatarX}px, ${avatarY}px)`;
            }
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
    
    // 4. ЭФФЕКТ НАВЕДЕНИЯ ДЛЯ ССЫЛОК
    function setupLinkInteractions() {
        const links = document.querySelectorAll('.link-item.dynamic');
        
        links.forEach(link => {
            // Эффект звука при наведении (опционально)
            link.addEventListener('mouseenter', () => {
                const icon = link.querySelector('.link-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
            });
            
            link.addEventListener('mouseleave', () => {
                const icon = link.querySelector('.link-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
            
            // Эффект клика
            link.addEventListener('click', function(e) {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                const title = this.querySelector('.link-title').textContent;
                console.log(`[Glass] Opening: ${title}`);
            });
        });
    }
    
    // 5. ПАРАЛЛАКС ЭФФЕКТ ДЛЯ ФОНА
    function setupParallax() {
        const bg = document.querySelector('.gradient-background');
        if (!bg) return;
        
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX / window.innerWidth - 0.5) * 20;
            const moveY = (e.clientY / window.innerHeight - 0.5) * 20;
            
            bg.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
    
    // 6. СЛУЧАЙНЫЕ МИКРО-АНИМАЦИИ
    function setupMicroAnimations() {
        // Случайное подрагивание кольца аватара
        setInterval(() => {
            const ring = document.querySelector('.avatar-ring');
            if (ring && Math.random() > 0.7) {
                ring.style.animationDuration = '15s';
                setTimeout(() => {
                    ring.style.animationDuration = '20s';
                }, 1000);
            }
        }, 5000);
        
        // Мерцание статусных точек
        const statusDot = document.querySelector('.status-dot');
        if (statusDot) {
            setInterval(() => {
                statusDot.style.opacity = Math.random() > 0.5 ? '0.8' : '1';
            }, 2000);
        }
    }
    
    // ИНИЦИАЛИЗАЦИЯ ВСЕХ ФУНКЦИЙ
    function init() {
        updateTime();
        setInterval(updateTime, 1000);
        
        setTimeout(() => {
            animateElements();
            setupAvatarFloat();
            setupLinkInteractions();
            setupParallax();
            setupMicroAnimations();
            
            console.log('[Glass] System ready');
        }, 300);
    }
    
    // ЗАПУСК
    init();
    
    // 7. КЛАВИАТУРНЫЕ СОКРАЩЕНИЯ
    document.addEventListener('keydown', (e) => {
        // Alt + цифра для быстрого доступа
        if (e.altKey && !isNaN(e.key)) {
            const index = parseInt(e.key) - 1;
            const links = document.querySelectorAll('.link-item.dynamic');
            
            if (links[index]) {
                links[index].click();
            }
        }
    });
});