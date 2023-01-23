const mongoose = require("mongoose");
const Post = require("../models/Post");
const Category = require("../models/Category");

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../app");
const fs = require("fs");

chai.use(chaiHttp);

describe("POST", () => {
  /**
   * Test the POST route
   */
  describe("POST /posts", () => {
    it("CREATE NEW POST", (done) => {
      Category.findOne({})
        .sort("-_id")
        .limit(1)
        .then((category) => {
          chai
            .request(app)
            .post("/posts")
            .set("Content-Type", "application/x-www-form-urlencoded")
            .field("title", "Dummy Post 1")
            .field("category", `${category._id}`)
            .field("content", "Content")
            .field("description", "Description")
            .attach(
              "image",
              fs.readFileSync(`${__dirname}/dummy-img.png`),
              "dummy-img.png"
            )
            .end((err, res) => {
              expect(res).to.have.status(201);
              expect(res.body).to.be.an("object");
              done();
            });
        });
    });
  });

  /**
   * Test the GET route
   */
  describe("GET /posts", () => {
    it("GET ALL POSTS", (done) => {
      chai
        .request(app)
        .get("/posts")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("docs");
          expect(res.body).to.have.property("totalDocs");
          expect(res.body.docs[0]).to.have.all.keys(
            "_id",
            "title",
            "createdAt",
            "content",
            "description",
            "image",
            "imageUrl",
            "slug",
            "category"
          );
          done();
        });
    });

    it("GET ALL POSTS WITH PAGINATION", (done) => {
      chai
        .request(app)
        .get("/posts?paging=true&page=1&limit=10")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("docs");
          expect(res.body).to.have.property("totalDocs");
          expect(res.body.docs[0]).to.have.all.keys(
            "_id",
            "title",
            "createdAt",
            "content",
            "description",
            "image",
            "imageUrl",
            "slug",
            "category",
            "__v"
          );
          done();
        });
    });

    it("GET POST BY ID", (done) => {
      Post.findOne({})
        .sort("-_id")
        .limit(1)
        .then((post) => {
          chai
            .request(app)
            .get(`/posts/${post._id}`)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body).to.be.an("object");
              expect(res.body).to.have.property("_id");
              expect(res.body).to.have.property("title");
              expect(res.body).to.have.property("createdAt");
              expect(res.body).to.have.property("content");
              expect(res.body).to.have.property("image");
              expect(res.body).to.have.property("imageUrl");
              expect(res.body).to.have.property("description");
              expect(res.body).to.have.property("slug");
              expect(res.body).to.have.property("category");
              done();
            });
        });
    });
  });

  // // /**
  // //  * Test the PATCH route
  // //  */

  describe("PATCH /posts/:id", () => {
    it("UPDATE POST BY ID", (done) => {
      Post.findOne({})
        .sort("-_id")
        .limit(1)
        .then((post) => {
          chai
            .request(app)
            .patch(`/posts/${post._id}`)
            .set("Content-Type", "application/x-www-form-urlencoded")
            .field("title", "Dummy Post Updated")
            .field("category", `${post.category}`)
            .field("content", "Content Updated")
            .field("description", "Description Updated")            
            .end((err, res) => {
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
  //   it("DELETE POST BY ID", (done) => {
  //     Post.findOne({})
  //       .sort("-_id")
  //       .limit(1)
  //       .then((post) => {
  //         chai
  //           .request(app)
  //           .delete(`/posts/${post._id}`)
  //           .end((err, res) => {
  //             expect(err).to.be.null;
  //             expect(res).to.have.status(200);
  //             done();
  //           });
  //       });
  //   });
  // });

});