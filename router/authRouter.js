const express = require("express");
const router = express.Router();

const {
  createUser,
  verifyEmail, // to set in router
  login,
  logout,
  forgetPassword,
  resetPassword,
} = require("../controller/auth");

router.route("/auth/register").post(createUser);
router.route("/auth/login").post(login);
router.route("/auth/logout").get(logout);
router.route("/auth/verify-email").post(verifyEmail);
router.route("/auth/forget-password").post(forgetPassword);
router.route("/auth/reset-password").post(resetPassword);

module.exports = router;
