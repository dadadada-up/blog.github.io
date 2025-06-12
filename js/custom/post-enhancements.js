// 文章页面增强脚本
document.addEventListener('DOMContentLoaded', function() {
  // 仅在文章页面执行
  if (!document.querySelector('.post-detail')) return;
  
  // 增强评论区
  enhanceComments();
  
  // 添加分享功能
  addShareButtons();
  
  /**
   * 增强评论区功能
   */
  function enhanceComments() {
    const commentsContainer = document.querySelector('.comments');
    if (!commentsContainer) return;
    
    // 添加评论区标题
    const commentsHeader = document.createElement('div');
    commentsHeader.className = 'comments-header';
    commentsHeader.innerHTML = '<h3>留下您的评论</h3><p>分享您的想法和建议，与其他读者交流。</p>';
    commentsContainer.insertBefore(commentsHeader, commentsContainer.firstChild);
    
    // 监听Gitalk加载完成
    const observer = new MutationObserver(function(mutations) {
      if (document.querySelector('.gt-container')) {
        // Gitalk已加载，可以进行额外的定制
        observer.disconnect();
        
        // 添加评论指南
        const guidelines = document.createElement('div');
        guidelines.className = 'comment-guidelines';
        guidelines.innerHTML = '<p>评论指南：请保持友善和尊重，遵守社区规则。</p>';
        
        const gitalkContainer = document.querySelector('.gt-container');
        gitalkContainer.insertBefore(guidelines, gitalkContainer.firstChild);
      }
    });
    
    observer.observe(commentsContainer, { childList: true, subtree: true });
  }
  
  /**
   * 添加分享按钮
   */
  function addShareButtons() {
    // 检查是否已有分享按钮
    if (document.querySelector('.post-share')) return;
    
    const postMeta = document.querySelector('.post-meta');
    if (!postMeta) return;
    
    // 获取文章信息
    const title = document.querySelector('.post-title').textContent.trim();
    const url = window.location.href;
    
    // 创建分享容器
    const shareContainer = document.createElement('div');
    shareContainer.className = 'post-share';
    
    // 添加分享标题
    shareContainer.innerHTML = '<div class="share-title">分享这篇文章：</div>';
    
    // 添加分享按钮
    const shareButtons = document.createElement('div');
    shareButtons.className = 'share-buttons';
    
    // 微信分享
    const wechatShare = document.createElement('a');
    wechatShare.className = 'share-button wechat';
    wechatShare.innerHTML = '<i class="fab fa-weixin"></i>';
    wechatShare.title = '分享到微信';
    wechatShare.onclick = function(e) {
      e.preventDefault();
      alert('请截图或复制链接分享到微信：' + url);
    };
    
    // 微博分享
    const weiboShare = document.createElement('a');
    weiboShare.className = 'share-button weibo';
    weiboShare.innerHTML = '<i class="fab fa-weibo"></i>';
    weiboShare.title = '分享到微博';
    weiboShare.href = `http://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    weiboShare.target = '_blank';
    
    // Twitter分享
    const twitterShare = document.createElement('a');
    twitterShare.className = 'share-button twitter';
    twitterShare.innerHTML = '<i class="fab fa-twitter"></i>';
    twitterShare.title = '分享到Twitter';
    twitterShare.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    twitterShare.target = '_blank';
    
    // Facebook分享
    const facebookShare = document.createElement('a');
    facebookShare.className = 'share-button facebook';
    facebookShare.innerHTML = '<i class="fab fa-facebook-f"></i>';
    facebookShare.title = '分享到Facebook';
    facebookShare.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    facebookShare.target = '_blank';
    
    // 复制链接
    const copyLink = document.createElement('a');
    copyLink.className = 'share-button copy-link';
    copyLink.innerHTML = '<i class="fas fa-link"></i>';
    copyLink.title = '复制链接';
    copyLink.onclick = function(e) {
      e.preventDefault();
      navigator.clipboard.writeText(url).then(function() {
        alert('链接已复制到剪贴板！');
      });
    };
    
    // 添加按钮到容器
    shareButtons.appendChild(wechatShare);
    shareButtons.appendChild(weiboShare);
    shareButtons.appendChild(twitterShare);
    shareButtons.appendChild(facebookShare);
    shareButtons.appendChild(copyLink);
    
    // 添加按钮容器到分享容器
    shareContainer.appendChild(shareButtons);
    
    // 添加分享容器到文章底部
    const postBody = document.querySelector('.post-body');
    postBody.parentNode.insertBefore(shareContainer, postBody.nextSibling);
    
    // 添加分享按钮样式
    addShareButtonStyles();
  }
  
  /**
   * 添加分享按钮样式
   */
  function addShareButtonStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .post-share {
        margin: 30px 0;
        padding: 15px;
        border-top: 1px solid #eee;
        border-bottom: 1px solid #eee;
      }
      
      .share-title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      
      .share-buttons {
        display: flex;
        gap: 10px;
      }
      
      .share-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        color: #fff;
        transition: all 0.3s ease;
      }
      
      .share-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 3px 8px rgba(0,0,0,0.15);
      }
      
      .share-button.wechat {
        background-color: #2dc100;
      }
      
      .share-button.weibo {
        background-color: #e6162d;
      }
      
      .share-button.twitter {
        background-color: #1da1f2;
      }
      
      .share-button.facebook {
        background-color: #3b5998;
      }
      
      .share-button.copy-link {
        background-color: #333;
      }
      
      .comment-guidelines {
        margin-bottom: 15px;
        padding: 10px;
        background-color: #f8f9fa;
        border-left: 3px solid #37c6c0;
        font-size: 14px;
      }
      
      .comments-header {
        margin-bottom: 20px;
      }
      
      .comments-header h3 {
        font-size: 20px;
        margin-bottom: 5px;
      }
      
      .comments-header p {
        color: #666;
        font-size: 14px;
      }
    `;
    document.head.appendChild(style);
  }
}); 