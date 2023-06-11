const express = require("express");
const homeRouter = require("./routes/homeRouter");
const adminRouter = require("./routes/adminRouter");
const app = express();

app.use(homeRouter);
app.use(adminRouter);

app.listen(3000, () => {
  console.log("端口3000正在监听中...");
});
