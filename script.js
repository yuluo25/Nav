document.addEventListener('DOMContentLoaded', function() {
    // 主题切换功能
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // 检查本地存储中的主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // 搜索功能
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    const linkCards = document.querySelectorAll('.link-card');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (!searchTerm) {
            // 如果搜索框为空，显示所有卡片
            linkCards.forEach(card => {
                card.style.display = 'flex';
            });
            return;
        }
        
        linkCards.forEach(card => {
            const title = card.querySelector('.title').textContent.toLowerCase();
            const description = card.querySelector('.description').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 添加卡片点击动画效果
    linkCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    });
    
    // 添加滚动动画
    const categories = document.querySelectorAll('.category');
    
    function checkScroll() {
        categories.forEach(category => {
            const rect = category.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight * 0.8);
            
            if (isVisible) {
                category.classList.add('fade-in');
            }
        });
    }
    
    // 初始检查
    checkScroll();
    
    // 滚动时检查
    window.addEventListener('scroll', checkScroll);
    
    // 添加CSS动画类
    const style = document.createElement('style');
    style.textContent = `
        .category {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .category.fade-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .link-card.clicked {
            transform: scale(0.95);
        }
    `;
    document.head.appendChild(style);
});