module.exports = app => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize

  const BuildProgress = app.model.define('builds_progresses', {
    title: {
      type: STRING(255),
      allowNull: false
    },
    url: {
      type: STRING(255),
      allowNull: false
    },
    type: {
      type: STRING(255),
      allowNull: false
    },
    show: {
      type: BOOLEAN,
      defaultValue: true
    },
    index: {
      type: INTEGER,
      defaultValue: 0
    }
  })

  return BuildProgress
}
