const bcrypt = require('bcrypt');

async function hashPassword(password) {
  try {
    const hashPassword = await new Promise(function(resolve, reject) {
      bcrypt.hash(password, 10, function(err, hash) {
        if(err)
          reject(err);
        
          resolve(hash);
      });
    });
    
    return hashPassword;
  } catch(err) {
    console.log(err);
    return '';
  }
}

module.exports = {
  hashPassword: hashPassword
}