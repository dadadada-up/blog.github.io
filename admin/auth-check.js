/**
 * 管理后台登录状态检查脚本
 * 用于确保访问管理后台页面时能正确处理登录状态
 */
(function() {
  // 检测URL参数，如果有from=dashboard，则跳过不必要的重定向
  if (window.location.search.includes('from=dashboard')) {
    console.log('来自仪表盘的请求，认证检查允许访问');
    return;
  }
  
  // 当前页面路径
  const path = window.location.pathname;
  // 当前URL的hash部分
  const hash = window.location.hash;
  
  // 如果是登录页面，且已登录，则跳转到仪表盘
  if ((path === '/admin/login.html' || path === '/admin/login') && localStorage.getItem('adminLoggedIn') === 'true') {
    window.location.href = '/admin/dashboard.html';
    return;
  }
  
  // 如果是管理后台根路径，根据登录状态跳转
  if ((path === '/admin/' || path === '/admin/index.html' || path === '/admin') && !hash) {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
      window.location.href = '/admin/dashboard.html';
    } else {
      window.location.href = '/admin/login.html';
    }
    return;
  }
  
  // 如果是其他管理后台页面，且未登录，则跳转到登录页面
  if (path.startsWith('/admin/') && 
      path !== '/admin/login.html' && 
      localStorage.getItem('adminLoggedIn') !== 'true') {
    window.location.href = '/admin/login.html';
    return;
  }
  
  // 如果有有效的hash路由，允许访问
  if ((path === '/admin/' || path === '/admin/index.html') && hash && 
      (hash.startsWith('#/post') || hash.startsWith('#/new') || 
       hash.startsWith('#/page') || hash.startsWith('#/settings'))) {
    console.log('检测到有效的hash路由，允许访问');
    return;
  }
})(); 