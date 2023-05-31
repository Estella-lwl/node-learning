const express = require("express");
const ejs = require("ejs");
const fs = require("fs");

// 1.读取文件：
const html = fs.readFileSync("./10_ejs练习1列表渲染.html").toString();
// 2.声明数组：
const arr = ["sentence1", "sentence12", "sentence3"];

// 3.利用ejs.render渲染：   （HTML结构使用的标签）
const result = ejs.render(html, { arr: arr });
console.log("result:", result);
