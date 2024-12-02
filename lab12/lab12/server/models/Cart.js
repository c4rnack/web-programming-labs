const DataTypes = require('sequelize').DataTypes;
const sequelizeDB = require('../db').sequelizeDB;
const User = require('./User.js').User;

const Cart = sequelizeDB.define('Cart', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  items: {
    type: DataTypes.JSON,
    allowNull: false
},
}, {
  timestamps: false,
});


module.exports = {
    Cart
}