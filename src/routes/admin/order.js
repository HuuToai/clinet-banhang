const express = require('express');
const router = express.Router();
const orderController = require('../../app/controllers/admin/orderController');
const { checkAuthentication } = require('../../app/middleWare/middleware');
router.use(checkAuthentication);

router.get('/:id/view', orderController.view);

router.delete('/:id/force', orderController.forceDestroy); // xoa thi delete id
router.post('/process', orderController.process);

router.get('/', orderController.index);
module.exports = router;
