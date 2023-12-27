const Admin = require('../../models/admin/loginModel');
const sequelize = require('../../../config/sequelize');
const md5 = require('md5');
const { Op } = require('sequelize');

class homeController {
    // [GET] /news
    index(req, res) {
        res.render('admin/home', {
            headadmin: true,
            jsadmin: true,
            showSlider: true,
            showNavbar: true,
            showRightBar: true,
            //laays use tu session
            user: req.session.user,
            name: req.session.name,
        });
    }

    show(req, res, next) {
        Promise.all([
            Admin.findAll({ raw: true }),
            Admin.count({
                where: {
                    deletedAt: {
                        [Op.not]: null,
                    },
                },
                paranoid: false,
                raw: true,
            }),
        ])
            .then(([accounts, count]) =>
                res.render('admin/account/view-account', {
                    accounts,
                    count,
                    headadmin: true,
                    jsadmin: true,
                    showSlider: true,
                    showNavbar: true,
                    showRightBar: true,
                    user: req.session.user,
                    name: req.session.name,
                }),
            )
            .catch(next);
    }
    register(req, res) {
        res.render('admin/account/register', {
            headadmin: true,
            jsadmin: true,
            showSlider: false,
            showNavbar: false,
            showRightBar: false,
        });
    }

    edit(req, res, next) {
        Admin.findByPk(req.params.id, { raw: true })
            .then((admins) => {
                res.render('admin/account/edit', {
                    admins,
                    headadmin: true,
                    jsadmin: true,
                    showSlider: true,
                    showNavbar: true,
                    showRightBar: true,
                    user: req.session.user,
                    name: req.session.name,
                });
            })
            .catch((err) => {
                next(err);
            });
    }

    // [POST] /admin/:id
    async update(req, res, next) {
        try {
            // Kiểm tra xem email đã tồn tại chưa
            const existingAdmin = await Admin.findOne({
                where: {
                    email: req.body.email,
                },
            });

            if (existingAdmin) {
                const hashedPassword = md5(req.body.password);

                Admin.update(
                    {
                        name: req.body.name,
                        email: req.body.email,
                        password: hashedPassword,
                    },
                    {
                        where: {
                            id: req.params.id,
                        },
                    },
                );
                res.redirect('/admin/view', {
                    headadmin: true,
                    jsadmin: true,
                    showSlider: true,
                    showNavbar: true,
                    showRightBar: true,
                    user: req.session.user,
                    name: req.session.name,
                });
            } else {
                // Nếu email chưa tồn tại, tiến hành tạo tài khoản
            }
        } catch (error) {
            console.error('Lỗi khi sửa tài khoản:', error);
            res.status(400).json({
                success: false,
                error: 'Lỗi khi sửa tài khoản',
            });
        }
    }

    async store(req, res) {
        try {
            // Kiểm tra xem email đã tồn tại chưa
            const existingAdmin = await Admin.findOne({
                where: {
                    email: req.body.email,
                },
            });

            if (existingAdmin) {
                // Nếu email đã tồn tại, báo lỗi
                res.status(400).json({
                    success: false,
                    error: 'Email đã tồn tại',
                });
            } else {
                // Nếu email chưa tồn tại, tiến hành tạo tài khoản
                const hashedPassword = md5(req.body.password);
                console.log(hashedPassword);

                const admin = await Admin.create({
                    email: req.body.email,
                    name: req.body.name,
                    password: hashedPassword,
                });
                res.redirect('/admin', {
                    headadmin: true,
                    jsadmin: true,
                    showSlider: true,
                    showNavbar: true,
                    showRightBar: true,
                    user: req.session.user,
                    name: req.session.name,
                });
            }
        } catch (error) {
            console.error('Lỗi khi tạo tài khoản:', error);
            res.status(400).json({
                success: false,
                error: 'Lỗi khi tạo tài khoản',
            });
        }
    }

    login(req, res) {
        res.render('admin/account/login', {
            headadmin: true,
            jsadmin: true,
            showSlider: false,
            showNavbar: false,
            showRightBar: false,
        });
    }

    async processLogin(req, res) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            // Tìm kiếm người dùng trong cơ sở dữ liệu bằng email
            const admin = await Admin.findOne({ email });
            if (!admin) {
                return res.status(401).json({
                    success: false,
                    error: 'Email hoặc mật khẩu không đúng',
                });
            }

            // Mã hóa mật khẩu nhập vào để so sánh với mật khẩu đã lưu
            const hashedPassword = md5(password);

            if (hashedPassword === admin.password) {
                // Mật khẩu đúng, đăng nhập thành công
                req.toastr.success('Đăng nhập thành công', 'Đã đăng nhập!');
                const name = admin.name;
                req.session.user = email;
                req.session.name = name;
                res.redirect('/admin');
            } else {
                // Mật khẩu không đúng, đăng nhập thất bại

                res.redirect('/admin/login');
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Lỗi khi đăng nhập',
            });
        }
    }

    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                res.redirect('/admin');
            } else {
                res.redirect('/admin/login');
            }
        });
    }

    // [DELETE] /admin/:id/force
    forceDestroy(req, res, next) {
        Admin.destroy({
            where: {
                id: req.params.id,
            },
            force: true,
        })
            .then(() => {
                res.redirect('back');
            })
            .catch((err) => {
                next(err);
            });
    }
    // [DELETE] /admin/:id
    async destroy(req, res, next) {
        await Admin.destroy({
            where: {
                id: req.params.id,
            },
            paranoid: true, //muốn xóa hẳn thì bỏ cái này đi thì mặc định là force: true
        })
            .then(() => {
                res.redirect('back');
            })
            .catch((err) => {
                next(err);
            });
    }
    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Admin.restore({ where: { id: req.params.id } })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }
    // [GET] me/trash/courses
    trashAccount(req, res, next) {
        Admin.findAll({
            where: {
                deletedAt: {
                    [Op.not]: null,
                },
            },
            paranoid: false,
            raw: true,
        })
            .then((accounts) => {
                res.render('admin/account/trash-account', {
                    accounts,
                    headadmin: true,
                    jsadmin: true,
                    showSlider: true,
                    showNavbar: true,
                    showRightBar: true,
                    user: req.session.user,
                    name: req.session.name,
                });
            })
            .catch(next);
    }
    searchAccount(req, res, next) {
        const search = req.body.search;
        Promise.all([
            Admin.findAll({
                where: {
                    name: {
                        [Op.like]: `%${search}%`,
                    },
                },
                raw: true,
            }),
            Admin.count({
                where: {
                    deletedAt: {
                        [Op.not]: null,
                    },
                },
                paranoid: false,
                raw: true,
            }),
        ])
            .then(([accounts, count]) =>
                res.render('admin/account/view-account', {
                    accounts,
                    count,
                    headadmin: true,
                    jsadmin: true,
                    showSlider: true,
                    showNavbar: true,
                    showRightBar: true,
                    user: req.session.user,
                    name: req.session.name,
                }),
            )
            .catch(next);
    }
}

module.exports = new homeController();
