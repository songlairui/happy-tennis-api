'use strict'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      wx_openid: {
        type: Sequelize.STRING,
        unique: true
      },
      wx_user_info: Sequelize.JSONB,
      wx_session_key: Sequelize.STRING,
      last_login: Sequelize.DATE,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    }),

  down: queryInterface => queryInterface.dropTable('users')
}
