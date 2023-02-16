const express = require("express");
const router = express.Router();
const {
   authUser,
   registerUser,
   getUserProfile,
   updateUserProfile,
   getUsers,
   deleteUser,
} = require("../controller/userController2");
const { protect, admin } = require("../middleware/authMiddleware2");

const rateLimit = require("express-rate-limit");

// Rate limiting middleware
const authLimiter = rateLimit({
   windowMs: 15 * 60 * 1000, // 15 minutes
   max: 5, // limit each IP to 5 requests per windowMs
   message: "Too many login attempts. Please try again later.",
});

router.post("/login", authLimiter, authUser);
router.route("/").post(registerUser).get(protect, admin, getUsers);
router
   .route("/profile")
   .get(protect, getUserProfile)
   .put(protect, updateUserProfile);
router.route("/:id").delete(protect, admin, deleteUser);

module.exports = router;
