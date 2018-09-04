module.exports = app => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize

  const Cmd = app.model.define('cmds', {
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

  return Cmd
}
