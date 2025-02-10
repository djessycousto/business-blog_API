const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please provide a name"],
    min: [4, "Please the name must have minimum 4 letter"],
  },
  aboutTheUser: {
    type: String,
    trim: true,
    required: [true, "Please provide a title"],
    min: [150, "Please the About must have minimum 4 letter"],
  },

  email: {
    type: String,
    trim: true,
    unique: true,
    // make it unique
  },
  password: {
    type: String,
    trim: true,
    required: [true, "please the password is required"],
    // add min
  },

  userImage: {
    type: String,
    default: "/uploads/placeholder.jpg", // no default
  },
  verificationToken: {
    type: String,
    // required:true
  },
  isVerified: {
    type: Boolean,
    default: false,
  },

  role: {
    type: String,
    enum: ["admin", "user", "owner"],
    default: "user",
  },
  verified: {
    type: Date,
    default: Date.now,
  },
});

//===== hash the password and Compare password=======//
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// compare Passwords
// userSchema.method.comparePassword = async function (userPassword) {
//   const isMatch = await bcrypt.comparePassword(userPassword, this.password)
//   return isMatch
// }

userSchema.methods.comparePassword = async function (userPassword) {
  try {
    // console.log(typeof userPass, userPass);
    if (typeof userPassword !== "string" || typeof this.password !== "string") {
      throw new Error("Password comparison failed due to invalid arguments");
    }
    return await bcrypt.compare(userPassword, this.password);
  } catch (error) {
    console.log(error, "from the passwords verification ");
  }
};

//===== end hash the password======= //

module.exports = mongoose.model("User", userSchema);
