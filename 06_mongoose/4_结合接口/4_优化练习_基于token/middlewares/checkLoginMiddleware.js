/**
 * @returns 登录检测中间件：
 */
module.exports = (req, res, next) => {
  if (!req.session.name) {
    return res.redirect("/login");
  }
  next();
};
