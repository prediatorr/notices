require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const routes = require("./routes/index");

app.use(express.json());
app.use("/user", routes.userRouter);
app.use("/group", routes.groupRouter);

app.get("/", (req, res) => {
  res.send("Hi babes");
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.4wnjk23.mongodb.net/?retryWrites=true&w=majority`,
    {
      dbName: process.env.DBNAME,
    }
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("server is working");
      console.log(process.env.DBNAME);
    });
  })
  .catch((err) => {
    console.log(err);
  });
