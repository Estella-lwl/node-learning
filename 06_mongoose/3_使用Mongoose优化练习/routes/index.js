var express = require("express");
var router = express.Router();
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const mongoose = require("mongoose");

const shortid = require("shortid");
const moment = require("moment");
const BillingModel = require("../models/BillingModel");
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
  // const billing = db.get("billing").value();
  // 读取数据库billing的billings集合 & 渲染
  BillingModel.find()
    .sort({ time: -1 })
    .exec()
    .then((data) => {
      res.render("listPage", { billings: data });
    });
});

// // 列表
// router.get("/billing/list", (req, res, next) => {
//   res.render("listPage");
// });

// 显示新增页
router.get("/billing/add", (req, res, next) => {
  res.render("addPage");
});

// 处理新增记录
router.post("/billing", (req, res, next) => {
  console.log("请求体", {
    ...req.body,
    time: moment(req.body.time).toDate(),
  });
  // 插入数据库：
  BillingModel.create({
    ...req.body,
    // 修改time属性的值为日期对象的格式
    time: moment(req.body.time).toDate(),
  })
    .then(() => {
      res.render("success", { msg: "success!! 🎉", url: "/billing" });
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).send("新增失败", err);
      return;
    });
});

// 删除记录
router.get("/billing/:id", (req, res) => {
  let id = req.params.id; // 获取params参数
  db.get("billing").remove({ id: id }).write(); // 删除
  res.render("success", { msg: "删除成功!! ", url: "/billing" }); // 设置提醒
});

module.exports = router;
