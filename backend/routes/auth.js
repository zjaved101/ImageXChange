const express = require('express');
const router = express.Router();
const db = require('../config/db');

/* GET users listing. */
router.post('/signup', function(req, res, next) {
  // db.query("SELECT * FROM User", function(err, rows, fields) {
  //   console.log(rows);
  // });
  // console.log('request: ', req.body);
  // console.log(`request: ${req.body.username}`);
  // res.send('This is the signup post route');
  
  console.log('request: ', req.body);
  db.query("INSERT INTO User(username,password,email) VALUES(?,?,?)", [req.body.username, req.body.password, req.body.email], function (err, results, fields) {
    console.log(err);
    res.send(results);
  });
});

module.exports = router;