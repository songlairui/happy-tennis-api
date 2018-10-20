const crypto = require('crypto')
module.exports = (encryptedDataStr, ivStr, sessionKeyStr, appid) => {
  // base64 decode
  const sessionKey = new Buffer(sessionKeyStr, 'base64')
  const encryptedData = new Buffer(encryptedDataStr, 'base64')
  const iv = new Buffer(ivStr, 'base64')

  try {
    // 解密
    const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true)
    var decoded = decipher.update(encryptedData, 'binary', 'utf8')
    decoded += decipher.final('utf8')

    decoded = JSON.parse(decoded)
  } catch (err) {
    console.warn('decrypt err', err)
    throw new Error('Illegal Buffer')
  }

  if (decoded.watermark.appid !== appid) {
    throw new Error('Illegal appid')
  }
  return decoded
}
