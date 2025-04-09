const User = require("../model/User");
const { attachCookiesToResponse } = require("../utils");
const { BadRequestError, UnauthenticatedError } = require("../error");
const Token = require("../model/Token");
const {
  createTokenUser,
  createHash,
  sendVerificationEmail,
  sendResetPasswordEmail,
} = require("../utils");
const crypto = require("crypto");
// const bcrypt = require("bcryptjs"); //

// const sendEmail = require("../utils/sendEmail");

const createUser = async (req, res, next) => {
  try {
    const { username, email, password, aboutTheUser } = req.body;

    // checking
    if ((!username || !email, !password, !aboutTheUser)) {
      throw new BadRequestError("All fields are required!");
    }

    const emailExist = await User.findOne({ email });

    if (emailExist) {
      throw new BadRequestError("Email already exist");
    }

    // auth by email
    const verificationToken = crypto.randomBytes(40).toString("hex");
    const user = await User.create({
      username,
      email,
      password,
      aboutTheUser,
      verificationToken,
    });

    // first create user then email
    // const tokenUser = createTokenUser(user);
    // attachCookiesToResponse({ res, user: tokenUser });
    // this is a function

    //  after register SendEmail

    // const origin = "http://localhost:3000"; // the frontend  use proxy if frontend else where and
    // const origin = "http://localhost:8080/api-blog/v1"; // the frontend  use proxy if frontend else where and
    const origin = "http://localhost:8080/api-blog/v1/pages"; // the frontend  use proxy if frontend else where and

    // send an email
    await sendVerificationEmail({
      name: user.username,
      email: user.email,
      verificationToken: user.verificationToken,
      origin,
    });

    res.status(201).json({
      msg: "user created verified your email ",
    });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { token: verificationToken, email } = req.body;

    // Check for missing fields before querying DB
    if (!verificationToken || !email) {
      throw new BadRequestError("Invalid request");
    }

    const user = await User.findOne({ email });

    //  Stop execution if user not found
    if (!user) {
      throw new UnauthenticatedError("Unauthenticated");
    }

    //  Ensure user has a valid token
    if (
      !user.verificationToken ||
      user.verificationToken !== verificationToken
    ) {
      throw new UnauthenticatedError("Invalid or expired token");
    }

    user.isVerified = true;
    user.verified = Date.now();
    user.verificationToken = "";

    await user.save();

    return res.status(200).json({ msg: "Email verified" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check
    if (!email || !password) {
      throw new BadRequestError("Please provide a valid credentials");
    }

    // const user = await User.findOne({ email });
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new BadRequestError("Please provide a valid credentials");
    }

    // check the password
    const isPasswordCorrect = await user.comparePassword(password);
    console.log(isPasswordCorrect);

    if (!isPasswordCorrect) {
      throw new BadRequestError("Credentials invalid");
    }

    if (!user.isVerified) {
      throw new BadRequestError("Please verify your email before login");
    }

    // if ok create user token
    const tokenUser = createTokenUser(user);

    // { name: user.name, userId: user._id, role: user.role };
    // Check if there is a redirect query parameter in the request
    // attachCookiesToResponse({ res, user: tokenUser });
    // res.status(200).json({ msg: "loggedIn", user: tokenUser });
    // //////////===============================

    // ===============// create refresh token//=================
    let refreshToken = "";
    // check for existing token
    const existingToken = await Token.findOne({ user: user._id });

    if (existingToken) {
      const { isValid } = existingToken;
      if (!isValid) {
        throw new UnauthenticatedError("Invalid Credentials");
      }
      refreshToken = existingToken.refreshToken;
      attachCookiesToResponse({ res, user: tokenUser, refreshToken });
      res.status(200).json({ user: tokenUser });
      return;
    }

    refreshToken = crypto.randomBytes(40).toString("hex");
    const userAgent = req.headers["user-agent"];
    const ip = req.ip;
    const userToken = { refreshToken, ip, userAgent, user: user._id };

    await Token.create(userToken);

    attachCookiesToResponse({ res, user: tokenUser, refreshToken });

    res.status(200).json({ user: tokenUser });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await Token.findOneAndDelete({ user: req.user.userId });
    console.log(req.user.userId, "in logout");

    res.cookie("accessToken", "logout", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });

    // refresh cookie res
    res.cookie("refreshToken", "logout", {
      httpOnly: true,
      expires: new Date(Date.now()),
    });
    res.status(200).json({ msg: "user logged out" });
  } catch (error) {
    next(error);
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new BadRequestError("Please email is required!");
    }

    // find user

    const user = await User.findOne({ email });

    if (user) {
      const passwordToken = crypto.randomBytes(70).toString("hex");
      // send email
      const origin = "http://localhost:8080/api-blog/v1/pages"; // the frontend  use proxy if frontend else where and
      await sendResetPasswordEmail({
        name: user.name,
        email: user.email,
        token: passwordToken,
        origin,
      });

      //end  send email

      const tenMinute = 1000 * 60 * 10;
      const passwordTokenExpirationDate = new Date(Date.now() + tenMinute);

      //  add to user
      user.passwordToken = createHash(passwordToken);
      user.passwordTokenExpirationDate = passwordTokenExpirationDate;
      await user.save();
    }

    // always send a success response

    res
      .status(200)
      .json({ msg: "Please check your email reset password link " });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res) => {
  const { email, token, password } = req.body;

  if (!email || !token || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequestError("Invalid email or token");
  }

  const currentDate = new Date();

  if (
    user.passwordToken === createHash(token) &&
    user.passwordTokenExpirationDate > currentDate
  ) {
    user.password = password;
    user.passwordToken = null;
    user.passwordTokenExpirationDate = null;

    await user.save();

    return res.status(200).json({ msg: "Password successfully changed" });
  }

  res.status(400).json({ msg: "Invalid token or expired link" });
};

module.exports = {
  createUser,
  verifyEmail,
  login,
  logout,
  forgetPassword,
  resetPassword,
};
