const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/sequelize');

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        cartuserid: {
            type: DataTypes.STRING, // Kiểu dữ liệu của cartUserID
        },
    },
    {
        tableName: 'users',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deletedAt',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        paranoid: true,
        timestamps: true,
    },
);

// Trước khi tạo bản ghi, thêm hook để tự động tạo giá trị cho cartUserID
User.beforeCreate((user, options) => {
    user.cartuserid = generateCartUserID(); // Gọi hàm để tạo giá trị cartUserID
});

// Hàm tạo giá trị cho cartUserID (ví dụ đơn giản)
function generateCartUserID() {
    return Math.random().toString(36).substring(7);
}

User.sync({
    alter: true,
})
    .then(() => {})
    .catch((error) => {
        console.error('Lỗi khi cập nhật cơ sở dữ liệu:', error);
    });
module.exports = User;
