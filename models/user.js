module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      wx_openid: DataTypes.STRING,
      wx_user_info: DataTypes.JSONB,
      wx_session_key: DataTypes.STRING,
      last_login: DataTypes.DATE,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      tableName: 'users'
    }
  )
