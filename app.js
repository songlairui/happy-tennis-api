const path = require('path')
const Hapi = require('hapi')

require('env2')(
  path.resolve(
    __dirname,
    process.env.NODE_ENV === 'production' ? './.env.prop' : './.env'
  )
)
const config = require('./config')

// 插件
const pluginSwagger = require('./plugins/swagger')
// 路由
const routerHi = require('./routes/hi')

const server = new Hapi.Server({
  port: config.port,
  host: config.host
})

const init = async () => {
  await server.register([...pluginSwagger])
  server.route([...routerHi])

  await server.start()
  console.warn('Server running at:', server.info.uri)
}

init()
