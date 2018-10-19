const path = require('path')
const Hapi = require('hapi')
const hapiAuthJwt2 = require('hapi-auth-jwt2')

require('env2')(
  path.resolve(
    __dirname,
    process.env.NODE_ENV === 'production' ? './.env.prop' : './.env'
  )
)
const config = require('./config')
const transformRouter = require('./utils/transformRouter')

// 插件-array
const pluginSwagger = require('./plugins/swagger')
const pluginPagination = require('./plugins/pagination')
// 插件-fn
const enableAuthJwt2 = require('./plugins/auth-jwt2')
// 路由
const routeHi = require('./routes/hi')
const routeTrace = require('./routes/trace')

const server = new Hapi.Server({
  port: config.port,
  host: config.host
})

const init = async () => {
  await server.register([...pluginSwagger, pluginPagination, hapiAuthJwt2])
  enableAuthJwt2(server)
  server.route(transformRouter([...routeHi, ...routeTrace]))
  await server.start()
  console.warn('Server running at:', server.info.uri)
}

init()
