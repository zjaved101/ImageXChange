const express = require('express');
const router = express.Router();
const db = require('../config/db');

/* POST upload image */
router.post('/upload', function(req, res, next) {  
    db.query("INSERT INTO Image(user_id,img_loc,price) VALUES(?,?,?)", [req.body.user_id, req.body.img_loc,req.body.price], function (err, results, fields) {
        console.log(results);
        if(err && err['code'] === 'ER_DUP_ENTRY') {
          // Set http status code and return message for duplicate entry in DB
          res.status(400);
          return res.send('duplicate entry detected');
        }
  
        return res.send('Successfully created account');
      });
    // return res.send('error with upload');
});

router.post('/buy', function(req, res, next) {
  db.query("INSERT INTO Transaction(user_id,img_id) VALUES(?,?)", [req.body.user_id, req.body.img_id], function (err, results, fields) {
    console.log(results);
    if(err && err['code'] === 'ER_DUP_ENTRY') {
      // Set http status code and return message for duplicate entry in DB
      res.status(400);
      return res.send('duplicate entry detected');
    }

    return res.send('Successfully bought image');
  });
});

module.exports = router;