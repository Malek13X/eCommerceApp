const express = require("express");
const router = express.Router();
const {
   registerUser,
   loginUser,
   getUserProfile,
} = require("../controllers/userControllerOld");
const { protect } = require("../middlewares/authMiddleware");

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.get("/profile", protect, getUserProfile);

module.exports = router;
