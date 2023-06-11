const express = require("express");
const app = express();

// 使用静态资源中间件
app.use(express.static(__dirname + "/static_folder"));

// 设置路由
app.get("/", (req, res) => {
  // 设置响应体
  res.send("这里才是首页");
});

app.listen(3000, () => {
  console.log("3000端口正在监听中...");
});
