const utils = require('../../utils/users')

// utils
//   .createUserWithWxOpenId({
//     openid: 'wxx----',
//     userInfo: { d: 'uang' },
//     sessionKey: '---session---'
//   })
//   .then(console.info, console.error)

utils
  .checkUserExistWithWxOpenId({
    openid: 'wxx----'
  })
  .then(console.info, console.error)
