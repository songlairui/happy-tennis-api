module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'trace',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      remark: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      tableName: 'traces'
    }
  )
