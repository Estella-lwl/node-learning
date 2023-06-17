var express = require("express");
var router = express.Router();
const low = require("lowdb");
// import low from "lowdb";
const FileSync = require("lowdb/adapters/FileSync");
// import FileSync from "lowdb/adapters/FileSync";

const shortid = require("shortid");
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "/assets/css")));

const adapter = new FileSync(__dirname + "/../data/db.json"); // 存放数据

const db = low(adapter); // 获取db对象

// /* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

// 记账
router.get("/billing", (req, res, next) => {
  const billing = db.get("billing").value();
  res.render("listPage", { billings: billing });
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
  let id = shortid.generate();

  // 写入文件：(请求体就是表单填入的数据；使用shortid添加了id属性)
  db.get("billing")
    .unshift({ id: id, ...req.body })
    .write();

  res.render("success", { msg: "success!! 🎉", url: "/billing" });
});

// 删除记录
router.get("/billing/:id", (req, res) => {
  let id = req.params.id; // 获取params参数
  db.get("billing").remove({ id: id }).write(); // 删除
  res.render("success", { msg: "删除成功!! ", url: "/billing" }); // 设置提醒
});

module.exports = router;
