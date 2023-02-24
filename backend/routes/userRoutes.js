const express = require("express");
const router = express.Router();
const {
   loginUser,
   registerUser,
   getUserProfile,
   updateUserProfile,
   getUsers,
   deleteUser,
   getUserById,
   updateUser,
} = require("../controllers/userController");
const {
   protect,
   admin,
   authLimiter,
} = require("../middlewares/authMiddleware");

// Public Routes
router.post("/login", authLimiter, loginUser);
router.post("/register", authLimiter, registerUser);

// Protected Routes
router.use(protect);

router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);

// Admin Routes
router.use(admin);

router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);

module.exports = router;
