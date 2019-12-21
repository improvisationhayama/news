const schema = require('./schema');

exports.newClass = (req, res, next) => {
    schema.post.validate(req.body, {stripUnknown: true}).then(value => {
        req.body = value;
        next();
    }).catch((error) => {
        logger.info(`User bad request: ${error.details[0].message}`);
        res.status(400).json({error: error.details[0].message});
    });
};

exports.editClass = (req, res, next) => {
    schema.editPost.validate(req.body, {stripUnknown: true}).then(value => {
        req.body = value;
        next();
    }).catch((error) => {
        logger.info(`User bad request: ${error.details[0].message}`);
        res.status(400).json({error: error.details[0].message});
    });
};