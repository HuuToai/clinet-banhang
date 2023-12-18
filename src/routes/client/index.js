const express = require('express');
const router = express.Router();
const indexController = require('../../app/controllers/client/indexController');
const { checklogin } = require('../../app/middleWare/checklogin');

router.get('/login', indexController.login);
router.post('/process-register', indexController.processRegister);
router.post('/process-login', indexController.processLogin);
router.get('/register', indexController.register);
router.get('/shop', indexController.shop);
router.use(checklogin);
router.get('/about', indexController.about);
router.get('/services', indexController.services);
router.get('/blog', indexController.blog);
router.get('/contact', indexController.contact);
router.get('/logout', indexController.logout);
router.post('/update-cart-item', indexController.update_cart_item);
router.get('/:id/product_detail', indexController.product_detail);

router.get('/:id/delete-item-cart', indexController.deleteItem);
router.get('/:id/add-to-cart', indexController.addToCart);
router.get('/delete-cart', indexController.deletecart);
router.get('/cart', indexController.cart);
router.get('/checkout', indexController.checkout);
router.post('/submit-checkout', indexController.submit_checkout);
router.get('/thanks', indexController.thanks);

router.get('/', indexController.index);

module.exports = router;
