const JWT = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../config");

signToken = (user) => {
 return JWT.sign(
  {
   iss: "CornelPrime", // issuer i.e the person giving the token
   sub: user._id, // the subject of the token. It connects the token to the user.
   iat: new Date().getTime(), // issued at i.e the time that the token was signed and it is set to current time
   exp: new Date().setDate(new Date().getDate() + 1), // expiration time and it is set to current time + 1 day
  },
  JWT_SECRET
 );
};
module.exports = {
 signUp: async (req, res, next) => {
  const { email, password } = req.value.body;
  // check if there are already users with this same email
  const foundUser = await User.findOne({ email });
  if (foundUser) {
   return res.status(401).json({ error: "Email is already in use" });
  }
  const newUser = new User({ email, password });
  await newUser.save();

  // res.json({ user: "created" });
  // respond with token
  const token = signToken(newUser);

  res.json({ token });
 },
 signIn: async (req, res, next) => {
  // console.log("UsersController.signIn() called");
  // generate the token
  const token = signToken(req.user);
  console.log(req.user);
  res.status(200).json({ token });
  // res.json({ signin: "Successful" });
 },
 secret: async (req, res, next) => {
  console.log("UsersController.secret() called");
  res.json({ message: "Welcome to this unauthorized page" });
 },
};
