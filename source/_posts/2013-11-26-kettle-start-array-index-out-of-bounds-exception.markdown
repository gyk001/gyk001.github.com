title: Kettle无法启动
date: 2013-11-26 13:52:37
updated: 2013-11-26 13:52:37
comments: true
comment: true
categories: 工具
tags: [etl,kettle]
slug: kettle-start-array-index-out-of-bounds-exception

---

最近研究ETL，下载了[Kettle 5.0.1](kettle),启动以后语言改成中文，重启。
然后就发现悲剧的无法启动了，
双击应用图标直接关闭，用脚本启动会抛出错误`ArrayIndexOutOfBoundsException`


```shell
➜  data-integration  ./spoon.sh
/Volumes/Work/SoftPkg/data-integration
2013-11-26 13:25:56.032 java[26618:507] [Java CocoaComponent compatibility mode]: Enabled
2013-11-26 13:25:56.032 java[26618:507] [Java CocoaComponent compatibility mode]: Setting timeout for SWT to 0.100000
2013-11-26 13:25:56.077 java[26618:507] *** WARNING: Method userSpaceScaleFactor in class NSView is deprecated on 10.7 and later. It should not be used in new applications. Use convertRectToBacking: instead.
2013-11-26 13:25:56.408 java[26618:507] *** WARNING: Method userSpaceScaleFactor in class NSWindow is deprecated on 10.7 and later. It should not be used in new applications. Use convertRectToBacking: instead.
2013/11/26 13:25:58 - General - ERROR (version 5.0.1-stable, build 1 from 2013-11-15_16-08-58 by buildguy) : Error starting Spoon shell
2013/11/26 13:25:58 - General - ERROR (version 5.0.1-stable, build 1 from 2013-11-15_16-08-58 by buildguy) : java.lang.ArrayIndexOutOfBoundsException: 5
2013/11/26 13:25:58 - General - 	at org.pentaho.di.ui.spoon.dialog.TipsDialog.getTip(TipsDialog.java:199)
2013/11/26 13:25:58 - General - 	at org.pentaho.di.ui.spoon.dialog.TipsDialog.<init>(TipsDialog.java:84)
2013/11/26 13:25:58 - General - 	at org.pentaho.di.ui.spoon.Spoon.start(Spoon.java:7334)
2013/11/26 13:25:58 - General - 	at org.pentaho.di.ui.spoon.Spoon.createContents(Spoon.java:8657)
2013/11/26 13:25:58 - General - 	at org.eclipse.jface.window.Window.create(Window.java:426)
2013/11/26 13:25:58 - General - 	at org.eclipse.jface.window.Window.open(Window.java:785)
2013/11/26 13:25:58 - General - 	at org.pentaho.di.ui.spoon.Spoon.start(Spoon.java:8672)
2013/11/26 13:25:58 - General - 	at org.pentaho.di.ui.spoon.Spoon.main(Spoon.java:625)
2013/11/26 13:25:58 - General - 	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
2013/11/26 13:25:58 - General - 	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:39)
2013/11/26 13:25:58 - General - 	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:25)
2013/11/26 13:25:58 - General - 	at java.lang.reflect.Method.invoke(Method.java:597)
2013/11/26 13:25:58 - General - 	at org.pentaho.commons.launcher.Launcher.main(Launcher.java:134)
stopping
```

<!-- more -->

解决方案：删除主目录下的`.kettle`目录

```shell
➜  ~ git:(master) ✗ rm -rf .kettle
```

删除`.pentaho`目录是没有用的，虽然Kettle已经不叫Kettle了，
 但是配置依然存放在`~/.kettle`目录下面

语言改为中文的正确方法是只改第一个选项(Preferred Language)为中文。

{% qnimg kettle/lang_cfg.png %}
当时就是因为没有仔细看才悲剧的，两个选项分别为首选语言和第二语言的意思，
全部改成中文会因为有些功能组件没有本地化支持而挂掉！

[kettle]:http://community.pentaho.com/index.html#collapseTwo