const jwt = require("jsonwebtoken");
const { secret } = require("../config/config");

/**
 * 服务端JWT校验-中间件：
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
module.exports = (req, res, next) => {
  const token = req.get("token"); //获取token(一般在请求头中；由服务端决定)
  if (!token) {
    return res.json({
      code: "2003",
      msg: "token缺失",
      data: null,
    });
  }
  // JWT校验：
  jwt.verify(token, secret, (err, data) => {
    if (err) {
      return res.json({
        code: "2004",
        msg: "token校验失败",
        data: null,
      });
    }

    // 校验成功 =》当前用户信息 =》next
    req.user = data;
    next();
  });
};
