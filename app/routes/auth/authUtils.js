const crypto = require('crypto');
const cryptoRandomString = require('crypto-random-string');
const db = require('../../db');
const jwt = require('jsonwebtoken');
const queries = require('../../res/queries');
const errors = require('../../res/errors');

module.exports = {
   // Register a new device
   register: () => {
    const newId = cryptoRandomString({length: 8, type: 'alphanumeric'});
    const hashId = crypto.createHmac('sha256', process.env.SECRET)
      .update(newId)
      .digest('hex');
      
    return db.query(queries.insert_new_device, [hashId])
      .then(() => ({id: newId}))
  },
  login: (username, password) => {
    let hashPassword = crypto.createHmac('sha256', process.env.SECRET).update(password).digest('hex');
    return db.query(queries.select_user, [username])
      .then(rows => {
        if (rows.length > 0) {
          if (rows[0].password === hashPassword) {
            let token = jwt.sign({username}, process.env.SECRET, { expiresIn: '2h' });
            return {success: 1, token}
          } else {
            return {success: 0, message: errors.invalid_credentials}
          }
        } else {
          return {success: 0, message: errors.invalid_credentials}
        }
      })
  },
  verify: (token) => {
    return jwt.verify(token, process.env.SECRET, (err) => {
      if (err) return {success: 0, message: errors.unauthorized};
      return {success: 1, message: errors.token_verified}
    });
  }
}

