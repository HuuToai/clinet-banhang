const express = require('express');
const router = express.Router();
const homeController = require('../../app/controllers/admin/homeController');
const { checkAuthentication } = require('../../app/middleWare/middleware');

router.get('/login', homeController.login);
router.post('/processlogin', homeController.processLogin);
router.use(checkAuthentication);

router.get('/register', homeController.register);
router.get('/logout', homeController.logout);
router.get('/view', homeController.show);
router.post('/store', homeController.store);
router.get('/:id/edit', homeController.edit);
router.patch('/:id/', homeController.update);
router.patch('/:id/restore', homeController.restore);
router.delete('/:id/', homeController.destroy); // xoa thi delete id
router.delete('/:id/force', homeController.forceDestroy); // xoa thi delete id
router.get('/trash', homeController.trashAccount);
router.post('/search', homeController.searchAccount);
router.get('/', homeController.index);

module.exports = router;
