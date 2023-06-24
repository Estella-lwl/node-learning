const express = require("express");
const router = express.Router();
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
    // 注意这里形参命名别和外层的冲突：
    .then((data) => {
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
  res.render("auth/login");
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
      // 登录成功 =》写入session：    (TODO:理一下这里为什么从数据库读)
      req.session.name = data.name;
      req.session._id = data._id;
      res.render("success", { msg: "", url: "/billing" });
    })
    .catch((err) => {
      // 没查到的情况
      res.status(500).send("查询失败");
    });
});

// 退出登录:
router.post("/logout", (req, res) => {
  // 销毁session：
  req.session.destroy(() => {
    res.render("success", { msg: "退出成功，重新登陆👇🏻", url: "/login" });
  });
});

module.exports = router;
