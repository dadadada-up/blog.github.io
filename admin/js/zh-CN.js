
// hexo-admin 中文翻译
(function() {
  const translations = {
  "New Post": "新建文章",
  "New Page": "新建页面",
  "Posts": "文章",
  "Pages": "页面",
  "Settings": "设置",
  "Deploy": "部署",
  "About": "关于",
  "Logout": "退出登录",
  "Profile": "个人信息",
  "Title": "标题",
  "Date": "日期",
  "Tags": "标签",
  "Categories": "分类",
  "Published": "已发布",
  "Draft": "草稿",
  "Save": "保存",
  "Publish": "发布",
  "Unpublish": "取消发布",
  "Rename": "重命名",
  "Remove": "删除",
  "Preview": "预览",
  "Raw": "源码",
  "Global Settings": "全局设置",
  "Editor Settings": "编辑器设置",
  "Open in New Tab": "在新标签页中打开",
  "Use relative URLs": "使用相对URL",
  "Deploy Site": "部署网站",
  "Deploying...": "正在部署...",
  "Deploy Complete!": "部署完成！",
  "Deploy Failed!": "部署失败！"
};
  
  // 替换页面中的英文文本
  function translateText() {
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
          profileLink.textContent = 'Profile';
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
  
  // 页面加载完成后执行翻译
  document.addEventListener('DOMContentLoaded', function() {
    translateText();
    addProfileLink();
    
    // 监听DOM变化，动态翻译新添加的元素
    const observer = new MutationObserver(function(mutations) {
      translateText();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
})();
