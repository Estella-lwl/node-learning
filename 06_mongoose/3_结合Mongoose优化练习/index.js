// 1.引入db
const db = require("./db/db");
const mongoose = require("mongoose");
const BookModel = require("./modules/BookModule");

// 2.调用
db(
  () => {
    BookModel.create({
      name: "testing",
    })
      .then((data) => {
        console.log("成功");
      })
      .catch((err) => {
        console.log("抛出错误", err);
      });
  },

  // 失败回调
  () => {
    console.log("error");
  }
);
