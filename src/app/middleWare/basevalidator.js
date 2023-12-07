function checkvalidateCreateBrand(req, user) {
    req.checkBody('email', 'Email is required').notEmpty(); //validate để trống trường email sử dụng hàm notEmpty()
    return req.validationErrors();
}

module.exports = {
    checkvalidateCreateBrand: checkvalidateCreateBrand,
};

// comment
//comment 2
