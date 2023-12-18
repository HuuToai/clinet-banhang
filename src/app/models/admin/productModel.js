const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/sequelize');
const slugify = require('sequelize-slugify');

const Product = sequelize.define(
    'Product',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        slug: {
            type: DataTypes.STRING,
            unique: true,
        },
        image: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        price_in: {
            type: DataTypes.FLOAT,
        },
        price: {
            type: DataTypes.FLOAT,
        },

        category_id: {
            type: DataTypes.INTEGER,
        },
        brand_id: {
            type: DataTypes.INTEGER,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        sold: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        createdBy: {
            type: DataTypes.STRING,
        },
        updatedBy: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'products',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deletedAt',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        paranoid: true,
        timestamps: true,
    },
);
slugify.slugifyModel(Product, {
    source: ['name'],
    slugOptions: { lower: true },
    overwrite: false,
    column: 'slug',
});

Product.sync({
    alter: true,
})
    .then(() => {
        // console.log("Cơ sở dữ liệu đã được cập nhật thành công.");
    })
    .catch((error) => {
        console.error('Lỗi khi cập nhật cơ sở dữ liệu:', error);
    });
module.exports = Product;
