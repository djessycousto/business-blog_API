const express = require("express");
const router = express.Router();

const {
  getAllUser,
  getSingleUser,
  showUser,
  userPicture,
  editUser,
  deleteUser,
} = require("../controller/user");
const { authenticateUser } = require("../middleware/authenticateUser");

// router.get("/user/verify-email", (req, res) => {
//   res.render("emailpage");
// });

// router.get("/user/test", (req, res) => {
//   res.render("emailpage");
// });

router.route("/user").get(authenticateUser, getAllUser);
router.route("/user/picture").post(authenticateUser, userPicture);
router.route("/user/showMe").get(authenticateUser, showUser);

router.route("/user/:id").get(authenticateUser, getSingleUser);
router.route("/user/:id").patch(authenticateUser, editUser);
router.route("/user/:id").delete(authenticateUser, deleteUser);

module.exports = router;
