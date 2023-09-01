# mysql数据库笔记

## 数据库能干什么🎄

1. 持久化存储数据
2. 备份和恢复数据
3. 快速的存取数据
4. 权限控制

### 存储方式

根据数据存储可分为 `内存存储` 和 `硬盘存储`

## 数据库的类型🎇

### 关系型数据库

#### 特点

​	1：以表和表的关联构成的数据结构

#### 优点

1. 数据持久化存储在硬盘中，能够备份和恢复
2. 能够表达复杂的数据关系
3. 强大的查询语言，能精确查找想要的数据

#### 缺点

1. 针对数据量大的情况，读写性能差
2. 数据结构比较固定

#### 用途

1. 用于存储一些固定的数据，比如文章内容，文章数据等
2. 存储结构复杂·的数据

#### 代表

1. Oracle
2. Mysql
3. SqlServer

### 非关系型数据库

#### 特点

1. 简单的结构存储数据
2. 文档型存储
3. 键值对 `key` `value` 

#### 优点

1. 存储在内存当中，读取数据快
2. 格式灵活

#### 缺点

1. 不能持久化存储数据
2. 对复杂的数据查询效率不好

#### 用途

1. 存储结构简单的数据

#### 代表

1. redis
2. MongDB
3. Membase 

## 数据库的术语🎉

1. DB ： database 数据库
2. DBA  :  database administrator (数据库管理员)
3. DBMS : databasae management system(数据库系统管理员)
4. DBS : database System （数据库系统）

## 数据库的操作

### 主键

​	表中的主键，代表唯一的值，不允许出现重复。

### 外键

​	通常用于关联另外一张表的字段

### 增删改查

#### 增

```sql
-- INSERT INTO `test`.`user` (id,name,age)VALUES(1,"张三" , '18')

-- 带有 default sql  INSERT INTO `test`.`user` (id,name,age)VALUES(2,"小金" ,default) 

INSERT INTO `test`.`user` (id,name,age)VALUES(3,"小金" ,default),(4,"小刘" ,default)
```

#### 删

```sql
DELETE FROM `user` WHERE id = 1
```

#### 改

```sql
update user set age = 18 where id = 3
```

#### 查

```sql
select * from user where id = 1 // 条件查询

select name as n from user // 别名

SELECT case when sex = 1 THEN "男" else '女' end as sex from user4

select * from user where id in （1 , 2）

SELECT * from `user` WHERE  age is null // 查询age为 null 的

select * from  user where name like '%鱼%'

select * from user where name like '张%' and id = 1

select * from  user ORDER BY id ASC 
```



### like的用法

`like %A%`

查询关于A字符的所有记录

```sql
select * from  user where name like '%A%'
```

`like %A`

查询以A`结尾`的相关记录

```sql
select * from  user where name like '%A'
```

`like A%`

查询以A%`开头`的相关记录

```sql
select * from  user where name like 'A%'
```

`like A_`
 查询 所有 以A开头的并且是两个字的记录

```sql
select * from  user where name like 'A_'
```

![1693557736311](./assets/1693557736311.png)

![1693557764344](./assets/1693557764344.png)

### 升序降序查询

**运行时机** 

>运行在 from 之后 

#### 升序

~~~sql
select * from  user ORDER BY id ASC // 按照id 进行升序排列
~~~

#### 降序

~~~sql
select * from  user ORDER BY id desc // 按照id降序
~~~

#### 多条件排序

多个`降序` or `升序` 条件 

​	当A条件 满足排序是 且条件结果一致时，可以根据 `order by` ,追加排序条件

~~~sql
select * from user order by sex asc, counter desc // 按照 sex 性别进行升序 然后 按照 每个人的 counter降序 处理结果
~~~

