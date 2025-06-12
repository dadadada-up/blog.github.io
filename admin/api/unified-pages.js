// 这个文件会在浏览器中直接执行，返回页面列表
(function() {
  // 检查是否有本地存储的页面数据
  const storedPages = localStorage.getItem('blogPages');
  let response = { success: true, data: [] };
  
  try {
    if (storedPages) {
      // 如果有本地存储的数据，使用它
      response.data = JSON.parse(storedPages);
    }
    
    // 如果没有数据，返回空数组
    if (!Array.isArray(response.data) || response.data.length === 0) {
      response.data = [];
    }
  } catch (error) {
    console.error('解析页面数据失败:', error);
    response = { 
      success: false, 
      error: '解析页面数据失败', 
      data: [] 
    };
  }
  
  // 将数据作为JSON返回
  document.write(JSON.stringify(response));
})(); 