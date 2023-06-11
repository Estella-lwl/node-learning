const express = require("express");
const app = express();

app.get("/response", (req, res) => {
  // // 原生响应：
  // res.statusCode = 404; // 设置响应状态码，注意是赋值的形式
  // res.statusMessage = "testing"; // 设置状态状态描述
  // res.write(""); // 设置响应体
  // res.end("response...");  // 也是设置响应体

  // express响应：
  res.status(500); // 设置响应状态码
  res.set("aaa", "bbb"); // 设置响应头
  res.send("hiii Express"); //设置响应体，不会乱码
});

app.listen(3000, () => {
  console.log("服务已经启动~端口3000正在监听中...");
});
