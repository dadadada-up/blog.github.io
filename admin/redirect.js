/**
 * 管理后台重定向脚本
 * 将已登录用户从/admin/路径重定向到仪表盘页面
 */
(function() {
  // 如果已设置全局阻止重定向标记，则不执行重定向
  if (window.preventRedirect === true) {
    console.log('重定向已被拦截器禁用');
    return;
  }
  
  // 检查是否有直接访问标记
  const directAccessType = sessionStorage.getItem('directAccess');
  if (directAccessType) {
    console.log('检测到直接访问标记，跳过重定向');
    return;
  }
  
  // 如果有hash，且为有效的管理路由，不进行重定向
  if (window.location.hash && (
    window.location.hash.startsWith('#/post') || 
    window.location.hash.startsWith('#/new') || 
    window.location.hash.startsWith('#/page') || 
    window.location.hash.startsWith('#/settings')
  )) {
    console.log('检测到有效的hash路由，跳过重定向');
    return;
  }

  // 检查用户是否已登录
  if (localStorage.getItem('adminLoggedIn') === 'true') {
    // 获取当前路径
    const path = window.location.pathname;
    
    // 需要重定向的情况: 路径是/admin/且没有hash
    if ((path === '/admin/' || path === '/admin/index.html') && !window.location.hash) {
      // 重定向到仪表盘
      window.location.href = '/admin/dashboard.html';
    }
  }
  
  // 如果是在hexo-myadmin的页面中，添加返回仪表盘的按钮
  if (window.location.pathname.includes('/admin/') && 
      window.location.pathname !== '/admin/dashboard.html' && 
      document.readyState === 'complete') {
    setTimeout(function() {
      // 检查是否已存在返回按钮
      if (!document.querySelector('#back-to-dashboard')) {
        const backBtn = document.createElement('a');
        backBtn.id = 'back-to-dashboard';
        backBtn.href = '/admin/dashboard.html';
        backBtn.innerHTML = '<i class="fa fa-tachometer-alt"></i> 返回仪表盘';
        backBtn.style.cssText = `
          position: fixed;
          top: 15px;
          right: 15px;
          background: #409EFF;
          color: white;
          padding: 8px 15px;
          border-radius: 4px;
          text-decoration: none;
          font-size: 14px;
          z-index: 9999;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(backBtn);
      }
    }, 1000);
  }
})(); 