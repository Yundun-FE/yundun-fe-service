module.exports = app => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize

  const Model = app.model.define('jobs_accounts', {
    title: {
      type: STRING(255),
      allowNull: false
    },
    name: {
      type: STRING(255),
      allowNull: false
    },
    password: {
      type: STRING(255),
      defaultValue: ''
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
