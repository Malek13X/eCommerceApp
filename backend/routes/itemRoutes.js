const { Router } = require("express");
const { addItem} = require("../controllers/itemController");
const router = Router();

//router.get("/items", getItems);
router.post("/", addItem);
//router.put("/items/:id", updateItem);
//router.delete("/items/:id", deleteItem);

module.exports = router;
