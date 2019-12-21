const Sequelize = require('sequelize');

exports.benhnhan = {
    tenBenhNhan: {
        type : Sequelize.STRING
    },
    soDienThoai: {
        type: Sequelize.STRING
    },
    loaiUngThu: {
        type: Sequelize.STRING
    },
    ngayBatDau: {
        type: Sequelize.STRING
    },
    ngayKetThuc: {
        type: Sequelize.STRING
    }
};

exports.yta = {
    tenYTa : {
        type: Sequelize.STRING
    },
    soDienThoai: {
        type: Sequelize.STRING
    },
    kinhNghiemLamSang : {
        type : Sequelize.INTEGER
    }
};

exports.tutheodoi = {
    ngayLayDuLieu : {
        type: Sequelize.STRING
    },
    maBenhNhan : {
        type: Sequelize.INTEGER,
        // references: {
        //     model: 'benhnhan',
        //     key: 'id',
        // }
    },
    trieuChung: {
        type : Sequelize.STRING
    },
    mucDo : {
        type: Sequelize.STRING
    },
    chiTiet : {
        type : Sequelize.STRING
    },
    canhBao : {
        type: Sequelize.STRING
    }
};

exports.lamsang = {
    ngayLamSang : {
        type: Sequelize.STRING
    },
    maYTa : {
        type: Sequelize.INTEGER,
        references: {
            model: 'yta',
            key : 'id'
        }
    },
    maBenhNhan: {
        type: Sequelize.INTEGER,
        // references: {
        //     model: 'benhnhan',
        //     key : 'id'
        // }
    },
    trieuChung : {
        type: Sequelize.STRING,
    },
    ghiChu : {
        type: Sequelize.STRING
    }
};

// exports.categories = {
//     name: {
//         type: Sequelize.STRING
//     },
//     description: {
//         type: Sequelize.STRING
//     },
//     createdBy: {
//         type: Sequelize.STRING
//     },
//     updatedBy: {
//         type: Sequelize.STRING
//     }
// };

// exports.posts = {
//     title: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     description: {
//         type: Sequelize.STRING
//     },
//     hashtag: {
//         type: Sequelize.STRING
//     },
//     content: {
//         type: Sequelize.TEXT
//     },
//     categoryId: {
//         type: Sequelize.INTEGER,
//         references: {
//             model: 'categories',
//             key: 'id'
//         }
//     },
//     isPublished: {
//         type: Sequelize.BOOLEAN,
//         defaultValue: false
//     },
//     thumbnail_image_url: {
//         type: Sequelize.STRING
//     },
//     fb_title: {
//         type: Sequelize.STRING
//     },
//     fb_description: {
//         type: Sequelize.STRING
//     },
//     fb_thumbnail_image_url: {
//         type: Sequelize.STRING
//     },
//     createdBy: {
//         type: Sequelize.STRING
//     },
//     updatedBy: {
//         type: Sequelize.STRING
//     },
//     slug: {
//         type: Sequelize.STRING
//     },
//     unique_slug: {
//         type: Sequelize.STRING
//     },
//     other_item : {
//         type : Sequelize.JSON
//     }
    
// };

// exports.test = {
//     title: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     description: {
//         type: Sequelize.STRING
//     },
//     content: {
//         type: Sequelize.TEXT
//     },
//     categoryId: {
//         type: Sequelize.INTEGER,
//         references: {
//             model: 'categories',
//             key: 'id'
//         }
//     },
//     isPublished: {
//         type: Sequelize.BOOLEAN,
//         defaultValue: false
//     },
//     thumbnail_image_url: {
//         type: Sequelize.STRING
//     },
//     fb_title: {
//         type: Sequelize.STRING
//     },
//     fb_description: {
//         type: Sequelize.STRING
//     },
//     fb_thumbnail_image_url: {
//         type: Sequelize.STRING
//     },
//     createdBy: {
//         type: Sequelize.STRING
//     },
//     updatedBy: {
//         type: Sequelize.STRING
//     },
//     slug: {
//         type: Sequelize.STRING
//     },
//     unique_slug: {
//         type: Sequelize.STRING
//     }
// };
