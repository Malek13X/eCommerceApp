const express = require('express')
const router = express.Router()
const { signUpUser, signInUser, getMe } = require('../controller/userController')
const { protect } = require('../middleware/authMiddleware');

router.post('/sign-up', signUpUser)
router.post('/sign-in', signInUser) 
router.get('/me', protect, getMe)

module.exports = router