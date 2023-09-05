## ORM框架🎃

[官方文档](https://sequelize.org/docs/v6/core-concepts/model-basics/)

**1 ： Object Relational Mapping （对象关系映射）**

**作用**

1. 通过`ORM`框架，可以自动的把程序中的对象和数据库进行关联，更方便管理
2. `ORM`框架会隐藏具体的数据库底层细节，让开发者使用同样的数据库操作接口，完全对不同的数据库操作

**优势**

1. 开发者不需要关心数据库，只需要关心自己定义的`model`即可生成数据库表字段
2. 可轻易的完成数据库的移植
3. 无需拼接复杂的sql语句即可完成精确查询功能
4. 连接各个数据库，统一内部操作数据，不需要手动写sql，简单高效，可维护性高



![1693878830911](D:/%E8%87%AA%E5%AE%9A%E4%B9%89%E5%BA%93/xiaozhangclassmater.github.io/docs/web/sql/assets/1693878830911.png)

![1693879182567](D:/%E8%87%AA%E5%AE%9A%E4%B9%89%E5%BA%93/xiaozhangclassmater.github.io/docs/web/sql/assets/1693879182567.png)