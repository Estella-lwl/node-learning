const http = require("http");
const fs = require("fs");
const path = require("path");
const mimes = {
  html: "text/html",
  css: "text/css",
  js: "text/javascript",
  png: "image.png",
  json: "application/json",
};

const server = http.createServer((request, response) => {
  // 405的错误可以从一开始就做出判断
  if (request.method !== "GET") {
    response.statusCode = 405;
    response.end("<h1> 405 Method Not Allowed </h1>");
    return; //一定要加return，否则下面执行又有end方法。
  }

  // 获取每个请求的请求路径：
  const { pathname } = new URL(request.url, "http://127.0.0.1");
  // if判断改进版：
  // 1.拼接路径
  const filePath = __dirname + "/page" + pathname;
  // 2.使用fs异步读取文件：
  fs.readFile(filePath, (err, data) => {
    console.log("相关数据：", filePath);

    if (err) {
      // 设置字符集：
      response.setHeader("content-type", "text/html;charset=utf-8");
      // 判断错误类型：
      console.log("err: ", err);

      // 以下状态信息在node文档中可查：
      switch (err.code) {
        case "ENOENT":
          response.statusCode = 404;
          response.end("<h1> pages not found </h1>");
        case "EPERM":
          response.statusCode = 403;
          response.end("<h1> 403 forbidden </h1>");
        default:
          response.statusCode = 500;
          response.end("<h1> Internal Server Error </h1>");
      }

      response.statusCode = 500;
      response.end("文件读取失败");
      return; //防止代码继续往后执行可能还会有end就会出问题。
    }

    // 获取文件后缀
    const ext = path.extname(pathname).slice(1); // 获取文件后缀名
    // 获取content-type类型
    const type = mimes[ext];
    if (type) {
      //匹配到：
      response.setHeader("content-type", type + ";charset=utf-8");
    } else {
      //未匹配到：
      response.setHeader("content-type", "application/octet-stream");
    }
    response.end(data);
  });
});

server.listen(8080, () => {
  console.log("服务启动成功~");
});
