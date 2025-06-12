/**
 * 重定向拦截器
 * 检测并处理直接访问的情况，防止重定向循环
 */
(function() {
  // 检查是否有直接访问标记
  const directAccessType = sessionStorage.getItem('directAccess');
  
  if (directAccessType) {
    console.log('检测到直接访问标记:', directAccessType);
    
    // 清除标记，防止下次访问时仍然有效
    sessionStorage.removeItem('directAccess');
    
    // 当前页面路径和hash
    const path = window.location.pathname;
    const hash = window.location.hash;
    
    // 如果是在admin根路径下，且有hash值，不进行重定向
    if ((path === '/admin/' || path === '/admin/index.html') && hash) {
      console.log('已阻止重定向，允许直接访问管理页面');
      
      // 添加返回仪表盘按钮
      document.addEventListener('DOMContentLoaded', function() {
        // 检查是否已存在返回按钮
        if (!document.querySelector('#back-to-dashboard')) {
          const backBtn = document.createElement('a');
          backBtn.id = 'back-to-dashboard';
          backBtn.href = '/admin/dashboard.html';
          backBtn.innerHTML = '返回仪表盘';
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
      });
      
      // 阻止redirect.js的重定向
      window.preventRedirect = true;
    }
  }
})(); 