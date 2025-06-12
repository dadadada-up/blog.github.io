/**
 * Notion Webhook API端点
 * 用于接收来自Notion的Webhook请求
 */

// 导入依赖
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const util = require('util');

// 转换为Promise API
const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);
const exists = util.promisify(fs.exists);
const readFile = util.promisify(fs.readFile);

// 日志配置
const LOG_DIR = path.join(process.cwd(), 'logs');
const LOG_FILE = path.join(LOG_DIR, 'notion-webhook.log');

// 确保日志目录存在
async function ensureLogDir() {
  try {
    if (!(await exists(LOG_DIR))) {
      await mkdir(LOG_DIR, { recursive: true });
    }
  } catch (error) {
    console.error(`创建日志目录失败: ${error.message}`);
  }
}

// 记录日志
async function logMessage(message, level = 'info') {
  await ensureLogDir();
  
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
  
  console.log(`[Notion Webhook] ${message}`);
  
  try {
    await writeFile(LOG_FILE, logEntry, { flag: 'a' });
  } catch (error) {
    console.error(`写入日志失败: ${error.message}`);
  }
}

// 加载配置
async function loadConfig() {
  try {
    const configPath = path.join(process.cwd(), '_config.notion.yml');
    if (await exists(configPath)) {
      const content = await readFile(configPath, 'utf8');
      return require('js-yaml').load(content);
    }
    return null;
  } catch (error) {
    await logMessage(`加载配置失败: ${error.message}`, 'error');
    return null;
  }
}

// 验证请求签名
async function verifySignature(body, signature, secret) {
  if (!secret) {
    await logMessage('未配置Webhook密钥，跳过验证', 'warn');
    return true;
  }
  
  if (!signature) {
    await logMessage('请求中没有签名', 'warn');
    return false;
  }
  
  try {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(typeof body === 'string' ? body : JSON.stringify(body));
    const calculatedSignature = hmac.digest('hex');
    
    return signature === calculatedSignature;
  } catch (error) {
    await logMessage(`验证签名时出错: ${error.message}`, 'error');
    return false;
  }
}

// 处理Webhook请求
export default async function handler(req, res) {
  // 只允许POST请求
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: '方法不允许'
    });
  }
  
  try {
    // 记录请求
    await logMessage(`收到Webhook请求: ${req.method} ${req.url}`, 'info');
    
    // 加载配置
    const config = await loadConfig();
    if (!config) {
      return res.status(500).json({
        success: false,
        message: '加载配置失败'
      });
    }
    
    // 获取请求体和签名
    const body = req.body;
    const signature = req.headers['x-notion-signature'];
    
    // 验证签名
    const webhookSecret = config.webhook && config.webhook.secret;
    const isValid = await verifySignature(body, signature, webhookSecret);
    
    if (!isValid) {
      await logMessage('签名验证失败', 'error');
      return res.status(401).json({
        success: false,
        message: '签名验证失败'
      });
    }
    
    // 处理测试请求
    if (req.headers['x-notion-test'] === 'true' || body.test === true) {
      await logMessage('收到测试请求', 'info');
      return res.status(200).json({
        success: true,
        message: '测试请求已成功接收'
      });
    }
    
    // 记录事件详情
    const eventType = body.type;
    await logMessage(`收到事件: ${eventType}`, 'info');
    await logMessage(`事件详情: ${JSON.stringify(body)}`, 'debug');
    
    // 将事件保存到队列中，以便后续处理
    await saveEventToQueue(body);
    
    // 返回成功响应
    return res.status(200).json({
      success: true,
      message: `已接收${eventType}事件，将异步处理`
    });
  } catch (error) {
    await logMessage(`处理Webhook请求失败: ${error.message}`, 'error');
    
    return res.status(500).json({
      success: false,
      message: `处理请求失败: ${error.message}`
    });
  }
}

// 保存事件到队列
async function saveEventToQueue(event) {
  try {
    // 确保队列目录存在
    const queueDir = path.join(process.cwd(), '.notion_queue');
    if (!(await exists(queueDir))) {
      await mkdir(queueDir, { recursive: true });
    }
    
    // 生成唯一文件名
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    const filename = `${timestamp}-${random}.json`;
    
    // 保存事件到文件
    await writeFile(
      path.join(queueDir, filename),
      JSON.stringify(event, null, 2),
      'utf8'
    );
    
    await logMessage(`已将事件保存到队列: ${filename}`, 'info');
    return true;
  } catch (error) {
    await logMessage(`保存事件到队列失败: ${error.message}`, 'error');
    return false;
  }
} 