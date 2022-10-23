const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../app");

chai.use(chaiHttp);

const _id = '634ac251995905470ea94c13';

describe('Comment API', () => {

    /**
     * Test the GET route
     */
    describe("GET /comments", () => {
        it("GET ALL Comments", (done) => {
            chai.request(app)
                .get("/comments")
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('comments')
                    expect(res.body.comments[0]).to.have.property('_id')
                    expect(res.body.comments[0]).to.have.property('comment')
                    expect(res.body.comments[0].post).to.have.property('title')
                    expect(res.body).to.have.property('total_comments')
                done();
                });
        });

    });


    // /**
    //  * Test the GET (by id) route
    //  */
    describe("GET /comments/:id", () => {
        it("GET COMMENT BY ID", (done) => {
            chai.request(app)                
                .get("/comments/" + _id)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('comment')
                    expect(res.body).to.have.property('post')
                done();
                });
        });

    });
    

    // /**
    //  * Test the POST route
    //  */
    describe("POST /comments", () => {
        it("POST COMMENT", (done) => {
            const comment = {
                comment: "The New Comment",
                post: '6345384e61df5aea6cc9531f'
            };
            chai.request(app)                
                .post("/comments")
                .send(comment)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                done();
                });
        });

    });
    

    // // /**
    // //  * Test the DELETE route
    // //  */
    describe("DELETE /comments/:id", () => {
        it("DELETE COMMENT", (done) => {
            chai.request(app)                
                .delete("/comments/" + _id)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                done();
                });
        });

    });




});
