module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'activity',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      detail: DataTypes.STRING,
      cover_img_url: DataTypes.STRING,
      date: DataTypes.STRING,
      start: DataTypes.STRING,
      end: DataTypes.STRING,
      location: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    { tableName: 'activities' }
  )
