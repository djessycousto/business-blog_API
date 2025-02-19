const express = require("express");
const router = express.Router();

const {
  createArticle,
  getAllArticle,
  getSingleArticle,
  articlePicture,
  editArticle,
  deleteArticle,
} = require("../controller/article");
const { authenticateUser } = require("../middleware/authenticateUser");

router
  .route("/article")
  .get(authenticateUser, getAllArticle)
  .post(authenticateUser, createArticle);
router.route("/article/picture").post(articlePicture);
router.route("/article/:articleId").get(getSingleArticle);
router.route("/article/:articleId").patch(editArticle);
router.route("/article/:articleId").delete(deleteArticle);

module.exports = router;
