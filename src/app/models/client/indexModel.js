const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/sequelize');
const slugify = require('sequelize-slugify');

const Index = sequelize.define(
    'Index',
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
        tableName: 'brands',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deletedAt',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        paranoid: true,
        timestamps: true,
    },
);

// Trong model DetailOrder
Index.sync({
    alter: true,
})
    .then(() => {
        // console.log("Cơ sở dữ liệu đã được cập nhật thành công.");
    })
    .catch((error) => {
        console.error('Lỗi khi cập nhật cơ sở dữ liệu:', error);
    });

module.exports = Index;
