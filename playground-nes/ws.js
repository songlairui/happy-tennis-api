const Hapi = require('hapi')
const Nes = require('nes')

const server = new Hapi.Server({
  host: '0.0.0.0',
  port: 9876
})
const onConnection = socket => {
  console.info('connect arrived', socket.id)
  server.broadcast({ welcome: socket.id })
}
const onDisconnection = socket => {
  console.info(socket.id, 'leave')
  server.broadcast({ bye: socket.id })
}

const start = async () => {
  await server.register({
    plugin: Nes,
    options: { onConnection, onDisconnection, auth: false }
  })
  server.subscription('/item/{id}')

  server.route({
    method: 'GET',
    path: '/h',
    async handler(request, h) {
      return 'world'
    },
    options: {
      id: 'hello'
    }
  })
  await server.start()
  setInterval(() => {
    server.publish('/item/5', { id: 5, status: 'complete' })
    server.publish('/item/6', { id: 6, status: 'initial' })
  }, 1234)

  console.info(server.info)
}

start()
