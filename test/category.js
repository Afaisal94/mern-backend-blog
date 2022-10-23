const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../app");

chai.use(chaiHttp);

const _id = '634ac52719674d1eff47571e';

describe('Category API', () => {

    /**
     * Test the GET route
     */
    describe("GET /categories", () => {
        it("GET ALL Categories", (done) => {
            chai.request(app)
                .get("/categories")
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('categories')
                    expect(res.body.categories[0]).to.have.all.keys('_id', 'name')
                    expect(res.body).to.have.property('total_categories')
                done();
                });
        });

    });


    // /**
    //  * Test the GET (by id) route
    //  */
    describe("GET /categories/:id", () => {
        it("GET CATEGORY BY ID", (done) => {
            chai.request(app)                
                .get("/categories/" + _id)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('name')
                done();
                });
        });

    });
    

    /**
     * Test the POST route
     */
    describe("POST /categories", () => {
        it("POST CATEGORY", (done) => {
            const category = {
                name: "Game"
            };
            chai.request(app)                
                .post("/categories")
                .send(category)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                done();
                });
        });

    });


    // /**
    //  * Test the PUT route
    //  */
    describe("PUT /categories/:id", () => {
        it("PUT UPDATE CATEGORY", (done) => {
            const category = {
                name: "Food"
            };
            chai.request(app)                
                .put("/categories/" + _id)
                .send(category)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                done();
                });
        });   

    });
    

    // /**
    //  * Test the PATCH route
    //  */

    describe("PATCH /categories/:id", () => {
        it("PATCH UPDATE CATEGORY", (done) => {
            const category = {
                name: "F&B"
            };
            chai.request(app)                
                .patch("/categories/" + _id)
                .send(category)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                done();
                });
        });

    });
    

    // /**
    //  * Test the DELETE route
    //  */
    describe("DELETE /categories/:id", () => {
        it("DELETE CATEGORY", (done) => {
            chai.request(app)                
                .delete("/categories/" + _id)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                done();
                });
        });

    });




});
