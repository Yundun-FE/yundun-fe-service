'use strict';

module.exports = app => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize;

  const Model = app.model.define('usersCaptchas', {
    userId: {
      type: STRING(255),
      allowNull: false,
    },
    auth: {
      type: STRING(255),
      allowNull: false,
    },
    type: {
      type: INTEGER,
      allowNull: false,
    },
    captcha: {
      type: STRING(255),
      allowNull: false,
    },
  });

  return Model;
};
