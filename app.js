const path = require('path')
const Hapi = require('hapi')

require('env2')(
  path.resolve(
    __dirname,
    process.env.NODE_ENV === 'production' ? './.env.prop' : './.env'
  )
)
const config = require('./config')
const transformRouter = require('./utils/transformRouter')

// 插件
const pluginSwagger = require('./plugins/swagger')
// 路由
const routeHi = require('./routes/hi')
const routeTrace = require('./routes/trace')

const server = new Hapi.Server({
  port: config.port,
  host: config.host
})

const init = async () => {
  await server.register([...pluginSwagger])
  server.route(transformRouter([...routeHi, ...routeTrace]))

  await server.start()
  console.warn('Server running at:', server.info.uri)
}

init()
