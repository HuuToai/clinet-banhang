const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/sequelize');
const slugify = require('sequelize-slugify');
const Product = require('../admin/productModel');
const Order_details = sequelize.define(
    'Order_details',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        order_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    },
    {
        tableName: 'order_details',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deletedAt',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        paranoid: true,
        timestamps: true,
    },
);
Order_details.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });

Order_details.sync({
    alter: true,
})
    .then(() => {
        // console.log("Cơ sở dữ liệu đã được cập nhật thành công.");
    })
    .catch((error) => {
        console.error('Lỗi khi cập nhật cơ sở dữ liệu:', error);
    });
module.exports = Order_details;
