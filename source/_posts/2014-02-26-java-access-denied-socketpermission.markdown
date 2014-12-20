title: java.net.SocketPermission
date: 2014-02-26 14:03:21
updated: 2014-02-26 14:03:21
comments: true
comment: true
categories: 开发
tags: [Java]
slug: java-access-denied-SocketPermission

---

以Server模式启动Derby服务竟然抛套接字权限异常:
`access denied ("java.net.SocketPermission" "localhost:1527" "listen,resolve")`

解决方案是编辑文件: 
`$JAVA_HOME/jre/lib/security/java.policy`

添加如下规则，问题顺利解决！

	grant {
		permission java.net.SocketPermission "localhost:*", "listen,accept,connect,resolve";

<!-- more -->

完整的错误堆栈如下：

```
➜  db-derby-10.10.1.1-bin  bin/startNetworkServer
Picked up JAVA_TOOL_OPTIONS: -Dfile.encoding=UTF-8
Wed Feb 26 11:56:16 CST 2014 : 已使用基本服务器安全策略安装了 Security Manager。
Wed Feb 26 11:56:16 CST 2014 : access denied ("java.net.SocketPermission" "localhost:1527" "listen,resolve")
java.security.AccessControlException: access denied ("java.net.SocketPermission" "localhost:1527" "listen,resolve")
	at java.security.AccessControlContext.checkPermission(AccessControlContext.java:372)
	at java.security.AccessController.checkPermission(AccessController.java:559)
	at java.lang.SecurityManager.checkPermission(SecurityManager.java:549)
	at java.lang.SecurityManager.checkListen(SecurityManager.java:1134)
	at java.net.ServerSocket.bind(ServerSocket.java:375)
	at java.net.ServerSocket.<init>(ServerSocket.java:237)
	at javax.net.DefaultServerSocketFactory.createServerSocket(ServerSocketFactory.java:231)
	at org.apache.derby.impl.drda.NetworkServerControlImpl.createServerSocket(Unknown Source)
	at org.apache.derby.impl.drda.NetworkServerControlImpl.access$000(Unknown Source)
	at org.apache.derby.impl.drda.NetworkServerControlImpl$1.run(Unknown Source)
	at org.apache.derby.impl.drda.NetworkServerControlImpl$1.run(Unknown Source)
	at java.security.AccessController.doPrivileged(Native Method)
	at org.apache.derby.impl.drda.NetworkServerControlImpl.blockingStart(Unknown Source)
	at org.apache.derby.impl.drda.NetworkServerControlImpl.executeWork(Unknown Source)
	at org.apache.derby.drda.NetworkServerControl.main(Unknown Source)
```

主要参考了[郭宇翔的博客][s]，Tks！

[s]: http://blog.yourtion.com/java-access-denied-socketpermission-solution.html