// 调试脚本 - 捕获和显示JavaScript错误
(function() {
    'use strict';
    
    // 只在开发环境下启用
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        return;
    }
    
    // 错误收集器
    const errors = [];
    
    // 捕获全局错误
    window.addEventListener('error', function(e) {
        const error = {
            type: 'JavaScript Error',
            message: e.message,
            filename: e.filename,
            lineno: e.lineno,
            colno: e.colno,
            timestamp: new Date().toISOString()
        };
        
        errors.push(error);
        console.error('捕获到错误:', error);
        showErrorNotification(error);
    });
    
    // 捕获Promise错误
    window.addEventListener('unhandledrejection', function(e) {
        const error = {
            type: 'Promise Rejection',
            message: e.reason ? e.reason.toString() : 'Unknown Promise Error',
            timestamp: new Date().toISOString()
        };
        
        errors.push(error);
        console.error('捕获到Promise错误:', error);
        showErrorNotification(error);
    });
    
    // 显示错误通知
    function showErrorNotification(error) {
        // 创建错误通知元素
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4444;
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            z-index: 10000;
            font-family: monospace;
            font-size: 12px;
            max-width: 400px;
            word-wrap: break-word;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        `;
        
        notification.innerHTML = `
            <strong>${error.type}</strong><br>
            ${error.message}<br>
            <small>${error.filename}:${error.lineno}</small>
            <button onclick="this.parentElement.remove()" style="float: right; background: none; border: none; color: white; cursor: pointer;">×</button>
        `;
        
        document.body.appendChild(notification);
        
        // 5秒后自动消失
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
    
    // 在控制台输出调试信息
    console.log('Debug script loaded. Errors will be captured and displayed.');
    
    // 提供全局函数来查看所有错误
    window.getErrors = function() {
        return errors;
    };
    
    // 清除错误历史
    window.clearErrors = function() {
        errors.length = 0;
        console.log('Error history cleared.');
    };
    
})(); 