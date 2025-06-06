// Google Analytics 代理脚本 - 避免被广告拦截器直接阻止
(function() {
    'use strict';
    
    // Google Analytics 配置
    const GA_ID = 'G-94YNG1L737';
    
    // 创建全局 dataLayer
    window.dataLayer = window.dataLayer || [];
    
    // gtag 函数
    function gtag() {
        dataLayer.push(arguments);
    }
    
    // 将 gtag 暴露到全局
    window.gtag = gtag;
    
    // 延迟加载 Google Analytics 脚本
    function loadGoogleAnalytics() {
        // 创建脚本元素
        const script = document.createElement('script');
        script.async = true;
        
        // 使用随机参数和延迟加载避免直接检测
        const timestamp = Date.now();
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}&t=${timestamp}`;
        
        // 错误处理
        script.onerror = function() {
            console.warn('Google Analytics script failed to load, using local fallback');
            // 如果加载失败，使用本地统计
            initLocalAnalytics();
        };
        
        script.onload = function() {
            // GA 脚本加载成功后初始化
            gtag('js', new Date());
            gtag('config', GA_ID, {
                'anonymize_ip': true,
                'transport_type': 'beacon'
            });
            
            console.log('Google Analytics loaded successfully');
        };
        
        // 添加到文档头部
        document.head.appendChild(script);
    }
    
    // 本地统计备用方案
    function initLocalAnalytics() {
        const data = {
            page: window.location.pathname,
            title: document.title,
            referrer: document.referrer,
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
            language: navigator.language
        };
        
        try {
            const visits = JSON.parse(localStorage.getItem('local_analytics') || '[]');
            visits.push(data);
            
            if (visits.length > 100) {
                visits.splice(0, visits.length - 100);
            }
            
            localStorage.setItem('local_analytics', JSON.stringify(visits));
            console.log('Local Analytics fallback active:', data);
        } catch (e) {
            console.warn('Local analytics storage failed:', e);
        }
    }
    
    // 检测是否应该加载 GA
    function shouldLoadGA() {
        // 检查 DNT (Do Not Track)
        const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
        if (dnt === '1' || dnt === 'yes') {
            return false;
        }
        
        // 检查是否在本地开发环境
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Development environment detected, using local analytics');
            return false;
        }
        
        return true;
    }
    
    // 初始化函数
    function init() {
        if (shouldLoadGA()) {
            // 延迟加载 GA，避免被拦截器立即检测
            setTimeout(loadGoogleAnalytics, 1000);
        } else {
            // 使用本地统计
            initLocalAnalytics();
        }
    }
    
    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // 提供手动跟踪函数
    window.trackEvent = function(action, category, label, value) {
        if (typeof gtag === 'function') {
            gtag('event', action, {
                event_category: category,
                event_label: label,
                value: value
            });
        }
    };
    
})(); 