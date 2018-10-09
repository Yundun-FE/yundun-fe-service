'use strict';

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize;

  const Model = app.model.define('cmds', {
    title: {
      type: STRING(255),
    },
    content: {
      type: STRING(255),
      allowNull: false,
    },
    show: {
      type: BOOLEAN,
      defaultValue: true,
    },
    index: {
      type: INTEGER,
      defaultValue: 0,
    },
  });

  Model.associate = () => {
    Model.belongsTo(app.model.Job, {
      as: 'job',
      foreignKey: 'jid',
    });
  };

  return Model;
};
