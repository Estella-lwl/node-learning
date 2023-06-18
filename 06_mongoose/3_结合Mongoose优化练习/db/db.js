/**
 * @param {*} success 数据库连接成功回调
 * @param {*} error 数据库连接失败回调
 */
module.exports = function (success, error) {
  /* 重复的公共代码将放置于此： */
  // 给 error 设置默认值：
  if (typeof error !== "function") {
    error = () => {
      console.log("连接失败");
    };
  }

  const mongoose = require("mongoose");
  mongoose.set("strictQuery", true);
  const { DBHOST, DBNAME, DBPORT } = require("../config/config");
  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

  mongoose.connection.once("open", () => {
    // 连接成功回调
    success();
  });

  mongoose.connection.once("error", () => {
    // 连接错误的回调
    error();
  });

  // 连接失败回调
  mongoose.connection.on("close", () => {
    console.log("closed...");
  });
};
