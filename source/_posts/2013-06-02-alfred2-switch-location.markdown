---
title: Alfred2切换网络位置插件,支持中文
date: 2013-06-02 14:13:55
updated: 2013-06-12 17:04:55
comments: true
comment: true
categories: 开发
tags: [Alfred,Mac]
slug: "alfred2-switch-location"

---

{% limg switch_list.jpg %}

因为经常在公司、家里和机房这几个地方换来换去，
基本都是静态IP而且网络配置比如网段什么的都不一样，所以每次都要手动切换网络位置。

Alfred 升级到版本2了，发现新版本的Workflow开发功能貌似非常强悍，
所以就花了时间研究了一下，写了一个快速切换网络位置的插件，效果如上图 。

虽然我真心认为Mac比Windowns好多了，可以原生支持保存多个不同的网络位置，
但是每次都要经历四个操作步骤也够麻烦的：[设置]->[网络]->[位置]->[应用]
。网上找了几个插件都不支持中文的位置名称，所以动手写了这个插件。

<!-- more -->

话说我这个图标是直接盗用的Mac系统AirPort实用工具里的图片，不过好丑:(

准备再写一篇文章说说关于Alfred2的Workflow插件开发，
因为没有找到API之类的文档，全是自己猜出来的

下面是插件包下载链接和插件源代码的项目地址：

[插件首页](http://www.guoyukun.cn/switch-network-location/)

[插件项目地址（GitHub）](https://github.com/gyk001/alfred-switch-network-location)

对了，没有RMB又需要PowerPack破解的朋友放狗找吧，貌似关键字`alfred2`第一条结果就好使







