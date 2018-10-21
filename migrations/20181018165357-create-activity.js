'use strict'

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('activities', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      detail: Sequelize.STRING,
      cover_img_url: Sequelize.STRING,
      date: Sequelize.STRING,
      start: Sequelize.STRING,
      end: Sequelize.STRING,
      location: Sequelize.STRING,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    }),
  down: queryInterface => queryInterface.dropTable('activities')
}
