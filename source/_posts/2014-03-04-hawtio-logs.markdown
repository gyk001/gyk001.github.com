title: hawtio日志插件
date: 2014-03-04 11:56:32
updated: 2014-03-04 11:56:32
comments: true
comment: true
categories: 开发
tags: [hawtio,log,log4j]
slug: hawtio-logs

---

hawtio是一个开箱即用Java程序监控组件，有很多非常吸引人的特性：
比如轻量级、非侵入式、插件丰富、扩展性强、基于HTML5的实时Web监控等等。
大部分情况下会运行于OSGI容器或者ESB环境中，当然设计上并不依赖OSGI容器，
也可以通过独立Java应用或者Web容器运行。

[Logs插件][hawtio-logs]加载不出来，去爬[源代码里help][gh-logs]才解决了：
{% qnimg hawtio/logs.jpg %}

帮助里是这么描述的：
<!-- more -->

> If you have no Logs tab in hawtio, then
>
>	* if you are in OSGi it means you are not running either the [insight-log bundle](https://github.com/fusesource/fuse/tree/master/insight/insight-log)
> 	* if you are outside of OSGi it means you have not added the [insight-log4j jar](https://github.com/fusesource/fuse/tree/master/insight/insight-log4j) to your hawtio web app or you have not properly initialised the insight-log4j jar to then initialise the LogQuery mbean

我的应用是一个独立Java程序，而且没有使用OSGI，所以应该参考第二中情况：
首先在pom中添加依赖`insight-log4j`，并且要把我之前用的日志是slf4j+logback，先排除掉logback

```xml
<dependency>
    <groupId>org.fusesource.insight</groupId>
    <artifactId>insight-log4j</artifactId>
    <version>7.1.0.fuse-047</version>
</dependency>
```

然后重启程序，刷新界面，空欢喜！

继续爬，忘记了一个关键的地方，忘记注册MBean了：

```xml
<bean id="logQuery" class="org.fusesource.insight.log.log4j.Log4jLogQuery"
    lazy-init="false" scope="singleton"
    init-method="start" destroy-method="stop"/>
```

当然我的程序不能通过这种方式来加载，那就换成代码咯：

```java
Log4jLogQuery log4jLogQuery = new Log4jLogQuery();
log4jLogQuery.start();
```	

重启程序，刷新界面，漂亮的日志标签页，OK，收工！


话说hawtio的文档尤其是插件部分写的不够详细，
很多都只描述了在FuseESB或者Web容器里如何启动，
对独立Java程序启动的方式基本忽略了（也许只有我自己这么用？）。

PS：我对log4j感觉不太好，
改天写个Logback的桥接，再换回我可爱的Logback！


[gh-logs]: https://github.com/hawtio/hawtio/blob/master/hawtio-web/src/main/webapp/app/log/doc/help.md
[hawtio-logs]: http://hawt.io/plugins/logs/index.html
