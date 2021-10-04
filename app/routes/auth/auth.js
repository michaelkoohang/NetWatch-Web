
const authUtils = require('./authUtils');
const express = require('express');
const {isNil} = require('lodash');
const router = express.Router();
const utils = require('../utils');
const errors = require('../../res/errors');

const COOKIE_TIMEOUT_HOURS = 12

// Add new device key
router.post('/auth/register', (req, res) => {
  authUtils.register()
    .then(data => res.status(200).json(data))
    .catch(err => utils.handleError(err, req, res));
});

// Login user
router.post('/auth/login', (req, res) => {
  let username = typeof req.body.username !== "undefined" ? req.body.username : "";
  let password = typeof req.body.password !== "undefined" ? req.body.password : "";
  if (username.length > 0 && password.length > 0) {
    authUtils.login(username, password)
      .then(data => {
        // The cookie age input is in milliseconds. This line converts the timeout value
        // from hours to the corresponding value in milliseconds.
        let cookieAge = 60 * 60 * 1000 * COOKIE_TIMEOUT_HOURS;
        res.cookie('token', data.token, {
          maxAge: cookieAge,
          httpOnly: true,
          secure: true,
          sameSite: true
        });
        res.status(data.success === 0 ? 401 : 200).json(data)
      })
      .catch(err => utils.handleError(err, req, res));
  } else {
    res.status(400).json({success: 0, message: errors.missing_credentials});
  }
});

// Logout user
router.post('/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({success: 1, message: "logout successful"});
});

// Verify the user is still logged in
router.post('/auth/verify', (req, res) => {
  let token = req.cookies.token;
  if (isNil(token)) {
    res.status(401).json({success: 0, message: errors.missing_token});
  } else {
    let data = authUtils.verify(token);
    res.status(data.success === 0 ? 401 : 200).json(data);
  }
});

module.exports = router
