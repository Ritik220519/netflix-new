const express = require("express");
const connectionDB = require("./database/mongooseDB");
const app = express();
const cors = require("cors");

const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const authRouter = require("./Routes/authentication");
const profileView = require("./Routes/profile");

app.use("/", authRouter);
app.use("/", profileView);

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
