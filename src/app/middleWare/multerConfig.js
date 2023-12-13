const multer = require('multer');
const path = require('path');

// Hàm để xác định thư mục đích dựa trên một đối số hoặc điều kiện khác
const destinationForUpload = (subfolder) => {
    return function (req, file, cb) {
        const uploadPath = path.join('src/public/uploads/', subfolder);
        cb(null, uploadPath);
    };
};

// Hàm để tạo tên tệp duy nhất
const generateUniqueFilename = (file) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    return (
        file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
};

// Hàm cấu hình Multer với thư mục đích được xác định từ đối số
const configureMulter = (subfolder) => {
    const storage = multer.diskStorage({
        destination: destinationForUpload(subfolder),
        filename: function (req, file, cb) {
            cb(null, generateUniqueFilename(file));
        },
    });

    return multer({ storage: storage });
};

// Sử dụng hàm trên để tạo các đối tượng upload cho từng thư mục cụ thể
const uploadToBrands = configureMulter('brands');
const uploadToCategories = configureMulter('categories');
const uploadToProducts = configureMulter('products');

module.exports = {
    uploadToBrands,
    uploadToProducts,
    uploadToCategories,
};
