const express = require('express');
const router = express.Router();
const brandController = require('../../app/controllers/admin/brandController');
router.get('/create', brandController.create);
router.post('/store', brandController.store);
router.get('/:id/edit', brandController.edit);
router.patch('/:id/', brandController.update);
router.patch('/:id/restore', brandController.restore);
router.delete('/:id/', brandController.destroy); // xoa thi delete id
router.delete('/:id/force', brandController.forceDestroy); // xoa thi delete id
router.get('/trash', brandController.trashBrand);
router.post('/search', brandController.searchBrand);

router.get('/', brandController.index);

module.exports = router;
