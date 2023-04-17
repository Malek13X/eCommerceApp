import express from "express";

import {
   loginUser,
   registerUser,
   getUserProfile,
   updateUserProfile,
   getUsers,
   deleteUser,
   getUserById,
   updateUser,
} from "../controllers/userController.js";

import { protect, admin, authLimiter } from "../middlewares/authMiddleware.js";

const router = express.Router();

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

export default router;
