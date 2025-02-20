const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// const userSchema = mongoose.Schema({
//   username: {
//     type: String,
//     trim: true,
//     required: [true, "Please provide a username"],
//     min: [4, "Please the username must have minimum 4 letter"],
//   },
//   aboutTheUser: {
//     type: String,
//     trim: true,
//     required: [true, "Please provide about"],
//     min: [150, "Please tell us more about you at least 150 character"],
//   },

//   email: {
//     type: String,
//     trim: true,
//     unique: true,
//     required: [true, "Please provide an email"],
//   },
//   password: {
//     type: String,
//     trim: true,
//     required: [true, "please the password is required"],
//     // add min
//   },

//   userImage: {
//     type: String,
//     default: "/uploads/placeholder.jpg", // no default
//   },
//   verificationToken: {
//     type: String,
//     // required:true
//   },
//   isVerified: {
//     type: Boolean,
//     default: false,
//   },

//   role: {
//     type: String,
//     enum: ["admin", "user", "owner"],
//     default: "user",
//   },
//   verified: {
//     type: Date,
//     default: Date.now,
//   },
// });

//===== hash the password and Compare password=======//

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Please provide a username"],
      minlength: [4, "Username must have at least 4 characters"],
      maxlength: [25, "Username cannot exceed 30 characters"],
    },
    aboutTheUser: {
      type: String,
      trim: true,
      required: [true, "Please provide some information about yourself"],
      minlength: [150, "Tell us more about you (at least 150 characters)"],
      maxlength: [500, "About section cannot exceed 500 characters"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Please provide an email"],
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // Exclude password from query results by default
    },
    userImage: {
      type: String,
      default: "/uploads/placeholder.jpg", // Can use a default placeholder
    },
    verificationToken: {
      type: String,
      default: null, // Optional: Explicitly mark as optional
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["admin", "user", "moderator"],
      default: "user",
    },
    verified: {
      type: Date,
      default: null, // Only set once verified
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
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
    console.log(error, "From the passwords verification ");
    throw new Error("From the passwords verification");
  }
};

// userSchema.methods.comparePassword = async function (userPassword) {
//   try {
//     if (typeof userPassword !== "string" || typeof this.password !== "string") {
//       throw new Error("Password comparison failed due to invalid arguments");
//     }
//     return await bcrypt.compare(userPassword, this.password);
//   } catch (error) {
//     console.log(error, "from the passwords verification ");
//     return false; // Explicitly return false if there's an error
//   }
// };

//===== end hash the password======= //

module.exports = mongoose.model("User", userSchema);
