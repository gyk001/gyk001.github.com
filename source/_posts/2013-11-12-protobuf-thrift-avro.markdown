title: 跨语言通信方案比较
date: 2013-11-12 23:33:31
updated: 2013-11-12 23:33:31
comments: true
comment: true
categories: 
tags: [protobuf,thrift,avro]
slug: protobuf-thrift-avro

---

常用的跨语言通信方案：

- 基于SOAP消息格式的WebService
- 基于JSON消息格式的RESTful 服务

以上两种方案的弊端：

- XML体积太大，解析性能极差
- JSON体积相对较小，解析相对较快，但表达能力较弱

于是探索一下现在比较流行的跨语言通信方案：

* Google protobuf (http://code.google.com/p/protobuf)
* Apache Thrift （http://thrift.apache.org/）
* Apache Avro (http://avro.apache.org/)

<!-- more -->

## Google protobuf

Protocol Buffers是Google公司开发的一种数据描述语言
可用于数据存储、通信协议等方面,它不依赖于语言和平台并且可扩展性极强。
现阶段官方支持C++、JAVA、Python等三种编程语言，但可以找到大量的几乎涵盖所有语言的第三方拓展包。
消息格式定义采用proto文件
### 应用
- Google内部
- ...

### 优点
 
* 二进制消息，性能好/效率高（空间和时间效率都很不错）
* proto文件生成目标代码，简单易用
* 序列化反序列化直接对应程序中的数据类，不需要解析后在进行映射(XML,JSON都是这种方式)
* 支持向前兼容（新加字段采用默认值）和向后兼容（忽略新加字段），简化升级
* 支持多种语言（可以把proto文件看做IDL文件）
* Netty等一些框架集成

### 缺点

* 官方只支持C++,JAVA和Python语言绑定
* 二进制可读性差（貌似提供了Text_Fromat功能）
* 二进制不具有自描述特性
* 默认不具备动态特性（可以通过动态定义生成消息类型或者动态编译支持）
* 只涉及序列化和反序列化技术，不涉及RPC功能（类似XML或者JSON的解析器）

## Apache Thrift 
Thrift是Facebook实现的一种高效的、支持多种编程语言的远程服务调用的框架，
现在已经转到Apache组织下，提供数据序列化的功能和RPC服务能力。
支持 C++, Java, Python, PHP, Ruby, Erlang, Perl, Haskell, C#, Cocoa, Smalltalk 等语言
消息格式定义采用thrift文件
### 应用

- Facebook的开源的日志收集系统(scribe: https://github.com/facebook/scribe)
- 淘宝的实时数据传输平台(TimeTunnel http://code.taobao.org/p/TimeTunnel/wiki/index)
- Evernote开放接口(https://github.com/evernote/evernote-thrift)
- Quora(http://www.quora.com/Apache-Thrift)
- HBase( http://abloz.com/hbase/book.html#thrift )
- ...

### 优点

* 支持非常多的语言绑定
* thrift文件生成目标代码，简单易用
* 消息定义文件支持注释
* 数据结构与传输表现的分离，支持多种消息格式
* 包含完整的客户端/服务端堆栈，可快速实现RPC
* 支持同步和异步通信

### 缺点

* 和protobuf一样不支持动态特性

## Apache Avro

Avro出自Hadoop之父Doug Cutting, 
目标是推出标准性的云计算的数据交换和存储的Protocol
支持 C, C++, Java, Python, Ruby, PHP
消息格式定义采用JSON描述

### 应用
- Hadoop RPC （http://hadoop.apache.org/#What+Is+Apache+Hadoop%3F）

### 优点

* 二进制消息，性能好/效率高
* 使用JSON描述模式
* 模式和数据统一存储，消息自描述，不需要生成stub代码（支持生成IDL）
* RPC调用在握手阶段交换模式定义
* 包含完整的客户端/服务端堆栈，可快速实现RPC
* 支持同步和异步通信
* 支持动态消息
* 模式定义允许定义数据的排序（序列化时会遵循这个顺序）
* 提供了基于Jetty内核的服务基于Netty的服务

### 缺点

* 只支持Avro自己的序列化格式
* 语言绑定不如Thrift丰富
