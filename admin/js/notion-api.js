/**
 * Notion API前端接口
 * 用于管理后台与Notion API交互
 */

class NotionApi {
  constructor() {
    this.baseUrl = '/admin-api';
  }

  /**
   * 获取Notion设置
   */
  async getSettings() {
    try {
      const response = await fetch(`${this.baseUrl}/notion/settings`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || '获取设置失败');
      }
      
      return data.settings;
    } catch (error) {
      console.error('获取Notion设置失败:', error);
      throw error;
    }
  }

  /**
   * 保存Notion设置
   */
  async saveSettings(settings) {
    try {
      const response = await fetch(`${this.baseUrl}/notion/settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || '保存设置失败');
      }
      
      return data;
    } catch (error) {
      console.error('保存Notion设置失败:', error);
      throw error;
    }
  }

  /**
   * 测试Notion连接
   */
  async testConnection(apiKey, databaseId) {
    try {
      const response = await fetch(`${this.baseUrl}/notion/test-connection`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ apiKey, databaseId })
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || '连接测试失败');
      }
      
      return data;
    } catch (error) {
      console.error('测试Notion连接失败:', error);
      throw error;
    }
  }

  /**
   * 同步Notion数据
   */
  async syncData(type = 'incremental') {
    try {
      const response = await fetch(`${this.baseUrl}/notion/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type })
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || '同步数据失败');
      }
      
      return data;
    } catch (error) {
      console.error('同步Notion数据失败:', error);
      throw error;
    }
  }

  /**
   * 获取同步状态
   */
  async getSyncStatus() {
    try {
      const response = await fetch(`${this.baseUrl}/notion/sync-status`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || '获取同步状态失败');
      }
      
      return data.status;
    } catch (error) {
      console.error('获取同步状态失败:', error);
      throw error;
    }
  }

  /**
   * 获取Notion数据库信息
   */
  async getDatabaseInfo(databaseId) {
    try {
      const response = await fetch(`${this.baseUrl}/notion/database-info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ databaseId })
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || '获取数据库信息失败');
      }
      
      return data.database;
    } catch (error) {
      console.error('获取Notion数据库信息失败:', error);
      throw error;
    }
  }

  /**
   * 获取Notion页面列表
   */
  async getPages(options = {}) {
    try {
      const response = await fetch(`${this.baseUrl}/notion/pages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(options)
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || '获取页面列表失败');
      }
      
      return data.pages;
    } catch (error) {
      console.error('获取Notion页面列表失败:', error);
      throw error;
    }
  }

  /**
   * 获取Notion页面内容
   */
  async getPageContent(pageId) {
    try {
      const response = await fetch(`${this.baseUrl}/notion/page-content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pageId })
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || '获取页面内容失败');
      }
      
      return data.content;
    } catch (error) {
      console.error('获取Notion页面内容失败:', error);
      throw error;
    }
  }

  /**
   * 创建Notion页面
   */
  async createPage(properties, content) {
    try {
      const response = await fetch(`${this.baseUrl}/notion/create-page`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ properties, content })
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || '创建页面失败');
      }
      
      return data.page;
    } catch (error) {
      console.error('创建Notion页面失败:', error);
      throw error;
    }
  }

  /**
   * 更新Notion页面
   */
  async updatePage(pageId, properties, content) {
    try {
      const response = await fetch(`${this.baseUrl}/notion/update-page`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pageId, properties, content })
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || '更新页面失败');
      }
      
      return data.page;
    } catch (error) {
      console.error('更新Notion页面失败:', error);
      throw error;
    }
  }
}

// 导出实例
window.notionApi = new NotionApi(); 