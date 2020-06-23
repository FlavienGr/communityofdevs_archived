// src/utils/Helper.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const helper = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },
  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  /**
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */
  generateToken(id) {
    const token = jwt.sign(
      {
        id
      },
      process.env.SECRET_JWT,
      {
        expiresIn: process.env.JWT_EXPIRE
      }
    );
    return token;
  }
};

module.exports = helper;
