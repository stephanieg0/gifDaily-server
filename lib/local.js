'use strict';

const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Users         = require('../models/models');

//sessions
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Users.findById(id, function(err, user) {
    done(err, user);
  });
});

//strategy
passport.use(new LocalStrategy ({
    email: 'email'
  },
  (email, password, done) => {
    Users.findOne({ email: email }, (err, user) => {
      if (err) throw err;

      if (user) {
        user.authenticate(password, (err, valid) => {
          if (err) throw err;

          if (valid) {
            done(null, user);
          } else {
            done();
          }
        });
      } else {
        done();
      }
    });
  })
);
