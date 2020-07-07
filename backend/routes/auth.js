const express = require('express');
const router = express.Router();
const db = require('../config/db');
// const bcrypt = require('bcrypt');
const bcrypt = require('../lib/bcrypt');

/* POST create user account */
router.post('/signup', function(req, res, next) {  
  bcrypt.hash(req.body.password).then(function (string) {
    db.query("INSERT INTO User(username,password,email) VALUES(?,?,?)", [req.body.username, string, req.body.email], function (err, results, fields) {
      if(err && err['code'] === 'ER_DUP_ENTRY') {
        // Set http status code and return message for duplicate entry in DB
        res.status(400);
        return res.send('duplicate entry detected');
      }

      return res.send('Successfully created account');
    });
  }, function(failure) {
    console.log(failure)
    res.status(500);
    res.send(failure);
  }).catch(function(err) {
    console.log("signup route hash -> ", err);
    return res.send(500);
  });
});

/* GET login to user account*/
router.get('/signin', function(req, res, next) {
  db.query("SELECT * FROM User WHERE username=?", [req.body.username], function(err, results, fields) {
    if(err) {
      console.log('signin route db query -> ', err);
      res.status(400);
      return res.send(err);
    }

    if(Array.isArray(results) && results.length) {
      // return res.send("Found account. Successfully logged in!");

      // console.log(results[0]);
      // console.log(results[0].password);

      bcrypt.compare(req.body.password, results[0].password).then(function(valid) {
        console.log(valid);
        if(valid) 
          return res.send("Login successful");
        
        res.status(400);
        return res.send("Login unsuccessful");
      }, function(failure) {
        console.log('signin route bcrypt compare -> ', failure);
        res.status(500);
        return res.send("Comparison failed");
      }).catch(function(err) {
        console.log("signin route compare -> ", err);
        return res.send(500);
      });
    } else {
      res.status(400);
      return res.send("Could not find account!!");
    }
  });
});

module.exports = router;