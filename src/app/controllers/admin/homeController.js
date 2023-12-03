class homeController {
    // [GET] /news
    index(req, res) {
        res.render('admin/home');
    }
}

module.exports = new homeController();
