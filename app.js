const Hapi = require('hapi')

const server = new Hapi.Server({
  port: 3001,
  host: '127.0.0.1'
})

const init = async () => {
  server.route([
    {
      method: 'GET',
      path: '/',
      handler(request, h) {
        return 'hello'
      }
    }
  ])

  await server.start()
  console.warn('Server running at:', server.info.uri)
}

init()
