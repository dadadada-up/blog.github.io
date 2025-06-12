
// hexo-admin 页面功能增强
(function() {
  // 等待页面列表加载完成
  function enhancePagesList() {
    // 查找页面列表
    const pagesList = document.querySelector('.posts_list');
    if (!pagesList) return;
    
    // 为每个页面项添加预览按钮
    const pageItems = pagesList.querySelectorAll('.posts_post');
    pageItems.forEach(item => {
      // 检查是否已经添加了预览按钮
      if (item.querySelector('.page-preview-btn')) return;
      
      // 获取页面链接
      const permaLink = item.querySelector('.posts_perma-link');
      if (!permaLink) return;
      
      // 创建预览按钮
      const previewBtn = document.createElement('a');
      previewBtn.className = 'page-preview-btn';
      previewBtn.href = permaLink.href;
      previewBtn.target = '_blank';
      previewBtn.title = '在新窗口预览页面';
      previewBtn.innerHTML = '<i class="fa fa-eye"></i>';
      previewBtn.style.marginLeft = '5px';
      previewBtn.style.color = '#0366d6';
      
      // 添加到页面项
      const editLink = item.querySelector('.posts_edit-link');
      if (editLink) {
        item.insertBefore(previewBtn, editLink);
      } else {
        item.appendChild(previewBtn);
      }
      
      // 修复页面标题
      const titleSpan = item.querySelector('.posts_post-title');
      if (titleSpan && (!titleSpan.textContent || titleSpan.textContent.trim() === '')) {
        // 从链接中提取页面路径
        const pagePath = permaLink.href.split('/').filter(Boolean).pop();
        if (pagePath) {
          // 将路径转换为更友好的标题
          let friendlyTitle = pagePath.replace(/\.(html|md)$/, '').replace(/[-_]/g, ' ');
          friendlyTitle = friendlyTitle.charAt(0).toUpperCase() + friendlyTitle.slice(1);
          titleSpan.textContent = friendlyTitle || '未命名页面';
        } else {
          titleSpan.textContent = '未命名页面';
        }
      }
    });
  }
  
  // 监听DOM变化，动态增强页面列表
  function setupObserver() {
    // 先执行一次增强
    enhancePagesList();
    
    // 设置MutationObserver监听DOM变化
    const observer = new MutationObserver(function(mutations) {
      enhancePagesList();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  // 页面加载完成后执行增强
  document.addEventListener('DOMContentLoaded', function() {
    setupObserver();
  });
})();
