const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  // 用户名
  name: {
    type: String,
    required: true,
  },
  // 密码
  password: {
    type: String,
    required: true,
  },
});

let UserModel = mongoose.model("usermsgs", UserSchema);

module.exports = UserModel;
