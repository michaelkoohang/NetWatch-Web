const express = require('express');
const router = express.Router();
const featuresUtils = require('./featuresUtils');
const utils = require('../utils');

// Get all features
router.get('/features', (req, res) => {
  featuresUtils.getFeatures()
    .then(data => res.status(200).json(data))
    .catch(err => utils.handleError(err, req, res));
});

// Get a single feature
router.get('/features/:id', (req, res) => {
  featuresUtils.getFeature(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => utils.handleError(err, req, res));
});

module.exports = router