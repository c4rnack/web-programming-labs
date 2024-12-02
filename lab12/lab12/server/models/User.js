const DataTypes = require('sequelize').DataTypes;
const sequelizeDB = require('../db').sequelizeDB;

const User = sequelizeDB.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
},
}, {
  timestamps: false,
});


module.exports = {
    User
}