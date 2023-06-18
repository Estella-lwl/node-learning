const express = require("express");
const cookieParser = require("cookie-parser");
// 引入 express-session 和 connect-mongo：
const session = require("express-session");
const MongoStore = require("connect-mongo");

const app = express();

// 设置 session 中间件：
app.use(
  session({
    name: "sid", //设置cookie放入name，默认值是connect.sid
    secret: "secret", //签名（参与加密的字符串；加盐）
    saveUninitialized: false, //是否给每次请求设置cookie用来存储session的id
    resave: true, //是否每次请求时重新保存session
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/project", //数据库的连接配置
    }),
    cookie: {
      httpOnly: true, //开启后前端无法使用JS操作
      maxAge: 1000 * 300, //控制sessionID 的过期时间
    },
  })
);

// 首页路由规则
app.get("/", (req, res) => {
  res.send("home");
});

// session的设置：
app.get("/login", (req, res) => {
  if (req.query.username === "admin" && req.query.password === "admin") {
    req.session.username = "admin";
    req.session.uid = "test";
    res.send("登录成功");
  }
});

// session的读取：
app.get("/cart", (req, res) => {
  // 检测session是否存在用户数据（中间件已将数据库中的内容取出放到了req.session上）
  if (req.session.username) {
    res.send("欢迎访问，${req.session.username}");
  } else {
    res.send("未登录...");
  }
});

// session的销毁：
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.send("已退出登录");
  });
});

app.listen(3009);
