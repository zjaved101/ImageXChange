const express = require('express');
const router = express.Router();
const db = require('../config/db');

/* GET users listing. */
router.post('/signup', function(req, res, next) {  
  db.query("INSERT INTO User(username,password,email) VALUES(?,?,?)", [req.body.username, req.body.password, req.body.email], function (err, results, fields) {
    if(err && err['code'] === 'ER_DUP_ENTRY') {
      // Set http status code and return message
      res.status(400);
      res.send('duplicate entry detected');
    }
    res.send(200);
  });
});

module.exports = router;