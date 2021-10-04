const app = require("../../app.js");
const db = require('../../db');
const http = require('http');
const request = require('supertest');
const testData = require('../test_data/test_data');

let server;

beforeAll(done => {
  db.query("DELETE FROM users;");
  db.query(testData.user_query);
  server = http.createServer(app);
  server.listen();
  done();
});

afterAll(done => {
  db.query("DELETE FROM users;");
  db.end();
  server.close(done);
  done();
});

describe("Test the auth routes", () => {

  it("should register a new device", done => { 
    return request(app)
      .post("/api/auth/register")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({id: expect.any(String)});
        done();
      });
  });

  it("should login a user", done => { 
    return request(app)
      .post("/api/auth/login")
      .send({username: testData.user.username, password: testData.user.password})
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({success: 1, token: expect.any(String)});
        done();
      });
  });

  it("should logout a user", done => { 
    return request(app)
      .post("/api/auth/logout")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({success: 1, message: expect.any(String)});
        done();
      });
  });

  it("should verify a user", done => { 
    return request(app)
      .post("/api/auth/login")
      .send({username: testData.user.username, password: testData.user.password})
      .then(data => {
        return request(app)
        .post("/api/auth/verify")
        .set('Cookie', [`token=${data.body.token}`])
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.body).toMatchObject({success: 1, message: expect.any(String)});
          done();
        });
      });
    
  });

});