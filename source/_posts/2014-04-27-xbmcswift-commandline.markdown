title: '[译]xbmcswift2命令行'
date: 2014-04-27 00:55:30
updated: 2014-04-27 00:55:30
comments: true
comment: true
categories: 生命在于折腾
tags: [xbmc,python,翻译]
slug: xbmcswift-commandline

---

本文翻译自[官方文档：在命令行运行xbmcswift2][xbmcswift-cmd],可参考[上一篇文章][xbmcswift-installation]准备环境

本文主要内容是在命令行环境调试基于`xbmcswift2`的XBMC插件，重点是不需要XBMC哦

<!-- more -->

## 简介

从命令行运行xbmcswift2时有`create`和`run`两个命令可用，使用`create`命令可以生成XBMC扩展的基本结构和必要文件,
并且会通过几个简单问题完成个性化。`run`命令允许你在命令行环境调试扩展。

执行`xbmcwift2 -h`查看帮助。全部命令下面都会详细的解释

## `create`


创建一个新的扩展，切换到一个你希望放置扩展的目录，执行`xbmcswift2 create`。
然后回答几个问题，现在你应该有一个基本的扩展结构了

## `run`

在命令行执行扩展时，有三种不同的模式：`once`、`interactive`和`crawl`。

也有另外一个可选参数`url`,默认情况下，xbmcswift2会执行根路径(路径`/`),比如`plugin://plugin.video.academicearth/`。
这和XBMC的用户第一次进入扩展时的路径一样。你可以从xbmcswift2的输出中找到路径

参数`-q` 和`-v`增加或者减少日志级别

注意：

为了在命令行里运行，xbmcswift2尝试模拟了部分XBMC的python绑定，像字符串查找这些功能正常。
但是如果一个函数没有实现，xbmcswift2会安静的调用pass避免抛出异常，使插件可以在有限的支持里运行。
这是为什么你在命令行运行时经常看到警告日志

如果你计划使用命令行开发扩展，你应该始终从xbmcswift2导入xbmc模块

	from xbcmswift2 import xbmcgui

xbcmswift2会根据环境导入正确的模块。当运行在XBMC里时会导入实际的模块，
 当在命令行运行是他会导入一个没有错误的模拟模块
    

