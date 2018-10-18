const path = require('path')

require('env2')(
  path.resolve(
    __dirname,
    process.env.NODE_ENV === 'production' ? '../.env.prop' : '../.env'
  )
)
const { env } = process

const development = {
  username: env.DB_USER,
  password: env.DB_PWD,
  database: `${env.DB_NAME}_dev`,
  host: env.DB_HOST,
  port: 5432,
  dialect: 'postgres',
  operatorsAliases: false
}

module.exports = {
  development,
  test: {
    ...development,
    database: `${env.DB_NAME}_test`
  },
  production: {
    ...development,
    database: `${env.DB_NAME}_prod`
  }
}
