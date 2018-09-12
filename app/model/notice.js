module.exports = app => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize

  const Model = app.model.define('notices', {
    title: {
      type: STRING(255)
    },
    content: {
      type: STRING(255),
      allowNull: false
    },
    isRead: {
      type: BOOLEAN,
      defaultValue: false
    },
    userid: {
      type: STRING(255),
      allowNull: false
    }
  })

  return Model
}
