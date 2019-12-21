// const crud = require('./crud');
const createError = require('http-errors');
// const moment = require('moment');
// const params = require('../params');
// const schema = require('./schema');
// const sequelize = require('../../bin/www');

exports.getDetail = async (postID, slugs) => {
    return sequelize
        .query('SELECT * FROM posts WHERE id = ? OR slug = ?', {
            replacements: [postID, slugs],
            type: sequelize.QueryTypes.SELECT
        })
        .then(posts => {
            if (posts.length !== 0) return posts;
            else throw createError(404, 'Could not found');
        });
};

exports.getList = async query => {
    const offset = (query.page - 1) * query.limit;
    return sequelize
        .query('SELECT * FROM posts LIMIT ? OFFSET ?', {
            replacements: [query.limit, offset],
            type: sequelize.QueryTypes.SELECT
        })
        .then(posts => {
            if (posts.length !== 0) return posts;
            else throw createError(404, 'Data not found');
        });
};

exports.createRecord = (data, userID, slug) => {
    
    return sequelize.models.posts
        .findOrCreate({
            where: {
                title: data.title
            },
            defaults: {
                title: data.title,
                description: data.description,
                hashtag: data.hashtag,
                content: data.content,
                categoryId: data.categoryId,
                isPublished : data.isPublished,
                thumbnail_image_url: data.thumbnail_image_url,
                fb_title: data.fb_title,
                fb_description: data.fb_description,
                fb_thumbnail_image_url: data.fb_thumbnail_image_url,
                createdBy: userID,
                slug: slug[1],
                unique_slug: slug[2],
                other_item : data.other_item
            }
        })
        .then(([post, created]) => {

            if (created === false) {
                throw createError(400, 'Data already exists');
            }
            return {
                post: post.get({ plain: true }),
                created
            };
        });
};

exports.updateWithTitle = async (postID, userID, data, slug) => {
    // const post = sequelize.define('posts', schema.posts);
    sequelize.models.posts
        .update(
            {
                title: data.title,
                description: data.description,
                hashtag: data.hashtag,
                content: data.content,
                categoryId: data.categoryId,
                thumbnail_image_url: data.thumbnail_image_url,
                fb_title: data.fb_title,
                fb_description: data.fb_description,
                fb_thumbnail_image_url: data.fb_thumbnail_image_url,
                createdBy: userID,
                isPublished : data.isPublished,
                slug: slug[1],
                unique_slug: slug[2],
                other_item : data.other_item
            },
            {
                where: {
                    id: postID
                },
                returning: true,
                plain: true
            }
        )
        .then(res => {
            return res;
        });
};

exports.updateWithoutTitle = async (postID, userID, data) => {
    return sequelize.models.posts.update(
        {
            description: data.description,
            hashtag: data.hashtag,
            content: data.content,
            categoryId: data.categoryId,
            thumbnail_image_url: data.thumbnail_image_url,
            fb_title: data.fb_title,
            fb_description: data.fb_description,
            fb_thumbnail_image_url: data.fb_thumbnail_image_url,
            updatedBy: userID
        },
        {
            where: {
                id: postID
            }
        }
    );
};

exports.delete = async postID => {
    return sequelize.query('DELETE FROM posts WHERE id = ?', {
        replacements: [postID],
        type: sequelize.QueryTypes.DELETE
    });
};

exports.testcreateRecord = data => {
    return sequelize.models.tests.findOrCreate({
        where: {
            title: data.title
        },
        defaults: {
            title: data.title,
            description: data.description,
            content: data.content,
            categoryId: data.categoryId,
            thumbnail_image_url: data.thumbnail_image_url,
            fb_title: data.fb_title,
            fb_description: data.fb_description,
            fb_thumbnail_image_url: data.fb_thumbnail_image_url
        }
    });
    // .then(([post, created]) => {
    //     console.log(post.get({
    //         plain: true
    //     }));
    //     console.log(created);
    //     if (created === false) {
    //         throw createError(400, 'Data already exists');
    //     }
    // });
};

exports.testgetDetail = async postID => {
    return sequelize
        .query('SELECT * FROM posts WHERE id = ?', {
            replacements: [postID],
            type: sequelize.QueryTypes.SELECT
        })
        .then(posts => {
            if (posts.length !== 0) return posts;
            else throw createError(404, 'Could not found');
        });
};

exports.getListCategories = async () => {
    return sequelize
        .query('SELECT * FROM categories', { type: sequelize.QueryTypes.SELECT })
        .then(categories => {
            
            if (categories.length !== 0) return categories;
            else throw createError(404, 'Data not found');
        });
};

exports.postListCategories = async data => {
    
    return sequelize.models.categories
        .findOrCreate({
            where: {
                name: data.name
            },
            defaults: {
                name: data.name,
                description: data.description
            }
        })
        .then(([post, created]) => {
            // console.log(
            //   post.get({
            //     plain: true
            //   })
            // );
            // console.log(created);
            if (created == false) {
                throw createError(400, 'Data already exists');
            }
            return post.get({
                plain: true
            });
        });
};

exports.getListCategories = async () => {
    return sequelize
        .query('SELECT * FROM categories', { type: sequelize.QueryTypes.SELECT })
        .then(categories => {
            // console.log(categories);
            if (categories.length !== 0) return categories;
            else throw createError(404, 'Data not found');
        });
};

exports.getNewsByCategoryId = async id => {
    // console.log(id);
    return sequelize
        .query(
            'SELECT posts.id, posts.title, posts.slug, posts.thumbnail_image_url, posts.description, posts.createdAt, posts.hashtag, posts.other_item FROM categories, posts  where categories.id = posts.categoryId  and categories.name = ? ',
            {
                replacements: [id],
                type: sequelize.QueryTypes.SELECT
            }
        )
        .then(categories => {
            // console.log(categories);
            if (categories.length !== 0) return categories;
            else throw createError(404, 'Data not found');
        });
};

exports.deleteCategory = async id => {
    // return sequelize
    //   .query("DELETE FROM categories WHERE id = ?", {
    //     replacements: [id],
    //     type: sequelize.QueryTypes.DELETE
    //   })
    //   .then(() => {
    //     return {
    //       message: "Delete success"
    //     };
    //   })
    //   .catch(() => {
    //     return {
    //       message: "Delete fail"
    //     };
    //   });
    // console.log(id);
    return sequelize.models.categories.destroy({
        where: {
            id: id
        }
    });
};

exports.editCategory = async (id, data) => {
    sequelize.models.categories
        .update(
            {
                name: data.name,
                description: data.description
            },
            {
                where: {
                    id: id
                },
        
            }
        );
};
