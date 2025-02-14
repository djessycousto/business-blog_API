const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

// DB
const dbConnect = require("./db/dbConnect");

//===== middleware======//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(cookieParser(process.env.jwt_Secret)); // cookie signed how to to it
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

//====router========//
const articleRouter = require("./router/articleRouter");
const userRouter = require("./router/userRouter");
const authRouter = require("./router/authRouter");
const pagesRouter = require("./router/pages");

//======middleware import for error====//
const notFound = require("./middleware/notFound");
const errorHandlerMiddleWare = require("./middleware/error-handler");

// end point
app.use("/api-blog/v1", articleRouter);
app.use("/api-blog/v1", userRouter);
app.use("/api-blog/v1", authRouter);
app.use("/api-blog/v1", pagesRouter);

//====middleWearError====//
app.use(notFound);
app.use(errorHandlerMiddleWare);

// ==== port and Db connection ====//
const port = process.env.Port || 8080;
const start = async () => {
  try {
    if (dbConnect) {
      await dbConnect(process.env.URI_MONGO);
      console.log("db connect");
    }
    //=========server======//
    app.listen(port, () => {
      console.log("port connected " + port);
    });
  } catch (error) {
    console.log("Connection error");
  }
};
start();
