/* ================================================================
   博客彻底修复脚本 - 最终版本 V7
   解决所有前端问题：菜单中文化、Categories页面重建
   ================================================================ */

(function() {
    'use strict';
    
    console.log('🚀 最终修复脚本 V7 开始执行...');
    
    // 1. 菜单中文化映射
    const menuMap = {
        'Home': '首页',
        'Archives': '归档',
        'Tags': '标签',
        'Categories': '分类',
        'About': '关于'
    };
    
    // 2. 强制替换菜单文本
    function forceReplaceMenus() {
        console.log('🔧 强制替换菜单文本...');
        
        // 所有可能的菜单选择器
        const selectors = [
            '#page-header #menus .menus_item > a span',
            '#nav #menus .menus_item > a span',
            '#sidebar .menus_item > a span',
            '.menus_item > a span',
            '.site-page span'
        ];
        
        let replacedCount = 0;
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(span => {
                const currentText = span.textContent.trim();
                if (menuMap[currentText]) {
                    console.log(`📝 替换菜单: ${currentText} → ${menuMap[currentText]}`);
                    span.textContent = menuMap[currentText];
                    replacedCount++;
                }
            });
        });
        
        // 隐藏Tags菜单
        const tagsMenus = document.querySelectorAll('a[href*="/tags/"]');
        tagsMenus.forEach(link => {
            const menuItem = link.closest('.menus_item');
            if (menuItem) {
                menuItem.style.display = 'none';
                console.log('🔇 隐藏Tags菜单');
            }
        });
        
        console.log(`✅ 菜单替换完成，共替换 ${replacedCount} 个菜单项`);
    }
    
    // 3. 彻底重建Categories页面
    function rebuildCategoriesPage() {
        if (!document.body.classList.contains('type-categories')) {
            return;
        }
        
        console.log('🏗️ 开始重建Categories页面...');
        
        // 分类数据配置
        const categoriesData = [
            { name: '技术工具', icon: '🛠️', count: 8, url: '/categories/技术工具/' },
            { name: '产品经理', icon: '📊', count: 33, url: '/categories/产品经理/' },
            { name: '投资理财', icon: '💰', count: 14, url: '/categories/投资理财/' },
            { name: 'AGI', icon: '🤖', count: 6, url: '/categories/AGI/' },
            { name: '保险', icon: '🛡️', count: 3, url: '/categories/保险/' },
            { name: '生产力', icon: '⚡', count: 3, url: '/categories/生产力/' },
            { name: '读书笔记', icon: '📚', count: 7, url: '/categories/读书笔记/' }
        ];
        
        // 查找页面容器
        const pageContainer = document.querySelector('#page') || document.querySelector('.page-content');
        if (!pageContainer) {
            console.error('❌ 找不到页面容器');
            return;
        }
        
        // 创建新的Categories页面HTML
        const categoriesHTML = `
            <div class="simple-categories-container">
                <h1 class="simple-categories-title">文章分类</h1>
                <div class="simple-categories-grid">
                    ${categoriesData.map(category => `
                        <div class="category-card" onclick="window.location.href='${category.url}'">
                            <div class="category-title">${category.icon} ${category.name}</div>
                            <div class="category-count">${category.count} 篇文章</div>
                            <div class="category-arrow">查看文章 →</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        // 替换页面内容
        pageContainer.innerHTML = categoriesHTML;
        console.log('✅ Categories页面重建完成');
    }
    
    // 4. 初始化执行
    function init() {
        console.log('🎯 开始初始化...');
        
        // 立即执行一次
        forceReplaceMenus();
        rebuildCategoriesPage();
        
        // 延迟执行（防止主题动态加载覆盖）
        setTimeout(() => {
            forceReplaceMenus();
            rebuildCategoriesPage();
        }, 100);
        
        setTimeout(() => {
            forceReplaceMenus();
            rebuildCategoriesPage();
        }, 500);
        
        // 监听DOM变化，持续修复
        const observer = new MutationObserver(() => {
            forceReplaceMenus();
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        console.log('✅ 初始化完成，监听DOM变化');
    }
    
    // 5. 页面加载完成后执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    console.log('🎉 修复脚本加载完成');
    
})(); 