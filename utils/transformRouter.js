function fullfilOne(_route) {
  const {
    _,
    method: _method = 'GET',
    path: _path,
    handler: oriHandler = () => ({ code: 500, msg: '// TODO' }),
    ...result
  } = _route
  let path = _path
  let method = _method
  // 展开属性值
  if (Array.isArray(_)) {
    ;[path = _path, method = _method] = _
  }
  // wrap try Catch
  const handler = transformHandler(oriHandler)
  return { method, path, handler, ...result }
}

function transformHandler(handler) {
  return async (...params) => {
    try {
      return await handler.apply(null, params)
    } catch (err) {
      const match = err.message.match(/^[\.\*\~\-\+\!\>\<\=]+\s*/)
      if (!match) {
        console.warn('err', err)
        throw err
      }
      return { code: 400, msg: err.message.replace(match[0], '') }
    }
  }
}

module.exports = function fullfill(routers) {
  if (Array.isArray(routers)) return routers.map(fullfilOne)
  return fullfilOne(routers)
}
