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
      begin_at: DataTypes.DATE,
      end_at: DataTypes.DATE,
      location: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    { tableName: 'activities' }
  )
