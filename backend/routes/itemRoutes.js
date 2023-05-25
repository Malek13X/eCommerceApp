import { Router } from "express";
import {
   getItems,
   updateItem,
   addItem,
   deleteItem,
   uploadImageTest,
} from "../controllers/itemController.js";
import { admin } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", getItems);

router.use(admin);
router.post("/", addItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);
router.put("/image", uploadImageTest); // ? TESTING REQUEST ONLY

//router.put("/items/:id", updateItem);

export default router;
