const express = require('express')
const { signupUser, loginUser, verifyToken, getUser, refreshToken, logOut } = require('../controllers/user-controller')

const router = express.Router()

router.post('/api/signup',signupUser)
router.post('/api/login',loginUser)
router.get('/api/user',verifyToken,getUser)
router.get('/api/refresh',refreshToken,verifyToken,getUser)
router.post('/api/logout',logOut)

module.exports = router