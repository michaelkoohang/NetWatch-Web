const app = require("../../app.js");
const db = require('../../db');
const featuresData = require('../test_data/features');
const http = require('http');
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
  done()
});

describe("Test the features routes", () => {

  it("should retrieve all features", done => { 
    return request(app)
      .get("/api/features")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual(featuresData);
        done();
      });
  });

  it("should retrieve feature with id = 1", done => { 
    return request(app)
      .get("/api/features/1")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual([featuresData[0]]);
        done();
      });
  });

});