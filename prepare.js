const path = require('path')
const Hapi = require('hapi')
const Boom = require('boom')

require('env2')(
  path.resolve(
    __dirname,
    process.env.NODE_ENV === 'production' ? './.env.prop' : './.env'
  )
)
const config = require('./config')

const server = new Hapi.Server({
  port: config.port,
  host: config.host,
  routes: {
    validate: {
      failAction: async (request, h, err) => {
        if (process.env.NODE_ENV === 'production') {
          // In prod, log a limited error message and throw the default Bad Request error.
          console.error('ValidationError:', err.message)
          throw Boom.badRequest(`Invalid request payload input`)
        } else {
          // During development, log and respond with the full error.
          console.error(err)
          throw err
        }
      }
    }
  }
})

module.exports = server
