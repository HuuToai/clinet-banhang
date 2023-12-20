// config/db.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    timezone: '+07:00', // Đặt múi giờ Việt Nam
    host: '103.18.6.239',
    username: 'v2wrml5xinov_userlocal',
    password: 'adminlocal',
    database: 'v2wrml5xinov_nodejs',
    define: {
        timestamps: false,
    },
});

function close() {
    // Đóng kết nối đến cơ sở dữ liệu nếu đối tượng Sequelize tồn tại
    if (sequelize) {
        sequelize
            .close()
            .then(() => {
                console.log('Đã đóng kết nối đến cơ sở dữ liệu.');
            })
            .catch((err) => {
                console.error('Không thể đóng kết nối đến cơ sở dữ liệu:', err);
            });
    }
}

(module.exports = sequelize), { close };
