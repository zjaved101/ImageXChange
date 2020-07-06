const express = require('express');
const router = express.Router();
const db = require('../config/db');
// const bcrypt = require('bcrypt');
const bcrypt = require('../lib/bcrypt');

/* GET users listing. */
router.post('/signup', function(req, res, next) {  
  bcrypt.hashPassword(req.body.password).then(function (string) {
    db.query("INSERT INTO User(username,password,email) VALUES(?,?,?)", [req.body.username, req.body.password, req.body.email], function (err, results, fields) {
      if(err && err['code'] === 'ER_DUP_ENTRY') {
        // Set http status code and return message for duplicate entry in DB
        res.status(400);
        return res.send('duplicate entry detected');
      }

      res.send('Successfully created account');
    });
  }, function(failure) {
    console.log(failure)
    res.status(500);
    res.send(failure);
  });
});

module.exports = router;