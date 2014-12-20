title: Windows下RabbitMQ集群步骤
date: 2013-11-22 14:46:58
updated: 2013-11-22 14:46:58
comments: true
comment: true
categories: 运维管理
tags: [rabbitmq,windows,集群]
slug: rabbitmq-cluster-on-windows

---

项目需要RabbitMQ集群环境，服务器只有Windows，
环境为64位Windows Server 2008，RabbitMQ版本为3.1.5
集群为两个mq结点，磁盘结点和内存结点各一个。
Linux搭建集群没什么难度，直接安装官网的操作就可以顺利搞定，
Windows就比较麻烦，故经过一番摸索终于搭建成功，记录一下步骤。

## 安装RabbitMQ

1. 下载Erlang安装包:
   地址:[http://www.erlang.org/download/otp_win64_R16B02.exe]()
1. 下载RabbitMQ安装包:
   地址:[http://www.rabbitmq.com/releases/rabbitmq-server/v3.1.5/rabbitmq-server-3.1.5.exe]()
1. 安装Erlang到D:\Deploy\ERL
1. 安装RabbitMQ到D:\Deploy\RabbitMQ
  * 安装时**取消勾选**安装为服务：`RabbitMQ Service`
   {% qnimg mqcluster/install_without_service.png title:安装界面不选安装为服务 alt:安装界面不选安装为服务 %}<!-- more -->
  * 如果忘记取消勾选，安装完成时按如下操作：
   【开始菜单】->【所有程序】->【RabbitMQ Server】->【RabbitMQ Service - remove】	
  	{%qnimg mqcluster/remove_mq_service.png title:删除MQ服务  alt:删除MQ服务 %}
1. 建立RabbitMQ配置文件夹目录
	```
	cd %APPDATA%
	mkdir RabbitMQ
	```
1. 配置系统环境变量`RABBITMQ_BASE`为`D:\Data\rabbit`
1. 下载配置文件放到`D:\Data\rabbit`目录下
	* 插件配置：[enabled_plugins](http://gyk001.u.qiniudn.com/blog/mqcluster/enabled_plugins)
	* 节点配置: [rabbitmq.config](doc/config/rabbitmq.config)
1. 修改ErLang的cookie
	* 编辑 `C:\Users\Administrator\.erlang.cookie`
	* 编辑之前先去掉只读属性，如文件不存在手动新建
	* 内容随意(如`wspt-guoyukun-2013`)，保证两台windows上的一致即可
	* 编辑完成以后再**恢复**只读属性的勾选状态
	
1. 测试mq启动：
	* 双击`D:\Deploy\RabbitMQ\rabbitmq-server.3.1.5\sbin\rabbitmq-server`
	* 浏览器查看是否正常。地址：http://localhost:15672 ， 用户名密码：guest/guest
	* 查看目录`D:\Data\rabbit`内是否正常生成`db`和`log`文件夹

## RabbitMQ集群搭建
1. 确认**两台**机器的RabbitMQ都已安装好，且 **正在运行**
1. 搭建集群(此操作只需要在一台机器上进行)	
	````plain
	D:\Deploy\RabbitMQ\rabbitmq-server-3.1.5\sbn> rabbitmqctl.bat stop_app
	Stopping node rabbit@DEMOAPP1 ...
	... done.

	D:\Deploy\RabbitMQ\rabbitmq-server-3.1.5\sbn> rabbitmqctl.bat reset
	Resetting node rabbit@DEMOAPP1 ...
	... done.

	D:\Deploy\RabbitMQ\rabbitmq-server-3.1.5\sbn> rabbitmqctl.bat join_cluster rabbit@DEMOAPP2 --ram
	Clustering node rabbit@DEMOAPP1 with rabbit@DEMOAPP2 ...
	... done.

	D:\Deploy\RabbitMQ\rabbitmq-server-3.1.5\sbn> rabbitmqctl.bat start_app
	Starting node rabbit@DEMOAPP1 ...
	... done.
	````
1. 查看集群是否正常
	
	{% qnimg mqcluster/cluster_check.png title:查看集群是否正常 alt:查看集群是否正常 %}

1. 修改配置文件`D:\Data\rabbit\rabbitmq.config`
	* 在`tcp_listeners`行后添加一行`cluster_nodes`(注意两行之间有个`,`)
	* 将`rabbit@`后面的部分换成州市两台应用的主机名，如：
	```
	[
	    {mnesia, [{dump_log_write_threshold, 1000}]},
	    {rabbit, [
			{tcp_listeners, [5673]},
			{cluster_nodes,{['rabbit@DEMOAPP1','rabbit@DEMOAPP2'],ram}}
	    ]}
	].
	```
    * 行尾的`,ram`在运行集群命令的机器才有，另一台没有，如
    ```
	[
	    {mnesia, [{dump_log_write_threshold, 1000}]},
	    {rabbit, [
			{tcp_listeners, [5673]},
			{cluster_nodes,{['rabbit@DEMOAPP1','rabbit@DEMOAPP2']}}
	    ]}
	].
	```
1. 测试配置文件正确性
  
  两台机器都关闭正在运行的RabbitMQ，然后重新运行一下，
  * 正常运行说明配置文件正确
  * 运行出错需要重新检查配置文件

1. ~~安装为服务(加载配置有问题，暂不做)~~

## 常见错误

* `ERROR: ode with name "rabbit" already running on ...`
  此错误是由于RabbitMQ已经启动，需要停止相关的服务或关闭`rabbitmq-server.bat`的运行窗口
  
  {%qnimg mqcluster/err_already_running.png title:错误信息：节点已经启动！ alt:错误信息：节点已经启动！ %}

* `Node  thinks it's clusterred with node ,but disagrees`
  此错误由于RabbitMQ集群缓存不一致
  需要删除目录两台机器的`D:\Data\rabbit\db`目录后重新启动MQ
  
  {%qnimg mqcluster/err_cluster_disagrees.png alt:错误信息：节点不同意集群！ title:错误信息：节点不同意集群！ %}
  
 

