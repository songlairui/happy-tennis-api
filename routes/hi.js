const Joi = require('joi')
const axios = require('axios')
const config = require('../config')
const urls = require('../config/wx-url')
const generateJwt = require('../utils/generate-jwt')

const tags = ['api', 'tests']

module.exports = [
  {
    _: ['/hi', 'GET'],
    handler(request, h) {
      return 'hello'
    },
    options: {
      tags,
      description: '测试 hello-world',
      auth: false
    }
  },
  {
    _: ['/test/default-handler'],
    options: {
      tags,
      description: '测试默认handler',
      auth: false
    }
  },
  {
    _: ['/test/wrapper-try-catch'],
    async handler() {
      if (Math.random() > 0.5) {
        throw new Error('~> duang <~')
      } else {
        throw new Error('随缘抛出')
      }
    },
    options: {
      tags,
      description: '测试自动包裹的tryCatch',
      auth: false
    }
  },
  {
    _: ['/jwt', 'POST'],
    async handler(request) {
      return generateJwt({ id: 1 })
    },
    options: {
      tags,
      auth: false,
      validate: {
        payload: {
          pwd: Joi.string()
            .required()
            .description('身份标示')
        }
      }
    }
  },
  {
    _: ['/code2session', 'POST'],
    async handler(request) {
      const { code } = request.payload
      const { data } = await axios.get(urls.code2Session, {
        params: {
          appid: config.wxAppId,
          js_code: code,
          secret: config.wxSecret,
          grant_type: 'authorization_code'
        }
      })
      return data
    },
    options: {
      tags,
      auth: false,
      validate: {
        payload: {
          code: Joi.string()
            .required()
            .description('wx.login 获得的 code')
        }
      }
    }
  }
]
