/**
 * 公共菜单模板
 * 为所有管理页面提供统一的菜单结构
 */

// 初始化公共菜单
function initCommonMenu() {
  // 获取当前页面路径
  const currentPath = window.location.pathname;
  const currentQuery = window.location.search;
  const isSettingsPage = currentQuery.includes('type=settings');
  const isPostPage = currentQuery.includes('type=post');
  const isPageTypePage = currentQuery.includes('type=page');
  
  // 确保加载菜单样式表
  if (!document.querySelector('link[href="/admin/css/admin-menu.css"]')) {
    const menuStylesheet = document.createElement('link');
    menuStylesheet.rel = 'stylesheet';
    menuStylesheet.href = '/admin/css/admin-menu.css';
    document.head.appendChild(menuStylesheet);
  }
  
  // 渲染侧边栏菜单
  const sidebar = document.querySelector('.admin-sidebar');
  if (sidebar) {
    sidebar.innerHTML = `
      <ul class="admin-menu">
        <a href="/admin/dashboard.html" class="admin-menu-item${currentPath.includes('dashboard.html') ? ' active' : ''}">
            <i class="fas fa-tachometer-alt admin-menu-icon"></i>
            仪表盘
          </a>
        <a href="/admin/post-management.html" class="admin-menu-item${currentPath.includes('post-management.html') ? ' active' : ''}">
            <i class="fas fa-file-alt admin-menu-icon"></i>
            文章管理
          </a>
        <a href="/admin/page-management.html" class="admin-menu-item${currentPath.includes('page-management.html') ? ' active' : ''}">
            <i class="fas fa-copy admin-menu-icon"></i>
            页面管理
          </a>
        <div class="admin-menu-divider"></div>
        <a href="javascript:void(0);" onclick="deployWebsite()" class="admin-menu-item">
            <i class="fas fa-rocket admin-menu-icon"></i>
            部署网站
          </a>
        <a href="/admin/backup.html" class="admin-menu-item${currentPath.includes('backup.html') ? ' active' : ''}">
            <i class="fas fa-database admin-menu-icon"></i>
            备份恢复
          </a>
        <div class="admin-menu-divider"></div>
        <a href="/admin/cover-generator.html" class="admin-menu-item${currentPath.includes('cover-generator.html') ? ' active' : ''}">
            <i class="fas fa-image admin-menu-icon"></i>
            封面生成
          </a>
        <a href="/admin/notion-settings.html" class="admin-menu-item${currentPath.includes('notion-settings.html') ? ' active' : ''}">
            <i class="fas fa-book admin-menu-icon"></i>
            Notion设置
          </a>
        <a href="/admin/settings-management.html" class="admin-menu-item${currentPath.includes('settings-management.html') ? ' active' : ''}">
            <i class="fas fa-cog admin-menu-icon"></i>
            系统设置
          </a>
      </ul>
    `;
  }
  
  // 设置统一的顶部标题
  const headerLogo = document.querySelector('.admin-logo');
  if (headerLogo) {
    headerLogo.textContent = '博客管理系统';
    
    // 强制应用样式
    applyHeaderStyles();
  }
  
  // 初始化移动端菜单
  initMobileMenu();
}

// 强制应用标题样式
function applyHeaderStyles() {
  // 创建内联样式
  const style = document.createElement('style');
  style.innerHTML = `
    /* 强制应用顶部标题样式 */
    .admin-logo, .admin-title, #pageTitle {
      font-size: 20px !important;
      font-weight: bold !important;
      color: #ffffff !important;
      text-shadow: 0 1px 2px rgba(0,0,0,0.2) !important;
      border: none !important;
      margin: 0 !important;
      padding: 0 !important;
      line-height: 1.3 !important;
      background: none !important;
      -webkit-background-clip: initial !important;
      -webkit-text-fill-color: initial !important;
      background-clip: initial !important;
    }
    
    /* 确保顶部导航栏样式一致 */
    .admin-header {
      background-color: #409EFF !important;
      color: white !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      padding: 0 15px !important;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
      z-index: 100 !important;
      height: 40px !important;
    }
  `;
  document.head.appendChild(style);
  
  // 直接设置所有可能的标题元素的样式
  const logoElements = document.querySelectorAll('.admin-logo, .admin-title, #pageTitle');
  logoElements.forEach(el => {
    if (el) {
      el.style.fontSize = '20px';
      el.style.fontWeight = 'bold';
      el.style.color = '#ffffff';
      el.style.textShadow = '0 1px 2px rgba(0,0,0,0.2)';
      el.style.border = 'none';
      el.style.margin = '0';
      el.style.padding = '0';
      el.style.lineHeight = '1.3';
      el.style.background = 'none';
      el.style.webkitBackgroundClip = 'initial';
      el.style.webkitTextFillColor = 'initial';
      el.style.backgroundClip = 'initial';
      
      // 确保文本内容是"博客管理系统"
      if (!el.textContent || el.textContent.trim() === '') {
        el.textContent = '博客管理系统';
      }
    }
  });
  
  // 设置所有header元素的样式
  const headerElements = document.querySelectorAll('.admin-header');
  headerElements.forEach(el => {
    if (el) {
      el.style.backgroundColor = '#409EFF';
      el.style.color = 'white';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'space-between';
      el.style.padding = '0 15px';
      el.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
      el.style.zIndex = '100';
      el.style.height = '40px';
    }
  });
}

// 初始化移动端菜单
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.querySelector('.admin-sidebar');
  
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function() {
      sidebar.classList.toggle('open');
    });
    
    // 点击主内容区域关闭菜单
    document.querySelector('.admin-main').addEventListener('click', function() {
      if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
      }
    });
  }
}

// 部署网站函数
function deployWebsite() {
  if (confirm('确定要部署网站吗？')) {
    // 显示部署进度
    alert('正在部署网站，请稍候...');
    
    // 调用部署API
    fetch('/api/deploy', {
      method: 'POST'
    })
    .then(response => response.json())
    .then(result => {
      if (result.success) {
        alert('部署成功: ' + (result.message || '网站已成功部署'));
      } else {
        throw new Error(result.error || '部署失败');
      }
    })
    .catch(error => {
      console.error('部署失败:', error);
      alert('部署失败: ' + error.message);
    });
  }
}

// 注销函数
function logout() {
  localStorage.removeItem('adminLoggedIn');
  window.location.href = '/admin/login.html';
}

// 在页面加载完成后初始化菜单
document.addEventListener('DOMContentLoaded', function() {
  // 检查登录状态
  if (localStorage.getItem('adminLoggedIn') !== 'true') {
    window.location.href = '/admin/login.html';
    return;
  }
  
  // 初始化公共菜单
  initCommonMenu();
  
  // 确保样式被应用，即使菜单初始化失败
  setTimeout(applyHeaderStyles, 100);
  
  // 监听DOM变化，确保样式始终被应用
  const observer = new MutationObserver(function(mutations) {
    applyHeaderStyles();
  });
  
  observer.observe(document.body, { 
    childList: true,
    subtree: true
  });
}); 