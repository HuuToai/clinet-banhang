const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/sequelize');
const Shipping = require('../client/shipModel');

const Order = sequelize.define(
    'Order',
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
        shipping_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
        },
    },
    {
        tableName: 'orders',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deletedAt',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        paranoid: true,
        timestamps: true,
    },
);
Order.belongsTo(Shipping, { foreignKey: 'shipping_id', as: 'shipping' });

Order.sync({
    alter: true,
})
    .then(() => {
        // console.log("Cơ sở dữ liệu đã được cập nhật thành công.");
    })
    .catch((error) => {
        console.error('Lỗi khi cập nhật cơ sở dữ liệu:', error);
    });
module.exports = Order;
