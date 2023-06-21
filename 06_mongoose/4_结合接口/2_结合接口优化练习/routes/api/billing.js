/**
 * 存放接口
 */
var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const moment = require("moment");
const BillingModel = require("../../models/BillingModel");
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "/assets/css")));

// 获取账单列表
router.get("/billing", (req, res, next) => {
  // const billing = db.get("billing").value();
  // 读取数据库billing的billings集合 & 渲染
  BillingModel.find()
    .sort({ time: -1 })
    .exec()
    .then((data) => {
      // res.render("listPage", { billings: data, moment: moment }); // 注意：ejs文件中使用moment需要先传过去
      res.json({
        code: "0000", //响应编号
        msg: "读取成功", //响应信息
        data: data, // 响应数据
      });
    })
    .catch((err) => {
      res.json({
        code: "1001", //响应编号
        msg: "读取失败", //响应信息
        data: null, // 响应数据
      });
    });
});

// 新增账单记录
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
    .then((data) => {
      // res.render("success", { msg: "success!! 🎉", url: "/billing" });
      res.json({
        code: "0000", //响应编号
        msg: "读取成功", //响应信息
        data: data, // 响应数据
      });
    })
    .catch((err) => {
      // console.log("err", err);
      // res.status(500).send("新增失败", err);
      res.json({
        code: "1002", //响应编号
        msg: "创建失败", //响应信息
        data: null, // 响应数据
      });
      return;
    });
});

// 删除账单记录
router.delete("/billing/:id", (req, res) => {
  let id = req.params.id; // 获取params参数
  // db.get("billing").remove({ id: id }).write(); // 删除(lowdb的方式)
  BillingModel.deleteOne({ id: id })
    .then((data) => {
      res.json({
        code: "0000", //响应编号
        msg: "删除成功", //响应信息
        data: null, // 响应数据
      });
    })
    .catch((err) => {
      res.json({
        code: "1003", //响应编号
        msg: "删除失败", //响应信息
        data: null, // 响应数据
      });
    });
  // res.render("success", { msg: "删除成功!! ", url: "/billing" }); // 设置提醒
});

// 获取单条账单记录
router.get("/billing/:id", (req, res) => {
  const { id } = req.params;
  // 查询数据库：
  BillingModel.findById(id)
    .then((data) => {
      res.json({
        code: "0000", //响应编号
        msg: "查询成功", //响应信息
        data: data, // 响应数据
      });
    })
    .catch((err) => {
      res.json({
        code: "1004", //响应编号
        msg: "查询失败", //响应信息
        data: null, // 响应数据
      });
    });
});

// 更新单条账单记录  (这里使用patch做局部更新)
router.patch("/billing/:id", (req, res) => {
  const { id } = req.params;
  // 查询数据库：
  BillingModel.updateOne({ _id: id }, req.body)
    .then((data) => {
      if (data) {
        // 更新成功后展示查询到的当条数据：
        BillingModel.findById(id)
          .then((data) => {
            res.json({
              code: "0000", //响应编号
              msg: "更新成功", //响应信息
              data: data, // 应显示更新后的数据但这里是统计数据，所有再查询一次数据库
            });
          })
          .catch((err) => {
            res.json({
              code: "1004", //响应编号
              msg: "读取失败", //响应信息
              data: null, // 响应数据
            });
          });
      }
    })
    .catch((err) => {
      res.json({
        code: "1005", //响应编号
        msg: "更新失败", //响应信息
        data: null, // 响应数据
      });
    });
});

module.exports = router;
