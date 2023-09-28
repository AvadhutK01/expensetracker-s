const { Sequelize } = require("sequelize");
const sequelize = require("../util/db");
const expense = sequelize.define('expenseData', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    amount: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    desc: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
module.exports = expense;