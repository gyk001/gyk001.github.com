title: 调解TextExpander和中文输入法的矛盾
date: 2013-11-28 13:21:27
updated: 2013-11-28 13:21:27
comments: true
comment: true
categories: 工具
tags: [Mac,textexpander]
slug: textexpander-cooperate-with-chinese-input-method

---

前几天写过[解决TextExpander解决失灵][te_notwork]的办法,
最近发现失灵的现象相当严重，只要是中文输入法状态下完全没法使用TextExpander进行展开，
人品再好也不能次次都中奖吧，Google了一把原来TE到3.3.4以后就不支持在中文日文等输入法状态下进行展开了，
我刚升级到4.x了，所以中文状态下面TE直接变成了废柴。

TE是名副其实的神器，就这样废掉太可惜了，好在还是有解决方案的。

英文好的可以看[原文][te_ime_solution],懒的直接看下面就OK了

<!-- more -->

{% qnimg textexpander/TEIMPrefSetter.jpg %}

1. 退出TextExpander
1. 启动TEIMPrefSetter
1. 列表里包括TextExpander_不会_展开的语言，选择中文，点击`-`按钮从列表删除中文
1. 点击`Save`按钮保存配置
1. 退出TEIMPrefSetter
1. 启动TextExpander，切换到中文
1. 测试一下下神器复活了！


TEIMPrefSetter下载地址: [本地下载][down_qn] , [原始地址][down_orig]


[down_qn]: http://gyk001.u.qiniudn.com/file/TEIMPrefSetter.zip
[down_orig]: http://smilesoftware.com/downloads/TEIMPrefSetter.zip
[te_notwork]: http://www.guoyukun.cn/post/textexpander-not-work/
[te_ime_solution]:http://smilesoftware.com/blog/entry/textexpander-3.3.4-and-japanese-chinese-etc.-input-methods