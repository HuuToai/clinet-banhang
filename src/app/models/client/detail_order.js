const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/sequelize');
const Product = require('../admin/productModel');
const Order = require('./order_model');
const Detail_order = sequelize.define(
    'Detail_order',
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
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        orderid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'detail_orders',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deletedAt',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        paranoid: true,
        timestamps: true,
    },
);

Detail_order.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product',
    constraints: false,
});

// Trong model DetailOrder
Detail_order.sync({
    alter: true,
})
    .then(() => {
        // console.log("Cơ sở dữ liệu đã được cập nhật thành công.");
    })
    .catch((error) => {
        console.error('Lỗi khi cập nhật cơ sở dữ liệu:', error);
    });
module.exports = Detail_order;
