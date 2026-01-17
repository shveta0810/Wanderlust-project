const express =require("express");
const router =express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl}= require("../middleWare.js");
const  userCotroller = require("../controllers/users.js");

//user signup routes
router.route("/signup").get(userCotroller.renderSignupForm)
.post(wrapAsync(userCotroller.signup));
//login routes
router.route("/login").get(userCotroller.renderLoginForm)
.post(saveRedirectUrl, passport.authenticate("local", {
  failureFlash :true,
  failureRedirect :"/login",
}),userCotroller.login);

//user logout
router.get("/logout", userCotroller.logout);

module.exports = router;

