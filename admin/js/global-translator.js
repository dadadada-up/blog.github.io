/**
 * Hexo Admin 全局中文翻译脚本
 * 这个脚本处理除设置页面外的所有页面的翻译
 */

(function() {
  // 翻译映射
  const translations = {
    // 导航和标题
    "New Post": "新建文章",
    "New Page": "新建页面",
    "Posts": "文章",
    "Pages": "页面",
    "Settings": "设置",
    "Deploy": "部署",
    "About": "关于",
    "Logout": "退出登录",
    "Profile": "个人信息",
    
    // 文章和页面属性
    "Title": "标题",
    "Date": "日期",
    "Tags": "标签",
    "Categories": "分类",
    "Published": "已发布",
    "Draft": "草稿",
    
    // 操作按钮
    "Save": "保存",
    "Publish": "发布",
    "Unpublish": "取消发布",
    "Rename": "重命名",
    "Remove": "删除",
    "Preview": "预览",
    "Raw": "源码",
    
    // 部署相关
    "Deploy Site": "部署网站",
    "Deploying...": "正在部署...",
    "Deploy Complete!": "部署完成！",
    "Deploy Failed!": "部署失败！"
  };
  
  // DOM就绪后执行翻译
  document.addEventListener('DOMContentLoaded', function() {
    // 立即翻译
    translateUI();
    
    // 添加个人信息链接
    addProfileLink();
    
    // 监听DOM变化，动态翻译新添加的元素
    const observer = new MutationObserver(function(mutations) {
      translateUI();
      
      // 如果在页面列表页面，添加预览按钮
      if (window.location.hash.includes('#/pages')) {
        addPreviewButtons();
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // 监听hash变化
    window.addEventListener('hashchange', function() {
      setTimeout(translateUI, 100);
      
      // 如果在页面列表页面，添加预览按钮
      if (window.location.hash.includes('#/pages')) {
        setTimeout(addPreviewButtons, 300);
      }
    });
    
    // 定期检查翻译，确保UI一致性
    setInterval(translateUI, 2000);
  });
  
  // 翻译UI元素
  function translateUI() {
    // 跳过设置页面，由专门的脚本处理
    if (window.location.hash.includes('#/settings')) return;
    
    // 替换文本节点
    document.querySelectorAll('*').forEach(el => {
      if (el.childNodes && el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
        const text = el.textContent.trim();
        if (translations[text]) {
          el.textContent = translations[text];
        }
      }
    });
    
    // 替换按钮文本
    document.querySelectorAll('button').forEach(btn => {
      const text = btn.textContent.trim();
      if (translations[text]) {
        btn.textContent = translations[text];
      }
    });
    
    // 替换输入框占位符
    document.querySelectorAll('input[placeholder]').forEach(input => {
      const placeholder = input.getAttribute('placeholder');
      if (translations[placeholder]) {
        input.setAttribute('placeholder', translations[placeholder]);
      }
    });
    
    // 翻译标签页
    document.querySelectorAll('.tab').forEach(tab => {
      const text = tab.textContent.trim();
      if (translations[text]) {
        tab.textContent = translations[text];
      }
    });
  }
  
  // 添加个人信息管理链接
  function addProfileLink() {
    const header = document.querySelector('.main-nav');
    if (header) {
      const links = header.querySelectorAll('a');
      let hasProfileLink = false;
      
      // 检查是否已经添加了个人信息链接
      links.forEach(link => {
        if (link.textContent === 'Profile' || link.textContent === '个人信息') {
          hasProfileLink = true;
        }
      });
      
      // 如果没有，添加链接
      if (!hasProfileLink) {
        const settingsLink = Array.from(links).find(link => 
          link.textContent === 'Settings' || link.textContent === '设置'
        );
        
        if (settingsLink) {
          const profileLink = document.createElement('a');
          profileLink.href = '/profile/';
          profileLink.textContent = '个人信息';
          profileLink.style.marginRight = '15px';
          
          // 插入到设置链接之前
          header.insertBefore(profileLink, settingsLink);
          
          // 添加点击事件，在新窗口打开
          profileLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('/profile/', '_blank');
          });
        }
      }
    }
  }
  
  // 为页面列表添加预览按钮
  function addPreviewButtons() {
    const pageItems = document.querySelectorAll('.post');
    
    pageItems.forEach(item => {
      // 检查是否已添加预览按钮
      if (item.querySelector('.preview-btn')) return;
      
      // 获取页面链接
      const titleLink = item.querySelector('a.title');
      if (!titleLink) return;
      
      // 提取页面路径
      const pagePath = titleLink.getAttribute('href').replace('#/pages/', '');
      if (!pagePath) return;
      
      // 创建预览按钮
      const previewBtn = document.createElement('a');
      previewBtn.className = 'preview-btn';
      previewBtn.textContent = '预览';
      previewBtn.style.marginLeft = '10px';
      previewBtn.style.color = '#0366d6';
      previewBtn.style.cursor = 'pointer';
      previewBtn.title = '在新窗口中预览页面';
      
      // 添加点击事件
      previewBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        window.open('/' + pagePath + '/', '_blank');
      });
      
      // 添加到标题后面
      titleLink.parentNode.appendChild(previewBtn);
    });
  }
})(); 