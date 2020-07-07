const bcrypt = require('bcrypt');

async function hash(string) {
  try {
    const hashString = await new Promise(function(resolve, reject) {
      bcrypt.hash(string, 10, function(err, hash) {
        if(err)
          reject(err);
        
          resolve(hash);
      });
    });

    return hashString;
  } catch(err) {
    console.log("hashString -> ", err);
    return '';
  }
}

async function compare(string, hash) {
  try {
    const compareString = await new Promise(function(resolve, reject) {
      bcrypt.compare(string, hash, function(err, result) {
        if(err) {
          console.log("bcrypt.compare -> ", err);
          reject(false);
        }

        if(result)
          resolve(true);
        
        reject(false);
      });
    });

    return compareString;
  } catch(err) {
    console.log("compareString -> ", err);
    return false;
  }
}

module.exports = {
  hash: hash,
  compare: compare
}