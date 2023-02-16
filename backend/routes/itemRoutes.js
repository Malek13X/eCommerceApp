const { Router } = require("express");
const { getItems, postItem, updateItem, deleteItem } = require("../controllers/itemControllers");
const router = Router();

router.get("/items", getItems);
router.post("/items", postItem);
router.put("/items/:id", updateItem);
router.delete("/items/:id", deleteItem);

module.exports = router;
