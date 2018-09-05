module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize

  const Model = app.model.define('progresses', {
    name: {
      type: STRING(255),
      allowNull: false
    },
    progress: {
      type:INTEGER,
      allowNull: false
    },
    utime: {
      type: INTEGER,
      allowNull: false
    }
  })

  return Model
}
