module.exports = app => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize

  const Model = app.model.define('jobs', {
    title: {
      type: STRING(255),
      allowNull: false
    },
    url: {
      type: STRING(255),
      allowNull: false
    },
    env: {
      type: STRING(255),
      defaultValue: 'default'
    },
    name: {
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

  Model.associate = function() {
    Model.hasMany(app.model.Cmd, {
      foreignKey: 'jid'
    })
    Model.hasMany(app.model.Account, {
      foreignKey: 'jid'
    })
  }

  return Model
}