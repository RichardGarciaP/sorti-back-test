const { Sequelize } = require('sequelize');
const initModels = require('./init-models');
const { DATABASE, DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST } = require('../config/config.env');


//const sequelize = new Sequelize('mydb', 'root', 'qwerty00', {host:'localhost', dialect: 'mysql', logging:false})
const sequelize = new Sequelize(DATABASE, DATABASE_USER, DATABASE_PASSWORD, {host: DATABASE_HOST, dialect: 'mysql', logging:false})

let models = initModels(sequelize);

module.exports = models;
