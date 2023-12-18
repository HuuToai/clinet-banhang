// const Index = require("../../models/client/indexModel");
const Product = require('../../models/admin/productModel');
const OrderDetail = require('../../models/client/orderModel');
const User = require('../../models/client/userModel');
const Order = require('../../models/client/order_model');
const Shipping = require('../../models/client/shipModel');
const sequelize = require('../../../config/sequelize');
const md5 = require('md5');
const { Op } = require('sequelize');
class indexController {
    // [GET] /news
    index(req, res, next) {
        Promise.all([
            Product.findAll({
                raw: true,
                limit: 3,
                order: [['created_at', 'DESC']],
            }),
        ])
            .then(([newlyAddedProducts]) =>
                res.render('client/index', {
                    newlyAddedProducts,
                    username: req.session.username,
                    cartuserid: req.session.cartuserid,
                    headclient: true,
                    showNavbarClient: true,
                    showFooterClient: true,
                    jsclient: true,
                }),
            )
            .catch(next);
    }

    shop(req, res) {
        Product.findAll({
            where: {
                status: 1,
                deletedAt: {
                    [Op.eq]: null,
                },
            },
            raw: true,
            paranoid: false,
        }).then((products) => {
            res.render('client/shop', {
                products,
                username: req.session.username,
                cartuserid: req.session.cartuserid,
                headclient: true,
                showNavbarClient: true,
                showFooterClient: true,
                jsclient: true,
            });
        });
    }
    about(req, res) {
        res.render('client/about', {
            username: req.session.username,
            cartuserid: req.session.cartuserid,
            headclient: true,
            showNavbarClient: true,
            showFooterClient: true,
            jsclient: true,
        });
    }
    services(req, res) {
        res.render('client/services', {
            headclient: true,
            showNavbarClient: true,
            showFooterClient: true,
            jsclient: true,
            username: req.session.username,
            cartuserid: req.session.cartuserid,
        });
    }
    blog(req, res) {
        res.render('client/blog', {
            headclient: true,
            showNavbarClient: true,
            showFooterClient: true,
            jsclient: true,
            username: req.session.username,
            cartuserid: req.session.cartuserid,
        });
    }
    contact(req, res) {
        res.render('client/contact', {
            headclient: true,
            showNavbarClient: true,
            showFooterClient: true,
            jsclient: true,
            username: req.session.username,
            cartuserid: req.session.cartuserid,
        });
    }

    addToCart(req, res) {
        const productId = req.params.id;
        const orderCode = req.session.cartuserid;
        // Tìm sản phẩm trong cơ sở dữ liệu
        Product.findByPk(productId, { raw: true }).then((product) => {
            // Thêm sản phẩm vào order_details với orderCode và productId
            OrderDetail.findOne({
                where: {
                    order_code: orderCode,
                    product_id: productId,
                },
            }).then((orderDetail) => {
                if (orderDetail) {
                    // Nếu đã có, tăng quantity lên 1
                    orderDetail.quantity++;
                    orderDetail.save();
                } else {
                    // Nếu chưa có, thêm vào order_details với quantity là 1 và orderCode mới
                    const product = {
                        order_code: orderCode,
                        product_id: productId,
                        quantity: 1,
                    };
                    OrderDetail.create(product);
                }
                req.toastr.success(
                    'Thêm sản phẩm vào giỏ hàng thành công',
                    'Đã thêm sản phẩm!',
                );

                res.redirect('/cart');
            });
        });
    }

