// 简化的本地Analytics脚本 - 避免外部请求
(function() {
    'use strict';
    
    // 简单的页面访问跟踪
    function trackPageView() {
        // 收集基本的页面信息
        const data = {
            page: window.location.pathname,
            title: document.title,
            referrer: document.referrer,
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
            language: navigator.language,
            screen: screen.width + 'x' + screen.height
        };
        
        // 存储到本地存储（开发环境下可以查看）
        try {
            const visits = JSON.parse(localStorage.getItem('local_analytics') || '[]');
            visits.push(data);
            
            // 只保留最近100条记录
            if (visits.length > 100) {
                visits.splice(0, visits.length - 100);
            }
            
            localStorage.setItem('local_analytics', JSON.stringify(visits));
            
            // 在控制台输出（仅开发环境）
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.log('Local Analytics:', data);
            }
        } catch (e) {
            // 静默处理存储错误
        }
    }
    
    // 页面加载完成后跟踪
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', trackPageView);
    } else {
        trackPageView();
    }
    
    // 模拟gtag函数，防止错误
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
        // 在开发环境下记录调用
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('gtag called:', arguments);
        }
    };
    
})(); 