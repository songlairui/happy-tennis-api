const { Observable } = require('rxjs')
const { throttleTime } = require('rxjs/operators')
const Joi = require('joi')
const server = require('../prepare')
const models = require('../models')
const { jwtHeaderDefine } = require('../utils/router-helper')

const { activityStore } = models.onlines

const Op = models.Sequelize.Op

const tags = ['api', 'activity']
const Joitem = (desc, need) =>
  need
    ? Joi.string()
        .required()
        .description(desc)
    : Joi.any().description(desc)

const grabUser = user => {
  const {
    id,
    wx_user_info: { nickName, avatarUrl, gender }
  } = user
  return { id, nickName, avatarUrl, gender }
}

async function initStore(activityId) {
  let store = activityStore[activityId]
  if (store) {
    ;['available', 'ask4off', 'traces', 'onlines'].forEach(key => {
      !store[key] && (store[key] = [])
    })
    return store
  }
  ;[store] = await models.activityusers.findOrCreate({
    where: {
      activityId
    },
    attributes: ['activityId', 'available', 'ask4off', 'traces', 'onlines'],
    defaults: {
      available: [],
      ask4off: [],
      traces: [],
      onlines: []
    }
  })
  activityStore[activityId] = store
  return store
}
async function rawDraw(activityId, payload) {
  const store = activityStore[activityId]
  if (!store || !payload) {
    throw new Error('rawDraw 参数错误')
  }
  await store.update(payload)
}

let observer
const observStore = Observable.create(o => {
  observer = o
})
observStore.pipe(throttleTime(4567)).subscribe(async ([activityId, store]) => {
  await rawDraw(activityId, store)
})

module.exports = [
  {
    _: ['/activities'],
    async handler() {
      return await models.activity.findAll({
        order: [['created_at', 'DESC']]
      })
    },
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
    _: ['/activity/{activityId}/{detail}'],
    async handler(request, h) {
      const { activityId, detail } = request.params
      if (activityId === undefined) return h.response().code(404)
      await initStore(activityId)
      const userIds =
        activityStore[activityId].get({ plain: true })[detail] || []
      const users = await models.user.findAll({
        where: {
          id: {
            [Op.in]: userIds
          }
        }
      })
      return users.map(grabUser)
    },
    options: {
      tags,
      validate: {
        ...jwtHeaderDefine,
        params: {
          activityId: Joitem('活动Id', 1),
          detail: Joitem('活动详情key', 1)
        }
      }
    }
  },
  {
    _: ['/activity/{activityId}/event/{event}'],
    async handler(request, h) {
      const { auth } = request
      if (!auth || !auth.credentials) h.response().code(401)
      const { id } = auth.credentials
      const { activityId, event } = request.params
      await initStore(activityId)
      const store = activityStore[activityId].get({ plain: true })
      function append(arr, id) {
        const newArr = arr.filter(userId => userId !== id)
        newArr.push(id)
        arr.splice(0, Infinity, ...newArr)
      }
      function remove(arr, id) {
        const newArr = arr.filter(userId => userId !== id)
        arr.splice(0, Infinity, ...newArr)
      }

      switch (event) {
        case 'wander':
          append(store.onlines, id)
          append(store.traces, id)
          break
        case 'bye':
          remove(store.onlines, id)
          break
        case 'join':
          append(store.available, id)
          remove(store.ask4off, id)
          break
        case 'ask4off':
          append(store.ask4off, id)
          remove(store.available, id)
          break
        case 'cancel':
          remove(store.available, id)
          break
        default:
          return false
      }
      server.publish(
        `/online/${activityId}/${event}`,
        (await models.user.findAll({ where: { id } })).map(grabUser)[0]
      )
      observer.next([activityId, store])
      return store
    },
    options: {
      tags,
      auth: false,
      validate: {
        // ...jwtHeaderDefine,
        params: {
          activityId: Joitem('活动Id', 1),
          event: Joitem('客户端行为', 1)
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
        ...jwtHeaderDefine,
        params: {
          id: Joi.any()
            .required()
            .description('活动 id')
        }
      }
    }
  }
]
