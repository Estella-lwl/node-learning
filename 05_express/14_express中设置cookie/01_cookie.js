const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

// 创建路由规则
app.get("/set-cookie", (req, res) => {
  res.cookie("name", "LiHua");
  res.send("设置 cookie");
});

app.get("/remove-cookie", (req, res) => {
  res.clearCookie("name");
  res.send("删除 cookie");
});

app.get("/get-cookie", (req, res) => {
  console.log("获取", req.cookies);
  res.send("获取 cookie");
});

app.listen(3009);
