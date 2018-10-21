const Joi = require('joi')
const models = require('../models')
const { jwtHeaderDefine } = require('../utils/router-helper')

const tags = ['api', 'activity']
const Joitem = (desc, need) =>
  need
    ? Joi.string()
        .required()
        .description(desc)
    : Joi.string().description(desc)

module.exports = [
  {
    _: ['/activities'],
    async handler(request) {},
    options: {
      tags,
      auth: false
    }
  },
  {
    _: ['/activity/:id'],
    options: {
      tags,
      auth: false
    }
  },
  {
    _: ['/activity', 'POST'],
    async handler(request) {
      const activity = await models.sequelize.transaction(t =>
        models.activity.create(request.payload, { transaction: t })
      )
      return activity
    },
    options: {
      tags,
      validate: {
        ...jwtHeaderDefine,
        payload: {
          title: Joitem('活动名称', 1),
          date: Joitem('活动日期', 1),
          start: Joitem('开始时间', 1),
          end: Joitem('结束时间'),
          detail: Joitem('训练内容等'),
          location: Joitem('地点', 1)
        }
      }
    }
  },
  {
    _: ['/activity/:id', 'PUT'],
    async handler(request) {},
    options: {
      tags,
      validate: {
        ...jwtHeaderDefine
      }
    }
  },
  {
    _: ['/activity/:id', 'DELETE'],
    async handler(request) {},
    options: {
      tags,
      validate: {
        ...jwtHeaderDefine
      }
    }
  }
]
