const Joi = require('joi')
const models = require('../models')
const { jwtHeaderDefine } = require('../utils/router-helper')

const tags = ['api', 'trace']
module.exports = [
  {
    _: ['/trace'],
    async handler(request, h) {
      return await models.trace.findAll({
        attributes: ['id', 'remark', 'type']
      })
    },
    config: {
      tags,
      description: '各种记录',
      validate: {
        ...jwtHeaderDefine
      }
    }
  },
  {
    _: ['/trace', 'POST'],
    async handler(request, h) {
      // 托管事务的方式操作
      return await models.sequelize
        .transaction(t =>
          models.trace.create(request.payload, { transaction: t })
        )
        .then(() => {
          return 'success'
        })
        .catch(e => {
          console.warn('e', e)
          return 'error'
        })
    },
    config: {
      tags,
      description: '创建一条记录',
      auth: false,
      validate: {
        payload: {
          remark: Joi.any().description('备注内容'),
          type: Joi.string().description('事件类型')
        }
      }
    }
  }
]
