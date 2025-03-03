// all static pages

const Article = require("../model/Article");
const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
  res.status(200).render("index");
});
// router.get("/category/test", (req, res) => {
//   res.status(200).render("articles");
// });

// router.get("/category/item", (req, res) => {
//   res.status(200).render("single-article");
// });

router.get("/category/:category", async (req, res) => {
  try {
    const category = req.params.category; // Get the category from the URL

    // Fetch articles that match the category
    // const articles = await Article.find({ categories: category });
    const articles = await Article.find({
      categories: { $regex: new RegExp(`^${category}$`, "i") },
    });

    res.status(200).render("articles", { articles, category }); // Pass data to the template
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/user/verify-email", (req, res) => {
  res.render("emailpage");
});

module.exports = router;
