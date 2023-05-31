const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
  res.send("首页");
});

router.get("/search", (req, res) => {
  res.send("搜索");
});

// 先引入了该文件，这里的404匹配导致下一行引入的路由无法正常显示👇🏻
// router.all("*", (req, res) => {
//   res.status(404);
//   res.send("404 Not Found...");
// });

module.exports = router;
