(function() {
  console.log('Hexo MyAdmin 注入脚本已加载');
  
  // 添加样式
  const style = document.createElement('style');
  style.textContent = `
    /* 美化 hexo-myadmin 样式 */
    body {
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%) !important;
    }
    
    .el-header, .el-menu--horizontal {
      background-color: #1a1a35 !important;
      color: white !important;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
    
    .el-menu-item.is-active {
      background-color: #409EFF !important;
      color: white !important;
      border-radius: 4px;
    }
    
    .el-menu-item:hover {
      background-color: rgba(64, 158, 255, 0.1) !important;
      transform: translateY(-2px);
      transition: all 0.3s ease;
    }
    
    .el-card {
      border-radius: 8px !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
      transition: all 0.3s ease;
      margin-bottom: 15px;
    }
    
    .el-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2) !important;
    }
    
    /* 自定义仪表盘按钮 */
    .dashboard-button {
      display: inline-block;
      margin-left: 15px;
      padding: 6px 15px;
      background: #67C23A;
      color: white !important;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s;
      text-decoration: none;
      box-shadow: 0 2px 6px rgba(103, 194, 58, 0.3);
    }
    
    .dashboard-button:hover {
      background: #5daf34;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(103, 194, 58, 0.4);
    }
    
    /* 注销按钮 */
    .logout-button {
      display: inline-block;
      margin-left: 10px;
      padding: 6px 15px;
      background: #F56C6C;
      color: white !important;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s;
      text-decoration: none;
      box-shadow: 0 2px 6px rgba(245, 108, 108, 0.3);
    }
    
    .logout-button:hover {
      background: #e04f4f;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(245, 108, 108, 0.4);
    }
  `;
  document.head.appendChild(style);
  
  // 添加顶部按钮函数
  function addTopButtons() {
    console.log('尝试添加顶部按钮');
    
    // 查找导航栏
    const headers = document.querySelectorAll('.el-header');
    
    if (headers.length > 0) {
      console.log('找到header元素:', headers.length);
      const header = headers[0];
      
      // 如果已有按钮，不重复添加
      if (document.querySelector('.dashboard-button')) {
        console.log('按钮已存在，不重复添加');
        return;
      }
      
      // 创建按钮容器
      const buttonContainer = document.createElement('div');
      buttonContainer.style.cssText = 'display: inline-flex; align-items: center; margin-left: 20px; position: absolute; right: 20px; top: 14px;';
      
      // 创建仪表盘按钮
      const dashboardButton = document.createElement('a');
      dashboardButton.href = '/admin/myadmin-dashboard.html';
      dashboardButton.className = 'dashboard-button';
      dashboardButton.innerHTML = '<i class="el-icon-data-board" style="margin-right: 5px;"></i>仪表盘';
      dashboardButton.target = '_blank';
      
      // 创建注销按钮
      const logoutButton = document.createElement('a');
      logoutButton.href = 'javascript:void(0);';
      logoutButton.className = 'logout-button';
      logoutButton.innerHTML = '<i class="el-icon-switch-button" style="margin-right: 5px;"></i>注销';
      logoutButton.onclick = function() {
        localStorage.removeItem('adminLoggedIn');
        window.location.href = '/admin/login.html';
      };
      
      // 添加按钮到容器
      buttonContainer.appendChild(dashboardButton);
      buttonContainer.appendChild(logoutButton);
      
      // 添加到header
      header.appendChild(buttonContainer);
      console.log('成功添加按钮到header');
    } else {
      console.log('未找到header元素，稍后重试');
      setTimeout(addTopButtons, 500);
    }
  }
  
  // 页面加载完成后执行
  if (document.readyState === 'complete') {
    addTopButtons();
  } else {
    window.addEventListener('load', function() {
      setTimeout(addTopButtons, 500);
    });
  }
  
  // 监视DOM变化，确保在动态加载的情况下也能添加按钮
  const observer = new MutationObserver(function(mutations) {
    if (!document.querySelector('.dashboard-button')) {
      addTopButtons();
    }
  });
  
  observer.observe(document.body, { 
    childList: true, 
    subtree: true 
  });
})();