module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize

  const Progress = app.model.define('progresses', {
    name: {
      type: STRING(255),
      allowNull: false
    },
    progress: {
      type:INTEGER,
      allowNull: false
    }
  })

  return Progress
}
