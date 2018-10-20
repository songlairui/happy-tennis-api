const Joi = require('joi')
const axios = require('axios')
const models = require('../models')
const { jwtHeaderDefine } = require('../utils/router-helper')
const urls = require('../config/wx-url')
const config = require('../config')

const tags = ['api', 'user']

module.exports = [
  {
    _: ['/wx-login', 'POST'],
    async handler(request) {
      const { code, encryptedData, iv, userInfo } = request.payload
      const result = await axios
        .get(urls.code2Session, {
          params: {
            appid: config.wxAppId,
            js_code: code,
            secret: config.wxSecret,
            grant_type: 'authorization_code'
          }
        })
        .then(sessionData => {
          const {
            session_key: sessionKey,
            openid,
            errmsg,
            errcode
          } = sessionData.data
          if (sessionKey || openid) {
            return { sessionKey, openid }
          }
          if (errcode || errmsg) {
            return { errcode, errmsg }
          }
        })
      return result
      // return await models.user
      //   .transaction(t =>
      //     models.user.create(request.payload, { transaction: t })
      //   )
      //   .then(() => {
      //     return 'success'
      //   })
      //   .catch(e => {
      //     console.warn('e', e)
      //     return 'error'
      //   })
    },
    options: {
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
            .description('wx.login 识别码'),
          userInfo: Joi.any().description('用户信息')
        }
      }
    }
  },
  {
    _: ['/users'],
    async handler(request) {},
    options: {
      tags
    }
  },
  {
    _: ['/user/:id'],
    async handler(request) {},
    options: {
      tags
    }
  },
  {
    _: ['/user', 'POST'],
    async handler(request) {},
    options: {
      tags,
      validate: {
        ...jwtHeaderDefine
      }
    }
  },
  {
    _: ['/user/:id', 'PUT'],
    async handler(request) {},
    options: {
      tags,
      validate: {
        ...jwtHeaderDefine
      }
    }
  },
  {
    _: ['/user/:id', 'DELETE'],
    async handler(request) {},
    options: {
      tags,
      validate: {
        ...jwtHeaderDefine
      }
    }
  }
]
