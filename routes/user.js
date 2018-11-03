const Joi = require('joi')
const axios = require('axios')
const models = require('../models')
const config = require('../config')
const urls = require('../config/wx-url')
const { jwtHeaderDefine } = require('../utils/router-helper')
const decryptData = require('../utils/decrypt-data')
const generateJwt = require('../utils/generate-jwt')

const tags = ['api', 'user']

module.exports = [
  {
    _: ['/wx-login', 'POST'],
    async handler(request) {
      const { code, encryptedData, iv } = request.payload
      const response = await axios.get(urls.code2Session, {
        params: {
          appid: config.wxAppId,
          js_code: code,
          secret: config.wxSecret,
          grant_type: 'authorization_code'
        }
      })
      const { session_key: sessionKey, openid, errmsg, errcode } = response.data
      if (errcode) {
        throw new Error(`~> code2Session err: ${errcode} ${errmsg}`)
      }
      const user = await models.user.findOrCreate({
        where: { wx_openid: openid }
      })
      try {
        const userInfo = decryptData(
          encryptedData,
          iv,
          sessionKey,
          config.wxAppId
        )
        await models.user.update(
          { wx_user_info: userInfo },
          { where: { wx_openid: openid } }
        )
        return generateJwt(user[0])
      } catch (error) {
        await models.user.update(
          { wx_session_key: sessionKey },
          { where: { wx_openid: openid } }
        )
        throw error
      }
    },
    options: {
      tags,
      auth: false,
      validate: {
        payload: {
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
    options: {
      tags
    }
  },
  {
    _: ['/user'],
    async handler(request) {
      const { id } = request.auth.credentials
      const [user] = await models.user.findAll({ where: { id } })
      return user['wx_user_info']
    },
    options: {
      tags,
      validate: {
        ...jwtHeaderDefine
      }
    }
  },
  {
    _: ['/user/{id}'],
    async handler(request) {
      const { id } = request.params
      const [user] = await models.user.findAll({ where: { id } })
      return user['wx_user_info']
    },
    options: {
      tags,
      validate: {
        ...jwtHeaderDefine,
        params: {
          id: Joi.string()
            .required()
            .description('用户ID')
        }
      }
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
    _: ['/user/{id}', 'PUT'],
    async handler(request) {},
    options: {
      tags,
      validate: {
        ...jwtHeaderDefine,
        params: {
          id: Joi.string()
            .required()
            .description('用户ID')
        }
      }
    }
  },
  {
    _: ['/user/{id}', 'DELETE'],
    async handler(request) {},
    options: {
      tags,
      validate: {
        ...jwtHeaderDefine,
        params: {
          id: Joi.string()
            .required()
            .description('用户ID')
        }
      }
    }
  }
]
