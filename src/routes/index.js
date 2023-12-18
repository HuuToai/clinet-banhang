const accountRouter = require('./admin/account');
const brandRouter = require('./admin/brand');
const categoryRouter = require('./admin/category');
const productRouter = require('./admin/product');
const orderRouter = require('./admin/order');

const indexRouter = require('./client/index');
function route(app) {
    app.use('/admin/brand', brandRouter);
    app.use('/admin/category', categoryRouter);
    app.use('/admin/product', productRouter);
    app.use('/admin/order', orderRouter);
    app.use('/admin', accountRouter);
    app.use('/', indexRouter);
}

module.exports = route;
