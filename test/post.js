const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../app");
const fs = require('fs');

chai.use(chaiHttp);

const _id = '6348be5a011400f66aa9d25f';

describe('Post API', () => {

    /**
     * Test the GET route
     */
    describe("GET /posts", () => {
        it("GET ALL POSTS", (done) => {
            chai.request(app)
                .get("/posts")
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('posts')
                    expect(res.body.posts[0]).to.have.all.keys('_id', 'title', 'createdAt', 'content', 'description', 'image', 'slug', 'category')
                    expect(res.body).to.have.property('total_posts')
                done();
                });
        });

    });


    // /**
    //  * Test the GET (by id) route
    //  */
    describe("GET /posts/:id", () => {
        it("GET POST BY ID", (done) => {
            chai.request(app)                
                .get("/posts/" + _id)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('_id')
                    expect(res.body).to.have.property('title')
                    expect(res.body).to.have.property('createdAt')
                    expect(res.body).to.have.property('content')
                    expect(res.body).to.have.property('image')
                    expect(res.body).to.have.property('description')
                    expect(res.body).to.have.property('slug')
                    expect(res.body).to.have.property('category')
                done();
                });
        });

    });
    

    /**
     * Test the POST route
     */
    describe("POST /posts", () => {
        it("CREATE POST ", (done) => {
            const image = __dirname + '/dummy-img.png';
            const post = {
                title: "My Today Post",
                category: "6344ec5b78f9caf9accb462e",
                content: "Content My Today Post",
                description: "Description My Today Post",
                image
            };
            chai.request(app)                
                .post("/posts")
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .field('title', post.title)
                .field('category', post.category)
                .field('content', post.content)
                .field('description', post.description)
                .attach('image', fs.readFileSync(post.image), 'dummy-img.png')
                .end((err, res) => {
                    expect(err).to.be.null
                    // expect(res).to.have.status(201)
                done();
                });
        });

    });
    

    // // /**
    // //  * Test the PATCH route
    // //  */

    describe("PATCH /posts/:id", () => {
        it("PATCH UPDATE POST", (done) => {
            const image = __dirname + '/dummy-img.png';
            const post = {
                title: "My Today Post Updated",
                category: "6344ec5b78f9caf9accb462e",
                content: "Content My Today Post Updated",
                description: "Description My Today Post Updated",
                image
            };
            chai.request(app)                
                .patch("/posts/" + _id)
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .field('title', post.title)
                .field('category', post.category)
                .field('content', post.content)
                .field('description', post.description)
                .attach('image', fs.readFileSync(post.image), 'dummy-img.png')
                .end((err, res) => {
                    // expect(err).to.be.null
                    expect(res).to.have.status(201)
                done();
                });
        });   

    });
    

    // // /**
    // //  * Test the DELETE route
    // //  */
    describe("DELETE /posts/:id", () => {
        it("DELETE POST", (done) => {
            chai.request(app)                
                .delete("/posts/" + _id)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                done();
                });
        });

    });




});
