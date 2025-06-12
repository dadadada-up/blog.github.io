// 端口修复脚本
(function() {
  console.log('端口修复脚本已加载');
  
  // 获取当前页面的端口
  const currentPort = window.location.port || (window.location.protocol === 'https:' ? '443' : '80');
  console.log('当前端口:', currentPort);
  
  // 设置全局 API 基础 URL
  window.apiBaseUrl = window.location.origin + '/admin/api/';
  console.log('API 基础 URL:', window.apiBaseUrl);
  
  // 修复 API URL
  function fixApiUrl(url) {
    if (!url) return url;
    
    // 如果 URL 已经是完整的 URL，则不做处理
    if (url.startsWith('http')) return url;
    
    // 如果 URL 是相对路径，则添加当前域名和端口
    if (url.startsWith('/')) {
      return window.location.origin + url;
    } else {
      return window.location.origin + '/' + url;
    }
  }
  
  // 拦截 XMLHttpRequest
  const originalXhrOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
    // 修复 API URL
    const fixedUrl = fixApiUrl(url);
    if (fixedUrl !== url) {
      console.log('修复 XHR URL:', url, '->', fixedUrl);
    }
    
    return originalXhrOpen.call(this, method, fixedUrl, async, user, password);
  };
  
  // 拦截 fetch
  const originalFetch = window.fetch;
  window.fetch = function(url, options) {
    // 修复 API URL
    if (url && typeof url === 'string') {
      const fixedUrl = fixApiUrl(url);
      if (fixedUrl !== url) {
        console.log('修复 fetch URL:', url, '->', fixedUrl);
        url = fixedUrl;
      }
    }
    
    return originalFetch.call(this, url, options);
  };
  
  // 修复 window.api_url
  Object.defineProperty(window, 'api_url', {
    get: function() {
      return window.apiBaseUrl;
    },
    set: function(value) {
      console.log('尝试设置 api_url:', value);
      // 不允许更改
    },
    configurable: true
  });
  
  // 等待应用加载完成
  window.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成，应用端口修复');
    
    // 如果存在应用配置，则修复 API URL
    if (window.app && window.app.config) {
      const originalApiUrl = window.app.config.api_url;
      window.app.config.api_url = window.apiBaseUrl;
      console.log('修复应用 API URL:', originalApiUrl, '->', window.app.config.api_url);
    }
    
    // 修复所有 API 请求链接
    setTimeout(function() {
      const links = document.querySelectorAll('a[href*="/api/"]');
      links.forEach(function(link) {
        const originalHref = link.getAttribute('href');
        const fixedHref = fixApiUrl(originalHref);
        if (fixedHref !== originalHref) {
          link.setAttribute('href', fixedHref);
          console.log('修复链接 href:', originalHref, '->', fixedHref);
        }
      });
    }, 1000);
  });
})(); 