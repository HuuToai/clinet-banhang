const express = require('express');
const router = express.Router();
const productController = require('../../app/controllers/admin/productController');

const { checkAuthentication } = require('../../app/middleWare/middleware');
router.use(checkAuthentication);

router.get('/create', productController.create);
router.post('/store', productController.store);
router.get('/:id/edit', productController.edit);
router.patch('/:id/', productController.update);
router.patch('/:id/restore', productController.restore);
router.delete('/:id/', productController.destroy);
router.delete('/:id/force', productController.forceDestroy);
router.get('/trash', productController.trashProduct);
router.post('/search', productController.searchProduct);
router.get('/', productController.index);
module.exports = router;
