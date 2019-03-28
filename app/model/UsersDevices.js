'use strict';

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize;

  const Model = app.model.define('usersDevices', {
    userId: {
      type: STRING(255),
      allowNull: false,
    },
    deviceId: {
      type: STRING(255),
      allowNull: false,
    },
    ip: {
      type: STRING(255),
      allowNull: false,
    },
    location: {
      type: STRING(255),
      defaultValue: '',
    },
    token: {
      type: STRING(255),
      allowNull: false,
    },
  });

  return Model;
};
