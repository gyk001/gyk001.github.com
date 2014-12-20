title: CentOS 6安装Oracle 11g R2
date: 2013-11-17 05:19:22
updated: 2013-11-17 05:19:22
comments: true
comment: true
categories: 
tags: 
slug: install_oracle_11gr2_on_centos6

---

建立用户及用户组：

```bash
[root@centos]~# groupadd oinstall
[root@centos]~# groupadd dba
[root@centos]~# useradd -g oinstall -G dba oracle
[root@centos]~# passwd oracle
更改用户 oracle 的密码 。
新的 密码：
无效的密码： 它基于字典单词
无效的密码： 过于简单
重新输入新的 密码：
passwd： 所有的身份验证令牌已经成功更新。
[root@centos]~#
[root@centos]~# vim /etc/sysctl.conf
[root@centos]~# vim /etc/security/limits.conf

[root@centos]~# vim /etc/pam.d/login

[root@centos]~# vim /etc/profile

[root@centos]~# mkdir -p /opt/u01
[root@centos]~# chown -R oracle:oinstall /opt/u01
[root@centos]~# chmod -R 755  /opt/u01
[root@centos]~#
[root@centos]~# vim /home/oracle/.bash_profile

[oracle@centos database]$ ./runInstaller   -jreLoc /opt/jdk/jdk7
正在启动 Oracle Universal Installer...

检查临时空间: 必须大于 120 MB。   实际为 2524 MB    通过
检查交换空间: 可用的交换空间为 0 MB, 所需的交换空间为 150 MB。    未通过 <<<<
检查监视器: 监视器配置至少必须显示 256 种颜色。    实际为 16777216    通过

未通过某些要求检查。必须先满足这些 要求,

然后才能继续安装,

是否继续? (y/n) [n] y


>>> 忽略未通过的必需先决条件。继续...
准备从以下地址启动 Oracle Universal Installer /tmp/OraInstall2013-11-17_05-46-50PM. 请稍候...[oracle@centos database]$

```