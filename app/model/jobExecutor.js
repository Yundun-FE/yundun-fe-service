module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, DATE } = app.Sequelize

  const Model = app.model.define('jobsExecutors', {
    pid: {
      type: INTEGER,
      allowNull: false
    },
    status: {
      type: STRING(255),
      allowNull: false
    },
    duration: {
      type: INTEGER,
      defaultValue: 0
    },
    estimatedDuration: {
      type: INTEGER,
      defaultValue: 0
    },
    timestamp: DATE
  })

  Model.associate = () => {
    Model.belongsTo(app.model.Job, {
      as: 'job',
      foreignKey: 'jid'
    })
  }

  return Model
}
