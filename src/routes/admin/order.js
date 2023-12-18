const express = require('express');
const router = express.Router();
const orderController = require('../../app/controllers/admin/orderController');
// router.get("/view", orderController.show);
// router.get("/process", orderController.process);
// router.get("/delete", orderController.delete);

router.get('/', orderController.index);
module.exports = router;
