const { env } = process
const config = {
  port: env.PORT,
  host: env.HOST,
  jwtSecret: env.JWT_SECRET,
  wxAppId: env.WXAPPID,
  wxSecret: env.WXAPPSECRET
}

module.exports = config

Object.keys(config).forEach(key => {
  if (config[key] !== 0 && !config[key]) {
    console.warn(`${key} may be not valid`)
  }
})
