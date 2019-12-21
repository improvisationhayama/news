// const createError = require('http-errors');
// const params = require('../params');
// const moment = require('moment');
// const classModel = require('../models/news');
// const bookingService = require('./booking');
// const externalService = require('./external');
// const notiService = require('./notification');
// const randomstring = require('randomstring');
const post = require('../models/post');
const utilities = require('../utilities');

exports.getList = query => {
    try {
        return post.getList(query);
    } catch (error) {
        throw error;
    }
};

exports.getDetail = (postID, slugs) => {
    // console.log(Process.getDetail(postID));
    try {
        return post.getDetail(postID, slugs);
    } catch (error) {
        throw error;
    }
};

// exports.getPostBySlug = (slug) => {
//     return post.getPostBySlug(slug);
// };

exports.createPost = (data, userID) => {
    try {
        const slugs = [];
        const random = utilities.makeKey(6);
        slugs[1] = utilities
            .removeMark(data.title)
            .toLowerCase()
            .replace(/ /g, '-');
        slugs[2] = slugs[1].concat('-').concat(random);
        // console.log(title);
        // console.log(data);
        // console.log(slug);
        // console.log(uniqueSlug);
        return post.createRecord(data, userID, slugs);
    } catch (error) {
        throw error;
    }
};

exports.editPost = (postID, userID, data) => {
    if (data.title !== undefined) {
        const slugs = [];
        const random = utilities.makeKey(6);
        slugs[1] = utilities
            .removeMark(data.title)
            .toLowerCase()
            .replace(/ /g, '-');
        slugs[2] = slugs[1].concat('-').concat(random);
        // console.log(title);
        // console.log(data);
        // console.log(slug);
        // console.log(uniqueSlug);
        return post.updateWithTitle(postID, userID, data, slugs);
    } else return post.updateWithoutTitle(postID, userID, data);
};

exports.publishPost = postID => {
    sequelize.models.posts.update(
        {
            isPublished: true
        },
        {
            where: {
                id: postID
            }
        }
    );
};

exports.deletePost = postID => {
    return post.delete(postID);
};

exports.getCategories = () => {
    try {
        return post.getListCategories();
    } catch (error) {
        throw error;
    }
};

exports.postCategories = data => {
    // console.log(data);
    try {
        return post.postListCategories(data);
    } catch (error) {
        throw error;
    }
};

exports.getNewsByCategoryId = id => {
    try {
        return post.getNewsByCategoryId(id);
    } catch (error) {
        throw error;
    }
};

exports.deleteCategoryId = id => {
    try {
        return post.deleteCategory(id);
    } catch (error) {
        throw error;
    }
};


exports.editCategory = (id, data) => {
    try {
        return post.editCategory(id, data);
    } catch (error) {
        throw error;
    }
};