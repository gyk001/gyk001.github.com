title: Linux下SQLPlus支持历史记录的工具rlwrap
date: 2013-11-20 10:29:31
updated: 2013-11-20 10:29:31
comments: true
comment: true
categories: 工具
tags: [Linux,sqlplus,rlwrap]
slug: linux-sqlplus-history-with-rlwrap

---

众所周知，Linux下面的SQLPlus不支持上下键历史记录，左右键移动光标，
作为一个命令行工具来说，Linux版竟然不如Windows版好用，真是悲哀 




## 神器`rlwrap`出场。

这个工具其实是一个`readline`的包装库，可以使任意命令支持`readline`风格的输入，
上下键翻阅历史记录，左右键移动光标，`ctrl+a`移动行首，`ctrl+e`移动行尾等等，
如欲了解详细，请移步官网 [http://utopia.knoware.nl/~hlub/uck/rlwrap/#rlwrap]()

命令控对于`readline`是再熟悉不过了，吸引力当然也是不在话下

嫌下面啰嗦的直接看Gist:[https://gist.github.com/gyk001/7557096]()

<!-- more -->

## 安装
yum库里没有，采用源码编译安装.
要先安装`readline`和`readline`的开发包
然后就是常规的编译安装了
```bash
[root@centos]~# yum install readline readline-devel
[root@centos]~# wget http://utopia.knoware.nl/~hlub/uck/rlwrap/rlwrap-0.37.tar.gz
[root@centos]~# tar -xzvf rlwrap-0.37.tar.gz
[root@centos]~# cd rlwrap-0.37
[root@centos]~/rlwrap-0.37# ./configure
[root@centos]~/rlwrap-0.37# make && make install
[root@centos]~/rlwrap-0.37# #测试一下，有如下输出说明安装成功
[root@centos]~/rlwrap-0.37# /usr/local/bin/rlwrap
Usage: rlwrap [options] command ...

Options:
  -a[password:]              --always-readline[=password:]
  -A                         --ansi-colour-aware
  -b  <chars>                --break-chars=<chars>
  -c                         --complete-filenames
  -C  <name|N>               --command-name=<name|N>
  -D  <0|1|2>                --history-no-dupes=<0|1|2>
  -f  <completion list>      --file=<completion list>
  -g  <regexp>               --forget-matching=<regexp>
  -h                         --help
  -H  <file>                 --history-filename=<file>
  -i                         --case-insensitive
  -I                         --pass-sigint-as-sigterm
  -l  <file>                 --logfile=<file>
  -n                         --no-warnings
  -N                         --no-children
  -o                         --one-shot
  -O  <regexp>               --only-cook=<regexp>
  -p[colour]                 --prompt-colour[=colour]
  -P  <input>                --pre-given=<input>
  -q  <chars>                --quote-characters=<chars>
  -m[newline substitute]     --multi-line[=newline substitute]
  -r                         --remember
  -R                         --renice
  -v                         --version
  -s  <N>                    --histsize=<N> (negative: readonly)
  -S  <prompt>               --substitute-prompt=<prompt>
  -t  <name>                 --set-term-name=<name>
  -w  <N>                    --wait-before-prompt=<N> (msec, <0  : patient mode)
  -z  <filter command>       --filter=<filter command>

bug reports, suggestions, updates:
http://utopia.knoware.nl/~hlub/uck/rlwrap/
[root@centos]~/rlwrap-0.37#
```
## 使用
源码安装默认安装到这里`/usr/local/bin/rlwrap`，
部分系统或者用户下面此路径不包括在PATH变量，可以修改变量，我就直接用绝对路径引用了
下面是使用方法，以SQLPlus这个奇葩为例:

```bash
[oracle@centos ~]$ alias sqlplus='/usr/local/bin/rlwrap sqlplus'
[oracle@centos ~]$ sqlplus /nolog

SQL*Plus: Release 11.2.0.1.0 Production on Wed Nov 20 09:52:40 2013

Copyright (c) 1982, 2009, Oracle.  All rights reserved.

SQL> conn / as sysdba
Connected to an idle instance.
SQL> <上下键/左右键/各种键开始readline之旅吧..>
```

如果没有意外的话就可以把别名绑定添加`.bashrc`里了
从此一劳永逸...





