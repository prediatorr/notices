const express = require("express");

const app = express();
const routes = require("./routes/index")
app.use("/user", routes.userRouter)

app.get("/", (req, res) => {
  res.send("Hi babes");
});

app.listen(3000, () => {
  console.log("server is working");
});
