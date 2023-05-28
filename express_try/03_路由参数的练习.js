const express = require("express");
const fs = require("fs");
const app = express();

// 1.引入json文件
const { singers } = require("./singers.json");

app.get("/:id.html", (req, res) => {
  res.setHeader("content-type", "text/html;charset=utf-8");

  // 2. 获取路由参数
  const id = req.params.id;
  // 3. 根据id参数查找对应数据 =》使用 find
  let result = singers.find((item) => {
    console.log("当前", item);
    return item.id == id;
  });
  console.log("查找结果: ", result);
  // 4.新建html文件，将结果显示出来。
  // 5.读取文件：
  const content = fs.readFileSync(__dirname + "/singer.html");
  // 6.动态设置显示内容：

  // 7.错误拦截：当没有当前歌手信息 =》直接返回404
  if (!result) {
    res.statusCode = 404;
  }

  res.end("当前歌手信息", content);
});

app.listen(8080, () => {
  console.log("8080端口服务已启动...");
});
