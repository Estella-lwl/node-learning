const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// 处理 querystring 格式的请求体：
let urlParser = bodyParser.urlencoded({ extend: false });
// 处理 JSON 格式的请求体：
// let jsonParser = bodyParser.json(); // 未用到

// 使用静态资源中间件
app.use(express.static(__dirname + "/static_folder"));

// 设置路由规则
app.get("/login", (req, res) => {
  // 设置响应体
  res.sendFile(__dirname + "/07_form.html");
});

app.post("/login", urlParser, (req, res) => {
  console.log(req.body); //获取请求体数据
  console.log(req.body.username); // 用户名
  console.log(req.body); // 密码
  res.send("获取请求体数据");
});

app.listen(3000, () => {
  console.log("3000端口正在监听中...");
});
