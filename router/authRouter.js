const express = require("express");
const router = express.Router();

const {
  createUser,
  verifyEmail, // to set in router
  login,
  logout,
} = require("../controller/auth");

router.route("/auth/register").post(createUser);
router.route("/auth/login").post(login);
router.route("/auth/logout").get(logout);
router.route("/auth/verify-email").post(verifyEmail);

module.exports = router;
