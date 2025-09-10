const express = require("express");
const connectionDB = require("./database/mongooseDB");
const app = express();

const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./Routes/authentication");

app.use("/", authRouter);

connectionDB()
  .then(() => {
    console.log("Database connected successfully !");
    app.listen(3000, () => {
      console.log("app is listining on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database connection failed : " + err.message);
  });
