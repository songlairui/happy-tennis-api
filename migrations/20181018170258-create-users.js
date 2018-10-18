'use strict'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      wx_identity: Sequelize.STRING,
      wx_id: Sequelize.STRING,
      wx_signature: Sequelize.STRING,
      wx_ticket: Sequelize.STRING,
      expire_signature: Sequelize.DATE,
      expire_ticket: Sequelize.DATE,
      last_login: Sequelize.DATE,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    }),

  down: queryInterface => queryInterface.dropTable('users')
}
