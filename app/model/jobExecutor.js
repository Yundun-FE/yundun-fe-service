module.exports = app => {
  const { INTEGER, STRING, BOOLEAN, DATE } = app.Sequelize

  const Model = app.model.define('jobsExecutors', {
    number: {
      type: INTEGER,
      allowNull: false
    },
    status: {
      type: STRING(255),
      defaultValue: ''
    },
    duration: {
      type: INTEGER,
      defaultValue: 0
    },
    estimatedDuration: {
      type: INTEGER,
      defaultValue: 0
    },
    name: {
      type: STRING(255),
      allowNull: false
    },
    timestamp: DATE
  })

  return Model
}
