const Brand = require('../../models/admin/brandModel');
const sequelize = require('../../../config/sequelize');
const { Op } = require('sequelize');
const { body } = require('express-validator');
const uploadMiddleware = require('../../middleWare/uploadMiddleware');
const multer = require('multer');
const {
    validateCreateBrand,
    validateUpdateBrand,
    handleValidationErrors,
} = require('../../middleWare/formvalidate');
const { validationResult } = require('express-validator');
class brandController {
    // [GET] /news
    index(req, res) {
        res.render('brand/home', {
            showSlider: true,
            showNavbar: true,
            showRightBar: true,
            //laays use tu session
            user: req.session.user,
            name: req.session.name,
        });
    }

    create(req, res) {
        res.render('admin/brand/create', {
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
            // Kiểm tra lỗi xác thực
            // Xác thực dữ liệu khi tạo mới người dùng
            const validationMiddleware = validateCreateBrand();
            // Xử lý lỗi xác thực trước khi thực hiện logic tạo mới brand
            validationMiddleware.push(handleValidationErrors);

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
            Admin.create(brand)
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
}

module.exports = new brandController();
