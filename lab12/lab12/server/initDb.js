const sequelizeDB = require('./db').sequelizeDB;
const User = require('./models/User');
const Cart = require('./models/Cart');

const initDB = async () => {
    try {
        sequelizeDB.sync({force: false})
        console.log('Database synchronized');
    }
    catch (err) {
        console.error('Unable to synchronize the database', err);
    }
};

module.exports = {
    initDB
}