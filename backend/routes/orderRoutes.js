import express from "express";

const router = express.Router();
import {
   createOrder,
   getAllOrdersByUserId,
   getOrdersByUser,
} from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

router.post("/", protect, createOrder);

router.get("/order", protect, getOrdersByUser);
router.get("/user/:userId", protect, getAllOrdersByUserId);

export default router;
