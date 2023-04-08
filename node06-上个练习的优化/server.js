const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
  // 获取每个请求的请求路径：
  const { pathname } = new URL(request.url, "http://127.0.0.1");
  // if判断改进版：
  // 1.拼接路径
  const filePath = __dirname + "/page" + pathname;
  // 2.使用fs异步读取文件：
  fs.readFile(filePath, (err, data) => {
    console.log("相关数据：", filePath, data);

    if (err) {
      response.statusCode = 500;
      response.setHeader("content-type", "text/html;charset=utf-8");
      response.end("文件读取失败");
      return; //防止代码继续往后执行可能还会有end就会出问题。
    }

    response.end(data);
  });
});

server.listen(8080, () => {
  console.log("服务启动成功~");
});
