module.exports = [
  {
    method: 'GET',
    path: '/hi',
    handler(request, h) {
      return 'hello'
    },
    config: {
      tags: ['api', 'tests'],
      description: '测试 hello-world'
    }
  }
]
