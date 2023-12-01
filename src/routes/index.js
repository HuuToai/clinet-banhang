const adminRouter = require('./admin');

function route(app) {
  // app.use("/me", meRouter); //đường dẫn news thì dùng newsRouter
  app.use('/', adminRouter); //đường dẫn news thì dùng newsRouter
}

module.exports = route;
