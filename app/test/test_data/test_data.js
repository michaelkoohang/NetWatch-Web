
module.exports = {
  user: {
    username: "michael",
    password: "Atw8#hg534"
  },
  user_query: "INSERT INTO netwatch.users (id, username, password) VALUES (1, 'michael', '1eb98c7ba5800f1bcc4e8b3cbe3f61d3ac79940aa430a15f4af888b41d7f9c66')",
  device: "INSERT INTO netwatch.devices (id, hash) VALUES (1, 'fe2e207f8d835947f95e394c480f4ece7069764bf7c2f315cd8b359286b80b1e')",
  device_id: "i3unl1uy",
  recording1: "INSERT INTO netwatch.recordings (id, duration, distance, start, end, carrier, manufacturer, os, device_id) VALUES (1, 10765, 9.255294683692044, '2020-06-19 15:47:46', '2020-06-19 18:47:12', 'T-Mobile', '', '9', 1);",
  recording2: "INSERT INTO netwatch.recordings (id, duration, distance, start, end, carrier, manufacturer, os, device_id) VALUES (2, 6556, 4.915059147801148, '2020-07-13 16:01:20', '2020-07-13 17:50:36', 'null', '', '9', 1);",
  feature1: "INSERT INTO netwatch.features (id, timestamp, http, connected, service, battery, network, lat, lon, accuracy, speed, recording_id) VALUES (1, '2020-06-19 15:47:46', 1, 1, 1, 100, 'LTE', 34.2296417, -84.1609658, 27.625999450683594, 0.39449188113212585, 1);",
  feature2: "INSERT INTO netwatch.features (id, timestamp, http, connected, service, battery, network, lat, lon, accuracy, speed, recording_id) VALUES (2, '2020-07-13 16:01:20', 1, 1, 1, 86, 'LTE', 35.7999271, -105.7770062, 18.224000930786133, 0.14136070013046265, 2);",
  new_recording: [
    {
      duration: 1777,
      distance: 4.400364537657207,
      start: "2020-06-28T00:32:06+0000",
      end: "2020-06-28T01:01:44+0000",
      carrier: "T-Mobile",
      manufacturer: "",
      os: "9",
      features: [
        {
          timestamp: "2020-06-28T00:32:06+0000",
          http: true,
          connected: true,
          service: true,
          battery: 100,
          network: "LTE",
          lat: 32.532987,
          lon: -83.7101085,
          accuracy: 5.473999977111816,
          speed: 0
        }
      ]
    }
  ]
};