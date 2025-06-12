/**
 * 重定向阻止脚本
 * 用于检测特殊URL参数并阻止仪表盘重定向
 */
(function() {
  // 检查URL是否包含特殊参数
  if (window.location.search.includes('noDashboardRedirect=true')) {
    console.log('检测到noDashboardRedirect参数，阻止重定向到仪表盘');
    
    // 设置全局标记
    window.preventRedirect = true;
    
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
    
    // 重写window.location.href来阻止重定向
    // 注意：这是一个黑科技，可能在某些浏览器中不起作用
    try {
      Object.defineProperty(window, 'location', {
        get: function() { 
          return window._location || window.defaultLocation;
        },
        set: function(val) {
          // 如果尝试重定向到仪表盘，则忽略
          if (typeof val === 'string' && 
              (val.includes('/dashboard.html') || val === '/admin/dashboard.html')) {
            console.log('阻止重定向到:', val);
            return;
          }
          window._location = val;
        }
      });
    } catch(e) {
      console.warn('无法重写location属性:', e);
    }
  }
})(); 