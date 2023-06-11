const express = require("express");
const app = express();

// 情景：需要动态匹配时，不可能将每个id值对应的路由规则都写出来。
// 解决：传参的位置使用占位符
app.get("/:id.html", (req, res) => {
  req.setHeader("content-type", "text/html;charset=utf-8");
  // 获取路由参数：
  console.log("id值", req.params.id); // 要与占位符里一致。

  res.end("商品详情");
});

app.listen(8080, () => {
  console.log("8080端口服务已启动...");
});
