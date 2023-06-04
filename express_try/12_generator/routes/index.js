var express = require("express");
var router = express.Router();
const formidable = require("formidable");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// 显示表单：
router.get("/avatar", (req, res) => {
  const content = "is visible";
  res.render("avatar", { content });
});

// 处理文件上传
router.post("/avatar", (req, res, next) => {
  // 1.创建form对象
  const form = formidable({
    multiples: true,
    // 1.1.设置文件上传的保存目录 （一般存在根目录下，也就是静态资源目录public）
    uploadDir: __dirname + "/../public/images",
    // 1.2.保持文件后缀
    keepExtensions: true,
  });
  // 2.解析请求报文
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    // console.log("callback value：", fields, files);
    res.json({ fields, files });
  });

  // 3.设置服务器保存文件的访问url： （其中fields对象的portrait的newFileName会保存文件名字，可以用于拼接）
  const url = "/images/" + fields.portrait.newFileName; //将此数据保存至数据库
  res.send("done...");
});

module.exports = router;
