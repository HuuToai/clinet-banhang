const { body, check } = require('express-validator');

exports.validate = (method, req, res, next) => {
    switch (method) {
        case 'createBrand': {
            return [
                check('name', 'aaaabạn chưa nhập tên thương hiệu').exists(),
            ];
        }
    }
};
