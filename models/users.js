'use strict';

const bcrypt = require('bcrypt');

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

