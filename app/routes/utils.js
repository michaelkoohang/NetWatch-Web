
const jwt = require('jsonwebtoken');
const winston = require('../res/winston');

module.exports = {
  handleError: (err, req, res) => {
    winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    res.status(500).json({success: 0, message: err.message});
    throw err;
  },
  authenticateToken: (req, res, next) => {
    let cookies = req.cookies
    if (typeof(cookies) === "undefined") return res.sendStatus(401);
    let token = cookies.token
    if (typeof(token) === "undefined") return res.sendStatus(401);

    jwt.verify(token, process.env.SECRET, (err) => {
      if (err) return res.sendStatus(403);
      next(); 
    });
  }
}

