const express = require("express");
const app = express();

app.get("/other-response", (req, res) => {
  // res.redirect("https://taobao.com");
  // res.download(__dirname + "/singers.json");
  // res.json({
  //   name: "test",
  //   slogan: "test test test",
  // });
  res.sendFile(__dirname + "/singer.html");
});

app.listen(3000, () => {
  console.log("服务已经启动~端口3000正在监听中...");
});
