// middleware.js
const checkAuthentication = (req, res, next) => {
  // Bỏ qua kiểm tra đăng nhập nếu đây là route đăng nhập
  if (req.path === "/admin/login" || req.path === "/admin/processlogin") {
    return next();
  }

  if (req.session && req.session.user) {
    next();
  } else {
    req.toastr.error(
      "bạn cần phải login trước khi vào trang này!",
      "Bạn chưa Đăng nhập"
    );
    return res.redirect("/admin/login");
  }
};

module.exports = {
  checkAuthentication,
};
