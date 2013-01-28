---
layout: post
title: "MySQL远程无法连接"
date: 2013-01-23 22:51
comments: true
categories: 数据库
tags: [MySQL,CentOS]
description: MySQL无法连接，报错：access denied for user
slug: mysql-access-denied

---

Mysql数据库远程机器无法连接，用户名密码正确依旧出现如下提示：

        access denied for user 'root'@'localhost'(using password:YES)

此问题几乎可以肯定是权限问题，解决方案如下（环境为CentOS 6）：
<!-- more -->


``` ruby 
class Fixnum
  def prime?
    ('1' * self) !~ /^1?$|^(11+?)\1+$/
  end
end
```

