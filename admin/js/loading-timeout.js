
// 添加加载超时处理
document.addEventListener('DOMContentLoaded', function() {
  // 查找所有loading元素
  var markLoadingTimeout = function() {
    var loadingEls = document.querySelectorAll('.loading');
    loadingEls.forEach(function(el) {
      if (!el._loadingStartTime) {
        el._loadingStartTime = Date.now();
      } else if (Date.now() - el._loadingStartTime > 10000) {
        // 10秒后标记为超时
        el.classList.add('timeout');
      }
    });
  };
  
  // 每2秒检查一次
  setInterval(markLoadingTimeout, 2000);
});