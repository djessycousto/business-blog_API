const express = require("express");
const router = express.Router();

const multer = require("multer");
// Set up Multer (Memory Storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

const {
  createArticle,
  getAllArticle,
  getSingleArticle,
  articlePicture,
  editArticle,
  deleteArticle,
} = require("../controller/article");
const { authenticateUser } = require("../middleware/authenticateUser");

router.post(
  "/article/picture",
  upload.single("articlePicture"),
  articlePicture
);
router
  .route("/article")
  .get(getAllArticle)
  .post(authenticateUser, createArticle);
// router.route("/article/picture").post(articlePicture);
router.route("/article/:articleId").get(getSingleArticle);
router.route("/article/:articleId").patch(editArticle);
router.route("/article/:articleId").delete(deleteArticle);

module.exports = router;
