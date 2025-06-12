
// hexo-admin 设置页面增强
(function() {
  // 禁用缓存，确保每次都重新加载脚本
  window.localStorage.removeItem('hexo-admin-settings');
  
  // 强制清除页面缓存
  if (window.performance && window.performance.navigation.type !== 1) {
    console.log('强制刷新设置页面以应用新样式');
  }
  
  // 设置页面翻译
  const translations = {
    'Settings': '设置',
    'Global Settings': '全局设置',
    'Editor Settings': '编辑器设置',
    'Open in New Tab': '在新标签页中打开',
    'Use relative URLs': '使用相对URL',
    'Save Settings': '保存设置',
    'Theme': '主题',
    'light': '浅色',
    'dark': '深色',
    'Set various settings for your admin panel and editor.': '为您的管理面板和编辑器设置各种选项。',
    'Hexo admin can be secured with a password.': 'Hexo管理后台可以使用密码保护。',
    'Setup authentication here.': '点此设置认证',
    'Enable line numbering.': '启用行号',
    'Enable spellchecking. (buggy on older browsers)': '启用拼写检查（在旧浏览器上可能有问题）',
    'Image Pasting Settings': '图片粘贴设置',
    'Hexo-admin allows you to paste images you copy from the web or elsewhere directly into the editor.': 'Hexo管理后台允许您直接将从网页或其他地方复制的图片粘贴到编辑器中。',
    'Decide how these images will be handled.': '决定如何处理这些图片。',
    'Always ask for filename.': '总是询问文件名',
    'Overwrite images if file already exists.': '如果文件已存在则覆盖',
    'Image directory:': '图片目录：',
    'Image filename prefix:': '图片文件名前缀：'
  };
  
  // 设置项说明文本
  const descriptions = {
    'Open in New Tab': '在新窗口中打开编辑的文章和页面',
    'Use relative URLs': '使用相对路径而非绝对路径',
    'Theme': '选择编辑器的显示主题',
    'Enable line numbering.': '在编辑器中显示行号',
    'Enable spellchecking.': '在编辑器中启用拼写检查功能',
    'Always ask for filename.': '粘贴图片时总是询问文件名',
    'Overwrite images if file already exists.': '如果图片文件已存在则覆盖它',
    'Image directory:': '存储上传图片的目录路径',
    'Image filename prefix:': '上传图片的文件名前缀'
  };
  
  // 增强设置页面
  function enhanceSettingsPage() {
    // 检查是否在设置页面
    if (!window.location.hash.includes('#/settings')) return;
    
    // 获取设置页面容器
    const settingsContainer = document.querySelector('.settings');
    if (!settingsContainer) return;
    
    // 检查是否已经增强
    if (settingsContainer.classList.contains('enhanced')) return;
    
    // 添加样式
    if (!document.getElementById('settings-enhancer-style')) {
      const style = document.createElement('style');
      style.id = 'settings-enhancer-style';
      style.textContent = `
        .settings {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .settings-group {
          background: #fff;
          border-radius: 5px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          margin-bottom: 20px;
          padding: 20px;
        }
        
        .settings-group-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }
        
        .settings-item {
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 1px solid #f5f5f5;
        }
        
        .settings-item:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }
        
        .settings-item-label {
          display: flex;
          align-items: center;
          margin-bottom: 5px;
          font-weight: bold;
        }
        
        .settings-item-description {
          font-size: 14px;
          color: #666;
          margin-top: 5px;
          margin-left: 24px;
        }
        
        .settings-save-btn {
          background-color: #0366d6;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.2s;
          margin-top: 20px;
        }
        
        .settings-save-btn:hover {
          background-color: #0256b9;
        }
        
        .settings select {
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background-color: #fff;
          min-width: 200px;
        }
        
        .settings input[type="text"] {
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background-color: #fff;
          width: 100%;
          max-width: 300px;
        }
        
        /* 美化复选框 */
        .settings input[type="checkbox"] {
          margin-right: 8px;
          transform: scale(1.2);
        }
        
        /* 成功消息样式 */
        .settings-success {
          background-color: #d4edda;
          color: #155724;
          padding: 10px 15px;
          border-radius: 4px;
          margin-top: 15px;
          display: none;
        }
        
        hr {
          margin: 20px 0;
          border: 0;
          border-top: 1px solid #eee;
        }
      `;
      document.head.appendChild(style);
    }
    
    // 等待设置项加载完成
    setTimeout(function() {
      // 获取所有设置项
      const settingItems = settingsContainer.querySelectorAll('.settings-item');
      if (settingItems.length === 0) {
        const formItems = settingsContainer.querySelectorAll('div > label');
        if (formItems.length === 0) return;
        
        // 重构设置页面
        restructureSettingsPage(settingsContainer);
        
        // 标记为已增强
        settingsContainer.classList.add('enhanced');
      }
    }, 500);
  }
  
  // 重构设置页面
  function restructureSettingsPage(container) {
    // 保存原始内容
    const originalContent = container.innerHTML;
    
    // 清空容器
    container.innerHTML = '';
    
    // 创建标题
    const title = document.createElement('h2');
    title.textContent = translations['Settings'] || 'Settings';
    title.style.marginBottom = '20px';
    container.appendChild(title);

    // 翻译顶部描述
    const description = document.createElement('p');
    description.textContent = translations['Set various settings for your admin panel and editor.'] || 'Set various settings for your admin panel and editor.';
    container.appendChild(description);

    // 翻译认证描述
    const authContainer = document.createElement('p');
    const authText = document.createElement('span');
    authText.textContent = translations['Hexo admin can be secured with a password.'] + ' ';
    
    const authLink = document.createElement('a');
    authLink.href = '#/auth';
    authLink.textContent = translations['Setup authentication here.'];
    
    authContainer.appendChild(authText);
    authContainer.appendChild(authLink);
    container.appendChild(authContainer);
    
    // 添加分隔线
    const divider1 = document.createElement('hr');
    container.appendChild(divider1);
    
    // 创建全局设置组
    const globalGroup = document.createElement('div');
    globalGroup.className = 'settings-group';
    
    const globalTitle = document.createElement('h3');
    globalTitle.className = 'settings-group-title';
    globalTitle.textContent = translations['Global Settings'] || 'Global Settings';
    globalGroup.appendChild(globalTitle);
    
    // 创建编辑器设置组
    const editorGroup = document.createElement('div');
    editorGroup.className = 'settings-group';
    
    const editorTitle = document.createElement('h3');
    editorTitle.className = 'settings-group-title';
    editorTitle.textContent = translations['Editor Settings'] || 'Editor Settings';
    editorGroup.appendChild(editorTitle);
    
    // 创建图片设置组
    const imageGroup = document.createElement('div');
    imageGroup.className = 'settings-group';
    
    const imageTitle = document.createElement('h3');
    imageTitle.className = 'settings-group-title';
    imageTitle.textContent = translations['Image Pasting Settings'] || 'Image Pasting Settings';
    imageGroup.appendChild(imageTitle);
    
    // 添加图片设置描述
    const imageDesc = document.createElement('p');
    imageDesc.textContent = translations['Hexo-admin allows you to paste images you copy from the web or elsewhere directly into the editor.'] + ' ' + 
                           translations['Decide how these images will be handled.'];
    imageGroup.appendChild(imageDesc);
    
    // 临时容器用于解析原始内容
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = originalContent;
    
    // 提取设置项
    const checkboxes = tempDiv.querySelectorAll('input[type="checkbox"]');
    const textInputs = tempDiv.querySelectorAll('input[type="text"]');
    const selects = tempDiv.querySelectorAll('select');
    const saveButton = tempDiv.querySelector('button');
    
    // 处理复选框
    checkboxes.forEach(checkbox => {
      const label = checkbox.parentElement;
      const text = label.textContent.trim();
      
      const settingItem = document.createElement('div');
      settingItem.className = 'settings-item';
      
      const itemLabel = document.createElement('label');
      itemLabel.className = 'settings-item-label';
      
      const newCheckbox = checkbox.cloneNode(true);
      itemLabel.appendChild(newCheckbox);
      itemLabel.appendChild(document.createTextNode(translations[text] || text));
      
      settingItem.appendChild(itemLabel);
      
      // 添加描述
      if (descriptions[text]) {
        const description = document.createElement('div');
        description.className = 'settings-item-description';
        description.textContent = descriptions[text];
        settingItem.appendChild(description);
      }
      
      // 根据设置类型分配到不同组
      if (text === 'Open in New Tab' || text === 'Use relative URLs') {
        globalGroup.appendChild(settingItem);
      } else if (text === 'Always ask for filename.' || text === 'Overwrite images if file already exists.') {
        imageGroup.appendChild(settingItem);
      } else {
        editorGroup.appendChild(settingItem);
      }
    });
    
    // 处理文本输入框
    textInputs.forEach(input => {
      // 查找标签
      let labelText = '';
      let label = null;
      
      // 尝试找到关联的标签
      if (input.id) {
        label = tempDiv.querySelector('label[for="' + input.id + '"]');
      }
      
      // 如果没找到，尝试查找前面的元素
      if (!label) {
        let prev = input.previousElementSibling;
        while (prev) {
          if (prev.tagName === 'LABEL') {
            label = prev;
            break;
          }
          prev = prev.previousElementSibling;
        }
      }
      
      // 如果仍然没找到，尝试查找父元素的前一个兄弟元素
      if (!label) {
        const parent = input.parentElement;
        if (parent) {
          let prev = parent.previousElementSibling;
          while (prev) {
            if (prev.tagName === 'LABEL') {
              label = prev;
              break;
            }
            prev = prev.previousElementSibling;
          }
        }
      }
      
      // 最后尝试通过文本内容查找
      if (!label) {
        const allLabels = tempDiv.querySelectorAll('label');
        for (let i = 0; i < allLabels.length; i++) {
          if (allLabels[i].textContent.includes('directory') && input.name === 'imagedir') {
            label = allLabels[i];
            break;
          } else if (allLabels[i].textContent.includes('prefix') && input.name === 'imageprefix') {
            label = allLabels[i];
            break;
          }
        }
      }
      
      if (label) {
        labelText = label.textContent.trim();
      } else {
        // 根据输入框名称猜测标签
        if (input.name === 'imagedir') {
          labelText = 'Image directory:';
        } else if (input.name === 'imageprefix') {
          labelText = 'Image filename prefix:';
        } else {
          return; // 跳过无法识别的输入框
        }
      }
      
      const settingItem = document.createElement('div');
      settingItem.className = 'settings-item';
      
      const itemLabel = document.createElement('label');
      itemLabel.className = 'settings-item-label';
      itemLabel.textContent = translations[labelText] || labelText;
      
      settingItem.appendChild(itemLabel);
      
      // 克隆输入框
      const newInput = input.cloneNode(true);
      settingItem.appendChild(newInput);
      
      // 添加描述
      if (descriptions[labelText]) {
        const description = document.createElement('div');
        description.className = 'settings-item-description';
        description.textContent = descriptions[labelText];
        settingItem.appendChild(description);
      }
      
      // 添加到图片设置组
      imageGroup.appendChild(settingItem);
    });
    
    // 处理下拉选择框
    selects.forEach(select => {
      const label = select.previousElementSibling;
      if (!label) return;
      
      const text = label.textContent.trim();
      
      const settingItem = document.createElement('div');
      settingItem.className = 'settings-item';
      
      const itemLabel = document.createElement('div');
      itemLabel.className = 'settings-item-label';
      itemLabel.textContent = translations[text] || text;
      
      settingItem.appendChild(itemLabel);
      
      // 翻译选项
      const newSelect = select.cloneNode(true);
      Array.from(newSelect.options).forEach(option => {
        option.textContent = translations[option.textContent] || option.textContent;
      });
      
      settingItem.appendChild(newSelect);
      
      // 添加描述
      if (descriptions[text]) {
        const description = document.createElement('div');
        description.className = 'settings-item-description';
        description.textContent = descriptions[text];
        settingItem.appendChild(description);
      }
      
      editorGroup.appendChild(settingItem);
    });
    
    // 添加设置组到容器
    container.appendChild(globalGroup);
    container.appendChild(editorGroup);
    
    // 添加分隔线
    const divider2 = document.createElement('hr');
    container.appendChild(divider2);
    
    // 添加图片设置组
    container.appendChild(imageGroup);
    
    // 添加保存按钮
    if (saveButton) {
      const newSaveButton = document.createElement('button');
      newSaveButton.className = 'settings-save-btn';
      newSaveButton.textContent = translations['Save Settings'] || 'Save Settings';
      newSaveButton.style.marginTop = '20px';
      newSaveButton.onclick = function() {
        // 收集所有设置值
        const settings = {};
        
        // 收集复选框值
        container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
          const originalCb = Array.from(checkboxes).find(ocb => ocb.name === cb.name);
          if (originalCb) {
            settings[cb.name] = cb.checked;
          }
        });
        
        // 收集文本输入框值
        container.querySelectorAll('input[type="text"]').forEach(input => {
          const originalInput = Array.from(textInputs).find(oi => oi.name === input.name);
          if (originalInput) {
            settings[input.name] = input.value;
          }
        });
        
        // 收集选择框值
        container.querySelectorAll('select').forEach(sel => {
          const originalSel = Array.from(selects).find(osel => osel.name === sel.name);
          if (originalSel) {
            settings[sel.name] = sel.value;
          }
        });
        
        // 调用原始保存函数
        saveButton.click();
        
        // 显示保存成功消息
        showSuccessMessage();
      };
      
      container.appendChild(newSaveButton);
      
      // 添加成功消息元素
      const successMsg = document.createElement('div');
      successMsg.className = 'settings-success';
      successMsg.textContent = '设置已保存！';
      container.appendChild(successMsg);
    }
  }
  
  // 显示保存成功消息
  function showSuccessMessage() {
    const msg = document.querySelector('.settings-success');
    if (!msg) return;
    
    msg.style.display = 'block';
    
    setTimeout(function() {
      msg.style.display = 'none';
    }, 3000);
  }
  
  // 监听路由变化
  function setupRouteObserver() {
    // 初始检查
    enhanceSettingsPage();
    
    // 使用MutationObserver监听DOM变化
    const observer = new MutationObserver(function(mutations) {
      enhanceSettingsPage();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // 监听hash变化
    window.addEventListener('hashchange', function() {
      setTimeout(enhanceSettingsPage, 300);
    });
    
    // 定期检查，确保应用样式
    setInterval(enhanceSettingsPage, 1000);
  }
  
  // 页面加载完成后立即执行增强
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupRouteObserver);
  } else {
    // 如果页面已经加载完成，立即执行
    setupRouteObserver();
  }
  
  // 检查当前是否在设置页面，如果是则立即执行
  if (window.location.hash.includes('#/settings')) {
    setTimeout(enhanceSettingsPage, 100);
    setTimeout(enhanceSettingsPage, 500);
    setTimeout(enhanceSettingsPage, 1000);
  }
})();
