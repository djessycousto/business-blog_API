const { isTokenValid } = require("../utils");
const CustomError = require("../error");
const Token = require("../model/Token");
const { attachCookiesToResponse } = require("../utils");

/////// ######### 1 authenticateUser
// check if token is valid, or if the use was register and given a valid token
const authenticateUser = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies || {};

  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload;
      return next();
    }

    const payload = isTokenValid(refreshToken);

    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken?.isValid) {
      throw new CustomError.UnauthenticatedError("Authentication Invalid");
    }

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });

    req.user = payload.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Authentication Invalid" });
    // return res
    // .status(400)
    // .send('<script>window.location="/auth/login"</script>');
  }
};

const authorizePermissions = (...roles) => {
  // rest operator copy from the call back fnct
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      // from the router
      return res.status(403).json({ msg: "please register or login " });
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
