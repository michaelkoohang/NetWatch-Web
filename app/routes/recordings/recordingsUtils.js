const db = require('../../db');
const {map} = require('lodash');
const queries = require('../../res/queries');
const errors = require('../../res/errors');

module.exports = {
  // Get a single recording by ID
  getRecording: (id) => {
    return db.query(queries.select_recording, [id])
      .then(recording => {
        if (recording.length > 0) {
          return module.exports.getFeatures(recording[0])
        } else {
          return []
        }
      })
      .then(data => data)
  },

  // Get all recordings with features included
  getRecordings: () => {
    return db.query(queries.select_recordings)
      .then(rows => Promise.all(map(rows, (row) => module.exports.getFeatures(row))))
      .then(data => data);
  },

  // Get all recordings for a device with features included
  getRecordingsByDevice: (hashId) => {
    return module.exports.getDeviceId(hashId)
      .then(id => {
        return db.query(queries.select_recordings_by_device, [id])
          .then(rows => Promise.all(map(rows, (row) => module.exports.getFeatures(row))))
          .then(data => data);
      });
  },

  // Get all features for a particular recording and return the recording and its features
  getFeatures: (recording) => {
    return db.query(queries.select_feature_recording_id, [recording.id])
      .then(features => ({
        ...recording,
        features
      }));
  },

  // Get a device id based on its generated hash
  getDeviceId: (hash) => {
    return db.query(queries.select_device_id, [hash])
      .then(result => {
        if (result.length > 0) {
          return result[0].id
        } else {
          return -1
        }
      });
  },

  // Insert multiple recordings into the database
  insertRecordings: (recordings, hash) => {
    return module.exports.getDeviceId(hash)
      .then(id => {
        if (id !== -1) {
          return Promise.all(map(recordings, recording => module.exports.insertRecording(recording, id)
              .then(recordingId => module.exports.getRecording(recordingId))
          ))
          .then(data => ({success: 1, data}))
        } else {
          return {success: 0, data: errors.invalid_device_id}
        }
      });
  },

  // Insert a single recording into the database
  insertRecording: (recording, id) => {
    recording = {
      ...recording,
      start: new Date(recording.start),
      end: new Date(recording.end)
    };
    let insertValues = [
      recording.duration,
      recording.distance,
      recording.start, 
      recording.end,
      recording.carrier,
      recording.manufacturer,
      recording.os,
      id
    ]
    // Execute the insertion for a recording and its features and return the same recording.
    return db.query(queries.insert_recording, insertValues)
      .then(insertResult => module.exports.insertFeatures(recording.features, insertResult.insertId));
  },
  
  // Insert all features for a particular recording
  insertFeatures: (features, id) => {
    let new_values = [];
    for (let i = 0; i < features.length; i++) {
      let feature = {
        ...features[i],
        recording_id: id,
        timestamp: new Date(features[i].timestamp)
      };
      let insertValues = [
        feature.timestamp,
        feature.battery,
        feature.network,
        feature.service,
        feature.connected,
        feature.http,
        feature.lat,
        feature.lon,
        feature.accuracy,
        feature.speed,
        feature.recording_id
      ]
      new_values.push(insertValues);
    }

    return db.batch(queries.insert_feature, new_values)
      .then(() => id);
  }
}

