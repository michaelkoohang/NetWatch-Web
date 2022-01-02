const express = require('express');
const router = express.Router();
const dashUtils = require('./dashUtils');
const utils = require('../utils');

// Get all recordings for the dashboard
router.get('/recordings', utils.authenticateToken, (req, res) => {
  dashUtils.getRecordings()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      utils.handleError(err, req, res);
    });
});

// Get all features for the dashboard
router.get('/features', utils.authenticateToken, (req, res) => {
  dashUtils.getFeatures()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      utils.handleError(err, req, res);
    });
});

// Get all devices for the dashboard
router.get('/devices', utils.authenticateToken, (req, res) => {
  dashUtils.getDevices()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      utils.handleError(err, req, res);
    });
});

module.exports = router
