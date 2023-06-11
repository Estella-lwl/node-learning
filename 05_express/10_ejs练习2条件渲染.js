const express = require("express");
const ejs = require("ejs");
const fs = require("fs");

// 1.读取文件：
const html = fs.readFileSync("./10_ejs练习2条件渲染.html").toString();
// 2.声明数组：
const isLogin = true;

// 3.利用ejs.render渲染：   （HTML结构使用的标签）
const result = ejs.render(html, { isLogin: isLogin });
console.log("result:", result);
