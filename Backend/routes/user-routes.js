const express = require('express')
const { signupUser, loginUser, verifyToken, getUser } = require('../controllers/user-controller')

const router = express.Router()

router.post('/api/signup',signupUser)
router.post('/api/login',loginUser)
router.get('/api/user',verifyToken,getUser)

module.exports = router