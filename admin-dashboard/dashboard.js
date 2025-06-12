// Hexo Admin Dashboard 客户端脚本
(function() {
  // 等待DOM加载完成
  document.addEventListener('DOMContentLoaded', function() {
    // 检查是否在管理页面
    if (!window.location.pathname.startsWith('/admin')) {
      return;
    }
    
    // 创建仪表板
    createDashboard();
    
    // 加载数据
    loadDashboardData();
    
    // 添加Notion设置入口到导航栏
    addNotionSettingsLink();
  });
  
  // 创建仪表板DOM结构
  function createDashboard() {
    // 查找插入点
    const adminApp = document.querySelector('#app') || document.body;
    if (!adminApp) return;
    
    // 创建仪表板容器
    const dashboard = document.createElement('div');
    dashboard.className = 'dashboard-container';
    dashboard.id = 'hexo-dashboard';
    dashboard.innerHTML = `
      <div class="dashboard-header">
        <h2 class="dashboard-title">博客仪表板</h2>
        <div class="dashboard-actions">
          <a href="/admin/notion-settings" class="dashboard-btn dashboard-btn-notion" title="Notion集成设置">
            Notion设置
          </a>
          <a href="/admin/notion-webhook-config" class="dashboard-btn dashboard-btn-notion" title="配置Notion Webhook">
            Notion Webhook配置
          </a>
        <button class="dashboard-refresh" id="refresh-dashboard">刷新数据</button>
        </div>
      </div>
      <div class="stats-grid" id="stats-grid">
        <div class="stat-card">
          <div class="stat-value" id="post-count">-</div>
          <div class="stat-label">文章总数</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="published-count">-</div>
          <div class="stat-label">已发布文章</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="draft-count">-</div>
          <div class="stat-label">草稿文章</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="page-count">-</div>
          <div class="stat-label">页面数量</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="category-count">-</div>
          <div class="stat-label">分类数量</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="tag-count">-</div>
          <div class="stat-label">标签数量</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="word-count">-</div>
          <div class="stat-label">总字数</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="last-updated">-</div>
          <div class="stat-label">最近更新</div>
        </div>
      </div>
      <div class="post-status">
        <h3>文章状态</h3>
        <div class="status-bar">
          <div class="status-published" id="status-published-bar"></div>
        </div>
        <div class="status-legend">
          <div class="legend-item">
            <div class="legend-color legend-published"></div>
            <span>已发布</span>
          </div>
          <div class="legend-item">
            <div class="legend-color legend-draft"></div>
            <span>草稿</span>
          </div>
        </div>
      </div>
      <div class="recent-posts">
        <h3>最近文章</h3>
        <ul class="post-list" id="recent-posts-list">
          <li>加载中...</li>
        </ul>
      </div>
    `;
    
    // 插入到页面
    adminApp.insertBefore(dashboard, adminApp.firstChild);
    
    // 添加刷新按钮事件
    document.getElementById('refresh-dashboard').addEventListener('click', loadDashboardData);
    
    // 修复原管理界面的留白问题
    document.body.classList.add('admin-body');
  }
  
  // 添加Notion设置入口到导航栏
  function addNotionSettingsLink() {
    // 查找导航栏
    const navbar = document.querySelector('.navbar') || document.querySelector('nav') || document.querySelector('header');
    
    if (!navbar) {
      console.warn('未找到导航栏，无法添加Notion设置入口');
      
      // 如果没有找到导航栏，创建一个浮动按钮
      const floatingButton = document.createElement('div');
      floatingButton.style.position = 'fixed';
      floatingButton.style.bottom = '20px';
      floatingButton.style.right = '20px';
      floatingButton.style.zIndex = '9999';
      floatingButton.innerHTML = `
        <a href="/admin/notion-settings" style="display: block; margin-bottom: 10px; padding: 10px 15px; background-color: #2196F3; color: white; text-decoration: none; border-radius: 4px; text-align: center;">
          Notion设置
        </a>
        <a href="/admin/notion-webhook-config" style="display: block; padding: 10px 15px; background-color: #2196F3; color: white; text-decoration: none; border-radius: 4px; text-align: center;">
          Notion Webhook配置
        </a>
      `;
      
      document.body.appendChild(floatingButton);
      return;
    }
    
    // 创建Notion设置链接
    const notionSettingsLink = document.createElement('li');
    notionSettingsLink.innerHTML = `
      <a href="/admin/notion-settings" style="color: #2196F3;">
        Notion设置
      </a>
    `;
    
    // 创建Notion Webhook配置链接
    const notionWebhookLink = document.createElement('li');
    notionWebhookLink.innerHTML = `
      <a href="/admin/notion-webhook-config" style="color: #2196F3;">
        Notion Webhook配置
      </a>
    `;
    
    // 查找导航菜单
    const navMenu = navbar.querySelector('ul');
    
    if (navMenu) {
      // 添加到导航菜单
      navMenu.appendChild(notionSettingsLink);
      navMenu.appendChild(notionWebhookLink);
    } else {
      // 如果没有找到导航菜单，直接添加到导航栏
      navbar.appendChild(notionSettingsLink);
      navbar.appendChild(notionWebhookLink);
    }
    
    console.log('✓ 已添加Notion设置入口到导航栏');
  }
  
  // 加载仪表板数据
  function loadDashboardData() {
    // 加载统计数据
    fetch('/api/stats')
      .then(response => response.json())
      .then(data => {
        document.getElementById('post-count').textContent = data.posts;
        document.getElementById('published-count').textContent = data.publishedPosts;
        document.getElementById('draft-count').textContent = data.draftPosts;
        document.getElementById('page-count').textContent = data.pages;
        document.getElementById('category-count').textContent = data.categories;
        document.getElementById('tag-count').textContent = data.tags;
        document.getElementById('word-count').textContent = formatNumber(data.words);
        document.getElementById('last-updated').textContent = data.lastUpdated ? 
          formatDate(new Date(data.lastUpdated)) : '-';
      })
      .catch(error => console.error('加载统计数据失败:', error));
    
    // 加载文章状态
    fetch('/api/post-status')
      .then(response => response.json())
      .then(data => {
        const publishedBar = document.getElementById('status-published-bar');
        if (publishedBar) {
          publishedBar.style.width = data.published.percentage + '%';
        }
      })
      .catch(error => console.error('加载文章状态失败:', error));
    
    // 加载最近文章
    fetch('/api/recent-posts')
      .then(response => response.json())
      .then(posts => {
        const postsList = document.getElementById('recent-posts-list');
        if (posts.length === 0) {
          postsList.innerHTML = '<li>暂无文章</li>';
          return;
        }
        
        postsList.innerHTML = posts.map(post => `
          <li class="post-item">
            <div class="post-item-content">
              <a href="/${post.path}" target="_blank" class="post-title">${post.title}</a>
              <div class="post-date">发布于 ${formatDate(new Date(post.date))}</div>
            </div>
            <span class="post-status-badge ${post.draft ? 'status-draft-badge' : 'status-published-badge'}">
              ${post.draft ? '草稿' : '已发布'}
            </span>
          </li>
        `).join('');
      })
      .catch(error => console.error('加载最近文章失败:', error));
  }
  
  // 格式化数字
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  // 格式化日期
  function formatDate(date) {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }
})();
