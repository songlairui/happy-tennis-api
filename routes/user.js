const Joi = require('joi')
const model = require('../models')
const { jwtHeaderDefine } = require('../utils/router-helper')

const tags = ['api', 'user']

module.exports = [
  {
    _: ['/wx-login', 'POST'],
    async handler(request) {
      return 'TODO'
    },
    config: {
      tags,
      auth: false,
      validate: {
        payload: {
          signature: Joi.string().description('微信用户信息签名'),
          encryptedData: Joi.string()
            .required()
            .description('加密信息'),
          iv: Joi.string()
            .required()
            .description('解密向量'),
          code: Joi.string()
            .required()
            .description('wx.login 识别码')
        }
      }
    }
  },
  {
    _: ['/users'],
    async handler(request) {},
    config: {
      tags
    }
  },
  {
    _: ['/user/:id'],
    async handler(request) {},
    config: {
      tags
    }
  },
  {
    _: ['/user', 'POST'],
    async handler(request) {},
    config: {
      tags,
      validate: {
        ...jwtHeaderDefine
      }
    }
  },
  {
    _: ['/user/:id', 'PUT'],
    async handler(request) {},
    config: {
      tags,
      validate: {
        ...jwtHeaderDefine
      }
    }
  },
  {
    _: ['/user/:id', 'DELETE'],
    async handler(request) {},
    config: {
      tags,
      validate: {
        ...jwtHeaderDefine
      }
    }
  }
]
