/**
 * 博客管理系统重定向防护脚本
 * 用于防止管理页面被重定向回仪表盘
 */
(function() {
  console.log('加载重定向防护脚本');
  
  // 标记当前页面为管理页面
  window.isAdminPage = true;
  
  // 监听文档加载完成
  document.addEventListener('DOMContentLoaded', function() {
    console.log('防护脚本：文档加载完成');
    setupRedirectPrevention();
  });
  
  // 设置防重定向
  function setupRedirectPrevention() {
    try {
      // 保存原始的location属性
      var _location = window.location;
      
      // 拦截重定向
      Object.defineProperty(window, 'location', {
        get: function() {
          return _location;
        },
        set: function(value) {
          // 检查是否是重定向到仪表盘页面
          if (typeof value === 'string') {
            if (value.includes('/dashboard.html') || value === '/admin/dashboard.html') {
              console.warn('阻止重定向到:', value);
              return;
            }
          }
          _location = value;
        }
      });
      
      // 拦截 window.location.href 赋值
      Object.defineProperty(_location, 'href', {
        get: function() {
          return _location.href;
        },
        set: function(value) {
          if (typeof value === 'string') {
            if (value.includes('/dashboard.html') || value === '/admin/dashboard.html') {
              console.warn('阻止 location.href 重定向到:', value);
              return;
            }
          }
          _location.href = value;
        }
      });
      
      // 拦截 window.location.replace
      var originalReplace = _location.replace;
      _location.replace = function(url) {
        if (typeof url === 'string') {
          if (url.includes('/dashboard.html') || url === '/admin/dashboard.html') {
            console.warn('阻止 location.replace 重定向到:', url);
            return;
          }
        }
        return originalReplace.apply(this, arguments);
      };
      
      // 拦截 history.pushState
      var originalPushState = history.pushState;
      history.pushState = function() {
        if (arguments[2] && typeof arguments[2] === 'string') {
          if (arguments[2].includes('/dashboard.html')) {
            console.warn('阻止 pushState 重定向到:', arguments[2]);
            return;
          }
        }
        return originalPushState.apply(this, arguments);
      };
      
      // 拦截 history.replaceState
      var originalReplaceState = history.replaceState;
      history.replaceState = function() {
        if (arguments[2] && typeof arguments[2] === 'string') {
          if (arguments[2].includes('/dashboard.html')) {
            console.warn('阻止 replaceState 重定向到:', arguments[2]);
            return;
          }
        }
        return originalReplaceState.apply(this, arguments);
      };
      
      // 设置beforeunload事件，可能会弹出确认框
      window.addEventListener('beforeunload', function(e) {
        var currentUrl = window.location.href;
        // 如果当前是管理页面，且不是用户主动点击链接，阻止页面跳转
        if (window.isAdminPage && !window.userInitiatedNavigation) {
          console.warn('阻止页面卸载事件');
          e.preventDefault();
          e.returnValue = '';
          return '';
        }
      });
      
      console.log('防护脚本：防重定向机制设置完成');
    } catch(e) {
      console.error('防护脚本：设置防重定向失败', e);
    }
  }
  
  // 拦截管理页面内的所有链接点击
  document.addEventListener('click', function(e) {
    // 检查是否点击了链接
    var target = e.target;
    while (target && target.tagName !== 'A') {
      target = target.parentNode;
      if (!target) break;
    }
    
    if (target && target.tagName === 'A') {
      var href = target.getAttribute('href');
      // 检查链接是否指向仪表盘
      if (href && (href.includes('/dashboard.html') || href === '/admin/dashboard.html')) {
        console.warn('阻止链接点击重定向到:', href);
        e.preventDefault();
        return false;
      }
      
      // 标记为用户主动导航
      window.userInitiatedNavigation = true;
      // 延迟重置标记
      setTimeout(function() {
        window.userInitiatedNavigation = false;
      }, 100);
    }
  }, true);
  
  // 监视DOM变化，查找可能的重定向脚本
  function observeDOMChanges() {
    try {
      var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.type === 'childList') {
            // 检查新添加的脚本
            mutation.addedNodes.forEach(function(node) {
              if (node.tagName === 'SCRIPT') {
                var scriptContent = node.textContent || '';
                // 检查脚本是否包含重定向代码
                if (scriptContent.includes('location.href') && 
                    (scriptContent.includes('/dashboard.html') || scriptContent.includes('/admin/dashboard'))) {
                  console.warn('检测到潜在的重定向脚本，尝试阻止');
                  node.textContent = '';
                }
              }
            });
          }
        });
      });
      
      observer.observe(document, {
        childList: true,
        subtree: true
      });
      
      console.log('防护脚本：DOM变化监视已启动');
    } catch(e) {
      console.error('防护脚本：设置DOM监视失败', e);
    }
  }
  
  // 尝试启动DOM变化监视
  if (typeof MutationObserver !== 'undefined') {
    observeDOMChanges();
  }
})(); 