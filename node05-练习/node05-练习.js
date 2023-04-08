const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
  // 获取每个请求的请求路径：
  const { pathname } = new URL(request.url, "http://127.0.0.1");
  console.log("......", pathname);
  // 根据拿到的路径动态设置...
  if (pathname === "/") {
    // 设置响应体内容：
    const file = fs.readFileSync(__dirname + "/node05-练习.html");
    response.end(file);
  } else if (pathname === "/index.css") {
    const file = fs.readFileSync(__dirname + "/index.css");
    response.end(file);
  } else if (pathname === "/index.js") {
    const file = fs.readFileSync(__dirname + "/index.js");
    response.end(file);
  } else {
    response.statusCode = "404";
    response.end("pages not found");
  }
});

server.listen(8080, () => {
  console.log("服务启动成功~");
});
