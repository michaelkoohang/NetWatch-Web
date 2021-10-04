
module.exports = {
  select_user: "SELECT username, password FROM users WHERE username = ?",
  select_device_id: "SELECT id FROM devices WHERE hash = ?",
  select_recordings_by_device: "SELECT id, duration, distance, start, end, carrier, manufacturer, os FROM recordings where device_id = ?",
  select_recordings: "SELECT id, duration, distance, start, end, carrier, manufacturer, os FROM recordings",
  select_recording: "SELECT id, duration, distance, start, end, carrier, manufacturer, os FROM recordings WHERE id = ?",
  select_features: "SELECT id, timestamp, battery, network, service, connected, http, lat, lon, accuracy, speed, recording_id FROM features",
  select_feature: "SELECT id, timestamp, battery, network, service, connected, http, lat, lon, accuracy, speed, recording_id FROM features WHERE id = ?",
  select_feature_recording_id: "SELECT id, timestamp, battery, network, service, connected, http, lat, lon, accuracy, speed, recording_id FROM features WHERE recording_id = ?",
  insert_recording: "INSERT INTO recordings(duration, distance, start, end, carrier, manufacturer, os, device_id) value (?, ?, ?, ?, ?, ?, ?, ?)",
  insert_feature: "INSERT INTO features(timestamp, battery, network, service, connected, http, lat, lon, accuracy, speed, recording_id) value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  insert_new_device: "insert into devices (hash) values (?)"
}