const config = require('../config')
const models = require('../models')

const validate = ({ id }) => {
  // do your checks to see if the person is valid
  return { isValid: id !== undefined }
}

module.exports = server => {
  server.auth.strategy('jwt', 'jwt', {
    key: config.jwtSecret,
    validate
  })
  server.auth.default('jwt')
}
