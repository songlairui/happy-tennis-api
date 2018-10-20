const JWT = require('jsonwebtoken')
const config = require('../config')

module.exports = ({ id }) => {
  return JWT.sign(
    {
      id,
      exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60
    },
    config.jwtSecret
  )
}
