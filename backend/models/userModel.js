const mongoose = require("mongoose");
const { isEmail } = require('validator');

const userSchema = mongoose.Schema({
   firstName: {
      type: String,
      required: [true, "Please enter a first name"],
   },
   lastName: {
      type: String,
      required: [true, "Please enter a last name"],
   },
   email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
   },
   password: {
      type: String,
      required: [true, "Please enter a valid password"],
      minlength: [6, "Minimum password length must be 6 characters"],
   },
   register_date: {
      type: Date,
      default: Date.now,
   },
});

module.exports = mongoose.model("User", userSchema);
