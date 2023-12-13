const express = require('express');
// const session = require("express-session");
const { engine } = require('express-handlebars');
const app = express();
const session = require('express-session');
const { Sequelize } = require('sequelize');
const flash = require('connect-flash');
const toastr = require('express-toastr');
const db = require('./config/');
const { checkAuthentication } = require('./app/middleWare/middleware');
const sequelize = require('./config/sequelize');
const path = require('path');
const route = require('./routes');
const sessionmiddleware = require('./app/middleWare/sessionmiddleware'); // Đường dẫn tới middleware
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 3000;

const methodOverride = require('method-override');
db.connect();

//use các thư viện ngoài
//http logger
app.use(bodyParser.json());
app.use(express.json()); //XMLhttprequest fetch axios

// app.use(expressValidator());
app.use(morgan('combined'));
app.use(sessionmiddleware);
app.use(flash());
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(toastr()); //thông báo
app.use((req, res, next) => {
    res.locals.toastr = req.toastr.render();
    res.locals.usuario = req.email;
    next();
});
// Sử dụng middleware để đặt res.locals.message
app.use((req, res, next) => {
    res.locals.message = req.flash();
    next();
});

app.use(methodOverride('_method')); //sử dụng để ghi đè các method của form

// app.use(methodOverride("_method")); dùng để sửa các phương thức lúc delete put của caác form
app.use(express.static(path.join(__dirname, 'public')));
// Sử dụng session để lưu trạng thái đăng nhập

//template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b, // cấu hình lại để dùng phép cộng
            eq: function (a, b) {
                //để so sánh a =  b không
                return a === b;
            },
        },
    }),
);
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resources', 'views')); //sửa lại nếu máy mac /

console.log(__dirname + '/resources/views');
//router init
// app.use(checkAuthentication);
route(app);
app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`),
);
