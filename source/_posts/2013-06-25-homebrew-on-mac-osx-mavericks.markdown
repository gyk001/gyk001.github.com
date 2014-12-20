---

title: Homebrew在10.9 Mavericks上的问题
date: 2013-06-25 23:09:24
updated: 2013-11-20 23:09:24
comments: true
comment: true
categories: 工具
tags: [Homebrew,Mac, mavericks]
slug: homebrew-on-mac-osx-mavericks

---

注意：Homebrew的更新非常迅速，10.9发布正式版以后就没有任何兼容性问题了
系统升级到最新，Homebrew升级到最新就OK

```bash
➜  ~ git:(source) ✗ brew update
```

所以现在已经没有必要看下面的内容了

-----

升级控杯具的发现系统升级到10.9以后Homebrew竟然不能使用了，
看了官方的[issue][]已经添加了对10.9的支持，但是我的确实不能用。
做为一个brew的重度依赖者，这个必须一定是要想办法解决掉的呀!!!

仔细看了一遍[issue][]，发现人家解决的是10.9和Xcode 5的问题，
而我的Xcode还是4.6没有升级，所以应该跟这个有关系。
然后又查了一遍`brew doctor`的检查结果，有以下几点

- 系统版本10.9不是正式版
- Xcode版本4.6太低，要我安装5.0
- Command Line Tools未安装

<!-- more -->
这次就简单了，没有Command Line Tools没法编译安装，
当然Homebrew就要罢工了,解决方案就是安装CLT嘛。

不过想的简单，下载了[Command Line Tools (OS X Mountain Lion) for Xcode - April 2013][clt46]安装，
结果刚双击一下就悲剧了

```
This package can only be installed on OS X 10.8
```

原因很简单，这个只能在10.8上安装，10.9
需要安装Xcode 5及其配套的Command Line Tools

话说那个Xcode 5.0不是我不想装，实在是我还没给苹果交开发者那几十美刀的费用,
所以他不让我下载呀:(

看来只能投机取巧了，10.9不让装，那我就在10.8上装。

`sudo vim /System/Library/CoreServices/SystemVersion.plist`

```xml
<key>ProductUserVisibleVersion</key>
<string>10.8</string>
<key>ProductVersion</key>
<string>10.8</string>
```

然后直接双击安装下载的软件包，通过了:)

安装完成后再改回去就OK了


[issue]:https://github.com/mxcl/homebrew/issues/20401
[clt46]:http://adcdownload.apple.com/Developer_Tools/command_line_tools_os_x_mountain_lion_for_xcode__april_2013/xcode462_cltools_10_86938259a.dmg

