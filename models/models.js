'use strict';
const bcrypt = require('bcrypt');

const BCRYPT_DIFFICULTY = 11;


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


//User Schema model
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
      UserId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      tableName: 'Users',
      timestamps: false,
      classMethods: {
        generateHashPass: function (password, done) {

          return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        }
      },
      instanceMethods: {
        authenticate: function (password, callback) {

          return bcrypt.compare(password, this.password, callback);
        }
      }

    });
  return Users;

};

