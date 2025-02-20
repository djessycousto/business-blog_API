const express = require("express");
const router = express.Router();
const multer = require("multer");
// const { upload } = require("../app"); // Import upload from app.js
// console.log(upload, "upload");

// const imported = require("../app");
// console.log("Imported module:", imported); // Check what is being imported
// const { upload } = imported; // Ensure upload is correctly extracted

// console.log("Upload middleware:", upload);

const imported = require("../app");

// const upload = imported.upload; // Extract it properly

// Set up Multer (Memory Storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

const {
  getAllUser,
  getSingleUser,
  showUser,
  userPicture,
  editUser,
  deleteImage,
  deleteUser,
} = require("../controller/user");
const { authenticateUser } = require("../middleware/authenticateUser");

router.post("/user/userProfilePic", upload.single("userImage"), userPicture);
router.route("/user").get(authenticateUser, getAllUser);
// router.route("/user/picture").post(authenticateUser, userPicture);

router.route("/user/showMe").get(authenticateUser, showUser);

router.delete("/user/delete-profile/:public_id", deleteImage);
router.route("/user/:id").get(authenticateUser, getSingleUser);
router.route("/user/:id").patch(authenticateUser, editUser);
router.route("/user/:id").delete(authenticateUser, deleteUser);

module.exports = router;
