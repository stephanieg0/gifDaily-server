'use strict';

const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../models/');

//sessions
passport.serializeUser(function(user, done) {
  done(null, user.UserId);
});

passport.deserializeUser(function(id, done) {
  db.Users.findById(id).then(function(user) {
    done(user);
  });
});

//strategy
passport.use(new LocalStrategy ({
    usernameField: 'email'
  },
  (email, password, done) => {
    db.Users.findOne({where: {email: email }})
    .then((user) => {

      if (user) {
        user.authenticate(password, (err, valid) => {
          if (err) throw err;

          if (valid) {

            return done(null, user);
          } else {
            return done();
          }
        });
      } else {
        return done();
      }
    });
  })
);
