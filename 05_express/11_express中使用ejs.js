const express = require("express");
const app = express();
const path = require("path");

// 1.设置模板引擎：  (除ejs模板引擎，还有pug、twing)
app.set("view engine", "ejs");
// 2.设置模板引擎的存放路径：  (模板文件：具有模板语法的内容文件，比如之前练习中的html文件)
app.set("views", path.resolve(__dirname, "./views")); //（转为绝对路径）

// 创建home路由
app.get("/home", (req, res) => {
  // 3.通过render做出响应： (接收两个参数：1.模板的文件名；2.模板的数据)
  const data = "this is data";
  res.render("home", { data });

  // 4.在views文件夹中新建对应的文件（ejs后缀）
});

app.listen(3000, () => {
  console.log("服务已经启动~端口3000正在监听中...");
});
