var express = require("express");
var router = express.Router();
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync(__dirname + "/../data/db.json"); // 存放数据

const db = low(adapter); // 获取db对象

// /* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

// 记账
router.get("/billing", (req, res, next) => {
  res.render("listPage");
});

// // 列表
// router.get("/billing/list", (req, res, next) => {
//   res.render("listPage");
// });

// 添加
router.get("/billing/add", (req, res, next) => {
  res.render("addPage");
});

// 新增记录
router.post("/billing", (req, res, next) => {
  // 获取请求提数据：
  console.log("请求体数据", req.body);

  // 写入文件：(请求体就是表单填入的数据)
  db.get("billing").push(req.body).write();

  res.send("addPage");
});

module.exports = router;
