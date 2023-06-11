const express = require("express");
const app = express();

// 1.写路由中间件函数：
let checkCodeMiddleware = (req, res, next) => {
  if (req.query.code === "6") {
    next(); // next之后才正常执行
  } else {
    res.send("暗号错误");
  }
};

// 2.1 & 3.(调用路由中间件函数)：【设置路由】路由中间件函数的使用稍有不同，要放在受约束的路由中：
app.get("/admin", checkCodeMiddleware, (req, res) => {
  res.send("后台首页");
});

// 2.2【设置路由】
app.get("/setting", checkCodeMiddleware, (req, res) => {
  res.send("设置");
});

// 2.3 & 3.(调用路由中间件函数)： 除了上面两个设置的路由，当访问其他路径时返回404：
app.all("*", checkCodeMiddleware, (req, res) => {
  res.status(404);
  res.send("404 Not Found...");
});

app.listen(3000, () => {
  console.log("服务已经启动~端口3000正在监听中...");
});
