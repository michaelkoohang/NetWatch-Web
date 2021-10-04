module.exports = {
    select_device_info: "SELECT carrier, manufacturer, os FROM recordings WHERE device_id = ? AND start = (SELECT MAX(start) FROM recordings WHERE device_id = ?)",
    select_devices: "SELECT * FROM devices",
    select_recordings: "SELECT * FROM recordings",
    select_features: "SELECT * FROM features",
    select_feature_recording_id: "SELECT * FROM features WHERE recording_id = ?"
}