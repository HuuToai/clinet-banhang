const Admin = require("../../models/admin/loginModel");
const sequelize = require("../../../config/sequelize");
const { Op } = require("sequelize");

class brandController {
  // [GET] /news
  index(req, res) {
    res.render("brand/home", {
      showSlider: true,
      showNavbar: true,
      showRightBar: true,
      //laays use tu session
      user: req.session.user,
      name: req.session.name,
    });
  }

  create(req, res) {
    res.render("admin/brand/create", {
      showSlider: true,
      showNavbar: true,
      showRightBar: true,
      user: req.session.user,
      name: req.session.name,
    });
  }
}

module.exports = new brandController();
