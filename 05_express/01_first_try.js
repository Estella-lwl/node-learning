// 1. 引入
const express = require("express");

// 2. 通过express函数创建应用对象
const app = express();

// 3. 创建路由
// 参数一：请求路径
// 参数二：回调函数；它有两个参数：
//   --req: 请求报文的封装对象；
//   --res: 响应报文的封装对象。
app.get("/home", (req, res) => {
  res.end("HTTP Server"); // （与之前写的http服务端类似）作用：当浏览器把请求发送过来后 =》设置响应结果
});

/* 上端代码的解释：
    - get请求指定的路径时（home），就去执行回调。
    - 回调函数内进行逻辑处理，比如这里设置响应结果。
*/

// 4. 监听端口，启动服务
app.listen(3000, () => {
  console.log("服务已经启动~端口3000正在监听中...");
});
