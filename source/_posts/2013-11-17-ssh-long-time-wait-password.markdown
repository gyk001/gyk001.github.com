title: ssh登录输入密码之前等好久
date: 2013-11-17 03:19:17
updated: 2013-11-17 03:19:17
comments: true
comment: true
categories: 运维管理
tags: ssh
slug: ssh-long-time-wait-password

---

新装的服务器，ssh远程登录时，要等好久才提示输入密码，

不是网速和性能问题，那一定是配置问题了
放狗一搜，原来是`GSSAPIAuthentication`的问题
服务器端启用了GSSAPI，登陆的时候客户端需要对服务器端的IP地址进行反解析，
如果服务器的IP地址没有配置PTR记录，那么就容易在这里卡住了

解决方案关闭`GSSAPIAuthentication`选项

修改服务器端的sshd配置文件：

```bash
	vim /etc/ssh/sshd_config

	# 添加或更改为如下配置
	UseDNS no
	GSSAPIAuthentication no

	# 重启SSH服务
	service sshd restart
```

[https://gist.github.com/gyk001/7510852]()

下面是关于`GSSAPIAuthentication`选项的作用
其实我也没看懂，您自己研究吧:

<!-- more -->

{% blockquote %}
是否允许使用基于 GSSAPI 的用户认证。默认值为"no"。仅用于SSH-2

Specifies whether user authentication based on GSSAPI is allowed. 
The default is “no”. 
Note that this option applies to protocol version 2 only.
{% endblockquote %}





