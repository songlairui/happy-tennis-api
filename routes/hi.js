const JWT = require('jsonwebtoken')
const Joi = require('joi')

const generateJwt = ({ id }) => {
  return JWT.sign(
    {
      id,
      exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60
    },
    process.env.JWT_SECRET
  )
}

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
  }
]
