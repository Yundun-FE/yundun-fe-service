module.exports = app => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize

  const Website = app.model.define('websites', {
    title: {
      type: STRING(255)
    },
    url: {
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

  return Website
}
