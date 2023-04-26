const express = require("express");
const bodyparser = require("body-parser");
const { ErrorHandler } = require("./middleware/errorhandler");
const sequelize = require("./util/database");

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// app.use((req,res, next)=>{
//    res.setHeaders("Access-Control-Allow-Origin", "*");
//    res.setHeaders("Access-Control-Allow-Origin", "GET", "POST", "PUT", "DELETE");
//    next();
// })

// test route
app.get("/", (req, res, next) => {
  res.send("Hello world");
});

// specify the routes
app.use("/user", require("./routes/user.routes"));

app.use(ErrorHandler);

sequelize
  .sync()
  .then((result) => {
    console.log("DATABASE CONNECTED");
    app.listen(8080);
  })
  .catch((err) => {
    console.log("SERVER ERR", err);
  });
