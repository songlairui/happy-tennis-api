const hapiPagination = require('hapi-pagination')

const options = {
  query: {},
  meta: {
    name: 'meta'
  },
  results: {
    name: 'results'
  },
  routes: {}
}

module.exports = {
  plugin: hapiPagination,
  options
}
