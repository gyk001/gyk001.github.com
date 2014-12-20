title: ServiceMix打包feature报错NoSuchMethodError
date: 2014-02-25 17:04:14
updated: 2014-02-25 17:04:14
comments: true
comment: true
categories: 开发
tags: [ServiceMix,Maven]
slug: features-maven-plugin-NoSuchMethodError

---

ServiceMix打包feature时报了个莫名其妙的错误，google一把原来是maven的bug，
好在3.0.5以后就修复了，果断换成新版本，问题解决。
```
[ERROR] Failed to execute goal org.apache.karaf.tooling:features-maven-plugin:2.2.5:generate-features-file (validate) 
on project feature.protocol: 
Execution validate of goal org.apache.karaf.tooling:features-maven-plugin:2.2.5:generate-features-file failed:
 An API incompatibility was encountered while executing org.apache.karaf.tooling:features-maven-plugin:2.2.5:generate-features-file:
  java.lang.NoSuchMethodError: org.apache.maven.artifact.metadata.ArtifactMetadataRetrievalException: method <init>(Ljava/lang/String;)V not found
```

详见maven的issue

http://jira.codehaus.org/browse/MNG-5233
