const express = require("express");
const app = express();

// 1.使用中间件（此处直接用箭头函数）
app.use((req, res, next) => {
  const referer = req.get("referer");
  // 2.当referer请求头存在 =》判断访问来源
  if (referer) {
    // 3.拿到请求来源的 hostname：
    const url = new URL(referer);
    const hostname = url.hostname; // URL对象会提供一些实例属性

    // 4.判断请求是否来自本站
    if (hostname !== "127.0.0.1") {
      // 4.1访问来源不符 =》返回404
      res.status(404).send("404 not_found......");
      return;
    }
  }
  // 4.2来源符合 =》执行next放行
  next();
});

// 使用静态资源中间件：
app.use(express.static(__dirname + "/static_folder"));

app.listen(3000, () => {
  console.log("3000端口正在监听中...");
});
