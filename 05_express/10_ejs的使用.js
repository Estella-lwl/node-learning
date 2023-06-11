const ejs = require("ejs");
const fs = require("fs");
/* // 使用异步读取的方式：
const file = fs.readFile("./10_ejs.html", (err, data) => {
  console.log("data:", data);
  const content = data.toString();
  console.log("content:", content);
});
console.log("file:", file); */

// 使用同步读取的方式：
const content = fs.readFileSync("./10_ejs.html").toString();

// 举例：
const half1 = "这是一句";
// 反例：使用模板字符串 =》导致变量耦合
// let result = `${half1}完整的`;

// 使用 ejs 渲染：
// render函数会找到<%=的标识，并将标识内部的内容替换为第二个参数中对应属性的值。
// // 初级版：
// let result = ejs.render(content);

// // 变体1：使用变量
const half = "完整的";
// let result = ejs.render(content, { half, half });

// 变体2：使用 HTML结构：
const example = "some content...";
let result = ejs.render(content, { half, example });

console.log("result", result);