    cart(req, res) {
        const orderCode = req.session.cartuserid;
        OrderDetail.findAll({
            where: {
                order_code: orderCode,
            },
            include: {
                model: Product,
                as: 'product',
            },
        }).then((orderDetails) => {
            // Tính tổng tiền
            let total = 0;
            let totalQuantity = 0; // Tổng số lượng sản phẩm
            let cartItems = [];

            orderDetails.forEach((orderDetail) => {
                const itemTotal =
                    orderDetail.quantity * orderDetail.product.price;
                totalQuantity += orderDetail.quantity; // Cộng thêm số lượng sản phẩm
                total += itemTotal;

                // Lưu thông tin chi tiết từng sản phẩm vào mảng
                const cartItem = {
                    productId: orderDetail.product.id,
                    productquantity: orderDetail.product.quantity,
                    productName: orderDetail.product.name,
                    productImage: orderDetail.product.image,
                    quantity: orderDetail.quantity,
                    price: orderDetail.product.price,
                    itemTotal: itemTotal,
                };

                cartItems.push(cartItem);
            });

            res.render('client/cart', {
                cartItems,
                total,
                totalQuantity,
                headclient: true,
                showNavbarClient: true,
                showFooterClient: true,
                jsclient: true,
                username: req.session.username,
                cartuserid: req.session.cartuserid,
            });
        });
    }

    deleteItem(req, res) {
        const productId = req.params.id;
        const orderCode = req.session.cartuserid;

        OrderDetail.destroy({
            where: {
                order_code: orderCode,
                product_id: productId,
            },
            force: true,
        }).then(() => {
            req.toastr.success(
                'Xóa sản phẩm khỏi giỏ hàng thành công',
                'Đã xóa sản phẩm!',
            );
            res.redirect('/cart');
        });
    }

