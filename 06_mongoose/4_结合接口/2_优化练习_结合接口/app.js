const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const indexRouter = require("./routes/web/index.js");
const billingRouter = require("./routes/api/billing.js");
const authRouter = require("./routes/web/auth");
const { DBHOST, DBNAME, DBPORT } = require("./config/config");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 设置 session 中间件：
app.use(
  session({
    name: "sid", //设置cookie放入name，默认值是connect.sid
    secret: "secret", //签名（参与加密的字符串；加盐）
    saveUninitialized: false, //是否给每次请求设置cookie用来存储session的id
    resave: true, //是否每次请求时重新保存session
    store: MongoStore.create({
      mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`, //数据库的连接配置
    }),
    cookie: {
      httpOnly: true, //开启后前端无法使用JS操作
      maxAge: 1000 * 60 * 60 * 24 * 7, //控制sessionID 的过期时间（此处7天）
    },
  })
);

app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/api", billingRouter); // 加前缀；这样访问billingRouter中的路由规则时必须加前缀

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.render("404"); // 响应404页面
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
