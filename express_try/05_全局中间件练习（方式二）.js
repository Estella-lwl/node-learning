const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

// 1.声明中间件函数：
function middleware(req, res, next) {
  // 2.获取url和ip：
  const { url, ip } = req;
  // 3.文件追加写入：
  fs.appendFileSync(path.resolve(__dirname, "request.log"), `${url} ${ip}\r\n`);
  // 4.调用 next =》使其调用后续的路由回调。
  next();
}

// 5.使用中间件函数：
app.use(middleware);

app.get("/home", (req, res) => {
  res.send("前台首页");
});

app.listen(3000, () => {
  console.log("服务已经启动~端口3000正在监听中...");
});
