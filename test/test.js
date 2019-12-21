require("dotenv").config({
  path: "./.env"
});

const DB_HOST = process.env.DB_HOST;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT;
const supertest = require("supertest");
const expect = require("chai").expect;

const fs = require("fs");

var server = supertest.agent("http://localhost:8080");

describe("App", () => {
  let postId;
  let postUniqueSlug;
  let postName;
  let categoryId;
  let categoryTitle;

  it("get news list", done => {
    server
      .get("/?page=1&limit=100")
      .set("Authorization", "Bearer a")
      .expect(200)
      .expect(res => {
        expect(res).not.to.be.empty;
      })
      .end(done);
  });

  it("add news category", done => {
    const data = {
      name: "aaazxcaaaaaaa",
      description: "bbb"
    };
    server
      .post("/categories")
      .set("Authorization", "Bearer a")
      .send(data)
      .expect(200)
      .expect(res => {
        categoryId = res.body.result.id;
        categoryTitle = res.body.result.name;
        expect(res.body.result.name).to.be.equal(data.name);
        expect(res.body.result.description).to.be.equal(data.description);
        // console.log(categoryId);
        // console.log(categoryTitle);
      })
      .end(done);
  });

  it("add news post", done => {
    const data = {
      title: "newspost",
      description: "bbb",
      categoryId: categoryId
    };
    server
      .post("/")
      .set("Authorization", "Bearer a")
      .send(data)
      .expect(200)
      .expect(res => {
        postId = res.body.result.post.id;
        postUniqueSlug = res.body.result.post.slug;
        postName = res.body.result.post.title;
        expect(res.body.result.post.title).to.be.equal(data.title);
        expect(res.body.result.post.description).to.be.equal(data.description);
        expect(res.body.result.post.categoryId).to.be.equal(data.categoryId);
        // console.log(postId);
        // console.log(postUniqueSlug);
      })
      .end(done);
  });

  it("get news post by ID", done => {
    server
      .get("/id/" + postId)
      .set("Authorization", "Bearer a")
      .expect(200)
      .expect(res => {
        // console.log(res.body.result);
        expect(res.body.result[0].id).to.be.equal(postId);
        expect(res.body.result[0].slug).to.be.equal(postUniqueSlug);
        expect(res.body.result[0].categoryId).to.be.equal(categoryId);
      })
      .end(done);
  });

  it("get news by unique slug", done => {
    server
      .get("/slug/" + postUniqueSlug)
      .set("Authorization", "Bearer a")
      .expect(200)
      .expect(res => {
        // console.log(res.body.result[0]);
        expect(res.body.result[0].id).to.be.equal(postId);
        expect(res.body.result[0].slug).to.be.equal(postUniqueSlug);
        expect(res.body.result[0].categoryId).to.be.equal(categoryId);
      })
      .end(done);
  });

  it("get news by category name", done => {
    server
      .get("/categoryid/" + categoryTitle)
      .set("Authorization", "Bearer a")
      .expect(200)
      .expect(res => {
        // console.log(res.body.result[0]);
        expect(res.body.result[0].title).to.be.equal(postName);
        expect(res.body.result[0].slug).to.be.equal(postUniqueSlug);
        expect(res.body.result[0].id).to.be.equal(postId);
      })
      .end(done);
  });

  it("Edit post by ID", done => {
    const data = {
      title: "ahasd",
      description: "dddd"
    };
    server
      .put("/" + postId)
      .set("Authorization", "Bearer a")
      .send(data)
      .expect(200)
      .expect(res => {
          console.log(res.body)
      })
      .end(done);
  });

  it("get All category", done => {
    server
      .get("/categories")
      .set("Authorization", "Bearer a")
      .expect(200)
      .expect(res => {
        expect(res).not.to.be.empty;
      })
      .end(done);
  });
  it("delete post by id ", done => {
    server
      .delete("/" + postId)
      .set("Authorization", "Bearer a")
      .expect(200)
      .expect(res => {
        // console.log(res.body);
      })
      .end(done);
  });

  it("delete categories", done => {
    server
      .delete("/categories/" + categoryId)
      .set("Authorization", "Bearer a")
      .expect(200)
      .expect(res => {
        expect(res.body.result).to.be.equal(1);
      })
      .end(done);
  });
});
