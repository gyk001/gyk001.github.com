title: '[译] 安装 XBMC Swift2'
date: 2014-04-26 22:37:23
updated: 2014-04-26 22:37:23
comments: true
comment: true
categories: 生命在于折腾
tags: [xbmc,python,翻译]
slug: xbmcswift-installation

---

这篇文章翻译自[官网安装教程][xbmcswift]，安装插件开发环境
不过官网年久失修，有个小错误，直接照搬还是不行滴，文中有说明

<!--more-->

`xbmcswift2`的目的是使命令行拥有像XBMC一样好的运行扩展插件的能力，这意味着我们需要安装两次`xbmcswift2`，一次安装到命令行，一次安装到XMBC扩展。XBMC上的`xbmcswift2`是一个特殊的版本包，不包括命令行代码和测试，但包括像`addon.xml`这些XBMC必须的文件，获取`xbmcswift2`最新版本的最简单的方法是安装一个依赖`xbmcswift2`的扩展。


你可以在[这里][xbmcswift-powerby]找到这些扩展的列表，
另一个选择是从[xbmcswift代码库][xbmcswift-dist]下载并解压到你的扩展目录里。

现在安装命令行版本的`xbmcswift2`

## 安装`virtualenv`

(一堆关于`virtualenv`的介绍,忽略)

如果你已经安装了`pip`，你可以简单执行下面的命令

    $ sudo pip install virtualenv

或者你安装有`easy_install`

    $ sudo easy_install virtualenv

我也喜欢用一些非常有用的`virtualenv`脚本，所以最好安装`virtualenv-wrapper`
**（这里官网写错了，没有中间的连字符）**

    $ sudo pip install virtualenvwrapper

## 创建虚拟环境

现在我们可以创建`virtualenv`了

    $ mkvirtualenv xbmcswift2

命令完成后，你的提示符前缀应该变成`(xbmcswift2)`了，
新提示符标识现在你在虚拟环境里工作，
我们通过pip安装的任何库都只会在这个环境内生效，
现在我们安装`xbmcswift2`

    $ pip install xbmcswift2

事情发展不错，以后你打算在你的项目上工作时必须执行下面的命令启动虚拟环境

    $ workon xbmcswift2

并且在工作结束后取消激活`virtualenv`

    $ deactivate

环境准备结束，跳转到下一篇：[在命令行运行xbmcswift2][xbmcswift-commandline]


[xbmcswift]:http://www.xbmcswift.com/en/latest/installation.html
[xbmcswift-powerby]:http://www.xbmcswift.com/en/latest/poweredby.html#poweredby
[xbmcswift-dist]:https://github.com/jbeluch/xbmcswift2-xbmc-dist/tags
[xbmcswift-commandline]:/post/xbmcswift-commandline