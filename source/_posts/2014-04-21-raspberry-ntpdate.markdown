title: 树莓派矫正日期时间
date: 2014-04-21 23:47:35
updated: 2014-04-21 23:47:35
comments: true
comment: true
categories: 生命在于折腾
tags: 树莓派
slug: raspberry-ntpdate

---

树莓派没有硬件时钟，每次重启时间都会重置。改吧没什么必要，不改看着又实在难受，
尤其是把小派改造成xbmc媒体中心以后，界面上的时钟不对总是有一种穿越的感觉。

索性配置成每次启动时自动进行NTP校时，步骤如下：

<!--more-->

1. 安装ntp，输入

		sudo apt-get install ntpdate
	

2. 输入如下命令修改时区，按提示选择就好

		tzselect

4. 测试网络校时，输入

		sudo ntpdate cn.pool.ntp.org

5. 输入`date`，保证时间校对正常

6. 配置开机自动校时
	添加`sudo ntpdate cn.pool.ntp.org`到`/etc/rc.local`文件
	图中前面几句不用管，那是我挂的迅雷离线下载脚本
	{% qnimg pi/ntp-auto.jpg %}

 


参考文章：http://blog.csdn.net/rk2900/article/details/8660730

