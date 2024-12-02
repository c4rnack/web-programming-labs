const sequelize = require('sequelize');

const sequelizeDB = new sequelize.Sequelize('users', 'root', 'IamEvgen2006', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    sequelizeDB
}