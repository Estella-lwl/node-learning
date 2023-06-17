const mongoose = require("mongoose");

let BillingSchema = new mongoose.Schema({
  // 事项
  title: {
    type: String,
    required: true,
  },
  // 时间
  time: Date,
  // 类型
  type: {
    type: Number,
    default: 0,
  },
  // 金额
  amount: {
    type: Number,
    required: true,
  },
  // 备注
  remark: {
    type: String,
  },
});

let BillingModel = mongoose.model("billing", BillingSchema);

module.exports = BillingModel;
