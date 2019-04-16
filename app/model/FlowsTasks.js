'use strict';

module.exports = app => {
  const { INTEGER, STRING, JSON } = app.Sequelize;

  const Model = app.model.define('flowsTasks', {
    sshUrl: {
      type: STRING(255),
      allowNull: false,
    },

    productName: {
      type: STRING(255),
      allowNull: false,
    },

    productId: {
      type: STRING(255),
      allowNull: false,
    },

    number: {
      type: INTEGER,
      allowNull: false,
    },

    schedule: {
      type: INTEGER,
      defaultValue: 0,
    },

    status: {
      type: INTEGER,
      defaultValue: 0, // 1: SUCCESS  2: FAIL
    },

    content: {
      type: JSON,
      allowNull: false,
    },
  });

  return Model;
};
