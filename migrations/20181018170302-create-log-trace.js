'use strict'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('traces', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      remark: Sequelize.JSONB,
      type: Sequelize.STRING,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('traces')
}
