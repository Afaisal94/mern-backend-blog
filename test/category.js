const mongoose = require("mongoose");
const Category = require("../models/Category");

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../app");

chai.use(chaiHttp);

describe("CATEGORY", () => {
  /**
   * Test the POST route
   */
  describe("POST", () => {
    it("CREATE NEW CATEGORY", (done) => {
      const category = {
        name: "Dummy Category",
      };
      chai
        .request(app)
        .post("/categories")
        .send(category)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          done();
        });
    });
  });

  /**
   * Test the GET route
   */
  describe("GET", () => {
    it("GET ALL CATEGORIES", (done) => {
      chai
        .request(app)
        .get("/categories")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("docs");
          expect(res.body).to.have.property("totalDocs");
          expect(res.body.docs[0]).to.have.all.keys("_id", "name");
          done();
        });
    });

    it("GET ALL CATEGORIES WITH PAGINATION", (done) => {
      chai
        .request(app)
        .get("/categories?paging=true")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("docs");
          expect(res.body).to.have.property("totalDocs");
          expect(res.body.docs[0]).to.have.all.keys("_id", "name", "__v");
          done();
        });
    });

    it("GET CATEGORY BY ID", (done) => {
      Category.findOne({})
        .sort("-_id")
        .limit(1)
        .then((category) => {
          chai
            .request(app)
            .get(`/categories/${category._id}`)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body).to.have.property("_id");
              expect(res.body).to.have.property("name");
              done();
            });
        });
    });

    it("GET CATEGORY BY NAME", (done) => {
      Category.findOne({})
        .sort("-_id")
        .limit(1)
        .then((category) => {
          chai
            .request(app)
            .get(`/categories?name=${category.name}`)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body).to.be.an("object");
              expect(res.body).to.have.property("docs");
              expect(res.body).to.have.property("totalDocs");
              expect(res.body.docs[0]).to.have.all.keys("_id", "name");
              done();
            });
        });
    });
  });

  // /**
  //  * Test the PATCH route
  //  */

  describe("PATCH", () => {
    it("UPDATE CATEGORY BY ID", (done) => {
      Category.findOne({})
        .sort("-_id")
        .limit(1)
        .then((category) => {
          chai
            .request(app)
            .patch(`/categories/${category._id}`)
            .send({
              name: "Dummy Category Updated",
            })
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(201);
              done();
            });
        });
    });
  });

  /**
   * Test the DELETE route
   */
  
  // describe("DELETE", () => {
  //   it("DELETE CATEGORY BY ID", (done) => {
  //     Category.findOne({})
  //       .sort("-_id")
  //       .limit(1)
  //       .then((category) => {
  //         chai
  //           .request(app)
  //           .delete(`/categories/${category._id}`)
  //           .end((err, res) => {
  //             expect(err).to.be.null;
  //             expect(res).to.have.status(200);
  //             done();
  //           });
  //       });
  //   });
  // });

});
