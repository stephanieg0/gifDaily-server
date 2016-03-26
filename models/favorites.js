'use strict';

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
      timestamps: false,
      classMethods: {
        associate: function(models) {
        // associations can be defined here
        // Favorites.belongsto(model.User)
        }
      }
    });
  return Favorites;

};

