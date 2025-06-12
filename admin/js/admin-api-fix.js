
// hexo-admin API错误处理脚本
(function() {
  console.log('Hexo Admin API Fix Loaded');
  
  // 修复路径问题
  if (window.location.pathname === '/admin') {
    // 如果URL没有斜杠结尾，添加斜杠并重定向
    var currentUrl = window.location.href;
    // 移除URL中的hash部分(#/后面的内容)
    var hashPart = '';
    var hashIndex = currentUrl.indexOf('#');
    if (hashIndex !== -1) {
      hashPart = currentUrl.substring(hashIndex);
      currentUrl = currentUrl.substring(0, hashIndex);
    }
    
    // 确保URL以斜杠结尾
    if (!currentUrl.endsWith('/')) {
      currentUrl += '/';
    }
    
    // 重新添加hash部分
    window.location.href = currentUrl + hashPart;
  }
  
  // 等待应用加载
  var checkInterval = setInterval(function() {
    if (window.app) {
      clearInterval(checkInterval);
      fixAdminClient();
    }
  }, 100);
  
  function fixAdminClient() {
    // 替换XMLHttpRequest发送
    var originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
      this.addEventListener('error', function(e) {
        console.error('XHR Error:', e);
        handleApiError(this.responseURL || arguments[1]);
      });
      
      this.addEventListener('load', function() {
        if (this.status >= 400) {
          console.error('API Error:', this.status, this.responseText);
          handleApiError(this.responseURL || arguments[1], this.status, this.responseText);
        }
      });
      
      return originalOpen.apply(this, arguments);
    };
    
    // 捕获fetch错误
    var originalFetch = window.fetch;
    window.fetch = function() {
      return originalFetch.apply(this, arguments)
        .catch(function(error) {
          console.error('Fetch error:', error, arguments[0]);
          handleApiError(arguments[0], 0, error.message);
          throw error;
        });
    };
    
    // 添加API错误处理函数
    function handleApiError(url, status, responseText) {
      console.log('处理API错误:', url, status);
      
      // 针对特定API的处理
      if (url && url.includes('/admin/api/settings')) {
        console.log('修复设置API错误');
        
        // 提供默认设置数据
        window.defaultSettings = {
          editor: {
            lineNumbers: true,
            spellcheck: true
          },
          admin_url: '/admin/'
        };
        
        // 如果正在加载设置页面
        var settingsComponents = document.querySelectorAll('.settings');
        if (settingsComponents.length > 0) {
          // 使用默认设置
          if (window.app && window.app.setState) {
            window.app.setState({ settings: window.defaultSettings });
          }
        }
      }
      
      // 移除所有loading状态
      var loadingElements = document.querySelectorAll('.loading');
      loadingElements.forEach(function(el) {
        el.classList.remove('loading');
      });
      
      // 显示错误提示
      var errorShown = document.querySelector('.api-error-message');
      if (!errorShown) {
        var errorMsg = document.createElement('div');
        errorMsg.className = 'api-error-message';
        errorMsg.style.color = '#c00';
        errorMsg.style.padding = '10px';
        errorMsg.style.margin = '10px 0';
        errorMsg.style.backgroundColor = '#fff0f0';
        errorMsg.style.borderRadius = '4px';
        errorMsg.style.border = '1px solid #fcc';
        errorMsg.style.fontWeight = 'bold';
        errorMsg.style.fontSize = '14px';
        errorMsg.style.position = 'fixed';
        errorMsg.style.top = '10px';
        errorMsg.style.right = '10px';
        errorMsg.style.zIndex = '9999';
        errorMsg.style.maxWidth = '400px';
        errorMsg.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
        
        var closeBtn = document.createElement('span');
        closeBtn.innerHTML = '×';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '5px';
        closeBtn.style.right = '10px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.fontSize = '18px';
        closeBtn.onclick = function() {
          document.body.removeChild(errorMsg);
        };
        
        var errorTitle = document.createElement('div');
        errorTitle.textContent = 'API错误 (' + (status || 'Unknown') + ')';
        errorTitle.style.marginBottom = '8px';
        
        var errorContent = document.createElement('div');
        errorContent.textContent = responseText || '加载数据失败，请尝试刷新页面';
        errorContent.style.fontSize = '12px';
        errorContent.style.color = '#666';
        
        errorMsg.appendChild(closeBtn);
        errorMsg.appendChild(errorTitle);
        errorMsg.appendChild(errorContent);
        
        document.body.appendChild(errorMsg);
        
        // 5秒后自动关闭
        setTimeout(function() {
          if (document.body.contains(errorMsg)) {
            document.body.removeChild(errorMsg);
          }
        }, 5000);
      }
    }
  }
})();