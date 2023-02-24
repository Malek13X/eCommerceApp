const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

// @desc    Sign Up new user
// @route   POST /api/users
// @access  public
const registerUser = asyncHandler(async (req, res) => {
   const firstName = req.body.firstName.toLowerCase();
   const lastName = req.body.lastName.toLowerCase();
   const email = req.body.email.toLowerCase();
   const password = req.body.password;

   if (!firstName || !lastName || !email || !password) {
      res.status(400);
      throw new Error("Please fill all fields");
   }

   const userExist = await User.findOne({ email });

   if (userExist) {
      res.status(400).json("User already exists");
      throw new Error("User already exists");
   }

   // Hash password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);

   const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
   });

   if (user) {
      res.status(201).json({
         _id: user.id,
         name: `${user.firstName} ${user.lastName}`,
         email: user.email,
         token: generateToken(user.id),
      });
   } else {
      res.status(400);
      throw new Error("Invalid user data");
   }
});

// @desc    Authinticate a user
// @route   POST /api/users/signup
// @access  public
const loginUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   const user = await User.findOne({ email });

   if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
         _id: user.id,
         name: `${user.firstName} ${user.lastName}`,
         email: user.email,
         token: generateToken(user.id),
      });
   } else {
      res.status(400);
      throw new Error("Invalid Credentials");
   }
});

/// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id);

   if (user) {
      res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
      });
   } else {
      res.status(404);
      throw new Error("User not found");
   }
});

module.exports = { registerUser, loginUser, getUserProfile };
