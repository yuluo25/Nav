document.addEventListener('DOMContentLoaded', function() {
    // 加载配置文件
    fetch('config.json')
        .then(response => response.json())
        .then(config => {
            // 渲染网站
            renderSite(config);
            // 初始化功能
            initFunctions();
        })
        .catch(error => {
            console.error('加载配置文件出错:', error);
            document.querySelector('main').innerHTML = `
                <div class="error-message">
                    <h2><i class="fas fa-exclamation-triangle"></i> 配置加载失败</h2>
                    <p>无法加载导航配置，请检查配置文件。</p>
                </div>
            `;
        });

    // 渲染网站内容
    function renderSite(config) {
        // 设置网站标题
        document.querySelector('.logo span').textContent = config.siteInfo.title;
        document.title = config.siteInfo.title;

        // 渲染主要内容
        const main = document.querySelector('main');
        main.innerHTML = ''; // 清空现有内容

        // 渲染分类和链接
        config.categories.forEach(category => {
            const categorySection = document.createElement('section');
            categorySection.className = 'category';
            
            categorySection.innerHTML = `
                <h2><i class="${category.icon}"></i> ${category.name}</h2>
                <div class="links-grid"></div>
            `;

            const linksGrid = categorySection.querySelector('.links-grid');
            
            // 添加链接卡片
            category.links.forEach(link => {
                const linkCard = document.createElement('a');
                linkCard.href = link.url;
                linkCard.className = 'link-card';
                linkCard.target = '_blank'; // 在新标签页打开链接
                
                linkCard.innerHTML = `
                    <div class="icon"><i class="${link.icon}"></i></div>
                    <div class="title">${link.title}</div>
                    <div class="description">${link.description}</div>
                `;
                
                linksGrid.appendChild(linkCard);
            });
            
            main.appendChild(categorySection);
        });

        // 渲染页脚
        const footer = document.querySelector('footer');
        footer.innerHTML = `
            <p>${config.siteInfo.footerText}</p>
            <div class="social-links"></div>
        `;

        // 添加社交链接
        const socialLinks = footer.querySelector('.social-links');
        config.siteInfo.socialLinks.forEach(social => {
            const link = document.createElement('a');
            link.href = social.url;
            link.innerHTML = `<i class="${social.icon}"></i>`;
            link.target = '_blank';
            socialLinks.appendChild(link);
        });
    }

    // 初始化功能
    function initFunctions() {
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
                // 如果搜索框为空，显示所有卡片和分类
                linkCards.forEach(card => {
                    card.style.display = 'flex';
                });
                document.querySelectorAll('.category').forEach(category => {
                    category.style.display = 'block';
                });
                return;
            }
            
            // 搜索匹配的卡片
            document.querySelectorAll('.category').forEach(category => {
                let hasVisibleCard = false;
                const cards = category.querySelectorAll('.link-card');
                
                cards.forEach(card => {
                    const title = card.querySelector('.title').textContent.toLowerCase();
                    const description = card.querySelector('.description').textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || description.includes(searchTerm)) {
                        card.style.display = 'flex';
                        hasVisibleCard = true;
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // 如果分类下没有匹配的卡片，隐藏整个分类
                category.style.display = hasVisibleCard ? 'block' : 'none';
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
            
            .error-message {
                text-align: center;
                padding: 50px 20px;
                color: #ff6b6b;
            }
        `;
        document.head.appendChild(style);
    }
});