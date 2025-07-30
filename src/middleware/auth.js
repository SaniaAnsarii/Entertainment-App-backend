const Jwt = require('jsonwebtoken')
const { User } = require('../models/user.models.js')

// middleware to check authentication 
const isAuthenticated = async (req, res, next) => {
    try {
      const { token } = req.cookies;
  
      if (!token) {
        return res.status(404).json({
          success: false,
          message: 'Token Not Found, Please Login'
        });
      }
  
      const secretToken = process.env.TOKEN;
      const decode = Jwt.verify(token, secretToken);
      req.user = await User.findById(decode._id);
      next();
    } catch (error) {
      console.error("Authentication error:", error.message);
      res.status(500).json({ success: false, message: "Authentication failed" });
    }
  }
  


module.exports = { isAuthenticated }