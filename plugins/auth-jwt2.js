const hapiAuthJwt2 = require('hapi-auth-jwt2')
const config = require('../config')
const models = require('../models')

const validate = ({ id }) => {
  // do your checks to see if the person is valid
  return { isValid: id !== undefined }
}

module.exports = {
  plugin: {
    name: 'tennis-auth',
    register: async (server, options) => {
      await server.register(hapiAuthJwt2)
      server.auth.strategy('jwt', 'jwt', {
        key: config.jwtSecret,
        validate
      })
      server.auth.default('jwt')
    }
  }
}
