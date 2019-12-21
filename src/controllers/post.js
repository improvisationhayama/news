const service = require('../services/post');
const authenticator = require('../middlewares/authenticator');
const translate = require('../translation');
const { ACCEPTS_LANGUAGES } = require('../params');

exports.getList = async (req, res) => {
    try {
        const userID = res.locals.userID;
        const result = await service.getList(req.query, userID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            error: translate(error.message, req.acceptsLanguages(ACCEPTS_LANGUAGES))
        });
    }
};

exports.getDetail = async (req, res) => {
    try {
        const postID = req.params.postID;
        const slugs = req.params.slug;
        // const user = res.locals.user;
        const result = await service.getDetail(postID, slugs);
        // console.log(result);
        res.status(200).json({ result });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            error: translate(error.message, req.acceptsLanguages(ACCEPTS_LANGUAGES))
        });
    }
};

exports.createPost = async (req, res) => {
    try {
        authenticator.authorize(res.locals.userRole, 'post', 'write');
        const data = req.body;
        // const title = req.body.title;
        const userID = res.locals.userID;
        const result = await service.createPost(data, userID);
        res.status(200).json({ result });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            error: translate(error.message, req.acceptsLanguages(ACCEPTS_LANGUAGES))
        });
    }
};

exports.editPost = async (req, res) => {
    try {
        authenticator.authorize(res.locals.userRole, 'post', 'write');
        const postID = req.params.postID;
        // const title = req.body.title;
        const data = req.body;
        const userID = res.locals.userID;
        const result = await service.editPost(postID, userID, data);
        res.status(200).json({ result });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            error: translate(error.message, req.acceptsLanguages(ACCEPTS_LANGUAGES))
        });
    }
};

exports.publishPost = async (req, res) => {
    try {
        authenticator.authorize(res.locals.userRole, 'post', 'publish');
        const postID = req.params.postID;
        const data = req.body;
        const userToken = res.locals.userToken;
        const result = await service.publishPost(postID, data, userToken);
        res.status(200).json({ result });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            error: translate(error.message, req.acceptsLanguages(ACCEPTS_LANGUAGES))
        });
    }
};

exports.deletePost = async (req, res) => {
    try {
        authenticator.authorize(res.locals.userRole, 'post', 'delete');
        const postID = req.params.postID;
        // const user = res.locals.user;
        const result = await service.deletePost(postID);
        res.status(200).json({
            result
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            error: translate(error.message, req.acceptsLanguages(ACCEPTS_LANGUAGES))
        });
    }
};

exports.postCategories = async (req, res) => {
    try {
        const result = await service.postCategories(req.body);
        res.status(200).json({
            result
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            error: translate(error.message, req.acceptsLanguages(ACCEPTS_LANGUAGES))
        });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const result = await service.getCategories();
        res.status(200).json({
            result
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            error: translate(error.message, req.acceptsLanguages(ACCEPTS_LANGUAGES))
        });
    }
};

exports.getNewsByCategoryId = async (req, res) => {
    try {
        const result = await service.getNewsByCategoryId(req.params.id);
        res.status(200).json({
            result
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            error: translate(error.message, req.acceptsLanguages(ACCEPTS_LANGUAGES))
        });
    }
};

exports.deleteCategoryById = async (req, res) => {
    try {
    
        const result = await service.deleteCategoryId(req.params.categoriesId);
        res.status(200).json({
            result
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            error: translate(error.message, req.acceptsLanguages(ACCEPTS_LANGUAGES))
        });
    }
};

exports.editCategory = async (req, res) => {
    try { 
        const result = await service.editCategory(req.params.categoriesId, req.body);
        res.status(200).json({
            result
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            error: translate(error.message, req.acceptsLanguages(ACCEPTS_LANGUAGES))
        });
    }
};