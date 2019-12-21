const express = require('express');
const router = express.Router();

const controller = require('../controllers/post');
// const validator = require('../middlewares/validator');

// Get news list
router.get('/', controller.getList);

// Get new by Categories 
router.get('/categoryid/:id', controller.getNewsByCategoryId);
 
// Get news by id
router.get('/id/:postID', controller.getDetail);

// Get news by unique slug
router.get('/slug/:slug', controller.getDetail);

// Add new post          validator.newPost
router.post('/', controller.createPost);

// // Edit post          validator.editPost
router.put('/:postID', controller.editPost);

// Delete 
router.delete('/:postID', controller.deletePost);

// Add new categories
router.post('/categories', controller.postCategories);

// Get all categories
router.get('/categories', controller.getCategories);

// Delete categories
router.delete('/categories/:categoriesId', controller.deleteCategoryById);

// Edit categories
router.put('/categories/:categoriesId', controller.editCategory);

module.exports = router;