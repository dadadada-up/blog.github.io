// 这个文件会在浏览器中直接执行，返回文章列表
(function() {
  // 检查是否有本地存储的文章数据
  const storedPosts = localStorage.getItem('blogPosts');
  let response = { success: true, data: [] };
  
  try {
    if (storedPosts) {
      // 如果有本地存储的数据，使用它
      response.data = JSON.parse(storedPosts);
    }
    
    // 如果没有数据，返回空数组
    if (!Array.isArray(response.data) || response.data.length === 0) {
      response.data = [];
    }
  } catch (error) {
    console.error('解析文章数据失败:', error);
    response = { 
      success: false, 
      error: '解析文章数据失败', 
      data: [] 
    };
  }
  
  // 将数据作为JSON返回
  document.write(JSON.stringify(response));
})(); 