/**
 * 直接隐藏设置页面中的英文元素
 */
(function() {
  // 当页面加载完成后执行
  document.addEventListener('DOMContentLoaded', function() {
    // 立即执行一次
    setTimeout(hideOriginalElements, 100);
    setTimeout(hideOriginalElements, 500);
    setTimeout(hideOriginalElements, 1000);
    
    // 监听hash变化
    window.addEventListener('hashchange', function() {
      if (window.location.hash.includes('#/settings')) {
        setTimeout(hideOriginalElements, 300);
      }
    });
    
    // 监听DOM变化
    const observer = new MutationObserver(function(mutations) {
      if (window.location.hash.includes('#/settings')) {
        hideOriginalElements();
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // 定期检查
    setInterval(function() {
      if (window.location.hash.includes('#/settings')) {
        hideOriginalElements();
      }
    }, 1000);
  });
  
  // 隐藏原始元素，直接操作DOM
  function hideOriginalElements() {
    if (!window.location.hash.includes('#/settings')) return;
    
    // 获取设置容器
    const settingsContainer = document.querySelector('.settings');
    if (!settingsContainer) return;
    
    // 直接替换标题
    const title = settingsContainer.querySelector('h1');
    if (title && title.textContent === 'Settings') {
      title.textContent = '设置';
    }
    
    // 查找并替换h2标题
    const h2Elements = settingsContainer.querySelectorAll('h2');
    h2Elements.forEach(h2 => {
      if (h2.textContent === 'Editor Settings') {
        h2.textContent = '编辑器设置';
      } else if (h2.textContent === 'Image Pasting Settings') {
        h2.textContent = '图片粘贴设置';
      }
    });
    
    // 查找并替换段落
    const paragraphs = settingsContainer.querySelectorAll('p');
    paragraphs.forEach(p => {
      const text = p.textContent.trim();
      
      if (text.includes('Set various settings')) {
        p.textContent = '为您的管理面板和编辑器设置各种选项。';
      } else if (text.includes('Hexo admin can be secured')) {
        // 保留链接
        const link = p.querySelector('a');
        p.innerHTML = 'Hexo管理后台可以使用密码保护。 ';
        if (link) {
          link.textContent = '点此设置认证';
          p.appendChild(link);
        }
      } else if (text.includes('paste images')) {
        p.textContent = 'Hexo管理后台允许您直接将从网页或其他地方复制的图片粘贴到编辑器中。决定如何处理这些图片。';
      }
    });
    
    // 查找并替换标签
    const labels = settingsContainer.querySelectorAll('label');
    labels.forEach(label => {
      const text = label.textContent.trim();
      
      if (text.includes('Enable line numbering')) {
        // 保留复选框
        const checkbox = label.querySelector('input[type="checkbox"]');
        if (checkbox) {
          label.innerHTML = '';
          label.appendChild(checkbox);
          label.appendChild(document.createTextNode(' 启用行号'));
        }
      } else if (text.includes('Enable spellchecking')) {
        // 保留复选框
        const checkbox = label.querySelector('input[type="checkbox"]');
        if (checkbox) {
          label.innerHTML = '';
          label.appendChild(checkbox);
          label.appendChild(document.createTextNode(' 启用拼写检查（在旧浏览器上可能有问题）'));
        }
      } else if (text.includes('Always ask for filename')) {
        // 保留复选框
        const checkbox = label.querySelector('input[type="checkbox"]');
        if (checkbox) {
          label.innerHTML = '';
          label.appendChild(checkbox);
          label.appendChild(document.createTextNode(' 总是询问文件名'));
        }
      } else if (text.includes('Overwrite images')) {
        // 保留复选框
        const checkbox = label.querySelector('input[type="checkbox"]');
        if (checkbox) {
          label.innerHTML = '';
          label.appendChild(checkbox);
          label.appendChild(document.createTextNode(' 如果文件已存在则覆盖'));
        }
      } else if (text.includes('Image directory')) {
        label.textContent = '图片目录:';
      } else if (text.includes('Image filename prefix')) {
        label.textContent = '图片文件名前缀:';
      }
    });
    
    // 替换按钮文本
    const buttons = settingsContainer.querySelectorAll('button');
    buttons.forEach(button => {
      if (button.textContent.includes('Save')) {
        button.textContent = '保存设置';
      }
    });
  }
})(); 