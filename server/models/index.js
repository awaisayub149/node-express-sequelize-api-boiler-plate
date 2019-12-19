/**
 *  models index.js
 *
 * 
 * This is the main entry for our Database and sequelize models
 * 
 *
 * @awaisayub149 awaisayub149@gmail.com
 *
 */


'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};
if (process.env.DATABASE_URL) {
  var sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  const config = require(`${__dirname}/../config/config.json`)[env];
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    model.prototype.JSON = function(jsonAttrs=['id']) {
      const json = {};
      json.refId = this.refId();
      jsonAttrs.forEach((attr) => { json[attr] = this[attr] })
      return json;
    }
    if(!model.prototype.refId) {
      model.prototype.refId = function(){
        return `${this.constructor.name[0].toLowerCase()}_${this.id}`;
      }
    }
    
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
