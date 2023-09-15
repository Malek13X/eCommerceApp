import express from "express";

const router = express.Router();
import {
   createOrder,
   getAllOrdersByUserId,
   getOrdersByUser,
} from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

// Create a new order
router.post("/", protect, createOrder);

// Get orders for a specific user
router.get("/order", protect, getOrdersByUser);
router.get("/user/:userId", protect, getAllOrdersByUserId);

export default router;
