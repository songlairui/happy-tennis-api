const path = require('path')
const Hapi = require('hapi')

require('env2')(path.resolve(__dirname, './.env'))
const config = require('./config')
const routerHi = require('./routes/hi')

const server = new Hapi.Server({
  port: config.port,
  host: config.host
})

const init = async () => {
  server.route([...routerHi])

  await server.start()
  console.warn('Server running at:', server.info.uri)
}

init()
