const db = require('../../db');
const {map} = require('lodash');
const queries = require('../../res/dashQueries');

module.exports = {
  getRecordings: () => {
    return db.query(queries.select_recordings)
    .then(rows => {
      return Promise.all(map(rows, (recording) => {
        return db.query(queries.select_feature_recording_id, [recording.id])
          .then(features => ({
            ...recording,
            features
          }));
      }));
    })
    .then(data => data);
  },
  getFeatures: () => {
    return db.query(queries.select_features)
      .then(data => data);
  },
  getDevices: () => {
    return db.query(queries.select_devices)
      .then(devices => (
        Promise.all(map(devices, device => (
          db.query(queries.select_device_info, [device.id, device.id])
            .then(result => {
              // The resulting device might not have recorded any recordings yet, meaning there is no carrier,
              // manufacturer, or os information for that device. The data is organized this way so that
              // if someone changes their device in the future, we can track that change through their recordings
              // instead of overwriting the device information in the devices table.
              if (result.length > 0) {
                let new_device = {
                  ...result[0],
                  timestamp: device.created_on
                }
                return new_device;
              } else {
                return {timestamp: device.created_on, carrier: "Unknown", manufacturer: "Unknown", os: "Unknown"}
              }
            })
        )))
      ))
      .then(data => data);
  }
}

