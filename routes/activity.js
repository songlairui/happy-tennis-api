const model = require('../models')
const { jwtHeaderDefine } = require('../utils/router-helper')

const tags = ['api', 'activity']

module.exports = [
  {
    _: ['/activities'],
    async handler(request) {},
    config: {
      tags,
      auth: false
    }
  },
  {
    _: ['/activity/:id'],
    async handler(request) {},
    config: {
      tags,
      auth: false
    }
  },
  {
    _: ['/activity', 'POST'],
    async handler(request) {},
    config: {
      tags,
      validate: {
        ...jwtHeaderDefine
      }
    }
  },
  {
    _: ['/activity/:id', 'PUT'],
    async handler(request) {},
    config: {
      tags,
      validate: {
        ...jwtHeaderDefine
      }
    }
  },
  {
    _: ['/activity/:id', 'DELETE'],
    async handler(request) {},
    config: {
      tags,
      validate: {
        ...jwtHeaderDefine
      }
    }
  }
]
