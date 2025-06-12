/**
 * 缓存状态API
 * 提供缓存状态信息
 */

module.exports = function(req, res) {
  try {
    // 返回模拟的缓存状态数据
    const status = {
      hasCache: true,
      cacheTime: new Date().toISOString(),
      cacheAge: 0,
      cacheExpired: false,
      articleCount: 10
    };
    
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify({
      success: true,
      status: status
    }));
  } catch (error) {
    console.error('获取缓存状态失败:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: false,
      error: `获取缓存状态失败: ${error.message}`
    }));
  }
}; 