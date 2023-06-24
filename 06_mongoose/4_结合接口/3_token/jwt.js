const jwt = require("jsonwebtoken");

/**
 * 生成token：
 * -参数1：用户数据
 * -参数2：加密字符串
 * -参数3：配置对象
 */
let token = jwt.sign(
  {
    name: "LiHua",
  },
  "any_string",
  // 配置对象：
  {
    expiresIn: 60, //设置token生命周期（单位秒）
  }
);

console.log("token:", token);
const t = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTGlIdWEiLCJpYXQiOjE2ODc0ODg2NTAsImV4cCI6MTY4NzQ4ODcxMH0.KVAOX8-C04rU1J4m9zdPJYZ6iz5os0346Ol6G6NK6cQ";

/**
 * 校验token：
 * -参数1：token
 * -参数2：加密字符串
 * -参数3：callback(err,data)
 */
jwt.verify(t, "any_string", (err, data) => {
  console.log("callback", err || data);
});
