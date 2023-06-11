const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1/book_list");

mongoose.connection.once("open", () => {
  let BookSchema = new mongoose.Schema({
    type: {
      type: String,
      // required: true, // 必填项
      // default: "", // 默认值
      // enum: ["小说", "长篇小说"], // 枚举值
    },
    name: String,
    price: Number,
  });

  let BookModel = mongoose.model("books", BookSchema);

  const docs = [
    {
      id: 1,
      type: "小说",
      name: "鼠疫",
      price: 19.9,
    },
    {
      id: 2,
      type: "小说2",
      name: "name2",
      price: 12,
    },
    {
      id: 3,
      type: "小说3",
      name: "name3",
      price: 35,
    },
    {
      id: 4,
      type: "小说4",
      name: "name4",
      price: 23,
    },
  ];
  BookModel.create(docs)
    .then((data) => {
      console.log("成功");
    })
    .catch((err) => {
      console.log("抛出错误", err);
    });

  // 查询条件：价格小于20的书
  BookModel.find({ price: { $lt: 20 } }).then((data) => {
    console.log("查询结果：", data);
  });

  // 使用正则检索书名中带有“n”的书：
  BookModel.find({ name: /n/ }).then((data) => {
    // ...
  });

  // 或👇🏻：
  BookModel.find({ name: new RegExp("n") }).then((data) => {
    // ...
  });

  /*  个性化读取：只截取文档的部分属性和属性值   */

  // 截取name属性后，按照 id 正序排列、并跳过第二条数据 & 截取2条数据
  BookModel.find()
    .select({ name: 1 })
    .sort({ _id: 1 })
    .skip(2)
    .limit(2)
    .exec((err, data) => {
      console.log("结果");
    });
});

mongoose.connection.on("error", () => {
  console.log("错误");
});

mongoose.connection.on("close", () => {
  console.log("连接关闭");
});
