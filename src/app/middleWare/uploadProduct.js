const multer = require('multer');
const path = require('path');

// Khởi tạo Multer và cấu hình để lưu trữ ảnh trong thư mục uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/uploads/products');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(
            null,
            file.fieldname +
                '-' +
                uniqueSuffix +
                path.extname(file.originalname),
        );
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
