const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const userSchema = new Schema({
 email: {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
 },
 password: {
  type: String,
  required: true,
 },
});

userSchema.pre("save", async function (next) {
 try {
  // generate a salt
  const salt = await bcrypt.genSalt(10);
  // generate a password hash (salt + hash)
  const passwordHash = await bcrypt.hash(this.password, salt);
  console.log("salt", salt);
  console.log("normal password", this.password);
  // re-assign hashed version over original, pllain text password
  console.log("hashed password", passwordHash);
  this.password = passwordHash;
  next();
 } catch (error) {
  next(error);
 }
});

userSchema.methods.isValidPassword = async function (newPassword) {
 try {
  return await bcrypt.compare(newPassword, this.password);
 } catch (error) {
  throw new Error(error);
 }
};

const User = mongoose.model("user", userSchema);

module.exports = User;
