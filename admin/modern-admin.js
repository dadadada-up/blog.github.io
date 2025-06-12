/**
 * 增强型Hexo管理后台 - 现代化UI功能
 */
(function() {
  // 等待DOM加载完成
  document.addEventListener('DOMContentLoaded', function() {
    // 检查是否为hexo-myadmin页面
    if (isHexoMyadminPage()) {
      // 应用现代化样式
      applyModernStyles();
      // 初始化浮动按钮
      initFloatingButtons();
      // 增强UI元素
      enhanceUIElements();
      // 监听路由变化
      watchRouteChanges();
    }
  });

  /**
   * 检查当前页面是否为hexo-myadmin页面
   */
  function isHexoMyadminPage() {
    // 通过URL或页面特征判断
    return window.location.pathname.includes('/admin/') || 
           document.querySelector('.el-container') !== null ||
           document.querySelector('.el-menu') !== null;
  }

  /**
   * 应用现代化样式
   */
  function applyModernStyles() {
    // 添加样式表
    const styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = '/admin/modern-admin.css';
    document.head.appendChild(styleLink);
    
    // 添加字体图标
    const iconLink = document.createElement('link');
    iconLink.rel = 'stylesheet';
    iconLink.href = 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/all.min.css';
    document.head.appendChild(iconLink);
    
    // 添加body类
    document.body.classList.add('modern-admin');
    
    // 处理标题
    enhanceHeader();
  }
  
  /**
   * 增强标题栏
   */
  function enhanceHeader() {
    const header = document.querySelector('.el-header');
    if (!header) return;
    
    // 添加渐变标题效果
    const title = header.querySelector('h1, h2, .title');
    if (title) {
      title.classList.add('admin-logo');
    }
    
    // 添加按钮区域
    if (!header.querySelector('.admin-header-actions')) {
      const actionsContainer = document.createElement('div');
      actionsContainer.className = 'admin-header-actions';
      
      // 添加仪表盘按钮
      const dashboardBtn = document.createElement('a');
      dashboardBtn.className = 'dashboard-button';
      dashboardBtn.innerHTML = '<i class="fas fa-tachometer-alt"></i> 仪表盘';
      dashboardBtn.href = '/admin/dashboard.html';
      dashboardBtn.target = '_blank';
      actionsContainer.appendChild(dashboardBtn);
      
      // 添加注销按钮
      const logoutBtn = document.createElement('a');
      logoutBtn.className = 'logout-button';
      logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> 注销';
      logoutBtn.href = 'javascript:void(0);';
      logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('adminLoggedIn');
        window.location.href = '/admin/login.html';
      });
      actionsContainer.appendChild(logoutBtn);
      
      header.appendChild(actionsContainer);
    }
  }
  
  /**
   * 初始化浮动按钮
   */
  function initFloatingButtons() {
    // 如果已经存在浮动按钮，则不重复添加
    if (document.querySelector('.floating-action-btn')) return;
    
    // 创建主浮动按钮
    const floatingBtn = document.createElement('div');
    floatingBtn.className = 'floating-action-btn';
    floatingBtn.innerHTML = '<i class="fas fa-plus"></i>';
    floatingBtn.addEventListener('click', toggleFloatingActions);
    
    // 创建浮动操作容器
    const floatActions = document.createElement('div');
    floatActions.className = 'float-actions';
    
    // 创建新建文章按钮
    const newPostBtn = createFloatActionButton('float-action-new', 'fas fa-edit', '新建文章', function() {
      // 查找新建文章按钮并点击
      const newPostButtonSelector = '.el-button--primary:first-child, button:contains("New Post")';
      const newPostButton = document.querySelector(newPostButtonSelector);
      if (newPostButton) {
        newPostButton.click();
      } else {
        // 如果找不到按钮，尝试导航到新建文章页面
        window.location.href = '/#/new';
      }
    });
    floatActions.appendChild(newPostBtn);
    
    // 创建部署按钮
    const deployBtn = createFloatActionButton('float-action-deploy', 'fas fa-rocket', '部署网站', function() {
      // 部署操作（可根据实际情况自定义）
      if (confirm('确定要部署网站吗？')) {
        fetch('/api/deploy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {
          alert(data.success ? '部署成功！' : '部署失败！');
        })
        .catch(error => {
          console.error('部署出错:', error);
          alert('部署出错，请查看控制台了解详情。');
        });
      }
    });
    floatActions.appendChild(deployBtn);
    
    // 创建设置按钮
    const settingsBtn = createFloatActionButton('float-action-settings', 'fas fa-cog', '设置', function() {
      // 导航到设置页面
      window.location.href = '/#/settings';
    });
    floatActions.appendChild(settingsBtn);
    
    // 创建查看网站按钮
    const viewSiteBtn = createFloatActionButton('float-action-view', 'fas fa-external-link-alt', '查看网站', function() {
      window.open('/', '_blank');
    });
    floatActions.appendChild(viewSiteBtn);
    
    // 添加到页面
    document.body.appendChild(floatActions);
    document.body.appendChild(floatingBtn);
  }
  
  /**
   * 创建浮动操作按钮
   */
  function createFloatActionButton(className, iconClass, label, clickHandler) {
    const btn = document.createElement('div');
    btn.className = 'float-action ' + className;
    btn.innerHTML = `<i class="${iconClass}"></i><span class="float-action-label">${label}</span>`;
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      clickHandler();
      toggleFloatingActions(); // 点击后关闭浮动菜单
    });
    return btn;
  }
  
  /**
   * 切换浮动操作按钮的显示/隐藏
   */
  function toggleFloatingActions() {
    const floatActions = document.querySelector('.float-actions');
    if (floatActions) {
      floatActions.classList.toggle('open');
      
      // 旋转主按钮
      const mainBtn = document.querySelector('.floating-action-btn i');
      if (mainBtn) {
        mainBtn.style.transform = floatActions.classList.contains('open') ? 'rotate(45deg)' : 'rotate(0)';
      }
    }
  }
  
  /**
   * 增强UI元素
   */
  function enhanceUIElements() {
    // 监听DOM变化，增强动态生成的元素
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          // 增强表格
          enhanceTables();
          // 增强按钮
          enhanceButtons();
          // 增强表单
          enhanceForms();
        }
      });
    });
    
    // 开始监听
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // 立即执行一次增强
    enhanceTables();
    enhanceButtons();
    enhanceForms();
  }
  
  /**
   * 增强表格
   */
  function enhanceTables() {
    // 查找表格
    const tables = document.querySelectorAll('.el-table');
    tables.forEach(function(table) {
      // 避免重复处理
      if (table.dataset.enhanced) return;
      table.dataset.enhanced = 'true';
      
      // 美化状态标签
      const statusCells = table.querySelectorAll('.cell');
      statusCells.forEach(function(cell) {
        if (cell.textContent.trim() === 'published') {
          cell.innerHTML = '<span class="status-tag status-published">已发布</span>';
        } else if (cell.textContent.trim() === 'draft') {
          cell.innerHTML = '<span class="status-tag status-draft">草稿</span>';
        }
      });
    });
  }
  
  /**
   * 增强按钮
   */
  function enhanceButtons() {
    // 增强按钮样式
    const buttons = document.querySelectorAll('.el-button');
    buttons.forEach(function(button) {
      // 避免重复处理
      if (button.dataset.enhanced) return;
      button.dataset.enhanced = 'true';
      
      // 添加图标
      if (button.textContent.includes('New Post') && !button.querySelector('i')) {
        button.innerHTML = '<i class="fas fa-plus"></i> ' + button.textContent;
      } else if (button.textContent.includes('Edit') && !button.querySelector('i')) {
        button.innerHTML = '<i class="fas fa-edit"></i> ' + button.textContent;
      } else if (button.textContent.includes('Delete') && !button.querySelector('i')) {
        button.innerHTML = '<i class="fas fa-trash-alt"></i> ' + button.textContent;
      } else if (button.textContent.includes('View') && !button.querySelector('i')) {
        button.innerHTML = '<i class="fas fa-eye"></i> ' + button.textContent;
      } else if (button.textContent.includes('Save') && !button.querySelector('i')) {
        button.innerHTML = '<i class="fas fa-save"></i> ' + button.textContent;
      } else if (button.textContent.includes('Publish') && !button.querySelector('i')) {
        button.innerHTML = '<i class="fas fa-paper-plane"></i> ' + button.textContent;
      }
    });
  }
  
  /**
   * 增强表单
   */
  function enhanceForms() {
    // 增强表单元素
    const inputs = document.querySelectorAll('.el-input__inner');
    inputs.forEach(function(input) {
      // 避免重复处理
      if (input.dataset.enhanced) return;
      input.dataset.enhanced = 'true';
      
      // 添加过渡效果
      input.style.transition = 'all 0.3s';
    });
    
    // 增强编辑器
    enhanceEditor();
  }
  
  /**
   * 增强编辑器
   */
  function enhanceEditor() {
    // 查找编辑器区域
    const editorContainer = document.querySelector('.CodeMirror');
    if (!editorContainer || editorContainer.dataset.enhanced) return;
    editorContainer.dataset.enhanced = 'true';
    
    // 添加样式
    editorContainer.style.borderRadius = '8px';
    editorContainer.style.boxShadow = 'var(--shadow-light)';
    editorContainer.style.transition = 'all 0.3s';
    
    // 编辑器悬停效果
    editorContainer.addEventListener('mouseenter', function() {
      this.style.boxShadow = 'var(--shadow-dark)';
    });
    
    editorContainer.addEventListener('mouseleave', function() {
      this.style.boxShadow = 'var(--shadow-light)';
    });
  }
  
  /**
   * 监听路由变化
   */
  function watchRouteChanges() {
    // 监听URL哈希变化
    window.addEventListener('hashchange', function() {
      // 在路由变化时重新应用增强
      setTimeout(function() {
        enhanceUIElements();
      }, 300);
    });
    
    // 监听Vue路由变化（如果存在）
    if (typeof window.Vue !== 'undefined') {
      const originalPush = window.Vue.prototype.$router.push;
      window.Vue.prototype.$router.push = function(location) {
        const result = originalPush.call(this, location);
        setTimeout(function() {
          enhanceUIElements();
        }, 300);
        return result;
      };
    }
  }
})(); 