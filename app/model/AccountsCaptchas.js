'use strict';

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize;

  const Model = app.model.define('accountsCaptchas', {
    userId: {
      type: STRING(255),
      defaultValue: '',
    },
    username: {
      type: STRING(255),
      allowNull: false,
    },
    code: {
      type: STRING(8),
      allowNull: false,
    },
    used: {
      type: BOOLEAN,
      defaultValue: false,
    },
  });

  return Model;
};
