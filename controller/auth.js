const User = require("../model/User");
const { attachCookiesToResponse } = require("../utils");
const { BadRequestError, UnauthenticatedError } = require("../error");
const Token = require("../model/Token");
const { createTokenUser, sendVerificationEmail } = require("../utils");
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

    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestError("Please provide a valid credentials");
    }

    // check the password
    const isPasswordCorrect = await user.comparePassword(password);

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

const logout = (req, res) => {
  res.send("Logout");
};

module.exports = {
  createUser,
  verifyEmail,
  login,
  logout,
};
