title: 代码库从SVN迁移到Git
date: 2013-06-05 00:24:57
updated: 2013-06-05 00:24:57
comments: true
comment: true
categories: 工具
tags: [SVN,Git]
slug: svn-migrate-git

---

记录一下代码库从SVN迁移到Git的过程，
可以保留所有的提交日志和提交人信息

大体流程如下：

1. 准备一个提交人的对照表
2. 利用`git svn`命令将SVN项目导出为Git项目
3. 检查导出的项目有无问题
4. 给Git项目添加默认远程仓库并推送到远程仓库中

下面给出具体步骤：

原SVN地址为：`https://svn.wspt.guo:8444/ProjectInSVN`

目标Git项目地址：`git@git.wspt.guo:ProjectInGit.git`
<!-- more -->

1. 制作authors.txt,内容为所有提交者的对照表

 ```
 guoyk=guoyukun
 zhangs=zhangsan
 ```

2.

 ```
 git svn clone https://svn.wspt.guo:8444/ProjectInSVN --authors-file=authors.txt --no-metadata ProjectInGit
 ```
 
 `--no-metadata`不会生成提交日志里附加的ID号，清爽一点
 
 该步骤中可能出现  `Author: {XXX} not defined in authors.txt file`

 解决方案为在authors里添加xxx的记录

 如 `XXX = XXXinGit`

 删除 ProjectInGit文件夹，重新执行以上命令

3.

 ```
 cd ProjectInGit
 # 检查日志是否正常
 git log
 # 清理版本库垃圾
 git gc
 ```
   
4.

 ```sh
 git remote add origin git@git.wspt.guo:ProjectInGit.git
 git push -u origin master
 ```