const express = require("express");
const router = require("express-promise-router")();
const { validateBody, schemas } = require("../helpers/routeHelpers");
const UsersController = require("../controllers/users");
const passport = require("passport");
const passportConf = require("../passport");
const passportSignIn = passport.authenticate("local", { session: false });
const passportJWT = passport.authenticate("jwt", { session: false });

router.route("/signup").post(validateBody(schemas), UsersController.signUp);

router
 .route("/signin")
 .post(validateBody(schemas), passportSignIn, UsersController.signIn);

router.route("/secret").get(passportJWT, UsersController.secret);

module.exports = router;
