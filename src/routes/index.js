const accountRouter = require('./admin/account');
const brandRouter = require('./admin/brand');
const categoryRouter = require('./admin/category');
const productRouter = require('./admin/product');
function route(app) {
    app.use('/admin/brand', brandRouter);
    app.use('/admin/category', categoryRouter);
    app.use('/admin/product', productRouter);
    app.use('/admin', accountRouter);
}

module.exports = route;
