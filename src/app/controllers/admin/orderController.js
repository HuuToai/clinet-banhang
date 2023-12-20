const Order = require('../../models/client/order_model');
const Shipping = require('../../models/client/shipModel');
const Product = require('../../models/admin/productModel');
const DetailOrder = require('../../models/client/detail_order');

const sequelize = require('../../../config/sequelize');
const { Op } = require('sequelize');
const multer = require('multer');
const { json } = require('body-parser');
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
                    order_id: order.id,
                    shipping_id: order.shipping.id,
                    order_code: order.order_code,
                    order_name: order.shipping.name,
                    order_sdt: order.shipping.phone,
                    order_address: order.shipping.address,
                    order_status: order.status,
                    order_time: order.created_at,
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
    async view(req, res, next) {
        const ordercode = req.params.id;
        let order_time = req.query.q;

        // Chuyển đổi thành đối tượng Date sử dụng UTC
        order_time = new Date(order_time + ' UTC');

        const year = order_time.getUTCFullYear();
        const month = (order_time.getUTCMonth() + 1)
            .toString()
            .padStart(2, '0');
        const day = order_time.getUTCDate().toString().padStart(2, '0');
        const hours = order_time.getUTCHours().toString().padStart(2, '0');
        const minutes = order_time.getUTCMinutes().toString().padStart(2, '0');
        const seconds = order_time.getUTCSeconds().toString().padStart(2, '0');

        // Định dạng theo "YYYY-MM-DD HH:mm:ss"
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        DetailOrder.findAll({
            where: {
                created_at: formattedDateTime,
                order_code: ordercode,
            },
            include: [
                {
                    model: Product,
                    as: 'product',
                },
            ],
        })
            .then((orders) => {
                let total = 0;
                let totalQuantity = 0; // Tổng số lượng sản phẩm
                let cartItems = [];
                orders.forEach((order) => {
                    const itemTotal = order.quantity * order.product.price;
                    totalQuantity += order.quantity; // Cộng thêm số lượng sản phẩm
                    total += itemTotal;

                    // Lưu thông tin chi tiết từng sản phẩm vào mảng
                    const cartItem = {
                        order_code: order.order_code,
                        productId: order.product.id,
                        productName: order.product.name,
                        productImage: order.product.image,
                        quantity: order.quantity,
                        price: order.product.price,
                        itemTotal: itemTotal,
                    };

                    cartItems.push(cartItem);
                });
                res.render('admin/order/view', {
                    cartItems,
                    total,
                    totalQuantity,
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
    async process(req, res) {
        try {
            const status = req.body.status;
            const order_code = req.body.order_code;
            const order_id = req.body.order_id;
            // Kiểm tra và xử lý dữ liệu, đảm bảo thư viện toastr đã được đưa vào đúng cách
            if (!status || !order_code) {
                return res
                    .status(400)
                    .json({ success: false, message: 'Dữ liệu không hợp lệ' });
            }

            // Truy vấn cơ sở dữ liệu để cập nhật trạng thái đơn hàng
            const updatedOrder = await Order.update(
                { status: status },
                { where: { order_code: order_code, id: order_id } },
            );

            if (updatedOrder[0] === 1) {
                // Nếu có một bản ghi được cập nhật thành công
                req.toastr.success(
                    'Cập nhật trạng thái đơn hàng thành công',
                    'Đã cập nhật',
                );
                res.json({
                    success: true,
                    message: 'Cập nhật trạng thái đơn hàng thành công',
                });
            } else {
                // Nếu không có bản ghi nào được cập nhật
                res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy đơn hàng hoặc đã có lỗi xảy ra',
                });
            }
        } catch (error) {
            console.error('Lỗi khi xử lý đơn hàng:', error);
            res.status(500).json({
                success: false,
                message: 'Có lỗi xảy ra khi xử lý đơn hàng',
            });
        }
    }
    forceDestroy(res, req, next) {
        console.log('idđ', req.params.id);
        //   Order.destroy({
        //     where: {
        //         id: req.params.id,
        //     },
        //     force: true,
        // })
        //     .then(() => {
        //         res.redirect('back');
        //     })
        //     .catch((err) => {
        //         next(err);
        //     });
    }
}

module.exports = new orderController();
