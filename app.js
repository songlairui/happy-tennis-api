const path = require('path')

require('env2')(
  path.resolve(
    __dirname,
    process.env.NODE_ENV === 'production' ? './.env.prop' : './.env'
  )
)

const server = require('./prepare')

const transformRouter = require('./utils/transformRouter')

// 插件-array
const pluginSwagger = require('./plugins/swagger')
const pluginPagination = require('./plugins/pagination')
const pluginNes = require('./plugins/nes')
// 插件-fn
const enableAuthJwt2 = require('./plugins/auth-jwt2')
// 路由
const routeHi = require('./routes/hi')
const routeTrace = require('./routes/trace')
const routeActivity = require('./routes/activity')
const routeUser = require('./routes/user')

const init = async () => {
  await server.register([...pluginNes])
  await server.register([pluginPagination, enableAuthJwt2, ...pluginSwagger])
  server.route(
    transformRouter([...routeHi, ...routeTrace, ...routeActivity, ...routeUser])
  )
  await server.start()
  console.warn('Server running at:', server.info.uri)
}

init()
