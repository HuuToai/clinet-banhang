const Sequelize = require('sequelize');

function connect() {
    const sequelize = new Sequelize(
        'v2wrml5xinov_nodejs',
        'v2wrml5xinov_userlocal',
        'adminlocal',
        {
            host: '103.18.6.239',
            dialect: 'mysql',
        },
    );

    // Xử lý sự kiện khi kết nối thành công
    sequelize
        .authenticate()
        .then(() => {
            console.log('Kết nối thành công đến cơ sở dữ liệu.');
        })
        .catch((err) => {
            console.error('Không thể kết nối đến cơ sở dữ liệu:', err);
        });
}

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

module.exports = { connect, close };
// module.exports = sequelize;
