// middleware.js
const checklogin = (req, res, next) => {
    // Bỏ qua kiểm tra đăng nhập nếu đây là route đăng nhập
    if (
        req.path === '/login' ||
        req.path === '/processlogin' ||
        req.path === '/register' ||
        req.path === '/process-register' ||
        req.path === '/'
    ) {
        return next();
    }

    if (req.session.username && req.session) {
        next();
    } else {
        req.toastr.error(
            'bạn cần phải login trước khi vào trang này!',
            'Bạn chưa Đăng nhập',
        );
        return res.redirect('/login');
    }
};

module.exports = {
    checklogin,
};
