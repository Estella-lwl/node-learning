const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
  // 借助fs模块将文件读出来：
  const table = fs.readFileSync(__dirname + "/node04-响应体练习.html");
  // 设置自定义响应体：
  response.end(table);
});

server.listen(8080, () => {
  console.log("80端口服务已启动~");
});
