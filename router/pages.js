// all static pages

const express = require("express");
const router = express.Router();

router.get("/index", (req, res) => {
  res.status(200).render("index");
});

router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/register", (req, res) => {
  res.render("register");
});

module.exports = router;
