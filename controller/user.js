const User = require("../model/User");
const { BadRequest, UnauthenticatedError } = require("../error");
const { createTokenUser } = require("../utils/index");
const getAllUser = async (req, res) => {
  try {
    const user = await User.find();
  } catch (error) {
    console.log(error.message, "from all user");
  }

  res.status(200).json({ msg: "test 1" });
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id }).select("-password");

  if (!user) {
    throw new BadRequest("No id matches your request");
  }
  res.status(200).json({ user });
};

// ============ //
const showUser = (req, res) => {
  console.log(req.user);
  res.status(200).json({ user: req.user });
};

const editUser = async (req, res) => {
  // i can use image edit in her
  // coming from  the authentication

  try {
    const { name, email, userPicture } = req.body;
    // check
    if (!name || !email) {
      throw new BadRequest("email or name missing");
    }
    // update
    const userUpdated = await User.findOneAndUpdate(
      { _id: req.user.userId },
      { email, name },
      {
        new: true,
        runValidators: true,
      }
    );

    // create tokenUser
    const tokenUser = createTokenUser(userUpdated);
    // attacheCookies
    attachCookiesToResponse({ res, userUpdated: tokenUser }); //to be changed with email
  } catch (error) {
    throw new Error(error.message);
  }
};

// this at last

const userPicture = (req, res) => {
  res.json("User picture");
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    console.log("bad request");
    res.status(400).json({ message: "please provide old pass and new pass" });
  }
  const user = await User.findOne({ _id: req.user.userId });
  // need to check user

  // Compare the password // // the old password

  const isPasswordCorrect = user.comparePassword(oldPassword);

  if (!isPasswordCorrect) {
    res.status(400).json({ message: "please provide  VALID PASS" });
  }

  //  SAVE NEW PASS

  user.password = newPassword;
  await user.save();
  res.status(200).json({ msg: "success password updated" });
};

const deleteUser = async (req, res) => {
  try {
    const { id: userId } = req.params;
    const user = await User.findByIdAndDelete({ _id: userId });
    console.log(user);
    res.status(200).json({ msg: "deleted" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUser,
  getSingleUser,
  showUser,
  userPicture,
  editUser,
  deleteUser,
  // updateUserPassword
};
