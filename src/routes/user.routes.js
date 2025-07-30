const express = require('express')
const { isAuthenticated } = require('../middleware/auth.js')
const { userRegister, userLogin, userLogout, userProfile, getUserById } = require('../controllers/user.controllers.js')

// router instances 
const userRouter = express.Router();

// user routes 
userRouter.post('/user/register', userRegister);
userRouter.post('/user/login', userLogin);
userRouter.get('/user/logout', userLogout);

// Test route (no authentication required)
userRouter.get('/user/test', (req, res) => {
    res.json({ success: true, message: 'User routes are working!' });
});

// Specific routes must come before parameterized routes to avoid conflicts
userRouter.get('/user/profile', isAuthenticated, userProfile);
userRouter.get('/user/:id', isAuthenticated, getUserById)

// exporting 
module.exports = { userRouter }