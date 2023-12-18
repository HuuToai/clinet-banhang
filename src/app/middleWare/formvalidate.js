const { check, body, validationResult } = require('express-validator');

function validateCreateBrand(req, res, next) {
    // Sử dụng check() để kiểm tra trường name
    body('name', 'name does not Empty').notEmpty();
    // Nếu không có lỗi, tiếp tục xử lý
    next();
}

module.exports = {
    validateCreateBrand,
};
