function fullfilOne(_route) {
  const {
    _,
    method: _method = 'GET',
    path: _path,
    handler: oriHandler,
    ...result
  } = _route
  let path = _path
  let method = _method
  if (Array.isArray(_)) {
    ;[path = _path, method = _method] = _
  }
  let handler
  if (oriHandler) {
    // wrap try Catch
    handler = async (request, ...params) => {
      try {
        return await oriHandler.call(this, request, ...params)
      } catch (err) {
        const match = err.message.match(/^[\.\*\~\-\+\!\>\<\=]+\s*/)
        if (match) {
          return { code: 400, msg: err.message.replace(match[0], '') }
        }
        console.warn(err.message)
        throw err
      }
    }
  } else {
    handler = () => ({ code: 500, msg: '// TODO' })
  }
  return { method, path, handler, ...result }
}

module.exports = function fullfill(routers) {
  if (Array.isArray(routers)) return routers.map(fullfilOne)
  return fullfilOne(routers)
}
