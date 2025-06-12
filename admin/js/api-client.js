// API客户端
const ApiClient = {
  // 获取文章列表
  getPosts: async function() {
    try {
      const response = await fetch('/admin/api/posts.js');
      const text = await response.text();
      // 从响应文本中提取JSON数据
      const jsonStr = text.replace(/document\.write\(|'\);|\(\s*function\s*\(\)\s*\{|\}\s*\)\(\);/g, '');
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error('获取文章列表失败:', error);
      return [];
    }
  },
  
  // 获取标签和分类
  getTagsAndCategories: async function() {
    try {
      return {
        tags: ['技术', '生活', 'Web开发', 'JavaScript'],
        categories: ['编程', '随笔', '教程']
      };
    } catch (error) {
      console.error('获取标签和分类失败:', error);
      return { tags: [], categories: [] };
    }
  }
}; 