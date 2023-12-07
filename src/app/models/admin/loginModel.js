const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/sequelize');

const Admin = sequelize.define(
    'Admin', // Tên model (đặt là Admin)
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
    },
    {
        tableName: 'admin',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deletedAt',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        paranoid: true,
        timestamps: true,
        // freezeTableName: true,//chuyển đổi tên bảng thành số nhiều
    },
);

Admin.sync({
    alter: true,
})
    .then(() => {
        // console.log("Cơ sở dữ liệu đã được cập nhật thành công.");
    })
    .catch((error) => {
        console.error('Lỗi khi cập nhật cơ sở dữ liệu:', error);
    });
module.exports = Admin;
