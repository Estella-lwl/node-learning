// 1.导入HTTP：
const http = require("http");

const url = require("url");

// 2.创建服务对象：
const server = http.createServer((request, response) => {
  response.setHeader("content-type", "text/html;charset=utf-8"); //解决中文乱码

  console.log("url：", request.url);

  let txt = "";
  // TODO: 使用第二种方式写
  const targetUrl = url.parse(request.url);
  console.log("拿到的URL", targetUrl.pathname);

  // 3.根据路径判断：
  if (targetUrl.pathname === "/login") {
    txt = "登陆页面";
  } else {
    txt = "注册页面";
  }
  response.end(txt); // 设置响应体
});

console.log("server", server);

// 3. 启动服务：
server.listen("8080", () => {
  console.log("服务已启动~");
});
