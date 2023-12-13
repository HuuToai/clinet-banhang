const Product = require('../../models/admin/productModel');
const Brand = require('../../models/admin/brandModel');
const Category = require('../../models/admin/categoryModel');
const sequelize = require('../../../config/sequelize');
const { Op } = require('sequelize');
const { body } = require('express-validator');
const uploadproduct = require('../../middleWare/uploadProduct');
const multer = require('multer');
class productController {
    // [GET] /news
    index(req, res, next) {
        Promise.all([
            Product.findAll({ raw: true }),
            Product.count({
                where: {
                    deletedAt: {
                        [Op.not]: null,
                    },
                },
                paranoid: false,
                raw: true,
            }),
        ])
            .then(([products, count]) =>
                res.render('admin/product/home', {
                    products,
                    count,
                    showSlider: true,
                    showNavbar: true,
                    showRightBar: true,
                    user: req.session.user,
                    name: req.session.name,
                }),
            )
            .catch(next);
    }

    create(req, res, next) {
        Promise.all([
            Brand.findAll({
                where: {
                    status: 1,
                    deletedAt: {
                        [Op.eq]: null,
                    },
                },
                raw: true,
                paranoid: false,
            }),
            Category.findAll({
                where: {
                    status: 1,
                    deletedAt: {
                        [Op.eq]: null,
                    },
                },
                raw: true,
                paranoid: false,
            }),
        ])
            .then(([brands, categories]) =>
                res.render('admin/product/create', {
                    brands,
                    categories,
                    showSlider: true,
                    showNavbar: true,
                    showRightBar: true,
                    user: req.session.user,
                    name: req.session.name,
                }),
            )
            .catch(next);
    }
    store(req, res, next) {
        uploadproduct.single('image')(req, res, function (err) {
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
            const product = {
                name: req.body.name,
                price: req.body.price,
                price_in: req.body.price_in,
                quantity: req.body.quantity,
                description: req.body.description,
                image: req.file ? req.file.filename : null, // Lưu tên file ảnh vào cơ sở dữ liệu
                status: req.body.status,
                category_id: req.body.category_id,
                brand_id: req.body.brand_id,
                createdBy: req.session.name,
                updatedBy: req.session.name,
            };

            // Thực hiện thêm vào cơ sở dữ liệu
            Product.create(product)
                .then(() => {
                    // Chuyển hướng người dùng sau khi thêm thành công
                    res.redirect('/admin/product');
                })
                .catch((error) => {
                    // Xử lý lỗi khi thêm vào cơ sở dữ liệu
                    console.error('Error creating product:', error);
                    next(error); // Chuyển lỗi cho middleware xử lý lỗi tiếp theo
                });
        });
    }

    edit(req, res, next) {
        Promise.all([
            Product.findByPk(req.params.id, { raw: true }),
            Brand.findAll({
                where: {
                    status: 1,
                    deletedAt: {
                        [Op.eq]: null,
                    },
                },
                raw: true,
                paranoid: false,
            }),
            Category.findAll({
                where: {
                    status: 1,
                    deletedAt: {
                        [Op.eq]: null,
                    },
                },
                raw: true,
                paranoid: false,
            }),
        ])
            .then(([products, brands, categories]) => {
                res.render('admin/product/edit', {
                    products,
                    brands,
                    categories,
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
        uploadproduct.single('image')(req, res, function (err) {
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
                Product.findOne({
                    where: {
                        id: req.params.id,
                    },
                })
                    .then((product) => {
                        if (product) {
                            // Cập nhật thông tin mà không thay đổi ảnh
                            return product.update({
                                name: req.body.name,
                                price: req.body.price,
                                slug: req.body.slug,
                                price_in: req.body.price_in,
                                quantity: req.body.quantity,
                                description: req.body.description,
                                status: req.body.status,
                                category_id: req.body.category_id,
                                brand_id: req.body.brand_id,
                                createdBy: req.session.name,
                                updatedBy: req.session.name,
                            });
                        } else {
                            return res.status(404).send('Product not found');
                        }
                    })
                    .then(() => {
                        res.redirect('/admin/product/');
                    })
                    .catch((err) => {
                        next(err);
                    });
            } else {
                // Nếu có ảnh mới, cập nhật thông tin kèm theo ảnh mới
                Product.update(
                    {
                        name: req.body.name,
                        price: req.body.price,
                        price_in: req.body.price_in,
                        slug: req.body.slug,
                        quantity: req.body.quantity,
                        description: req.body.description,
                        image: newImage, // Lưu tên file ảnh vào cơ sở dữ liệu
                        status: req.body.status,
                        category_id: req.body.category_id,
                        brand_id: req.body.brand_id,
                        createdBy: req.session.name,
                        updatedBy: req.session.name,
                    },
                    {
                        where: {
                            id: req.params.id,
                        },
                    },
                )
                    .then(() => {
                        res.redirect('/admin/product');
                    })
                    .catch((err) => {
                        next(err);
                    });
            }
        });
    }

    // [DELETE] /admin/:id
    async destroy(req, res, next) {
        await Product.destroy({
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
        Product.restore({ where: { id: req.params.id } })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }
    // [GET] product/trash/
    trashProduct(req, res, next) {
        Product.findAll({
            where: {
                deletedAt: {
                    [Op.not]: null,
                },
            },
            paranoid: false,
            raw: true,
        })
            .then((products) => {
                res.render('admin/product/trash', {
                    products,
                    showSlider: true,
                    showNavbar: true,
                    showRightBar: true,
                    user: req.session.user,
                    name: req.session.name,
                });
            })
            .catch(next);
    }
    // [DELETE] /admin/product/:id/force
    forceDestroy(req, res, next) {
        Product.destroy({
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
    searchProduct(req, res, next) {
        const search = req.body.search;
        Promise.all([
            Product.findAll({
                where: {
                    name: {
                        [Op.like]: `%${search}%`,
                    },
                },
                raw: true,
            }),
            Product.count({
                where: {
                    deletedAt: {
                        [Op.not]: null,
                    },
                },
                paranoid: false,
                raw: true,
            }),
        ])
            .then(([products, count]) =>
                res.render('admin/product/home', {
                    products,
                    count,
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

module.exports = new productController();
