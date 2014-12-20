title: 投机取巧获取VeryCD页面上所有的ED2K链接地址
date: 2013-11-19 12:43:21
updated: 2013-11-19 12:43:21
comments: true
comment: true
categories: 生活
tags: verycd
slug: get-verycd-all-ed2k-links

---

今天搜索资源找到VeryCD的一个页面，话说自从电驴改版以后一年多没有上过了，
复制选中的链接按钮不知道为神马不好用了，难道是我装了flash屏蔽插件引起的？
不管了，不用就不用，直接暴力解决。
发现verycd上有用jQuery，真是天助我也！
打开浏览器调试窗口，console选项卡，粘贴以下代码,回车,
弹出框上 `command+a` -> `command+c`,
打开迅雷 `新建任务` -> `command+v`,收工
```javascript
urls = '';
$.each($('a[href^=ed2k]'),function(i,aa){
	urls = urls +$(aa).attr('href')+'\n';
});
alert(urls);
```
https://gist.github.com/gyk001/7527953

什么？
链接太多，弹出框太长看不到确定和取消按钮，不知道怎么关闭弹出框？

好吧，我实在不想告诉你我是这么干的：
鼠标点击那一坨链接，TAB键，空格

