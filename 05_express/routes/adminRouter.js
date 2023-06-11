const express = require("express");
const router = express.Router();

router.get("/admin", (req, res) => {
  res.send("后台首页");
});

router.get("/setting", (req, res) => {
  res.send("设置");
});

// 要保证404在所有路由规则的最后
router.all("*", (req, res) => {
  res.status(404);
  res.send("404 Not Found...");
});

module.exports = router;
