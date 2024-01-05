const express = require('express');
const router = express.Router();
const brandController = require('../../app/controllers/admin/brandController');
const { checkAuthentication } = require('../../app/middleWare/middleware');
const { check } = require('express-validator');
router.use(checkAuthentication);
const uploadMiddleware = require('../../app/middleWare/uploadMiddleware');
const multer = require('multer');
router.get('/create', brandController.create);

router.post(
    '/store',
    uploadMiddleware.single('image'),
    [
        check('image').custom((value, { req }) => {
            if (!req.file) {
                throw new Error('bạn chưa tải lên ảnh');
            }
            return true; // Đảm bảo phải trả về true nếu kiểm tra thành công
        }),
        check('name').notEmpty().withMessage('bạn chưa nhập tên'),
        check('description').notEmpty().withMessage('bạn chưa nhập mô tả'),
    ],
    brandController.store,
);
router.get('/:id/edit', brandController.edit);
router.patch('/:id/', brandController.update);
router.patch('/:id/restore', brandController.restore);
router.delete('/:id/', brandController.destroy); // xoa thi delete id
router.delete('/:id/force', brandController.forceDestroy); // xoa thi delete id
router.get('/trash', brandController.trashBrand);
router.post('/search', brandController.searchBrand);

router.get('/', brandController.index);

module.exports = router;
