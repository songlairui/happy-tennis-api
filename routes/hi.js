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
    config: {
      tags,
      description: '测试 hello-world',
      auth: false
    }
  },
  {
    _: ['/jwt', 'POST'],
    async handler(request) {
      return generateJwt({ id: 1 })
    },
    config: {
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
