
const app = require("../../app.js");
const db = require('../../db');
const recordingsData = require('../test_data/recordings');
const http = require('http');
const newRecording = require('../test_data/new_recording');
const request = require('supertest');
const testData = require('../test_data/test_data');

let server;

beforeAll(done => {
  db.query("DELETE FROM recordings;");
  db.query("DELETE FROM features;");
  db.query("DELETE FROM devices;");
  db.query(testData.device);
  db.query(testData.recording1);
  db.query(testData.recording2);
  db.query(testData.feature1);
  db.query(testData.feature2);
  server = http.createServer(app);
  server.listen(done);
  done();
});

afterAll(done => {
  db.query("DELETE FROM recordings;");
  db.query("DELETE FROM features;");
  db.query("DELETE FROM devices;");
  db.query("ALTER TABLE hikes AUTO_INCREMENT = 1;");
  db.query("ALTER TABLE features AUTO_INCREMENT = 1;");
  db.query("ALTER TABLE devices AUTO_INCREMENT = 1;");
  db.end()
  server.close(done)
  done();
});

describe("Test the recordings routes", () => {

  it("should retrieve all recordings", done => { 
    return request(app)
      .get("/api/recordings")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual(recordingsData);
        done();
      });
  });

  it("should retrieve all recordings with device_id", done => {
    return request(app)
      .get("/api/recordings")
      .set('Device-Id', testData.device_id)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual(recordingsData);
        done();
      });
  });

  it("should retrieve recording with id = 1", done => { 
    return request(app)
      .get("/api/recordings/1")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual(recordingsData[0]);
        done();
      });
  });

  it("should create a new recording", done => { 
    return request(app)
      .post("/api/recordings")
      .set('Device-Id', testData.device_id)
      .send(testData.new_recording)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toStrictEqual(newRecording);
        done();
      });
  });

});

