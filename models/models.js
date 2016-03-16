'use strict';

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/gifdailydb';
const Sequelize = require('sequelize');

const sequelize = new Sequelize(DATABASE_URL);

//Favorites Schema model
module.exports = function(sequelize, DataTypes) {
  var Favorites = sequelize.define('Favorites', {
      FavoriteId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Url: DataTypes.STRING,
      UserId: DataTypes.INTEGER
    },
    {
      tableName: 'Favorites',
      classMethods: {
        associate: function(models) {
        // associations can be defined here
        // Favorites.belongsto(model.User)
        }
      }
    });
  return Favorites;

};

sequelize.sync();


