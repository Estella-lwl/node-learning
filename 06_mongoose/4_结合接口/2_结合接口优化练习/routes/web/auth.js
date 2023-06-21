var express = require("express");
var router = express.Router();
const UserModel = require("../../models/UserModel");
const md5 = require("md5");

// 注册:
router.get("/reg", (req, res) => {
  //响应 HTML：
  res.render("auth/reg"); //自动在views文件夹目录找
});

// 注册表单：
router.post("/reg", (req, res) => {
  console.log("提交数据", req.body);
  // 可以在这里做表单验证。

  //插入数据库：
  UserModel.create({ ...req.body, password: md5(req.body.password) })
    .then((res) => {
      res.send("注册成功");
    })
    .catch((err) => {
      res.send("注册失败");
    });
  // res.render("testing...");
});

// 登录:
router.get("/login", (req, res) => {
  // 响应 HTML：
  res.render("auth/login"); //自动在views文件夹目录找
});

// 登录表单:
router.post("/login", (req, res) => {
  // 1.查询数据库
  const { name, password } = req.body;

  // 查询数据库时应把输入的密码转为md5格式查询（查得到就是账号存在/正确）：
  UserModel.findOne({ name: name, password: md5(password) })
    .then((data) => {
      // 没有data则无此账号
      if (!data) {
        res.send("账号或密码错误");
      }
      res.render("success", { msg: "", url: "/billing" });
    })
    .catch((err) => {
      res.status(500).send("查询失败");
    });
});

module.exports = router;
