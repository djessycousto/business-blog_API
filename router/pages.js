// all static pages

const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
  res.status(200).render("index");
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
