require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");

app.use(cookieParser(process.env.jwt_Secret)); // ✅ Signed cookies
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log(process.env.CLOUDINARY_API_SECRET, "test");
// Set up Multer (Memory Storage)
const storage = multer.memoryStorage();
const upload = multer({ storage }); // ✅ Create upload instance

// DB
const dbConnect = require("./db/dbConnect");

//===== Middleware ======//
app.use(
  cors({
    origin: "http://localhost:8080", // Change this to your frontend URL
    credentials: true, // ✅ Allows cookies to be sent
  })
);

// app.use(cookieParser(process.env.jwt_Secret)); // ✅ Signed cookies
app.use(express.urlencoded({ extended: true })); // ✅ Allows URL-encoded data
app.use(express.json()); // ✅ Allows JSON data
// app.use(cors());

console.log(process.env.jwt_Secret, "jwt_Secret");

// to fixe the empty cookie issue

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

//==== Router ========//
const articleRouter = require("./router/articleRouter");
const userRouter = require("./router/userRouter");
const authRouter = require("./router/authRouter");
const pagesRouter = require("./router/pages");

//=== Middleware for Error Handling ===//
const notFound = require("./middleware/notFound");
const errorHandlerMiddleWare = require("./middleware/error-handler");

// Endpoints
app.use("/api-blog/v1/pages", pagesRouter);
app.use("/api-blog/v1", articleRouter);
app.use("/api-blog/v1", userRouter);
app.use("/api-blog/v1", authRouter);

//==== Middleware Error ====//
app.use(notFound);
app.use(errorHandlerMiddleWare);

// ==== Port and DB Connection ====//
const port = process.env.Port || 8080;
const start = async () => {
  try {
    if (dbConnect) {
      await dbConnect(process.env.URI_MONGO);
      // console.log("db connect");
    }
    //========= Server Start ======//
    app.listen(port, () => {
      console.log("port connected " + port);
    });
  } catch (error) {
    throw new Error("Local connection error", { cause: error });
  }
};
start();

// ✅ Export `upload` for use in routes
// module.exports = { app, upload };
// ✅ Ensure upload is exported correctly
console.log("Exporting upload:", upload);
module.exports = { app, upload };
