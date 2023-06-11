'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../config');
const db = {};

let dbName = process.env.DB_NAME || config.database;
let username= process.env.DB_USERNAME || config.username;
let password= process.env.DB_PASSWORD || config.password;
let host= process.env.DB_HOST || config.host;
const dialect= 'mysql'

// Create Sequelize instance with the database configuration
const sequelize = new Sequelize(dbName, username, password, {
    host: host,
    dialect: dialect,
    logging: false,
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.config.database = dbName;
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
