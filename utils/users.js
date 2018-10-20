const models = require('../models')

async function createUserWithWxOpenId({ openid, userInfo, sessionKey }) {
  return await models.sequelize.transaction(t =>
    models.user.create({
      wx_openid: openid,
      wx_user_info: userInfo,
      wx_session_key: sessionKey
    })
  )
}

async function checkUserExistWithWxOpenId({ openid, userInfo, sessionKey }) {
  // 基于 openid 查找或创建一个用户
  const user = await models.user.find({
    where: { wx_openid: openid }
  })
  return user
}

module.exports = {
  createUserWithWxOpenId,
  checkUserExistWithWxOpenId
}
