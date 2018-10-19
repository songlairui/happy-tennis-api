const config = require('../config')

const people = {
  1: {
    id: 1,
    name: 'idoz'
  }
}

const validate = (decoded, request) => {
  // do your checks to see if the person is valid
  return { isValid: !!people[decoded.id] }
}

module.exports = server => {
  server.auth.strategy('jwt', 'jwt', {
    key: config.jwtSecert,
    validate
  })
  server.auth.default('jwt')
}
