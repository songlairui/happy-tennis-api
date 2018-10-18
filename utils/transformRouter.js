function fullfilOne(_route) {
  const { _, method: _method = 'GET', path: _path, ...result } = _route
  let path = _path
  let method = _method
  if (Array.isArray(_)) {
    ;[path = _path, method = _method] = _
  }
  return { method, path, ...result }
}

module.exports = function fullfill(routers) {
  if (Array.isArray(routers)) return routers.map(fullfilOne)
  return fullfilOne(routers)
}
