// const { isTokenValid } = require("../utils");

// /////// ######### 1 authenticateUser
// // check if token is valid, or if the use was register and given a valid token
// const authenticateUser = async (req, res, next) => {
//   // cause' it in the sign Cookies, so use
//   const token = req.signedCookies.token;
//   if (!token) {
//     res.status(400).json({ msg: "Authentication Invalid" }); // testing postman
//     // return res
//     // .status(400)
//     // .send('<script>window.location="/auth/login"</script>'); // i used the second one because this one redirect to login or signin
//   }

//   try {
//     // const payload = isTokenValid({ token }); valid option
//     // console.log(payload, "payload");
//     const { name, userId, role, userImage, aboutTheUser } = isTokenValid({
//       token,
//     }); // coming from tokenUser
//     req.user = { name, userId, role }; // req.user user here it is just a name (could have been name req.userInfo = { name, userId, role };)
//     // req.user = { name, userId, role, userImage };
//     next();
//   } catch (error) {
//     res.status(400).json({ msg: "Authentication Invalid" });
//     // return res
//     // .status(400)
//     // .send('<script>window.location="/auth/login"</script>');
//   }
// };

// /////// ######### 2 authenticateUserHasLogIn
// const authenticateUserHasLogIn = async (req, res, next) => {
//   const token = req.signedCookies.token;

//   if (token) {
//     try {
//       const { name, userId, role, userImage } = isTokenValid({
//         token,
//       });
//       res.locals.isLoggedIn = true;
//       req.user = { name, userId, role, userImage };
//       next();
//     } catch (error) {
//       console.log(error);
//       res.locals.isLoggedIn = false;
//       next();
//     }
//   } else {
//     res.locals.isLoggedIn = false;
//     next();
//   }
// };

// // oneway // or an other way
// // const authorizePermissions = (req, res, next) => {
// //   //   console.log("admin or user");
// //   console.log(req.user.role);

// //   if (req.user.role !== "admin" && req.user.role !== "user") {
// //     return res.status(403).json({ msg: "please register or login " });
// //   }

// //   next();
// // };

// const authorizePermissions = (...roles) => {
//   // rest operator copy from the call back fnct
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       // from the router
//       return res.status(403).json({ msg: "please register or login " });
//     }
//     next();
//   };
// };

// module.exports = {
//   authenticateUser,
//   authorizePermissions,
//   authenticateUserHasLogIn,
// };
