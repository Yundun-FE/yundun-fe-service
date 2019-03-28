'use strict';

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize;

  const Model = app.model.define('usersLogs', {
    userId: {
      type: STRING(255),
      allowNull: false,
    },
    action: {
      type: STRING(255),
      allowNull: false,
    },
    content: {
      type: STRING(255),
      defaultValue: '',
    },
    ip: {
      type: STRING(255),
      allowNull: false,
    },
    token: {
      type: STRING(255),
      allowNull: false,
    },
    location: {
      type: STRING(255),
      defaultValue: '',
    },
  });

  return Model;
};
