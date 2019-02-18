'use strict';

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize;

  const Model = app.model.define('users', {
    name: {
      type: STRING(255),
      defaultValue: '',
    },
    password: {
      type: STRING(255),
      allowNull: false,
    },
    email: {
      type: STRING(255),
      allowNull: false,
    },
    token: {
      type: STRING(255),
      defaultValue: '',
    },
    avatar: {
      type: STRING(255),
      defaultValue: '',
    },
  });

  return Model;
};
