import { Router } from "express";
import {
   getItems,
   addItem,
   deleteItem,
   uploadImageTest,
} from "../controllers/itemController.js";

const router = Router();

router.get("/", getItems);
router.post("/", addItem);
router.delete("/:id", deleteItem);
router.put("/image", uploadImageTest);

//router.put("/items/:id", updateItem);

export default router;
