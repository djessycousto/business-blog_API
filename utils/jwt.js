const jwt = require("jsonwebtoken");

// create JWT
const createJwt = ({ payload }) => {
  const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
    // removed the bracket
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
  console.log(token, "create JWT");

  return token; // is the payload and the secret plus exp
};

// ==== verify Token  in the login
const isTokenValid = (token) => {
  try {
    // return jwt.verify(token, process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.user;
  } catch (error) {
    console.log(error);

    // throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  // const accessTokenJWT = createJwt(user);
  const accessTokenJWT = createJwt({ payload: { user } });
  const refreshTokenJWT = createJwt({ payload: { user, refreshToken } });

  const oneDay = 1000 * 60 * 60 * 24;
  const longerExp = 1000 * 60 * 60 * 24 * 30;

  res.cookie("accessToken", accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + oneDay),
    sameSite: "strict",
    // maxAge: 1000 * 60 * 15,
  });

  res.cookie("refreshToken", refreshTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + longerExp),
  });
};

// ===== attachSinglecookiesCookieToResponse

// const attachCookiesToResponse = ({ res, user }) => {
//   const token = createJwt({ payload: user });
//   const oneDay = 1000 * 60 * 60 * 24;

//   res.cookie("token", token, {
//     httpOnly: true,
//     expires: new Date(Date.now() + oneDay),
//     secure: process.env.NODE_ENV === "production",
//     signed: true,
//   });
//   // console.log("token" + token);
// };

module.exports = { createJwt, isTokenValid, attachCookiesToResponse };
