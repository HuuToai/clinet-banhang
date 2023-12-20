const express = require('express');
const router = express.Router();
const orderController = require('../../app/controllers/admin/orderController');
router.get('/:id/view', orderController.view);

router.delete('/:id/force', orderController.forceDestroy); // xoa thi delete id
router.post('/process', orderController.process);
// router.get("/delete", orderController.delete);

router.get('/', orderController.index);
module.exports = router;
