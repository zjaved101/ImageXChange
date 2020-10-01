const express = require('express');
const router = express.Router();
const db = require('../config/db');

/* POST upload image */
router.post('/upload', function(req, res, next) {  
    db.query("INSERT INTO Image(user_id,img_loc) VALUES(?,?)", [req.body.user_id, req.body.img_loc], function (err, results, fields) {
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

module.exports = router;