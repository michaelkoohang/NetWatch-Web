const db = require('../../db');
const queries = require('../../res/queries');

module.exports = {
   // Get all features
   getFeatures: () => {
    return db.query(queries.select_features)
      .then(data => data);
  },

  // Get a single feature by id
  getFeature: (id) => {
    return db.query(queries.select_feature, [id])
      .then(data => data);
  }
 
}

