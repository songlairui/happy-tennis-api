const inert = require('inert')
const vision = require('vision')
const package = require('package')
const hapiSwagger = require('hapi-swagger')

module.exports = [
  inert,
  vision,
  {
    plugin: hapiSwagger,
    options: {
      info: {
        title: 'happy-tennis 接口文档',
        version: package.version
      },
      grouping: 'tags',
      tags: [
        { name: 'tests', description: '测试相关' },
        {
          name: 'activity',
          description: '活动相关'
        }
      ]
    }
  }
]
