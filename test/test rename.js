// require('dotenv').config({
//   path: './.env'
// });
// const DB_HOST = process.env.DB_HOST;
// const DB_USERNAME = process.env.DB_USERNAME;
// const DB_PASSWORD = process.env.DB_PASSWORD;
// const DB_NAME = process.env.DB_NAME;
// const request = require('supertest');
// const chai = require('chai');
// const expect = chai.expect;
// const assert = require('chai').assert;
// const app = require('../app');
// const should = chai.should();
// const post = require('../src/models/post')
// const Sequelize = require('sequelize');
// const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
//   host: DB_HOST,
//   dialect: 'mysql'
// });
// const tests = sequelize.define('tests', sequelize.models.tests)
// // const SequelizeMock = require('sequelize-mock');
// // const dbMock = new SequelizeMock();
// // const postMock=dbMock.define('posts',sequelize.models.posts,{
// //   instanceMethods: {
// //     getPost : function() {return this.get('title') + ' ' + this.get('content') + ' ' + this.get('slug')}
// //   }
// // })

// // const proxyquire = require('proxyquire');

// // describe('Get posts', function() {
// //   it('should return title & content', function (done){
// //     postMock.getDetail(1,'').then(function(result) {
// //       console.log(result);
// //       done();
// //     }).catch(done);
// //   })
// // })

// // describe('Test insert', function () {
// //   const data = {
// //     title: 'alibaba',
// //     content: 'asdasdasd'
// //   }

// //   it('inserted post should appear on database', (done) => {
// //     post.testcreateRecord(data);
// //     sequelize.query('SELECT * FROM tests WHERE title = ?', {
// //       replacements: [data.title],
// //       type: sequelize.QueryTypes.SELECT
// //     }).then(tests => {
// //       expect(tests).to.not.be.empty;
// //       done();
// //     });
// //   })
// // });

// // describe('Test select', function () {
// //   const id = '5';
// //   const slug = '4-ly-do-vi-sao-blended-learning-hieu-qua';
// //   it('1 - get posts by slug could return not null', (done) => {
// //     sequelize.query('SELECT * FROM tests WHERE slug = ?', {
// //       replacements: [slug],
// //       type: sequelize.QueryTypes.SELECT
// //     }).then((tests) => {
// //       expect(tests).to.not.be.empty;
// //       // assert.equal(posts, test );
// //       done();
// //     });
// //   });
// //   it('2 - get posts by id could return not null', (done) => {
// //     sequelize.query('SELECT * FROM tests WHERE id = ?', {
// //       replacements: [id],
// //       type: sequelize.QueryTypes.SELECT
// //     }).then((tests) => {
// //       // console.log(posts);
// //       expect(tests).to.not.be.empty;
// //       // assert.equal(posts, test );
// //       done();
// //     });
// //   });
// // });


// describe('Test insert', function () {
//   const data = {
//     title: 'alibaba',
//     content: 'asdasdasd'
//   };
//   const userId = '111';
//   const slug = 'test-create-recode';

//   it('inserted post should appear on database', (done) => {
//     post.createRecord(data, userId, slug);
//     sequelize.query('SELECT * FROM tests WHERE title = ?', {
//       replacements: [data.title],
//       type: sequelize.QueryTypes.SELECT
//     }).then(tests => {
//       expect(tests).to.not.be.empty;
//       done();
//     });
//   })
// });


// describe('Test delete', function () {
//   const id = '10';
//   it('deleted post does not appear on database', (done) => {
//     post.delete(10);
//     // sequelize.query('DELETE FROM posts WHERE id = ?', {
//     //   replacements: [id],
//     //   type: sequelize.QueryTypes.DELETE
//     // });
//     sequelize.query('SELECT * FROM posts WHERE id = ?', {
//       replacements: [id],
//       type: sequelize.QueryTypes.SELECT
//     }).then(posts => {
//       expect(posts).to.be.empty;
//       done();
//     });
//   });

  
// });






// // describe('Test get list', function () {
// //   const limit = 3;
// //   const page = 1;
// //   const offset = (page - 1) * limit;
// //   it('get list return not null', (done) => {
// //     sequelize.query('SELECT * FROM posts LIMIT ? OFFSET ?', {
// //       replacements: [limit, offset],
// //       type: sequelize.QueryTypes.SELECT
// //     }).then(posts => {
// //       expect(posts).to.not.be.empty;
// //       done();
// //     });
// //   });
// //   it('get list return exact number of posts', (done) => {
// //     sequelize.query('SELECT * FROM posts LIMIT ? OFFSET ?', {
// //       replacements: [limit, offset],
// //       type: sequelize.QueryTypes.SELECT
// //     }).then(posts => {
// //       expect(posts).to.have.length(3);
// //       done();
// //     });
// //   });
// // });


