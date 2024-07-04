const { Sequelize } = require('sequelize');
const config = require('../config/config')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Journal = require('./Journal')(sequelize, Sequelize);

db.User.hasMany(db.Journal, { as: 'entries' });
db.Journal.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

module.exports = db;
