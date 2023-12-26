const express = require('express');
const router = express.Router();
const categoryController = require('../../app/controllers/admin/categoryController');
const { checkAuthentication } = require('../../app/middleWare/middleware');
router.use(checkAuthentication);

router.get('/create', categoryController.create);
router.post('/store', categoryController.store);
router.get('/:id/edit', categoryController.edit);
router.patch('/:id/', categoryController.update);
router.patch('/:id/restore', categoryController.restore);
router.delete('/:id/', categoryController.destroy);
router.delete('/:id/force', categoryController.forceDestroy);
router.get('/trash', categoryController.trashCategory);
router.post('/search', categoryController.searchCategory);

router.get('/', categoryController.index);
module.exports = router;
