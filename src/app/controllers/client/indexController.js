// const Index = require("../../models/client/indexModel");
const Product = require('../../models/admin/productModel');
const OrderDetail = require('../../models/client/orderModel');
const DetailOrder = require('../../models/client/detail_order');
const User = require('../../models/client/userModel');
const Order = require('../../models/client/order_model');
const Shipping = require('../../models/client/shipModel');
const sequelize = require('../../../config/sequelize');
const md5 = require('md5');
const { Op } = require('sequelize');

const request = require('request');
const moment = require('moment');
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
        Order.findAll({
            where: {
                order_code: req.session.cartuserid,
            },

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

            res.render('client/services', {
                orderitems,
                headclient: true,
                showNavbarClient: true,
                jsclient: true,
                username: req.session.username,
                cartuserid: req.session.cartuserid,
            });
        });
    }
    async update_status(req, res, next) {
        const id = req.params.id;
        try {
            // Truy vấn cơ sở dữ liệu để cập nhật trạng thái đơn hàng
            const updatedOrder = await Order.update(
                { status: 3 },
                { where: { id: id } },
            );

            if (updatedOrder[0] === 1) {
                // Nếu có một bản ghi được cập nhật thành công
                req.toastr.success(
                    'hủy đơn hàng thành công',
                    'Đã hủy đơn hàng',
                );
                res.redirect('/services');
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
            }
        } catch (error) {
            res.status(400).json({
                success: false,
                error: 'Lỗi khi tạo tài khoản',
            });
        }
    }

    async processLogin(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            // Tìm kiếm người dùng trong cơ sở dữ liệu bằng email
            const user = await User.findOne({
                where: {
                    email: email,
                },
            });
            if (!user) {
                return res.status(401).json({
                    success: false,
                    error: 'Email hoặc mật khẩu không đúng',
                });
            }

            // Mã hóa mật khẩu nhập vào để so sánh với mật khẩu đã lưu
            const hashedPassword = md5(password);

            if (hashedPassword === user.password) {
                // Mật khẩu đúng, đăng nhập thành công
                req.toastr.success('Đăng nhập thành công', 'Đã đăng nhập!');
                req.session.username = user.name;
                req.session.cartuserid = user.cartuserid;
                res.redirect('/');
            } else {
                req.toastr.error(
                    'Đăng nhập không thành công',
                    'Chưa đăng nhập!',
                );
                res.redirect('/login');
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Lỗi khi đăng nhập',
            });
        }
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

    addToCart(req, res) {
        const productId = req.params.id;
        const orderCode = req.session.cartuserid;
        // Tìm sản phẩm trong cơ sở dữ liệu
        Product.findByPk(productId, { raw: true }).then((product) => {
            if (!product || product.quantity <= 0) {
                // Kiểm tra nếu sản phẩm không tồn tại hoặc số lượng sản phẩm trong kho đã hết
                req.toastr.error('Sản phẩm không khả dụng.', 'Hết hàng');
                return res.redirect('/cart');
            }
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
                        // price: req.query.price,
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
                        // // Nếu tìm thấy, cập nhật số lượng và lưu lại
                        // orderDetail.quantity = quantity;
                        // orderDetail.save();
                        orderDetail.quantity = quantity;

                        // Loại trừ 'created_at' và 'updated_at' khỏi thao tác cập nhật
                        orderDetail.save({ fields: ['quantity'] });
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

    static Static_deletecart(req, res, next) {
        const orderCode = req.session.cartuserid;
        OrderDetail.destroy({
            where: {
                order_code: orderCode,
            },
            force: true,
        }).then(() => {});
    }

    deletecart(req, res, next) {
        indexController.Static_deletecart(req, res, next);
        req.toastr.success('Xóa giỏ hàng thành công', 'Đã xóa giỏ hàng!');
        res.redirect('/cart');
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

    static Static_submit_checkout(req, res, next) {
        const orderCode = req.session.cartuserid;

        // Thêm thông tin vận chuyển (shipping)
        const shippingInfo = req.session.shippingInfo;

        let shippingId;
        let orderid;

        // Thêm thông tin vận chuyển (shipping) và lấy shipping ID đã thêm
        Shipping.create(shippingInfo)
            .then((shipping) => {
                shippingId = shipping.id;

                // Thêm thông tin đơn hàng (order)
                const orderInfo = {
                    order_code: orderCode,
                    shipping_id: shippingId,
                };

                return Order.create(orderInfo);
            })
            .then((order) => {
                orderid = order.id;
                // Lấy thông tin đơn hàng (orderDetail) bằng orderCode
                return OrderDetail.findAll({
                    where: {
                        order_code: orderCode,
                    },
                    include: {
                        model: Product,
                        as: 'product',
                    },
                });
            })
            .then((orderDetails) => {
                // Tạo bản sao vào bảng detailorder
                const copyPromises = orderDetails.map((orderDetail) => {
                    return DetailOrder.create({
                        order_code: orderDetail.order_code,
                        product_id: orderDetail.product_id,
                        quantity: orderDetail.quantity,
                        price: orderDetail.product.price,
                        orderid: orderid,
                        // Copy other relevant fields if needed
                    });
                });

                return Promise.all(copyPromises);
            })
            .then((orderDetails) => {
                // Cập nhật số lượng sản phẩm và số lượng bán
                const updateProductPromises = orderDetails.map(
                    (orderDetail) => {
                        return Product.findOne({
                            where: {
                                id: orderDetail.product_id,
                            },
                        }).then((product) => {
                            if (product) {
                                // Cập nhật số lượng sản phẩm còn lại và số lượng bán
                                const newQuantity =
                                    product.quantity - orderDetail.quantity;
                                const newSales =
                                    product.sold + orderDetail.quantity;
                                setTimeout(() => {
                                    return product.update({
                                        quantity: newQuantity,
                                        sold: newSales,
                                    });
                                }, 20);
                            }
                        });
                    },
                );

                return Promise.all(updateProductPromises);
            })
            .then(() => {
                indexController.Static_deletecart(req, res, next);
                res.render('client/thanks', {
                    headclient: true,
                    showNavbarClient: true,
                    showFooterClient: true,
                    jsclient: true,
                    username: req.session.username,
                    cartuserid: req.session.cartuserid,
                });
            })
            .catch((error) => {
                next(error);
            });
    }

    submit_checkout(req, res, next) {
        req.session.shippingInfo = {
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            note: req.body.note,
            method: req.body.shipping_method,
        };
        indexController.Static_submit_checkout(req, res, next);
    }

    static sortObject(obj) {
        let sorted = {};
        let str = [];
        let key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                str.push(encodeURIComponent(key));
            }
        }
        str.sort();
        for (key = 0; key < str.length; key++) {
            sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(
                /%20/g,
                '+',
            );
        }
        return sorted;
    }

    create_payment_url(req, res, next) {
        process.env.TZ = 'Asia/Ho_Chi_Minh';
        req.session.shippingInfo = {
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
            note: req.body.note,
            method: req.body.shipping_method,
        };
        let date = new Date();
        let createDate = moment(date).format('YYYYMMDDHHmmss');

        let ipAddr =
            req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        let config = require('config');

        let tmnCode = config.get('vnp_TmnCode');
        let secretKey = config.get('vnp_HashSecret');
        let vnpUrl = config.get('vnp_Url');
        let returnUrl = config.get('vnp_ReturnUrl');
        let orderId = moment(date).format('DDHHmmss');
        let total = req.body.total;
        let bankCode = 'VNBANK';

        let locale = 'vn';
        if (locale === null || locale === '') {
            locale = 'vn';
        }
        let currCode = 'VND';
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = total * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if (bankCode !== null && bankCode !== '') {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = indexController.sortObject(vnp_Params);

        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require('crypto');
        let hmac = crypto.createHmac('sha512', secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

        res.redirect(vnpUrl);
    }

    vnpay_return(req, res, next) {
        let vnp_Params = req.query;

        let secureHash = vnp_Params['vnp_SecureHash'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        vnp_Params = indexController.sortObject(vnp_Params);

        let config = require('config');
        let tmnCode = config.get('vnp_TmnCode');
        let secretKey = config.get('vnp_HashSecret');

        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require('crypto');
        let hmac = crypto.createHmac('sha512', secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

        if (secureHash === signed) {
            //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

            //   res.render("client/success", {
            //     headclient: true,
            //     showNavbarClient: true,
            //     showFooterClient: true,
            //     jsclient: true,
            //     code: vnp_Params["vnp_ResponseCode"],
            //     username: req.session.username,
            //     cartuserid: req.session.cartuserid,
            //   });
            indexController.Static_submit_checkout(req, res, next);
        } else {
            res.render('client/success', {
                headclient: true,
                showNavbarClient: true,
                showFooterClient: true,
                jsclient: true,
                code: '97',
                username: req.session.username,
                cartuserid: req.session.cartuserid,
            });
        }
    }

    refund(req, res, next) {
        process.env.TZ = 'Asia/Ho_Chi_Minh';
        let date = new Date();

        let config = require('config');
        let crypto = require('crypto');

        let vnp_TmnCode = config.get('vnp_TmnCode');
        let secretKey = config.get('vnp_HashSecret');
        let vnp_Api = config.get('vnp_Api');

        let vnp_TxnRef = req.body.orderId;
        let vnp_TransactionDate = req.body.transDate;
        let vnp_Amount = req.body.amount * 100;
        let vnp_TransactionType = req.body.transType;
        let vnp_CreateBy = req.body.user;

        let currCode = 'VND';

        let vnp_RequestId = moment(date).format('HHmmss');
        let vnp_Version = '2.1.0';
        let vnp_Command = 'refund';
        let vnp_OrderInfo = 'Hoan tien GD ma:' + vnp_TxnRef;

        let vnp_IpAddr =
            req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        let vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');

        let vnp_TransactionNo = '0';

        let data =
            vnp_RequestId +
            '|' +
            vnp_Version +
            '|' +
            vnp_Command +
            '|' +
            vnp_TmnCode +
            '|' +
            vnp_TransactionType +
            '|' +
            vnp_TxnRef +
            '|' +
            vnp_Amount +
            '|' +
            vnp_TransactionNo +
            '|' +
            vnp_TransactionDate +
            '|' +
            vnp_CreateBy +
            '|' +
            vnp_CreateDate +
            '|' +
            vnp_IpAddr +
            '|' +
            vnp_OrderInfo;
        let hmac = crypto.createHmac('sha512', secretKey);
        let vnp_SecureHash = hmac
            .update(new Buffer(data, 'utf-8'))
            .digest('hex');

        let dataObj = {
            vnp_RequestId: vnp_RequestId,
            vnp_Version: vnp_Version,
            vnp_Command: vnp_Command,
            vnp_TmnCode: vnp_TmnCode,
            vnp_TransactionType: vnp_TransactionType,
            vnp_TxnRef: vnp_TxnRef,
            vnp_Amount: vnp_Amount,
            vnp_TransactionNo: vnp_TransactionNo,
            vnp_CreateBy: vnp_CreateBy,
            vnp_OrderInfo: vnp_OrderInfo,
            vnp_TransactionDate: vnp_TransactionDate,
            vnp_CreateDate: vnp_CreateDate,
            vnp_IpAddr: vnp_IpAddr,
            vnp_SecureHash: vnp_SecureHash,
        };

        request(
            {
                url: vnp_Api,
                method: 'POST',
                json: true,
                body: dataObj,
            },
            function (error, response, body) {
                console.log(response);
            },
        );
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

    viewDetailhistory(req, res, next) {
        const ordercode = req.params.id;
        const orderid = req.query.q;
        DetailOrder.findAll({
            where: {
                orderid: orderid,
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
                    const itemTotal = order.quantity * order.price;
                    totalQuantity += order.quantity; // Cộng thêm số lượng sản phẩm
                    total += itemTotal;

                    // Lưu thông tin chi tiết từng sản phẩm vào mảng
                    const cartItem = {
                        order_code: order.order_code,
                        productId: order.product.id,
                        productName: order.product.name,
                        productImage: order.product.image,
                        quantity: order.quantity,
                        price: order.price,
                        itemTotal: itemTotal,
                    };

                    cartItems.push(cartItem);
                });
                res.render('client/viewDetailhistory', {
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
            })
            .catch(next);
    }
}

module.exports = new indexController();
