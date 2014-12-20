title: DB2 IMPORT耗时记录
date: 2014-04-24 18:37:01
updated: 2014-04-24 18:37:01
comments: true
comment: true
categories: 运维管理
tags: [DB2,数据迁移]
slug: db2-import-esapsed-time

---

最近操作DB2需要import几张比较大的表，没有专业的DBA，

想估算导入时间也没有经验，所以记下这次的时间供以后参考

导入格式为IXF，COMMITCOUNT设置为自动

完整导入语句如下:


	db2 connect to <DBName>
	db2 "IMPORT FROM <tabXXX>.ixf OF IXF COMMITCOUNT automatic MESSAGES <tabXXX>.msg REPLACE_CREATE INTO <TableName>"


<!--more-->
这种方式导入CPU占用不足10%，内存60%左右，
第三张表竟然导了24个小时以上！实在还有很大的优化余地

不过作为一个二把刀，用的也不多，暂时先不研究了


## 操作环境

* **系统**: CentOS Linux 6.4 x64
* **数据库版本**: V9.5
* **CPU**: Xeon E7- 4807  @ 1.87GHz 6颗4核
* **内存**: 16G


## 操作结果


<!--16:52开始,19:32还没结束-->
<div class="realtab"></div>


|  行数  | 列数 |  大小   |  耗时   |
|------:|----:|--------:|-------:|
| 2543万 |  8  |  5.74 G | 50 min |
|  495万 | 13  |   1.4 G | 19 min |
|  907万 | 66  | 10.66 G | >24  hr |




