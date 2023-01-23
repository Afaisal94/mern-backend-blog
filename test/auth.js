const mongoose = require("mongoose");
const User = require("../models/User");

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../app");

chai.use(chaiHttp);

describe("AUTH", () => {
  /**
   * Test the POST route
   */
  describe("POST", () => {
    it("REGISTER USER", (done) => {
      User.deleteMany({}).then((result) => {
        chai
          .request(app)
          .post("/auth/register")
          .send({
            name: "test",
            email: "test@email.com",
            password: "test",
          })
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            done();
          });
      });
    });

    it("LOGIN USER", (done) => {
      chai
        .request(app)
        .post("/auth/login")
        .send({
          email: "test@email.com",
          password: "test",
        })
        .end((err, res) => {
          expect(err).to.be.null;
          done();
        });
    });
  });
});
