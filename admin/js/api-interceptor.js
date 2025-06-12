/**
 * API拦截器 - 仅记录API请求信息，不做任何拦截
 * 用于调试和日志记录
 */

// 拦截fetch请求
const originalFetch = window.fetch;

window.fetch = async function(url, options) {
  // 检查URL是否以/api/开头
  if (typeof url === 'string' && (url.startsWith('/api/') || url.startsWith('/admin-api/'))) {
    try {
      // 记录请求详情
      console.log('API请求:', { 
        url: url, 
        method: options?.method || 'GET',
        headers: options?.headers,
        body: options?.body ? JSON.parse(options.body) : undefined
      });
      
      // 发送请求
      const response = await originalFetch(url, options);
      
      // 克隆响应以便读取内容
      const clonedResponse = response.clone();
      
      // 尝试解析响应内容
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const responseData = await clonedResponse.json();
          console.log('API响应:', { 
            status: response.status, 
            statusText: response.statusText,
            data: responseData 
          });
        } else {
          const responseText = await clonedResponse.text();
          console.log('API响应(非JSON):', { 
            status: response.status, 
            statusText: response.statusText,
            contentType: contentType,
            text: responseText.substring(0, 200) + (responseText.length > 200 ? '...' : '')
          });
        }
      } catch (parseError) {
        console.error('解析响应失败:', parseError);
      }
      
      return response;
    } catch (error) {
      console.error(`API请求失败:`, error);
      throw error;
    }
  }
  
  // 其他请求不变
  return originalFetch(url, options);
};

console.log('API日志记录器已加载');