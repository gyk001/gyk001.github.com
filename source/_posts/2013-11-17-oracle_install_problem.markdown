title: Oracle安装常见问题
date: 2013-11-17 06:10:24
updated: 2013-11-17 06:10:24
comments: true
comment: true
categories: 运维管理 
tags: [oracle,linux]
slug: oracle_install_problem

---


## 1. 安装时卡在加载界面

* 英文界面显示:`loading setup driver`
* 中文界面显示:`设置加载驱动程序`

解决方案:
  在`/etc/hosts`添加本机IP和主机名映射

## 2. 安装界面中文乱码
 
* 方案一： 用英文环境安装
 ```bash
 export LANG=en_US.UTF-8 
 ./runInstaller
 ```
<!-- more -->
* 方案二:上传配置中文字体
 此方案太过麻烦，需要的请自行Google

* 方案二:指定已有的jdk进行安装
  本方案个人认为是最完美且最简单的，操作如下：
  ```bash
  ./runInstaller  -jreLoc=/opt/jdk/jdk7
  ```

## 3. 安装过程中报调用makefile的目标install时出错
 错误如下:
 {% qnimg oracle/make_error.jpg title:安装时报make错误 alt:安装时报make错误 %}

 解决办法是安装c++的兼容包:
 ```bash
 yum install compat-libstdc++-33
 ```

