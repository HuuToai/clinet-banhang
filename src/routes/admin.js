const express = require('express');
const router = express.Router();
const homeController = require('../app/controllers/admin/homeController');

router.get('/', homeController.index); //newsController.index là funciton index trong NewsController

module.exports = router;