### once
运行一次扩展然后退出，当可选参数url有值的测试场景很有用

    $ xbmcswift2 run once # you can omit the once argument as it is the default

    ------------------------------------------------------------
     #  Label    Path
    ------------------------------------------------------------
    [0] Subjects (plugin://plugin.video.academicearth/subjects/)
    ------------------------------------------------------------


    $ xbmcswift2 run once plugin://plugin.video.academicearth/subjects/
    ----------------------------------------------------------------------------------------------------------------------------------------------------------
     #   Label                    Path
    ----------------------------------------------------------------------------------------------------------------------------------------------------------
     [ 0] ACT                      (plugin://plugin.video.academicearth/subjects/http%3A%2F%2Fwww.academicearth.org%2Fsubjects%2Fact/)
     [ 1] Accounting               (plugin://plugin.video.academicearth/subjects/http%3A%2F%2Fwww.academicearth.org%2Fsubjects%2Faccounting/)
     [ 2] Algebra                  (plugin://plugin.video.academicearth/subjects/http%3A%2F%2Fwww.academicearth.org%2Fsubjects%2Falgebra/)
     [ 3] Anthropology             (plugin://plugin.video.academicearth/subjects/http%3A%2F%2Fwww.academicearth.org%2Fsubjects%2Fanthropology/)
     [ 4] Applied CompSci          (plugin://plugin.video.academicearth/subjects/http%3A%2F%2Fwww.academicearth.org%2Fsubjects%2Fapplied-computer-science/)
     ...


### interactive

允许用户使用交互是会话单步调试他们的扩展。这意味着模仿一个基本的XBMC的用户界面，点击一个列表界面，
会进入一个新的列表，每次列表显示完成后会提示用户选择一个选项，除了初始目录，其他都会有`..`选项用于回到上一层目录

    $ xbmcswift2 run interactive
    ------------------------------------------------------------
     #  Label    Path
    ------------------------------------------------------------
    [0] Subjects (plugin://plugin.video.academicearth/subjects/)
    ------------------------------------------------------------
    Choose an item or "q" to quit: 0

    ----------------------------------------------------------------------------------------------------------------------------------------------------------
     #   Label                    Path
    ----------------------------------------------------------------------------------------------------------------------------------------------------------
    [ 0] ..                       (plugin://plugin.video.academicearth/)
    [ 1] ACT                      (plugin://plugin.video.academicearth/subjects/http%3A%2F%2Fwww.academicearth.org%2Fsubjects%2Fact/)
    [ 2] Accounting               (plugin://plugin.video.academicearth/subjects/http%3A%2F%2Fwww.academicearth.org%2Fsubjects%2Faccounting/)
    [ 3] Algebra                  (plugin://plugin.video.academicearth/subjects/http%3A%2F%2Fwww.academicearth.org%2Fsubjects%2Falgebra/)
    [ 4] Anthropology             (plugin://plugin.video.academicearth/subjects/http%3A%2F%2Fwww.academicearth.org%2Fsubjects%2Fanthropology/)
    ----------------------------------------------------------------------------------------------------------------------------------------------------------
    Choose an item or "q" to quit: 1

    -----------------------------------------------------------------------------------------------------------------------------------------------
     #  Label                   Path
    -----------------------------------------------------------------------------------------------------------------------------------------------
    [0] ..                      (plugin://plugin.video.academicearth/subjects/)
    [1] ACT - Science Test Prep (plugin://plugin.video.academicearth/courses/http%3A%2F%2Fwww.academicearth.org%2Fcourses%2Fact-science-test-prep/)
    -----------------------------------------------------------------------------------------------------------------------------------------------


### crawl

用来抓取扩展里的每一个有效的路径，每个请求之间会提示用户按回车键继续

    $ xbmcswift2 run crawl 2>/dev/null
    ------------------------------------------------------------
     #  Label    Path
    ------------------------------------------------------------
    [0] Subjects (plugin://plugin.video.academicearth/subjects/)
    ------------------------------------------------------------
    Enter to continue or "q" to quit
    ----------------------------------------------------------------------------------------------------------------------------------------------------------
     #   Label                    Path
    ----------------------------------------------------------------------------------------------------------------------------------------------------------
    [ 0] ACT                      (plugin://plugin.video.academicearth/subjects/http%3A%2F%2Fwww.academicearth.org%2Fsubjects%2Fact/)
    [ 1] Accounting               (plugin://plugin.video.academicearth/subjects/http%3A%2F%2Fwww.academicearth.org%2Fsubjects%2Faccounting/)
    [ 2] Algebra                  (plugin://plugin.video.academicearth/subjects/http%3A%2F%2Fwww.academicearth.org%2Fsubjects%2Falgebra/)
    [ 3] Anthropology             (plugin://plugin.video.academicearth/subjects/http%3A%2F%2Fwww.academicearth.org%2Fsubjects%2Fanthropology/)
    [ 4] Applied CompSci          (plugin://plugin.video.academicearth/subjects/http%3A%2F%2Fwww.academicearth.org%2Fsubjects%2Fapplied-computer-science/)
    ----------------------------------------------------------------------------------------------------------------------------------------------------------
    Enter to continue or "q" to quit
    -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
     #   Label                                                                                                  Path
    -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    [ 0] A Cultural and Scientific Survey of the Eye and Vision                                                 (plugin://plugin.video.academicearth/courses/http%3A%2F%2Fwww.academicearth.org%2Fcourses%2Fa-cultural-and-scientific-survey-of-the-eye-and-vision/)
    [ 1] Autism and Related Disorders                                                                           (plugin://plugin.video.academicearth/courses/http%3A%2F%2Fwww.academicearth.org%2Fcourses%2Fautism-and-related-disorders/)
    [ 2] Biology                                                                                                (plugin://plugin.video.academicearth/courses/http%3A%2F%2Fwww.academicearth.org%2Fcourses%2Fbiology/)
    [ 3] Core Science - Biochemistry I                                                                          (plugin://plugin.video.academicearth/courses/http%3A%2F%2Fwww.academicearth.org%2Fcourses%2Fcore-science---biochemistry-i/)
    [ 4] Darwin's Legacy                                                                                        (plugin://plugin.video.academicearth/courses/http%3A%2F%2Fwww.academicearth.org%2Fcourses%2Fdarwins-legacy/)
    -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    Enter to continue or "q" to quit


[xbmcswift-cmd]:http://www.xbmcswift.com/en/latest/commandline.html#commandline
[xbmcswift-installation]:/post/xbmcswift-installation