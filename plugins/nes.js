const Nes = require('nes')

const server = require('../prepare')

const onConnection = socket => {
  console.info('connect arrived', socket.id)
  server.broadcast({ welcome: socket.id })
}
const onDisconnection = socket => {
  console.info(socket.id, 'leave')
  server.broadcast({ bye: socket.id })
}
module.exports = [
  {
    plugin: {
      name: 'nes-conf',
      register: async (server, options) => {
        console.info('register')
        await server.register({
          plugin: Nes,
          options: { onConnection, onDisconnection }
        })
        console.info('subscription')
        server.subscription('/online/{activityId}/{action}', {
          filter: (path, message, options) => {
            console.warn(path, message, options.credentials.id)
            return true
            // return message.id !== options.credentials.id
          }
        })
      }
    }
  }
]
