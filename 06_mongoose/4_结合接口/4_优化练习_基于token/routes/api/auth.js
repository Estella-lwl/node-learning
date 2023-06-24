const express = require("express");
const router = express.Router();
const UserModel = require("../../models/UserModel");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const { secret } = require("../../config/config");

// 登录表单:
router.post("/login", (req, res) => {
  const { name, password } = req.body;
  // 查询数据库时应把输入的密码转为md5格式查询（查得到就是账号存在/正确）：
  UserModel.findOne({ name: name, password: md5(password) })
    .then((data) => {
      // 账号不存在的情况：
      if (!data) {
        return res.json({
          code: "2002",
          msg: "账号或密码错误",
          data: null,
        });
      }
      // 登录成功 =》响应token：
      console.log("data:", data);
      const token = jwt.sign({ name: data.name, _id: data._id }, secret, {
        expiresIn: 60 * 60 * 24 * 7,
      });
      res.json({
        code: "0000",
        msg: "登录成功",
        data: token,
      });
    })
    .catch((err) => {
      // 没查到的情况
      return res.json({
        code: "2001",
        msg: "数据库响应失败",
        data: null,
      });
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
