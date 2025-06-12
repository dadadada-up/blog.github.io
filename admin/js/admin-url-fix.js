
// URL格式修复脚本
(function() {
  console.log('Hexo Admin URL Fix Loaded');
  
  // 检查并修复URL格式
  function checkAndFixUrl() {
    var currentPath = window.location.pathname;
    var currentUrl = window.location.href;
    
    // 修复双斜杠问题
    if (currentPath.includes('//')) {
      console.log('检测到双斜杠，正在修复...');
      // 正确处理双斜杠，将多个连续斜杠替换为单个斜杠
      var fixedPath = currentPath.replace(/\/+/g, '/');
      window.location.href = window.location.origin + fixedPath;
      return;
    }
    
    // 修复缺少斜杠问题
    if (currentPath === '/admin') {
      console.log('检测到路径缺少斜杠，正在修复...');
      window.location.href = window.location.origin + '/admin/';
      return;
    }
  }
  
  // 页面加载时检查URL
  document.addEventListener('DOMContentLoaded', checkAndFixUrl);
  
  // 如果已经加载完成，立即检查
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    checkAndFixUrl();
  }
})();
