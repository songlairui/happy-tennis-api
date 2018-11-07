module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'activityusers',
    {
      activityId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      available: DataTypes.JSONB,
      ask4off: DataTypes.JSONB,
      traces: DataTypes.JSONB,
      onlines: DataTypes.JSONB,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    { tableName: 'activityusers' }
  )
