# The Web App Manifest学习笔记

今天无意中发现日志中有百度蜘蛛的请求：

```http
220.181.108.168 - www.arkuu.com [18/Sep/2019:10:03:30 +0800] "GET /site.webmanifest HTTP/1.1" 404 7325 "-" "Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)" "-"
```

然后我，就GOOGLE了一下。为什么百度蜘蛛会请求这个/site.webmanifest.能及了解一下site.webmanifest是什么？如何用？

特记录下来。

### site.webmanifest是什么

它是一种实验性的技术，在生产版本中使用之前，必须要先了解浏览器情况。支持情况。

浏览器的兼容情况，请参见：

https://developer.mozilla.org/en-US/docs/Web/Manifest#Browser_compatibility
web app manifest是一系列PWAS（渐近式WEB APP）技术的其中之一，它可以使WEB站点不需要app store，就能够安装在用户的手机主屏幕，而且不是简单的添加书签或主屏幕的链接规则。PWAS能被下载，或离线浏览，像正常WEB应用一样。

它是以json文件的方式，提供WEB应用程序的一些详细信息，对于WEB应用来说，一些必须的下载，提供用户类似原生应用的体验(安装到主屏幕，提供用户快速访问和丰富的体验)，PWAS webmaniest提供一些要的比如名字，作者，图标，版本，描述等一系列资源。

### site.webmanifest全貌是什么子

```json
{
  "name": "阿酷技术学习",
  "short_name": "阿酷技术",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#fff",
  "description": "阿酷边学习边记录",
  "icons": [{
    "src": "images/touch/homescreen48.png",
    "sizes": "48x48",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen72.png",
    "sizes": "72x72",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen96.png",
    "sizes": "96x96",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen144.png",
    "sizes": "144x144",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen168.png",
    "sizes": "168x168",
    "type": "image/png"
  }, {
    "src": "images/touch/homescreen192.png",
    "sizes": "192x192",
    "type": "image/png"
  }],
  "related_applications": [{
    "platform": "play",
    "url": "https://play.google.com/store/apps/details?id=arkuu.com"
  }]
}
```



### 如何使用site.webmanifest

在我们的web站中这样写：

```html
<link rel="manifest" href="/site.webmanifest">
```

修改nginx mime.types 添加：

```typescript
application/manifest+json             webmanifest;
```

修改nginx server 添加：

```nginx
 location = /site.webmanifest {
      root   /usr/share/nginx/html/arkuu;
      allow all;
      log_not_found off;
      access_log off;
    }
```

这样就可以访问到：https://www.arkuu.com/site.webmanifest

### site.webmanifest细节

short_name 或name

必须提供其一，如果同时提供，short_name将用于用户的主屏幕、启动程序或其他空间可能有限的地方。名称在app安装提示中使用。

"short_name": "阿酷技术",
"name": "阿酷技术学习"
icons

当用户添加你的站点到他的手机主屏幕，你能够定义一系列的图标为浏览器所用。像主屏幕图标，启动，任务切换，启动画面等。。icon是一个数组，其中每个对象包括src,sizes,type

```json
"icons": [
  {
    "src": "/images/icons-192.png",
    "type": "image/png",
    "sizes": "192x192"
  },
  {
    "src": "/images/icons-512.png",
    "type": "image/png",
    "sizes": "512x512"
  }
]
```

包括一个192x192像素的图标和一个512x512像素的图标。Chrome将自动缩放设备图标。如果你喜欢缩放你自己的图标，并调整它们的像素完美，提供48dp的图标增量。

```
start_url
```

当用户启动app时请求的URL，无论用户添加主屏幕时的URL是什么，都以此url启动。

```
background_color
```

当用户首次启动画面时启动画面背影颜色。

```
display
```

定制浏览器启动样式，可以隐藏地址栏，工具栏，像游戏一样你可以全屏。

```
fullscreen	Opens the web application without any browser UI and takes up the entirety of the available display area.
standalone	Opens the web app to look and feel like a standalone native app. The app runs in its own window, separate from the browser, and hides standard browser UI elements like the URL bar, etc.
minimal-ui	This mode is similar to fullscreen, but provides the user with some means to access a minimal set of UI elements for controlling navigation (i.e., back, forward, reload, etc).
Note: Only supported by Chrome on mobile.
browser	A standard browser experience.
orientation
```

启动以后显示方向，有以下几个可选：

```
any
natural
landscape
landscape-primary
landscape-secondary
portrait
portrait-primary
portrait-secondary
scope
```

以后慢慢道来

本文参考：

https://developer.mozilla.org/en-US/docs/Web/Manifest

https://developers.google.com/web/fundamentals/web-app-manifest/


