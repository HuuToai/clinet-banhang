const Brand = require('../../models/admin/brandModel');
const sequelize = require('../../../config/sequelize');
const { Op } = require('sequelize');
// const { body, check } = require("express-validator");
const { validationResult } = require('express-validator');
const uploadMiddleware = require('../../middleWare/uploadMiddleware');
const multer = require('multer');
// const { validationResult } = require("express-validator");
class brandController {
    // [GET] /news
    index(req, res, next) {
        Promise.all([
            Brand.findAll({ raw: true }),
            Brand.count({
                where: {
                    deletedAt: {
                        [Op.not]: null,
                    },
                },
                paranoid: false,
                raw: true,
            }),
        ])
            .then(([brands, count]) =>
                res.render('admin/brand/home', {
                    brands,
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
        res.render('admin/brand/create', {
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
        uploadMiddleware.single('image')(req, res, function (err) {
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
            const brand = {
                name: req.body.name,
                description: req.body.description,
                image: req.file ? req.file.filename : null, // Lưu tên file ảnh vào cơ sở dữ liệu
                status: req.body.status,
                createdBy: req.session.name,
                updatedBy: req.session.name,
            };

            // Thực hiện thêm vào cơ sở dữ liệu
            Brand.create(brand)
                .then(() => {
                    // Chuyển hướng người dùng sau khi thêm thành công
                    res.redirect('/admin/brand');
                })
                .catch((error) => {
                    // Xử lý lỗi khi thêm vào cơ sở dữ liệu
                    console.error('Error creating brand:', error);
                    next(error); // Chuyển lỗi cho middleware xử lý lỗi tiếp theo
                });
        });
    }

    edit(req, res, next) {
        Brand.findByPk(req.params.id, { raw: true })
            .then((brands) => {
                res.render('admin/brand/edit', {
                    brands,
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
        uploadMiddleware.single('image')(req, res, function (err) {
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
                Brand.findOne({
                    where: {
                        id: req.params.id,
                    },
                })
                    .then((brand) => {
                        if (brand) {
                            // Cập nhật thông tin mà không thay đổi ảnh
                            return brand.update({
                                name: req.body.name,
                                description: req.body.description,
                                status: req.body.status,
                                slug: req.body.slug,
                                updatedBy: req.session.name,
                            });
                        } else {
                            // Xử lý trường hợp không tìm thấy brand
                            return res.status(404).send('Brand not found');
                        }
                    })
                    .then(() => {
                        res.redirect('/admin/brand/');
                    })
                    .catch((err) => {
                        next(err);
                    });
            } else {
                // Nếu có ảnh mới, cập nhật thông tin kèm theo ảnh mới
                Brand.update(
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
                        res.redirect('/admin/brand');
                    })
                    .catch((err) => {
                        next(err);
                    });
            }
        });
    }

    // [DELETE] /admin/:id
    async destroy(req, res, next) {
        await Brand.destroy({
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
        Brand.restore({ where: { id: req.params.id } })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }
    // [GET] brand/trash/
    trashBrand(req, res, next) {
        Brand.findAll({
            where: {
                deletedAt: {
                    [Op.not]: null,
                },
            },
            paranoid: false,
            raw: true,
        })
            .then((brands) => {
                res.render('admin/brand/trash', {
                    brands,
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
    // [DELETE] /admin/brand/:id/force
    forceDestroy(req, res, next) {
        console.log('hello');
        Brand.destroy({
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
    searchBrand(req, res, next) {
        const search = req.body.search;
        Promise.all([
            Brand.findAll({
                where: {
                    name: {
                        [Op.like]: `%${search}%`,
                    },
                },
                raw: true,
            }),
            Brand.count({
                where: {
                    deletedAt: {
                        [Op.not]: null,
                    },
                },
                paranoid: false,
                raw: true,
            }),
        ])
            .then(([brands, count]) =>
                res.render('admin/brand/home', {
                    brands,
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

module.exports = new brandController();
