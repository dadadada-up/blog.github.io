// 调试hexo-admin加载问题的脚本
document.addEventListener('DOMContentLoaded', function() {
  console.log('Hexo Admin Debug Script Loaded');
  
  // 监听页面加载状态
  function logLoadingState() {
    const loadingElements = document.querySelectorAll('.loading');
    console.log('Loading elements count:', loadingElements.length);
    
    if (loadingElements.length > 0) {
      console.log('Loading elements details:');
      loadingElements.forEach((el, index) => {
        console.log(`Loading element ${index}:`, el);
        console.log('Parent:', el.parentNode);
        console.log('Style:', window.getComputedStyle(el));
      });
    }
    
    // 检查API响应
    const xhrDebug = new XMLHttpRequest();
    xhrDebug.open('GET', '/admin/api/posts', true);
    xhrDebug.onreadystatechange = function() {
      if (xhrDebug.readyState === 4) {
        console.log('API status:', xhrDebug.status);
        console.log('API response:', xhrDebug.responseText.substring(0, 500) + '...');
      }
    };
    xhrDebug.send();
  }
  
  // 初始检查
  setTimeout(logLoadingState, 3000);
  
  // 定时检查
  setInterval(logLoadingState, 10000);
  
  // 修复可能的加载问题
  setTimeout(function() {
    const app = document.getElementById('app');
    if (app) {
      console.log('尝试强制刷新应用...');
      const event = new Event('hexo-admin:reload');
      window.dispatchEvent(event);
      
      // 如果依然有问题，尝试强制移除loading状态
      setTimeout(function() {
        const loadingElements = document.querySelectorAll('.loading');
        loadingElements.forEach(el => {
          console.log('强制移除loading状态');
          el.classList.remove('loading');
        });
      }, 5000);
    }
  }, 15000);
}); 