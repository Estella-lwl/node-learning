// 1. 封装一些函数
function test1(a, b) {
  return a + b;
}

// 2. 以对象的形式暴露出去
module.exports = {
  test1,
};