    login(req, res) {
        res.render('client/login', {});
    }
    register(req, res) {
        res.render('client/register', {
            showNavbarClient: true,
            showFooterClient: true,
        });
    }
    async processRegister(req, res) {
        try {
            // Kiểm tra xem email đã tồn tại chưa
            const existingUser = await User.findOne({
                where: {
                    email: req.body.email,
                },
            });

            if (existingUser) {
                // Nếu email đã tồn tại, báo lỗi
                res.status(400).json({
                    success: false,
                    error: 'Email đã tồn tại',
                });
            } else {
                // Nếu email chưa tồn tại, tiến hành tạo tài khoản
                const hashedPassword = md5(req.body.password);
                console.log(hashedPassword);

                const user = await User.create({
                    email: req.body.email,
                    name: req.body.username,
                    password: hashedPassword,
                });
                res.redirect('/login');
                // res.render("client/login", {
                //   headclient: true,
                //   // showNavbarClient: true,
                //   // showFooterClient: true,
                //   jsclient: true,
                // });
            }
        } catch (error) {
            res.status(400).json({
                success: false,
                error: 'Lỗi khi tạo tài khoản',
            });
        }
    }
    async processLogin(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;
        User.findOne({ email: email })
            .then((user) => {
                // Xử lý kết quả
                if (!user) {
                    return res.status(401).json({
                        success: false,
                        error: 'Email không đúng',
                    });
                }
                const hashedPassword = md5(password);
                if (hashedPassword === user.password) {
                    // Mật khẩu đúng, đăng nhập thành công
                    req.toastr.success('Đăng nhập thành công', 'Đã đăng nhập!');
                    req.session.username = user.name;
                    req.session.cartuserid = user.cartuserid;
                    res.redirect('/');
                } else {
                    // Mật khẩu không đúng, đăng nhập thất bại
                    req.toastr.error(
                        'Đăng nhập không thành công',
                        'Chưa đăng nhập!',
                    );
                    res.redirect('/login');
                }
            })
            .catch((error) => {
                next(error);
            });
    }
    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                res.redirect('/');
            } else {
                res.redirect('/login');
            }
        });
    }

    product_detail(req, res) {
        const productId = req.params.id;
        Product.findByPk(productId, { raw: true }).then((product) => {
            res.render('client/product_detail', {
                product,
                headclient: true,
                showNavbarClient: true,
                showFooterClient: true,
                jsclient: true,
                username: req.session.username,
                cartuserid: req.session.cartuserid,
            });
        });
    }

    update_cart_item(req, res) {
        const productIds = req.body.product_id;
        const quantities = req.body.quantity;

        // Kiểm tra nếu hai mảng có cùng độ dài
        if (productIds.length === quantities.length) {
            const itemsToUpdate = [];

            // Tạo mảng chứa các đối tượng sản phẩm cần cập nhật
            for (let i = 0; i < productIds.length; i++) {
                const productId = productIds[i];
                const quantity = quantities[i];

                itemsToUpdate.push({
                    product_id: productId,
                    quantity: quantity,
                });
            }

            // Tiếp tục xử lý như bình thường
            const orderCode = req.session.cartuserid;

            // Duyệt qua từng sản phẩm để cập nhật
            itemsToUpdate.forEach((item) => {
                const productId = item.product_id;
                const quantity = item.quantity;

                // Tìm chi tiết đơn hàng cho sản phẩm
                OrderDetail.findOne({
                    where: {
                        order_code: orderCode,
                        product_id: productId,
                    },
                }).then((orderDetail) => {
                    if (orderDetail) {
                        // Nếu tìm thấy, cập nhật số lượng và lưu lại
                        orderDetail.quantity = quantity;
                        orderDetail.save();
                    } else {
                        // Nếu không tìm thấy, bạn có thể thêm sản phẩm mới vào giỏ hàng nếu cần
                        // Hoặc xử lý theo cách nào đó tùy thuộc vào yêu cầu của bạn
                    }
                });
            });

            res.redirect('/cart');
        } else {
            res.status(400).send('Độ dài của hai mảng không khớp');
        }
    }

    deletecart(req, res) {
        const orderCode = req.session.cartuserid;

        OrderDetail.destroy({
            where: {
                order_code: orderCode,
            },
            force: true,
        }).then(() => {
            req.toastr.success('Xóa giỏ hàng thành công', 'Đã xóa giỏ hàng!');
            res.redirect('/cart');
        });
    }
    checkout(req, res) {
        const orderCode = req.session.cartuserid;
        OrderDetail.findAll({
            where: {
                order_code: orderCode,
            },
            include: {
                model: Product,
                as: 'product',
            },
        }).then((orderDetails) => {
            // Tính tổng tiền
            let total = 0;
            let totalQuantity = 0; // Tổng số lượng sản phẩm
            let cartItems = [];

            orderDetails.forEach((orderDetail) => {
                const itemTotal =
                    orderDetail.quantity * orderDetail.product.price;
                totalQuantity += orderDetail.quantity; // Cộng thêm số lượng sản phẩm
                total += itemTotal;

                // Lưu thông tin chi tiết từng sản phẩm vào mảng
                const cartItem = {
                    productId: orderDetail.product.id,
                    productquantity: orderDetail.product.quantity,
                    productName: orderDetail.product.name,
                    productImage: orderDetail.product.image,
                    quantity: orderDetail.quantity,
                    price: orderDetail.product.price,
                    itemTotal: itemTotal,
                };

                cartItems.push(cartItem);
            });

            res.render('client/checkout', {
                cartItems,
                total,
                totalQuantity,
                headclient: true,
                showNavbarClient: true,
                showFooterClient: true,
                jsclient: true,
                username: req.session.username,
                cartuserid: req.session.cartuserid,
            });
        });
    }

    submit_checkout(req, res, next) {
        const self = this; // Gán 'this' vào một biến
        const orderCode = req.session.cartuserid;

        // Thêm thông tin vận chuyển (shipping)
        const shippingInfo = {
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            note: req.body.note,
            method: req.body.shipping_method,
        };

        Shipping.create(shippingInfo)
            .then((shipping) => {
                // Lấy shipping ID đã thêm
                const shippingId = shipping.id;

                // Thêm thông tin đơn hàng (order)
                const orderInfo = {
                    order_code: orderCode,
                    shipping_id: shippingId,
                };

                return Order.create(orderInfo);
            })
            .then((order) => {
                // Sử dụng biến 'self' thay vì 'this'
                res.redirect('/delete-cart');
                // res.redirect("/thanks"); // Chuyển hướng sau khi đơn hàng được tạo thành công
            })
            .catch((error) => {
                next(error);
            });
    }

    thanks(req, res) {
        res.render('client/thanks', {
            headclient: true,
            showNavbarClient: true,
            showFooterClient: true,
            jsclient: true,
            username: req.session.username,
            cartuserid: req.session.cartuserid,
        });
    }
}

module.exports = new indexController();
