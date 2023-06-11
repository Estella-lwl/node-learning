// 1.安装 Mongoose
// 2.引入 Mongoose：
const mongoose = require("mongoose");
mongoose.set("strictQuery", true); // 处理警告
// 3.连接 MongoDB 的服务：    （参数是服务的 url，构成：协议名称://ip地址:端口号/数据库名称）
mongoose.connect("mongodb://127.0.0.1/users"); // 端口号默认27017，可以不加；当数据库不存在则自动创建

// 4.设置回调
//  -on设置绑定；open设置打开。
// 此处设置数据库连接成功后的回调：  （once：只执行一次回调）
mongoose.connection.once("open", () => {
  // PS：官方建议使用 once 替换on。
  console.log("成功");

  // 5.定义集合中文档对象的结构 （属性 & 属性值）
  let BookSchema = new mongoose.Schema({
    type: String,
    name: String,
    price: Number,
  });

  // 6.定义模型对象（文档操作的封装对象）
  //  -参数1：要操作的集合名称；参数2：结构对象。
  let BookModel = mongoose.model("books", BookSchema);
  // 7.新增文档 （注意现在使用create要用then回调）
  BookModel.create({
    type: "小说",
    name: "鼠疫",
    price: 19.9,
  })
    .then((err, data) => {
      console.log("结果", err ? err : data);

      // 8.关闭数据库（项目运行中，不会添加这句）
      mongoose.disconnect();
    })
    .catch((err) => {
      console.log("抛出错误");
      throw err;
    });
});

// 此处设置连接错误的回调：
mongoose.connection.on("error", () => {
  console.log("错误");
});

// 此处设置连接关闭的回调：
mongoose.connection.on("close", () => {
  console.log("连接关闭");
});
