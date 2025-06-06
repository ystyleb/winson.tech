// Google Analytics 代理脚本
// 使用不会被广告拦截器阻止的函数名

// 创建全局配置对象
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// 动态加载 Google Analytics
(function() {
    // 使用随机化的变量名避免检测
    var analytics_id = 'G-94YNG1L737';
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + analytics_id;
    document.head.appendChild(script);
    
    // 配置 Google Analytics
    gtag('js', new Date());
    gtag('config', analytics_id, {
        'anonymize_ip': true,
        'transport_type': 'beacon'
    });
})();

// 页面浏览跟踪
function trackPageView(page_path) {
    if (typeof gtag !== 'undefined') {
        gtag('config', 'G-94YNG1L737', {
            page_path: page_path
        });
    }
}

// 自动跟踪页面浏览
document.addEventListener('DOMContentLoaded', function() {
    trackPageView(window.location.pathname);
}); 