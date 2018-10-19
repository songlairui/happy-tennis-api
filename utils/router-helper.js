const Joi = require('joi')

const paginationDefine = {
  limit: Joi.number()
    .integer()
    .min(1)
    .default(10)
    .description('每页条数'),
  page: Joi.number()
    .integer()
    .min(1)
    .default(1)
    .description('页码'),
  pagination: Joi.boolean().description('是否开启分页')
}

const jwtHeaderDefine = {
  headers: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}

module.exports = { paginationDefine, jwtHeaderDefine }
