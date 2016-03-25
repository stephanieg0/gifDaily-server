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
        generateHashPass: function (password) {
          bcrypt.hash(password, BCRYPT_DIFFICULTY, (err, hash) => {
            console.log(password, BCRYPT_DIFFICULTY);
            if (err) throw err;
            return password = hash;
          });
        }
      },
      instanceMethods: {
        authenticate: function (password) {
          bcrypt.compare(password, hash, function(err, res) {
              console.log(res);
          });
        }
      }

    });
  return Users;

};

