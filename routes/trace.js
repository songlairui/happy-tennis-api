const models = require('../models')

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
      description: '各种记录'
    }
  }
]
