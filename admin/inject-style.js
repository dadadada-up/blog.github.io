/**
 * 博客管理界面样式和功能增强脚本
 */
(function() {
  // 检查是否为管理界面页面
  if (isAdminPage()) {
    // 加载现代化样式
    loadModernStyle();
    
    // 加载增强功能脚本
    loadEnhanceScript();
  }
  
  /**
   * 判断当前是否为管理界面页面
   */
  function isAdminPage() {
    return window.location.pathname.includes('/admin/');
  }
  
  /**
   * 加载现代化样式
   */
  function loadModernStyle() {
    // 添加CSS样式表
    const styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = '/admin/modern-admin.css';
    document.head.appendChild(styleLink);
    
    // 添加Font Awesome图标
    const iconLink = document.createElement('link');
    iconLink.rel = 'stylesheet';
    iconLink.href = 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/all.min.css';
    document.head.appendChild(iconLink);
  }
  
  /**
   * 加载增强功能脚本
   */
  function loadEnhanceScript() {
    // 加载浮动按钮和UI增强脚本
    const enhanceScript = document.createElement('script');
    enhanceScript.src = '/admin/enhance-myadmin.js';
    document.body.appendChild(enhanceScript);
    
    // 加载管理界面现代化脚本
    const modernScript = document.createElement('script');
    modernScript.src = '/admin/modern-admin.js';
    document.body.appendChild(modernScript);
  }
})(); 