const models = require('../models')
const { jwtHeaderDefine } = require('../utils/router-helper')

module.exports = [
  {
    _: ['/trace'],
    async handler(request, h) {
      return await models.trace.findAll({
        attributes: ['id', 'remark']
      })
    },
    config: {
      tags: ['api', 'trace'],
      description: '各种记录',
      validate: {
        ...jwtHeaderDefine
      }
    }
  }
]
