const mongoose = require("mongoose");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const fs = require("fs");

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../app");

chai.use(chaiHttp);

require('./post')

describe("COMMENT", () => {
  /**
   * Test the POST route
   */
  describe("POST", () => {
    it("CREATE NEW COMMENT", (done) => {
      Post.findOne({})
        .sort("-_id")
        .then((data) => {
          chai
            .request(app)
            .post("/comments")
            .send({
              comment: "Dummy Comment",
              post: `${data._id}`,
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
   * Test the GET route
   */
  describe("GET", () => {
    it("GET ALL COMMENTS", (done) => {
      chai
        .request(app)
        .get("/comments")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("docs");
          expect(res.body).to.have.property("totalDocs");
          expect(res.body.docs[0]).to.have.all.keys(
            "_id",
            "comment",
            "post",
            "createdAt"
          );
          done();
        });
    });

    it("GET ALL COMMENTS WITH PAGINATION", (done) => {
      chai
        .request(app)
        .get("/comments?paging=true")
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("docs");
          expect(res.body).to.have.property("totalDocs");
          expect(res.body.docs[0]).to.have.all.keys(
            "_id",
            "comment",
            "post",
            "createdAt",
            "__v"
          );
          done();
        });
    });

    it("GET COMMENT BY ID", (done) => {
      Comment.findOne({})
        .sort("-_id")
        .limit(1)
        .then((comment) => {
          chai
            .request(app)
            .get(`/comments/${comment._id}`)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body).to.be.an("object");
              expect(res.body).to.have.property("_id");
              expect(res.body).to.have.property("comment");
              expect(res.body).to.have.property("post");
              done();
            });
        });
    });

    it("GET COMMENT BY POST ID", (done) => {
      Comment.findOne({})
        .sort("-_id")
        .limit(1)
        .then((comment) => {
          chai
            .request(app)
            .get(`/comments/post/${comment.post}`)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body).to.be.an("object");
              expect(res.body).to.have.property("docs");
              expect(res.body).to.have.property("totalDocs");
              done();
            });
        });
    });
  });

  /**
   * Test the DELETE route
   */

  // describe("DELETE", () => {
  //   it("DELETE COMMENT BY ID", (done) => {
  //     Comment.findOne({})
  //       .sort("-_id")
  //       .limit(1)
  //       .then((comment) => {
  //         chai
  //           .request(app)
  //           .delete(`/comments/${comment._id}`)
  //           .end((err, res) => {
  //             expect(err).to.be.null;
  //             expect(res).to.have.status(200);
  //             done();
  //           });
  //       });
  //   });
  // });
  
});
