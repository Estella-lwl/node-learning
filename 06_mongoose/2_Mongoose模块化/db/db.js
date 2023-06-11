const { DBHOST, DBNAME, DBPORT } = require("../config/config");

/**
 * @param {*} success 数据库连接成功回调
 * @param {*} error 数据库连接失败回调
 */
module.exports = function (success, error) {
  /* 重复的公共代码将放置于此： */
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", true);
  mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

  mongoose.connection.once("open", () => {
    success();
  });

  // 连接成功回调
  mongoose.connection.on("error", () => {
    error();
  });

  // 连接失败回调
  mongoose.connection.on("close", () => {
    console.log("closed...");
  });
};
