// validate.js
const { body, validationResult } = require('express-validator');

function validateCreateBrand() {
    return [
        body('name').notEmpty().withMessage('Bạn chưa nhập tên thương hiệu'),
        body('description')
            .notEmpty()
            .withMessage('Bạn chưa nhập mô tả thương hiệu'),
    ];
}

function validateUpdateBrand() {
    return [
        body('name').notEmpty().withMessage('Bạn chưa nhập tên thương hiệu'),
        body('description')
            .notEmpty()
            .withMessage('Bạn chưa nhập mô tả thương hiệu'),
    ];
}

function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

module.exports = {
    validateCreateBrand,
    validateUpdateBrand,
    handleValidationErrors,
};
