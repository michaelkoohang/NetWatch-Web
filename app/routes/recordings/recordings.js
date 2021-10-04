const crypto = require('crypto');
const express = require('express');
const router = express.Router();
const recordingsUtils = require('./recordingsUtils');
const utils = require('../utils');

// Get all recordings, along with their features
router.get('/recordings', (req, res) => {
  if ("device-id" in req.headers) {
    const hashId = crypto.createHmac('sha256', process.env.SECRET)
      .update(req.headers["device-id"])
      .digest('hex');
    recordingsUtils.getRecordingsByDevice(hashId)
      .then(data => res.status(200).json(data))
      .catch(err => utils.handleError(err, req, res));
  } else {
    recordingsUtils.getRecordings(req, res)
      .then(data => res.status(200).json(data))
      .catch(err => utils.handleError(err, req, res));
  }
});

// Get single recording by id, along with its features
router.get('/recordings/:id', (req, res) => {
  recordingsUtils.getRecording(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => utils.handleError(err, req, res));
});

// Create a new recording
router.post('/recordings', (req, res) => {
  const recordings = req.body;
  if (recordings && "device-id" in req.headers) {
    const hash = crypto.createHmac('sha256', process.env.SECRET)
      .update(req.headers["device-id"])
      .digest('hex');
    recordingsUtils.insertRecordings(recordings, hash)
      .then(data => res.status(200).json(data))
      .catch(err => utils.handleError(err, req, res));
  } else {
    res.status(400).json({success: 0, data: "no hike data found or missing device id in headers"});
  }
});

module.exports = router
