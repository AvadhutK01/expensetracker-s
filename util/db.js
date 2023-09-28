const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('expense-db', 'root', 'root123', { dialect: 'mysql', host: 'localhost' })

module.exports = sequelize;