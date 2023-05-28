const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.get("/home", (req, res) => {
  // 1.获取 url 和 IP：
  const { url, ip } = req;
  // 2. 同步追加文件内容： -参数1.文件路径；-参数2.文件内容。
  fs.appendFileSync(path.resolve(__dirname, "request.log"), `${url} ${ip}\r\n`);
  res.send("前台首页");
});

app.get("/page1", (req, res) => {
  // 1.获取 url 和 IP：
  const { url, ip } = req;
  // 2. 同步追加文件内容： -参数1.文件路径；-参数2.文件内容。
  fs.appendFileSync(path.resolve(__dirname, "request.log"), `${url} ${ip}\r\n`);
  res.send("页面1");
});

app.listen(3000, () => {
  console.log("服务已经启动~端口3000正在监听中...");
});
