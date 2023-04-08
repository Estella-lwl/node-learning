// 1.引入http模块
const http = require("http");

// 2.创建服务对象
const server = http.createServer((request, response) => {
  // 设置响应体：
  response.end("HTTP Server Here!");
});

// 3. 监听端口 & 启动服务
server.listen(8080, () => {
  console.log("启动成功");
});
