module.exports = app => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize

  const Account = app.model.define('accounts', {
    title: {
      type: STRING(255),
      allowNull: false
    },
    name: {
      type: STRING(255),
      allowNull: false
    },
    password: {
      type: STRING(255)
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

  return Account
}
