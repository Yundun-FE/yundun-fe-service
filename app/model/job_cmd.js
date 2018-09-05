module.exports = app => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize

  const Model = app.model.define('jobs_cmds', {
    title: {
      type: STRING(255)
    },
    content: {
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

  return Model
}
