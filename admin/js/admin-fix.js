
// 修复hexo-admin新建文章loading问题
(function() {
  console.log('Hexo Admin Fix Loaded');
  
  // 等待应用加载
  var checkApp = setInterval(function() {
    if (window.app && window.React) {
      clearInterval(checkApp);
      fixAdmin();
    }
  }, 100);
  
  function fixAdmin() {
    // 捕获全局错误
    window.addEventListener('error', function(e) {
      console.error('Hexo Admin Error:', e);
      // 尝试重置loading状态
      var loadingEls = document.querySelectorAll('.loading');
      loadingEls.forEach(function(el) { 
        el.classList.remove('loading');
      });
    });
    
    // 修复新建文章请求
    var originalFetch = window.fetch;
    window.fetch = function(url, options) {
      return originalFetch(url, options).catch(function(error) {
        console.error('Fetch error:', error);
        // 如果是新建文章请求错误，尝试恢复
        if (url.includes('/posts/new')) {
          document.querySelectorAll('.loading').forEach(function(el) {
            el.classList.remove('loading');
          });
          
          // 显示错误提示
          var errorMsg = document.createElement('div');
          errorMsg.style.color = 'red';
          errorMsg.style.padding = '10px';
          errorMsg.style.margin = '10px 0';
          errorMsg.style.backgroundColor = '#ffeeee';
          errorMsg.style.borderRadius = '4px';
          errorMsg.textContent = '新建文章失败，请尝试刷新页面或重启服务器';
          
          var container = document.querySelector('.app');
          if (container) {
            container.insertBefore(errorMsg, container.firstChild);
          }
        }
        throw error;
      });
    };
  }
})();