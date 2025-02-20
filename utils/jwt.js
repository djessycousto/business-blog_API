const jwt = require("jsonwebtoken");
const CustomError = require("../error");

// create JWT
const createJwt = ({ payload }) => {
  const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
  return token; // is the payload and the secret plus exp
};

// ==== verify Token  in the login
const isTokenValid = (token) => {
  try {
    // return jwt.verify(token, process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    return decoded.payload.user;
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  // two cookies
  const accessTokenJWT = createJwt({ payload: { user } });
  const refreshTokenJWT = createJwt({ payload: { user, refreshToken } });

  const oneDay = 1000 * 60 * 60 * 24;
  const longerExp = 1000 * 60 * 60 * 24 * 30;

  // access cookie res
  res.cookie("accessToken", accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + oneDay),
    sameSite: "strict",
    // maxAge: 1000 * 60 * 15,
  });

  // refresh cookie res
  res.cookie("refreshToken", refreshTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + longerExp),
  });
};

module.exports = { createJwt, isTokenValid, attachCookiesToResponse };
