import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
   createCart,
   addItemToCart,
   removeItemFromCart,
   getCart,
} from "../controllers/cartController.js";

const router = Router();

router.use(protect);
router.get("/", getCart);
router.post("/", createCart);
router.put("/items/:id", addItemToCart);
router.delete("/items/:id", removeItemFromCart);

export default router;
