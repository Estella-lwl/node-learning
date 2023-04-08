// 1.导入HTTP：
const http = require("http");

// 2.创建服务对象：
const server = http.createServer((request, response) => {
  response.setHeader("content-type", "text/html;charset=utf-8"); //解决中文乱码

  /*  使用第二种方式：实例化URL对象
  --注意：new URL的参数如果写死就不能根据用户的访问路径动态作出反应，而会根据写死的路径。
  --所以参数应从回调中取（request.url）。 */
  const { pathname } = new URL(request.url, "http://127.0.0.1");
  console.log("pathname：", pathname, request.url);

  let txt = "";
  const { method } = request;
  console.log("请求方法：", method);

  // 3.根据路径判断：
  if (method === "GET" && pathname === "/login") {
    txt = "登陆页面";
  } else if (method === "GET" && pathname === "/reg") {
    txt = "注册页面";
  } else {
    // 给其他请求（以防不进入判断一直处于等待状态占用资源）：
    txt = "404 NOt Found";
  }
  response.end(txt); // 设置响应体
});

console.log("server", server);

// 3. 启动服务：
server.listen("8080", () => {
  console.log("服务已启动~");
});
