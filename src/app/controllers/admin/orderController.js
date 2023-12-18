const Order = require('../../models/client/order_model');
const Shipping = require('../../models/client/shipModel');
const sequelize = require('../../../config/sequelize');
const { Op } = require('sequelize');
const multer = require('multer');
class orderController {
    // [GET] /news
    index(req, res, next) {
        Order.findAll({
            include: {
                model: Shipping,
                as: 'shipping',
            },
        }).then((orders) => {
            let orderitems = [];

            orders.forEach((order) => {
                // Lưu thông tin chi tiết từng sản phẩm vào mảng
                const orderitem = {
                    shipping_id: order.shipping.id,
                    order_code: order.order_code,
                    order_name: order.shipping.name,
                    order_sdt: order.shipping.phone,
                    order_address: order.shipping.address,
                    order_status: order.status,
                };

                orderitems.push(orderitem);
            });
            res.render('admin/order/home', {
                orderitems,
                headadmin: true,
                jsadmin: true,
                showSlider: true,
                showNavbar: true,
                showRightBar: true,
                user: req.session.user,
                name: req.session.name,
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
}

module.exports = new orderController();
