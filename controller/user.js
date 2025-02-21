const User = require("../model/User");
const { BadRequestError } = require("../error");
const { createTokenUser, attachCookiesToResponse } = require("../utils");
const cloudinary = require("cloudinary").v2;

// // Set up Multer (Memory Storage)
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// ##################### controller ###################

const getAllUser = async (req, res, next) => {
  try {
    const user = await User.find().select("-password");
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

const getSingleUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id }).select("-password");

    if (!user) {
      throw new BadRequestError("No id matches your request");
    }
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

const showUser = (req, res, next) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    next(error);
  }
};

const editUser = async (req, res, next) => {
  // i can use image edit in her
  // coming from  the authentication

  try {
    const { name, email } = req.body;
    // check
    if (!name || !email) {
      throw new BadRequestError("Name or Email missing");
    }
    // update user input
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
    next(error);
    // throw new Error(error.message);
  }
};

// this at last

const userPicture = async (req, res, next) => {
  // using muller and cloudinary
  try {
    // check the file
    if (!req.file) {
      throw new BadRequestError("no file, please upload a file");
    }

    // Convert buffer to base64
    const fileStr = `data:image/jpeg;base64,${req.file.buffer.toString(
      "base64"
    )}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(fileStr, {
      folder: "user-pictures",
    });
    res
      .status(200)
      .json({ url: result.secure_url, public_id: result.public_id });
  } catch (error) {
    next(error);
  }
};

const deleteImage = async (req, res, next) => {
  try {
    const { public_id } = req.params;
    await cloudinary.uploader.destroy(public_id);
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    next(error);
  }
};

// will use email not this
// const updateUserPassword = async (req, res, next) => {
//   const { oldPassword, newPassword } = req.body;
//   if (!oldPassword || !newPassword) {
//     throw new BadRequestError("please provide old pass and new pass");
//   }
//   const user = await User.findOne({ _id: req.user.userId });
//   // need to check user

//   // Compare the password // // the old password

//   const isPasswordCorrect = user.comparePassword(oldPassword);

//   if (!isPasswordCorrect) {
//     res.status(400).json({ message: "please provide  VALID PASS" });
//   }

//   //  SAVE NEW PASS

//   user.password = newPassword;
//   await user.save();
//   res.status(200).json({ msg: "success password updated" });
// };

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
  deleteImage,
  // updateUserPassword
};
