const User = require("../model/User");
const { attachCookiesToResponse } = require("../utils");
const { BadRequestError } = require("../error");
const Token = require("../model/Token");
const { createTokenUser, sendVerificationEmail } = require("../utils");
const crypto = require("crypto");

// const sendEmail = require("../utils/sendEmail");

const createUser = async (req, res, next) => {
  try {
    // get from the front end

    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    console.log("Raw Data:", req.rawBody); // Debugging raw request

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

    // i will first create user then email
    // const tokenUser = createTokenUser(user);
    // attachCookiesToResponse({ res, user: tokenUser });
    // this is a function

    //  after register SendEmail

    const origin = "http//localhost:3000"; // the frontend  use proxy if frontend else where and

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
    console.log(error.message);
    next(error);
    // return next(
    //   new BadRequestError(
    //     Object.values(error.errors)
    //       .map((e) => e.message)
    //       .join(", ")
    // )
    // );
    // console.log(error);
  }
};

// add verification email

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne(email);

  // checks

  if (!user) {
    res.status(401).json({ msg: "Unauthenticated" });
  }

  if (!user.verificationToken || !verificationToken) {
    res.status(401).json({ msg: "Unauthenticated" });
  }

  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = "";

  await user.save();

  res.status(200).json({ msg: "email verified" });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check

    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "Please provide a valid credentials" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Credentials invalid" });
    }

    // check the password
    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: "Credentials invalid" });
    }

    if (!user.isVerified) {
      return res.status(401).json({ msg: "please verify your email" });
    }

    // if okay
    // need to change to create tokenUser

    const tokenUser = createTokenUser(user);
    // { name: user.name, userId: user._id, role: user.role };
    // Check if there is a redirect query parameter in the request
    // attachCookiesToResponse({ res, user: tokenUser });
    // res.status(200).json({ msg: "loggedIn", user: tokenUser });
    // //////////===============================

    // create refresh token===============//=================
    let refreshToken = "";
    // check for existing token
    const existingToken = await Token.findOne({ user: user._id });

    if (existingToken) {
      const { isValid } = existingToken;
      if (!isValid) {
        throw new CustomError.UnauthenticatedError("Invalid Credentials");
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
    console.log(error, " from Login ");
  }
};

const logout = (req, res) => {
  res.send("Logout");
};

module.exports = {
  createUser,
  verifyEmail, // to set in router
  login,
  logout,
};
