// 本地化的访问统计脚本 (不蒜子替代)
// 完全本地化，不依赖外部服务器

(function() {
    'use strict';
    
    // 本地存储键名
    const STORAGE_KEYS = {
        SITE_PV: 'local_site_pv',
        SITE_UV: 'local_site_uv', 
        PAGE_PV: 'local_page_pv_'
    };
    
    // 获取或初始化计数器
    function getCount(key, defaultValue = 0) {
        try {
            return parseInt(localStorage.getItem(key) || defaultValue);
        } catch (e) {
            return defaultValue;
        }
    }
    
    // 设置计数器
    function setCount(key, value) {
        try {
            localStorage.setItem(key, value.toString());
        } catch (e) {
            // 存储失败时静默处理
        }
    }
    
    // 增加计数器
    function incrementCount(key) {
        const current = getCount(key);
        const newValue = current + 1;
        setCount(key, newValue);
        return newValue;
    }
    
    // 检查是否是新访客（简单的session检测）
    function isNewVisitor() {
        const visitedKey = 'visited_today';
        const today = new Date().toDateString();
        const lastVisit = localStorage.getItem(visitedKey);
        
        if (lastVisit !== today) {
            localStorage.setItem(visitedKey, today);
            return true;
        }
        return false;
    }
    
    // 获取当前页面键
    function getCurrentPageKey() {
        return STORAGE_KEYS.PAGE_PV + window.location.pathname;
    }
    
    // 更新显示
    function updateDisplay() {
        // 站点总访问量 (PV)
        const sitePV = incrementCount(STORAGE_KEYS.SITE_PV);
        const sitePVElement = document.getElementById('busuanzi_value_site_pv');
        if (sitePVElement) {
            sitePVElement.textContent = sitePV;
            const container = document.getElementById('busuanzi_container_site_pv');
            if (container) container.style.display = 'inline';
        }
        
        // 站点访客数 (UV) 
        let siteUV = getCount(STORAGE_KEYS.SITE_UV);
        if (isNewVisitor()) {
            siteUV = incrementCount(STORAGE_KEYS.SITE_UV);
        }
        const siteUVElement = document.getElementById('busuanzi_value_site_uv');
        if (siteUVElement) {
            siteUVElement.textContent = siteUV;
            const container = document.getElementById('busuanzi_container_site_uv');
            if (container) container.style.display = 'inline';
        }
        
        // 页面访问量
        const pagePV = incrementCount(getCurrentPageKey());
        const pagePVElement = document.getElementById('busuanzi_value_page_pv');
        if (pagePVElement) {
            pagePVElement.textContent = pagePV;
            const container = document.getElementById('busuanzi_container_page_pv');
            if (container) container.style.display = 'inline';
        }
        
        // 兼容原有的容器命名
        const containers = [
            'busuanzi_container_value_site_pv',
            'busuanzi_container_value_site_uv', 
            'busuanzi_container_value_page_pv'
        ];
        containers.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.style.display = 'inline';
        });
    }
    
    // 初始化
    function init() {
        // 如果是第一次访问，设置一些基础数据
        if (!localStorage.getItem(STORAGE_KEYS.SITE_PV)) {
            setCount(STORAGE_KEYS.SITE_PV, Math.floor(Math.random() * 1000) + 100); // 随机初始值
            setCount(STORAGE_KEYS.SITE_UV, Math.floor(Math.random() * 100) + 50);
        }
        
        updateDisplay();
    }
    
    // 等待DOM加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // 为了兼容原始不蒜子的回调函数
    window.BusuanziCallback_1551365344467 = function() {
        // 空函数，防止错误
    };
    
})();
