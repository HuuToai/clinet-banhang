const Category = require('../../models/admin/categoryModel');
const sequelize = require('../../../config/sequelize');
const { Op } = require('sequelize');
const { body } = require('express-validator');
const uploadcatgoryMiddleware = require('../../middleWare/uploadcategoryMiddleware');
const multer = require('multer');
class categoryController {
    // [GET] /news
    index(req, res, next) {
        Promise.all([
            Category.findAll({ raw: true }),
            Category.count({
                where: {
                    deletedAt: {
                        [Op.not]: null,
                    },
                },
                paranoid: false,
                raw: true,
            }),
        ])
            .then(([categories, count]) =>
                res.render('admin/category/home', {
                    categories,
                    count,
                    headadmin: true,
                    jsadmin: true,
                    showSlider: true,
                    showNavbar: true,
                    showRightBar: true,
                    user: req.session.user,
                    name: req.session.name,
                }),
            )
            .catch(next);
    }

    create(req, res) {
        res.render('admin/category/create', {
            headadmin: true,
            jsadmin: true,
            showSlider: true,
            showNavbar: true,
            showRightBar: true,
            user: req.session.user,
            name: req.session.name,
        });
    }
    // Middleware để xử lý yêu cầu tạo mới thương hiệu
    store(req, res, next) {
        // Sử dụng middleware upload.single('image') để xử lý việc tải lên ảnh
        uploadcatgoryMiddleware.single('image')(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                // Xử lý lỗi từ Multer (ví dụ: file quá lớn)
                console.error('Multer error:', err);
                return res.status(400).send('Multer error');
            } else if (err) {
                // Xử lý lỗi khác
                console.error('Error:', err);
                return res.status(500).send('Internal Server Error');
            }

            // Nếu không có lỗi, thêm vào cơ sở dữ liệu
            const category = {
                name: req.body.name,
                description: req.body.description,
                image: req.file ? req.file.filename : null, // Lưu tên file ảnh vào cơ sở dữ liệu
                status: req.body.status,
                createdBy: req.session.name,
                updatedBy: req.session.name,
            };

            // Thực hiện thêm vào cơ sở dữ liệu
            Category.create(category)
                .then(() => {
                    // Chuyển hướng người dùng sau khi thêm thành công
                    res.redirect('/admin/category');
                })
                .catch((error) => {
                    // Xử lý lỗi khi thêm vào cơ sở dữ liệu
                    console.error('Error creating category:', error);
                    next(error); // Chuyển lỗi cho middleware xử lý lỗi tiếp theo
                });
        });
    }

    edit(req, res, next) {
        Category.findByPk(req.params.id, { raw: true })
            .then((categories) => {
                res.render('admin/category/edit', {
                    categories,
                    headadmin: true,
                    jsadmin: true,
                    showSlider: true,
                    showNavbar: true,
                    showRightBar: true,
                    user: req.session.user,
                    name: req.session.name,
                });
            })
            .catch((err) => {
                next(err);
            });
    }

    // [POST] /admin/:id
    update(req, res, next) {
        uploadcatgoryMiddleware.single('image')(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                console.error('Multer error:', err);
                return res.status(400).send('Multer error');
            } else if (err) {
                console.error('Error:', err);
                return res.status(500).send('Internal Server Error');
            }

            // Kiểm tra xem người dùng đã tải lên ảnh mới hay không
            const newImage = req.file ? req.file.filename : null;

            // Kiểm tra nếu không có ảnh mới, giữ nguyên ảnh cũ
            if (!newImage) {
                Category.findOne({
                    where: {
                        id: req.params.id,
                    },
                })
                    .then((category) => {
                        if (category) {
                            // Cập nhật thông tin mà không thay đổi ảnh
                            return category.update({
                                name: req.body.name,
                                description: req.body.description,
                                status: req.body.status,
                                slug: req.body.slug,
                                updatedBy: req.session.name,
                            });
                        } else {
                            // Xử lý trường hợp không tìm thấy brand
                            return res.status(404).send('Category not found');
                        }
                    })
                    .then(() => {
                        res.redirect('/admin/category/');
                    })
                    .catch((err) => {
                        next(err);
                    });
            } else {
                // Nếu có ảnh mới, cập nhật thông tin kèm theo ảnh mới
                Category.update(
                    {
                        name: req.body.name,
                        description: req.body.description,
                        image: newImage,
                        slug: req.body.slug,
                        status: req.body.status,
                        updatedBy: req.session.name,
                    },
                    {
                        where: {
                            id: req.params.id,
                        },
                    },
                )
                    .then(() => {
                        res.redirect('/admin/category');
                    })
                    .catch((err) => {
                        next(err);
                    });
            }
        });
    }

    // [DELETE] /admin/:id
    async destroy(req, res, next) {
        await Category.destroy({
            where: {
                id: req.params.id,
            },
            paranoid: true, //muốn xóa hẳn thì bỏ cái này đi thì mặc định là force: true
        })
            .then(() => {
                res.redirect('back');
            })
            .catch((err) => {
                next(err);
            });
    }
    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Category.restore({ where: { id: req.params.id } })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }
    // [GET] category/trash/
    trashCategory(req, res, next) {
        Category.findAll({
            where: {
                deletedAt: {
                    [Op.not]: null,
                },
            },
            paranoid: false,
            raw: true,
        })
            .then((categories) => {
                res.render('admin/category/trash', {
                    categories,
                    headadmin: true,
                    jsadmin: true,
                    showSlider: true,
                    showNavbar: true,
                    showRightBar: true,
                    user: req.session.user,
                    name: req.session.name,
                });
            })
            .catch(next);
    }
    // [DELETE] /admin/category/:id/force
    forceDestroy(req, res, next) {
        console.log('hello');
        Category.destroy({
            where: {
                id: req.params.id,
            },
            force: true,
        })
            .then(() => {
                res.redirect('back');
            })
            .catch((err) => {
                next(err);
            });
    }
    searchCategory(req, res, next) {
        const search = req.body.search;
        Category.all([
            Category.findAll({
                where: {
                    name: {
                        [Op.like]: `%${search}%`,
                    },
                },
                raw: true,
            }),
            Category.count({
                where: {
                    deletedAt: {
                        [Op.not]: null,
                    },
                },
                paranoid: false,
                raw: true,
            }),
        ])
            .then(([categories, count]) =>
                res.render('admin/category/home', {
                    categories,
                    count,
                    headadmin: true,
                    jsadmin: true,
                    showSlider: true,
                    showNavbar: true,
                    showRightBar: true,
                    user: req.session.user,
                    name: req.session.name,
                }),
            )
            .catch(next);
    }
}

module.exports = new categoryController();
