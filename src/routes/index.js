const accountRouter = require("./admin/account");
const brandRouter = require("./admin/brand");
function route(app) {
  app.use("/admin", accountRouter);
  app.use("/admin/brand", brandRouter);
}

module.exports = route;
