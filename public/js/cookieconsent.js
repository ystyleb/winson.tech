// 简化的Cookie同意脚本 - 避免被广告拦截器阻止
(function() {
    'use strict';
    
    // 检查是否已经同意过
    if (localStorage.getItem('cookieconsent_status') === 'allow') {
        return;
    }
    
    // 创建同意横幅的样式
    const style = document.createElement('style');
    style.textContent = `
        .cc-window {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #1aa3ff;
            color: white;
            padding: 15px;
            z-index: 9999;
            font-family: Arial, sans-serif;
            font-size: 14px;
            box-shadow: 0 -1px 3px rgba(0,0,0,.3);
        }
        .cc-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-width: 1200px;
            margin: 0 auto;
        }
        .cc-message {
            flex: 1;
            margin-right: 20px;
        }
        .cc-btn {
            background: #f0f0f0;
            color: #333;
            border: none;
            padding: 8px 16px;
            border-radius: 3px;
            cursor: pointer;
            font-size: 13px;
            margin-left: 10px;
        }
        .cc-btn:hover {
            background: #e0e0e0;
        }
        @media (max-width: 768px) {
            .cc-content {
                flex-direction: column;
                align-items: flex-start;
            }
            .cc-message {
                margin-right: 0;
                margin-bottom: 10px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // 创建同意横幅HTML
    const banner = document.createElement('div');
    banner.className = 'cc-window';
    banner.innerHTML = `
        <div class="cc-content">
            <div class="cc-message">本网站使用 Cookies 来改善您的浏览体验.</div>
            <div>
                <button class="cc-btn" id="cc-accept">同意</button>
                <button class="cc-btn" id="cc-learn">了解更多</button>
            </div>
        </div>
    `;
    
    // 添加到页面
    document.body.appendChild(banner);
    
    // 处理点击事件
    document.getElementById('cc-accept').onclick = function() {
        localStorage.setItem('cookieconsent_status', 'allow');
        banner.remove();
    };
    
    document.getElementById('cc-learn').onclick = function() {
        window.open('https://cookiesandyou.com/', '_blank');
    };
    
    // 10秒后自动消失（可选）
    setTimeout(function() {
        if (document.body.contains(banner)) {
            localStorage.setItem('cookieconsent_status', 'allow');
            banner.remove();
        }
    }, 10000);
    
})(); 