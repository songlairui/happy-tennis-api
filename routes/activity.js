const Joi = require('joi')
const models = require('../models')
const { jwtHeaderDefine } = require('../utils/router-helper')

const tags = ['api', 'activity']
const Joitem = (desc, need) =>
  need
    ? Joi.string()
        .required()
        .description(desc)
    : Joi.any().description(desc)

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
    _: ['/activity/{id}'],
    async handler(request, h) {
      const { id } = request.params
      const [activity, err] = await models.activity.findAll({ where: { id } })
      if (err) return h.response('multi item in id').code(409)
      if (!activity) return h.response().code(404)
      return activity
    },
    options: {
      tags,
      auth: false,
      validate: {
        params: {
          id: Joi.any()
            .required()
            .description('活动 id')
        }
      }
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
    _: ['/activity/{id}', 'PUT'],
    async handler(request, h) {
      const { id } = request.params
      const [activity] = await models.activity.findAll({ where: { id } })
      if (!activity) h.response('no activity').code(404)
      await models.activity.update(request.payload, { where: { id } })
      return h.response().code(204)
    },
    options: {
      tags,
      validate: {
        ...jwtHeaderDefine,
        params: {
          id: Joi.any()
            .required()
            .description('活动 id')
        },
        payload: {
          title: Joitem('活动名称'),
          date: Joitem('活动日期'),
          start: Joitem('开始时间'),
          end: Joitem('结束时间'),
          detail: Joitem('训练内容等'),
          location: Joitem('地点')
        }
      }
    }
  },
  {
    _: ['/activity/{id}', 'DELETE'],
    async handler(request) {},
    options: {
      tags,
      validate: {
        ...jwtHeaderDefine
      }
    }
  }
]
