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
        await server.register({
          plugin: Nes,
          options: { onConnection, onDisconnection }
        })
        server.subscription('/online/{activityId}/{action}', {
          filter: () => {
            /// path, message, options
            return true
            // return message.id !== options.credentials.id
          }
        })
      }
    }
  }
]
