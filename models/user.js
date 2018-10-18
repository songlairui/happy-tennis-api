module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      wx_identity: DataTypes.STRING,
      wx_id: DataTypes.STRING,
      wx_signature: DataTypes.STRING,
      wx_ticket: DataTypes.STRING,
      expire_signature: DataTypes.DATE,
      expire_ticket: DataTypes.DATE,
      last_login: DataTypes.DATE,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      tableName: 'users'
    }
  )
