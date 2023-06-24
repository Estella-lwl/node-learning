const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

// 存放数据
const adapter = new FileSync("db.json");
// 获取db对象
const db = low(adapter);

// 初始化数据
db.defaults({ posts: [], use: {} }).write();

// 写入数据： (先把数据获取到 =》压入数据 =》写入文件)
db.get("posts").push({ id: 2, title: "Example" }).write();
db.get("posts").unshift({ id: 3, title: "Example" }).write(); // 或者在前面压入

// 获取数据
const data = db.get("posts").value();
console.log("data：", data);

// 删除数据  （且有返回值：）
const result = db.get("posts").remove({ id: 3 }).write();
console.log("被删除的数据", result);
