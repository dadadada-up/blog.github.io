// API 调试脚本
(function() {
  console.log('API 调试脚本已加载');
  
  // 在控制台中显示 API 请求信息
  const originalFetch = window.fetch;
  window.fetch = function(url, options) {
    const startTime = Date.now();
    console.log(`%c发送请求: ${url}`, 'color: blue; font-weight: bold');
    console.log('请求选项:', options);
    
    return originalFetch.apply(this, arguments)
      .then(response => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        if (response.ok) {
          console.log(`%c请求成功: ${url} (${duration}ms)`, 'color: green; font-weight: bold');
        } else {
          console.log(`%c请求失败: ${url} (${duration}ms, 状态: ${response.status})`, 'color: red; font-weight: bold');
        }
        
        // 克隆响应以便我们可以查看内容
        const clone = response.clone();
        clone.text().then(text => {
          try {
            const data = JSON.parse(text);
            console.log('响应数据:', data);
          } catch (e) {
            console.log('响应文本:', text.substring(0, 500) + (text.length > 500 ? '...' : ''));
          }
        }).catch(err => {
          console.log('无法读取响应内容:', err);
        });
        
        return response;
      })
      .catch(error => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        console.log(`%c请求错误: ${url} (${duration}ms)`, 'color: red; font-weight: bold');
        console.error('错误详情:', error);
        throw error;
      });
  };
  
  // 监听所有 XMLHttpRequest
  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
    this._requestUrl = url;
    this._requestMethod = method;
    this._requestStart = Date.now();
    
    console.log(`%c准备 XHR 请求: ${method} ${url}`, 'color: purple; font-weight: bold');
    
    // 添加加载完成事件监听器
    this.addEventListener('load', function() {
      const duration = Date.now() - this._requestStart;
      if (this.status >= 200 && this.status < 300) {
        console.log(`%cXHR 请求成功: ${this._requestMethod} ${this._requestUrl} (${duration}ms)`, 'color: green; font-weight: bold');
      } else {
        console.log(`%cXHR 请求失败: ${this._requestMethod} ${this._requestUrl} (${duration}ms, 状态: ${this.status})`, 'color: red; font-weight: bold');
      }
      
      try {
        const data = JSON.parse(this.responseText);
        console.log('XHR 响应数据:', data);
      } catch (e) {
        console.log('XHR 响应文本:', (this.responseText || '').substring(0, 500) + (this.responseText && this.responseText.length > 500 ? '...' : ''));
      }
    });
    
    // 添加错误事件监听器
    this.addEventListener('error', function() {
      const duration = Date.now() - this._requestStart;
      console.log(`%cXHR 请求错误: ${this._requestMethod} ${this._requestUrl} (${duration}ms)`, 'color: red; font-weight: bold');
    });
    
    return originalOpen.apply(this, arguments);
  };
  
  // 添加全局错误处理
  window.addEventListener('error', function(event) {
    console.log('%c全局错误:', 'color: red; font-weight: bold', event.error);
  });
  
  window.addEventListener('unhandledrejection', function(event) {
    console.log('%c未处理的 Promise 错误:', 'color: red; font-weight: bold', event.reason);
  });
  
  // 检查 API 端点是否可访问
  function checkApiEndpoints() {
    const endpoints = [
      '/admin/api/posts',
      '/admin/api/tags-categories-and-metadata',
      '/admin/api/settings/list'
    ];
    
    console.log('%c开始检查 API 端点...', 'color: blue; font-weight: bold');
    
    endpoints.forEach(endpoint => {
      fetch(endpoint, { method: 'GET', cache: 'no-cache' })
        .then(response => {
          if (response.ok) {
            console.log(`%cAPI 端点可用: ${endpoint}`, 'color: green; font-weight: bold');
          } else {
            console.log(`%cAPI 端点不可用: ${endpoint} (状态: ${response.status})`, 'color: red; font-weight: bold');
          }
        })
        .catch(error => {
          console.log(`%cAPI 端点检查错误: ${endpoint}`, 'color: red; font-weight: bold');
          console.error('错误详情:', error);
        });
    });
  }
  
  // 页面加载完成后检查 API 端点
  window.addEventListener('DOMContentLoaded', function() {
    setTimeout(checkApiEndpoints, 1000);
  });
})(); 