'use strict'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('activityusers', {
      activityId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      available: Sequelize.JSONB,
      ask4off: Sequelize.JSONB,
      traces: Sequelize.JSONB,
      onlines: Sequelize.JSONB,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    }),
  down: queryInterface => queryInterface.dropTable('activityusers')
}
