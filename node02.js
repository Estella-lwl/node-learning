// 引入http模块
const http = require("http");

// 1. 引入url模块
const url = require("url");

// 创建服务对象
const server = http.createServer((request, response) => {
  // console.log("...", request, response);

  // 2. 解析 request.url
  console.log("解析URL:", request.url);
  let res = url.parse(request.url);

  // 将第二个参数设为true，可以以对象的形式查看：
  let res1 = url.parse(request.url, true);
  // 上一步拿到对象的形式，所以可以获取到具体的查询条件的值👇🏻：
  let keyword = res1.query.keyword;

  console.log("可以拿到某个查询条件的值：", keyword);

  // 路径：
  let pathName = res1.pathname;
  console.log("输出路径", pathName);

  // 查询字符串：
  response.end("url");
});

// 3. 监听端口 & 启动服务
server.listen(8080, () => {
  console.log("启动成功");
});
