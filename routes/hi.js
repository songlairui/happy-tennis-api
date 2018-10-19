module.exports = [
  {
    _: ['/hi', 'GET'],
    handler(request, h) {
      return 'hello'
    },
    config: {
      tags: ['api', 'tests'],
      description: '测试 hello-world',
      auth: false
    }
  }
]
